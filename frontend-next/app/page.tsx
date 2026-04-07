"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { LinkedinIcon, InstagramIcon } from "@/components/shared/Icons";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const socials = [
  { href: "https://www.linkedin.com/in/kartik-patil-21389924a/", icon: LinkedinIcon, label: "LinkedIn" },
  { href: "https://github.com/kartikpatil124", icon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
  ), label: "GitHub" },
  { href: "https://www.instagram.com/kartik__patil12", icon: InstagramIcon, label: "Instagram" },
  { href: "mailto:kartik.patil3100@gmail.com", icon: Mail, label: "Email" },
];

export default function HomePage() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_1fr] gap-4 p-4 pt-4 pb-[calc(80px+var(--safe-bottom))] md:p-[100px_5%_48px] md:gap-6 lg:pt-[110px] lg:grid-rows-[1fr_0.85fr_auto]"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Box 1: Hero Quote */}
      <motion.div
        variants={fadeUp}
        className="glass rounded-2xl p-8 flex flex-col justify-between min-h-[200px] lg:col-start-1 lg:row-start-1 group"
      >
        <Image
          src="/img/PikPng.com_star-silhouette-png_2787013.png"
          alt="Star"
          width={50}
          height={50}
          className="self-end drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:rotate-12 transition-transform duration-500"
        />
        <p className="font-[family-name:var(--font-serif)] italic text-[clamp(1.5rem,6vw,2.2rem)] leading-[1.2] text-white mt-4">
          &ldquo;Pixels, logic &amp; caffeine – that&rsquo;s the stack I run on&rdquo;
        </p>
      </motion.div>

      {/* Box 2: Profile Photo */}
      <motion.div
        variants={fadeUp}
        className="glass rounded-2xl overflow-hidden h-[300px] relative lg:col-start-2 lg:row-start-1 group"
      >
        <Image
          src="/img/WhatsApp Image 2026-02-17 at 5.41.49 PM.jpeg"
          alt="Kartik Patil"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </motion.div>

      {/* Box 3: Top Projects */}
      <motion.div
        variants={fadeUp}
        className="glass rounded-2xl p-8 lg:col-start-3 lg:row-span-2 lg:row-start-1"
      >
        <Link
          href="/projects"
          className="font-[family-name:var(--font-serif)] italic text-xl border-b border-[var(--border)] pb-3 block no-underline text-white hover:text-[var(--accent)] transition-colors"
        >
          Top Projects
        </Link>
        <Image
          src="/img/Screenshot 2025-08-24 125255.png"
          alt="Project Preview"
          width={400}
          height={250}
          className="w-full rounded-xl border border-[var(--border)] mt-4 mb-4"
        />
        {[
          { name: "Kalpavrikshaa", href: "https://share.google/LpjcMLrDRWzCGwS3A" },
          { name: "QuickStart", href: "https://quicks-webage.netlify.app/" },
          { name: "Ajay's Cafe", href: "https://ajays-webpage.netlify.app/" },
        ].map((project, i) => (
          <div key={project.name}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors no-underline font-[family-name:var(--font-serif)] italic text-lg"
            >
              {project.name}
            </a>
            {i < 2 && <div className="h-px bg-[var(--border)]" />}
          </div>
        ))}
      </motion.div>

      {/* Box 4: Bio */}
      <motion.div
        variants={fadeUp}
        className="glass rounded-2xl p-8 lg:col-start-1 lg:row-start-2"
      >
        <Image
          src="/img/tree-of-gondor-seeklogo.png"
          alt="Logo"
          width={32}
          height={32}
          className="invert mb-4"
        />
        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
          I am Kartik Patil, a passionate web developer with a Master&rsquo;s in Full
          Stack Development and currently pursuing a B.Tech in Computer Science.
          I have strong problem-solving skills with expertise in Data Structures
          and Algorithms using C and C++. I have built and deployed more than five
          real-world projects, gaining hands-on experience in creating scalable
          and user-friendly web applications.
        </p>
      </motion.div>

      {/* Box 5: Contact CTA */}
      <motion.div variants={fadeUp} className="lg:col-start-2 lg:row-start-2">
        <Link
          href="/contact"
          className="glass rounded-2xl p-8 block no-underline hover:border-[rgba(255,255,255,0.15)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3),var(--accent-glow)] transition-all duration-300 group h-full"
        >
          <span className="text-[11px] text-[var(--accent)] uppercase tracking-[2px] block mb-1">
            Have any questions
          </span>
          <h2 className="font-[family-name:var(--font-serif)] italic text-[clamp(2rem,8vw,3rem)] text-white group-hover:text-[var(--accent)] transition-colors">
            Contact me..
          </h2>
        </Link>
      </motion.div>

      {/* Box 6: Social Icons */}
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-center gap-10 h-[70px] lg:col-span-3"
      >
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-[var(--text-muted)] hover:text-[var(--accent)] hover:scale-[1.2] transition-all duration-300"
            >
              <Icon size={24} />
            </a>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
