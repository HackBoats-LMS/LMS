import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import supabase from "@/lib/db"

const handler = NextAuth({
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
                const { data: user, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('email', credentials?.email)
                    .eq('password', credentials?.password)
                    .eq('isAdmin', true)
                    .single();

                if (user && !error) {
                    return { ...user, isAdmin: true };
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
                    console.error("Error checking access mode:", e);
                }

                // Store login type in user object for later use
                (user as any).loginType = 'student';
            }
            return true;
        },

        async jwt({ token, user, trigger }) {
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
                            console.error("Redis invalidation failed in NextAuth:", e);
                        }
                    }
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
                    isAdmin: token.isAdmin as boolean,
                    hasAdminRecord: token.hasAdminRecord as boolean,
                    hasStudentRecord: token.hasStudentRecord as boolean
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
})

export { handler as GET, handler as POST }
