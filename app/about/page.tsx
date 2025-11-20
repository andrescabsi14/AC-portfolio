'use client';

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import AboutUsIntroSection from '@/components/sections/AboutUsIntroSection';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        <AboutUsIntroSection />
      </main>
      <Footer />
    </>
  );
}
