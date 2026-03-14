"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import DashboardSidebar from '@/components/DashboardSidebar';
import {
    LayoutDashboard, BookOpen, CreditCard, LogOut, User,
    ChevronRight, ChevronDown, CheckCircle2, FileText, Menu, Award
} from 'lucide-react';

import Video1 from '@/components/Video1';
import Quiz from '@/components/Quiz';

import './styles.css';

interface Question {
    question: string;
    options: string[];
    correctAnswer: number;
}

interface QuizData {
    title: string;
    questions: Question[];
}

interface ModuleData {
    name: string;
    videoId: string;
    place: string;
    description: string;
    quiz?: QuizData | null;
}

interface SubjectData {
    _id: string;
    name: string;
    description?: string;
    template: string;
    modules: ModuleData[];
}


const DynamicCoursePage = () => {
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();

    const [subject, setSubject] = useState<SubjectData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('learning-path');
    const [currentModuleIndex, setCurrentModuleIndex] = useState<number | null>(null);
    const [videoCompleted, setVideoCompleted] = useState(false);
    const [studentProgress, setStudentProgress] = useState<any[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    useEffect(() => {
        if (params.id) {
            fetchSubject(params.id as string);
        }
    }, [params.id]);

    useEffect(() => {
        if (session?.user?.email && subject) {
            fetchStudentProgress(session.user.email, subject.name);
        }
    }, [session, subject]);

    const fetchSubject = async (id: string) => {
        try {
            const res = await fetch(`/api/subjects/${id}?t=${Date.now()}`, { cache: 'no-store' });
            const data = await res.json();
            if (data.success && data.data) {
                const foundSubject = data.data;
                // Sort modules by place
                foundSubject.modules.sort((a: ModuleData, b: ModuleData) => {
                    const placeA = parseFloat(a.place) || 0;
                    const placeB = parseFloat(b.place) || 0;
                    return placeA - placeB;
                });
                setSubject(foundSubject);
            }
        } catch (error) {
            console.error("Failed to fetch subject", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStudentProgress = async (email: string, subjectName: string) => {
        try {
            const res = await fetch(`/api/progress?userEmail=${email}&subject=${subjectName}`, {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache'
                }
            });
            const data = await res.json();
            if (data.success) {
                setStudentProgress(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch progress", error);
        }
    };

    // Re-fetch progress after quiz completion so Next Module button updates immediately
    const refreshProgress = () => {
        if (session?.user?.email && subject) {
            fetchStudentProgress(session.user.email, subject.name);
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center">Loading course data...</div>;
    if (!subject) return <div className="flex h-screen items-center justify-center">Course not found</div>;

    const currentModule = currentModuleIndex !== null ? subject.modules[currentModuleIndex] : null;
    const completedModulesCount = studentProgress.filter(p => p.completed || p.percentage >= 60).length;
    const totalModules = subject.modules.length;
    const completedPercentage = totalModules > 0 ? Math.round((completedModulesCount / totalModules) * 100) : 0;

    // --- Overview View ---
    const renderOverview = () => (
        <div className="w-full space-y-8 px-8 pb-8">
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{subject.name}</h2>
                        <p className="text-gray-500 text-sm">{subject.template || 'Comprehensive Course'}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                        <div className="flex gap-1">
                            {[...Array(20)].map((_, i) => {
                                const segmentThreshold = (i + 1) * 5;
                                const isCompleted = completedPercentage >= segmentThreshold;
                                return (
                                    <div
                                        key={i}
                                        className={`h-2 w-1.5 rounded-full ${isCompleted ? 'bg-[#73C1D4]' : 'bg-gray-200'}`}
                                    ></div>
                                );
                            })}
                        </div>
                        <div className="text-xs font-medium text-gray-500">{completedPercentage}% Completed</div>
                    </div>
                </div>
            </div>

            {/* Certificate Boost Section - Appears only when 100% completed */}
            {completedPercentage === 100 && (
                <div className="bg-gradient-to-r from-[#FF5B5B] to-[#FF8C8C] p-8 rounded-2xl shadow-lg border border-[#FF5B5B]/20 flex flex-col md:flex-row justify-between items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
                            <Award className="text-white w-10 h-10" />
                        </div>
                        <div className="text-white">
                            <h3 className="text-xl font-bold mb-1">Course Perfect!</h3>
                            <p className="text-white/80 text-sm">You have mastered <b>{subject.name}</b>. Your official verified certificate is ready.</p>
                        </div>
                    </div>
                    <Link
                        href={`/certification?name=${encodeURIComponent(session?.user?.name || 'Student')}&course=${encodeURIComponent(subject.name)}&userId=${encodeURIComponent(session?.user?.id || session?.user?.email || 'unknown')}&courseId=${encodeURIComponent(subject._id)}`}
                        className="bg-white text-[#FF5B5B] px-8 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-gray-50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                    >
                        Claim My Certificate
                        <ChevronRight size={18} />
                    </Link>
                </div>
            )}

            {/* Navigation Tabs */}
            <div className="flex gap-6 border-b border-gray-200 overflow-x-auto pb-1">
                {[
                    { id: 'learning-path', label: 'Learning Path', icon: <BookOpen size={16} /> },
                    { id: 'about', label: 'About', icon: <FileText size={16} /> },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${activeTab === tab.id ? 'border-[#73C1D4] text-[#73C1D4]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
                {activeTab === 'learning-path' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 bg-gray-50 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800">Course Modules</h3>
                            <p className="text-sm text-gray-500">Select a module to start learning</p>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {subject.modules.map((module, idx) => {
                                const isCompleted = studentProgress.some(p =>
                                    p.moduleName === module.name && (p.completed || p.percentage >= 60)
                                );

                                // Check if the previous module is completed
                                // Ensure strict ordering: Module N is locked unless Module N-1 is completed.
                                // Module 0 (first module) is always unlocked.
                                let isLocked = false;
                                if (idx > 0) {
                                    const prevModule = subject.modules[idx - 1];
                                    const prevCompleted = studentProgress.some(p =>
                                        p.moduleName === prevModule.name && (p.completed || p.percentage >= 60)
                                    );
                                    if (!prevCompleted) {
                                        isLocked = true;
                                    }
                                }

                                return (
                                    <div
                                        key={idx}
                                        onClick={() => {
                                            if (!isLocked) {
                                                setCurrentModuleIndex(idx);
                                                setVideoCompleted(false);
                                            }
                                        }}
                                        className={`p-4 transition-colors flex items-center gap-4 group ${isLocked
                                            ? 'opacity-50 cursor-not-allowed bg-gray-50'
                                            : 'hover:bg-gray-50 cursor-pointer'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-lg border flex items-center justify-center font-bold text-sm transition-colors ${isCompleted
                                            ? 'bg-green-600 text-white border-green-600'
                                            : isLocked
                                                ? 'bg-gray-100 text-gray-400 border-gray-200'
                                                : 'bg-white text-gray-500 border-gray-200 group-hover:border-blue-200 group-hover:text-blue-600'
                                            }`}>
                                            {isLocked ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                            ) : (
                                                idx + 1
                                            )}
                                        </div>
                                        <div>
                                            <h4 className={`font-bold text-sm transition-colors ${isLocked ? 'text-gray-400' : 'text-gray-800 group-hover:text-blue-600'}`}>
                                                {module.name}
                                            </h4>
                                            <p className="text-xs text-gray-500 line-clamp-1">{module.description}</p>
                                        </div>
                                        <div className="ml-auto">
                                            {!isLocked && (
                                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {activeTab === 'about' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">About the Course</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {subject.description || (subject.modules.length > 0 ? subject.modules[0].description : 'No description available.')}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    // --- Module Functionality ---
    const handleNextModule = () => {
        if (currentModuleIndex !== null && currentModuleIndex < subject.modules.length - 1) {
            setCurrentModuleIndex(currentModuleIndex + 1);
            setVideoCompleted(false);
        } else {
            setCurrentModuleIndex(null); // Back to overview if finished
        }
    };

    const handlePrevModule = () => {
        if (currentModuleIndex !== null && currentModuleIndex > 0) {
            setCurrentModuleIndex(currentModuleIndex - 1);
            setVideoCompleted(false);
        } else {
            setCurrentModuleIndex(null);
        }
    };

    return (
        <div className="flex h-screen bg-[#FFF8F8] font-sans text-gray-900 overflow-hidden">
            <DashboardSidebar activePage="courses" isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {/* Header */}
                <header className="flex justify-between items-center mb-8 px-8 pt-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg xl:hidden"
                        >
                            <Menu size={24} />
                        </button>
                        <div className="flex items-center gap-2">
                            <Link href="/pages/courses" className="text-sm text-gray-500 hover:text-[#73C1D4]">Courses</Link>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                            <h1 className="text-2xl font-bold text-gray-800 line-clamp-1">{subject.name}</h1>
                        </div>
                    </div>


                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700 hidden sm:block">{session?.user?.name || "Student"}</span>
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center">
                                <User className="text-gray-400" />
                            </div>
                        </div>
                    </div>
                </header>

                {currentModule ? (
                    <div className="w-full space-y-8 px-8 pb-8">
                        {/* Module Content */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="mb-6 pb-6 border-b border-gray-100">
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Module {currentModuleIndex! + 1}</div>
                                <h2 className="text-2xl font-bold text-gray-800">{currentModule.name}</h2>
                                <p className="text-gray-600 mt-2">{currentModule.description}</p>
                            </div>

                            <div className="space-y-8">
                                {/* Video Section */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#73C1D4]"></span>
                                        Video Lesson
                                    </h3>
                                    <Video1
                                        videoId={currentModule.videoId}
                                        onComplete={() => setVideoCompleted(true)}
                                    />
                                </div>

                                {/* Quiz Section */}
                                {currentModule.quiz && (
                                    <div className="pt-8 border-t border-gray-100">
                                        <Quiz
                                            key={`quiz-module-${currentModuleIndex}`}
                                            title={currentModule.quiz.title}
                                            questions={currentModule.quiz.questions}
                                            subject={subject.name}
                                            unitId={1}
                                            moduleId={currentModuleIndex! + 1}
                                            moduleName={currentModule.name}
                                            isLocked={!videoCompleted}
                                            onQuizComplete={refreshProgress}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Navigation Buttons */}
                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                                <button
                                    onClick={handlePrevModule}
                                    className="px-6 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    {currentModuleIndex === 0 ? '← Back to Overview' : '← Previous Module'}
                                </button>

                                {(() => {
                                    const isCurrentCompleted = studentProgress.some(p =>
                                        p.moduleName === currentModule.name && (p.completed || p.percentage >= 60)
                                    );

                                    return (
                                        <button
                                            onClick={() => {
                                                if (isCurrentCompleted) {
                                                    handleNextModule();
                                                }
                                            }}
                                            disabled={!isCurrentCompleted}
                                            className={`px-6 py-2.5 rounded-xl font-bold text-white transition-all shadow-md
                                                ${isCurrentCompleted
                                                    ? 'bg-[#73C1D4] hover:bg-[#73C1D4]/90 hover:shadow-lg'
                                                    : 'bg-gray-300 cursor-not-allowed shadow-none'
                                                }`}
                                            title={!isCurrentCompleted ? "Complete the video , quiz , and get min 60% marks to proceed" : ""}
                                        >
                                            {currentModuleIndex! < subject.modules.length - 1 ? 'Next Module →' : 'Finish Course'}
                                        </button>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                ) : (
                    renderOverview()
                )}
            </main>
        </div>
    );
};

export default DynamicCoursePage;
