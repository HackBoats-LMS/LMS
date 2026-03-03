"use client";

import React, { useState, useEffect } from 'react';
import {
    Plus, Trash2, Save, ArrowLeft, BookOpen, Film, MapPin, AlignLeft,
    Edit2, MoreVertical, X, CheckCircle2, HelpCircle
} from 'lucide-react';

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
        // Basic validation
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
                        <X className="w-5 h-5 text-gray-500" />
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
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Question Text</label>
                                        <textarea
                                            value={q.question}
                                            onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-blue-500 bg-white"
                                            rows={2}
                                            placeholder="Enter your question here..."
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                            Options <span className="font-normal text-gray-400">(Select the radio button for the correct answer)</span>
                                        </label>
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
                    <button
                        onClick={onCancel}
                        className="px-5 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-5 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                    >
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
        setModules([{ name: '', videoId: '', place: '1', description: '', quiz: null }]);
        setView('form');
    };

    const handleEdit = (subject: SubjectData) => {
        setEditingId(subject._id || null);
        setName(subject.name);
        setSubjectDescription(subject.description || '');
        setTemplate(subject.template || '');
        setModules(subject.modules || []);
        setView('form');
    };

    const handleDeleteSubject = async (id: string) => {
        if (!confirm("Are you sure you want to delete this subject? This action cannot be undone.")) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/subjects?id=${id}`, { method: 'DELETE' });
            const result = await res.json();
            if (result.success) {
                alert("Subject deleted successfully");
                setView('list');
                fetchSubjects();
            } else {
                alert(result.error || "Failed to delete subject");
            }
        } catch (error) {
            console.error("Error deleting subject", error);
            alert("Error deleting subject");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSubject = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation: Check if every module has a quiz
        const modulesWithoutQuiz = modules.filter(m => !m.quiz || m.quiz.questions.length === 0);
        if (modulesWithoutQuiz.length > 0) {
            const moduleNames = modulesWithoutQuiz.map(m => m.name || 'Untitled Module').join(', ');
            alert(`The following modules do not have a quiz: ${moduleNames}. \nEvery module must have a quiz before saving.`);
            return;
        }

        // Validation: Unique Place/Order
        const places = modules.map(m => m.place.trim());
        const uniquePlaces = new Set(places);
        if (uniquePlaces.size !== places.length) {
            alert("Duplicate 'Place / Order' values found. Please ensure each module has a unique order number.");
            return;
        }

        setLoading(true);

        const payload = {
            name,
            description: subjectDescription,
            template,
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
                alert(`Subject ${editingId ? 'updated' : 'created'} successfully!`);
                setView('list');
                fetchSubjects();
            } else {
                alert(result.error || "Operation failed");
            }
        } catch (error) {
            console.error("Error saving subject", error);
            alert("Failed to save subject");
        } finally {
            setLoading(false);
        }
    };

    // Module Management
    const addModule = () => {
        let nextPlace = 1;
        // Find the highest existing place number
        const existingNumbers = modules
            .map(m => parseInt(m.place, 10))
            .filter(n => !isNaN(n));

        if (existingNumbers.length > 0) {
            nextPlace = Math.max(...existingNumbers) + 1;
        }

        setModules([...modules, { name: '', videoId: '', place: nextPlace.toString(), description: '', quiz: null }]);
    };

    const removeModule = (index: number) => {
        const newModules = [...modules];
        newModules.splice(index, 1);
        setModules(newModules);
    };

    const updateModule = (index: number, field: keyof ModuleData, value: any) => {
        const newModules = [...modules];

        // If changing place, we allow typing anything, but validation will catch duplicates on save.
        // Or we could strictly enforce input, but that's bad UX while deleting/retyping.

        newModules[index] = { ...newModules[index], [field]: value };
        setModules(newModules);
    };

    // Quiz Management
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
                        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-500" />
                        </button>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Manage Subjects</h2>
                            <p className="text-sm text-gray-500">View and edit courses and modules</p>
                        </div>
                    </div>
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition order-2 shadow-lg shadow-blue-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        New Subject
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20 text-gray-400">Loading subjects...</div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {subjects.map((subject) => (
                            <div key={subject._id} className="p-5 border border-gray-100 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all flex justify-between items-center group">
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className="w-12 h-12 flex-shrink-0 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-800 truncate">{subject.name}</h3>
                                        <p className="text-sm text-gray-500">{subject.modules.length} Modules • {subject.template || 'No Template'}</p>
                                        {subject.description && (
                                            <p className="text-xs text-gray-400 mt-1 line-clamp-1 italic">{subject.description}</p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleEdit(subject)}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm"
                                >
                                    Edit Subject
                                </button>
                            </div>
                        ))}
                        {subjects.length === 0 && (
                            <div className="text-center py-20 text-gray-400 rounded-xl border-2 border-dashed border-gray-100">
                                No subjects found. Create your first one!
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => setView('list')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{editingId ? 'Edit Subject' : 'New Subject'}</h2>
                        <p className="text-sm text-gray-500">{editingId ? 'Update content, modules and quizzes' : 'Create a new course structure'}</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSaveSubject} className="space-y-8 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Subject Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Advanced React Patterns"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Template / Category</label>
                        <input
                            type="text"
                            value={template}
                            onChange={(e) => setTemplate(e.target.value)}
                            placeholder="e.g. FSWD"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-gray-700">Subject Description (About Course)</label>
                        <textarea
                            value={subjectDescription}
                            onChange={(e) => setSubjectDescription(e.target.value)}
                            placeholder="Write a brief overview of the whole subject..."
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white resize-none"
                            rows={3}
                        />
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-gray-400" />
                            Modules
                        </h3>
                        <button
                            type="button"
                            onClick={addModule}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Module
                        </button>
                    </div>

                    <div className="space-y-6">
                        {modules.map((module, index) => (
                            <div key={index} className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-shadow">
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => removeModule(index)}
                                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Remove Module"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                    {/* Left: Input Fields */}
                                    <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Module Name</label>
                                            <input
                                                type="text"
                                                value={module.name}
                                                onChange={(e) => updateModule(index, 'name', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-blue-500"
                                                placeholder="e.g. Introduction to Hooks"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block flex items-center gap-1"><Film className="w-3 h-3" /> Video ID</label>
                                            <input
                                                type="text"
                                                value={module.videoId}
                                                onChange={(e) => updateModule(index, 'videoId', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-blue-500"
                                                placeholder="YouTube ID"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block flex items-center gap-1"><MapPin className="w-3 h-3" /> Place / Order</label>
                                            <input
                                                type="text"
                                                value={module.place}
                                                onChange={(e) => updateModule(index, 'place', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-blue-500"
                                                placeholder="1.1"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block flex items-center gap-1"><AlignLeft className="w-3 h-3" /> Description</label>
                                            <textarea
                                                value={module.description}
                                                onChange={(e) => updateModule(index, 'description', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-blue-500 resize-none"
                                                rows={2}
                                                placeholder="Brief description of the content..."
                                            />
                                        </div>
                                    </div>

                                    {/* Right: Quiz & Actions */}
                                    <div className="md:col-span-4 flex flex-col justify-center items-center border-l border-gray-100 pl-6">
                                        <div className="text-center w-full">
                                            <div className="mb-3">
                                                {module.quiz ? (
                                                    <div className="flex flex-col items-center">
                                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold mb-2 flex items-center gap-1">
                                                            <CheckCircle2 className="w-3 h-3" /> Quiz Added
                                                        </span>
                                                        <p className="text-xs text-gray-500">{module.quiz.questions.length} Questions</p>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center text-gray-400 mb-2">
                                                        <HelpCircle className="w-8 h-8 mb-1 opacity-20" />
                                                        <span className="text-xs font-medium">No Quiz</span>
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => openQuizEditor(index)}
                                                className={`w-full py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${module.quiz ? 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                                            >
                                                {module.quiz ? <><Edit2 className="w-3.5 h-3.5" /> Edit Quiz</> : <><Plus className="w-3.5 h-3.5" /> Add Quiz</>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sticky bottom-0 bg-white border-t border-gray-100 pt-6 pb-2 mt-8 flex justify-end gap-3 z-10">
                    <div className="flex gap-3">
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => handleDeleteSubject(editingId)}
                                disabled={loading}
                                className="px-6 py-3 rounded-xl font-medium text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all flex items-center gap-2"
                            >
                                <Trash2 className="w-5 h-5" />
                                Delete Subject
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => setView('list')}
                            className="px-6 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white shadow-lg shadow-blue-500/30 transition-all
                                ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:translate-y-[-1px]'}
                            `}
                        >
                            {loading ? 'Saving...' : 'Save Subject'}
                        </button>
                    </div>
                </div>
            </form>

            {quizModalOpen && currentModuleIndex !== null && (
                <QuizEditor
                    moduleName={modules[currentModuleIndex].name || `Module ${currentModuleIndex + 1}`}
                    initialQuiz={modules[currentModuleIndex].quiz}
                    onSave={saveQuiz}
                    onCancel={() => setQuizModalOpen(false)}
                />
            )}
        </div>
    );
}
