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

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] h-[70px] z-[2000] glass rounded-2xl items-center justify-between px-8">
      <Link
        href="/"
        className="font-[family-name:var(--font-serif)] italic text-xl text-white no-underline"
      >
        Kartik Patil
      </Link>
      <ul className="flex gap-8 list-none">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`text-sm uppercase tracking-widest transition-colors duration-300 no-underline ${
                pathname === link.href
                  ? "text-[var(--accent)]"
                  : "text-[var(--text-muted)] hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
