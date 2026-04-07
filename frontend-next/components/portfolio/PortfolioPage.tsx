"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  startTransition,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  Check,
  Code2,
  Copy,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Search,
  Send,
  Sparkles,
} from "lucide-react";
import SectionReveal from "@/components/portfolio/SectionReveal";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { GithubIcon, LinkedinIcon } from "@/components/shared/Icons";
import {
  filterOptions,
  heroStats,
  projects,
  skillMeters,
  skillTags,
  socialLinks,
  type PortfolioProject,
  type ProjectFilter,
} from "@/lib/portfolio-data";

const letterVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

function MotionWrap({
  children,
  delay = 0,
  reducedMotion,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  reducedMotion: boolean;
  className?: string;
}) {
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      custom={delay}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
        {eyebrow}
      </p>
      <h2 className="text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[0.95] text-white">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-7 text-[var(--text-muted)] sm:text-lg">
        {body}
      </p>
    </div>
  );
}

function SkillMeterBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-white/90">
        <span>{label}</span>
        <span className="text-[var(--text-muted)]">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),rgba(255,255,255,0.95))]"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function ProjectVisual({
  project,
  reducedMotion,
}: {
  project: PortfolioProject;
  reducedMotion: boolean;
}) {
  if (project.image) {
    return (
      <div className="relative h-56 overflow-hidden rounded-[1.75rem] border border-white/10">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(9,8,26,0.82)] via-transparent to-transparent" />
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
          <span className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/85">
            Live preview
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/70">
            Scroll-led UI
          </span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`relative h-56 overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br ${project.accent}`}
      animate={
        reducedMotion
          ? undefined
          : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
      }
      transition={
        reducedMotion
          ? undefined
          : { duration: 10, ease: "linear", repeat: Number.POSITIVE_INFINITY }
      }
      style={{ backgroundSize: "180% 180%" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(9,8,26,0.42),transparent_45%)]" />
      <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/80">
        {project.eyebrow}
      </div>
      <div className="absolute left-5 right-5 bottom-5 grid gap-2 text-white/85">
        <div className="grid grid-cols-3 gap-2 text-xs uppercase tracking-[0.18em]">
          <span className="rounded-2xl border border-white/15 bg-black/20 px-3 py-2 text-center">UI</span>
          <span className="rounded-2xl border border-white/15 bg-black/20 px-3 py-2 text-center">UX</span>
          <span className="rounded-2xl border border-white/15 bg-black/20 px-3 py-2 text-center">Build</span>
        </div>
        <div className="rounded-[1.4rem] border border-white/15 bg-black/20 p-4">
          <p className="text-sm leading-6 text-white/80">{project.detail}</p>
        </div>
      </div>
    </motion.div>
  );
}

function SocialIcon({
  label,
  className = "h-5 w-5",
}: {
  label: string;
  className?: string;
}) {
  if (label === "GitHub") {
    return <GithubIcon className={className} />;
  }

  if (label === "LinkedIn") {
    return <LinkedinIcon className={className} />;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 5.8c-.7.3-1.5.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.8.5-1.7.8-2.6 1-1.5-1.6-4.1-1.7-5.7-.1-.8.8-1.2 1.9-1.1 3-3-.1-5.8-1.6-7.7-4-.9 1.6-.5 3.6 1 4.7-.6 0-1.2-.2-1.7-.5 0 0 0 .1 0 .1 0 2.1 1.5 3.9 3.5 4.3-.6.2-1.2.2-1.8.1.5 1.7 2.1 2.9 3.9 3-1.5 1.2-3.3 1.8-5.2 1.8H2c1.8 1.2 4 1.9 6.3 1.9 7.5 0 11.7-6.4 11.7-11.9v-.5c.8-.6 1.5-1.3 2-2.1Z" />
    </svg>
  );
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedField, setCopiedField] = useState<"phone" | "email" | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formValues, setFormValues] = useState({ name: "", email: "", message: "" });
  const deferredQuery = useDeferredValue(searchQuery);
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const prefersReducedMotion = usePrefersReducedMotion();
  const allowHeavyMotion = isDesktop && !prefersReducedMotion;
  const copyTimerRef = useRef<number | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const heroName = "Kartik Patil".split("");

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = activeFilter === "all" || project.filters.includes(activeFilter);
    const matchesSearch = project.title.toLowerCase().includes(deferredQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearchQuery(event.target.value);
    });
  };

  const handleFilterChange = (value: ProjectFilter) => {
    startTransition(() => {
      setActiveFilter(value);
    });
  };

  const handleCopy = async (value: string, field: "phone" | "email") => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    setCopiedField(field);
    if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    copyTimerRef.current = window.setTimeout(() => setCopiedField(null), 1800);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);

    const payload = new URLSearchParams({
      "form-name": "portfolio-contact",
      ...formValues,
    }).toString();

    try {
      if (window.location.hostname !== "localhost") {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: payload,
        });
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 900));
      }
    } catch {
      await new Promise((resolve) => window.setTimeout(resolve, 900));
    } finally {
      setIsSending(false);
      setFormValues({ name: "", email: "", message: "" });
      setShowToast(true);
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = window.setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="relative overflow-x-clip">
      <section
        id="hero"
        className="section-shell relative isolate overflow-hidden px-4 pb-14 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-36"
      >
        <div className="hero-glow pointer-events-none absolute inset-0 -z-20" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[34rem] max-w-6xl rounded-full bg-[radial-gradient(circle_at_top,rgba(181,255,109,0.24),transparent_48%),radial-gradient(circle_at_20%_40%,rgba(129,193,255,0.2),transparent_40%)] blur-3xl" />
        {allowHeavyMotion ? (
          <>
            <motion.div
              className="pointer-events-none absolute left-[6%] top-[14%] -z-10 h-44 w-44 rounded-full bg-[rgba(181,255,109,0.16)] blur-3xl"
              animate={{ x: [0, 24, -12, 0], y: [0, -20, 16, 0] }}
              transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              className="pointer-events-none absolute right-[8%] top-[22%] -z-10 h-56 w-56 rounded-full bg-[rgba(123,194,255,0.18)] blur-3xl"
              animate={{ x: [0, -18, 12, 0], y: [0, 20, -10, 0] }}
              transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </>
        ) : null}

        <div className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-8">
            <MotionWrap reducedMotion={prefersReducedMotion}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
                <MapPin className="h-4 w-4 text-[var(--accent)]" />
                Based in India
              </div>
            </MotionWrap>

            <div className="space-y-6">
              <MotionWrap delay={0.08} reducedMotion={prefersReducedMotion}>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
                  Full Stack Developer / Web Designer
                </p>
              </MotionWrap>

              <div className="flex flex-wrap gap-x-1 gap-y-2 text-[clamp(3rem,9vw,7rem)] font-semibold leading-[0.9] text-white">
                {heroName.map((character, index) => (
                  <motion.span
                    key={`${character}-${index}`}
                    custom={index}
                    initial={prefersReducedMotion ? false : "hidden"}
                    animate={prefersReducedMotion ? undefined : "visible"}
                    variants={letterVariants}
                    className={character === " " ? "mr-4" : ""}
                  >
                    {character === " " ? "\u00A0" : character}
                  </motion.span>
                ))}
              </div>

              <MotionWrap delay={0.24} reducedMotion={prefersReducedMotion}>
                <p className="max-w-2xl text-lg leading-8 text-[var(--text-muted)] sm:text-xl">
                  Pixels, logic &amp; caffeine - that&apos;s the stack I run on.
                </p>
              </MotionWrap>
            </div>

            <MotionWrap delay={0.32} reducedMotion={prefersReducedMotion}>
              <div className="flex flex-col gap-4 sm:flex-row">
                <motion.a
                  href="#projects"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-base font-semibold text-[var(--bg-strong)] shadow-[0_16px_48px_rgba(181,255,109,0.22)]"
                >
                  View Projects
                  <ArrowDownRight className="h-4 w-4" />
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/7 px-6 py-3 text-base font-semibold text-white shadow-[0_18px_40px_rgba(8,8,25,0.28)] backdrop-blur-md"
                >
                  Let&apos;s Connect
                  <Sparkles className="h-4 w-4 text-[var(--accent)]" />
                </motion.a>
              </div>
            </MotionWrap>

            <MotionWrap delay={0.38} reducedMotion={prefersReducedMotion}>
              <div className="grid gap-4 sm:grid-cols-3">
                {heroStats.map((item) => (
                  <div key={item.label} className="glass-panel rounded-[1.75rem] p-5">
                    <p className="text-2xl font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
                      {item.label}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </MotionWrap>
          </div>

          <MotionWrap
            delay={0.18}
            reducedMotion={prefersReducedMotion}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="glass-panel rounded-[2rem] p-6 sm:col-span-2">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                    Developer focus
                  </p>
                  <h2 className="max-w-lg text-2xl font-semibold leading-tight text-white sm:text-3xl">
                    Clean UI, reliable logic, and shipped work that feels intentional.
                  </h2>
                </div>
                <Code2 className="mt-1 h-6 w-6 shrink-0 text-[var(--accent)]" />
              </div>
            </div>

            <div className="glass-panel rounded-[2rem] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Education
              </p>
              <div className="mt-4 space-y-4 text-sm leading-6 text-[var(--text-muted)]">
                <p>Master&apos;s in Full Stack Development (pursuing)</p>
                <p>B.Tech Computer Science</p>
              </div>
            </div>

            <div className="glass-panel relative overflow-hidden rounded-[2rem] p-0 sm:row-span-2">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(181,255,109,0.22),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/img/WhatsApp Image 2026-02-17 at 5.41.49 PM.jpeg"
                  alt="Portrait of Kartik Patil"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>

            <div className="glass-panel rounded-[2rem] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Problem solving
              </p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-[var(--text-muted)]">
                <p>Strong DSA foundation with C and C++.</p>
                <p>Comfortable turning fuzzy ideas into structured implementation steps.</p>
              </div>
            </div>
          </MotionWrap>
        </div>
      </section>

      <SectionReveal id="about" className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <SectionHeading
              eyebrow="About"
              title="A builder who likes both the polish and the problem underneath it."
              body="I&apos;m combining academic depth with real shipped work, with a portfolio shaped by frontend craft, dependable implementation, and a strong bias toward responsive experiences that feel sharp on every screen."
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass-panel rounded-[2rem] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                What I bring
              </p>
              <ul className="mt-5 space-y-4 text-base leading-7 text-[var(--text-muted)]">
                <li>Master&apos;s in Full Stack Development (pursuing) + B.Tech Computer Science.</li>
                <li>Strong problem-solving with DSA in C and C++.</li>
                <li>5+ real-world projects deployed and iterated in public.</li>
              </ul>
            </div>

            <div className="glass-panel rounded-[2rem] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Working style
              </p>
              <div className="mt-5 space-y-4 text-base leading-7 text-[var(--text-muted)]">
                <p>I care about clear hierarchy, responsive behavior, and code that stays easy to extend.</p>
                <p>I enjoy projects where design and engineering both matter, not one at the expense of the other.</p>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal id="skills" className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl space-y-8">
          <SectionHeading
            eyebrow="Skills"
            title="Core tools I reach for when I need to design, build, and ship quickly."
            body="The stack is intentionally practical: strong frontend foundations, modern JavaScript, backend basics with Node, and C/C++ for algorithmic thinking and problem solving."
          />

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="glass-panel overflow-hidden rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                    Tech ribbon
                  </p>
                  <p className="mt-3 max-w-xl text-base leading-7 text-[var(--text-muted)]">
                    A fast-moving toolkit for landing pages, product UI, and full stack growth.
                  </p>
                </div>
                <Rocket className="h-6 w-6 shrink-0 text-[var(--accent)]" />
              </div>

              {prefersReducedMotion ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {skillTags.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="marquee-shell mt-8">
                  <div className="marquee-track">
                    {[...skillTags, ...skillTags].map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="mr-3 inline-flex rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Current confidence
              </p>
              <div className="mt-8 space-y-6">
                {skillMeters.map((meter) => (
                  <SkillMeterBar
                    key={meter.label}
                    label={meter.label}
                    value={meter.value}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal id="projects" className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl space-y-8">
          <SectionHeading
            eyebrow="Projects"
            title="Selected work that shows range across brand sites, product pages, and conversion-focused UI."
            body="Search by project name, filter by the tech lens you want to inspect, and jump straight into the live builds. The C++ lane is wired in so future problem-solving projects can slot in without changing the interface."
          />

          <div className="glass-panel rounded-[2rem] p-4 sm:p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <label className="relative block">
                <span className="sr-only">Search projects by name</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--accent)]" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search projects by name..."
                  className="min-h-12 w-full rounded-full border border-white/12 bg-black/20 py-3 pl-11 pr-4 text-base text-white outline-none transition focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_rgba(181,255,109,0.12)]"
                />
              </label>

              <div className="flex flex-wrap gap-3">
                {filterOptions.map((filter) => (
                  <motion.button
                    key={filter.value}
                    type="button"
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleFilterChange(filter.value)}
                    className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition ${
                      activeFilter === filter.value
                        ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--bg-strong)]"
                        : "border-white/12 bg-white/7 text-white/80 hover:border-white/25"
                    }`}
                  >
                    {filter.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              <motion.div layout className="grid gap-6 xl:grid-cols-6">
                {filteredProjects.map((project) => (
                  <motion.article
                    key={project.title}
                    layout
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                    animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : { y: -8, scale: 1.02, boxShadow: "0 22px 56px rgba(12, 11, 33, 0.38)" }
                    }
                    whileTap={{ scale: 0.985 }}
                    className={`glass-panel overflow-hidden rounded-[2rem] p-5 sm:p-6 ${project.spanClass}`}
                  >
                    <ProjectVisual project={project} reducedMotion={!allowHeavyMotion} />

                    <div className="mt-6 space-y-5">
                      <div className="space-y-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                          {project.eyebrow}
                        </p>
                        <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                        <p className="text-base leading-7 text-[var(--text-muted)]">
                          {project.summary}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/12 bg-white/7 px-3 py-1 text-sm text-white/80"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg-strong)]"
                        >
                          Live Demo
                          <ArrowDownRight className="h-4 w-4" />
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/7 px-5 py-3 text-sm font-semibold text-white"
                        >
                          GitHub
                          <GithubIcon className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -16 }}
                className="glass-panel rounded-[2rem] p-8 text-center"
              >
                <p className="text-lg font-semibold text-white">
                  No project matches this filter yet.
                </p>
                <p className="mt-3 text-base leading-7 text-[var(--text-muted)]">
                  Try a different search, or switch back to <span className="text-white">All</span> to see the currently published case studies.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SectionReveal>

      <SectionReveal id="contact" className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl space-y-8">
          <SectionHeading
            eyebrow="Contact"
            title="If the idea is interesting, I&apos;m ready to talk through the build."
            body="Use the quick copy actions for direct contact, or send a note through the form below. The form is Netlify-ready and the success toast is intentionally lightweight for MVP delivery."
          />

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                  Reach me directly
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    { label: "Phone", value: "+91 90812 79000", actionValue: "+919081279000", copiedKey: "phone" as const, icon: Phone },
                    { label: "Email", value: "kartik.patil3100@gmail.com", actionValue: "kartik.patil3100@gmail.com", copiedKey: "email" as const, icon: Mail },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-white/7 p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-black/20 text-[var(--accent)]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-muted)]">
                              {item.label}
                            </p>
                            <p className="mt-1 break-all text-base text-white">{item.value}</p>
                          </div>
                          <div className="relative">
                            <motion.button
                              type="button"
                              whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={() => handleCopy(item.actionValue, item.copiedKey)}
                              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-black/20 px-4 py-2 text-sm font-medium text-white"
                            >
                              {copiedField === item.copiedKey ? (
                                <Check className="h-4 w-4 text-[var(--accent)]" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                              Copy
                            </motion.button>

                            <AnimatePresence>
                              {copiedField === item.copiedKey ? (
                                <motion.span
                                  initial={{ opacity: 0, y: 8, scale: 0.92 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                  transition={{ duration: 0.22 }}
                                  className="pointer-events-none absolute -top-11 right-0 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-[var(--bg-strong)] shadow-[0_10px_30px_rgba(181,255,109,0.18)]"
                                >
                                  Copied!
                                </motion.span>
                              ) : null}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                  Profile links
                </p>
                <div className="mt-6 space-y-4">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/7 p-4">
                    <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-muted)]">GitHub</p>
                    <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="break-all text-base text-white">github.com/kartikpatil124</p>
                      <a
                        href="https://github.com/kartikpatil124"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-black/20 px-4 py-2 text-sm font-medium text-white"
                      >
                        Visit Profile
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-12 items-center gap-3 rounded-full border border-white/12 bg-white/7 px-5 py-3 text-sm font-medium text-white"
                      >
                        <SocialIcon label={social.label} />
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                    Send message
                  </p>
                  <p className="mt-3 max-w-xl text-base leading-7 text-[var(--text-muted)]">
                    Name, email, and message are all we need for the MVP flow.
                  </p>
                </div>
                <Send className="mt-1 h-5 w-5 shrink-0 text-[var(--accent)]" />
              </div>

              <form
                name="portfolio-contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                <input type="hidden" name="form-name" value="portfolio-contact" />
                <input type="hidden" name="bot-field" />

                <label className="block space-y-2">
                  <span className="text-sm text-white/85">Name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formValues.name}
                    onChange={(event) =>
                      setFormValues((current) => ({ ...current, name: event.target.value }))
                    }
                    className="min-h-12 w-full rounded-[1.3rem] border border-white/12 bg-black/20 px-4 py-3 text-base text-white outline-none transition focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_rgba(181,255,109,0.12)]"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm text-white/85">Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formValues.email}
                    onChange={(event) =>
                      setFormValues((current) => ({ ...current, email: event.target.value }))
                    }
                    className="min-h-12 w-full rounded-[1.3rem] border border-white/12 bg-black/20 px-4 py-3 text-base text-white outline-none transition focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_rgba(181,255,109,0.12)]"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm text-white/85">Message</span>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formValues.message}
                    onChange={(event) =>
                      setFormValues((current) => ({ ...current, message: event.target.value }))
                    }
                    className="w-full rounded-[1.3rem] border border-white/12 bg-black/20 px-4 py-3 text-base text-white outline-none transition focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_rgba(181,255,109,0.12)]"
                  />
                </label>

                <motion.button
                  type="submit"
                  disabled={isSending}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-base font-semibold text-[var(--bg-strong)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowDownRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </SectionReveal>

      <footer className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/6 px-6 py-6 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--text-muted)]">&copy; 2026 Kartik Patil</p>

          <div className="flex flex-wrap items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-white"
              >
                <SocialIcon label={social.label} className="h-4 w-4" />
                {social.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showToast ? (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
            className="fixed bottom-6 right-4 z-[120] flex max-w-sm items-center gap-3 rounded-full border border-[rgba(181,255,109,0.3)] bg-[rgba(181,255,109,0.14)] px-5 py-3 text-sm font-medium text-white shadow-[0_18px_48px_rgba(10,12,34,0.32)] backdrop-blur-xl"
            aria-live="polite"
          >
            <Check className="h-4 w-4 text-[var(--accent)]" />
            Message received. Thanks for reaching out.
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
