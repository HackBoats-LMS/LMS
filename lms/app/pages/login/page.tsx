"use client"

import React from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

const login = () => {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center px-4 relative"
      style={{
        backgroundColor: "#FFFFFF",
        backgroundImage: "linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Decorative icons scattered around */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top left area */}
        <div className="absolute top-12 left-16" style={{transform: 'rotate(-15deg)'}}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#a8c5e3" strokeWidth="1">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <path d="M8 21h8M12 17v4"/>
          </svg>
        </div>
        
        <div className="absolute" style={{top: '70%', left: '8%', transform: 'rotate(-10deg)'}}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c5a8e3" strokeWidth="1">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div className="absolute" style={{top: '8%', left: '25%', transform: 'rotate(20deg)'}}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#e3d4a8" strokeWidth="1">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
       
        
        {/* Top right area */}
        <div className="absolute top-16 right-20" style={{transform: 'rotate(10deg)'}}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a8e3c5" strokeWidth="1">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
        </div>
        <div className="absolute top-96 right-12" style={{transform: 'rotate(-20deg)'}}>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#e3c5a8" strokeWidth="1">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <div className="absolute" style={{top: '65%', right: '10%', transform: 'rotate(18deg)'}}>
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#c5e3a8" strokeWidth="1">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          </svg>
        </div>
        <div className="absolute" style={{top: '8%', right: '28%', transform: 'rotate(-12deg)'}}>
          <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#d4a8e3" strokeWidth="1">
            <rect x="2" y="6" width="20" height="12" rx="2"/>
            <path d="M7 12h10"/>
          </svg>
        </div>
       
        
        {/* Middle left */}
        <div className="absolute" style={{top: '45%', left: '5%', transform: 'rotate(-20deg)'}}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#e3a8c5" strokeWidth="1">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
        </div>
        <div className="absolute" style={{top: '25%', left: '12%', transform: 'rotate(12deg)'}}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#a8e3e3" strokeWidth="1">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
        </div>
        <div className="absolute" style={{top: '32%', left: '20%', transform: 'rotate(-8deg)'}}>
          <svg width="43" height="43" viewBox="0 0 24 24" fill="none" stroke="#c5d4e3" strokeWidth="1">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        </div>
        
        {/* Middle right */}
        <div className="absolute" style={{top: '40%', right: '5%', transform: 'rotate(15deg)'}}>
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#e3e3a8" strokeWidth="1">
            <rect x="2" y="7" width="20" height="14" rx="2"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
        </div>
        <div className="absolute" style={{top: '22%', right: '12%', transform: 'rotate(-10deg)'}}>
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#a8c5c5" strokeWidth="1">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"/>
          </svg>
        </div>
        <div className="absolute" style={{top: '30%', right: '22%', transform: 'rotate(22deg)'}}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#e3c5d4" strokeWidth="1">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        
        {/* Bottom right */}
        <div className="absolute bottom-20 right-24" style={{transform: 'rotate(20deg)'}}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#c5c5a8" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M9 9h6v6H9z"/>
          </svg>
        </div>
      
        
        {/* Bottom left */}
        <div className="absolute bottom-24 left-20" style={{transform: 'rotate(-25deg)'}}>
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#e3a8b8" strokeWidth="1">
            <rect x="2" y="6" width="20" height="12" rx="2"/>
            <path d="M7 12h10"/>
          </svg>
        </div>
        <div className="absolute" style={{bottom: '35%', left: '15%', transform: 'rotate(15deg)'}}>
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#b8e3a8" strokeWidth="1">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20"/>
          </svg>
        </div>
        <div className="absolute" style={{bottom: '10%', left: '8%', transform: 'rotate(-22deg)'}}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#a8b8d4" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M9 9h6v6H9z"/>
          </svg>
        </div>
        
        {/* Top center */}
        <div className="absolute top-20 left-1/2" style={{transform: 'translateX(-50%) rotate(-10deg)'}}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e3b8c5" strokeWidth="1">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          </svg>
        </div>
        <div className="absolute" style={{top: '12%', left: '38%', transform: 'rotate(18deg)'}}>
          <svg width="43" height="43" viewBox="0 0 24 24" fill="none" stroke="#d4c5e3" strokeWidth="1">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
     
        
        {/* Bottom center */}
        <div className="absolute bottom-20 left-1/2" style={{transform: 'translateX(-50%) rotate(30deg)'}}>
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#b8c5e3" strokeWidth="1">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute" style={{bottom: '38%', right: '18%', transform: 'rotate(-18deg)'}}>
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#c5b8e3" strokeWidth="1">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        </div>
        <div className="absolute" style={{bottom: '15%', left: '35%', transform: 'rotate(12deg)'}}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#e3d4c5" strokeWidth="1">
            <rect x="2" y="7" width="20" height="14" rx="2"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
        </div>
        <div className="absolute" style={{bottom: '15%', left: '65%', transform: 'rotate(-20deg)'}}>
          <svg width="43" height="43" viewBox="0 0 24 24" fill="none" stroke="#c5e3d4" strokeWidth="1">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
        </div>
      </div>

      {/* Main login card */}
      <div className="w-full bg-white border border-gray-300 px-12 py-10 relative z-10" style={{maxWidth: '600px'}}>
        <img 
          src="https://ggu.edu.in/wp-content/uploads/2025/03/ggu-new-logo.png" 
          alt="University Logo" 
          className="h-12 mb-8"
        />
        
        <p className="text-gray-800 text-base font-semibold mb-8 leading-relaxed">
          Unlock your potential and transform into a skilled software professional with the university's world-class integrated computer science program.
        </p>
        
        <button 
          onClick={() => signIn("google", { callbackUrl: "/?student=true" })} 
          className="border border-gray-400 bg-white px-6 py-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors mb-6"
          style={{borderRadius: '4px'}}
        >
          <Image 
            src="https://kalvium.community/assets/google_icon-c3f37307.svg" 
            alt="Google Logo" 
            width={20} 
            height={20}
          />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>
        
        <a href="https://ggu.edu.in/" target="_blank" rel="noopener noreferrer" className="text-gray-700 underline text-sm font-bold hover:text-gray-900">
          Know More About University
        </a>
      </div>
    </div>
  )
}

export default login
