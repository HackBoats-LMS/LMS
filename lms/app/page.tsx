"use client";

import React, { useState, useEffect } from 'react';
import supabase from '@/lib/db';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
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
  User
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
  const [loading, setLoading] = useState(true);

  // Dynamic Stats State
  const [stats, setStats] = useState([
    { label: "Units completed", value: "0", subtext: "0 of 7 units", icon: <LayoutDashboard className="w-6 h-6 text-yellow-600" />, color: "bg-yellow-50 border-yellow-100", progressColor: "bg-yellow-500", progress: 0 },
    { label: "Lessons completed", value: "0", subtext: "0 of 43 lessons", icon: <BookOpen className="w-6 h-6 text-green-600" />, color: "bg-green-50 border-green-100", progressColor: "bg-green-500", progress: 0 },
    { label: "Quizzes completed", value: "0", subtext: "0 of 43 quizzes", icon: <CheckCircle2 className="w-6 h-6 text-rose-600" />, color: "bg-rose-50 border-rose-100", progressColor: "bg-rose-500", progress: 0 },
  ]);

  const [activeTasks, setActiveTasks] = useState<any[]>([]);

  // --- Configuration ---
  const SUBJECT_CONFIG: { [key: string]: any } = {
    'fswd': {
      name: 'FSWD',
      title: 'Full Stack',
      units: { 1: 9, 2: 9 },
      baseColor: 'cyan',
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      border: 'border-cyan-100',
      progressColor: 'bg-cyan-500',
      stroke: '#0891b2'
    },
    'os': {
      name: 'OS',
      title: 'Operating Sys',
      units: { 1: 5, 2: 5, 3: 5, 4: 5, 5: 5 },
      baseColor: 'purple',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      progressColor: 'bg-purple-500',
      stroke: '#9333ea'
    }
    // Add new subjects here...
  };

  // Course Stats State
  const [courseStats, setCourseStats] = useState<any[]>(() => {
    return Object.entries(SUBJECT_CONFIG).map(([key, config]) => ({
      id: key,
      name: config.name,
      title: config.title,
      completed: 0,
      incomplete: 100,
      color: config.color,
      stroke: config.stroke
    }));
  });
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);

  // Avg Score State
  const [avgScoreStats, setAvgScoreStats] = useState<any[]>(() => {
    return Object.entries(SUBJECT_CONFIG).map(([key, config]) => ({
      id: key,
      name: config.name,
      title: config.title,
      score: 0,
      color: config.color,
      bg: config.bg,
      border: config.border,
      progressColor: config.progressColor
    }));
  });
  const [currentAvgScoreIndex, setCurrentAvgScoreIndex] = useState(0);

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
          icon: e.type === 'announcement' ? <Bell className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />
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

  const calculateStats = (data: any[]) => {
    // Dynamic Totals Calculation based on SUBJECT_CONFIG
    let TOTAL_LESSONS = 0;
    let TOTAL_UNITS = 0;

    Object.values(SUBJECT_CONFIG).forEach((subject: any) => {
      Object.values(subject.units).forEach((count: any) => {
        TOTAL_LESSONS += count;
      });
      TOTAL_UNITS += Object.keys(subject.units).length;
    });

    const TOTAL_QUIZZES = TOTAL_LESSONS; // Assuming 1 quiz per lesson/module

    // Calculated from data
    const lessonsCompleted = data.filter(p => p.completed).length;

    let fullyCompletedUnits = 0;

    // --- Dynamic Subject Processing ---
    const newCourseStats: any[] = [];
    const newAvgScoreStats: any[] = [];

    Object.entries(SUBJECT_CONFIG).forEach(([subjectKey, config]) => {
      // 1. Calculate Fully Completed Units
      let subjectModules = 0;
      let subjectCompletedModules = 0;

      Object.entries(config.units).forEach(([unitId, totalModules]) => {
        subjectModules += (totalModules as number);
        const count = (totalModules as number);

        const completedInUnit = data.filter(p =>
          p.subject &&
          p.subject.toLowerCase().includes(subjectKey) &&
          p.unitId === parseInt(unitId) &&
          p.completed
        ).length;

        if (completedInUnit >= count) {
          fullyCompletedUnits++;
        }

        if (completedInUnit) subjectCompletedModules += completedInUnit; // Approximate
      });

      // Correct calculation for subject completion %
      // We need to count exact completed modules for the subject from data
      const actualSubjectCompleted = data.filter(p =>
        p.subject && p.subject.toLowerCase().includes(subjectKey) && p.completed
      ).length;

      const subjectPerc = Math.round((actualSubjectCompleted / subjectModules) * 100) || 0;

      newCourseStats.push({
        id: subjectKey,
        name: config.name,
        title: config.title,
        completed: subjectPerc,
        incomplete: Math.max(0, 100 - subjectPerc),
        color: config.color,
        stroke: config.stroke
      });

      // 2. Calculate Average Score
      const subjectScores = data
        .filter(p => p.subject && p.subject.toLowerCase().includes(subjectKey) && p.score > 0)
        .map(p => p.score);

      const avgScore = subjectScores.length > 0
        ? Math.round(subjectScores.reduce((a: number, b: number) => a + b, 0) / subjectScores.length)
        : 0;

      newAvgScoreStats.push({
        id: subjectKey,
        name: config.name,
        title: config.title,
        score: avgScore,
        color: config.color,
        bg: config.bg,
        border: config.border,
        progressColor: config.progressColor
      });
    });

    setCourseStats(newCourseStats);
    setAvgScoreStats(newAvgScoreStats);


    // Quizzes Count
    const quizzesCompleted = data.filter(p => p.score > 0).length;

    setStats([
      {
        label: "Units completed",
        value: `${Math.round((fullyCompletedUnits / TOTAL_UNITS) * 100)}%`,
        subtext: `${fullyCompletedUnits} of ${TOTAL_UNITS} units`,
        icon: <LayoutDashboard className="w-6 h-6 text-yellow-600" />,
        color: "bg-yellow-50 border-yellow-100",
        progressColor: "bg-yellow-500",
        progress: (fullyCompletedUnits / TOTAL_UNITS) * 100
      },
      {
        label: "Lessons completed",
        value: `${Math.round((lessonsCompleted / TOTAL_LESSONS) * 100)}%`,
        subtext: `${lessonsCompleted} of ${TOTAL_LESSONS} lessons`,
        icon: <BookOpen className="w-6 h-6 text-green-600" />,
        color: "bg-green-50 border-green-100",
        progressColor: "bg-green-500",
        progress: (lessonsCompleted / TOTAL_LESSONS) * 100
      },
      {
        label: "Quizzes completed",
        value: `${Math.round((quizzesCompleted / TOTAL_QUIZZES) * 100)}%`,
        subtext: `${quizzesCompleted} of ${TOTAL_QUIZZES} quizzes`,
        icon: <CheckCircle2 className="w-6 h-6 text-rose-600" />,
        color: "bg-rose-50 border-rose-100",
        progressColor: "bg-rose-500",
        progress: (quizzesCompleted / TOTAL_QUIZZES) * 100
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
  const upcomingClass = getScheduleForDate(new Date()).find(s => s.subject);

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
            { name: "Dashboard", icon: <LayoutDashboard size={20} />, active: true, link: "/" },
            { name: "Courses", icon: <BookOpen size={20} />, link: "/pages/courses" },
            { name: "Events", icon: <CreditCard size={20} />, link: "/pages/events" },
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

          {/* Average Score Card with Navigation */}
          <div className={`p-5 rounded-2xl border ${avgScoreStats[currentAvgScoreIndex].border} ${avgScoreStats[currentAvgScoreIndex].bg} shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}>
            <div className="flex justify-between items-start mb-4 relative z-10 w-full">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Avg Score ({avgScoreStats[currentAvgScoreIndex].name})</p>
                <h3 className={`text-2xl font-bold ${avgScoreStats[currentAvgScoreIndex].color}`}>{avgScoreStats[currentAvgScoreIndex].score}%</h3>
              </div>

              <div className="flex items-center gap-1 z-20">
                <button
                  onClick={(e) => { e.stopPropagation(); prevAvgScore(); }}
                  className="p-1 rounded-full bg-white/50 hover:bg-white text-gray-500 hover:text-gray-700 transition shadow-sm"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextAvgScore(); }}
                  className="p-1 rounded-full bg-white/50 hover:bg-white text-gray-500 hover:text-gray-700 transition shadow-sm"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <div className="w-full bg-white/50 rounded-full h-1.5 mb-2 relative z-10">
              <div className={`h-1.5 rounded-full ${avgScoreStats[currentAvgScoreIndex].progressColor}`} style={{ width: `${avgScoreStats[currentAvgScoreIndex].score}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 relative z-10 flex items-center gap-1">
              {avgScoreStats[currentAvgScoreIndex].title}
            </p>
          </div>
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
              {selectedSchedule.filter(s => s.subject).length > 0 ? (
                selectedSchedule.filter(s => s.subject).map((slot, idx) => (
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
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                    {task.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-800 mb-1">{task.title}</h4>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${task.status === 'In progress' || task.status === 'Upcoming' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                        {task.status}
                      </span>
                      <span className="text-[10px] text-red-500 font-medium bg-red-50 px-2 py-0.5 rounded-full">Time left: {task.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Statistics (Donut Chart) */}
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
        </div>


      </main>
    </div>
  );
};

export default StudentDashboard;
