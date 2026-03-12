"use client";

import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import DashboardSidebar from '@/components/DashboardSidebar';
import {
  Menu,
  Search,
  Bell,
  User,
  LogOut,
  BookOpen,
  Award,
  LayoutDashboard,
  CreditCard,
  ChevronRight,
  CheckCircle2
} from "lucide-react";

interface Course {
  id: string | number;
  name: string;
  code: string;
  link: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  textColor: string;
  progressColor: string;
  btnColor: string;
  credits: number;
  modules: number;
  progress: number;
}

// --- Caching Utilities ---
const CACHE_KEYS = { SUBJECTS: 'lms_subjects', PROGRESS: 'lms_progress' };
const CACHE_DURATIONS = { SUBJECTS: 5 * 60 * 1000, PROGRESS: 30 * 1000 };

const getFromCache = (key: string) => {
  if (typeof window === 'undefined') return null;
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  try {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < (CACHE_DURATIONS[key as keyof typeof CACHE_DURATIONS] || 0)) {
      return data;
    }
    localStorage.removeItem(key);
  } catch (e) {
    localStorage.removeItem(key);
  }
  return null;
};

const saveToCache = (key: string, data: any) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};

const CoursesPage = () => {
  const { data: session } = useSession();
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  useEffect(() => {
    const fetchCoursesAndProgress = async () => {
      if (!session?.user?.email) return;

      try {
        setLoading(true);

        // 1. Parallel Fetch with Caching functionality
        let subjectsData = getFromCache(CACHE_KEYS.SUBJECTS);
        let progressData = getFromCache(CACHE_KEYS.PROGRESS);

        let subjectsResData: any = null;
        let progressResData: any = null;

        if (!subjectsData || !progressData) {
          const endpoints = [];
          if (!subjectsData) endpoints.push(fetch('/api/subjects').then(res => res.json()));
          else endpoints.push(Promise.resolve({ success: true, data: subjectsData }));

          if (!progressData) endpoints.push(fetch(`/api/progress?userEmail=${session.user.email}`).then(res => res.json()));
          else endpoints.push(Promise.resolve({ success: true, data: progressData }));

          const [sData, pData] = await Promise.all(endpoints);

          if (!subjectsData && sData.success) {
            subjectsData = sData.data;
            saveToCache(CACHE_KEYS.SUBJECTS, subjectsData);
          }
          if (!progressData && pData.success) {
            progressData = pData.data;
            saveToCache(CACHE_KEYS.PROGRESS, progressData);
          }

          subjectsResData = sData;
          progressResData = pData;
        } else {
          subjectsResData = { success: true, data: subjectsData };
          progressResData = { success: true, data: progressData };
        }

        const userProgress = progressResData?.success ? progressResData.data : (progressData || []);

        if (subjectsResData?.success && Array.isArray(subjectsResData.data)) {
          const dbCourses: Course[] = subjectsResData.data.map((subject: any) => {
            // Calculate Progress
            const totalModules = subject.modules.length;
            const completedCount = userProgress.filter((p: any) =>
              p.subject === subject.name && (p.completed || p.percentage >= 60)
            ).length;

            // Ensure progress doesn't exceed 100% and handle division by zero
            const progress = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

            return {
              id: subject._id,
              name: subject.name,
              code: subject.template?.substring(0, 4).toUpperCase() || "SUBJ",
              link: `/pages/courses/${subject._id}`,
              description: (subject.description?.trim()) || (subject.modules[0]?.description?.trim()) || "No description available.",
              icon: <BookOpen className="w-6 h-6 text-green-600" />,
              color: "bg-green-50 border-green-100",
              textColor: "text-green-600",
              progressColor: "bg-green-500", // Dynamic visual
              btnColor: "bg-green-50 text-green-600 hover:bg-green-100",
              credits: 3,
              modules: totalModules,
              progress: progress
            };
          });

          setAllCourses(dbCourses);
        } else {
          setAllCourses([]);
        }
      } catch (error) {
        console.error("Failed to fetch courses or progress", error);
        setAllCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesAndProgress();
  }, [session]);

  return (
    <div className="flex h-screen bg-[#FFF8F8] font-sans text-gray-900 overflow-hidden">
      <DashboardSidebar activePage="courses" isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden p-4 md:p-8">
        {/* Header */}
        <header className="flex-none flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg md:hidden"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 line-clamp-1">My Courses</h1>
              <p className="text-sm text-gray-500 mt-1 hidden sm:block">Pick up where you left off</p>
            </div>
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
          {loading ? (
            <div className="flex justify-center items-center h-40 text-gray-400">Loading courses...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourses.map((course) => (
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
          )}
        </div>
      </main>
    </div>
  );
};

export default CoursesPage;
