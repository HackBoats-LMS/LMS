'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import Sidebar from './components/Sidebar';
import CourseOverview from './components/CourseOverview';
import Unit1 from './units/Unit1';
import Unit2 from './units/Unit2';
import './styles.css';

function FSWDContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const module = searchParams.get('module');
    setSelectedModule(module);
  }, [searchParams]);

  const handleModuleSelect = (unitId: number, moduleId: number) => {
    router.push(`/pages/fswd?module=${unitId}.${moduleId}`);
  };

  const handleBackToOverview = () => {
    router.push('/pages/fswd');
  };

  const renderContent = () => {
    if (!selectedModule) {
      return <CourseOverview onModuleSelect={handleModuleSelect} />;
    }

    const [unitId, moduleId] = selectedModule.split('.').map(Number);

    switch (unitId) {
      case 1:
        return <Unit1 currentModule={moduleId} setCurrentModule={(m) => handleModuleSelect(1, m)} onBack={handleBackToOverview} />;
      case 2:
        return <Unit2 currentModule={moduleId} setCurrentModule={(m) => handleModuleSelect(2, m)} onBack={handleBackToOverview} />;
      default:
        return <CourseOverview onModuleSelect={handleModuleSelect} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar activePage="courses" />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="os-container flex-1 flex h-full overflow-hidden">
          {selectedModule && (
            <>
              <button
                className={`burger-menu ${isSidebarOpen ? 'hidden' : ''}`}
                onClick={() => setIsSidebarOpen(true)}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <Sidebar
                selectedModule={selectedModule}
                onModuleSelect={handleModuleSelect}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
              />
            </>
          )}

          <main className={`os-content ${isSidebarOpen ? 'sidebar-open' : ''} flex-1 overflow-y-auto`}>
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default function FSWDPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FSWDContent />
    </Suspense>
  );
}
