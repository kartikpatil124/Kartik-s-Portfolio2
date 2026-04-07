"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Briefcase, Mail } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[rgba(10,10,10,0.8)] backdrop-blur-xl border-t border-[var(--border)] flex justify-around py-3 pb-[calc(12px+var(--safe-bottom))] z-[1000] shadow-[0_-4px_32px_rgba(0,0,0,0.3)]">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center gap-1 text-[11px] no-underline min-h-[44px] min-w-[60px] justify-center transition-colors duration-200 ${
              isActive
                ? "text-[var(--accent)]"
                : "text-[var(--text-muted)]"
            }`}
          >
            <Icon size={20} />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
