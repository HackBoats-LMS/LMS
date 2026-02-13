"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import supabase from "@/lib/db";
import { Trash2, Edit, Plus, X } from "lucide-react";

export default function Events({ onBack }: { onBack: () => void }) {
    const { data: session } = useSession();
    const [events, setEvents] = useState<any[]>([]);
    const [showEventModal, setShowEventModal] = useState(false);
    const [eventForm, setEventForm] = useState({
        id: null,
        title: "",
        description: "",
        type: "announcement",
        date: "",
        link: "",
        image_url: ""
    });

    useEffect(() => {
        if (session) {
            fetchEvents();
        }
    }, [session]);

    const fetchEvents = async () => {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error) setEvents(data || []);
    };

    const handleEventSubmit = async () => {
        if (!eventForm.title || !eventForm.description) return;

        const payload: any = {
            title: eventForm.title,
            description: eventForm.description,
            type: eventForm.type,
            date: eventForm.date || null,
            link: eventForm.link || null,
            image_url: eventForm.image_url || null,
        };

        if (eventForm.id) {
            // Update
            const { error } = await supabase
                .from('events')
                .update(payload)
                .eq('id', eventForm.id);
            if (error) {
                console.error("Error updating event:", error.message, error.details, error.hint, error);
                alert(`Error updating event: ${error.message}`);
            } else {
                fetchEvents();
            }
        } else {
            // Create
            const { error } = await supabase
                .from('events')
                .insert([payload]);
            if (error) {
                console.error("Error creating event:", error.message, error.details, error.hint, error);
                alert(`Error creating event: ${error.message}`);
            } else {
                fetchEvents();
            }
        }
        setShowEventModal(false);
    };

    const deleteEvent = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', id);
        if (!error) fetchEvents();
    };

    return (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <button onClick={onBack} className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-3 inline-block">← Back</button>
                    <h2 className="text-2xl font-bold text-gray-800">📢 Manage Events & Announcements</h2>
                </div>
                <button
                    onClick={() => {
                        setEventForm({ id: null, title: "", description: "", type: "announcement", date: "", link: "", image_url: "" });
                        setShowEventModal(true);
                    }}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-sm font-medium flex items-center gap-2"
                >
                    <Plus size={16} /> Add New
                </button>
            </div>

            <div className="space-y-4">
                {events.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No events found.</p>
                ) : (
                    events.map((event) => (
                        <div key={event.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition bg-gray-50 flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${event.type === 'event' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {event.type}
                                    </span>
                                    {event.date && (
                                        <span className="text-xs text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded">
                                            {new Date(event.date).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 mb-1">{event.title}</h3>
                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{event.description}</p>
                                <div className="flex gap-4 text-xs text-gray-500">
                                    {event.link && <span className="flex items-center gap-1">🔗 Has Link</span>}
                                    {event.image_url && <span className="flex items-center gap-1">🖼️ Has Image</span>}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <button
                                    onClick={() => {
                                        setEventForm({ ...event });
                                        setShowEventModal(true);
                                    }}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                    title="Edit"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => deleteEvent(event.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showEventModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-800">{eventForm.id ? "Edit Item" : "New Item"}</h2>
                            <button
                                onClick={() => setShowEventModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Title</label>
                                <input
                                    required
                                    value={eventForm.title}
                                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                    placeholder="e.g. Annual Tech Symposium"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Type</label>
                                    <select
                                        value={eventForm.type}
                                        onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none"
                                    >
                                        <option value="announcement">Announcement</option>
                                        <option value="event">Event</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Date</label>
                                    <input
                                        type="date"
                                        value={eventForm.date}
                                        onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-gray-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={eventForm.description}
                                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
                                    placeholder="Details..."
                                />
                            </div>

                            <div className="space-y-3 pt-2">
                                <div>
                                    <input
                                        value={eventForm.link || ""}
                                        onChange={(e) => setEventForm({ ...eventForm, link: e.target.value })}
                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm placeholder:text-gray-300"
                                        placeholder="External Link (https://...)"
                                    />
                                </div>
                                <div>
                                    <input
                                        value={eventForm.image_url || ""}
                                        onChange={(e) => setEventForm({ ...eventForm, image_url: e.target.value })}
                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm placeholder:text-gray-300"
                                        placeholder="Image URL (https://...)"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    onClick={() => setShowEventModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleEventSubmit}
                                    className="px-6 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all"
                                >
                                    {eventForm.id ? "Update" : "Create"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
