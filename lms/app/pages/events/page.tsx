"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import supabase from "@/lib/db"; // Keep for writes
import DashboardSidebar from '@/components/DashboardSidebar';
import StudentHeader from '@/components/StudentHeader';
import {
    Menu,
    Plus,
    X,
    Calendar,
    Megaphone,
    Link as LinkIcon,
    Image as ImageIcon,
    Trash2,
    ExternalLink,
    Search,
    Bell,
    User,
    LogOut,
    BookOpen,
    Award,
    LayoutDashboard,
    CreditCard,
    Settings,
    Filter,
    Video,
    Trophy,
    Coffee,
    Upload
} from "lucide-react";
import { useRouter } from "next/navigation";

const STORAGE_BUCKET = 'events';

interface EventItem {
    id: string;
    title: string;
    description: string;
    type: string;
    date?: string;
    link?: string;
    image_url?: string;
    created_at?: string;
}

const EVENT_TYPES = [
    { id: 'announcement', label: 'Announcement', icon: <Megaphone size={16} />, color: 'bg-blue-100 text-blue-700' },
    { id: 'event', label: 'Event', icon: <Calendar size={16} />, color: 'bg-purple-100 text-purple-700' },
    { id: 'workshop', label: 'Workshop', icon: <BookOpen size={16} />, color: 'bg-orange-100 text-orange-700' },
    { id: 'webinar', label: 'Webinar', icon: <Video size={16} />, color: 'bg-red-100 text-red-700' },
    { id: 'competition', label: 'Competition', icon: <Trophy size={16} />, color: 'bg-yellow-100 text-yellow-700' },
    { id: 'holiday', label: 'Holiday', icon: <Coffee size={16} />, color: 'bg-green-100 text-green-700' }
];

const EventsPage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterType, setFilterType] = useState('all');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);



    // Form State
    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "announcement",
        date: "",
        link: "",
        image_url: ""
    });

    const isAdmin = session?.user?.isAdmin === true;

    useEffect(() => {
        if (session?.user?.email) {
            fetchEvents();
        }
    }, [session]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            // Use the API route which implements Redis caching
            const res = await fetch('/api/events');
            const response = await res.json();

            if (response.success && response.data) {
                setEvents(response.data);
            } else {
                console.error("Error fetching events:", response.error);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        } finally {
            setLoading(false);
        }
    };

    const uploadImage = async (file: File) => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(STORAGE_BUCKET)
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from(STORAGE_BUCKET)
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const deleteImage = async (imageUrl: string) => {
        if (!imageUrl) return;
        try {
            const urlParts = imageUrl.split(`/${STORAGE_BUCKET}/`);
            if (urlParts.length > 1) {
                const path = urlParts[1];
                const { error } = await supabase.storage
                    .from(STORAGE_BUCKET)
                    .remove([path]);

                if (error) console.error('Error deleting image from storage:', error);
            }
        } catch (error) {
            console.error('Error in deleteImage:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.description) return;

        setUploading(true);
        try {
            let finalImageUrl = formData.image_url;

            if (imageFile) {
                finalImageUrl = await uploadImage(imageFile);
            }

            const res = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    type: formData.type,
                    date: formData.date || null,
                    link: formData.link || null,
                    image_url: finalImageUrl || null,
                    created_at: new Date().toISOString()
                })
            });

            const data = await res.json();
            if (!data.success) throw new Error(data.error || "Failed to add event");

            // Reset and refresh
            setFormData({
                title: "",
                description: "",
                type: "announcement",
                date: "",
                link: "",
                image_url: ""
            });
            setImageFile(null);
            setIsModalOpen(false);
            // Re-fetch to update list (Note: Cache might delay appearance unless invalidated)
            fetchEvents();
        } catch (err: any) {
            console.error("Error adding event:", err);
            alert(`Failed to add event: ${err.message}`);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            // Find event to get image url (optional optimization: pass object instead of id)
            const eventToDelete = events.find(e => e.id === id);
            if (eventToDelete?.image_url && eventToDelete.image_url.includes(`/${STORAGE_BUCKET}/`)) {
                await deleteImage(eventToDelete.image_url);
            }

            const res = await fetch(`/api/events?id=${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (!data.success) throw new Error(data.error || "Failed to delete event");

            fetchEvents();
        } catch (err) {
            console.error("Error deleting event:", err);
        }
    };

    const filteredEvents = filterType === 'all'
        ? events
        : events.filter(e => e.type === filterType);

    const getTypeConfig = (type: string) => EVENT_TYPES.find(t => t.id === type) || EVENT_TYPES[0];

    return (
        <div className="flex h-screen bg-[#FFF8F8] font-sans text-gray-900 overflow-hidden">
            <DashboardSidebar activePage="events" isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-4 xl:p-8">
                {/* Header */}
                <StudentHeader 
                    title="Events & Notices" 
                    subtitle="Stay updated with campus activities"
                    onMenuClick={() => setIsSidebarOpen(true)}
                    showSearch={true}
                    showNotifications={true}
                />

                {/* Filter and Action Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto thumb-hide">
                        <button
                            onClick={() => setFilterType('all')}
                            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${filterType === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                        >
                            All Posts
                        </button>
                        {EVENT_TYPES.map(type => (
                            <button
                                key={type.id}
                                onClick={() => setFilterType(type.id)}
                                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border flex items-center gap-2 ${filterType === type.id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>

                    {isAdmin && (
                        <button
                            onClick={() => {
                                setFormData({ title: "", description: "", type: "announcement", date: "", link: "", image_url: "" });
                                setImageFile(null);
                                setIsModalOpen(true);
                            }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#FF5B5B] text-white rounded-xl hover:bg-[#ff4040] transition-shadow shadow-sm hover:shadow-md font-medium text-sm w-full sm:w-auto justify-center"
                        >
                            <Plus size={18} />
                            Create New
                        </button>
                    )}
                </div>

                {/* Events Grid */}
                {loading ? (
                    <div className="flex items-center justify-center h-64 text-gray-400">Loading events...</div>
                ) : filteredEvents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
                        <Megaphone size={48} className="mb-4 opacity-20" />
                        <p>No posts found for this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                        {filteredEvents.map((item) => {
                            const typeConfig = getTypeConfig(item.type);
                            return (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group h-full"
                                >
                                    {/* Image Header */}
                                    {item.image_url && (
                                        <div
                                            className="h-48 w-full bg-gray-100 relative overflow-hidden cursor-pointer group/image"
                                            onClick={() => setSelectedImage(item.image_url || '')}
                                            title="View full image"
                                        >
                                            <img
                                                src={item.image_url}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-500"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://placehold.co/400x200?text=Event';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                                        </div>
                                    )}

                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${typeConfig.color}`}>
                                                {typeConfig.icon}
                                                {typeConfig.label}
                                            </span>
                                            {isAdmin && (
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>

                                        <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight group-hover:text-[#FF5B5B] transition-colors">
                                            {item.title}
                                        </h3>

                                        {item.date && (
                                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 font-medium">
                                                <Calendar size={14} className="text-gray-400" />
                                                {new Date(item.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                            </div>
                                        )}

                                        <p className="text-sm text-gray-600 mb-6 flex-1 line-clamp-3 leading-relaxed">
                                            {item.description}
                                        </p>

                                        {item.link && (
                                            <div className="mt-auto pt-4 border-t border-gray-50">
                                                <a
                                                    href={item.link.startsWith('http') ? item.link : `https://${item.link}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-sm font-semibold text-[#FF5B5B] hover:text-[#e04040] hover:underline"
                                                >
                                                    View Details <ExternalLink size={14} />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            {/* Image Full Screen Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-pointer animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-white/10 p-2 rounded-full backdrop-blur-md z-50"
                    >
                        <X size={24} />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Full View"
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* Admin Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h2 className="text-lg font-bold text-gray-800">Create New Post</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                                    Title
                                </label>
                                <input
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5B5B]/20 focus:border-[#FF5B5B] transition-all text-sm font-medium"
                                    placeholder="Enter event title"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                                        Type
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5B5B]/20 focus:border-[#FF5B5B] transition-all text-sm font-medium appearance-none"
                                        >
                                            {EVENT_TYPES.map(t => (
                                                <option key={t.id} value={t.id}>{t.label}</option>
                                            ))}
                                        </select>
                                        <Filter className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={14} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5B5B]/20 focus:border-[#FF5B5B] transition-all text-sm font-medium text-gray-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5B5B]/20 focus:border-[#FF5B5B] transition-all text-sm resize-none font-medium"
                                    placeholder="What's happening?"
                                />
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="relative group">
                                    <LinkIcon className="absolute left-4 top-3 text-gray-400 group-focus-within:text-[#FF5B5B] transition-colors" size={16} />
                                    <input
                                        name="link"
                                        value={formData.link}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5B5B]/20 focus:border-[#FF5B5B] transition-all text-sm placeholder:text-gray-300 font-medium"
                                        placeholder="External link URL"
                                    />
                                </div>
                                <div className="border border-gray-200 rounded-lg p-3">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Event Image</label>

                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`relative flex-1 cursor-pointer transition border border-dashed rounded-lg px-4 py-3 flex flex-col items-center justify-center gap-1 ${dragActive ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-gray-50 hover:bg-gray-100 border-gray-300 text-gray-600'}`}
                                            onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
                                            onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); }}
                                            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setDragActive(false);
                                                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                                    setImageFile(e.dataTransfer.files[0]);
                                                }
                                            }}
                                        >
                                            <Upload size={16} />
                                            <span className="text-xs font-medium">{imageFile ? imageFile.name : (dragActive ? "Drop image here" : "Click or Drag to upload")}</span>
                                            <label className="absolute inset-0 cursor-pointer w-full h-full opacity-0">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        if (e.target.files && e.target.files[0]) {
                                                            setImageFile(e.target.files[0]);
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                        {imageFile && (
                                            <button
                                                type="button"
                                                onClick={() => setImageFile(null)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg relative z-10"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-1">Supported formats: JPG, PNG, WEBP</p>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-gray-50 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="px-6 py-2.5 text-sm font-bold text-white bg-[#FF5B5B] hover:bg-[#ff4040] rounded-xl shadow-lg shadow-[#FF5B5B]/20 hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                                >
                                    {uploading ? "Uploading..." : "Post It"}
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
