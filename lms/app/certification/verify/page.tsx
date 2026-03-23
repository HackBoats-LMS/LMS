"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ShieldCheck, Loader2 } from 'lucide-react';

export default function VerifySearch() {
    const [certId, setCertId] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (!certId.trim() || !token.trim()) return;
        setLoading(true);
        router.push(`/certification/verify/${certId.trim().toUpperCase()}?token=${token.trim()}`);
    };

    return (
        <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center py-20 px-4 font-sans text-[#1D1D1F]">
            <div className="max-w-2xl w-full text-center">
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
                    <ShieldCheck size={14} />
                    Trust & Verification Portal
                </div>

                <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter italic uppercase">Verify Credentials.</h1>
                <p className="text-[#1D1D1F]/40 text-sm max-w-sm mx-auto leading-relaxed mb-12">
                    Enter the Certificate ID and Verification Token (found on the official certificate) to confirm its authenticity.
                </p>

                <form onSubmit={handleVerify} className="max-w-md mx-auto space-y-4">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Certificate ID (e.g. HB-PYT-XXXX)"
                            value={certId}
                            onChange={(e) => setCertId(e.target.value)}
                            className="w-full bg-white border border-black/5 rounded-2xl px-6 py-5 text-lg font-bold placeholder:text-black/20 focus:outline-none focus:ring-4 focus:ring-[#FF5B5B]/5 transition-all shadow-sm"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="relative group flex items-center">
                        <input
                            type="password"
                            placeholder="Verification Token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="w-full bg-white border border-black/5 rounded-2xl px-6 py-5 text-lg font-bold placeholder:text-black/20 focus:outline-none focus:ring-4 focus:ring-[#FF5B5B]/5 transition-all shadow-sm pr-16"
                            disabled={loading}
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="absolute right-3 top-2 bottom-2 px-4 rounded-xl bg-[#1D1D1F] text-white hover:bg-black transition-all flex items-center justify-center disabled:opacity-50"
                        >
                            {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
                        </button>
                    </div>
                </form>

                <div className="mt-16 flex items-center justify-center gap-8 grayscale opacity-30">
                    <div className="text-[10px] font-black tracking-widest uppercase">Encrypted</div>
                    <div className="text-[10px] font-black tracking-widest uppercase">Secure</div>
                    <div className="text-[10px] font-black tracking-widest uppercase">Official</div>
                </div>

                <p className="mt-16 text-[10px] font-bold text-[#1D1D1F]/20 uppercase tracking-[0.5em]">
                    HackBoats Learning Management System
                </p>
            </div>
        </div>
    );
}
