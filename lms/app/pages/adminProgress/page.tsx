"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function AdminProgress() {
  const { data: session } = useSession();
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const courseStructure: any = {
    OS: {
      name: "Operating Systems",
      color: "#8B5CF6",
      units: [
        { id: 1, name: "Computer System & OS Overview", modules: ["Overview of Operating Systems", "OS Types and Generation", "OS Operations & Security", "System Calls & Structures", "Unit 1 Quiz"] },
        { id: 2, name: "Process Management", modules: ["Process Concepts", "Process Scheduling", "Scheduling Algorithms", "Multithreading & IPC", "Unit 2 Quiz"] },
        { id: 3, name: "Concurrency & Deadlock", modules: ["Concurrency Principles", "Process Synchronization", "Deadlock Principles", "Deadlock Handling", "Unit 3 Quiz"] },
        { id: 4, name: "Memory Management", modules: ["Memory Allocation", "Paging & Segmentation", "Virtual Memory", "Page Replacement", "Unit 4 Quiz"] },
        { id: 5, name: "File Systems & Storage", modules: ["File System Interface", "Directory Structure", "Mass Storage Structure", "Disk Scheduling", "Unit 5 Quiz"] }
      ]
    },
    FSWD: {
      name: "Full Stack Web Development",
      color: "#06B6D4",
      units: [
        { id: 1, name: "Setting up React with Vite", modules: ["Setting up React with Vite - Introduction", "Setting up React with Vite - Deep-dive #1", "Setting up React with Vite - Deep-dive #2", "Practice Assignment #1", "Practice Assignment #2", "Follow-along Milestone #15", "Follow-along Milestone #16", "ASAP Project - Setup", "Knowledge Review #5"] },
        { id: 2, name: "Deploying Frontend", modules: ["Deploying Frontend - Introduction", "Deploying Frontend - Deep-dive #1 (Vercel)", "Deploying Frontend - Deep-dive #2 (Netlify)", "Practice Assignment #1", "Practice Assignment #2", "Follow-along Milestone #17", "Follow-along Milestone #18", "ASAP Project - Deploy", "Knowledge Review #6"] }
      ]
    }
  };

  useEffect(() => {
    if (session === null) return;
    if (session && !session.user?.isAdmin) {
      router.push("/");
      return;
    }
    if (session) {
      fetchStudents();
    }
  }, [session]);

  const fetchStudents = async () => {
    const res = await fetch("/api/users/students");
    const data = await res.json();
    if (data.ok) {
      setStudents(data.data.filter((u: any) => !u.isAdmin));
    }
    setLoading(false);
  };

  const fetchProgress = async (email: string) => {
    setSelectedStudent(email);
    setSelectedSubject(null);
    const timestamp = new Date().getTime();
    console.log('Fetching progress for:', email);
    const res = await fetch(`/api/progress?userEmail=${email}&_t=${timestamp}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
    const data = await res.json();
    console.log('Progress data received:', data);
    console.log('Progress array:', data.data);
    if (data.data && data.data.length > 0) {
      console.log('Sample progress item:', data.data[0]);
      console.log('unitId type:', typeof data.data[0].unitId, 'value:', data.data[0].unitId);
      console.log('moduleId type:', typeof data.data[0].moduleId, 'value:', data.data[0].moduleId);
    }
    if (data.success) {
      setProgress(data.data);
    }
  };

  const isModuleCompleted = (subject: string, unitId: number, moduleId: number) => {
    const result = progress.some(
      (p) => p.subject === subject && Number(p.unitId) === unitId && Number(p.moduleId) === moduleId
    );
    return result;
  };

  const getModuleScore = (subject: string, unitId: number, moduleId: number) => {
    return progress.find(
      (p) => p.subject === subject && Number(p.unitId) === unitId && Number(p.moduleId) === moduleId
    );
  };

  const getSubjectProgress = (subject: string) => {
    const structure = courseStructure[subject];
    if (!structure) return { completed: 0, total: 0, percentage: 0 };

    let total = 0;
    let completed = 0;

    structure.units.forEach((unit: any) => {
      unit.modules.forEach((_: any, idx: number) => {
        total++;
        if (isModuleCompleted(subject, unit.id, idx + 1)) {
          completed++;
        }
      });
    });

    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full flex bg-white">
      <Sidebar />

      <div className="flex-1 bg-transparent pt-20 relative ml-16" style={{
        backgroundImage: 'radial-gradient(circle, #D8D8D8 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        backgroundColor: '#FFFFFF'
      }}>
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Progress Tracking</h1>
            <p className="text-gray-600">Monitor module completion across all subjects</p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3 bg-white rounded-lg border border-gray-200 p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Students</h2>
              <div className="space-y-2">
                {students.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => fetchProgress(student.email)}
                    className={`p-3 rounded-lg cursor-pointer transition ${selectedStudent === student.email
                      ? "bg-blue-50 border-2 border-blue-500"
                      : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                      }`}
                  >
                    <div className="font-semibold text-gray-800 text-sm">{student.fullName || "No Name"}</div>
                    <div className="text-xs text-gray-600">{student.email}</div>
                    <div className="text-xs text-gray-500 mt-1">Sem {student.currentSemester}</div>
                  </div>
                ))}
              </div>
            </div>

            {!selectedStudent ? (
              <div className="col-span-9 bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <p className="text-lg">Select a student to view progress</p>
                </div>
              </div>
            ) : !selectedSubject ? (
              <div className="col-span-9 bg-white rounded-lg border border-gray-200 p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    {students.find(s => s.email === selectedStudent)?.fullName}'s Progress
                  </h2>
                  <button
                    onClick={() => fetchProgress(selectedStudent!)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    title="Refresh progress"
                  >
                    ↻ Refresh
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(courseStructure).map(([code, subject]: [string, any]) => {
                    const prog = getSubjectProgress(code);
                    return (
                      <div
                        key={code}
                        onClick={() => setSelectedSubject(code)}
                        className="border-2 rounded-lg p-5 cursor-pointer hover:shadow-lg transition"
                        style={{ borderColor: subject.color }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
                            <h3 className="font-bold text-gray-800">{subject.name}</h3>
                          </div>
                          <div className="text-2xl font-bold" style={{ color: subject.color }}>
                            {prog.percentage}%
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {prog.completed} of {prog.total} modules completed
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{ width: `${prog.percentage}%`, backgroundColor: subject.color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="col-span-9 bg-white rounded-lg border border-gray-200 p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedSubject(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      ← Back
                    </button>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: courseStructure[selectedSubject].color }} />
                    <h2 className="text-xl font-bold text-gray-800">{courseStructure[selectedSubject].name}</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => fetchProgress(selectedStudent!)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      title="Refresh progress"
                    >
                      ↻ Refresh
                    </button>
                    <div className="text-2xl font-bold" style={{ color: courseStructure[selectedSubject].color }}>
                      {getSubjectProgress(selectedSubject).percentage}%
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {courseStructure[selectedSubject].units.map((unit: any) => (
                    <div key={unit.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Unit {unit.id}: {unit.name}
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {unit.modules.map((moduleName: string, idx: number) => {
                          const moduleId = idx + 1;
                          const completed = isModuleCompleted(selectedSubject, unit.id, moduleId);
                          const score = getModuleScore(selectedSubject, unit.id, moduleId);

                          return (
                            <div
                              key={moduleId}
                              className={`flex items-center justify-between p-3 rounded-lg border-2 ${completed ? "bg-green-50 border-green-300" : "bg-gray-50 border-gray-200"
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${completed ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                                  }`}>
                                  {completed ? "✓" : moduleId}
                                </div>
                                <span className="text-sm font-medium text-gray-800">
                                  {unit.id}.{moduleId} - {moduleName}
                                </span>
                              </div>
                              {completed && score && (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold" style={{ color: courseStructure[selectedSubject].color }}>
                                    {score.percentage}%
                                  </span>
                                  <span className="text-xs text-gray-600">
                                    ({score.score}/{score.totalQuestions})
                                  </span>
                                </div>
                              )}
                              {!completed && (
                                <span className="text-xs text-gray-500">Not attempted</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
