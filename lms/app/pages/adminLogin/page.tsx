"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Navbar from "../login/components/Navbar";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/pages/adminDashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/pages/adminDashboard?admin=true" });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden flex flex-col">
      {/* Background */}
      <Image
        src="/background.png"
        alt="Background"
        fill
        className="object-cover object-top -z-1"
        priority
      />

      <nav className="absolute top-0 left-0 w-full z-10 flex justify-between items-center p-6 px-30">
                  <div className="text-white text-2xl font-bold tracking-wider">
                      <Image
                          src={"https://www.hackboats.com/images/logo.png"}
                          alt="Logo"
                          width={170}
                          height={170}
                          className='w-44 h-auto'
                      />
                  </div>
                  <div className="flex gap-4">
                      <button className="bg-[#E65D25] text-white font-monument px-2 py-2 rounded-full font-medium flex justify-center items-center gap-2 hover:cursor-pointer"
                      onClick={()=>router.push("/pages/login")}
                      >
                          <span className='px-3'>Student</span>
                          <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center">
                              <ArrowRight className='text-black' />
                          </div>
                      </button>
                  </div>
              </nav>

      <div className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-monument text-white mb-8 text-center uppercase tracking-wide">
            Admin Portal
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm font-monument mb-2 ml-1">Email</label>
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/40 p-4 rounded-xl focus:outline-none focus:border-[#E65D25] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm font-monument mb-2 ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/40 p-4 rounded-xl focus:outline-none focus:border-[#E65D25] transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#E65D25] text-white font-monument py-4 rounded-full hover:bg-[#d5521f] transition-all flex items-center justify-center gap-3 group mt-4 cursor-pointer"
            >
              <span>Login Access</span>
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
