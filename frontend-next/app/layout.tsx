import type { Metadata } from "next";
import { Instrument_Serif, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/layout/CustomCursor";
import NoiseOverlay from "@/components/layout/NoiseOverlay";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
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
    "Single-page portfolio for Kartik Patil, a full stack developer and web designer based in India.",
  keywords: [
    "Kartik Patil",
    "Full Stack Developer",
    "Web Designer",
    "Portfolio",
    "India",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${instrumentSerif.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="font-[family-name:var(--font-sans)] antialiased">
        <CustomCursor />
        <NoiseOverlay />
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
