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
    Search,
    Download,
    Menu,
    X
} from 'lucide-react';
import * as XLSX from "xlsx"; // Useful if they want to export, but we'll conditionally use it or mock download


interface UserData {
    email: string;
    fullName: string;
    isAdmin: boolean;
}

interface ProgressData {
    userEmail: string;
    subject: string;
    unitId: number;
    moduleId: number;
    score: number;
    totalQuestions: number;
    percentage: number;
    completed: boolean;
    updatedAt: string;
}

interface AggregatedStudent {
    email: string;
    fullName: string;
    modulesCompleted: number;
    avgScore: number;
    lastActive: string;
    subjects: Record<string, { completedCount: number, modules: any[] }>;
}

export default function AdminProgress() {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState<AggregatedStudent[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
    const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    // Sidebar Config
    const sidebarItems = [
        { id: "dashboard", name: "Dashboard", icon: <LayoutDashboard size={20} />, link: "/pages/adminDashboard" },
        { id: "users", name: "Manage Users", icon: <Users size={20} />, link: "/pages/adminDashboard" },
        { id: "timetable", name: "Timetable", icon: <Calendar size={20} />, link: "/pages/adminDashboard" },
        { id: "events", name: "Events", icon: <Megaphone size={20} />, link: "/pages/adminDashboard" },
        { id: "addSubject", name: "Manage Subjects", icon: <BookOpen size={20} />, link: "/pages/adminDashboard" },
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
            fetchData();
        }
    }, [session]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // 1. Fetch Users
            const usersRes = await fetch(`/api/users/students?t=${Date.now()}`, { cache: 'no-store' });
            const usersData = await usersRes.json();
            const allUsers: UserData[] = usersData.success || usersData.ok ? usersData.data : [];
            const studentUsers = allUsers; // removed !u.isAdmin filter so you can see your own admin account

            // 2. Fetch Progress (All)
            const progressRes = await fetch("/api/progress?all=true");
            const progressJson = await progressRes.json();
            const allProgress: ProgressData[] = progressJson.success ? progressJson.data : [];

            // 3. Fetch System Subjects (Dynamic & Static)
            const subjectsRes = await fetch("/api/subjects");
            const subjectsData = await subjectsRes.json();
            const dynamicSubjects: any[] = subjectsData.success ? subjectsData.data : [];

            // Build a normalized list of all available subjects in the system
            const systemSubjects = new Set<string>(); // removed default statics FSWD and OS
            dynamicSubjects.forEach(sub => {
                if (sub.name) systemSubjects.add(sub.name);
            });

            // 4. Aggregate mapping
            const aggregatedMap: Record<string, AggregatedStudent> = {};

            studentUsers.forEach(u => {
                const initializedSubjects: Record<string, { completedCount: number, modules: any[] }> = {};

                // Pre-populate all known subjects so they ALWAYS show up in the UI, even if 0 progress
                systemSubjects.forEach(subName => {
                    initializedSubjects[subName] = { completedCount: 0, modules: [] };
                });

                aggregatedMap[u.email] = {
                    email: u.email,
                    fullName: u.fullName || "Unknown",
                    modulesCompleted: 0,
                    avgScore: 0,
                    lastActive: "Never",
                    subjects: initializedSubjects
                };
            });

            // Map progress to students
            const userScoresMap: Record<string, number[]> = {};

            allProgress.forEach(p => {
                const email = p.userEmail;
                if (!aggregatedMap[email]) return; // ignore admin progress or deleted users

                const percentage = p.percentage || (p.score / (p.totalQuestions || 1)) * 100;

                if (p.completed || percentage >= 60) {
                    aggregatedMap[email].modulesCompleted += 1;
                }

                if (p.score !== undefined && p.totalQuestions > 0) {
                    if (!userScoresMap[email]) userScoresMap[email] = [];
                    userScoresMap[email].push(percentage);
                }

                // Match subject case-insensitively to existing subjects, or create a new entry if anomalous
                const rawSubject = p.subject || "Unknown";
                let matchedSubjectKey = rawSubject;

                const existingKey = Object.keys(aggregatedMap[email].subjects).find(
                    k => k.toLowerCase() === rawSubject.toLowerCase()
                );

                if (existingKey) {
                    matchedSubjectKey = existingKey;
                } else {
                    if (!aggregatedMap[email].subjects[matchedSubjectKey]) {
                        aggregatedMap[email].subjects[matchedSubjectKey] = { completedCount: 0, modules: [] };
                    }
                }

                if (p.completed || percentage >= 60) {
                    aggregatedMap[email].subjects[matchedSubjectKey].completedCount += 1;
                }

                // Add exact module status
                aggregatedMap[email].subjects[matchedSubjectKey].modules.push({
                    name: (p as any).moduleName || `Unit ${p.unitId} - Mod ${p.moduleId}`,
                    percentage: Math.round(percentage)
                });

                // Check most recent date
                const pDate = new Date(p.updatedAt);
                if (aggregatedMap[email].lastActive === "Never") {
                    aggregatedMap[email].lastActive = p.updatedAt;
                } else {
                    const existingDate = new Date(aggregatedMap[email].lastActive);
                    if (pDate > existingDate) {
                        aggregatedMap[email].lastActive = p.updatedAt;
                    }
                }
            });

            // Calculate averages
            Object.keys(userScoresMap).forEach(email => {
                const scores = userScoresMap[email];
                const sum = scores.reduce((a, b) => a + b, 0);
                aggregatedMap[email].avgScore = Math.round(sum / scores.length);
            });

            // Format dates
            const formattedList = Object.values(aggregatedMap).map(s => {
                if (s.lastActive !== "Never") {
                    s.lastActive = new Date(s.lastActive).toLocaleDateString();
                }
                return s;
            });

            // Sort by most modules completed as default
            formattedList.sort((a, b) => b.modulesCompleted - a.modulesCompleted);

            setStudents(formattedList);
        } catch (error) {
            console.error("Error fetching admin progress data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        try {
            const exportData = students.map(s => ({
                "Full Name": s.fullName,
                "Email": s.email,
                "Modules Completed": s.modulesCompleted,
                "Average Score (%)": s.avgScore,
                "Last Active": s.lastActive
            }));

            const ws = XLSX.utils.json_to_sheet(exportData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Student Progress");
            XLSX.writeFile(wb, "Student_Progress_Report.xlsx");
        } catch (error) {
            alert("Error exporting data. Make sure xlsx is installed.");
            console.error(error);
        }
    };

    const filteredStudents = students.filter(s =>
        s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-[#FFF8F8] font-sans text-gray-900 overflow-hidden">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar (Matching AdminDashboard) */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col p-6 
                transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0 md:z-auto md:shrink-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="flex items-center justify-between mb-10 text-[#FF5B5B]">
                    <span className="text-2xl font-bold">LMS Admin</span>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-2 -mr-2 text-gray-400 hover:text-gray-600 md:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 space-y-1">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.link}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors w-full text-left ${item.id === "progress" ? 'bg-[#FFF0F0] text-[#FF5B5B]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                        >
                            <span className={item.id === "progress" ? "text-[#FF5B5B]" : "text-gray-400"}>{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="pt-6 border-t border-gray-100 space-y-1">
                    <button
                        onClick={() => {
                            localStorage.clear();
                            signOut({ callbackUrl: "/pages/adminLogin" });
                        }}
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
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg md:hidden"
                        >
                            <Menu size={24} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 line-clamp-1">Student Progress</h1>
                            <p className="text-sm text-gray-500 mt-1 hidden sm:block">Track and analyze individual student performance across all courses.</p>
                        </div>
                    </div>


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

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                    <div className="relative w-full sm:w-96">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search students by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5B5B]/20 focus:border-[#FF5B5B] transition-all"
                        />
                    </div>

                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-medium shadow-md transition-all whitespace-nowrap"
                    >
                        <Download size={18} />
                        Export Report
                    </button>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="p-4 font-semibold text-gray-600 text-sm">Student</th>
                                    <th className="p-4 font-semibold text-gray-600 text-sm text-center">Modules Completed</th>
                                    <th className="p-4 font-semibold text-gray-600 text-sm text-center">Avg Score</th>
                                    <th className="p-4 font-semibold text-gray-600 text-sm text-right">Last Active</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-gray-400">Loading progress data...</td>
                                    </tr>
                                ) : filteredStudents.length > 0 ? (
                                    filteredStudents.map((student, idx) => (
                                        <React.Fragment key={idx}>
                                            <tr
                                                onClick={() => setExpandedStudent(expandedStudent === student.email ? null : student.email)}
                                                className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer ${expandedStudent === student.email ? 'bg-blue-50/30' : ''}`}
                                            >
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-100 shadow-sm relative group">
                                                            {student.fullName.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-gray-900 text-sm">{student.fullName}</h4>
                                                            <p className="text-xs text-gray-500">{student.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-50 text-green-700 font-bold text-sm border border-green-100">
                                                        {student.modulesCompleted}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <div className="flex flex-col items-center">
                                                        <span className={`font-bold text-sm ${student.avgScore >= 80 ? 'text-green-600' : student.avgScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                            {student.avgScore}%
                                                        </span>
                                                        <div className="w-16 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${student.avgScore >= 80 ? 'bg-green-500' : student.avgScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                                style={{ width: `${student.avgScore}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-right text-sm text-gray-500 font-medium whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {student.lastActive}
                                                        <ChevronRight className={`w-4 h-4 transition-transform ${expandedStudent === student.email ? 'rotate-90 text-blue-500' : 'text-gray-400'}`} />
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* EXPANDED ROW FOR SUBJECT DETAILS */}
                                            {expandedStudent === student.email && (
                                                <tr className="bg-gray-50/80 border-b border-gray-100">
                                                    <td colSpan={4} className="p-6">
                                                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                                                            <h5 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                                <BookOpen size={16} className="text-blue-500" />
                                                                Subject Breakdown
                                                            </h5>

                                                            {student.subjects && Object.keys(student.subjects).length > 0 ? (
                                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                                    {Object.entries(student.subjects).map(([subjectName, subjectData]) => {
                                                                        const isSubjectExpanded = expandedSubject === subjectName;

                                                                        return (
                                                                            <div key={subjectName} className="border border-gray-200 rounded-xl bg-gray-50 overflow-hidden shadow-sm transition-all hover:border-gray-300">
                                                                                <button
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        setExpandedSubject(isSubjectExpanded ? null : subjectName);
                                                                                    }}
                                                                                    className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors"
                                                                                >
                                                                                    <h6 className="font-bold text-gray-900 uppercase tracking-widest text-xs">{subjectName}</h6>
                                                                                    <div className="flex items-center gap-3">
                                                                                        <span className="text-xs font-bold px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg text-gray-600">
                                                                                            {subjectData.completedCount} Modules
                                                                                        </span>
                                                                                        <ChevronRight className={`w-4 h-4 transition-transform ${isSubjectExpanded ? 'rotate-90 text-blue-500' : 'text-gray-400'}`} />
                                                                                    </div>
                                                                                </button>

                                                                                {isSubjectExpanded && (
                                                                                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                                                                                        {subjectData.modules.length > 0 ? (
                                                                                            <div className="space-y-2 max-h-48 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                                                                                                {subjectData.modules.map((mod, i) => (
                                                                                                    <div key={i} className="flex justify-between items-center text-xs bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm relative group overflow-hidden">
                                                                                                        <span className="font-semibold text-gray-700 truncate mr-3" title={mod.name}>{mod.name}</span>
                                                                                                        <div className={`flex items-center gap-2 shrink-0 font-bold px-2 py-0.5 rounded-md ${mod.percentage >= 80 ? 'bg-green-50 text-green-700 border border-green-100' : mod.percentage >= 60 ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                                                                                            {mod.percentage}%
                                                                                                        </div>
                                                                                                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${mod.percentage >= 80 ? 'bg-green-500' : mod.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                                                                                                    </div>
                                                                                                ))}
                                                                                            </div>
                                                                                        ) : (
                                                                                            <p className="text-xs text-gray-400 font-medium italic text-center py-4 bg-white rounded-lg border border-gray-100 border-dashed">
                                                                                                No modules attempted yet
                                                                                            </p>
                                                                                        )}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            ) : (
                                                                <p className="text-sm text-gray-500 italic">No specific course progression to display.</p>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-gray-400 flex flex-col items-center justify-center">
                                            <BarChart className="w-10 h-10 mb-2 opacity-30" />
                                            <p>No student progress records found.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
