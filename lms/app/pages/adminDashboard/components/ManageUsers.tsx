"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Trash2, Edit, Upload, FileDown, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";

export default function ManageUsers({ onBack }: { onBack: () => void }) {
    const { data: session } = useSession();
    const [users, setUsers] = useState<any[]>([]);
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newAdminEmail, setNewAdminEmail] = useState("");
    const [newAdminPassword, setNewAdminPassword] = useState("");
    const [editUser, setEditUser] = useState<any>(null);
    const [editForm, setEditForm] = useState({ fullName: "", phoneNumber: "", college: "", currentSemester: 1 });
    const [searchQuery, setSearchQuery] = useState("");
    const [isBulkLoading, setIsBulkLoading] = useState(false);

    useEffect(() => {
        if (session) {
            fetchUsers();
        }
    }, [session]);

    const fetchUsers = async () => {
        const res = await fetch(`/api/users/students?t=${Date.now()}`, { cache: 'no-store' });
        const data = await res.json();
        if (data.ok) {
            setUsers(data.data);
        }
    };

    const addUser = async () => {
        if (!newUserEmail.trim()) {
            alert("Please enter an email");
            return;
        }
        const res = await fetch("/api/users/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: newUserEmail })
        });
        if (res.ok) {
            alert("User added!");
            setNewUserEmail("");
            fetchUsers();
        } else {
            const data = await res.json();
            alert(data.error || "Failed to add user");
        }
    };

    const addAdmin = async () => {
        if (!newAdminEmail.trim()) {
            alert("Please enter an email");
            return;
        }
        if (!newAdminPassword.trim()) {
            alert("Please enter a password for admin");
            return;
        }
        const res = await fetch("/api/users/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: newAdminEmail, password: newAdminPassword, isAdmin: true })
        });
        if (res.ok) {
            alert("Admin added!");
            setNewAdminEmail("");
            setNewAdminPassword("");
            fetchUsers();
        } else {
            const data = await res.json();
            alert(data.error || "Failed to add admin");
        }
    };

    const openEditModal = (user: any) => {
        setEditUser(user);
        setEditForm({
            fullName: user.fullName || "",
            phoneNumber: user.phoneNumber || "",
            college: user.college || "",
            currentSemester: user.currentSemester || 1
        });
    };

    const updateUser = async () => {
        if (!editForm.fullName.trim() || !editForm.phoneNumber.trim()) {
            alert("Please fill in all fields");
            return;
        }
        const res = await fetch("/api/users/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: editUser.email, ...editForm })
        });
        if (res.ok) {
            alert("User updated!");
            setEditUser(null);
            fetchUsers();
        }
    };

    const deleteUser = async (email: string) => {
        if (!confirm(`Delete user ${email}?`)) return;
        const res = await fetch("/api/users/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });
        if (res.ok) {
            alert("User deleted!");
            fetchUsers();
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const data = new Uint8Array(event.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                if (jsonData.length === 0) {
                    alert("The file appears to be empty.");
                    return;
                }

                // Map keys to expected format (case-insensitive)
                const formattedData = jsonData.map((row: any) => {
                    const emailKey = Object.keys(row).find(k => k.toLowerCase().includes('email'));
                    const nameKey = Object.keys(row).find(k => k.toLowerCase().includes('name'));
                    const phoneKey = Object.keys(row).find(k => k.toLowerCase().includes('phone'));
                    const semKey = Object.keys(row).find(k => k.toLowerCase().includes('sem'));

                    return {
                        email: emailKey ? row[emailKey] : null,
                        fullName: nameKey ? row[nameKey] : "",
                        phoneNumber: phoneKey ? row[phoneKey] : "",
                        college: Object.keys(row).find(k => k.toLowerCase().includes('college')) ? row[Object.keys(row).find(k => k.toLowerCase().includes('college'))!] : "",
                        currentSemester: semKey ? Number(row[semKey]) : 1
                    };
                }).filter(s => s.email);

                if (formattedData.length === 0) {
                    alert("No valid email addresses found in the file. Please ensure there is an 'Email' column.");
                    return;
                }

                if (confirm(`Found ${formattedData.length} students. Proceed with bulk addition?`)) {
                    await bulkAddStudents(formattedData);
                }
            } catch (err) {
                console.error("Error parsing file:", err);
                alert("Failed to parse file. Please ensure it's a valid Excel or CSV file.");
            } finally {
                e.target.value = ""; // Clear input
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const bulkAddStudents = async (students: any[]) => {
        setIsBulkLoading(true);
        try {
            const res = await fetch("/api/users/bulk-add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ students })
            });

            const result = await res.json();
            if (res.ok) {
                alert(result.message || `Successfully added students!`);
                fetchUsers();
            } else {
                alert(result.error || "Failed to add students in bulk.");
            }
        } catch (err) {
            console.error("Bulk add error:", err);
            alert("A fatal error occurred during bulk addition.");
        } finally {
            setIsBulkLoading(false);
        }
    };

    const downloadSample = () => {
        const sampleData = [
            { Email: "student1@example.com", "Full Name": "John Doe", "Phone Number": "1234567890", College: "GGU IT", Semester: 1 },
            { Email: "student2@example.com", "Full Name": "Jane Smith", "Phone Number": "9876543210", College: "IIT Delhi", Semester: 2 }
        ];
        const ws = XLSX.utils.json_to_sheet(sampleData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sample");
        XLSX.writeFile(wb, "bulk_student_template.xlsx");
    };

    return (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="mb-8">
                <button onClick={onBack} className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-3 inline-block">← Back</button>
                <h2 className="text-2xl font-bold text-gray-800">👥 Manage Users</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-sm font-semibold text-blue-900 mb-4">Add Single Student</h3>
                    <div className="flex gap-3">
                        <input type="email" placeholder="Student Email" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} className="border border-blue-300 p-2.5 rounded-lg flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <button onClick={addUser} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition text-sm font-medium">+ Add</button>
                    </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-semibold text-green-900">Bulk Add Students (Excel/CSV)</h3>
                        <button onClick={downloadSample} className="text-xs text-green-700 hover:text-green-900 flex items-center gap-1 font-medium">
                            <FileDown size={14} /> Download Template
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <label className={`
                            flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed 
                            cursor-pointer transition-all
                            ${isBulkLoading ? 'bg-gray-100 border-gray-300 cursor-not-allowed' : 'bg-white border-green-300 hover:border-green-500 hover:bg-green-50'}
                        `}>
                            {isBulkLoading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin text-green-600" />
                                    <span className="text-sm font-medium text-green-800">Processing...</span>
                                </>
                            ) : (
                                <>
                                    <Upload size={18} className="text-green-600" />
                                    <span className="text-sm font-medium text-green-800">Click to Upload Excel/CSV</span>
                                </>
                            )}
                            <input
                                type="file"
                                accept=".xlsx, .xls, .csv"
                                onChange={handleFileUpload}
                                disabled={isBulkLoading}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg mb-8 border border-purple-200">
                <h3 className="text-sm font-semibold text-purple-900 mb-4">Add New Admin</h3>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                        <input type="email" placeholder="Admin Email" value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} className="border border-purple-300 p-2.5 rounded-lg flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
                        <input type="password" placeholder="Password" value={newAdminPassword} onChange={(e) => setNewAdminPassword(e.target.value)} className="border border-purple-300 p-2.5 rounded-lg flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
                    </div>
                    <button onClick={addAdmin} className="bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition text-sm font-medium">+ Add Admin</button>
                </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">All Users</h3>
            <input type="text" placeholder="Search by name or email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full border border-blue-300 p-2.5 rounded-lg mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users.filter(user => user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase())).map((user) => (
                    <div key={user.id} className="border border-blue-200 rounded-lg p-5 hover:shadow-md transition bg-blue-50">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800">{user.fullName || "Not set"}</h4>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-700">{user.isAdmin ? "Admin" : "Student"}</span>
                        </div>
                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                            <p>📱 {user.phoneNumber || "Not set"}</p>
                            <p>🏢 {user.college || "Not set"}</p>
                            {!user.isAdmin && <p>📚 Semester {user.currentSemester}</p>}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => openEditModal(user)} className="flex-1 text-white px-3 py-2 rounded-lg transition text-sm font-medium" style={{ backgroundColor: '#9CCFFF', color: '#000' }}>Edit</button>
                            <button onClick={() => deleteUser(user.email)} className="flex-1 text-white px-3 py-2 rounded-lg transition text-sm font-medium" style={{ backgroundColor: '#FF5B5B' }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {editUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Edit User: {editUser.email}</h2>
                        <input type="text" placeholder="Full Name" value={editForm.fullName} onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })} className="w-full border border-blue-300 p-2 mb-3 rounded" />
                        <input type="text" placeholder="Phone Number" value={editForm.phoneNumber} onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })} className="w-full border border-blue-300 p-2 mb-3 rounded" />
                        <input type="text" placeholder="College" value={editForm.college} onChange={(e) => setEditForm({ ...editForm, college: e.target.value })} className="w-full border border-blue-300 p-2 mb-3 rounded" />
                        {!editUser.isAdmin && (<select value={editForm.currentSemester} onChange={(e) => setEditForm({ ...editForm, currentSemester: Number(e.target.value) })} className="w-full border border-blue-300 p-2 mb-3 rounded">{[1, 2, 3, 4, 5, 6, 7, 8].map(sem => <option key={sem} value={sem}>Semester {sem}</option>)}</select>)}
                        <div className="flex gap-2">
                            <button onClick={updateUser} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
                            <button onClick={() => setEditUser(null)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
