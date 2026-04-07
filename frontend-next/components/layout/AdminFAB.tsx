"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AdminFAB() {
  const pathname = usePathname();

  // Don't show the FAB on the admin page itself
  if (pathname.startsWith("/admin")) return null;

  return (
    <motion.div
      className="md:hidden fixed bottom-[calc(80px+var(--safe-bottom))] right-6 z-[1001]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
    >
      <Link
        href="/admin"
        className="w-14 h-14 bg-[var(--accent)] text-black rounded-full shadow-[0_4px_24px_rgba(204,255,0,0.4),var(--accent-glow)] flex items-center justify-center transition-transform active:scale-90 no-underline"
        aria-label="Admin Access"
      >
        <Lock size={24} />
      </Link>
    </motion.div>
  );
}
