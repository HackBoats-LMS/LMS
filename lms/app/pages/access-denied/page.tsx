"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Mail, Lock } from 'lucide-react';

export default function AccessDenied() {
  const [supportEmail, setSupportEmail] = useState<string>("support@hackboats.in");

  useEffect(() => {
    fetch("/api/admin/config")
      .then(res => res.json())
      .then(data => {
        if (data.ok && data.supportEmail) {
          setSupportEmail(data.supportEmail);
        }
      })
      .catch(err => console.error("Failed to fetch support email:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans flex items-center justify-center p-6">
      {/* Decorative Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-100 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-white">
          <div className="p-10 text-center">
            {/* Icon Group */}
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 bg-red-50 rounded-3xl rotate-6 transition-transform group-hover:rotate-12"></div>
              <div className="relative flex items-center justify-center w-full h-full bg-red-100 text-red-600 rounded-3xl shadow-inner">
                <Lock size={40} className="stroke-[2.5]" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-md border border-gray-50">
                <ShieldAlert size={20} className="text-amber-500" />
              </div>
            </div>
            
            <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Access Restricted</h1>
            <p className="text-gray-500 mb-10 text-sm leading-relaxed font-medium px-4">
              Your account is not currently authorized to access the HackBoats LMS. This usually occurs when the system is in <span className="text-gray-900 font-bold">Secure Access</span> mode and your email hasn't been pre-approved.
            </p>
            
            <div className="space-y-4">
              <Link 
                href="/pages/login"
                className="flex items-center justify-center gap-3 w-full p-4.5 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl transition-all shadow-xl active:scale-95 group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Return to Login
              </Link>
              
              <a 
                href={`mailto:${supportEmail}`}
                className="flex items-center justify-center gap-3 w-full p-4.5 bg-blue-50 text-blue-600 font-bold rounded-2xl border border-blue-100 hover:bg-blue-100 transition-all active:scale-95"
              >
                <Mail size={20} />
                Contact Administrator: {supportEmail}
              </a>
            </div>
          </div>
          
          <div className="bg-gray-50/50 p-6 border-t border-gray-100 flex flex-col items-center gap-2">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              HackBoats Cloud Security
            </p>
            <div className="flex gap-4 opacity-50 grayscale">
              {/* Simple geometric decorations representing a dashboard look */}
              <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
              <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
              <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-gray-400 text-xs font-medium">
          Error Code: <span className="bg-gray-200 px-2 py-0.5 rounded text-gray-600 font-mono">403_RESTRICTED_ACCESS</span>
        </p>
      </div>
    </div>
  );
}
