'use client';

import { useState } from 'react';
import Header from '@/components/ui/Header';
import InteractiveGlobe from '@/components/sections/InteractiveGlobe';
import NYCParallaxScene from '@/components/sections/NYCParallaxScene';
import AIChatSection from '@/components/sections/AIChatSection';
import NameLoader from '@/components/ui/NameLoader';

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      {showLoader && (
        <NameLoader onLoadingComplete={() => setShowLoader(false)} />
      )}
      <main className="relative bg-black">
        {/* Header with intro animation */}
        <Header />

      {/* Interactive Globe Section - Project Menu */}
      <section id="projects">
        <InteractiveGlobe />
      </section>

      {/* NYC Parallax Scene - The Story */}
      <section id="story">
        <NYCParallaxScene />
      </section>

      {/* AI Chat Section */}
      <AIChatSection />

      {/* Footer */}
      <footer className="relative h-screen flex items-center justify-center bg-gradient-to-t from-zinc-900 to-black">
        <div className="text-center space-y-6 px-8">
          <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            The Journey Continues
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            This is just the beginning. Every line of code, every challenge overcome,
            every connection made is part of a larger story still being written.
          </p>
          <div className="pt-8">
            <p className="text-gray-500 text-sm">
              Built with Next.js, Framer Motion, and Three.js
            </p>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
