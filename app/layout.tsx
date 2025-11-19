import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

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
    <html lang="en" className={raleway.variable}>
      <body className="antialiased bg-black text-white overflow-x-hidden font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
