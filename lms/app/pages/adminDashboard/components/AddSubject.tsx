"use client";

import React, { useState, useEffect } from 'react';
import {
    Plus, Trash2, ArrowLeft, BookOpen, Film, MapPin, AlignLeft,
    Edit2, CheckCircle2, HelpCircle, Palette, Hash
} from 'lucide-react';
import CourseBanner from '@/components/CourseBanner';

// --- Types ---

interface Question {
    question: string;
    options: string[]; // 5 options
    correctAnswer: number; // 0-4
}

interface Quiz {
    title: string;
    questions: Question[];
}

interface ModuleData {
    name: string;
    videoId: string;
    place: string;
    description: string;
    quiz?: Quiz | null;
}

interface SubjectData {
    _id?: string;
    name: string;
    description?: string;
    template: string;
    bannerColor?: string;
    hashtags?: string[];
    modules: ModuleData[];
}

// --- Components ---

const QuizEditor = ({
    moduleName,
    initialQuiz,
    onSave,
    onCancel
}: {
    moduleName: string;
    initialQuiz: Quiz | null | undefined;
    onSave: (quiz: Quiz) => void;
    onCancel: () => void;
}) => {
    const [title, setTitle] = useState(initialQuiz?.title || `Quiz for ${moduleName}`);
    const [questions, setQuestions] = useState<Question[]>(initialQuiz?.questions || []);

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                question: '',
                options: ['', '', '', '', ''],
                correctAnswer: 0
            }
        ]);
    };

    const updateQuestion = (index: number, field: keyof Question, value: any) => {
        const newQuestions = [...questions];
        newQuestions[index] = { ...newQuestions[index], [field]: value };
        setQuestions(newQuestions);
    };

    const updateOption = (qIndex: number, oIndex: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    const removeQuestion = (index: number) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const handleSave = () => {
        if (!title.trim()) {
            alert("Quiz title is required");
            return;
        }
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].question.trim()) {
                alert(`Question ${i + 1} cannot be empty`);
                return;
            }
            if (questions[i].options.some(o => !o.trim())) {
                alert(`All 5 options for Question ${i + 1} are required`);
                return;
            }
        }
        onSave({ title, questions });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Edit Quiz</h3>
                        <p className="text-sm text-gray-500">Module: {moduleName}</p>
                    </div>
                    <button onClick={onCancel} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <Plus className="w-5 h-5 text-gray-500 rotate-45" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Quiz Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            placeholder="e.g. Chapter 1 Assessment"
                        />
                    </div>

                    <div className="space-y-6">
                        {questions.map((q, qIndex) => (
                            <div key={qIndex} className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative group">
                                <button
                                    onClick={() => removeQuestion(qIndex)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <span className="absolute -top-3 left-4 bg-white px-2 py-0.5 text-xs font-bold text-gray-500 border border-gray-200 rounded-full">
                                    Q{qIndex + 1}
                                </span>
                                <div className="space-y-4 pt-2">
                                    <div className="space-y-1">
                                        <textarea
                                            value={q.question}
                                            onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-blue-500 bg-white"
                                            rows={2}
                                            placeholder="Enter your question here..."
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        {q.options.map((opt, oIndex) => (
                                            <div key={oIndex} className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name={`correct-${qIndex}`}
                                                    checked={q.correctAnswer === oIndex}
                                                    onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                />
                                                <input
                                                    type="text"
                                                    value={opt}
                                                    onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                                    className={`flex-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:border-blue-500 ${q.correctAnswer === oIndex ? 'bg-green-50 border-green-200 text-green-700 font-medium' : 'bg-white border-gray-200'}`}
                                                    placeholder={`Option ${oIndex + 1}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={addQuestion}
                            className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            Add Question
                        </button>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button onClick={onCancel} className="px-5 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-200 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-5 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all">
                        Save Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function SubjectManager({ onBack }: { onBack: () => void }) {
    const [view, setView] = useState<'list' | 'form'>('list');
    const [subjects, setSubjects] = useState<SubjectData[]>([]);
    const [loading, setLoading] = useState(false);

    // Form State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [subjectDescription, setSubjectDescription] = useState('');
    const [template, setTemplate] = useState('');
    const [bannerColor, setBannerColor] = useState('blue');
    const [hashtagInput, setHashtagInput] = useState('');
    const [hashtags, setHashtags] = useState<string[]>([]);
    const [modules, setModules] = useState<ModuleData[]>([]);

    // Quiz Editor State
    const [quizModalOpen, setQuizModalOpen] = useState(false);
    const [currentModuleIndex, setCurrentModuleIndex] = useState<number | null>(null);

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/subjects?t=${Date.now()}`, { cache: 'no-store' });
            const data = await res.json();
            if (data.success) {
                setSubjects(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch subjects", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNew = () => {
        setEditingId(null);
        setName('');
        setSubjectDescription('');
        setTemplate('');
        setBannerColor('blue');
        setHashtags([]);
        setHashtagInput('');
        setModules([{ name: '', videoId: '', place: '1', description: '', quiz: null }]);
        setView('form');
    };

    const handleEdit = (subject: SubjectData) => {
        setEditingId(subject._id || null);
        setName(subject.name);
        setSubjectDescription(subject.description || '');
        setTemplate(subject.template || '');
        setBannerColor(subject.bannerColor || 'blue');
        setHashtags(subject.hashtags || []);
        setHashtagInput('');
        setModules(subject.modules || []);
        setView('form');
    };

    const handleDeleteSubject = async (id: string) => {
        if (!confirm("Are you sure you want to delete this subject?")) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/subjects?id=${id}`, { method: 'DELETE' });
            const result = await res.json();
            if (result.success) {
                if (typeof window !== 'undefined') localStorage.removeItem('lms_subjects');
                alert("Deleted successfully");
                setView('list');
                fetchSubjects();
            }
        } catch (error) {
            console.error("Error", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSubject = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            name,
            description: subjectDescription.trim(),
            template,
            bannerColor,
            hashtags,
            modules,
            ...(editingId && { _id: editingId })
        };

        try {
            const method = editingId ? 'PUT' : 'POST';
            const res = await fetch('/api/subjects', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            if (result.success) {
                if (typeof window !== 'undefined') localStorage.removeItem('lms_subjects');
                alert("Saved successfully!");
                setView('list');
                fetchSubjects();
            } else {
                alert(result.error || "Operation failed");
            }
        } catch (error) {
            alert("Error saving subject");
        } finally {
            setLoading(false);
        }
    };

    const addHashtag = () => {
        if (hashtagInput.trim() && hashtags.length < 2) {
            setHashtags([...hashtags, hashtagInput.trim().replace(/^#/, '')]);
            setHashtagInput('');
        }
    };

    const removeHashtag = (idx: number) => {
        setHashtags(hashtags.filter((_, i) => i !== idx));
    };

    const addModule = () => {
        const nextPlace = modules.length > 0 ? (Math.max(...modules.map(m => parseInt(m.place, 10)).filter(n => !isNaN(n))) + 1).toString() : '1';
        setModules([...modules, { name: '', videoId: '', place: nextPlace, description: '', quiz: null }]);
    };

    const removeModule = (index: number) => {
        const newModules = [...modules];
        newModules.splice(index, 1);
        setModules(newModules);
    };

    const updateModule = (index: number, field: keyof ModuleData, value: any) => {
        const newModules = [...modules];
        newModules[index] = { ...newModules[index], [field]: value };
        setModules(newModules);
    };

    const openQuizEditor = (index: number) => {
        setCurrentModuleIndex(index);
        setQuizModalOpen(true);
    };

    const saveQuiz = (quiz: Quiz) => {
        if (currentModuleIndex !== null) {
            updateModule(currentModuleIndex, 'quiz', quiz);
            setQuizModalOpen(false);
            setCurrentModuleIndex(null);
        }
    };

    if (view === 'list') {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[500px]">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
                            <ArrowLeft className="w-5 h-5 text-gray-500" />
                        </button>
                        <h2 className="text-xl font-bold text-gray-800">Manage Subjects</h2>
                    </div>
                    <button onClick={handleAddNew} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold">
                        <Plus className="w-4 h-4" /> New Subject
                    </button>
                </div>
                {loading ? <div className="text-center py-20 text-gray-400">Loading...</div> : (
                    <div className="grid gap-4">
                        {subjects.map((s) => (
                            <div key={s._id} className="p-5 border border-gray-100 rounded-xl bg-gray-50 flex justify-between items-center group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{s.name}</h3>
                                        <p className="text-sm text-gray-500">{s.modules.length} Modules • {s.template}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleEdit(s)} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:text-blue-600 transition-colors">Edit</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[500px]">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => setView('list')} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft className="w-5 h-5 text-gray-500" /></button>
                    <h2 className="text-xl font-bold text-gray-800">{editingId ? 'Edit Subject' : 'New Subject'}</h2>
                </div>
            </div>

            <form onSubmit={handleSaveSubject} className="space-y-8 max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Template</label>
                        <input type="text" value={template} onChange={(e) => setTemplate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-bold text-gray-700">Description</label>
                        <textarea value={subjectDescription} onChange={(e) => setSubjectDescription(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" rows={2} />
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
                            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 uppercase"><Palette className="w-4 h-4" /> Colors</h3>
                            <div className="flex flex-wrap gap-2">
                                {['blue', 'indigo', 'emerald', 'amber', 'rose'].map((c) => (
                                    <button key={c} type="button" onClick={() => setBannerColor(c)} className={`w-10 h-10 rounded-full border-2 ${bannerColor === c ? 'border-blue-600 ring-2 ring-blue-100' : 'border-transparent'} ${c === 'blue' ? 'bg-[#A5D8E5]' : ''} ${c === 'indigo' ? 'bg-[#C3C8F3]' : ''} ${c === 'emerald' ? 'bg-[#B2EBC9]' : ''} ${c === 'amber' ? 'bg-[#FEE2B3]' : ''} ${c === 'rose' ? 'bg-[#FBC8D1]' : ''}`} />
                                ))}
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 uppercase"><Hash className="w-4 h-4" /> Hashtags (Max 2)</h3>
                                <div className="flex gap-2">
                                    <input type="text" value={hashtagInput} onChange={(e) => setHashtagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHashtag())} placeholder="Add tag..." disabled={hashtags.length >= 2} className="flex-1 px-3 py-1.5 rounded-lg border text-sm disabled:opacity-50" />
                                    <button type="button" onClick={addHashtag} disabled={hashtags.length >= 2} className="p-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"><Plus className="w-4 h-4" /></button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {hashtags.map((h, i) => (
                                        <span key={i} className="flex items-center gap-1 px-2 py-1 bg-white border rounded-full text-xs font-medium">#{h} <button type="button" onClick={() => removeHashtag(i)}><Plus className="w-3 h-3 rotate-45" /></button></span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-7 space-y-3">
                        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
                            <CourseBanner title={name || "Subject Title"} description={subjectDescription || "Description..."} bannerColor={bannerColor} hashtags={hashtags} />
                        </div>
                    </div>
                </div>

                <div className="border-t pt-8 space-y-6">
                    <div className="flex justify-between items-center"><h3 className="text-lg font-bold">Modules</h3><button type="button" onClick={addModule} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm">+ Add Module</button></div>
                    {modules.map((m, i) => (
                        <div key={i} className="p-6 bg-white rounded-xl border relative shadow-sm hover:shadow-md transition-shadow">
                            <button type="button" onClick={() => removeModule(i)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                            <div className="grid md:grid-cols-12 gap-6">
                                <div className="md:col-span-8 space-y-4">
                                    <input type="text" value={m.name} onChange={(e) => updateModule(i, 'name', e.target.value)} placeholder="Module Name" className="w-full px-3 py-2 border rounded-lg text-sm" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" value={m.videoId} onChange={(e) => updateModule(i, 'videoId', e.target.value)} placeholder="Video ID" className="px-3 py-2 border rounded-lg text-sm" />
                                        <input type="text" value={m.place} onChange={(e) => updateModule(i, 'place', e.target.value)} placeholder="Order" className="px-3 py-2 border rounded-lg text-sm" />
                                    </div>
                                </div>
                                <div className="md:col-span-4 flex flex-col justify-center items-center border-l pl-6">
                                    <span className={`text-xs font-bold mb-2 ${m.quiz ? 'text-green-600' : 'text-gray-400'}`}>{m.quiz ? '✓ Quiz Added' : 'No Quiz'}</span>
                                    <button type="button" onClick={() => openQuizEditor(i)} className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">{m.quiz ? 'Edit Quiz' : 'Add Quiz'}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="sticky bottom-0 bg-white border-t pt-6 pb-2 mt-8 flex justify-end gap-3 z-10">
                    {editingId && <button type="button" onClick={() => handleDeleteSubject(editingId)} className="px-6 py-3 bg-red-500 text-white rounded-xl font-medium">Delete</button>}
                    <button type="button" onClick={() => setView('list')} className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl">Cancel</button>
                    <button type="submit" disabled={loading} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold">{loading ? 'Saving...' : 'Save Subject'}</button>
                </div>
            </form>
        </div>
    );
}
