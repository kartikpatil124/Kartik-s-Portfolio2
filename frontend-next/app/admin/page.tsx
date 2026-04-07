"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, 
  LayoutDashboard, 
  FolderPlus, 
  MessagesSquare, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  RefreshCcw,
  ExternalLink,
  ChevronLeft
} from "lucide-react";
import Image from "next/image";
import GlassCard from "@/components/shared/GlassCard";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { 
  getProjects, 
  getMessages, 
  addProject, 
  updateProject, 
  deleteProject, 
  markMessageRead, 
  deleteMessage,
  adminLogin,
  Project
} from "@/lib/api";
import { GithubIcon } from "@/components/shared/Icons";

const categories = [
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS & Bootstrap" },
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "ReactJS" },
  { value: "node", label: "Node.JS" },
];

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [activeTab, setActiveTab] = useState<"projects" | "messages">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: "",
    description: "",
    imageUrl: "",
    projectLink: "",
    githubLink: "",
    category: [],
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Authentication Check
  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") setIsAuth(true);
  }, []);

  // Fetch Data
  useEffect(() => {
    if (isAuth) {
      fetchData();
    }
  }, [isAuth]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [p, m] = await Promise.all([getProjects(), getMessages()]);
      setProjects(p);
      setMessages(m);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await adminLogin(loginForm.email, loginForm.password);
      if (res.success) {
        sessionStorage.setItem("admin_auth", "true");
        setIsAuth(true);
      } else {
        alert(res.message || "Login failed");
      }
    } catch (error) {
      alert("Server error");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuth(false);
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProject(editingId, projectForm);
        alert("Project updated!");
      } else {
        await addProject(projectForm as Omit<Project, "_id" | "createdAt">);
        alert("Project added!");
      }
      setProjectForm({ title: "", description: "", imageUrl: "", projectLink: "", githubLink: "", category: [] });
      setEditingId(null);
      fetchData();
    } catch (error) {
      alert("Error saving project");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteProject(id);
      fetchData();
    } catch (error) {
      alert("Error deleting project");
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await markMessageRead(id);
      fetchData();
    } catch (error) {
      alert("Error marking as read");
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteMessage(id);
      fetchData();
    } catch (error) {
      alert("Error deleting message");
    }
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <GlassCard className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-4 text-black shadow-[var(--accent-glow)]">
              <Lock size={32} />
            </div>
            <h1 className="font-[family-name:var(--font-serif)] italic text-3xl text-white">Admin Login</h1>
            <p className="text-[var(--text-muted)] text-sm mt-2">Access restricted area</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email" 
              placeholder="Admin Email" 
              className="w-full bg-black/40 border border-[var(--border)] p-3 rounded-xl outline-none focus:border-[var(--accent)] text-white"
              required
              value={loginForm.email}
              onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-black/40 border border-[var(--border)] p-3 rounded-xl outline-none focus:border-[var(--accent)] text-white"
              required
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
            />
            <button type="submit" className="w-full bg-[var(--accent)] text-black font-bold py-3 rounded-xl hover:bg-white transition-colors">
              Enter Dashboard
            </button>
          </form>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[100px] pb-[100px] px-4 md:px-[5%] max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-serif)] italic text-[clamp(2.5rem,8vw,3.5rem)] text-white leading-none">
            <span className="text-[var(--accent)]">//</span> Admin Panel
          </h1>
          <p className="text-[var(--text-muted)] mt-2">Manage your projects and messages</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-2 border border-red-500/30 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all text-sm font-bold uppercase tracking-wider"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Tabs / Folders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <GlassCard 
          className={`p-8 group ${activeTab === "projects" ? "border-[var(--accent)] shadow-[var(--accent-glow)] scale-[1.02]" : "hover:scale-[1.02]"}`}
          onClick={() => setActiveTab("projects")}
        >
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${activeTab === "projects" ? "bg-[var(--accent)] text-black" : "bg-white/5 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black"}`}>
              <LayoutDashboard size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Existing Projects</h3>
              <p className="text-[var(--text-muted)] text-sm">{projects.length} Total Projects</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard 
          className={`p-8 group relative ${activeTab === "messages" ? "border-[var(--accent)] shadow-[var(--accent-glow)] scale-[1.02]" : "hover:scale-[1.02]"}`}
          onClick={() => setActiveTab("messages")}
        >
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${activeTab === "messages" ? "bg-[var(--accent)] text-black" : "bg-white/5 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black"}`}>
              <MessagesSquare size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Contact Messages</h3>
              <p className="text-[var(--text-muted)] text-sm">{messages.length} Total Messages</p>
            </div>
          </div>
          {messages.some(m => !m.read) && (
            <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          )}
        </GlassCard>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === "projects" ? (
          <motion.div 
            key="projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Form */}
            <GlassCard className="p-8">
              <div className="flex items-center gap-2 mb-6 text-[var(--accent)]">
                {editingId ? <Edit3 size={24} /> : <FolderPlus size={24} />}
                <h2 className="font-[family-name:var(--font-serif)] italic text-2xl text-white">
                  {editingId ? "Edit Project" : "Add New Project"}
                </h2>
              </div>
              <form onSubmit={handleProjectSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 md:col-span-1">
                  <div className="space-y-1">
                    <label className="text-xs uppercase text-[var(--text-muted)] tracking-widest ml-1">Project Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. My Portfolio"
                      className="w-full bg-black/40 border border-[var(--border)] p-3 rounded-xl outline-none focus:border-[var(--accent)] text-white"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase text-[var(--text-muted)] tracking-widest ml-1">Description</label>
                    <textarea 
                      placeholder="What is this project about?"
                      className="w-full bg-black/40 border border-[var(--border)] p-3 rounded-xl outline-none focus:border-[var(--accent)] text-white h-[120px] resize-none"
                      required
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-4 md:col-span-1">
                  <div className="space-y-1">
                    <label className="text-xs uppercase text-[var(--text-muted)] tracking-widest ml-1">Image URL</label>
                    <input 
                      type="url" 
                      placeholder="Paste image link here..."
                      className="w-full bg-black/40 border border-[var(--border)] p-3 rounded-xl outline-none focus:border-[var(--accent)] text-white"
                      value={projectForm.imageUrl}
                      onChange={(e) => setProjectForm({...projectForm, imageUrl: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs uppercase text-[var(--text-muted)] tracking-widest ml-1">Live Link</label>
                      <input 
                        type="url" 
                        placeholder="https://..."
                        className="w-full bg-black/40 border border-[var(--border)] p-2 rounded-xl outline-none focus:border-[var(--accent)] text-white text-sm"
                        value={projectForm.projectLink}
                        onChange={(e) => setProjectForm({...projectForm, projectLink: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase text-[var(--text-muted)] tracking-widest ml-1">GitHub Link</label>
                      <input 
                        type="url" 
                        placeholder="https://..."
                        className="w-full bg-black/40 border border-[var(--border)] p-2 rounded-xl outline-none focus:border-[var(--accent)] text-white text-sm"
                        value={projectForm.githubLink}
                        onChange={(e) => setProjectForm({...projectForm, githubLink: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase text-[var(--text-muted)] tracking-widest ml-1">Categories (Ctrl/Cmd + Click)</label>
                    <select 
                      multiple
                      className="w-full bg-black/40 border border-[var(--border)] p-2 rounded-xl outline-none focus:border-[var(--accent)] text-white text-sm h-[80px]"
                      value={projectForm.category}
                      onChange={(e) => {
                        const values = Array.from(e.target.selectedOptions, option => option.value);
                        setProjectForm({...projectForm, category: values});
                      }}
                    >
                      {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="md:col-span-2 flex justify-end gap-4 mt-2">
                  {editingId && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingId(null);
                        setProjectForm({ title: "", description: "", imageUrl: "", projectLink: "", githubLink: "", category: [] });
                      }}
                      className="px-6 py-3 border border-[var(--border)] text-white rounded-xl hover:bg-white/5 transition-colors font-bold uppercase text-xs"
                    >
                      Cancel
                    </button>
                  )}
                  <button type="submit" className="px-10 py-3 bg-[var(--accent)] text-black rounded-xl hover:bg-white transition-colors font-bold uppercase text-xs flex items-center gap-2">
                    {editingId ? <><RefreshCcw size={16} /> Save Changes</> : <><Plus size={16} /> Add Project</>}
                  </button>
                </div>
              </form>
            </GlassCard>

            {/* List */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-tighter ml-2 flex items-center gap-2">
                <LayoutDashboard size={20} className="text-[var(--accent)]" /> Your Projects
              </h3>
              {projects.length === 0 ? (
                <div className="text-center py-20 text-[var(--text-muted)] italic">No projects found.</div>
              ) : (
                projects.map(p => (
                  <GlassCard key={p._id} className="p-6 flex flex-col md:flex-row gap-6 items-center">
                    <div className="relative w-full md:w-32 h-32 rounded-xl overflow-hidden shrink-0">
                      <Image 
                        src={p.imageUrl || "https://placehold.co/400x250/1a1a2e/ffffff?text=No+Image"} 
                        alt={p.title} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h4 className="font-bold text-white text-lg">{p.title}</h4>
                      <p className="text-[var(--text-muted)] text-sm line-clamp-2 mt-1">{p.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                        {p.category.map(c => (
                          <span key={c} className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white border border-white/10 uppercase font-bold">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <button 
                        onClick={() => {
                          setEditingId(p._id);
                          setProjectForm({
                            title: p.title,
                            description: p.description,
                            imageUrl: p.imageUrl,
                            projectLink: p.projectLink,
                            githubLink: p.githubLink,
                            category: p.category
                          });
                          window.scrollTo({ top: 150, behavior: "smooth" });
                        }}
                        className="flex-1 md:w-10 md:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-all"
                        aria-label="Edit"
                      >
                        <Edit3 size={18} /> <span className="md:hidden ml-2 font-bold uppercase text-xs">Edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteProject(p._id)}
                        className="flex-1 md:w-10 md:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all"
                        aria-label="Delete"
                      >
                        <Trash2 size={18} /> <span className="md:hidden ml-2 font-bold uppercase text-xs">Delete</span>
                      </button>
                    </div>
                  </GlassCard>
                ))
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="messages"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between px-2 mb-2">
              <h3 className="text-xl font-bold text-white uppercase tracking-tighter flex items-center gap-2">
                <MessagesSquare size={20} className="text-[var(--accent)]" /> Incoming Messages
              </h3>
              <button 
                onClick={fetchData}
                className="text-[var(--accent)] text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline"
              >
                <RefreshCcw size={12} /> Refresh
              </button>
            </div>
            {messages.length === 0 ? (
              <div className="text-center py-20 text-[var(--text-muted)] italic border border-dashed border-[var(--border)] rounded-2xl">No messages yet.</div>
            ) : (
              messages.map(m => (
                <GlassCard key={m._id} className={`p-6 border-l-4 ${m.read ? "border-transparent" : "border-[var(--accent)] shadow-[inset_4px_0_0_0_var(--accent)]"}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className={`font-bold ${m.read ? "text-white" : "text-[var(--accent)]"}`}>{m.name}</h4>
                      <p className="text-[var(--text-muted)] text-xs">{m.email}</p>
                    </div>
                    <p className="text-[var(--text-muted)] text-[10px] uppercase font-bold">{new Date(m.createdAt).toLocaleDateString()}</p>
                  </div>
                  <p className="text-white text-sm leading-relaxed mb-4">{m.message}</p>
                  <div className="flex gap-2">
                    {!m.read && (
                      <button 
                        onClick={() => handleMarkRead(m._id)}
                        className="px-4 py-1.5 bg-[var(--accent)] text-black rounded-lg text-xs font-bold uppercase hover:bg-white transition-colors flex items-center gap-1"
                      >
                        <CheckCircle size={14} /> Mark as Read
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteMessage(m._id)}
                      className="px-4 py-1.5 bg-white/5 border border-white/10 text-red-400 rounded-lg text-xs font-bold uppercase hover:bg-red-500 hover:text-white transition-all flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </GlassCard>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
