"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { 
  User, 
  Mail, 
  Phone, 
  MessageCircle, 
  School, 
  Library, 
  Calendar, 
  Layers, 
  Hash, 
  Save, 
  AlertCircle,
  CheckCircle2,
  Menu,
  ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
    const { data: session, update } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        rollNo: '',
        phoneNumber: '',
        whatsapp: '',
        college: '',
        department: '',
        year: 1,
        currentSemester: 1,
        section: ''
    });

    useEffect(() => {
        if (session?.user?.email) {
            fetchProfile();
        }
    }, [session]);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/users/me');
            const result = await res.json();
            if (result.ok && result.data) {
                const user = result.data;
                setFormData({
                    fullName: user.fullName || '',
                    email: user.email || '',
                    rollNo: user.rollNo || '',
                    phoneNumber: user.phoneNumber || '',
                    whatsapp: user.whatsapp || '',
                    college: user.college || '',
                    department: user.department || '',
                    year: user.year || 1,
                    currentSemester: user.currentSemester || 1,
                    section: user.section || ''
                });
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'year' || name === 'currentSemester' ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            const res = await fetch('/api/users/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await res.json();
            if (result.ok) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                
                // Update next-auth session
                if (session) {
                    // Update the session so middleware knows profile is complete
                    await update({ 
                        ...session,
                        user: {
                            ...session.user,
                            name: formData.fullName
                        },
                        isProfileComplete: true 
                    });
                }

                setTimeout(() => {
                    router.push('/');
                }, 1500);
            } else {
                setMessage({ type: 'error', text: result.error || 'Failed to update profile' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred while saving' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#F5F5F7]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#F5F5F7] font-sans text-gray-900 overflow-hidden">
            <DashboardSidebar activePage="profile" isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg xl:hidden"
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto">
                    {/* Incomplete Profile Warning */}
                    {session?.user && !session.user.isAdmin && !session.user.isProfileComplete && !message && (
                        <div className="mb-6 p-6 bg-amber-50 border-2 border-amber-200 rounded-3xl flex items-start gap-4 shadow-sm">
                            <div className="p-3 bg-white text-amber-500 rounded-2xl shadow-sm border border-amber-100 flex-shrink-0">
                                <AlertCircle size={28} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-amber-900 font-bold text-lg">Action Required: Complete Your Profile</h3>
                                <p className="text-amber-800/80 text-sm leading-relaxed font-medium">
                                    To access your courses, certificates, and other platform features, please fill in all the required details below. 
                                    Our system requires these details for legal and administrative purposes.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Success/Error Message */}
                    {message && (
                        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                            message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                        }`}>
                            {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                            <p className="font-medium">{message.text}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Info Card */}
                        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <User size={20} />
                                </div>
                                Personal Information
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600 ml-1">Full Legal Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-xl transition-all outline-none"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600 ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            disabled
                                            className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-transparent text-gray-500 rounded-xl cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-400 ml-1 italic">* Email cannot be changed</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600 ml-1">Roll Number</label>
                                    <div className="relative">
                                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="rollNo"
                                            value={formData.rollNo}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-xl transition-all outline-none"
                                            placeholder="2021CS101"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600 ml-1">Section / Group</label>
                                    <div className="relative">
                                        <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="section"
                                            value={formData.section}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-xl transition-all outline-none"
                                            placeholder="A / G1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info Card */}
                        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                    <Phone size={20} />
                                </div>
                                Contact Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600 ml-1">Active Mobile Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-xl transition-all outline-none"
                                            placeholder="+91 9876543210"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600 ml-1">WhatsApp Number</label>
                                    <div className="relative">
                                        <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="tel"
                                            name="whatsapp"
                                            value={formData.whatsapp}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-xl transition-all outline-none"
                                            placeholder="+91 9876543210"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Academic Info Card */}
                        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                    <School size={20} />
                                </div>
                                Academic Profile
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-semibold text-gray-600 ml-1">Institution / College Name</label>
                                    <div className="relative">
                                        <School className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="college"
                                            value={formData.college}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-xl transition-all outline-none"
                                            placeholder="Your University Name"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600 ml-1">Branch / Department</label>
                                    <div className="relative">
                                        <Library className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-xl transition-all outline-none"
                                            placeholder="Computer Science"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600 ml-1">Year of Study</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <select
                                                name="year"
                                                value={formData.year}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-xl transition-all outline-none appearance-none"
                                            >
                                                {[1, 2, 3, 4, 5].map(y => (
                                                    <option key={y} value={y}>{y}{y === 1 ? 'st' : y === 2 ? 'nd' : y === 3 ? 'rd' : 'th'} Year</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600 ml-1">Current Semester</label>
                                        <div className="relative">
                                            <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <select
                                                name="currentSemester"
                                                value={formData.currentSemester}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-xl transition-all outline-none appearance-none"
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(s => (
                                                    <option key={s} value={s}>Sem {s}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end pt-4 pb-12">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 border-2 border-slate-900 hover:bg-black text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-70 group"
                            >
                                {saving ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                                        Saving Changes...
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        Save Profile Details
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
