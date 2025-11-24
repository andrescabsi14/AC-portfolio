'use client';

import { useState } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import IntroSection from '@/components/sections/IntroSection';
import HonorsSection from '@/components/sections/HonorsSection';
import AIChatSectionNew from '@/components/sections/AIChatSectionNew';
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


      {/* Services Overview Section */}
      <ServicesOverviewSection />

      {/* Project Participation Section */}
      <ProjectParticipationSection />

      {/* Problems & Solutions Section */}
      <ProblemsSection />

      {/* Personal Guarantee Section */}
      <PersonalGuaranteeSection />

      {/* CTA Section */}
      {/* <CTASection /> */}

      {/* AI Chat Section */}
      <AIChatSectionNew />
      <Footer />
    </main>
  );
}
