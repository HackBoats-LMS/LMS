"use client";

import React, { useState, useEffect } from 'react';
import supabase from '@/lib/db';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import DashboardSidebar from '@/components/DashboardSidebar';
import {
  LayoutDashboard,
  BookOpen,
  CreditCard,
  Calendar,
  Settings,
  LogOut,
  Search,
  Bell,
  Clock,
  CheckCircle2,
  FileText,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  User,
  Zap,
  Globe,
  Award
} from 'lucide-react';

// --- Types ---
interface TimetableSlot {
  time: string;
  subject: string;
  teacher?: string;
  description?: string;
}

interface TimetableData {
  [key: string]: TimetableSlot[];
}

const StudentDashboard = () => {
  const { data: session } = useSession();
  const [timetable, setTimetable] = useState<TimetableData | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [progressData, setProgressData] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [allSubjects, setAllSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Dynamic Stats State
  const [stats, setStats] = useState([
    { label: "Best Performance", value: "0%", subtext: "N/A", icon: <CheckCircle2 className="w-6 h-6 text-green-600" />, color: "bg-green-50 border-green-100", progressColor: "bg-green-500", progress: 0 },
    { label: "Needs Attention", value: "0%", subtext: "N/A", icon: <LayoutDashboard className="w-6 h-6 text-orange-600" />, color: "bg-orange-50 border-orange-100", progressColor: "bg-orange-500", progress: 0 },
    { label: "Quizzes completed", value: "0%", subtext: "0 completed", icon: <BookOpen className="w-6 h-6 text-rose-600" />, color: "bg-rose-50 border-rose-100", progressColor: "bg-rose-500", progress: 0 },
  ]);

  const [activeTasks, setActiveTasks] = useState<any[]>([]);

  // Course Stats State
  const [courseStats, setCourseStats] = useState<any[]>([]);
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);

  // Avg Score State
  const [avgScoreStats, setAvgScoreStats] = useState<any[]>([]);
  const [currentAvgScoreIndex, setCurrentAvgScoreIndex] = useState(0);

  // --- Badge System State ---
  const [totalXP, setTotalXP] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState<any[]>([]);
  const [totalModulesCompleted, setTotalModulesCompleted] = useState(0);

  const nextSubject = () => {
    if (courseStats.length === 0) return;
    setCurrentSubjectIndex((prev) => (prev + 1) % courseStats.length);
  };

  const prevSubject = () => {
    if (courseStats.length === 0) return;
    setCurrentSubjectIndex((prev) => (prev - 1 + courseStats.length) % courseStats.length);
  };

  const nextAvgScore = () => {
    if (avgScoreStats.length === 0) return;
    setCurrentAvgScoreIndex((prev) => (prev + 1) % avgScoreStats.length);
  };

  const prevAvgScore = () => {
    if (avgScoreStats.length === 0) return;
    setCurrentAvgScoreIndex((prev) => (prev - 1 + avgScoreStats.length) % avgScoreStats.length);
  };



  useEffect(() => {
    if (session?.user?.email) {
      fetchDashboardData();
    }
  }, [session]);

  // --- Caching Utilities ---
  const CACHE_KEYS = { TIMETABLE: 'lms_timetable', EVENTS: 'lms_events', PROGRESS: 'lms_progress' };
  const CACHE_DURATIONS = {
    TIMETABLE: 24 * 60 * 60 * 1000, // 24 hours
    EVENTS: 60 * 60 * 1000,         // 1 hour
    PROGRESS: 30 * 1000             // 30 seconds
  };

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

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      await fetchSubjects();
      await Promise.all([
        fetchTimetable(),
        fetchProgress(),
        fetchEvents()
      ]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await fetch("/api/subjects");
      const data = await res.json();
      if (data.success) {
        setAllSubjects(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch subjects", error);
    }
  };

  const fetchTimetable = async () => {
    const cached = getFromCache(CACHE_KEYS.TIMETABLE);
    if (cached) {
      setTimetable(cached as TimetableData);
      return;
    }

    try {
      const res = await fetch("/api/timetable");
      const data = await res.json();
      if (data.ok && data.data) {
        setTimetable(data.data);
        saveToCache(CACHE_KEYS.TIMETABLE, data.data);
      } else {
        setTimetable({});
      }
    } catch (error) {
      console.error("Failed to fetch timetable:", error);
      setTimetable({});
    }
  };

  const fetchProgress = async () => {
    const cached = getFromCache(CACHE_KEYS.PROGRESS);
    if (cached) {
      setProgressData(cached);
      calculateStats(cached);
      return;
    }

    try {
      const res = await fetch(`/api/progress?userEmail=${session?.user?.email}`);
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setProgressData(data.data);
        calculateStats(data.data);
        saveToCache(CACHE_KEYS.PROGRESS, data.data);
      }
    } catch (error) {
      console.error("Failed to fetch progress", error);
    }
  };

  const fetchEvents = async () => {
    const cached = getFromCache(CACHE_KEYS.EVENTS);
    if (cached) {
      setEvents(cached.rawData);
      setActiveTasks(cached.tasks);
      return;
    }

    try {
      const res = await fetch("/api/events");
      const response = await res.json();
      const data = response.data;

      if (response.success && data) {
        // Transform events to "tasks"
        const tasks = data.map((e: any, idx: number) => ({
          id: e.id,
          title: e.title,
          status: 'Upcoming',
          time: e.date ? new Date(e.date).toLocaleDateString() : 'No date',
          icon: e.type === 'announcement' ? <Bell className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />,
          image_url: e.image_url
        }));

        setEvents(data);
        setActiveTasks(tasks);
        saveToCache(CACHE_KEYS.EVENTS, { rawData: data, tasks });
      } else {
        console.error("API error fetching events:", response.error);
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  // Trigger stats recalculation when allSubjects are loaded
  useEffect(() => {
    if (allSubjects.length > 0 && progressData.length > 0) {
      calculateStats(progressData, allSubjects);
    }
  }, [allSubjects, progressData]);

  const calculateStats = (data: any[], subjects: any[] = []) => {
    // Helper to generate colors deterministically
    const getColor = (index: number) => {
      const colors = [
        { base: 'cyan', text: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100', progress: 'bg-cyan-500', stroke: '#0891b2' },
        { base: 'purple', text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', progress: 'bg-purple-500', stroke: '#9333ea' },
        { base: 'orange', text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100', progress: 'bg-orange-500', stroke: '#f97316' },
        { base: 'blue', text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', progress: 'bg-blue-500', stroke: '#2563eb' },
        { base: 'emerald', text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', progress: 'bg-emerald-500', stroke: '#059669' },
      ];
      return colors[index % colors.length];
    };

    const mergedSubjects = subjects.map((sub, idx) => {
      const colors = getColor(idx);
      return {
        key: sub.name,
        name: sub.name,
        title: sub.name,
        moduleCount: sub.modules ? sub.modules.length : 0,
        modules: sub.modules,
        color: colors.text,
        bg: colors.bg,
        border: colors.border,
        progressColor: colors.progress,
        stroke: colors.stroke
      };
    });

    // Dynamic Totals Calculation
    let TOTAL_LESSONS = 0;
    let TOTAL_QUIZZES = 0;

    mergedSubjects.forEach((subject: any) => {
      TOTAL_LESSONS += subject.moduleCount;
      if (subject.modules) {
        TOTAL_QUIZZES += subject.modules.filter((m: any) => m.quiz).length;
      }
    });

    // Filter data to only include records for current subjects
    const validSubjectNames = mergedSubjects.map((s: any) => s.name);
    const filteredData = data.filter((p: any) => validSubjectNames.includes(p.subject));

    // Calculated from data
    const lessonsCompleted = filteredData.filter((p: any) => p && (p.completed || typeof p.score === 'number')).length;
    const quizzesCompleted = filteredData.filter((p: any) => p && typeof p.score === 'number').length;

    // --- Dynamic Subject Processing ---
    const newCourseStats: any[] = [];
    const newAvgScoreStats: any[] = [];

    // Track scores for Best/Worst calculation
    const subjectPerformances: { name: string, score: number }[] = [];

    mergedSubjects.forEach((subject) => {
      // 1. Calculate Progress
      let subjectModules = subject.moduleCount;

      const actualSubjectCompleted = data.filter(p =>
        p.subject === subject.name && (p.completed || p.percentage >= 60)
      ).length;

      const subjectPerc = subjectModules > 0 ? Math.round((actualSubjectCompleted / subjectModules) * 100) : 0;

      newCourseStats.push({
        id: subject.key,
        name: subject.name,
        title: subject.title,
        completed: subjectPerc,
        incomplete: Math.max(0, 100 - subjectPerc),
        color: subject.color,
        stroke: subject.stroke
      });

      // 2. Calculate Average Score (Marks & Percentage)
      const attempts = data.filter(p => p.subject === subject.name && typeof p.score === 'number');

      let avgPercentage = 0;
      let displayScore = "0/0";

      if (attempts.length > 0) {
        // Calculate Average Percentage
        const sumPercentages = attempts.reduce((acc: number, p: any) => {
          const pct = p.percentage !== undefined ? p.percentage : (p.totalQuestions ? (p.score / p.totalQuestions) * 100 : 0);
          return acc + pct;
        }, 0);
        avgPercentage = Math.round(sumPercentages / attempts.length);

        // Calculate Average Marks
        const totalObtained = attempts.reduce((acc: number, p: any) => acc + p.score, 0);
        const totalMax = attempts.reduce((acc: number, p: any) => acc + (p.totalQuestions || 0), 0);

        const avgObtained = parseFloat((totalObtained / attempts.length).toFixed(1));
        const avgMax = parseFloat((totalMax / attempts.length).toFixed(1));

        displayScore = `${avgObtained}/${avgMax}`;

        subjectPerformances.push({ name: subject.name, score: avgPercentage });
      }

      newAvgScoreStats.push({
        id: subject.key,
        name: subject.name,
        title: subject.title,
        score: avgPercentage,
        displayScore: displayScore,
        color: subject.color,
        bg: subject.bg,
        border: subject.border,
        progressColor: subject.progressColor
      });
    });

    setCourseStats(newCourseStats);
    setAvgScoreStats(newAvgScoreStats);

    // Calculate Best and Worst
    // Calculate Best and Worst based on 65% threshold
    const bestSubjectsList = subjectPerformances.filter(s => s.score > 65);
    const needsAttentionList = subjectPerformances.filter(s => s.score <= 65);

    // Sort for consistent display
    bestSubjectsList.sort((a, b) => b.score - a.score); // Highest first
    needsAttentionList.sort((a, b) => a.score - b.score); // Lowest first

    const getGroupStats = (list: typeof subjectPerformances) => {
      if (list.length === 0) return { value: "N/A", subtext: "No subjects", progress: 0 };
      const avg = Math.round(list.reduce((acc, curr) => acc + curr.score, 0) / list.length);
      const names = list.map(s => s.name).join(", ");
      return { value: `${avg}%`, subtext: names, progress: avg };
    };

    const bestStats = getGroupStats(bestSubjectsList);
    const worstStats = getGroupStats(needsAttentionList);

    // --- Calculate Badges & XP ---
    let calculatedXP = 0;
    let modulesCount = 0;
    const newBadges: any[] = [];

    mergedSubjects.forEach((subject) => {
      // Count completed modules for this subject
      const subjectCompletedModules = data.filter(p =>
        p.subject === subject.name && (p.completed || p.percentage >= 60)
      ).length;

      modulesCount += subjectCompletedModules;

      if (subjectCompletedModules > 0) {
        // 1. Module Badges
        // Award 20 XP per module
        calculatedXP += (subjectCompletedModules * 20);
      }

      // 2. Subject Completion Badge
      // Check if ALL modules are completed
      if (subject.moduleCount > 0 && subjectCompletedModules >= subject.moduleCount) {
        calculatedXP += 500;
        newBadges.push({
          id: `subject-${subject.name}`,
          name: `${subject.name} Master`,
          description: `Completed all modules in ${subject.name}`,
          xp: 500,
          icon: <Globe className="w-6 h-6 text-yellow-600" />, // Use a Trophy icon if available, else Globe/Star
          type: 'subject',
          date: new Date().toLocaleDateString() // Ideally from data
        });
      }
    });

    // Add recent module badges (generic for display)
    // We can just show a "Module Master" badge with a count if too many
    if (calculatedXP > 0) {
      setTotalXP(calculatedXP);
      setEarnedBadges(newBadges);
    }
    setTotalModulesCompleted(modulesCount);

    setStats([
      {
        label: "Total XP",
        value: `${calculatedXP}`,
        subtext: "Experience Points",
        icon: <Zap className="w-6 h-6 text-yellow-500" />,
        color: "bg-yellow-50 border-yellow-100",
        progressColor: "bg-yellow-500",
        progress: 100
      },
      {
        label: "Best Performance (>65%)",
        value: bestStats.value,
        subtext: bestStats.subtext,
        icon: <CheckCircle2 className="w-6 h-6 text-green-600" />,
        color: "bg-green-50 border-green-100",
        progressColor: "bg-green-500",
        progress: bestStats.progress
      },
      {
        label: "Needs Attention (≤65%)",
        value: worstStats.value,
        subtext: worstStats.subtext,
        icon: <LayoutDashboard className="w-6 h-6 text-orange-600" />,
        color: "bg-orange-50 border-orange-100",
        progressColor: "bg-orange-500",
        progress: worstStats.progress
      },
      {
        label: "Quizzes completed",
        value: TOTAL_QUIZZES > 0 ? `${Math.round((quizzesCompleted / TOTAL_QUIZZES) * 100)}%` : "0%",
        subtext: `${quizzesCompleted} of ${TOTAL_QUIZZES} quizzes`,
        icon: <BookOpen className="w-6 h-6 text-rose-600" />,
        color: "bg-rose-50 border-rose-100",
        progressColor: "bg-rose-500",
        progress: TOTAL_QUIZZES > 0 ? (quizzesCompleted / TOTAL_QUIZZES) * 100 : 0
      },
    ]);
  };

  // ... Helper functions for Calendar ...
  const getCalendarDates = () => {
    const dates = [];
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - 2);

    for (let i = 0; i < 5; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const calendarDates = getCalendarDates();

  const getScheduleForDate = (date: Date) => {
    const data = timetable || {};
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[date.getDay()];
    return data[dayName] || [];
  };

  const selectedSchedule = getScheduleForDate(selectedDate);
  const upcomingClass = getScheduleForDate(new Date()).find(s => s && s.subject);

  return (
    <div className="flex h-screen bg-[#FFF8F8] font-sans text-gray-900 overflow-hidden">
      <DashboardSidebar activePage="dashboard" />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

          <div className="flex items-center gap-6">


            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 hidden sm:block">{session?.user?.name || "Student"}</span>
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center">

                <User className="text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className={`p-5 rounded-2xl border ${stat.color} bg-white shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                </div>
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {stat.icon}
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                <div className={`h-1.5 rounded-full ${stat.progressColor}`} style={{ width: stat.value }}></div>
              </div>
              <p className="text-xs text-gray-500">{stat.subtext}</p>
            </div>
          ))}


        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Calendar Widget */}
          <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[22rem] overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-gray-800 text-lg">
                {selectedDate.toLocaleString('default', { month: 'long' })}
              </span>
              <div className="flex gap-2 items-center">
                <span className="font-bold text-gray-800 text-lg">{selectedDate.getFullYear()}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="flex justify-between mb-6">
              {calendarDates.map((date, i) => {
                const isSelected = date.toDateString() === selectedDate.toDateString();
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedDate(date)}
                    className={`flex flex-col items-center justify-center w-11 h-16 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 ${isSelected
                      ? 'bg-[#FFDE85] text-gray-900 shadow-sm transform scale-105'
                      : 'hover:bg-gray-50 text-gray-500'
                      }`}
                  >
                    <span className="mb-1">{date.getDate()}</span>
                    <span className="text-[10px] uppercase tracking-wide opacity-80">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style jsx>{`
                                div::-webkit-scrollbar {
                                    display: none;
                                }
                            `}</style>
              {selectedSchedule.filter(s => s && s.subject).length > 0 ? (
                selectedSchedule.filter(s => s && s.subject).map((slot, idx) => (
                  <div key={idx} className="p-3 border border-gray-100 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded text-[10px]">{slot.time}</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800 mb-0.5">{slot.subject}</p>
                    <p className="text-xs text-gray-500 truncate">{slot.description || slot.teacher || "No details"}</p>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 p-4 border border-dashed border-gray-200 rounded-2xl">
                  <Clock className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-xs font-medium">No schedule</p>
                </div>
              )}
            </div>
          </div>

          {/* Active Tasks */}
          <div className="lg:col-span-2 bg-[#F2F6FF] p-5 rounded-2xl border border-blue-100/50 shadow-sm flex flex-col h-[22rem]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800">Active tasks</h3>
              <button className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm hover:bg-gray-50">By priority</button>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              {activeTasks.map((task) => (
                <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-gray-100">
                  {task.image_url ? (
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100">
                      <img
                        src={task.image_url}
                        alt={task.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-500 flex-shrink-0">
                      {task.icon}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-800 mb-1 truncate">{task.title}</h4>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${task.status === 'In progress' || task.status === 'Upcoming' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                        {task.status}
                      </span>
                      <span className="text-[10px] text-red-500 font-medium bg-red-50 px-2 py-0.5 rounded-full whitespace-nowrap">Time left: {task.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Statistics (Donut Chart) */}
          {courseStats.length > 0 ? (
            <div className="lg:col-span-1 bg-[#FFF8E5] p-5 rounded-2xl border border-yellow-100/50 shadow-sm flex flex-col items-center justify-center relative h-[22rem]">
              <h3 className="font-bold text-gray-800 w-full mb-4 text-left">Course statistics</h3>

              <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
                {/* Navigation Arrows */}
                <button
                  onClick={prevSubject}
                  className="absolute -left-8 p-1 text-gray-400 hover:text-gray-600 z-10 hover:bg-yellow-100 rounded-full transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSubject}
                  className="absolute -right-8 p-1 text-gray-400 hover:text-gray-600 z-10 hover:bg-yellow-100 rounded-full transition-colors"
                >
                  <ChevronRight size={24} />
                </button>

                {/* SVG Donut Chart */}
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#E5E7EB" strokeWidth="3.8" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#EF4444" strokeWidth="3.8" strokeDasharray={`${courseStats[currentSubjectIndex].incomplete}, 100`} className="opacity-80 transition-all duration-500 ease-in-out" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke={courseStats[currentSubjectIndex].stroke} strokeWidth="3.8" strokeDasharray={`${courseStats[currentSubjectIndex].completed}, 100`} strokeDashoffset={`-${courseStats[currentSubjectIndex].incomplete}`} className="opacity-80 transition-all duration-500 ease-in-out" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className={`text-sm font-bold ${courseStats[currentSubjectIndex].color}`}>{courseStats[currentSubjectIndex].name}</span>
                  <span className="text-xs text-gray-500">Course</span>
                </div>
              </div>

              <div className="w-full space-y-2">
                {/* Stats Legend */}
                <div className="flex justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: courseStats[currentSubjectIndex].stroke }}></div>
                    <span className="text-gray-600">Completed</span>
                  </div>
                  <span className="font-medium text-gray-800">{courseStats[currentSubjectIndex].completed}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <span className="text-gray-600">Incompleted</span>
                  </div>
                  <span className="font-medium text-gray-800">{courseStats[currentSubjectIndex].incomplete}%</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-1 bg-[#FFF8E5] p-5 rounded-2xl border border-yellow-100/50 shadow-sm flex flex-col items-center justify-center h-[22rem]">
              <p className="text-gray-500 font-medium">Loading courses...</p>
            </div>
          )}
        </div>



        {/* Achievements Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="text-yellow-500" />
            Your Achievements
          </h3>

          {earnedBadges.length > 0 || totalXP > 0 ? (
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-gray-500 text-sm">Current Level</p>
                  <h4 className="text-2xl font-bold text-gray-800">
                    {totalXP < 500 ? "Novice" : totalXP < 2000 ? "Apprentice" : "Expert"}
                  </h4>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm">Total XP</p>
                  <h4 className="text-3xl font-bold text-yellow-500 flex items-center justify-end gap-1">
                    <Zap size={24} fill="currentColor" />
                    {totalXP}
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Always show Module Badge Summary */}
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-center gap-3">
                  <div className="p-3 bg-white rounded-full shadow-sm text-blue-500">
                    <Award size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800">Module Master</h5>
                    <p className="text-xs text-gray-500">Earned for finishing modules</p>
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                      {totalModulesCompleted} Badges
                    </span>
                  </div>
                </div>

                {/* Subject Badges */}
                {earnedBadges.map((badge) => (
                  <div key={badge.id} className="p-4 rounded-xl bg-yellow-50 border border-yellow-100 flex items-center gap-3">
                    <div className="p-3 bg-white rounded-full shadow-sm text-yellow-500">
                      {badge.icon}
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-800">{badge.name}</h5>
                      <p className="text-xs text-gray-500">{badge.description}</p>
                      <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                        +{badge.xp} XP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white rounded-2xl border border-gray-100 text-center text-gray-500">
              <p>Complete modules to earn XP and Badges!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
