'use client';
import React, { useState } from 'react';
import Link from 'next/link';

interface SidebarProps {
  selectedModule: string;
  onModuleSelect: (unitId: number, moduleId: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedModule, onModuleSelect, isOpen, onClose }) => {
  const units = [
    {
      id: 1,
      title: 'Unit 1: Computer System & OS Overview',
      modules: [
        'Overview of Operating Systems',
        'OS Types and Generation',
        'OS Operations & Security',
        'System Calls & Structures',
        'Unit 1 Quiz'
      ]
    },
    {
      id: 2,
      title: 'Unit 2: Process Management',
      modules: [
        'Process Concepts',
        'Process Scheduling',
        'Scheduling Algorithms',
        'Multithreading & IPC',
        'Unit 2 Quiz'
      ]
    },
    {
      id: 3,
      title: 'Unit 3: Concurrency & Deadlock',
      modules: [
        'Concurrency Principles',
        'Process Synchronization',
        'Deadlock Principles',
        'Deadlock Handling',
        'Unit 3 Quiz'
      ]
    },
    {
      id: 4,
      title: 'Unit 4: Memory Management',
      modules: [
        'Memory Allocation',
        'Paging & Segmentation',
        'Virtual Memory',
        'Page Replacement',
        'Unit 4 Quiz'
      ]
    },
    {
      id: 5,
      title: 'Unit 5: File Systems & Storage',
      modules: [
        'File System Interface',
        'Directory Structure',
        'Mass Storage Structure',
        'Disk Scheduling',
        'Unit 5 Quiz'
      ]
    }
  ];

  const [expandedUnit, setExpandedUnit] = useState<number | null>(
    selectedModule ? parseInt(selectedModule.split('.')[0]) : null
  );

  const [currentUnit] = selectedModule.split('.').map(Number);
  const [, currentModule] = selectedModule.split('.').map(Number);

  const handleUnitClick = (unitId: number) => {
    setExpandedUnit(expandedUnit === unitId ? null : unitId);
  };

  const handleModuleClick = (unitId: number, moduleIndex: number) => {
    onModuleSelect(unitId, moduleIndex);
    onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <Link href="/pages/courses" className="back-to-livebooks">
          ← Back to Courses
        </Link>
        <div className="sidebar-header">
          <h2>Operating Systems</h2>
        </div>
        <nav className="sidebar-nav">
          {units.map((unit) => (
            <div key={unit.id} className="unit-section">
              <button
                className={`unit-button ${currentUnit === unit.id ? 'active' : ''}`}
                onClick={() => handleUnitClick(unit.id)}
              >
                {unit.title}
              </button>
              {expandedUnit === unit.id && (
                <ul className="module-list">
                  {unit.modules.map((module, index) => (
                    <li key={index}>
                      <button
                        className={`module-button ${currentModule === index + 1 ? 'active' : ''}`}
                        onClick={() => handleModuleClick(unit.id, index + 1)}
                      >
                        {module}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
