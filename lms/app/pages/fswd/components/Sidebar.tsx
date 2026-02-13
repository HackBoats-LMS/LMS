'use client';
import React from 'react';
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
      title: 'Setting up React with Vite',
      modules: [
        'An introduction',
        'Deep-dive part #1',
        'Deep-dive part #2',
        'Practice assignment #1',
        'Practice assignment #2',
        'Follow-along milestone #15',
        'Follow-along milestone #16',
        'ASAP Project - Setup',
        'Knowledge review #5'
      ]
    },
    {
      id: 2,
      title: 'Deploying Frontend',
      modules: [
        'An introduction',
        'Deep-dive part #1',
        'Deep-dive part #2',
        'Practice assignment #1',
        'Practice assignment #2',
        'Follow-along milestone #17',
        'Follow-along milestone #18',
        'ASAP Project - Deploy',
        'Knowledge review #6'
      ]
    }
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>

        <Link href="/pages/courses" className="back-to-livebooks">
          ← Back to Courses
        </Link>

        <div className="sidebar-header">
          <h2>Full Stack Web Development</h2>
        </div>

        <nav className="sidebar-nav">
          {units.map((unit) => (
            <div key={unit.id} className="unit-section">
              <button className="unit-button">{unit.title}</button>
              <ul className="module-list">
                {unit.modules.map((module, idx) => {
                  const moduleKey = `${unit.id}.${idx + 1}`;
                  return (
                    <li key={moduleKey}>
                      <button
                        className={`module-button ${selectedModule === moduleKey ? 'active' : ''}`}
                        onClick={() => onModuleSelect(unit.id, idx + 1)}
                      >
                        {unit.id}.{idx + 1} {module}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
