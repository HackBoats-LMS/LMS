"use client"

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { CertificateTemplate } from '@/components/CertificateTemplate';
import { CheckCircle, AlertCircle, Loader2, ShieldCheck, Search } from 'lucide-react';

export default function VerifyCertificate() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [certData, setCertData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchCert() {
            try {
                if (!token) throw new Error("Missing token");
                const res = await fetch(`/api/certification/verify?id=${id}&token=${token}`);
                if (!res.ok) throw new Error();
                const data = await res.json();
                setCertData(data);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchCert();
    }, [id, token]);

    if (loading) return (
        <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center gap-6 font-sans">
            <Loader2 className="animate-spin text-[#FF5B5B]" size={64} />
            <p className="text-[#1D1D1F] font-bold tracking-widest uppercase text-xs">Accessing Secure Database...</p>
        </div>
    );

    if (error || !certData) return (
        <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center p-8 text-center font-sans">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="text-red-500" size={40} />
            </div>
            <h1 className="text-3xl font-black text-[#1D1D1F] mb-3 tracking-tight">Invalid Credential</h1>
            <p className="text-[#1D1D1F]/60 max-w-sm leading-relaxed mb-8">This certificate ID cannot be verified. It may have been revoked, expired, or never existed in our official records.</p>
            <button
                onClick={() => window.location.href = '/'}
                className="px-8 py-3 bg-[#1D1D1F] text-white rounded-xl font-bold text-sm hover:bg-black transition-all"
            >
                Return to Campus
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center py-20 px-4 font-sans text-[#1D1D1F]">
            <div className="max-w-4xl w-full text-center mb-16">
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-green-50 border border-green-100 text-green-600 text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
                    <ShieldCheck size={14} />
                    Cryptographically Verified
                </div>
                <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter italic uppercase">Authenticated Record.</h1>
                <p className="text-[#1D1D1F]/40 text-sm max-w-lg mx-auto leading-relaxed">
                    We confirm that <span className="text-[#1D1D1F] font-bold underline decoration-[#FF5B5B] decoration-2 underline-offset-4">{certData.userName}</span> has successfully fulfilled all requirements for the <span className="text-[#1D1D1F] font-bold underline decoration-[#FF5B5B] decoration-2 underline-offset-4">{certData.courseName}</span> program.
                </p>
            </div>

            <div className="relative group transition-all duration-1000 scale-[0.32] sm:scale-[0.45] md:scale-[0.55] lg:scale-[0.7] xl:scale-[0.85] shadow-2xl bg-white origin-top rounded-lg overflow-hidden border border-black/5">
                <CertificateTemplate
                    recipientName={certData.userName}
                    courseName={certData.courseName}
                    date={new Date(certData.issueDate).toLocaleDateString()}
                    certificateId={certData.certificateId}
                />
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
                    <p className="text-[10px] font-bold text-[#1D1D1F]/30 uppercase tracking-widest mb-1">Issue Date</p>
                    <p className="text-lg font-bold">{new Date(certData.issueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
                    <p className="text-[10px] font-bold text-[#1D1D1F]/30 uppercase tracking-widest mb-1">Certificate ID</p>
                    <p className="text-lg font-bold font-mono tracking-tight">{certData.certificateId}</p>
                </div>
            </div>

            <p className="mt-16 text-[10px] font-bold text-[#1D1D1F]/20 uppercase tracking-[0.5em] text-center">
                Generated By HackBoats Trusted Execution Engine
            </p>

            <button
                onClick={() => window.location.href = '/certification/verify'}
                className="mt-8 text-xs font-bold text-[#1D1D1F]/40 hover:text-[#1D1D1F] transition-all flex items-center gap-2 uppercase tracking-widest"
            >
                <Search size={14} />
                Verify Another Credential
            </button>
        </div>
    );
}
