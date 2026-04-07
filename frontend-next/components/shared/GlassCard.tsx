import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverGlow?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  onClick,
  hoverGlow = false,
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass rounded-2xl ${className} ${
        onClick ? "cursor-pointer" : ""
      } ${
        hoverGlow
          ? "hover:border-[rgba(204,255,0,0.3)] hover:shadow-[0_0_25px_rgba(204,255,0,0.1)] transition-all duration-300"
          : ""
      }`}
    >
      {children}
    </div>
  );
}
