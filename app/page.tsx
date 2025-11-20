'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import IntroSection from '@/components/sections/IntroSection';
import AIChatSectionNew from '@/components/sections/AIChatSectionNew';
import WorldExperienceSection from '@/components/sections/WorldExperienceSection';
import ServicesOverviewSection from '@/components/sections/ServicesOverviewSection';
import ProblemsSection from '@/components/sections/ProblemsSection';
import PersonalGuaranteeSection from '@/components/sections/PersonalGuaranteeSection';
import CTASection from '@/components/sections/CTASection';

// Only render NameLoader on client to avoid hydration issues with animations
const NameLoader = dynamic(() => import('@/components/ui/NameLoader'), { ssr: false });

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(false);

  // Add smooth snap scrolling and prevent scrolling during loading
  useEffect(() => {
    // Update CSS to enable snap scrolling
    document.documentElement.style.scrollSnapType = 'y mandatory';
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollSnapType = '';
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  // Prevent scrolling when loader is active
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    if (showLoader) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      // Add event listeners to prevent scrolling
      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      // Remove event listeners
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [showLoader]);

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

       

        {/* World Experience Section */}
        <WorldExperienceSection />

        {/* Services Overview Section */}
        <ServicesOverviewSection />

        {/* Problems & Solutions Section */}
        <ProblemsSection />

        {/* Personal Guarantee Section */}
        <PersonalGuaranteeSection />

        {/* CTA Section */}
        <CTASection />

        {/* AI Chat Section */}
        <AIChatSectionNew />
        <Footer />
      </main>
    </>
  );
}
