"use client"

import { Orbitron, IBM_Plex_Sans, Montserrat, Dancing_Script } from 'next/font/google';
import React from 'react';

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-orbitron',
});

const ibmPlexSans = IBM_Plex_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-ibm-plex-sans',
});

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-montserrat',
});

const dancingScript = Dancing_Script({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-dancing-script',
});

export interface CertificateTemplateProps {
    recipientName: string;
    courseName: string;
    date?: string;
    certificateId?: string;
    verificationToken?: string;
}

export const CertificateTemplate: React.FC<CertificateTemplateProps> = ({
    recipientName,
    courseName,
    date = "March 13, 2026",
    certificateId = 'HB-2024-001',
    verificationToken = '',
}) => {
    return (
        <div className={`${orbitron.variable} ${ibmPlexSans.variable} font-sans block leading-none`}>
            {/* 
                THE PREMIER LAYOUT
                Fixed pixels (1122x794) for unshakeable A4 Landscape quality.
            */}
            <div
                id="certificate-print-area"
                className="relative w-[1122px] h-[794px] bg-white overflow-hidden shadow-none rounded-none border-none box-border"
            >
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @media print {
                        @page { size: 297mm 210mm; margin: 0; }
                        body { margin: 0; padding: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                        #certificate-print-area { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
                    }
                `}} />

                {/* Background Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                    src="/certificate.png" 
                    alt="Certificate Background" 
                    className="absolute inset-0 w-full h-full object-cover z-0" 
                />

                {/* Text Overlay Container */}
                <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center">
                    
                    {/* Recipient Name */}
                    <div 
                        className="absolute w-full text-center flex items-center justify-center"
                        style={{ top: "45%", height: "10%" }}
                    >
                        <h2 className={`${montserrat.className} text-[60px] font-[800] tracking-widest text-black uppercase`}>
                            {recipientName || "STUDENT NAME"}
                        </h2>
                    </div>

                    {/* Course Name - Positioned between HAS SUCCESSFULLY COMPLETED and HACKBOATS LEARNING PLATFORM */}
                    <div 
                        className="absolute w-full text-center flex items-center justify-center"
                        style={{ top: "61%", height: "8%" }}
                    >
                        <h3 className={`${ibmPlexSans.className} text-[48px] font-bold text-[#FF5B5B]`}>
                            {courseName || "Course Name"}
                        </h3>
                    </div>

                    {/* Certificate ID and Verify Link - Positioned between the stars at the bottom */}
                    <div 
                        className="absolute w-full text-center flex flex-col items-center justify-center gap-1"
                        style={{ top: "82%", height: "6%" }}
                    >
                        <span className={`${montserrat.className} text-[11px] font-[600] text-[#1D1D1F]`}>
                            ID: {certificateId || 'HB-2024-001'}
                        </span>
                        <span className={`${montserrat.className} text-[10px] font-bold text-[#FF5B5B] uppercase mt-[2px]`}>
                            VERIFY AT
                        </span>
                        <span className={`${montserrat.className} text-[10px] font-[500] text-[#1D1D1F]`}>
                            {process.env.NEXT_PUBLIC_SITE_URL || 'https://lms.hackboats.com/'}certification/verify
                        </span>
                    </div>

                    {/* Date - Bottom Center below star */}
                    <div 
                        className="absolute w-full text-center flex items-center justify-center"
                        style={{ top: "92%", height: "4%" }}
                    >
                        {date && (
                            <span className={`${dancingScript.className} text-[24px] font-[600] text-[#1D1D1F]`}>
                                {date}
                            </span>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
};
