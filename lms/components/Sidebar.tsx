"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-14 bg-white border-r-2 border-gray-700 flex flex-col justify-between py-4 overflow-hidden">
     
      <div className="flex flex-col items-center">
        <button onClick={handleHomeClick} className="p-3 hover:bg-gray-100    cursor-pointer">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
      </div>

      
      <div ref={profileRef} className="relative flex flex-col items-center">
        <button onClick={() => setShowProfile(!showProfile)} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
          <svg className="w-8 h-8" fill="#000000" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </button>
        
        {showProfile && (
          <div className="fixed bottom-4 left-20 bg-white border-2 border-black z-50" style={{boxShadow: '3px 3px 0px 0px #454545'}}>
            <button onClick={() => signOut({ callbackUrl: "/pages/login" })} className="w-full text-center px-4 py-2 hover:bg-gray-100 text-black font-bold uppercase text-sm">
              LOGOUT
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
