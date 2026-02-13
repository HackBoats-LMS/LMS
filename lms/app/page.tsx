"use client";

import OptionCard from "@/components/OptionCard";
import Timetable from "@/components/Timetable";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Never auto-redirect to admin dashboard from home page
  }, [session, router]);

  const options = [
    {
      id: 1,
      name: "Courses",
      link: "/pages/courses",
      color: "#8CAAAF",
      img: "https://kalvium.community/assets/launcher-livebooks-logo-13706a15.svg",
    },
    {
      id: 2,
      name: "Events",
      link: "/pages/events",
      color: "#B9A2A7",
      img: "https://kalvium.community/assets/launcher-mail-logo-d2f5af18.svg",
    }
  ];

  return (
    <div className="min-h-screen w-full flex bg-white">


      <div className="flex-1 bg-transparent pt-20 relative" style={{
        backgroundImage: 'radial-gradient(circle, #D8D8D8 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        backgroundColor: '#FFFFFF'
      }}><Sidebar />
        {/* Dotted background pattern */}
        {/* tighter container like image */}
        <div className="max-w-[1050px] mx-auto px-6 py-6 relative z-10">
          <div className="flex gap-14">
            {/* LEFT COLUMN (smaller like image) */}
            <div className="flex flex-col gap-8 w-[560px] shrink-0">
              {/* Profile */}
              <div className="relative px-6 py-8 flex justify-between items-start min-h-[180px] overflow-hidden border-b-3" style={{ backgroundColor: '#DCE9F0', borderBottomColor: '#8BB4CC' }}>
                {/* Stripe pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" patternUnits="userSpaceOnUse" width="20" height="20">
                        <line x1="0" y1="0" x2="20" y2="0" stroke="#60a5fa" strokeWidth="1" />
                        <line x1="0" y1="0" x2="0" y2="20" stroke="#60a5fa" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                <div className="space-y-2.5 relative z-10">
                  <h1 className="text-2xl font-bold" style={{ color: '#294F63' }}>
                    Hi {session?.user?.name || "Full Name"} 👋
                  </h1>



                  <p className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    B-TECH (CSE) Specialization in Software Product Engineering
                  </p>

                  <p className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Godavari Global University
                  </p>

                  <p className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    Class of 2028
                  </p>
                </div>

                <img
                  src="https://ggu.edu.in/wp-content/uploads/2025/03/ggu-new-logo.png"
                  alt="University Logo"
                  className="w-16 h-16 object-contain bg-white p-1.5"
                />
              </div>

              {/* Timetable */}
              <div className="relative">
                <h2 className="text-sm font-bold text-black mb-3">My Day</h2>
                <div className="h-[280px] relative z-10 bg-white" style={{
                  backgroundImage: 'radial-gradient(circle, #D8D8D8 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}>
                  <Timetable />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div>
              <h2 className="text-sm font-bold text-gray-500 mb-3 ">Your Apps</h2>
              <div className="grid grid-cols-3 gap-x-4 gap-y-5 content-start">
                {options.map((item) => (
                  <OptionCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
