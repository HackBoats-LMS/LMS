"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Trash2, Edit } from "lucide-react";

export default function ManageUsers({ onBack }: { onBack: () => void }) {
    const { data: session } = useSession();
    const [users, setUsers] = useState<any[]>([]);
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newAdminEmail, setNewAdminEmail] = useState("");
    const [newAdminPassword, setNewAdminPassword] = useState("");
    const [editUser, setEditUser] = useState<any>(null);
    const [editForm, setEditForm] = useState({ fullName: "", phoneNumber: "", currentSemester: 1 });
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (session) {
            fetchUsers();
        }
    }, [session]);

    const fetchUsers = async () => {
        const res = await fetch("/api/users/students");
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

    return (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="mb-8">
                <button onClick={onBack} className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-3 inline-block">← Back</button>
                <h2 className="text-2xl font-bold text-gray-800">👥 Manage Users</h2>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-200">
                <h3 className="text-sm font-semibold text-blue-900 mb-4">Add New Student</h3>
                <div className="flex gap-3">
                    <input type="email" placeholder="Student Email" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} className="border border-blue-300 p-2.5 rounded-lg flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    <button onClick={addUser} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition text-sm font-medium">+ Add</button>
                </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg mb-8 border border-purple-200">
                <h3 className="text-sm font-semibold text-purple-900 mb-4">Add New Admin</h3>
                <div className="flex flex-col gap-3">
                    <input type="email" placeholder="Admin Email" value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} className="border border-purple-300 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
                    <input type="password" placeholder="Admin Password" value={newAdminPassword} onChange={(e) => setNewAdminPassword(e.target.value)} className="border border-purple-300 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
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
