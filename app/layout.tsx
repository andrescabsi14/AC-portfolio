import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Portfolio - High Tech Founder & Software Engineer",
  description: "The journey of a self-taught software engineer and high-tech founder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white overflow-x-hidden font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
