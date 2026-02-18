'use client';
import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  LayoutDashboard,
  BookOpen,
  CreditCard,
  LogOut,
  User,
  ChevronRight,
  ChevronDown,
  PlayCircle,
  FileText,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface CourseOverviewProps {
  onModuleSelect: (unitId: number, moduleId: number) => void;
}

const CourseOverview: React.FC<CourseOverviewProps> = ({ onModuleSelect }) => {
  const [activeTab, setActiveTab] = useState('learning-path');
  const [expandedUnit, setExpandedUnit] = useState<number | null>(1);
  const { data: session } = useSession();
  const [studentProgress, setStudentProgress] = useState<any[]>([]);

  useEffect(() => {
    if (session?.user?.email) {
      fetchStudentProgress(session.user.email);
    }
  }, [session]);

  const fetchStudentProgress = async (email: string) => {
    const res = await fetch(`/api/progress?userEmail=${email}&subject=OS`, {
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
  };

  const completedModules = studentProgress.length;
  // const masteryModules = studentProgress.filter(p => p.percentage >= 80).length;
  const totalModules = 25;
  const completedPercentage = Math.round((completedModules / totalModules) * 100);
  // const masteryPercentage = Math.round((masteryModules / totalModules) * 100);

  const units = [
    {
      id: 1,
      title: 'Computer System & OS Overview',
      description: 'Upon successful completion of this unit, learners will understand operating system fundamentals, types, generations, operations, security mechanisms, system calls, and various OS structures.',
      modules: [
        { id: '1.1', title: 'Overview of Operating Systems', description: 'Introduction to OS concepts and core functions' },
        { id: '1.2', title: 'OS Types and Generation', description: 'Evolution and classification of operating systems' },
        { id: '1.3', title: 'OS Operations & Security', description: 'Understanding OS operations and security principles' },
        { id: '1.4', title: 'System Calls & Structures', description: 'System call interfaces and OS architectural patterns' },
        { id: '1.5', title: 'Unit 1 Quiz', description: 'Test your knowledge of OS fundamentals' }
      ]
    },
    {
      id: 2,
      title: 'Process Management',
      description: 'Master process concepts, scheduling algorithms, multithreading models, and inter-process communication mechanisms.',
      modules: [
        { id: '2.1', title: 'Process Concepts', description: 'Process states, PCB, and process operations' },
        { id: '2.2', title: 'Process Scheduling', description: 'Schedulers and scheduling criteria' },
        { id: '2.3', title: 'Scheduling Algorithms', description: 'FCFS, SJF, Priority, and Round Robin algorithms' },
        { id: '2.4', title: 'Multithreading & IPC', description: 'Threading models and communication mechanisms' },
        { id: '2.5', title: 'Unit 2 Quiz', description: 'Test your knowledge of process management' }
      ]
    },
    {
      id: 3,
      title: 'Concurrency & Deadlock',
      description: 'Explore concurrency principles, synchronization techniques, and comprehensive deadlock handling strategies.',
      modules: [
        { id: '3.1', title: 'Concurrency Principles', description: 'Understanding concurrent process execution' },
        { id: '3.2', title: 'Process Synchronization', description: 'Synchronization mechanisms and critical sections' },
        { id: '3.3', title: 'Deadlock Principles', description: 'Deadlock characterization and conditions' },
        { id: '3.4', title: 'Deadlock Handling', description: 'Prevention, avoidance, detection, and recovery' },
        { id: '3.5', title: 'Unit 3 Quiz', description: 'Test your knowledge of concurrency and deadlock' }
      ]
    },
    {
      id: 4,
      title: 'Memory Management',
      description: 'Learn memory allocation strategies, paging, segmentation, and virtual memory management techniques.',
      modules: [
        { id: '4.1', title: 'Memory Allocation', description: 'Contiguous and non-contiguous memory allocation' },
        { id: '4.2', title: 'Paging & Segmentation', description: 'Memory management schemes and address translation' },
        { id: '4.3', title: 'Virtual Memory', description: 'Demand paging and virtual memory concepts' },
        { id: '4.4', title: 'Page Replacement', description: 'Page replacement algorithms and optimization' },
        { id: '4.5', title: 'Unit 4 Quiz', description: 'Test your knowledge of memory management' }
      ]
    },
    {
      id: 5,
      title: 'File Systems & Storage',
      description: 'Understand file system interfaces, directory structures, mass storage, and disk scheduling algorithms.',
      modules: [
        { id: '5.1', title: 'File System Interface', description: 'File concepts, access methods, and operations' },
        { id: '5.2', title: 'Directory Structure', description: 'Directory organization and implementation' },
        { id: '5.3', title: 'Mass Storage Structure', description: 'Disk structure and storage management' },
        { id: '5.4', title: 'Disk Scheduling', description: 'FCFS, SSTF, SCAN, and C-SCAN algorithms' },
        { id: '5.5', title: 'Unit 5 Quiz', description: 'Test your knowledge of file systems and storage' }
      ]
    }
  ];

  return (
    <div className="w-full bg-[#FFF8F8] font-sans text-gray-900">
      <style jsx global>{`
          main::-webkit-scrollbar {
            display: none;
          }
        `}</style>

      {/* Header */}
      <header className="flex justify-between items-center mb-8 px-8 pt-8">
        <div className="flex items-center gap-2">
          <Link href="/pages/courses" className="text-sm text-gray-500 hover:text-[#FF5B5B]">Courses</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <h1 className="text-2xl font-bold text-gray-800">OS Course</h1>
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

      {/* Content Container */}
      <div className="w-full space-y-8 px-8 pb-8">

        {/* Header Card (Progress) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Operating Systems</h2>
            <p className="text-gray-500 text-sm">Master the fundamental concepts of Operating Systems, including process management, memory management, file systems, and concurrency.</p>
          </div>

          <div className="flex flex-col items-end gap-2 w-full md:w-auto">
            <div className="flex gap-1">
              {[...Array(20)].map((_, i) => {
                const segmentThreshold = (i + 1) * 5;
                const isCompleted = completedPercentage >= segmentThreshold;
                return (
                  <div
                    key={i}
                    className={`h-2 w-1.5 rounded-full ${isCompleted ? 'bg-[#4CAF50]' : 'bg-gray-200'}`}
                  ></div>
                );
              })}
            </div>
            <div className="text-xs font-medium text-gray-500">{completedPercentage}% Completed</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-6 border-b border-gray-200 overflow-x-auto pb-1">
          {[
            { id: 'learning-path', label: 'Learning Path', icon: <BookOpen size={16} /> },
            { id: 'about', label: 'About', icon: <FileText size={16} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${activeTab === tab.id ? 'border-[#FF5B5B] text-[#FF5B5B]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline Content */}
        <div className="space-y-6">
          {activeTab === 'learning-path' && (
            <>
              {units.map((unit) => (
                <div key={unit.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div
                    onClick={() => setExpandedUnit(expandedUnit === unit.id ? null : unit.id)}
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors flex gap-6 items-start"
                  >
                    <div className="flex flex-col items-center justify-center w-16 h-16 bg-white border border-gray-200 rounded-xl shrink-0 shadow-sm">
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Module</span>
                      <span className="text-2xl font-bold text-gray-800">{unit.id}</span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{unit.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{unit.description}</p>
                    </div>

                    <div className="text-gray-400 pt-2">
                      {expandedUnit === unit.id ? <ChevronDown /> : <ChevronRight />}
                    </div>
                  </div>

                  {/* Expanded Modules */}
                  {expandedUnit === unit.id && (
                    <div className="border-t border-gray-100 bg-[#FAFAFA]/50 p-6 space-y-4">
                      {unit.modules.map((module, idx) => {
                        const isCompleted = studentProgress.some(p => {
                          const dbUnitId = p.unitId || p.unit_id;
                          const dbModuleId = p.moduleId || p.module_id;
                          return (
                            String(dbUnitId) === String(unit.id) &&
                            String(dbModuleId) === String(idx + 1) &&
                            !!p.completed
                          );
                        });

                        return (
                          <div
                            key={module.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              onModuleSelect(unit.id, idx + 1);
                            }}
                            className="group bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all cursor-pointer flex gap-4"
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${isCompleted
                              ? 'bg-green-600 text-white'
                              : 'bg-white border border-gray-200 text-gray-500'
                              }`}>
                              {module.id}
                            </div>
                            <div>
                              <h4 className="font-bold text-sm mb-1 text-gray-800 transition-colors">{module.title}</h4>
                              <p className="text-xs text-gray-500 line-clamp-1">{module.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {activeTab === 'about' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">About the Course</h3>
                <p className="text-gray-600 leading-relaxed">
                  This course provides a deep dive into the internal workings of Operating Systems. You will explore critical concepts such as process scheduling, memory management, mutual exclusion, deadlocks, and file systems.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">What you'll learn</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                      <span>Process Management & Scheduling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                      <span>Memory Management & Virtual Memory</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                      <span>Concurrency, Synchronization & Deadlocks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                      <span>File Systems & Mass Storage</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Prerequisites</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Basic understanding of computer organization and C programming is recommended.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">Core CS</span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">Conceptual</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CourseOverview;
