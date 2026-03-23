"use client"

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, CheckCircle, XCircle, Loader2, ShieldCheck, ArrowRight } from 'lucide-react';

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialId = searchParams.get('id') || "";

    const [id, setId] = useState(initialId);
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!id.trim()) return;

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const res = await fetch(`/api/certification/verify?id=${id.trim()}`);
            const data = await res.json();

            if (data.error) {
                setError(data.error);
            } else {
                setResult(data);
            }
        } catch (err) {
            setError("Unable to connect to verification server.");
        } finally {
            setLoading(false);
        }
    };

    // Auto-search if ID is in the URL
    useEffect(() => {
        if (initialId) {
            handleSearch();
        }
    }, [initialId]);

    return (
        <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans flex flex-col items-center py-20 px-6">
            <div className="max-w-xl w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-black/5 text-black mb-6">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Certificate Verification</h1>
                    <p className="text-[#1D1D1F]/60">Enter the certificate ID found below the Hackboats stamp to verify its authenticity.</p>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative mb-12 group">
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="e.g. HB-2024-XXXX"
                        className="w-full h-16 pl-14 pr-32 bg-white rounded-2xl border border-[#D2D2D7] focus:ring-4 focus:ring-[#FF5B5B]/10 focus:border-[#FF5B5B] outline-none transition-all text-lg font-mono placeholder:text-gray-300"
                    />
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search size={24} />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="absolute right-3 top-2.5 bottom-2.5 px-6 rounded-xl bg-[#FF5B5B] text-white font-bold text-sm shadow-[0_10px_15px_-3px_rgba(255,91,91,0.2)] hover:bg-[#FF4545] transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : "Verify"}
                    </button>
                </form>

                {/* Result Section */}
                <div className="transition-all duration-500">
                    {result && (
                        <div className="bg-white rounded-3xl p-8 border border-[#D2D2D7] shadow-xl overflow-hidden relative">
                             {/* Verified Badge */}
                            <div className="flex items-center gap-3 text-green-600 font-bold mb-8 p-4 bg-green-50 rounded-2xl border border-green-100">
                                <CheckCircle size={24} />
                                <span className="uppercase tracking-widest text-sm">Authentic Certificate</span>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-[#1D1D1F]/40 font-bold mb-1">RECIPIENT NAME</p>
                                    <p className="text-2xl font-bold text-[#1D1D1F]">{result.userName?.toUpperCase()}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-[#1D1D1F]/40 font-bold mb-1">COURSE</p>
                                        <p className="text-lg font-semibold">{result.courseName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-[#1D1D1F]/40 font-bold mb-1">ISSUE DATE</p>
                                        <p className="text-lg font-semibold">{new Date(result.issueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-[#1D1D1F]/40 font-bold mb-1">IDENTIFIER</p>
                                        <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">{result.certificateId}</p>
                                    </div>
                                    <div className="px-4 py-2 bg-black/5 rounded-lg text-xs font-bold text-gray-500 uppercase tracking-widest">
                                        Status: Issued
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-white rounded-3xl p-8 border border-red-100 shadow-xl flex flex-col items-center text-center">
                            <div className="p-4 bg-red-50 text-red-500 rounded-full mb-4">
                                <XCircle size={48} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-xl font-bold text-red-600 mb-2">Verification Failed</h2>
                            <p className="text-gray-500 max-w-sm mb-6">{error === "Certificate not found" ? "We couldn't find a record for that ID. Double check the ID on your physical certificate." : error}</p>
                            <button 
                                onClick={() => setError("")}
                                className="text-[#FF5B5B] font-bold text-sm hover:underline"
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {!result && !error && !loading && (
                        <div className="text-center opacity-30 select-none">
                            <div className="mx-auto w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                                <ShieldCheck size={48} className="text-gray-400" />
                            </div>
                            <p className="text-sm font-medium tracking-[0.2em] uppercase">Security Gateway Ready</p>
                        </div>
                    )}
                </div>

                {/* Footer Link */}
                <div className="mt-20 text-center">
                    <a 
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#1D1D1F]/40 hover:text-[#FF5B5B] transition-colors"
                    >
                        Go back to Hackboats 
                        <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function VerificationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F5F5F7]" />}>
            <SearchContent />
        </Suspense>
    );
}
