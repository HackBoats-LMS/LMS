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
  const masteryModules = studentProgress.filter(p => p.percentage >= 80).length;
  const totalModules = 25;
  const completedPercentage = Math.round((completedModules / totalModules) * 100);
  const masteryPercentage = Math.round((masteryModules / totalModules) * 100);

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
    <div className="flex">
      <div className="fixed left-0 top-0 h-screen overflow-hidden">
        <MainSidebar />
      </div>
      <div className="flex-1">
        <div className="lms-dashboard">
          <div className="lms-container">
            <div className="lms-header">
              <div className="header-left">
                <svg className="megaphone-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="#E63946" strokeWidth="2" fill="none" />
                </svg>
                <h1 className="course-title">Operating Systems</h1>
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
    </div>
  );
};

export default CourseOverview;
