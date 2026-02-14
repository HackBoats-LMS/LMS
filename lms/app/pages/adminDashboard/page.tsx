"use client";

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import {
    LayoutDashboard,
    Users,
    Calendar,
    Megaphone,
    BarChart,
    BookOpen,
    LogOut,
    User,
    ChevronRight,
    Clock,
    Bell,
    CreditCard,
    CheckCircle2,
    Briefcase,
    TrendingUp,
    UserPlus
} from 'lucide-react';
import ManageUsers from "./components/ManageUsers";
import Timetable from "./components/Timetable";
import Events from "./components/Events";

// --- Types ---
interface StatsData {
    total: number;
    students: number;
    admins: number;
    newUsersLast7Days: number;
}

interface UserData {
    id: string;
    email: string;
    fullName: string;
    createdAt: string;
    isAdmin: boolean;
}

export default function AdminDashboard() {
    const { data: session } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [stats, setStats] = useState<StatsData>({ total: 0, students: 0, admins: 0, newUsersLast7Days: 0 });
    const [recentUsers, setRecentUsers] = useState<UserData[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [subjectStats, setSubjectStats] = useState<any[]>([]);
    const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);

    // Subject Configuration
    const SUBJECT_CONFIG: { [key: string]: any } = {
        'fswd': {
            name: 'FSWD',
            title: 'Full Stack Web Dev',
            color: 'text-cyan-600',
            bg: 'bg-cyan-50',
            border: 'border-cyan-100',
            stroke: '#0891b2'
        },
        'os': {
            name: 'OS',
            title: 'Operating Systems',
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            border: 'border-purple-100',
            stroke: '#9333ea'
        }
    };

    // Sidebar Items
    const sidebarItems = [
        { id: "dashboard", name: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { id: "users", name: "Manage Users", icon: <Users size={20} /> },
        { id: "timetable", name: "Timetable", icon: <Calendar size={20} /> },
        { id: "events", name: "Events", icon: <Megaphone size={20} /> },
        { id: "progress", name: "Student Progress", icon: <BarChart size={20} />, link: "/pages/adminProgress" },
        { id: "courses", name: "Courses", icon: <BookOpen size={20} />, link: "/pages/courses" },
    ];

    useEffect(() => {
        if (session === null) return;
        if (session && !session.user?.isAdmin) {
            router.push("/");
            return;
        }
        if (session) {
            fetchDashboardData();
        }
    }, [session]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            await Promise.all([
                fetchUserStats(),
                fetchEvents(),
                fetchSubjectPerformance()
            ]);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSubjectPerformance = async () => {
        try {
            const res = await fetch("/api/progress?all=true");
            const response = await res.json();

            if (response.success && Array.isArray(response.data)) {
                const data = response.data;
                const stats: any[] = [];

                // Calculate averages for known subjects
                Object.entries(SUBJECT_CONFIG).forEach(([key, config]) => {
                    const subjectData = data.filter((p: any) => p.subject && p.subject.toLowerCase() === key && p.score !== undefined);
                    const totalScore = subjectData.reduce((acc: number, cur: any) => acc + (cur.score || 0), 0);
                    const avgScore = subjectData.length > 0 ? Math.round(totalScore / subjectData.length) : 0;

                    // Include even if 0 data, just to show the card
                    stats.push({
                        id: key,
                        ...config,
                        avgScore,
                        totalStudents: new Set(subjectData.map((d: any) => d.userEmail)).size
                    });
                });

                setSubjectStats(stats);
            } else {
                // Fallback if no data or error
                setSubjectStats(Object.values(SUBJECT_CONFIG).map(c => ({ ...c, avgScore: 0, totalStudents: 0 })));
            }
        } catch (error) {
            console.error("Failed to fetch subject stats", error);
            setSubjectStats(Object.values(SUBJECT_CONFIG).map(c => ({ ...c, avgScore: 0, totalStudents: 0 })));
        }
    };

    const fetchUserStats = async () => {
        try {
            const res = await fetch("/api/users/students");
            const data = await res.json();
            if (data.ok) {
                const users = data.data as UserData[];

                // Calculate new users in last 7 days
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                const newUsers = users.filter(u => new Date(u.createdAt) > sevenDaysAgo).length;

                setStats({
                    total: users.length,
                    students: users.filter((u: any) => !u.isAdmin).length,
                    admins: users.filter((u: any) => u.isAdmin).length,
                    newUsersLast7Days: newUsers
                });

                // Get 5 most recent users
                const sortedUsers = [...users].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setRecentUsers(sortedUsers.slice(0, 5));
            }
        } catch (error) {
            console.error("Failed to fetch user stats", error);
        }
    };

    const fetchEvents = async () => {
        try {
            const res = await fetch("/api/events");
            const response = await res.json();
            if (response.success && response.data) {
                setEvents(response.data.slice(0, 5)); // Show recent 5 events
            }
        } catch (error) {
            console.error("Failed to fetch events", error);
        }
    };

    const nextSubject = () => {
        if (subjectStats.length === 0) return;
        setCurrentSubjectIndex((prev) => (prev + 1) % subjectStats.length);
    };

    const prevSubject = () => {
        if (subjectStats.length === 0) return;
        setCurrentSubjectIndex((prev) => (prev - 1 + subjectStats.length) % subjectStats.length);
    };


    const handleNavigation = (item: any) => {
        if (item.link) {
            router.push(item.link);
        } else {
            setActiveTab(item.id);
        }
    };

    return (
        <div className="flex h-screen bg-[#FFF8F8] font-sans text-gray-900 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col p-6 hidden md:flex">
                <div className="flex items-center gap-2 mb-10 text-[#FF5B5B]">
                    <span className="text-2xl font-bold">
                         LMS Admin</span>
                </div>

                <nav className="flex-1 space-y-1">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNavigation(item)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors w-full text-left ${activeTab === item.id ? 'bg-[#FFF0F0] text-[#FF5B5B]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                        >
                            <span className={activeTab === item.id ? "text-[#FF5B5B]" : "text-gray-400"}>{item.icon}</span>
                            {item.name}
                        </button>
                    ))}
                </nav>

                <div className="pt-6 border-t border-gray-100 space-y-1">
                    <button
                        onClick={() => signOut({ callbackUrl: "/pages/adminLogin" })}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-red-600 w-full"
                    >
                        <LogOut size={20} className="text-gray-400" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {sidebarItems.find(i => i.id === activeTab)?.name || "Dashboard"}
                    </h1>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-800">{session?.user?.name || "Administrator"}</p>
                                <p className="text-xs text-gray-500">{session?.user?.email}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center">
                                <User className="text-gray-400" />
                            </div>
                        </div>
                    </div>
                </header>

                {activeTab === "dashboard" ? (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                            {/* Total Users Card */}
                            <div className="p-5 rounded-2xl border bg-blue-50 border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Total Users</p>
                                        <h3 className="text-2xl font-bold text-gray-800">{stats.total}</h3>
                                    </div>
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        <Users className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                                <div className="w-full bg-blue-200 rounded-full h-1.5 mb-2">
                                    <div className="h-1.5 rounded-full bg-blue-500" style={{ width: '100%' }}></div>
                                </div>
                            </div>

                            {/* Students Card */}
                            <div className="p-5 rounded-2xl border bg-green-50 border-green-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Students</p>
                                        <h3 className="text-2xl font-bold text-gray-800">{stats.students}</h3>
                                    </div>
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        <Briefcase className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                                <p className="text-xs text-green-700 bg-green-100 inline-block px-2 py-0.5 rounded-full font-medium">
                                    {(stats.students / (stats.total || 1) * 100).toFixed(0)}% of users
                                </p>
                            </div>

                            {/* New Signups Card */}
                            <div className="p-5 rounded-2xl border bg-orange-50 border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">New (7d)</p>
                                        <h3 className="text-2xl font-bold text-gray-800">{stats.newUsersLast7Days}</h3>
                                    </div>
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        <UserPlus className="w-6 h-6 text-orange-600" />
                                    </div>
                                </div>
                                <p className="text-xs text-orange-700 bg-orange-100 inline-block px-2 py-0.5 rounded-full font-medium">
                                    Recent Growth
                                </p>
                            </div>

                            {/* Admins Card */}
                            <div className="p-5 rounded-2xl border bg-purple-50 border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">Admins</p>
                                        <h3 className="text-2xl font-bold text-gray-800">{stats.admins}</h3>
                                    </div>
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        <CheckCircle2 className="w-6 h-6 text-purple-600" />
                                    </div>
                                </div>
                                <p className="text-xs text-purple-700 bg-purple-100 inline-block px-2 py-0.5 rounded-full font-medium">
                                    System Staff
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            {/* Recent Users Widget */}
                            <div className="lg:col-span-2 bg-[#F2F6FF] p-5 rounded-2xl border border-blue-100/50 shadow-sm flex flex-col h-[22rem]">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-gray-800">Newest Members</h3>
                                    <button onClick={() => setActiveTab("users")} className="text-xs font-medium text-blue-600 bg-white px-3 py-1 rounded-full shadow-sm hover:bg-gray-50">Manage All</button>
                                </div>

                                <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                                    {recentUsers.length > 0 ? recentUsers.map((user) => (
                                        <div key={user.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow cursor-default border border-transparent hover:border-gray-100">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${user.isAdmin ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                                    {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-800">{user.fullName}</h4>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${user.isAdmin ? 'bg-purple-50 text-purple-600' : 'bg-green-50 text-green-600'}`}>
                                                    {user.isAdmin ? 'Admin' : 'Student'}
                                                </span>
                                                <p className="text-[10px] text-gray-400 mt-1">
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="text-center text-gray-500 mt-10">
                                            <p className="text-sm">No recent users found.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Subject Average Performance Widget (Replaces Calendar) */}
                            <div className={`lg:col-span-1 p-5 rounded-2xl border shadow-sm flex flex-col h-[22rem] overflow-hidden relative transition-colors duration-300 ${subjectStats.length > 0 ? subjectStats[currentSubjectIndex].bg : 'bg-white'} ${subjectStats.length > 0 ? subjectStats[currentSubjectIndex].border : 'border-gray-200'}`}>
                                <div className="flex justify-between items-center mb-6 relative z-10">
                                    <h3 className="font-bold text-gray-800">Avg Performance</h3>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={prevSubject}
                                            className="p-1.5 rounded-full bg-white/60 hover:bg-white text-gray-500 hover:text-gray-800 transition shadow-sm"
                                        >
                                            <ChevronRight className="w-4 h-4 rotate-180" />
                                        </button>
                                        <button
                                            onClick={nextSubject}
                                            className="p-1.5 rounded-full bg-white/60 hover:bg-white text-gray-500 hover:text-gray-800 transition shadow-sm"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {subjectStats.length > 0 ? (
                                    <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                                        <div className="relative w-40 h-40 mb-4 items-center justify-center flex">
                                            {/* Circular Progress */}
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle
                                                    cx="50%"
                                                    cy="50%"
                                                    r="70"
                                                    fill="transparent"
                                                    stroke="#e5e7eb"
                                                    strokeWidth="10"
                                                />
                                                <circle
                                                    cx="50%"
                                                    cy="50%"
                                                    r="70"
                                                    fill="transparent"
                                                    stroke={subjectStats[currentSubjectIndex].stroke}
                                                    strokeWidth="10"
                                                    strokeDasharray="440"
                                                    strokeDashoffset={440 - (440 * subjectStats[currentSubjectIndex].avgScore) / 100}
                                                    strokeLinecap="round"
                                                    className={`transition-all duration-1000 ease-out`}
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className={`text-4xl font-bold ${subjectStats[currentSubjectIndex].color}`}>
                                                    {subjectStats[currentSubjectIndex].avgScore}%
                                                </span>
                                                <span className="text-xs text-gray-500 font-medium">Average</span>
                                            </div>
                                        </div>

                                        <h4 className={`text-lg font-bold mb-1 ${subjectStats[currentSubjectIndex].color}`}>
                                            {subjectStats[currentSubjectIndex].name}
                                        </h4>
                                        <p className="text-xs text-gray-500 text-center px-4">
                                            {subjectStats[currentSubjectIndex].title}
                                        </p>

                                        <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-white/60 rounded-full">
                                            <Users size={12} className="text-gray-400" />
                                            <span className="text-xs font-medium text-gray-600">{subjectStats[currentSubjectIndex].totalStudents} Active Students</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                                        <BarChart className="w-10 h-10 mb-2 opacity-50" />
                                        <p className="text-sm">No data available</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Access Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <button onClick={() => setActiveTab("users")} className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Users size={24} />
                                </div>
                                <h3 className="text-sm font-bold text-gray-800">Manage Users</h3>
                            </button>
                            <button onClick={() => setActiveTab("timetable")} className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Calendar size={24} />
                                </div>
                                <h3 className="text-sm font-bold text-gray-800">Edit Timetable</h3>
                            </button>
                            <button onClick={() => setActiveTab("events")} className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                                <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Megaphone size={24} />
                                </div>
                                <h3 className="text-sm font-bold text-gray-800">Post Event</h3>
                            </button>
                            <button onClick={() => router.push("/pages/adminProgress")} className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <BarChart size={24} />
                                </div>
                                <h3 className="text-sm font-bold text-gray-800">Student Progress</h3>
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[500px]">
                        {activeTab === "courses" && <div />}
                        {activeTab === "events" && <Events onBack={() => setActiveTab("dashboard")} />}
                        {activeTab === "users" && <ManageUsers onBack={() => setActiveTab("dashboard")} />}
                        {activeTab === "timetable" && <Timetable onBack={() => setActiveTab("dashboard")} />}
                    </div>
                )}
            </main>
        </div>
    );
}