"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/shared/Icons";

interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectLink?: string;
  githubLink?: string;
  category: string[];
  createdAt: string;
}

const API_BASE = "https://portfolio-backend1-0061.onrender.com/api";

const categoryNames: Record<string, string> = {
  html: "HTML",
  css: "CSS & Bootstrap",
  javascript: "JavaScript",
  react: "ReactJS",
  node: "Node.JS",
};

const filterCategories = ["all", "html", "css", "javascript", "react", "node"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch(`${API_BASE}/projects`);
        const data = await res.json();
        setProjects(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const filteredProjects = projects.filter((p) => {
    const cats = Array.isArray(p.category) ? p.category : [p.category];
    const matchesCategory = activeFilter === "all" || cats.includes(activeFilter);
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-[calc(80px+var(--safe-bottom))] md:pb-16">
      {/* Hero */}
      <section
        className="relative h-[60vh] lg:h-[85vh] lg:w-[90%] lg:mx-auto lg:mt-[100px] lg:rounded-3xl flex items-center justify-center overflow-hidden mb-16"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1587620962725-abab7fe55159?fm=jpg&q=60&w=3000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-[1]" />
        <motion.div
          className="relative z-[2] text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-[family-name:var(--font-serif)] italic text-[clamp(2.5rem,10vw,4rem)] text-white mb-4">
            My <span className="text-[var(--accent)]">Projects</span>
          </h1>
          <p className="text-white/70 text-lg max-w-md mx-auto">
            A showcase of real-world apps I&apos;ve built and deployed
          </p>
        </motion.div>
      </section>

      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 px-4">
        {filterCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 min-h-[44px] cursor-pointer border ${
              activeFilter === cat
                ? "bg-[var(--accent)] text-black border-[var(--accent)] shadow-[var(--accent-glow)]"
                : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)] hover:border-white/20 hover:text-white"
            }`}
          >
            {cat === "all" ? "All" : categoryNames[cat] || cat}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative max-w-[500px] mx-auto mb-12 px-4">
        <Search
          className="absolute left-8 top-1/2 -translate-y-1/2 text-[var(--accent)] pointer-events-none z-[2]"
          size={18}
        />
        <input
          type="text"
          placeholder="Search projects by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3.5 pl-12 pr-4 bg-white/5 border border-[var(--border)] rounded-full text-white text-base outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_rgba(204,255,0,0.1)] transition-all placeholder:text-white/25"
        />
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-[1200px] mx-auto">
        {loading ? (
          // Skeleton
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden">
              <div className="skeleton h-[220px]" />
              <div className="p-6 space-y-3">
                <div className="skeleton h-4 w-1/3" />
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-2/3" />
              </div>
            </div>
          ))
        ) : error ? (
          <div className="col-span-full text-center py-16">
            <p className="text-red-400 text-lg">Failed to load projects</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-3 border border-white/20 rounded-full text-white hover:bg-white/10 transition cursor-pointer"
            >
              Retry
            </button>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <p className="text-[var(--text-muted)] text-lg italic">No projects found</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-2.5 hover:border-white/20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4),var(--accent-glow)] transition-all duration-400"
              >
                <div className="relative h-[220px] overflow-hidden">
                  <Image
                    src={project.imageUrl || "https://placehold.co/400x250/1a1a2e/ffffff?text=No+Image"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex gap-1.5 flex-wrap mb-3">
                    {(Array.isArray(project.category) ? project.category : [project.category]).map((c: string) => (
                      <span
                        key={c}
                        className="bg-[var(--accent)] text-black px-3 py-0.5 rounded-full text-[11px] font-bold uppercase"
                      >
                        {categoryNames[c] || c}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-[family-name:var(--font-serif)] italic text-xl text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {project.description}
                  </p>
                  <div className="flex gap-3 mt-auto">
                    {project.projectLink && (
                      <a
                        href={project.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-[var(--accent)] text-black py-2.5 rounded-full text-xs font-bold uppercase no-underline hover:bg-white transition-colors min-h-[44px]"
                      >
                        <ExternalLink size={14} /> View
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#333] text-white py-2.5 rounded-full text-xs font-bold uppercase no-underline hover:bg-[#555] transition-colors min-h-[44px]"
                      >
                        <GithubIcon size={14} /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
