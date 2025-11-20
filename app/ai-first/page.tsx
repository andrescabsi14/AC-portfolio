'use client';

import { useEffect } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import AIFirstHero from '@/components/sections/ai-first/AIFirstHero';
import AIFirstVision from '@/components/sections/ai-first/AIFirstVision';
import AIFirstValue from '@/components/sections/ai-first/AIFirstValue';
import AIFirstExperience from '@/components/sections/ai-first/AIFirstExperience';
import InteractiveChatSection from '@/components/sections/ai-first/InteractiveChatSection';
import IndustriesSection from '@/components/sections/ai-first/IndustriesSection';
import AIFirstCTA from '@/components/sections/ai-first/AIFirstCTA';

export default function AIFirstPage() {
  // Add smooth snap scrolling
  useEffect(() => {
    document.documentElement.style.scrollSnapType = 'y proximity';
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollSnapType = '';
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <>
      <Header />
      <main className="relative bg-black overflow-x-hidden">
        <AIFirstHero />
        <AIFirstVision />
        <AIFirstValue />
        <AIFirstExperience />
        <InteractiveChatSection />
        <IndustriesSection />
        <AIFirstCTA />
      </main>
      <Footer />
    </>
  );
}
