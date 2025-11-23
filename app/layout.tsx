import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// Using system fonts to avoid Google Fonts build issues
// TODO: Add Raleway via CDN link in head or use local font files
const fontVariable = "font-sans";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-black text-white overflow-x-hidden font-sans" style={{ fontFamily: "'Raleway', sans-serif" }}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
