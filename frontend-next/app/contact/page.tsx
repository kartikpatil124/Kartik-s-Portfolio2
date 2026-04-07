"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Copy, Check, Send, Loader2 } from "lucide-react";
import { LinkedinIcon, InstagramIcon, GithubIcon } from "@/components/shared/Icons";

const API_BASE = "https://portfolio-backend1-0061.onrender.com/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`${API_BASE}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data._id) {
        setSent(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      }
    } catch {
      alert("Error sending message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-4 md:pt-0 pb-[calc(80px+var(--safe-bottom))] md:pb-16 px-4">
      <div className="max-w-[1000px] mx-auto mt-[100px] md:mt-[140px]">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-[family-name:var(--font-serif)] italic text-[clamp(2.5rem,8vw,3.5rem)] text-white mb-3">
            Get In <span className="text-[var(--accent)]">Touch</span>
          </h1>
          <p className="text-[var(--text-muted)] text-lg">
            I&apos;d love to hear from you. Send me a message!
          </p>
        </motion.div>

        <div className="glass rounded-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left: Contact Info */}
          <motion.div
            className="p-8 md:flex-1 md:border-r md:border-[var(--border)] bg-white/[0.02]"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Phone */}
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl mb-4 hover:bg-white/[0.08] transition-all group">
              <div className="w-12 h-12 border border-[var(--accent)] rounded-full flex items-center justify-center text-[var(--accent)] shrink-0">
                <Phone size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-[family-name:var(--font-serif)] italic text-lg text-white">Phone</h3>
                <p className="text-[var(--text-muted)] text-sm">+91 90812 79000</p>
              </div>
              <button
                onClick={() => handleCopy("9081279000", "phone")}
                className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer p-2"
                aria-label="Copy phone number"
              >
                {copied === "phone" ? <Check size={18} className="text-[var(--accent)]" /> : <Copy size={18} />}
              </button>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl mb-4 hover:bg-white/[0.08] transition-all group">
              <div className="w-12 h-12 border border-[var(--accent)] rounded-full flex items-center justify-center text-[var(--accent)] shrink-0">
                <Mail size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-[family-name:var(--font-serif)] italic text-lg text-white">Email</h3>
                <p className="text-[var(--text-muted)] text-sm break-all">kartik.patil3100@gmail.com</p>
              </div>
              <button
                onClick={() => handleCopy("kartik.patil3100@gmail.com", "email")}
                className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer p-2"
                aria-label="Copy email"
              >
                {copied === "email" ? <Check size={18} className="text-[var(--accent)]" /> : <Copy size={18} />}
              </button>
            </div>

            {/* GitHub */}
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl mb-8 hover:bg-white/[0.08] transition-all group">
              <div className="w-12 h-12 border border-[var(--accent)] rounded-full flex items-center justify-center text-[var(--accent)] shrink-0">
                <GithubIcon size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-[family-name:var(--font-serif)] italic text-lg text-white">GitHub</h3>
                <a
                  href="https://github.com/kartikpatil124"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-muted)] text-sm hover:text-[var(--accent)] transition-colors no-underline"
                >
                  github.com/kartikpatil124
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center">
              {[
                { href: "https://github.com/kartikpatil124", icon: GithubIcon },
                { href: "https://www.linkedin.com/in/kartik-patil-21389924a/", icon: LinkedinIcon },
                { href: "https://www.instagram.com/kartik__patil12", icon: InstagramIcon },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-[var(--accent)] hover:text-black hover:-translate-y-1 transition-all duration-300"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="p-8 md:flex-1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-serif)] italic text-2xl text-white mb-6">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { id: "name", type: "text", placeholder: "Your Name" },
                { id: "email", type: "email", placeholder: "Your Email" },
                { id: "subject", type: "text", placeholder: "Subject" },
              ].map((field) => (
                <input
                  key={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  required
                  value={formData[field.id as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                  className="w-full bg-black/30 border border-[var(--border)] rounded-xl py-3.5 px-4 text-white text-base outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_rgba(204,255,0,0.1)] transition-all placeholder:text-white/25"
                />
              ))}
              <textarea
                placeholder="Your Message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-black/30 border border-[var(--border)] rounded-xl py-3.5 px-4 text-white text-base outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_rgba(204,255,0,0.1)] transition-all resize-y placeholder:text-white/25"
              />
              <button
                type="submit"
                disabled={sending}
                className="w-full md:w-auto bg-[var(--accent)] text-black font-bold py-3.5 px-10 rounded-full uppercase tracking-wider text-sm hover:bg-white transition-colors min-h-[48px] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </button>
            </form>

            {/* Toast */}
            <AnimatePresence>
              {sent && (
                <motion.div
                  className="mt-4 bg-[var(--accent)] text-black px-5 py-3 rounded-xl font-semibold flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Check size={18} /> Message sent successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
