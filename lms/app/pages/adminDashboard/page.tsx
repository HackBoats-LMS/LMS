"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/db";
import { Trash2, Edit, Plus, X } from "lucide-react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [stats, setStats] = useState({ total: 0, students: 0, admins: 0 });
  const [editUser, setEditUser] = useState<any>(null);
  const [editForm, setEditForm] = useState({ fullName: "", phoneNumber: "", currentSemester: 1 });
  const [timetable, setTimetable] = useState<any>({});

  const [editSubject, setEditSubject] = useState<any>(null);
  const [subjectForm, setSubjectForm] = useState({ professor: "", description: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");


  // Event State
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
    if (session === null) return;
    if (session && !session.user?.isAdmin) {
      router.push("/");
      return;
    }
    if (session) {
      fetchUsers();
      fetchTimetable();
    }
  }, [session]);

  const fetchUsers = async () => {
    const res = await fetch("/api/users/students");
    const data = await res.json();
    if (data.ok) {
      setUsers(data.data);
      setStats({
        total: data.data.length,
        students: data.data.filter((u: any) => !u.isAdmin).length,
        admins: data.data.filter((u: any) => u.isAdmin).length
      });
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

  const updateUserSemester = async (email: string, semester: number) => {
    const res = await fetch("/api/users/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, currentSemester: semester })
    });
    if (res.ok) {
      alert("Semester updated!");
      fetchUsers();
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

  const fetchTimetable = async () => {
    const res = await fetch("/api/timetable");
    const data = await res.json();
    if (data.ok) setTimetable(data.data);
  };

  const updateSlot = async (day: string, index: number, field: string, value: string) => {
    const updated = { ...timetable, [day]: timetable[day].map((slot: any, i: number) => i === index ? { ...slot, [field]: value } : slot) };
    setTimetable(updated);
    await fetch("/api/timetable", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schedule: updated })
    });
  };

  const openSubjectModal = (subject: any) => {
    setEditSubject(subject);
    setSubjectForm({
      professor: subject.teacher || "",
      description: subject.description || ""
    });
  };

  const updateSubject = async () => {
    const updated = { ...timetable };
    Object.keys(updated).forEach(day => {
      updated[day] = updated[day].map((slot: any) =>
        slot.subject === editSubject.subject ? { ...slot, teacher: subjectForm.professor, description: subjectForm.description } : slot
      );
    });
    setTimetable(updated);
    await fetch("/api/timetable", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schedule: updated })
    });
    setEditSubject(null);
  };









  const getUniqueSubjects = () => {
    const subjects = new Set();
    Object.values(timetable).forEach((day: any) => {
      day.forEach((slot: any) => {
        if (slot.subject) subjects.add(slot.subject);
      });
    });
    return Array.from(subjects);
  };

  // Event Functions
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

  useEffect(() => {
    if (activeTab === 'events') {
      fetchEvents();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen w-full bg-white">
      <nav className="bg-white border-b fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/")} className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition">🎓 LMS</button>
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium">Admin Portal</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{session?.user?.name || "Administrator"}</p>
              <p className="text-xs text-gray-500">{session?.user?.email}</p>
            </div>
            <button onClick={() => signOut({ callbackUrl: "/pages/adminLogin" })} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium">Logout</button>
          </div>
        </div>
      </nav>

      <div className="flex-1 bg-transparent pt-20 relative">
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: 'radial-gradient(circle, #d1d5db 2px, transparent 2px)',
          backgroundSize: '20px 20px'
        }}></div>

        <div className="max-w-[1050px] mx-auto px-6 py-6 relative z-10">
          {!activeTab ? (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's your system overview.</p>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition">
                  <p className="text-gray-600 text-sm mb-1">Total Users</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                  <p className="text-xs text-gray-500 mt-2">Active accounts</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition">
                  <p className="text-gray-600 text-sm mb-1">Students</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.students}</p>
                  <p className="text-xs text-gray-500 mt-2">Enrolled</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition">
                  <p className="text-gray-600 text-sm mb-1">Admins</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.admins}</p>
                  <p className="text-xs text-gray-500 mt-2">Administrators</p>
                </div>


              </div>

              <h2 className="text-lg font-semibold mb-4 text-gray-800">Quick Access</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-5">
                <button onClick={() => router.push("/pages/courses")} className="relative border overflow-hidden cursor-pointer w-full transition-all duration-100 hover:translate-x-1 hover:translate-y-1" style={{ backgroundColor: "#BBBEC3", boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.5)" }}>
                  <div className="relative h-24 w-full flex items-center justify-center overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <pattern id="mesh-1" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
                          <path d="M 3 0 L 0 0 0 3" fill="none" stroke="#C6B7F2" strokeWidth="0.8" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#mesh-1)" />
                    </svg>
                    <span className="relative z-10 text-4xl">📚</span>
                  </div>
                  <div className="flex items-center justify-center py-2 bg-white">
                    <p className="font-medium text-sm">Courses</p>
                  </div>
                </button>

                <button onClick={() => setActiveTab("users")} className="relative border overflow-hidden cursor-pointer w-full transition-all duration-100 hover:translate-x-1 hover:translate-y-1" style={{ backgroundColor: "#BBBEC3", boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.5)" }}>
                  <div className="relative h-24 w-full flex items-center justify-center overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <pattern id="mesh-2" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
                          <path d="M 3 0 L 0 0 0 3" fill="none" stroke="#97ABC3" strokeWidth="0.8" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#mesh-2)" />
                    </svg>
                    <span className="relative z-10 text-4xl">👥</span>
                  </div>
                  <div className="flex items-center justify-center py-2 bg-white">
                    <p className="font-medium text-sm">Manage Users</p>
                  </div>
                </button>


                <button onClick={() => setActiveTab("timetable")} className="relative border overflow-hidden cursor-pointer w-full transition-all duration-100 hover:translate-x-1 hover:translate-y-1" style={{ backgroundColor: "#BBBEC3", boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.5)" }}>
                  <div className="relative h-24 w-full flex items-center justify-center overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <pattern id="mesh-4" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
                          <path d="M 3 0 L 0 0 0 3" fill="none" stroke="#B9A2A7" strokeWidth="0.8" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#mesh-4)" />
                    </svg>
                    <span className="relative z-10 text-4xl">📅</span>
                  </div>
                  <div className="flex items-center justify-center py-2 bg-white">
                    <p className="font-medium text-sm">Timetable</p>
                  </div>
                </button>


                <button onClick={() => setActiveTab("events")} className="relative border overflow-hidden cursor-pointer w-full transition-all duration-100 hover:translate-x-1 hover:translate-y-1" style={{ backgroundColor: "#BBBEC3", boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.5)" }}>
                  <div className="relative h-24 w-full flex items-center justify-center overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <pattern id="mesh-6" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
                          <path d="M 3 0 L 0 0 0 3" fill="none" stroke="#FCA5A5" strokeWidth="0.8" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#mesh-6)" />
                    </svg>
                    <span className="relative z-10 text-4xl">📢</span>
                  </div>
                  <div className="flex items-center justify-center py-2 bg-white">
                    <p className="font-medium text-sm">Events</p>
                  </div>
                </button>


                <button onClick={() => router.push("/pages/adminProgress")} className="relative border overflow-hidden cursor-pointer w-full transition-all duration-100 hover:translate-x-1 hover:translate-y-1" style={{ backgroundColor: "#BBBEC3", boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.5)" }}>
                  <div className="relative h-24 w-full flex items-center justify-center overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <pattern id="mesh-5" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
                          <path d="M 3 0 L 0 0 0 3" fill="none" stroke="#8B869B" strokeWidth="0.8" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#mesh-5)" />
                    </svg>
                    <span className="relative z-10 text-4xl">📊</span>
                  </div>
                  <div className="flex items-center justify-center py-2 bg-white">
                    <p className="font-medium text-sm">Student Progress</p>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <>
              {activeTab === "events" && (
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <button onClick={() => setActiveTab("")} className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-3 inline-block">← Back</button>
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
                </div>
              )}

              {activeTab === "users" && (
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                  <div className="mb-8">
                    <button onClick={() => setActiveTab("")} className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-3 inline-block">← Back</button>
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
                </div>
              )}



              {activeTab === "timetable" && (
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                  <div className="mb-8">
                    <button onClick={() => setActiveTab("")} className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-3 inline-block">← Back</button>
                    <h2 className="text-2xl font-bold text-gray-800">📅 Manage Timetable</h2>
                  </div>
                  <div className="overflow-x-auto mb-8">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-teal-50 border-b border-teal-200">
                          <th className="p-4 text-left font-semibold text-sm text-teal-900 border-r border-teal-200">Time</th>
                          {Object.keys(timetable).map(day => <th key={day} className="p-4 text-left font-semibold text-sm text-teal-900 border-r border-teal-200 last:border-r-0">{day}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {timetable[Object.keys(timetable)[0]]?.map((_: any, index: number) => (
                          <tr key={index} className="border-b border-teal-100 hover:bg-teal-50 transition">
                            <td className="p-4 font-semibold text-sm text-gray-800 bg-teal-50 border-r border-teal-200">{timetable[Object.keys(timetable)[0]][index].time}</td>
                            {Object.keys(timetable).map(day => (
                              <td key={day} className="p-4 border-r border-teal-200 last:border-r-0">
                                <input type="text" value={timetable[day][index].subject} onChange={(e) => updateSlot(day, index, 'subject', e.target.value)} className="w-full p-2.5 border border-teal-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent" placeholder="Subject" />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Subject Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getUniqueSubjects().map((subject: any) => {
                      const subjectData: any = Object.values(timetable).flat().find((s: any) => s.subject === subject);
                      return (
                        <div key={subject} className="border border-teal-200 rounded-lg p-4 hover:shadow-md transition bg-teal-50">
                          <h4 className="font-semibold text-gray-800 mb-2">{subject}</h4>
                          <p className="text-sm text-gray-600 mb-3">Professor: {subjectData?.teacher || "Not set"}</p>
                          <p className="text-sm text-gray-600 mb-4">Description: {subjectData?.description || "Not set"}</p>
                          <button onClick={() => openSubjectModal(subjectData)} className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition text-sm font-medium">Edit</button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}


            </>
          )}
        </div>
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

      {editSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Subject: {editSubject.subject}</h2>
            <input type="text" placeholder="Professor Name" value={subjectForm.professor} onChange={(e) => setSubjectForm({ ...subjectForm, professor: e.target.value })} className="w-full border border-teal-300 p-2 mb-3 rounded" />
            <textarea placeholder="Description" value={subjectForm.description} onChange={(e) => setSubjectForm({ ...subjectForm, description: e.target.value })} className="w-full border border-teal-300 p-2 mb-3 rounded h-24" />
            <div className="flex gap-2">
              <button onClick={updateSubject} className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">Save</button>
              <button onClick={() => setEditSubject(null)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
            </div>
          </div>
        </div>
      )}


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
