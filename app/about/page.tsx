'use client';

import { useEffect } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import StrategicHeroSection from '@/components/sections/StrategicHeroSection';
import CredentialsSection from '@/components/sections/CredentialsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AIReadyCTA from '@/components/sections/AIReadyCTA';

import GlobalStatus from '@/components/ui/GlobalStatus';

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
      <Header showAnimation={false} />
      <main className="relative bg-black overflow-x-hidden">
        <StrategicHeroSection />
        <CredentialsSection />
        <ServicesSection />

        <section className="bg-black px-6 py-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <AIReadyCTA />
          </div>
        </section>

        <GlobalStatus />
      </main>
      <Footer />
    </>
  );
}
