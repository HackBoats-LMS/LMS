"use client";

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { LayoutDashboard, BookOpen, CreditCard, User, LogOut, X, Lock } from 'lucide-react';

interface SidebarProps {
    activePage: 'dashboard' | 'courses' | 'events' | 'profile' | 'adminDashboard' | 'manageUsers' | 'adminProgress';
    isOpen?: boolean;
    setIsOpen?: (open: boolean) => void;
}

const DashboardSidebar: React.FC<SidebarProps> = ({ activePage, isOpen, setIsOpen }) => {
    const { data: session } = useSession();
    const isProfileIncomplete = session?.user && !session.user.isAdmin && !session.user.isProfileComplete;

    const menuItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={20} />, id: 'dashboard', link: "/", locked: isProfileIncomplete },
        { name: "Courses", icon: <BookOpen size={20} />, id: 'courses', link: "/pages/courses", locked: isProfileIncomplete },
        { name: "Events", icon: <CreditCard size={20} />, id: 'events', link: "/pages/events", locked: isProfileIncomplete },
        { name: "Profile", icon: <User size={20} />, id: 'profile', link: "/pages/profile", locked: false },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 xl:hidden transition-opacity"
                    onClick={() => setIsOpen?.(false)}
                />
            )}

            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col p-6 
                transition-transform duration-300 ease-in-out
                xl:relative xl:translate-x-0 xl:z-auto xl:shrink-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}
            `}>
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-2 text-[#FF5B5B]">
                        <img
                            src="https://www.hackboats.com/images/logo.png"
                            alt="Academy Logo"
                            className="h-8 w-auto"
                        />
                    </div>
                    <button
                        onClick={() => setIsOpen?.(false)}
                        className="p-2 -mr-2 text-gray-400 hover:text-gray-600 xl:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = activePage === item.id;
                        return (
                            <Link
                                key={item.id}
                                href={item.locked ? "/pages/profile" : item.link}
                                onClick={() => setIsOpen?.(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors relative ${
                                    isActive 
                                    ? 'bg-[#FFF0F0] text-[#FF5B5B]' 
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-normal'
                                }`}
                            >
                                <span className={isActive ? "text-[#FF5B5B]" : "text-gray-400"}>{item.icon}</span>
                                <span className="flex-1">{item.name}</span>
                                {item.locked && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">
                                        <Lock size={14} />
                                    </div>
                                )}
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
        </>
    );
};

export default DashboardSidebar;

