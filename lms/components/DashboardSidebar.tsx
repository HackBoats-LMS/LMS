"use client";

import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, BookOpen, CreditCard, LogOut } from 'lucide-react';

interface SidebarProps {
    activePage: 'dashboard' | 'courses' | 'events';
}

const DashboardSidebar: React.FC<SidebarProps> = ({ activePage }) => {
    const menuItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={20} />, id: 'dashboard', link: "/" },
        { name: "Courses", icon: <BookOpen size={20} />, id: 'courses', link: "/pages/courses" },
        { name: "Events", icon: <CreditCard size={20} />, id: 'events', link: "/pages/events" },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col p-6 hidden md:flex h-screen sticky top-0 shrink-0">
            <div className="flex items-center gap-2 mb-10 text-[#FF5B5B]">
                <img
                    src="https://www.hackboats.com/images/logo.png"
                    alt="Academy Logo"
                    className="h-8 w-auto"
                />
            </div>

            <nav className="flex-1 space-y-1">
                {menuItems.map((item) => {
                    const isActive = activePage === item.id;
                    return (
                        <Link
                            key={item.id}
                            href={item.link}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-[#FFF0F0] text-[#FF5B5B]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <span className={isActive ? "text-[#FF5B5B]" : "text-gray-400"}>{item.icon}</span>
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="pt-6 border-t border-gray-100 space-y-1">
                <button
                    onClick={() => {
                        if (typeof window !== 'undefined') {
                            localStorage.removeItem('lms_timetable');
                            localStorage.removeItem('lms_events');
                            localStorage.removeItem('lms_progress');
                        }
                        signOut({ callbackUrl: "/" });
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-red-600 w-full"
                >
                    <LogOut size={20} className="text-gray-400" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
