"use client"

import { Orbitron, IBM_Plex_Sans } from 'next/font/google';
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

// Vibrant Branding Components from the "Old UI"
const HackBoatsLogo: React.FC = () => (
    <svg width="217" height="51" viewBox="0 0 217 51" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-64 h-14">
        <g clipPath="url(#clip0_12_99)">
            <path d="M0.436157 9.5625H21.5041V49.9375L0.436157 9.5625Z" fill="#E1500A" stroke="#E1500A" />
            <path d="M24.6643 16.4688V10.0938L56.2661 9.5625V16.4688H24.6643Z" fill="#1496D2" stroke="#1496D2" />
            <path d="M40.4653 0.265625C47.2961 0.265625 52.8426 5.96881 52.8426 13.0156C52.8426 20.0624 47.2961 25.7656 40.4653 25.7656C33.6346 25.7656 28.0879 20.0624 28.0879 13.0156C28.0879 5.96881 33.6346 0.265625 40.4653 0.265625Z" fill="#37A5D7" stroke="#37A5D7" />
            <path d="M24.6643 29.2188V22.3125H52.8426L56.2661 29.2188H24.6643Z" fill="#1496D2" stroke="#1496D2" />
            <path d="M35.1984 17.5312C37.2346 17.5312 38.8853 15.8663 38.8853 13.8125C38.8853 11.7587 37.2346 10.0938 35.1984 10.0938C33.1622 10.0938 31.5115 11.7587 31.5115 13.8125C31.5115 15.8663 33.1622 17.5312 35.1984 17.5312Z" fill="white" />
            <path d="M45.7323 17.5312C47.7685 17.5312 49.4192 15.8663 49.4192 13.8125C49.4192 11.7587 47.7685 10.0938 45.7323 10.0938C43.6961 10.0938 42.0454 11.7587 42.0454 13.8125C42.0454 15.8663 43.6961 17.5312 45.7323 17.5312Z" fill="white" />
            <path d="M124.427 50.4687H110.598V31.9302H124.048C127.638 31.9302 130.015 33.5622 130.015 36.7242C130.015 39.0702 128.826 40.2432 127.461 40.6767C129.13 41.2122 130.343 42.6912 130.343 44.8587C130.343 48.2502 128.017 50.4687 124.427 50.4687ZM124.301 42.4107H116.135V39.6822H124.073C125.894 39.6822 126.753 39.0447 126.753 37.4382C126.753 35.4747 125.211 35.1687 122.835 35.1687H113.809V47.2557H123.113C125.413 47.2557 127.082 46.6182 127.082 44.8077C127.082 43.2777 126.096 42.4107 124.301 42.4107ZM146.008 50.4687H141.534C136.401 50.4687 132.609 46.3887 132.609 41.0082C132.609 35.5512 136.401 31.9302 141.534 31.9302H146.008C151.317 31.9302 155.009 35.6277 155.009 41.0082C155.009 46.3887 151.242 50.4687 146.008 50.4687ZM141.534 47.2302H146.008C149.396 47.2302 151.798 44.6547 151.798 41.1612C151.798 37.6677 149.396 35.1687 146.008 35.1687H141.534C138.247 35.1687 135.82 37.6422 135.82 41.1612C135.82 44.6547 138.222 47.2302 141.534 47.2302ZM178.194 50.4687H174.326L171.57 45.8022H162.873L164.39 43.1757H170.028L165.932 36.2397L157.589 50.4687H153.924L164.491 32.7207C164.871 32.0832 165.351 31.6752 166.059 31.6752C166.767 31.6752 167.222 32.0832 167.601 32.7207L178.194 50.4687ZM186.015 50.4687H182.804V35.1687H175.826V31.9302H192.993V35.1687H186.015V50.4687ZM208.888 50.4687H195.109V47.2302H208.888C210.607 47.2302 211.568 46.2612 211.568 44.8077C211.568 43.2267 210.607 42.4107 208.888 42.4107H200.444C196.98 42.4107 194.831 40.1922 194.831 37.1322C194.831 34.1487 196.828 31.9302 200.494 31.9302H213.691V35.1687H200.494C199.028 35.1687 198.168 36.0357 198.168 37.4382C198.168 38.8407 199.053 39.6822 200.469 39.6822H208.888C212.604 39.6822 214.601 41.4417 214.601 45.0372C214.601 48.1482 212.731 50.4687 208.888 50.4687Z" fill="#FF5700" />
            <path d="M42.7145 50.5452H39.5037V42.4872H30.2506V39.6057H39.5037V31.9302H42.7145V50.5452ZM27.9247 50.5452H24.714V31.9302H27.9247V50.5452ZM68.9285 50.4687H65.0605L62.3048 45.8022H53.6079L55.1248 43.1757H60.7626L56.667 36.2397L48.3242 50.4687H44.6583L55.2259 32.7207C55.6051 32.0832 56.0855 31.6752 56.7934 31.6752C57.5013 31.6752 57.9563 32.0832 58.3356 32.7207L68.9285 50.4687ZM86.8173 50.4687H76.8564C71.7242 50.4687 67.932 46.3887 67.932 41.0082C67.932 35.5512 71.7242 31.9302 76.8564 31.9302H86.8173V35.1687H76.8564C73.5698 35.1687 71.1428 37.6422 71.1428 41.1612C71.1428 44.6547 73.5445 47.2302 76.8564 47.2302H86.8173V50.4687ZM109.472 50.4687H104.568L94.278 42.3087C93.7218 41.8752 93.6207 41.4672 93.6207 40.9572C93.6207 40.3962 93.7724 39.9882 94.4297 39.4782L104.163 31.9302H109.093L97.059 40.9827L109.472 50.4687ZM92.6347 50.4687H89.424V31.9302H92.6347V50.4687Z" fill="#1497D2" />
        </g>
        <defs>
            <clipPath id="clip0_12_99">
                <rect width="217" height="51" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

const BotFace: React.FC = () => (
    <svg width="172" height="172" viewBox="0 0 162 162" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-64 h-64">
        <g opacity="0.33">
            <path d="M0.5 90.1818V55.2727L160.5 52.3636V90.1818H0.5Z" fill="#1496D2" stroke="#1496D2" />
            <path d="M80.5 0.5C115.521 0.500002 144 32.1339 144 71.2725C144 110.411 115.521 142.046 80.5 142.046C45.4792 142.046 17 110.411 17 71.2725C17.0001 32.1339 45.4793 0.5 80.5 0.5Z" fill="#37A5D7" stroke="#37A5D7" />
            <path d="M0.5 160V122.182H143.167L160.5 160H0.5Z" fill="#1496D2" stroke="#1496D2" />
            <ellipse cx="53.8333" cy="75.6364" rx="18.6667" ry="20.3636" fill="white" />
            <ellipse cx="107.167" cy="75.6364" rx="18.6667" ry="20.3636" fill="white" />
        </g>
    </svg>
);

const CertificationStamp: React.FC = () => (
    <div className="relative w-32 h-32 flex flex-col items-center justify-center">
        <div className="absolute inset-0 border-[1.5px] border-black rounded-full" />
        <div className={`${orbitron.className} text-center font-bold text-black flex flex-col items-center justify-center gap-0.5`}>
            <span className="text-[11px] tracking-[0.2em] leading-none uppercase">Certified</span>
            <div className="w-14 h-[1px] bg-black/20 my-0.5" />
            <span className="text-[11px] tracking-[0.2em] leading-none uppercase">Hackboats</span>
        </div>
    </div>
);

const RightBar: React.FC = () => (
    <svg width="72" height="100%" viewBox="0 0 72 595" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute right-0 top-0 h-full w-20">
        <path d="M0 196V0H72V189C72 189 58 193.5 47 189C36 184.5 27 180.406 17 185C9.71884 188.345 0 196 0 196Z" fill="#154854" />
        <path d="M21 190.5C10.2304 194.957 0 205 0 205V388.936C0 388.936 5.8751 397.563 15.5 399.709C25.1249 401.854 36.6511 391.527 47 388.936C57.3489 386.345 72 395.215 72 395.215V195.5C72 195.5 58.3621 199.994 48 195.5C37.6379 191.006 31.7696 186.043 21 190.5Z" fill="#D2DF64" />
        <path d="M23.5 406.5C13.5705 410.017 0 399 0 399V595H72V402.5C72 402.5 62.8442 396.233 51 396C39.1558 395.767 33.4295 402.983 23.5 406.5Z" fill="#FF5C5C" />
    </svg>
);

export interface CertificateTemplateProps {
    recipientName: string;
    courseName: string;
    date?: string;
    certificateId?: string;
}

export const CertificateTemplate: React.FC<CertificateTemplateProps> = ({
    recipientName,
    courseName,
    date = "March 13, 2026",
    certificateId = 'HB-2024-001',
}) => {
    return (
        <div className={`${orbitron.variable} ${ibmPlexSans.variable} font-sans`}>
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
                        @page { size: landscape; margin: 0; }
                        body { margin: 0; padding: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                        #certificate-print-area { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
                    }
                `}} />

                {/* Right Side Decorative Bar */}
                <RightBar />

                {/* Main Content Container */}
                <div className="relative h-full flex flex-col items-center justify-center px-[96px] py-[48px]">

                    {/* Logo */}
                    <div className="mb-[48px]">
                        <HackBoatsLogo />
                    </div>

                    {/* Certificate Title */}
                    <div className="text-center mb-[32px]">
                        <h1 className={`${orbitron.className} text-[60px] text-black tracking-wider mb-[8px]`}>
                            CERTIFICATE
                        </h1>
                        <p className={`${orbitron.className} text-[18px] text-gray-600 tracking-widest uppercase`}>
                            OF COMPLETION
                        </p>
                    </div>

                    {/* Certification Text */}
                    <div className="text-center space-y-[24px]">
                        <p className={`${ibmPlexSans.className} text-[18px] text-gray-700 font-light uppercase tracking-[0.2em]`}>
                            This certifies that
                        </p>

                        {/* Recipient Name */}
                        <h2 className={`${ibmPlexSans.className} text-[48px] font-bold text-black border-b-[3px] border-black/5 pb-[8px] inline-block px-[40px]`}>
                            {recipientName.toUpperCase()}
                        </h2>

                        <p className={`${ibmPlexSans.className} text-[18px] text-gray-700 font-light uppercase tracking-[0.2em]`}>
                            has successfully completed
                        </p>

                        {/* Course Name */}
                        <h3 className={`${ibmPlexSans.className} text-[36px] font-semibold text-[#FF5B5B] my-[16px]`}>
                            {courseName}
                        </h3>

                        <p className={`${ibmPlexSans.className} text-[12px] text-gray-400 tracking-[0.3em] font-medium`}>
                            HACKBOATS LEARNING PLATFORM
                        </p>
                    </div>

                    {/* Bot Face (Very Left and Bottom) */}
                    <div className="absolute -bottom-1 left-[32px] opacity-80 scale-75 origin-bottom-left leading-[0]">
                        <BotFace />
                    </div>

                    {/* Bottom Section (Stamp & ID) */}
                    <div className="absolute bottom-[48px] right-[96px] flex flex-col items-center gap-[8px]">
                        <CertificationStamp />
                        <div className="text-black font-mono text-[10px] tracking-widest uppercase border-t border-gray-100 pt-[4px] mt-[8px]">
                            ID: {certificateId}
                        </div>
                        <div className="text-black font-mono text-[7px] tracking-widest uppercase">
                            verify at {process.env.NEXT_PUBLIC_SITE_URL}certification/verify
                        </div>
                        <div className="text-[10px] text-black font-mono mt-[2px]">{date}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
