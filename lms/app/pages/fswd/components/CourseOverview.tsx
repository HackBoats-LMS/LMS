'use client';
import React, { useState, useEffect } from 'react';
import MainSidebar from '@/components/Sidebar';
import { useSession } from 'next-auth/react';

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
    <div className="flex">
      <div>
        <MainSidebar />
      </div>
      <div className="flex-1 bg-[#FAFAFA]" style={{ minHeight: '100vh', padding: '40px 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="lms-header">
            <div className="header-left">
              <svg className="megaphone-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="3" width="20" height="14" rx="2" stroke="#06B6D4" strokeWidth="2" />
                <path d="M2 7h20" stroke="#06B6D4" strokeWidth="2" />
              </svg>
              <h1 className="course-title">Full Stack Web Development</h1>
            </div>
            <div className="header-right">
              <div className="progress-bar-container">
                <div className="progress-segments">
                  {[...Array(20)].map((_, i) => {
                    const segmentThreshold = (i + 1) * 5;
                    return (
                      <div
                        key={i}
                        className={`segment ${completedPercentage >= segmentThreshold ? 'completed' :
                          masteryPercentage >= segmentThreshold ? 'mastery' : ''
                          }`}
                      ></div>
                    );
                  })}
                </div>
                <div className="progress-text">{completedPercentage}% Completed • {masteryPercentage}% Mastery</div>
              </div>
            </div>
          </div>

          <nav className="tab-navigation">
            <button className={`tab ${activeTab === 'learning-path' ? 'active' : ''}`} onClick={() => setActiveTab('learning-path')}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 3h12M2 8h12M2 13h12" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              Learning Path
            </button>
            <button className={`tab ${activeTab === 'sessions' ? 'active' : ''}`} onClick={() => setActiveTab('sessions')}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="3" y="3" width="10" height="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              Sessions
            </button>
            <button className={`tab ${activeTab === 'assessments' ? 'active' : ''}`} onClick={() => setActiveTab('assessments')}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Assessments
            </button>
            <button className={`tab ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              About
            </button>
            <button className="tab" onClick={() => window.location.href = '/pages/courses'} style={{ marginLeft: 'auto' }}>
              Go to Courses
            </button>
          </nav>

          <div className="timeline-content">
            {units.map((unit) => (
              <div key={unit.id} className="unit-block">
                <div className="unit-header-block" onClick={() => setExpandedUnit(expandedUnit === unit.id ? null : unit.id)}>
                  <div className="module-badge">
                    <div className="badge-label">Module</div>
                    <div className="badge-number">{unit.id}</div>
                  </div>
                  <div className="unit-description">
                    <h2 className="unit-title">{unit.title}</h2>
                    <p className="unit-desc">{unit.description}</p>
                  </div>
                  <div className="expand-indicator">{expandedUnit === unit.id ? '▼' : '▶'}</div>
                </div>

                {expandedUnit === unit.id && (
                  <div className="lessons-timeline">
                    {unit.modules.map((module, idx) => (
                      <div
                        key={module.id}
                        className="lesson-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          onModuleSelect(unit.id, idx + 1);
                        }}
                      >
                        <div className="lesson-badge">{module.id}</div>
                        <div className="lesson-content">
                          <h3 className="lesson-title">{module.title}</h3>
                          <p className="lesson-desc">{module.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
