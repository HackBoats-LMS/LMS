"use client";

import React from "react";
import { useSession } from "next-auth/react";
import OptionCardL from "@/components/OptionCardL";
import Sidebar from "@/components/Sidebar";
import Planet from "@/public/icons/planet-earth.png"
import Nss from "@/public/icons/nss.png"
import Os from "@/public/icons/os.png"
import Eng from "@/public/icons/eng.png"
import Stu from "@/public/icons/structure.png"
import Fsm from "@/public/icons/fsm.png"
const page = () => {

  const options = [
    { id: 1, name: "FSWD", link: "/pages/fswd", description: "Full Stack Web Development covers front-end and back-end technologies to build complete web applications from scratch.", icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#06B6D4" strokeWidth="2" /><path d="M2 7h20" stroke="#06B6D4" strokeWidth="2" /><circle cx="6" cy="5" r="0.5" fill="#06B6D4" /><circle cx="8" cy="5" r="0.5" fill="#06B6D4" /><circle cx="10" cy="5" r="0.5" fill="#06B6D4" /><path d="M8 11l2 2 4-4" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 21h10" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" /><path d="M12 17v4" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" /></svg>, color: "#06B6D4", stats: { Credits: 4, Modules: 156, } },
    { id: 2, name: "Operating Systems", link: "/pages/os", description: "This course explores the internal structure, services, and design principles of modern operating systems. It introduces processes and threads.", icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#8B5CF6" strokeWidth="2" /><rect x="7" y="7" width="4" height="4" fill="#8B5CF6" opacity="0.3" /><rect x="13" y="7" width="4" height="4" fill="#8B5CF6" opacity="0.3" /><rect x="7" y="13" width="4" height="4" fill="#8B5CF6" opacity="0.3" /><rect x="13" y="13" width="4" height="4" fill="#8B5CF6" opacity="0.3" /></svg>, color: "#8B5CF6", stats: { Credits: 3, Modules: 25, } },
  ];


  return (
    <div className="flex h-screen overflow-hidden">
      <div className="fixed left-0 top-0 h-screen overflow-hidden z-50 w-16">
        <Sidebar />
      </div>
      <div className="flex-1 bg-transparent relative ml-16 overflow-hidden" style={{
        backgroundImage: 'radial-gradient(circle, #D8D8D8 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        backgroundColor: '#FFFFFF'
      }}>

        {/* Top Navigation Bar */}
        <header className="bg-white h-20 flex items-center justify-between px-8 border-b relative z-10" style={{ borderColor: '#EFEFEF' }}>

          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-9 h-7 rounded border-2 border-gray-400 bg-white flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#FF6B6B">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gray-300 rounded-b"></div>
            </div>
            <span className="font-bold text-2xl" style={{ color: '#1F2933' }}>Courses</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#FAFAFA', width: '320px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search courses..."
              className="bg-transparent outline-none flex-1 text-sm"
              style={{ color: '#1F2933' }}
            />
            <kbd className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: '#EFEFEF', color: '#6B7280' }}>Ctrl K</kbd>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden h-[calc(100vh-5rem)]">
          {/* Left Sidebar */}


          {/* Main Content */}
          <main className="flex-1 p-8 bg-transparent relative overflow-y-auto">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
              {options.map((item) => (
                <OptionCardL
                  key={item.id}
                  name={item.name}
                  href={item.link}
                  description={item.description}
                  icon={item.icon}
                  stats={item.stats}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default page;
