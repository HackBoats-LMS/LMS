'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MainSidebar from '@/components/Sidebar';
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
    <div className="flex">
      <div className="os-container flex-1">
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
      
      <main className={`os-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {renderContent()}
      </main>
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
