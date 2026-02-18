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
    const res = await fetch(`/api/progress?userEmail=${email}&subject=FSWD`, {
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
  const masteryModules = studentProgress.filter(p => p.percentage >= 80).length;
  const totalModules = 18;
  const completedPercentage = Math.round((completedModules / totalModules) * 100);
  const masteryPercentage = Math.round((masteryModules / totalModules) * 100);

  const units = [
    {
      id: 1,
      title: 'Setting up a simple React app using Vite(v3)',
      description: 'Here we will learn about how to setup react application using vite. This module covers the complete setup process, configuration options, and best practices for building modern React applications with Vite.',
      modules: [
        { id: '1.1', title: 'Setting up a simple React app using Vite - An introduction', description: 'This learning unit will introduce you to the concept of setting up a react project using vite framework. This will be a mentor-led live learning unit.' },
        { id: '1.2', title: 'Setting up a simple React app using Vite - Deep-dive part #1', description: 'This is part 1 of a 2-part learning unit, where you understand on using \'Vite\' deeply.' },
        { id: '1.3', title: 'Setting up a simple React app using Vite - Deep-dive part #2', description: 'This is part 2 of a 2-part learning unit, where you understand on using \'Vite\' deeply.' },
        { id: '1.4', title: 'Setting up a simple React app using Vite - Practice assignment #1', description: 'This is practice assignment #1 where you will be creating a React project using Vite.' },
        { id: '1.5', title: 'Setting up a simple React app using Vite - Practice assignment #2', description: 'This is practice assignment #2 where you will be creating a React project using Vite.' },
        { id: '1.6', title: 'Follow-along project milestone #15', description: 'This is the fifteenth milestone in our follow-along project series, conducted as a mentor-led live lesson. In this session, we will collaboratively begin working on a project, focusing on milestone #15.' },
        { id: '1.7', title: 'Follow-along project milestone #16', description: 'This is the sixteenth milestone in our follow-along project series, conducted as a mentor-led live lesson. In this session, we will collaboratively begin working on a project, focusing on milestone #16.' },
        { id: '1.8', title: 'Assignment | ASAP Project - Setting up React app', description: 'In this assignment, your task is to set up a React application using Vite. This includes installing Vite, creating a new React project, configuring the development environment, and ensuring the app runs smoothly.' },
        { id: '1.9', title: 'Knowledge review # 5', description: 'This will be a self assessment, designed to help revise and consolidate the concepts covered in the module.' }
      ]
    },
    {
      id: 2,
      title: 'Deploying your Front-end(v3)',
      description: 'In this module you will learn how to deploy your frontend in depth. We will explore various deployment platforms, CI/CD pipelines, environment configurations, and production optimization techniques for modern web applications.',
      modules: [
        { id: '2.1', title: 'Deploying your Front-end - An introduction', description: 'This learning unit will introduce you to the concept of deploying your frontend. This will be a mentor-led live learning unit.' },
        { id: '2.2', title: 'Deploying your Front-end - Deep-dive part #1', description: 'This is part 1 of a 2-part learning unit, where you understand on deployment deeply.' },
        { id: '2.3', title: 'Deploying your Front-end - Deep-dive part #2', description: 'This is part 2 of a 2-part learning unit, where you understand on deployment deeply.' },
        { id: '2.4', title: 'Deploying your Front-end - Practice assignment #1', description: 'This is practice assignment #1 where you will be implementing front-end deployment.' },
        { id: '2.5', title: 'Deploying your Front-end - Practice assignment #2', description: 'This is practice assignment #2 where you will be implementing front-end deployment.' },
        { id: '2.6', title: 'Follow-along project milestone #17', description: 'This is the seventeenth milestone in our follow-along project series, conducted as a mentor-led live lesson. In this session, we will collaboratively begin working on a project, focusing on milestone #17.' },
        { id: '2.7', title: 'Follow-along project milestone #18', description: 'This is the eighteenth milestone in our follow-along project series, conducted as a mentor-led live lesson. In this session, we will collaboratively begin working on a project, focusing on milestone #18.' },
        { id: '2.8', title: 'Assignment | ASAP Project - Deploying Front-end', description: 'In this assignment, your task is to deploy the front-end of your application. This includes configuring the deployment settings, connecting to a hosting platform, and ensuring that the front-end is accessible online.' },
        { id: '2.9', title: 'Knowledge review # 6', description: 'This will be a self assessment, designed to help revise and consolidate the concepts covered in the module.' }
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
          <h1 className="text-2xl font-bold text-gray-800">FSWD Course</h1>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Full Stack Web Development</h2>
            <p className="text-gray-500 text-sm">Master the art of web development with our comprehensive curriculum.</p>
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
                  This comprehensive Full Stack Web Development (FSWD) course is designed to take you from a beginner to a job-ready developer. You will learn the core technologies of the web, including HTML, CSS, JavaScript, and React for the frontend, as well as Node.js, Express, and databases for the backend.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">What you'll learn</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                      <span>Modern Frontend Development with React & Vite</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                      <span>Backend API Development with Node.js & Express</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                      <span>Database Design and Management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                      <span>Authentication & Security Best Practices</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Prerequisites</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    No prior programming experience is strictly required, but a basic understanding of computer operations and logical thinking is helpful.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">Beginner Friendly</span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">Hands-on</span>
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
