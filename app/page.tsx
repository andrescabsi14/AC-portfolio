'use client';

import { useState } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import IntroSection from '@/components/sections/IntroSection';
import HonorsSection from '@/components/sections/HonorsSection';

import WorldExperienceSection from '@/components/sections/WorldExperienceSection';
import ServicesOverviewSection from '@/components/sections/ServicesOverviewSection';
import ProblemsSection from '@/components/sections/ProblemsSection';
import PersonalGuaranteeSection from '@/components/sections/PersonalGuaranteeSection';
import ProjectParticipationSection from '@/components/sections/ProjectParticipationSection';
import MembershipSection from '@/components/sections/MembershipSection';

export default function Home() {
  const [introAnimationComplete, setIntroAnimationComplete] = useState(false);

  return (
    <main className="relative bg-black overflow-x-hidden">
      {/* Header - shows after intro animation */}
      <Header showAnimation={!introAnimationComplete} />

      {/* Intro Section with Name Animation */}
      <IntroSection onAnimationComplete={() => setIntroAnimationComplete(true)} />

      {/* Trusted By Section */}
      <HonorsSection />

      <MembershipSection />

      {/* World Experience Section */}
      <WorldExperienceSection />






      {/* Problems & Solutions Section */}
      <ProblemsSection />

      {/* Services Overview Section */}
      <ServicesOverviewSection />

      {/* Personal Guarantee Section */}
      <PersonalGuaranteeSection />

      {/* Project Participation Section */}
      <ProjectParticipationSection />

      {/* CTA Section */}
      {/* <CTASection /> */}

      <Footer variant="assessment" />
    </main>
  );
}
