"use client";

import React from 'react';
import Link from 'next/link';
import { Menu, User, Search, Bell } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface StudentHeaderProps {
    title: string | React.ReactNode;
    subtitle?: string;
    onMenuClick: () => void;
    showSearch?: boolean;
    showNotifications?: boolean;
}

const StudentHeader: React.FC<StudentHeaderProps> = ({ 
    title, 
    subtitle, 
    onMenuClick, 
    showSearch = false, 
    showNotifications = false 
}) => {
    const { data: session } = useSession();

    return (
        <header className="flex-none flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg xl:hidden transition-colors"
                >
                    <Menu size={24} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 line-clamp-1">{title}</h1>
                    {subtitle && <p className="text-sm text-gray-500 mt-1 hidden sm:block">{subtitle}</p>}
                </div>
            </div>

            <div className="flex items-center gap-6">
                {showSearch && (
                    <div className="relative hidden xl:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-100 w-64 shadow-sm transition-all"
                        />
                    </div>
                )}

                {showNotifications && (
                    <button className="relative p-2 bg-white rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors shadow-sm">
                        <Bell size={20} />
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#FF5B5B] rounded-full border-2 border-white"></span>
                    </button>
                )}

                <Link href="/pages/profile" className="flex items-center gap-3 hover:opacity-80 transition-all group">
                    <span className="text-sm font-medium text-gray-700 hidden sm:block group-hover:text-gray-900">{session?.user?.name || "Student"}</span>
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-105">
                        {session?.user?.image ? (
                            <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User className="text-gray-400" />
                        )}
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default StudentHeader;
