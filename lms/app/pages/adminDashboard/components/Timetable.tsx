"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Plus, Trash2, Settings, Save, X, Clock, MapPin, User, ChevronDown } from "lucide-react";

// Types
type SessionData = {
    subject: string;
    teacher: string;
    room: string;
    color: string;
    description?: string;
};

type TimeSlot = {
    id: string; // unique link across days
    label: string;
};

// Colors for subjects
const SUBJECT_COLORS = [
    { name: "Blue", value: "bg-blue-100 border-blue-200 text-blue-800" },
    { name: "Green", value: "bg-green-100 border-green-200 text-green-800" },
    { name: "Purple", value: "bg-purple-100 border-purple-200 text-purple-800" },
    { name: "Orange", value: "bg-orange-100 border-orange-200 text-orange-800" },
    { name: "Red", value: "bg-red-100 border-red-200 text-red-800" },
    { name: "Teal", value: "bg-teal-100 border-teal-200 text-teal-800" },
    { name: "Gray", value: "bg-gray-100 border-gray-200 text-gray-800" },
    { name: "Pink", value: "bg-pink-100 border-pink-200 text-pink-800" },
];

const DEFAULT_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Timetable({ onBack }: { onBack: () => void }) {
    const { data: session } = useSession();

    // Data State
    const [activeDays, setActiveDays] = useState<string[]>(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);
    const [timetable, setTimetable] = useState<any>({});
    const [loading, setLoading] = useState(false);

    // UI State
    const [selectedCell, setSelectedCell] = useState<{ day: string; index: number } | null>(null);
    const [showSettings, setShowSettings] = useState(false);

    // Edit Form State
    const [editForm, setEditForm] = useState<SessionData>({
        subject: "",
        teacher: "",
        room: "",
        color: SUBJECT_COLORS[0].value,
        description: ""
    });

    useEffect(() => {
        if (session) {
            fetchTimetable();
        }
    }, [session]);

    const fetchTimetable = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/timetable");
            const data = await res.json();
            if (data.ok && data.data) {
                setTimetable(data.data);
                // Infer active days from data if possible, else default
                const days = Object.keys(data.data);
                if (days.length > 0) setActiveDays(DEFAULT_DAYS.filter(d => days.includes(d)));
            }
        } catch (e) {
            console.error("Failed to fetch timetable", e);
        } finally {
            setLoading(false);
        }
    };

    const saveTimetable = async (newTimetable: any) => {
        setTimetable(newTimetable);
        // Background save
        await fetch("/api/timetable", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ schedule: newTimetable })
        });
    };

    // --- Logic Helpers ---

    // Ensure all updated days have the same number of slots
    const syncStructure = (baseDayData: any[], targetDays: string[]) => {
        const newTable: any = { ...timetable };
        // Get the structure (time labels) from the base data
        const structure = baseDayData.map(s => ({ time: s.time }));

        targetDays.forEach(day => {
            if (!newTable[day]) {
                // Create new day with empty slots matching structure
                newTable[day] = structure.map(s => ({ time: s.time, subject: "" }));
            } else {
                // Sync time labels and length
                // We preserve existing data where possible, but time labels follow the structure
                const currentDayData = newTable[day];
                newTable[day] = structure.map((s, i) => {
                    const existing = currentDayData[i] || {};
                    return {
                        ...existing,
                        time: s.time, // Force time sync
                        subject: existing.subject || "" // Ensure subject field exists
                    };
                });
            }
        });

        // Remove days not in targetDays? Optional. For now, we prefer to keep data in DB but just hide in UI.
        // But for "Active Days" feature, let's actually manage keys if user wants.
        // Actually, "Active Days" is view-only for simplicity, but let's ensure keys exist in `timetable` object.
        return newTable;
    };

    const handleAddSlot = () => {
        const timeLabel = "New Slot";
        const newTable = { ...timetable };

        // If empty, init
        const daysToUpdate = Object.keys(newTable).length > 0 ? Object.keys(newTable) : activeDays;

        // Add to all existing days
        if (daysToUpdate.length === 0) {
            // Completely new table
            activeDays.forEach(day => {
                newTable[day] = [{ time: "09:00 - 10:00", subject: "" }];
            });
        } else {
            daysToUpdate.forEach(day => {
                if (!newTable[day]) newTable[day] = [];
                newTable[day].push({ time: "00:00 - 00:00", subject: "" });
            });
        }

        saveTimetable(newTable);
    };

    const handleDeleteSlot = (index: number) => {
        if (!confirm("Delete this time slot for ALL days?")) return;
        const newTable = { ...timetable };
        Object.keys(newTable).forEach(day => {
            if (newTable[day] && newTable[day][index]) {
                newTable[day].splice(index, 1);
            }
        });
        saveTimetable(newTable);
    };

    const handleTimeChange = (index: number, newTime: string) => {
        const newTable = { ...timetable };
        Object.keys(newTable).forEach(day => {
            if (newTable[day] && newTable[day][index]) {
                newTable[day][index].time = newTime;
            }
        });
        setTimetable(newTable); // Optimistic update
    };

    const handleTimeBlur = () => {
        saveTimetable(timetable); // Persist
    };

    const handleDayToggle = (day: string) => {
        const newActive = activeDays.includes(day)
            ? activeDays.filter(d => d !== day)
            : [...activeDays, day].sort((a, b) => DEFAULT_DAYS.indexOf(a) - DEFAULT_DAYS.indexOf(b));

        setActiveDays(newActive);

        // Ensure the day exists in data if added
        if (!timetable[day]) {
            // Clone structure from first available day or create default
            const refDay = Object.keys(timetable)[0];
            const refData = refDay ? timetable[refDay] : [];
            const newDayData = refData.map((s: any) => ({ time: s.time, subject: "" }));

            if (newDayData.length === 0) {
                // No reference, creating first day logic handled in Add Slot or empty init
            } else {
                const newTable = { ...timetable, [day]: newDayData };
                saveTimetable(newTable);
            }
        }
    };

    // Cell Editing
    const openCellEdit = (day: string, index: number) => {
        const cellData = timetable[day][index];
        setSelectedCell({ day, index });
        setEditForm({
            subject: cellData.subject || "",
            teacher: cellData.teacher || "",
            room: cellData.room || "",
            color: cellData.color || SUBJECT_COLORS[0].value,
            description: descriptionFromData(cellData)
        });
    };

    const descriptionFromData = (data: any) => {
        return data.description || "";
    };

    const saveCell = () => {
        if (!selectedCell) return;
        const { day, index } = selectedCell;
        const newTable = { ...timetable };

        newTable[day][index] = {
            ...newTable[day][index],
            subject: editForm.subject,
            teacher: editForm.teacher,
            room: editForm.room,
            color: editForm.color,
            description: editForm.description
        };

        saveTimetable(newTable);
        setSelectedCell(null);
    };

    const clearCell = () => {
        if (!selectedCell) return;
        const { day, index } = selectedCell;
        const newTable = { ...timetable };

        newTable[day][index] = {
            time: newTable[day][index].time,
            subject: ""
            // remove other keys
        };
        saveTimetable(newTable);
        setSelectedCell(null);
    };

    // Derived state for rendering
    // We assume the first active day (or any day) has the correct "Rows" (time slots)
    // If inconsistent, we might see bugs, but our sync logic tries to prevent that.
    const referenceDay = activeDays.find(d => timetable[d]) || Object.keys(timetable)[0];
    const timeSlots = referenceDay && timetable[referenceDay] ? timetable[referenceDay] : [];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[calc(100vh-100px)]">
            {/* Header / Toolbar */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-xl z-20">
                <div>
                    <button onClick={onBack} className="text-gray-500 hover:text-gray-900 text-sm font-medium mb-1 flex items-center gap-1 transition-colors">
                        ← Back to Dashboard
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800">📅 Master Timetable</h2>
                </div>

                <div className="flex items-center gap-3">
                    {/* Settings Popover */}
                    <div className="relative">
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${showSettings ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                        >
                            <Settings size={18} />
                            <span className="text-sm font-medium">Data & Days</span>
                        </button>

                        {showSettings && (
                            <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold text-gray-900">Active Days</h3>
                                    <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
                                </div>
                                <div className="space-y-2 mb-4">
                                    {DEFAULT_DAYS.map(day => (
                                        <label key={day} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={activeDays.includes(day)}
                                                onChange={() => handleDayToggle(day)}
                                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{day}</span>
                                        </label>
                                    ))}
                                </div>
                                <div className="pt-3 border-t border-gray-100">
                                    <p className="text-xs text-gray-500 mb-2">Rows</p>
                                    <button onClick={handleAddSlot} className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 py-2 rounded-lg text-sm font-medium transition-colors">
                                        <Plus size={16} /> Add Time Slot
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleAddSlot}
                        className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition shadow-sm hover:shadow text-sm font-medium flex items-center gap-2"
                    >
                        <Plus size={18} /> Add Session
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="flex-1 overflow-auto bg-gray-50/50 p-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full table-fixed">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="w-32 p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-r border-gray-100">Time</th>
                                {activeDays.map(day => (
                                    <th key={day} className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-r border-gray-100">
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {timeSlots.map((slot: any, index: number) => (
                                <tr key={index} className="group hover:bg-gray-50/50 transition-colors">
                                    {/* Time Column */}
                                    <td className="p-2 border-r border-gray-100 bg-white relative group/time truncate">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 text-gray-400 group-hover/time:text-blue-500 transition-colors w-full">
                                                <Clock size={12} className="shrink-0" />
                                                <input
                                                    value={slot.time || ""}
                                                    onChange={(e) => handleTimeChange(index, e.target.value)}
                                                    onBlur={handleTimeBlur}
                                                    className="text-xs font-semibold text-gray-700 bg-transparent border-none p-0 focus:ring-0 w-full min-w-0"
                                                    placeholder="00:00 - 00:00"
                                                />
                                            </div>
                                            <button
                                                onClick={() => handleDeleteSlot(index)}
                                                className="opacity-0 group-hover/time:opacity-100 text-gray-300 hover:text-red-500 transition-all p-1 shrink-0"
                                                title="Delete Row"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    </td>

                                    {/* Day Cells */}
                                    {activeDays.map(day => {
                                        const dayData = timetable[day] && timetable[day][index] ? timetable[day][index] : null;
                                        const isEmpty = !dayData || !dayData.subject;

                                        return (
                                            <td key={`${day}-${index}`} className="p-1 border-r border-gray-100 h-24 relative align-top">
                                                {/* Drop target or clickable area */}
                                                <div
                                                    onClick={() => openCellEdit(day, index)}
                                                    className={`
                                                w-full h-full min-h-[80px] rounded-lg p-2 transition-all cursor-pointer border border-transparent
                                                ${isEmpty
                                                            ? 'hover:bg-gray-100 hover:border-gray-200 flex items-center justify-center group/cell'
                                                            : `${dayData.color || 'bg-blue-100 border-blue-200'} hover:brightness-95 shadow-sm`
                                                        }
                                            `}
                                                >
                                                    {isEmpty ? (
                                                        <div className="opacity-0 group-hover/cell:opacity-100 flex flex-col items-center gap-1 text-gray-400">
                                                            <Plus size={16} />
                                                            <span className="text-[10px] font-medium">Add</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col h-full justify-between overflow-hidden">
                                                            <div>
                                                                <h4 className={`font-bold text-xs leading-tight mb-1 truncate ${dayData.color?.includes('text') ? '' : 'text-gray-900'}`}>{dayData.subject}</h4>
                                                                {(dayData.teacher || dayData.room) && (
                                                                    <div className="flex flex-col gap-0.5">
                                                                        {dayData.teacher && (
                                                                            <div className="flex items-center gap-1 opacity-80 truncate">
                                                                                <User size={10} className="shrink-0" />
                                                                                <span className="text-[10px] font-medium truncate">{dayData.teacher}</span>
                                                                            </div>
                                                                        )}
                                                                        {dayData.room && (
                                                                            <div className="flex items-center gap-1 opacity-80 truncate">
                                                                                <MapPin size={10} className="shrink-0" />
                                                                                <span className="text-[10px] font-medium truncate">{dayData.room}</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}

                            {timeSlots.length === 0 && (
                                <tr>
                                    <td colSpan={10} className="p-12 text-center text-gray-400">
                                        <div className="flex flex-col items-center gap-3">
                                            <Clock size={48} className="text-gray-200" />
                                            <p>Your calendar is empty. Start by adding a time slot!</p>
                                            <button onClick={handleAddSlot} className="text-blue-600 font-medium hover:underline text-sm">Create First Session</button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {selectedCell && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Edit Session</h3>
                                    <p className="text-sm text-gray-500">
                                        {selectedCell.day} • {timetable[selectedCell.day][selectedCell.index]?.time}
                                    </p>
                                </div>
                                <button onClick={() => setSelectedCell(null)} className="text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Subject</label>
                                    <input
                                        autoFocus
                                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-900 text-sm"
                                        placeholder="e.g. Advanced Mathematics"
                                        value={editForm.subject}
                                        onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                                            <User size={12} /> Teacher
                                        </label>
                                        <input
                                            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                            placeholder="Mr. Smith"
                                            value={editForm.teacher}
                                            onChange={(e) => setEditForm({ ...editForm, teacher: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                                            <MapPin size={12} /> Roome/Link
                                        </label>
                                        <input
                                            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                            placeholder="Hall A / Zoom"
                                            value={editForm.room}
                                            onChange={(e) => setEditForm({ ...editForm, room: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Color Label</label>
                                    <div className="grid grid-cols-8 gap-2">
                                        {SUBJECT_COLORS.map(c => (
                                            <button
                                                key={c.name}
                                                onClick={() => setEditForm({ ...editForm, color: c.value })}
                                                className={`w-8 h-8 rounded-full border-2 transition-all ${c.value.split(" ")[0]} ${editForm.color === c.value ? 'border-gray-800 scale-110 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'}`}
                                                title={c.name}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Note</label>
                                    <textarea
                                        rows={2}
                                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
                                        placeholder="Additional info..."
                                        value={editForm.description}
                                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mt-8 pt-4 border-t border-gray-100">
                                {/* Delete Button */}
                                {editForm.subject && (
                                    <button
                                        onClick={clearCell}
                                        className="px-4 py-2 text-red-600 text-sm font-medium hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <Trash2 size={16} /> Clear
                                    </button>
                                )}
                                <div className="flex-1"></div>
                                <button
                                    onClick={() => setSelectedCell(null)}
                                    className="px-5 py-2 text-gray-600 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={saveCell}
                                    className="px-6 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 rounded-lg transition-colors shadow-lg hover:shadow-xl"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
