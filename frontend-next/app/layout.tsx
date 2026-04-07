import type { Metadata } from "next";
import { Outfit, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import CustomCursor from "@/components/layout/CustomCursor";
import NoiseOverlay from "@/components/layout/NoiseOverlay";
import AdminFAB from "@/components/layout/AdminFAB";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kartik Patil | Full Stack Developer",
  description:
    "Portfolio of Kartik Patil — Full Stack Web Developer specializing in React, Node.js, and modern web technologies.",
  keywords: ["Kartik Patil", "Full Stack Developer", "React", "Node.js", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${instrumentSerif.variable}`} data-scroll-behavior="smooth">
      <body className="font-[family-name:var(--font-outfit)] antialiased">
        <CustomCursor />
        <NoiseOverlay />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <AdminFAB />
        <BottomNav />
      </body>
    </html>
  );
}
