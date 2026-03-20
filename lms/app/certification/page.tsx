"use client"

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Script from 'next/script';
import { CertificateTemplate } from '@/components/CertificateTemplate';
import { PDFCertificate } from '@/components/PDFCertificate';
import { ChevronLeft, Download, Printer, Loader2, CheckCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    { ssr: false }
);

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

    // Dynamically update document title for better PDF naming and browser experience
    useEffect(() => {
        if (recipientName && courseName) {
            document.title = `Certificate - ${recipientName} - ${courseName}`;
        }
    }, [recipientName, courseName]);


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

    const [pdfKey, setPdfKey] = useState(Date.now());
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Update PDF key when data changes to ensure fresh generation
    useEffect(() => {
        if (isMounted) {
            setPdfKey(Date.now());
        }
    }, [recipientName, courseName, certId, isMounted]);

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
                        <Suspense fallback={<div className="px-10 py-3.5 bg-gray-200 rounded-2xl animate-pulse w-48 text-transparent font-bold text-sm">Instant Download</div>}>
                            <PDFDownloadLink
                                key={pdfKey}
                                document={<PDFCertificate recipientName={recipientName} courseName={courseName} date={new Date().toLocaleDateString()} certificateId={certId} />}
                                fileName={`HB_CERT_${certId}.pdf`}
                                style={{
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    paddingLeft: 40,
                                    paddingRight: 40,
                                    paddingTop: 14,
                                    paddingBottom: 14,
                                    borderRadius: 16,
                                    backgroundColor: '#FF5B5B',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 14,
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 20px 25px -5px rgba(255, 91, 91, 0.2)',
                                }}
                            >
                                {/* @ts-ignore */}
                                {({ loading, error }) => (
                                    <>
                                        {loading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                                        {loading ? 'Preparing...' : error ? 'Export Failed' : 'Instant Download'}
                                    </>
                                )}
                            </PDFDownloadLink>
                        </Suspense>
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
                    <CertificateTemplate recipientName={recipientName} courseName={courseName} date={new Date().toLocaleDateString()} certificateId={certId} />
                </div>

                {/* THE EXPORT SOURCE (Invisible in UI, the only thing that shows in Print) */}
                <div 
                    id="print-portal-source" 
                    className="absolute top-0 left-[-9999px] opacity-100 pointer-events-none print:left-0 z-[-1]"
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