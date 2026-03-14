"use client";

import React, { useState, useEffect } from "react";
import { Shield, Database, Users, CheckCircle2, AlertTriangle, Loader2, Mail } from "lucide-react";

export default function Settings({ onBack }: { onBack: () => void }) {
    const [accessMode, setAccessMode] = useState<string>("all");
    const [supportEmail, setSupportEmail] = useState<string>("support@hackboats.in");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/config");
            const data = await res.json();
            if (data.ok) {
                setAccessMode(data.mode);
                setSupportEmail(data.supportEmail);
            }
        } catch (error) {
            console.error("Failed to fetch config:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleMode = async (mode: string) => {
        setSaving(true);
        setMessage(null);
        try {
            const res = await fetch("/api/admin/config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mode })
            });
            const data = await res.json();
            if (data.ok) {
                setAccessMode(mode);
                setMessage({ type: 'success', text: `Access mode updated to ${mode === 'all' ? 'All Students' : 'Only Database Members'}.` });
            } else {
                setMessage({ type: 'error', text: data.error || "Failed to update settings." });
            }
        } catch (error) {
            setMessage({ type: 'error', text: "A fatal error occurred." });
        } finally {
            setSaving(false);
        }
    };

    const handleUpdateEmail = async (email: string) => {
        setSaving(true);
        setMessage(null);
        try {
            const res = await fetch("/api/admin/config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ supportEmail: email })
            });
            const data = await res.json();
            if (data.ok) {
                setMessage({ type: 'success', text: "Support email updated successfully!" });
            } else {
                setMessage({ type: 'error', text: data.error || "Failed to update email." });
            }
        } catch (error) {
            setMessage({ type: 'error', text: "A fatal error occurred." });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading system settings...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <div className="mb-8">
                <button 
                  onClick={onBack} 
                  className="text-gray-500 hover:text-gray-800 text-sm font-medium mb-4 flex items-center gap-1 transition-colors"
                >
                  ← Back to Dashboard
                </button>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <Shield className="text-blue-600" />
                    System Permissions & Access
                </h2>
                <p className="text-gray-500 mt-2">Control how students access the LMS platform.</p>
            </div>

            {message && (
                <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 border ${message.type === 'success' ? 'bg-green-50 border-green-100 text-green-800' : 'bg-red-50 border-red-100 text-red-800'}`}>
                    {message.type === 'success' ? <CheckCircle2 className="shrink-0 mt-0.5" size={18} /> : <AlertTriangle className="shrink-0 mt-0.5" size={18} />}
                    <p className="text-sm font-medium">{message.text}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* All Access Mode */}
                <div 
                  onClick={() => !saving && handleToggleMode('all')}
                  className={`
                    p-6 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden
                    ${accessMode === 'all' 
                      ? 'border-blue-600 bg-blue-50/50 ring-4 ring-blue-50' 
                      : 'border-gray-100 bg-white hover:border-gray-200'}
                    ${saving ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                    {accessMode === 'all' && (
                        <div className="absolute top-4 right-4 text-blue-600 bg-blue-100 p-1 rounded-full shadow-sm">
                            <CheckCircle2 size={16} />
                        </div>
                    )}
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                        <Users size={24} />
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg mb-2">Public Access (All)</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Anyone with a Google account can sign in. A student record will be created automatically upon first login.
                    </p>
                    <div className={`mt-6 text-xs font-bold uppercase tracking-wider ${accessMode === 'all' ? 'text-blue-600' : 'text-gray-400'}`}>
                        {accessMode === 'all' ? 'Currently Active' : 'Select to Activate'}
                    </div>
                </div>

                {/* Database Only Mode */}
                <div 
                  onClick={() => !saving && handleToggleMode('database_only')}
                  className={`
                    p-6 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden
                    ${accessMode === 'database_only' 
                      ? 'border-purple-600 bg-purple-50/50 ring-4 ring-purple-50' 
                      : 'border-gray-100 bg-white hover:border-gray-200'}
                    ${saving ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                    {accessMode === 'database_only' && (
                        <div className="absolute top-4 right-4 text-purple-600 bg-purple-100 p-1 rounded-full shadow-sm">
                            <CheckCircle2 size={16} />
                        </div>
                    )}
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                        <Database size={24} />
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg mb-2">Pre-Authorized (Database)</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Only students whose emails are manually added by admins in the "Manage Users" section can sign in. Others will be denied access.
                    </p>
                    <div className={`mt-6 text-xs font-bold uppercase tracking-wider ${accessMode === 'database_only' ? 'text-purple-600' : 'text-gray-400'}`}>
                        {accessMode === 'database_only' ? 'Currently Active' : 'Select to Activate'}
                    </div>
                </div>
            </div>

            {/* Support Email Section */}
            <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                        <Mail size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800">Support Contact</h3>
                        <p className="text-xs text-gray-500">This email will be displayed on the access-denied page.</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="email" 
                            placeholder="support@example.com"
                            value={supportEmail}
                            onChange={(e) => setSupportEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700"
                        />
                    </div>
                    <button 
                        onClick={() => handleUpdateEmail(supportEmail)}
                        disabled={saving}
                        className="px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-all disabled:opacity-50 whitespace-nowrap"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Update Email"}
                    </button>
                </div>
            </div>

            <div className="mt-12 p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                    <AlertTriangle size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-amber-900 text-sm mb-1">Security Recommendation</h4>
                    <p className="text-amber-800/80 text-xs leading-relaxed">
                        Use "Pre-Authorized" mode when you want to restrict the LMS to specific batches of students. Ensure you have added the student emails via Bulk Upload or Individual Add before switching to this mode.
                    </p>
                </div>
            </div>
        </div>
    );
}
