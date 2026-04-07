const API_BASE = "https://portfolio-backend1-0061.onrender.com/api";

export interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectLink?: string;
  githubLink?: string;
  category: string[];
  createdAt: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE}/projects`, {
    cache: "no-store", // Admin needs fresh data
  });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function addProject(project: Omit<Project, "_id" | "createdAt">): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  if (!res.ok) throw new Error("Failed to add project");
  return res.json();
}

export async function updateProject(id: string, project: Partial<Project>): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
}

export async function deleteProject(id: string): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete project");
  return res.json();
}

export async function getMessages(): Promise<any[]> {
  const res = await fetch(`${API_BASE}/contacts`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

export async function markMessageRead(id: string): Promise<any> {
  const res = await fetch(`${API_BASE}/contacts/${id}/read`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Failed to mark message as read");
  return res.json();
}

export async function deleteMessage(id: string): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE}/contacts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete message");
  return res.json();
}

export async function submitContact(data: ContactMessage) {
  const res = await fetch(`${API_BASE}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit contact");
  return res.json();
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}
