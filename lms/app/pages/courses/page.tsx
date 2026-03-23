"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import DashboardSidebar from '@/components/DashboardSidebar';
import StudentHeader from '@/components/StudentHeader';
import {
  BookOpen,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import CourseBanner from "@/components/CourseBanner";

interface Course {
  id: string | number;
  name: string;
  code: string;
  link: string;
  description: string;
  icon: React.ReactNode;
  banner: string;
  color: string;
  textColor: string;
  progressColor: string;
  btnColor: string;
  credits: number;
  modules: number;
  progress: number;
  bannerColor?: string;
  hashtags?: string[];
}

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

        // Fetch freshly from server to avoid caching issues as requested
        const [sRes, pRes] = await Promise.all([
          fetch('/api/subjects').then(res => res.json()),
          fetch(`/api/progress?userEmail=${session.user.email}`).then(res => res.json())
        ]);

        const userProgress = pRes?.success ? pRes.data : [];

        if (sRes?.success && Array.isArray(sRes.data)) {
          const dbCourses = sRes.data.map((subject: any) => {
            const totalModules = subject.modules.length;
            const completedCount = userProgress.filter((p: any) =>
              p.subject === subject.name && (p.completed || p.percentage >= 60)
            ).length;
            const progress = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

            return {
              id: subject._id,
              name: subject.name,
              code: subject.template?.substring(0, 4).toUpperCase() || "SUBJ",
              link: `/pages/courses/${subject._id}`,
              description: (subject.description?.trim()) || (subject.modules[0]?.description?.trim()) || "No description available.",
              credits: 3,
              modules: totalModules,
              progress: progress,
              bannerColor: subject.bannerColor || 'blue',
              hashtags: subject.hashtags || []
            };
          });

          // Map banner colors to accent styles for the course cards
          const colorStyles: Record<string, any> = {
            blue: { icon: "text-[#73C1D4]", card: "bg-[#73C1D4]/5 border-[#73C1D4]/10", text: "text-[#73C1D4]", progress: "bg-[#73C1D4]", btn: "bg-[#73C1D4] text-black hover:bg-[#73C1D4]/20" },
            indigo: { icon: "text-[#6366F1]", card: "bg-[#6366F1]/5 border-[#6366F1]/10", text: "text-[#4F46E5]", progress: "bg-[#6366F1]", btn: "bg-[#6366F1] text-white hover:bg-[#4F46E5]" },
            emerald: { icon: "text-[#10B981]", card: "bg-[#10B981]/5 border-[#10B981]/10", text: "text-[#059669]", progress: "bg-[#10B981]", btn: "bg-[#10B981] text-white hover:bg-[#059669]" },
            amber: { icon: "text-[#F59E0B]", card: "bg-[#F59E0B]/5 border-[#F59E0B]/10", text: "text-[#D97706]", progress: "bg-[#F59E0B]", btn: "bg-[#F59E0B] text-white hover:bg-[#D97706]" },
            rose: { icon: "text-[#F43F5E]", card: "bg-[#F43F5E]/5 border-[#F43F5E]/10", text: "text-[#E11D48]", progress: "bg-[#F43F5E]", btn: "bg-[#F43F5E] text-white hover:bg-[#E11D48]" },
          };

          const coursesWithStyles = dbCourses.map((course: Course) => {
            const style = colorStyles[course.bannerColor || 'blue'] || colorStyles.blue;
            return {
              ...course,
              icon: <BookOpen className={`w-6 h-6 ${style.icon}`} />,
              color: style.card,
              textColor: style.text,
              progressColor: style.progress,
              btnColor: style.btn
            };
          });

          setAllCourses(coursesWithStyles);
        }
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchCoursesAndProgress();
    }
  }, [session]);

  return (
    <div className="flex h-screen bg-[#FFF8F8] font-sans text-gray-900 overflow-hidden">
      <DashboardSidebar activePage="courses" isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 flex flex-col h-full overflow-hidden p-6 lg:p-10">
        <StudentHeader title="My Courses" subtitle="Pick up where you left off" onMenuClick={() => setIsSidebarOpen(true)} showSearch={true} />
        <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
          {loading ? (
            <div className="flex justify-center items-center h-40 text-gray-400">Loading courses...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 group flex flex-col h-full overflow-hidden">
                  <div className="aspect-[800/531] w-full overflow-hidden">
                    <CourseBanner title={course.name} description={course.description} bannerColor={course.bannerColor} hashtags={course.hashtags} />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 truncate flex-1" title={course.name}>
                        {course.name}
                      </h3>
                      {/* Circular Progress Gauge */}
                      <div className="relative flex-shrink-0 w-12 h-12">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="transparent" stroke="#F1F5F9" strokeWidth="3" />
                          <circle
                            cx="18" cy="18" r="16" fill="transparent"
                            strokeWidth="3" strokeDasharray="100"
                            strokeDashoffset={100 - course.progress}
                            strokeLinecap="round"
                            className={`transition-all duration-700 ${course.textColor} stroke-current`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-700">
                          {course.progress}%
                        </div>
                      </div>
                    </div>

                    {/* Consistent space for hashtags below the title to ensure alignment */}
                    <div className="flex flex-wrap gap-1.5 h-6 mb-4">
                      {course.hashtags && course.hashtags.filter(Boolean).length > 0 && (
                        course.hashtags.filter(Boolean).map((tag, i) => (
                          <span key={i} className={`text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${course.bannerColor === 'blue' ? 'bg-blue-100 text-blue-700' : ''} ${course.bannerColor === 'indigo' ? 'bg-indigo-100 text-indigo-700' : ''} ${course.bannerColor === 'emerald' ? 'bg-emerald-100 text-emerald-700' : ''} ${course.bannerColor === 'amber' ? 'bg-amber-100 text-amber-700' : ''} ${course.bannerColor === 'rose' ? 'bg-rose-100 text-rose-700' : ''}`}>#{tag}</span>
                        ))
                      )}
                    </div>

                    <div className="space-y-4">
                      {/* Call to action button */}
                      <Link href={course.link} className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:gap-3 ${course.btnColor} shadow-sm active:scale-[0.98]`}>
                        Continue Learning <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
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
