"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import supabase from "@/lib/db";
import {
    Plus,
    X,
    Calendar,
    Megaphone,
    Link as LinkIcon,
    Image as ImageIcon,
    Trash2,
    ExternalLink
} from "lucide-react";
import Link from "next/link";

// Define the Event interface since we don't have it globally yet
interface EventItem {
    id: string; // or number depending on DB
    title: string;
    description: string;
    type: 'event' | 'announcement';
    date?: string;
    link?: string;
    image_url?: string;
    created_at?: string;
}

const EventsPage = () => {
    const { data: session } = useSession();
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "announcement", // default
        date: "",
        link: "",
        image_url: ""
    });

    const isAdmin = session?.user?.isAdmin === true;

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching events:", error.message, error.details, error.hint, error);
            } else {
                setEvents(data || []);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.description) return;

        try {
            const { error } = await supabase
                .from('events')
                .insert([
                    {
                        title: formData.title,
                        description: formData.description,
                        type: formData.type,
                        date: formData.date || null,
                        link: formData.link || null,
                        image_url: formData.image_url || null,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (error) throw error;

            // Reset and refresh
            setFormData({
                title: "",
                description: "",
                type: "announcement",
                date: "",
                link: "",
                image_url: ""
            });
            setIsModalOpen(false);
            fetchEvents();

        } catch (err: any) {
            console.error("Error adding event:", err.message || err);
            alert(`Failed to add event: ${err.message || 'Unknown error'}`);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        try {
            const { error } = await supabase
                .from('events')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchEvents();
        } catch (err) {
            console.error("Error deleting event:", err);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="fixed left-0 top-0 h-screen overflow-hidden z-50 w-16">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-transparent relative ml-16 overflow-hidden" style={{
                backgroundImage: 'radial-gradient(circle, #D8D8D8 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                backgroundColor: '#FFFFFF'
            }}>

                {/* Header */}
                <header className="bg-white h-20 flex items-center justify-between px-8 border-b relative z-10" style={{ borderColor: '#EFEFEF' }}>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <div className="w-9 h-7 rounded border-2 border-gray-400 bg-white flex items-center justify-center">
                                <Megaphone width="16" height="16" className="text-blue-500" />
                            </div>
                            <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gray-300 rounded-b"></div>
                        </div>
                        <span className="font-bold text-2xl" style={{ color: '#1F2933' }}>Noticeboard</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search can go here if needed, keeping it simple for now as requested */}
                        {isAdmin && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all font-medium text-sm"
                            >
                                <Plus size={16} />
                                Add New
                            </button>
                        )}
                    </div>
                </header>

                {/* Content Scroll Area */}
                <div className="flex flex-1 overflow-hidden h-[calc(100vh-5rem)]">
                    <main className="flex-1 p-8 bg-transparent relative overflow-y-auto">

                        {loading ? (
                            <div className="flex items-center justify-center h-full text-gray-400">Loading events...</div>
                        ) : events.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                                <Megaphone size={48} className="mb-4 opacity-20" />
                                <p>No announcements or events yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 pb-20">
                                {events.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group bg-white rounded-xl p-0 overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-[0px_12px_28px_rgba(0,0,0,0.1)] flex flex-col"
                                        style={{ boxShadow: "0px 6px 18px rgba(0,0,0,0.04)" }}
                                    >
                                        {/* Image Header if exists */}
                                        {item.image_url && (
                                            <div className="h-40 w-full bg-gray-100 relative overflow-hidden">
                                                <img
                                                    src={item.image_url}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Event+Image';
                                                    }}
                                                />
                                            </div>
                                        )}

                                        <div className="p-5 flex flex-col flex-1">
                                            {/* Batch / Date / Delete Row */}
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex gap-2">
                                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${item.type === 'event' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {item.type}
                                                    </span>
                                                    {item.date && (
                                                        <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
                                                            <Calendar size={12} />
                                                            {new Date(item.date).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                                {isAdmin && (
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </div>

                                            <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight">
                                                {item.title}
                                            </h3>

                                            <p className="text-sm text-gray-500 mb-4 flex-1 line-clamp-4 leading-relaxed">
                                                {item.description}
                                            </p>

                                            {item.link && (
                                                <div className="pt-4 mt-auto border-t border-gray-100">
                                                    <a
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                                                    >
                                                        <LinkIcon size={14} />
                                                        View Details <ExternalLink size={12} />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Admin Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-800">New Announcement</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                    Title
                                </label>
                                <input
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                    placeholder="e.g. Annual Tech Symposium"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                        Type
                                    </label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none"
                                    >
                                        <option value="announcement">Announcement</option>
                                        <option value="event">Event</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                        Date (Optional)
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-gray-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
                                    placeholder="What's happening?"
                                />
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="relative group">
                                    <LinkIcon className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                                    <input
                                        name="link"
                                        value={formData.link}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm placeholder:text-gray-300"
                                        placeholder="Add an external link (https://...)"
                                    />
                                </div>
                                <div className="relative group">
                                    <ImageIcon className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                                    <input
                                        name="image_url"
                                        value={formData.image_url}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm placeholder:text-gray-300"
                                        placeholder="Add an image URL (https://...)"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                                >
                                    Post Notice
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventsPage;