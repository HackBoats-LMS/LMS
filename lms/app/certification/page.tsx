"use client"

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Script from 'next/script';
import { CertificateTemplate } from '@/components/CertificateTemplate';
import { ChevronLeft, Download, Printer, Loader2, CheckCircle } from 'lucide-react';

function CertificateContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'registering'>('registering');
    const [certId, setCertId] = useState<string>(searchParams.get('id') || "");
    const [isLibraryReady, setIsLibraryReady] = useState(false);

    // Initial data from URL (Used only for preview until DB verification)
    const [recipientName, setRecipientName] = useState(searchParams.get('name') || "STUDENT");
    const [courseName, setCourseName] = useState(searchParams.get('course') || "Web Development");

    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');

    // Aggressive check for library (every 100ms)
    useEffect(() => {
        const checkInterval = setInterval(() => {
            // @ts-ignore
            if (window.html2pdf) {
                setIsLibraryReady(true);
                clearInterval(checkInterval);
            }
        }, 100);
        return () => clearInterval(checkInterval);
    }, []);

    // Security: Fetch the Official Record from the Database
    // This prevents users from editing the URL to change the name or course.
    useEffect(() => {
        async function verifyAndLoad() {
            let currentId = certId;

            // 1. If no ID but we have user/course info, register it first
            if (!currentId && userId && courseId) {
                try {
                    const regRes = await fetch('/api/certification/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId, userName: recipientName, courseId, courseName })
                    });
                    const regData = await regRes.json();
                    if (regData.certificateId) {
                        currentId = regData.certificateId;
                        setCertId(currentId);
                    }
                } catch (e) {
                    console.error("Registration failed", e);
                }
            }

            // 2. Now fetch the OFFICIAL data using the ID
            // This is the absolute source of truth.
            if (currentId) {
                try {
                    const res = await fetch(`/api/certification/verify?id=${currentId}`);
                    const officialData = await res.json();

                    if (officialData && !officialData.error) {
                        // FORCE the official database names onto the certificate
                        // This overrides any spoofed values in the URL
                        setRecipientName(officialData.userName);
                        setCourseName(officialData.courseName);
                    }
                } catch (e) {
                    console.error("Verification failed", e);
                }
            }
            setStatus('idle');
        }
        verifyAndLoad();
    }, [userId, courseId, certId]);

    const handleDownload = async () => {
        const ghostElement = document.getElementById('certificate-ghost-capture');
        // @ts-ignore
        const html2pdf = window.html2pdf;

        // SMART FALLBACK: If engine is slow, use the browser's native print-to-pdf
        if (!html2pdf) {
            console.warn("PDF Engine not ready, falling back to print");
            window.print();
            return;
        }

        if (!ghostElement || status !== 'idle') return;

        setStatus('loading');

        try {
            const opt = {
                margin: [0, 0, 0, 0],
                filename: `HB_CERT_${certId}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2, 
                    useCORS: true,
                    letterRendering: true,
                    logging: false,
                    backgroundColor: '#ffffff',
                    width: 1122,
                    height: 794,
                    windowWidth: 1122,
                    windowHeight: 794,
                    scrollX: 0,
                    scrollY: 0,
                    x: 0,
                    y: 0
                },
                jsPDF: {
                    unit: 'px',
                    format: [1122, 795], // 1px buffer to prevent extra page on mobile
                    orientation: 'landscape',
                    hotfixes: ["px_scaling"]
                },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };

            await html2pdf().set(opt).from(ghostElement).save();
            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error(error);
            setStatus('idle');
            alert("Digital export failed. Trying Print mode...");
            window.print();
        }
    };

    if (status === 'registering') return (
        <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center gap-6 font-sans">
            <Loader2 className="animate-spin text-[#FF5B5B]" size={64} />
            <div className="text-center space-y-2">
                <p className="text-[#1D1D1F] font-bold tracking-widest uppercase">Verifying Authenticity</p>
                <p className="text-[#1D1D1F]/40 font-mono text-[10px] tracking-[0.3em] uppercase italic">Cross-referencing secure database...</p>
            </div>
        </div>
    );

    return (
        <div id="certificate-page-wrap" className="min-h-screen bg-[#F5F5F7] flex flex-col items-center overflow-x-hidden text-[#1D1D1F]">
            {/* TRIPLE REDUNDANCY CDNs: If one fails, the next one is used */}
            <Script src="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js" strategy="afterInteractive" />
            <Script src="https://unpkg.com/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js" strategy="lazyOnload" />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" strategy="lazyOnload" />

            {/* CRITICAL: Aggressive Print Isolation & Color Enforcement */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    /* Reset everything */
                    @page { size: landscape; margin: 0; }
                    html, body { 
                        margin: 0 !important; 
                        padding: 0 !important; 
                        height: 794px !important; 
                        width: 1122px !important;
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important;
                        background: white !important;
                        overflow: hidden !important;
                    }
                    
                    /* Hide ALL UI elements */
                    body * { visibility: hidden !important; }
                    
                    /* Show ONLY the certificate container */
                    #print-portal-source, 
                    #print-portal-source * { 
                        visibility: visible !important; 
                    }

                    #print-portal-source {
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 1122px !important;
                        height: 794px !important;
                        display: block !important;
                        z-index: 999999 !important;
                        background: white !important;
                        visibility: visible !important;
                        page-break-after: avoid !important;
                        page-break-before: avoid !important;
                    }

                    #certificate-ghost-capture {
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        visibility: visible !important;
                        width: 1122px !important;
                        height: 794px !important;
                        transform-origin: top left !important;
                        box-shadow: none !important;
                        background: white !important;
                        overflow: hidden !important;
                        /* Prevent mobile text scaling */
                        -webkit-text-size-adjust: 100% !important;
                        text-size-adjust: 100% !important;
                    }
                }
            `}} />

            {/* Premium Header */}
            <nav className="w-full px-8 py-5 flex justify-between items-center bg-white border-b border-[#D2D2D7] sticky top-0 z-[100] print:hidden">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[#1D1D1F]/60 hover:text-[#1D1D1F] transition-all font-bold px-4 py-2 rounded-xl hover:bg-black/5"
                >
                    <ChevronLeft size={20} />
                    Back
                </button>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleDownload}
                        disabled={status === 'loading'}
                        className="flex items-center gap-3 px-10 py-3.5 rounded-2xl bg-[#FF5B5B] text-white hover:bg-[#FF4040] transition-all font-bold text-sm shadow-xl shadow-[#FF5B5B]/20 disabled:opacity-50"
                    >
                        {status === 'loading' ? <Loader2 size={20} className="animate-spin" /> : status === 'success' ? <CheckCircle size={20} /> : <Download size={20} />}
                        {status === 'loading' ? 'Exporting...' : status === 'success' ? 'Downloaded!' : 'Instant Download'}
                    </button>

                    <button
                        onClick={() => window.print()}
                        className="hidden md:flex p-3.5 rounded-2xl bg-black/5 text-[#1D1D1F]/40 hover:text-[#1D1D1F] border border-black/5 transition-all"
                    >
                        <Printer size={22} />
                    </button>
                </div>
            </nav>

            <main className="flex-1 w-full flex flex-col items-center justify-center p-6 lg:p-12 relative">
                {/* VISUAL PREVIEW - Hidden in Print */}
                <div className="relative group transition-all duration-1000 scale-[0.32] sm:scale-[0.45] md:scale-[0.55] lg:scale-[0.7] xl:scale-[0.85] shadow-2xl bg-white origin-center print:hidden rounded-lg overflow-hidden border border-black/5">
                    <CertificateTemplate recipientName={recipientName} courseName={courseName} date={new Date().toLocaleDateString()} certificateId={certId} />
                </div>

                {/* THE EXPORT SOURCE (Invisible in UI, the only thing that shows in Print) */}
                <div 
                    id="print-portal-source" 
                    className="fixed top-0 left-0 opacity-0 pointer-events-none print:opacity-100 z-[-1]"
                    style={{ width: '1122px', height: '794px' }}
                >
                    <div id="certificate-ghost-capture" style={{ width: '1122px', height: '794px', overflow: 'hidden', backgroundColor: 'white' }}>
                        <CertificateTemplate recipientName={recipientName} courseName={courseName} date={new Date().toLocaleDateString()} certificateId={certId} />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function CertificatePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F5F5F7]" />}>
            <CertificateContent />
        </Suspense>
    );
}