'use client';

import { useEffect } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import AboutUsIntroSection from '@/components/sections/AboutUsIntroSection';
import RecognitionSection from '@/components/sections/RecognitionSection';
import NetworkingSection from '@/components/sections/NetworkingSection';
import AIReadyCTA from '@/components/sections/AIReadyCTA';

export default function AboutPage() {
  // Add smooth snap scrolling
  useEffect(() => {
    // Update CSS to enable snap scrolling
    document.documentElement.style.scrollSnapType = 'y mandatory';
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
        <AboutUsIntroSection />
        <RecognitionSection />
        <NetworkingSection />
      
      <section className="bg-black px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <AIReadyCTA />
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
