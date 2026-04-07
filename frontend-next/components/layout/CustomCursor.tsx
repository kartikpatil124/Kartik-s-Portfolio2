"use client";

import { useEffect, useEffectEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const followerX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const followerY = useSpring(cursorY, { stiffness: 300, damping: 30 });
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const prefersReducedMotion = usePrefersReducedMotion();
  const isVisible = isDesktop && hasFinePointer && !prefersReducedMotion;

  const handleMouseMove = useEffectEvent((event: MouseEvent) => {
    cursorX.set(event.clientX);
    cursorY.set(event.clientY);
  });

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isVisible, cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[145] h-8 w-8 rounded-full border border-white/55 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-[145] h-2.5 w-2.5 rounded-full bg-[var(--accent)] mix-blend-difference"
        style={{
          x: followerX,
          y: followerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
