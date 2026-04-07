"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { GraduationCap, Code, Briefcase, Award } from "lucide-react";

const timeline = [
  {
    year: "2021",
    icon: GraduationCap,
    title: "Started B.Tech",
    description: "Began pursuing B.Tech in Computer Science, laying the foundation for a career in technology.",
  },
  {
    year: "2023",
    icon: Code,
    title: "First Projects",
    description: "Built and deployed initial web projects including Ajay's Cafe and QuickStart, gaining hands-on experience.",
  },
  {
    year: "2024",
    icon: Briefcase,
    title: "Full Stack Master's",
    description: "Completed Master's in Full Stack Development, mastering React, Node.js, and modern web technologies.",
  },
  {
    year: "2025",
    icon: Award,
    title: "5+ Projects",
    description: "Deployed over five real-world projects including Kalpavriksha, with expertise in scalable web applications.",
  },
];

export default function AboutPage() {
  const [activeTimeline, setActiveTimeline] = useState<number | null>(null);

  return (
    <div className="pt-4 md:pt-0 pb-[calc(80px+var(--safe-bottom))] md:pb-16">
      {/* Hero */}
      <motion.section
        className="text-center px-4 pt-[100px] md:pt-[140px] pb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="font-[family-name:var(--font-serif)] italic text-[clamp(3rem,15vw,6rem)] leading-[0.9] mb-6 text-white">
          About <span className="text-[var(--accent)]">Me</span>
        </h1>
        <p className="text-[var(--text-muted)] max-w-[600px] mx-auto text-lg">
          Based in India • Full Stack Developer • DSA Enthusiast
        </p>
      </motion.section>

      {/* Timeline */}
      <ScrollReveal className="max-w-[900px] mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 md:gap-0 relative">
          {/* Horizontal line (desktop) */}
          <div className="hidden md:block absolute top-[35px] left-10 right-10 h-[2px] bg-[var(--border)] -z-[1]" />

          {timeline.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.year}
                className="flex flex-col items-center gap-3 cursor-pointer group"
                onClick={() => setActiveTimeline(activeTimeline === i ? null : i)}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <div
                  className={`w-[70px] h-[70px] rounded-full flex items-center justify-center text-2xl transition-all duration-300 border ${
                    activeTimeline === i
                      ? "bg-[var(--accent)] text-black border-[var(--accent)] shadow-[var(--accent-glow)]"
                      : "bg-[var(--surface)] border-[var(--border)] text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black group-hover:shadow-[var(--accent-glow)]"
                  }`}
                >
                  <Icon size={28} />
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeTimeline === i
                      ? "bg-[var(--accent)] text-black"
                      : "bg-[var(--border)] text-white group-hover:bg-[var(--accent)] group-hover:text-black"
                  }`}
                >
                  {item.year}
                </span>
              </motion.div>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Timeline Detail */}
      {activeTimeline !== null && (
        <motion.div
          className="glass rounded-2xl p-8 max-w-[600px] mx-auto mt-12 mx-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          key={activeTimeline}
        >
          <h2 className="font-[family-name:var(--font-serif)] italic text-2xl text-[var(--accent)] mb-3">
            {timeline[activeTimeline].title}
          </h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            {timeline[activeTimeline].description}
          </p>
        </motion.div>
      )}

      {/* Large Name */}
      <ScrollReveal className="text-center my-20">
        <h1 className="font-[family-name:var(--font-serif)] italic text-[clamp(3rem,15vw,10rem)] text-white text-shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
          KARTIK
        </h1>
        <p className="mt-[-10px] tracking-[0.5rem] text-[0.8rem] text-[var(--text-muted)] uppercase">
          /Full Stack Developer
        </p>
      </ScrollReveal>

      {/* Bio */}
      <ScrollReveal className="max-w-[500px] mx-auto px-4">
        <p className="text-[var(--text-muted)] font-mono text-sm leading-relaxed text-center">
          I&apos;m an experienced web developer from India, specializing in building exceptional
          digital experiences. Currently pursuing B.Tech in Computer Science while mastering
          Full Stack Development with React, Node.js, and modern web technologies.
          Passionate about clean code, scalable architecture, and user-centric design.
        </p>
      </ScrollReveal>
    </div>
  );
}
