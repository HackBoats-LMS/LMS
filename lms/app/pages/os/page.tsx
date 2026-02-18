'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import Sidebar from './components/Sidebar';
import CourseOverview from './components/CourseOverview';
import Unit1 from './units/Unit1';
import Unit2 from './units/Unit2';
import Unit3 from './units/Unit3';
import Unit4 from './units/Unit4';
import Unit5 from './units/Unit5';
import './styles.css';

function OperatingSystemsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const module = searchParams.get('module');
    setSelectedModule(module);
  }, [searchParams]);

  const handleModuleSelect = (unitId: number, moduleId: number) => {
    router.push(`/pages/os?module=${unitId}.${moduleId}`);
  };

  const handleBackToOverview = () => {
    router.push('/pages/os');
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
      case 3:
        return <Unit3 currentModule={moduleId} setCurrentModule={(m) => handleModuleSelect(3, m)} onBack={handleBackToOverview} />;
      case 4:
        return <Unit4 currentModule={moduleId} setCurrentModule={(m) => handleModuleSelect(4, m)} onBack={handleBackToOverview} />;
      case 5:
        return <Unit5 currentModule={moduleId} setCurrentModule={(m) => handleModuleSelect(5, m)} onBack={handleBackToOverview} />;
      default:
        return <div>Module not found</div>;
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

export default function OperatingSystemsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OperatingSystemsContent />
    </Suspense>
  );
}
