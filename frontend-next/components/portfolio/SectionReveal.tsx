"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function SectionReveal({
  children,
  className = "",
  id,
}: SectionRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(section, {
        y: 56,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`section-shell ${className}`.trim()}
    >
      {children}
    </section>
  );
}
