"use client"

import React, { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CertificateTemplate } from '@/components/CertificateTemplate';
import { ChevronLeft, Download, Printer, Loader2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

function CertificateContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'registering'>('registering');
    const [certId, setCertId] = useState<string>(searchParams.get('id') || "");
    const [verificationToken, setVerificationToken] = useState<string>(searchParams.get('token') || "");
    const [isGenerating, setIsGenerating] = useState(false);

    // Initial data from URL (Used only for preview until DB verification)
    const [recipientName, setRecipientName] = useState(searchParams.get('name') || "STUDENT");
    const [courseName, setCourseName] = useState(searchParams.get('course') || "Web Development");
    const [issueDate, setIssueDate] = useState<string>(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));

    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');

    // Dynamically update document title for better PDF naming and browser experience
    useEffect(() => {
        if (recipientName && courseName) {
            document.title = `Certificate - ${recipientName} - ${courseName}`;
        }
    }, [recipientName, courseName]);


    // Security: Fetch the Official Record from the Database
    useEffect(() => {
        async function verifyAndLoad() {
            let currentId = certId;
            let currentToken = verificationToken;

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
                        currentToken = regData.verificationToken;
                        setCertId(currentId);
                        setVerificationToken(currentToken);
                    }
                } catch (e) {
                    console.error("Registration failed", e);
                }
            }

            if (currentId && currentToken) {
                try {
                    const res = await fetch(`/api/certification/verify?id=${currentId}&token=${currentToken}`);
                    const officialData = await res.json();

                    if (officialData && !officialData.error) {
                        setRecipientName(officialData.userName);
                        setCourseName(officialData.courseName);
                        if (officialData.issueDate) {
                            setIssueDate(new Date(officialData.issueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
                        }
                    }
                } catch (e) {
                    console.error("Verification failed", e);
                }
            }
            setStatus('idle');
        }
        verifyAndLoad();
    }, [userId, courseId, certId]);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleDownload = async () => {
        setIsGenerating(true);
        const element = document.getElementById('certificate-ghost-capture');
        if (!element) return;

        try {
            // Ensure all fonts are loaded before capture
            await document.fonts.ready;
            
            // Give extra time for any layout shifts
            await new Promise(resolve => setTimeout(resolve, 800));

            const dataUrl = await toPng(element, {
                quality: 1,
                pixelRatio: 3, // 3x (3366x2382) is perfect for 300dpi A4 print quality
                skipFonts: false,
                cacheBust: true,
                includeQueryParams: true,
                style: {
                    transform: 'scale(1)',
                    transformOrigin: 'top left',
                    backgroundColor: 'white'
                }
            });

            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4',
                compress: true
            });

            pdf.addImage(dataUrl, 'PNG', 0, 0, 297, 210, undefined, 'MEDIUM');
            pdf.save(`HB_CERT_${certId || 'PREVIEW'}.pdf`);
        } catch (err) {
            console.error('Error generating PDF:', err);
        } finally {
            setIsGenerating(false);
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

            {/* CRITICAL: Aggressive Print Isolation & Color Enforcement */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    /* Reset everything */
                    @page { size: 297mm 210mm; margin: 0; }
                    html, body { 
                        margin: 0 !important; 
                        padding: 0 !important; 
                        height: 210mm !important; 
                        width: 297mm !important;
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
                        image-rendering: -webkit-optimize-contrast !important;
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
                    {isMounted ? (
                        <button
                            onClick={handleDownload}
                            disabled={isGenerating}
                            className="flex items-center gap-3 px-10 py-3.5 rounded-2xl bg-[#FF5B5B] text-white font-bold text-sm cursor-pointer shadow-[0_20px_25px_-5px_rgba(255,91,91,0.2)] hover:bg-[#FF4545] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                            {isGenerating ? 'Preparing...' : 'Instant Download'}
                        </button>
                    ) : (
                        <div className="px-10 py-3.5 bg-gray-100 rounded-2xl text-gray-400 font-bold text-sm border border-black/5 animate-pulse">
                            Loading Engine...
                        </div>
                    )}

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
                    <CertificateTemplate recipientName={recipientName} courseName={courseName} date={issueDate} certificateId={certId} verificationToken={verificationToken} />
                </div>

                {/* THE EXPORT SOURCE (Invisible in UI, the only thing that shows in Print) */}
                <div
                    id="print-portal-source"
                    className="absolute top-0 left-[-9999px] opacity-100 pointer-events-none print:left-0 z-[-1]"
                    style={{ width: '1122px', height: '794px' }}
                >
                    <div id="certificate-ghost-capture" style={{ width: '1122px', height: '794px', overflow: 'hidden', backgroundColor: 'white' }}>
                        <CertificateTemplate recipientName={recipientName} courseName={courseName} date={issueDate} certificateId={certId} verificationToken={verificationToken} />
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