'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import IntroSection from '@/components/sections/IntroSection';
import AIChatSectionNew from '@/components/sections/AIChatSectionNew';
import WorldExperienceSection from '@/components/sections/WorldExperienceSection';
import NetworkingSection from '@/components/sections/NetworkingSection';
import RecognitionSection from '@/components/sections/RecognitionSection';

// Only render NameLoader on client to avoid hydration issues with animations
const NameLoader = dynamic(() => import('@/components/ui/NameLoader'), { ssr: false });

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(false);

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
      {showLoader && (
        <NameLoader onLoadingComplete={() => setShowLoader(false)} />
      )}
      <main className="relative bg-black overflow-x-hidden">
        {/* Header - appears after scrolling */}
        <Header />

        {/* Intro Section with Name Animation */}
        <IntroSection onNameAnimationComplete={() => setHeaderVisible(true)} />

        {/* AI Chat Section */}
        <AIChatSectionNew />

        {/* World Experience Section */}
        <WorldExperienceSection />

        {/* Networking Section */}
        <NetworkingSection />

        {/* Recognition Section */}
        <RecognitionSection />
        <Footer />
      </main>
    </>
  );
}
