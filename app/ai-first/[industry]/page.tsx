'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import IndustryHero from '@/components/sections/ai-first/industry/IndustryHero';
import IndustryProblem from '@/components/sections/ai-first/industry/IndustryProblem';
import IndustrySolution from '@/components/sections/ai-first/industry/IndustrySolution';
import IndustryResults from '@/components/sections/ai-first/industry/IndustryResults';
import IndustryCTA from '@/components/sections/ai-first/industry/IndustryCTA';
import { industryData } from '@/lib/industry-data';

export default function IndustryPage() {
  const params = useParams();
  const industrySlug = params.industry as string;
  const industry = industryData[industrySlug];

  useEffect(() => {
    document.documentElement.style.scrollSnapType = 'y proximity';
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollSnapType = '';
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  if (!industry) {
    return (
      <>
        <Header />
        <main className="relative bg-black min-h-screen flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-4xl font-bold text-white mb-4">Industry Not Found</h1>
            <p className="text-white/70 mb-8">
              We're constantly adding new industries. Contact us to discuss your specific needs.
            </p>
            <a
              href="/ai-first"
              className="inline-block px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
            >
              Back to Industries
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="relative bg-black overflow-x-hidden">
        <IndustryHero industry={industry} />
        <IndustryProblem industry={industry} />
        <IndustrySolution industry={industry} />
        <IndustryResults industry={industry} />
        <IndustryCTA industry={industry} />
      </main>
      <Footer />
    </>
  );
}
