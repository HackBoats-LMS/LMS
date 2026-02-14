"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  Search,
  Bell,
  User,
  LogOut,
  BookOpen,
  Award,
  LayoutDashboard,
  CreditCard,
  Settings,
  ChevronRight,
  PlayCircle,
  CheckCircle2
} from "lucide-react";

const CoursesPage = () => {
  const { data: session } = useSession();

  const courses = [
    {
      id: 1,
      name: "Full Stack Web Development",
      code: "FSWD",
      link: "/pages/fswd",
      description: "Master front-end and back-end technologies to build complete, scalable web applications.",
      icon: <BookOpen className="w-6 h-6 text-cyan-600" />,
      color: "bg-cyan-50 border-cyan-100",
      textColor: "text-cyan-600",
      progressColor: "bg-cyan-500",
      btnColor: "bg-cyan-50 text-cyan-600 hover:bg-cyan-100",
      credits: 4,
      modules: 18,
      progress: 35
    },
    {
      id: 2,
      name: "Operating Systems",
      code: "OS",
      link: "/pages/os",
      description: "Explore the internal architecture, process management, and design principles of modern OS.",
      icon: <Award className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50 border-purple-100",
      textColor: "text-purple-600",
      progressColor: "bg-purple-500",
      btnColor: "bg-purple-50 text-purple-600 hover:bg-purple-100",
      credits: 3,
      modules: 25,
      progress: 12
    }
  ];

  return (
    <div className="flex h-screen bg-[#FFF8F8] font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col p-6 hidden md:flex">
        <div className="flex items-center gap-2 mb-10 text-[#FF5B5B]">
          <img
            src="https://www.hackboats.com/images/logo.png"
            alt="Academy Logo"
            className="h-8 w-auto"
          />
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { name: "Dashboard", icon: <LayoutDashboard size={20} />, active: false, link: "/pages/studentDashboard" },
            { name: "Lessons", icon: <BookOpen size={20} />, active: true, link: "/pages/courses" },
            { name: "Events", icon: <CreditCard size={20} />, active: false, link: "/pages/events" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${item.active ? 'bg-[#FFF0F0] text-[#FF5B5B]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <span className={item.active ? "text-[#FF5B5B]" : "text-gray-400"}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-gray-100 space-y-1">
          
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-red-600 w-full"
          >
            <LogOut size={20} className="text-gray-400" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden p-4 md:p-8">
        {/* Header */}
        <header className="flex-none flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Courses</h1>
            <p className="text-sm text-gray-500 mt-1">Pick up where you left off</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5B5B]/20 w-64 shadow-sm"
              />
            </div>

            <button className="relative p-2 bg-white rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#FF5B5B] rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 hidden sm:block">{session?.user?.name || "Student"}</span>
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center">
                {session?.user?.image ? (
                  <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="text-gray-400" />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Courses Grid - Scrollable Container */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full min-h-[300px]">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${course.color}`}>
                    {course.icon}
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${course.color} ${course.textColor}`}>
                    {course.code}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#FF5B5B] transition-colors">
                  {course.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-2 flex-grow">
                  {course.description}
                </p>

                <div className="mt-auto space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span className="text-gray-500">Progress</span>
                      <span className={course.textColor}>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${course.progressColor} transition-all duration-500`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-gray-50 pt-3">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      <span>{course.credits} Credits</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{course.modules} Modules</span>
                    </div>
                  </div>

                  <Link
                    href={course.link}
                    className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${course.btnColor}`}
                  >
                    Continue Learning <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoursesPage;
