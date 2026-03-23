import { AuthOptions } from "next-auth"
import NextAuth from "next-auth"
import logger from "@/lib/logger"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import supabase from "@/lib/db"
import { headers } from "next/headers"
import { rateLimit } from "@/lib/rateLimit"
import { compare } from "bcryptjs"

const loginLimiter = rateLimit({ interval: 60000 });

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "select_account"
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Rate Limiting
                const clientIp = (await headers()).get("x-forwarded-for") || "unknown";
                try {
                    await loginLimiter.check(5, clientIp); // Max 5 login attempts per minute
                } catch (e: any) {
                    if (e.message === 'Rate limit service unavailable') {
                        throw new Error("Authentication service is temporarily unavailable. Please try again later.");
                    }
                    throw new Error("Too many attempts. Please try again after a minute.");
                }

                const { data: user, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('email', credentials?.email)
                    .eq('isAdmin', true)
                    .single();

                if (user && !error && credentials?.password) {
                    const isValid = await compare(credentials.password, user.password);
                    if (isValid) {
                        return { ...user, isAdmin: true };
                    }
                }
                return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/pages/login',
        error: '/pages/access-denied',
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                const clientIp = (await headers()).get("x-forwarded-for") || "unknown";
                try {
                    await loginLimiter.check(5, clientIp); // Max 5 google login attempts per minute
                } catch (e) {
                    return false; // Stop the sign-in process
                }

                const email = user.email;

                if (!email) return false;

                // Check Access Mode from Redis
                try {
                    const redis = (await import("@/lib/redis")).default;
                    if (redis) {
                        const accessMode = await redis.get('config:access_mode');
                        if (accessMode === 'database_only') {
                            const { data: existingUser } = await supabase
                                .from('users')
                                .select('id')
                                .eq('email', email)
                                .single();

                            if (!existingUser) {
                                console.log(`Access Denied (database_only mode): ${email}`);
                                return false;
                            }
                        }
                    }
                } catch (e) {
                    logger.error("Error checking access mode:", e);
                }

                // Store login type in user object for later use
                (user as any).loginType = 'student';
            }
            return true;
        },

        async jwt({ token, user, trigger }) {
            // Handle profile update trigger or missing completeness flag
            if (trigger === "update" || (token && !token.isAdmin && token.isProfileComplete === undefined)) {
                const { data: studentUser } = await supabase
                    .from('users')
                    .select('fullName, rollNo, phoneNumber, whatsapp, college, department, section, image')
                    .eq('email', token.email)
                    .eq('isAdmin', false)
                    .single();

                if (studentUser) {
                    const essentialFields = ['fullName', 'rollNo', 'phoneNumber', 'whatsapp', 'college', 'department', 'section'];
                    token.isProfileComplete = essentialFields.every(field => !!(studentUser as any)[field]);
                    if (studentUser.fullName) token.name = studentUser.fullName;
                    if (studentUser.image) token.picture = studentUser.image;
                } else {
                    token.isProfileComplete = true; // Admin or other
                }
                
                if (trigger === "update") return token;
            }

            if (user) {
                // Check both student and admin records
                const { data: studentUser } = await supabase
                    .from('users')
                    .select('*')
                    .eq('email', user.email)
                    .eq('isAdmin', false)
                    .single();

                const { data: adminUser } = await supabase
                    .from('users')
                    .select('*')
                    .eq('email', user.email)
                    .eq('isAdmin', true)
                    .single();

                token.hasStudentRecord = !!studentUser;
                token.hasAdminRecord = !!adminUser;

                // Set default ID
                token.id = studentUser?.id || adminUser?.id || user.id;

                // Sync image from Google if not in DB
                if (user.image && !studentUser?.image && !adminUser?.image) {
                    token.picture = user.image;
                }
                
                if (studentUser?.image) token.picture = studentUser.image;
                else if (adminUser?.image) token.picture = adminUser.image;
                else if (user.image) token.picture = user.image;

                // Determine session role
                if ((user as any).isAdmin) {
                    // 1. Explicit Admin Credentials Login
                    token.isAdmin = true;
                    token.id = user.id;
                } else {
                    // 2. Google Login or other providers
                    // If only admin record exists, treat as admin
                    if (adminUser && !studentUser) {
                        token.isAdmin = true;
                        token.id = adminUser.id;
                    } else {
                        // Default to student
                        token.isAdmin = false;
                        if (studentUser) {
                            token.id = studentUser.id;
                        }
                    }
                }

                // Create student record if doesn't exist AND no admin record exists
                if (!studentUser && !adminUser) {
                    const { data: newUser } = await supabase.from('users').insert({
                        email: user.email,
                        fullName: user.name || "",
                        image: user.image || null,
                        isAdmin: false,
                        currentSemester: 1,
                        createdAt: new Date().toISOString()
                    }).select().single();

                    if (newUser) {
                        token.id = newUser.id;
                        // Invalidate cache
                        try {
                            const redis = (await import("@/lib/redis")).default;
                            if (redis) await redis.del('students:all');
                        } catch (e) {
                            logger.error("Redis invalidation failed in NextAuth:", e);
                        }
                    }
                }
                // Check if profile is complete (only for students)
                if (studentUser) {
                    const essentialFields = ['fullName', 'rollNo', 'phoneNumber', 'whatsapp', 'college', 'department', 'section'];
                    token.isProfileComplete = essentialFields.every(field => !!(studentUser as any)[field]);
                } else {
                    token.isProfileComplete = true; // Admins or users without student record are "complete"
                }
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                // Ensure session properties are correctly typed and populated
                session.user = {
                    ...session.user,
                    id: token.id as string,
                    image: token.picture as string,
                    isAdmin: token.isAdmin as boolean,
                    hasAdminRecord: token.hasAdminRecord as boolean,
                    hasStudentRecord: token.hasStudentRecord as boolean,
                    isProfileComplete: token.isProfileComplete as boolean
                };
            }
            return session;
        },

        async redirect({ url, baseUrl }) {
            // Parse the URL to check callback parameter
            const urlObj = new URL(url, baseUrl);
            const callbackUrl = urlObj.searchParams.get('callbackUrl') || url;

            // If callback contains admin=true or adminDashboard, go to admin
            if (callbackUrl.includes('admin=true') || callbackUrl.includes('adminDashboard')) {
                return `${baseUrl}/pages/adminDashboard`;
            }

            // Otherwise go to home
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            if (new URL(url).origin === baseUrl) return url;
            return `${baseUrl}/`;
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
