"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navigationItems } from "@/lib/portfolio-data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[140] px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/12 bg-[rgba(8,8,25,0.48)] px-5 py-3 backdrop-blur-xl">
          <a href="#hero" className="text-base font-semibold tracking-[0.18em] text-white sm:text-lg">
            KARTIK PATIL
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/72 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white lg:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-x-4 top-20 z-[135] rounded-[2rem] border border-white/12 bg-[rgba(10,10,31,0.82)] p-4 shadow-[0_24px_60px_rgba(8,8,25,0.35)] backdrop-blur-xl lg:hidden"
          >
            <nav className="grid gap-2">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-[1.2rem] px-4 py-3 text-base text-white/82 transition hover:bg-white/8 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
