'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import IntroSection from '@/components/sections/IntroSection';
import AIChatSectionNew from '@/components/sections/AIChatSectionNew';
import WorldExperienceSection from '@/components/sections/WorldExperienceSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Only render NameLoader on client to avoid hydration issues with animations
const NameLoader = dynamic(() => import('@/components/ui/NameLoader'), { ssr: false });

const whyStatements = [
  'He believes in persistence — the kind that happens in silence.',
  'He believes in intelligent effort — less force, more precision.',
  'He believes the highest art of engineering is to make complexity invisible.',
  'He believes vision is a skill — the ability to see patterns others overlook.',
  'He believes people aren’t limited by talent, but by desire.',
  'And he believes deeply in faith — not a poetic idea, but a decision: to assume the future is real, and then work backward until it is.',
];

const globeMoments = [
  {
    title: 'Bogotá — the origin.',
    detail:
      'Where he repaired old computers, sold SIM cards on buses, and learned to communicate with real people in real situations.',
  },
  {
    title: 'Dallas — the mayor’s office.',
    detail: 'An unexpected conversation at a YLAI event that would shape the next chapter.',
  },
  {
    title: 'Detroit — congressmen, city leaders, and the awakening of a global perspective.',
    detail:
      'Those rooms showed him how policy, community, and invention could share the same stage.',
  },
  {
    title: 'Washington D.C. — the U.S. Department of State, seventh floor.',
    detail:
      'Andrés received the Young Leaders of the Americas Initiative honor — a recognition granted by the Government of the United States and signed by President Barack Obama. It tilted the world forward. In the corridors he also crossed paths with Richard Branson, a reminder that sometimes action creates its own luck.',
  },
  {
    title: 'Copenhagen & Aarhus — representing the Americas as a DTU Young Influencer at the C40 World Mayors Summit.',
    detail: 'When climate innovation meets civic authority, the story rewrites itself.',
  },
  {
    title: 'Lima — the APEC Summit.',
    detail: 'A glimpse of how nations negotiate the future while people keep dreaming it.',
  },
  {
    title: 'Spain, Bolivia, Memphis — entrepreneurship, culture, and the belief that ideas move faster than borders.',
    detail: 'Each stop reminded him that craft and humanity travel light.',
  },
  {
    title: 'Santa Clara & Silicon Valley — invited to share approaches to frontier technology.',
    detail: 'He translated complex systems into conversations that anyone could join.',
  },
  {
    title: 'New York — the city he saw in 2014 from the still-unfinished Hudson Yards.',
    detail:
      'Long before life circled back and handed him an extraordinary ability visa to work here, he knew the city was a promise worth cultivating.',
  },
];

const presenceMoments = [
  {
    title: 'Bogotá — the beginning of a voice.',
    detail:
      'Community halls, university classrooms, rooms where he spoke about opportunity from the perspective of someone who had to manufacture it.',
  },
  {
    title: 'Academic stages.',
    detail: 'Wayne State University · Centro Colombo Americano · Universidad Sergio Arboleda.',
  },
  {
    title: 'Innovation worlds.',
    detail: 'Startup OLÉ in Spain · TechCamp Bolivia · Entrepreneurs Organization Detroit.',
  },
  {
    title: 'Government stages.',
    detail:
      'APEC Summit · Meetings with the mayors of Dallas and Detroit · U.S. Congress members · Panels with the President and Vice President of Colombia · U.S. Department of State delegations · YLAI Fellowship — awarded by the U.S. Government, signed by President Obama.',
  },
  {
    title: 'Unexpected moments.',
    detail:
      'A private conversation with Richard Branson in the State Department corridors — a reminder that bold action creates its own luck.',
  },
  {
    title: 'Global tech forums.',
    detail: 'C40 World Mayors Summit — DTU Young Influencer · AI & Big Data Expo North America.',
  },
];

const workMoments = [
  {
    title: 'VX — The Memory Layer for AI',
    detail:
      'Humans remember through stories. AI remembers through tokens. VX brings continuity, authorship, and identity to machines in a world drowning in synthetic content.',
  },
  {
    title: 'VED — The Autonomous Education Engine',
    detail:
      'Experts teach. VED scales their knowledge into complete educational ecosystems — slides, videos, scripts, quizzes, marketing materials, multilingual outputs — generated from a single input.',
  },
  {
    title: 'Realio — Tokenized Economies in Action',
    detail:
      'Blockchain infrastructure for real-world assets, where Andrés contributed product strategy, communication architecture, and system clarity.',
  },
  {
    title: 'Global Brand Work — The Early Craft',
    detail:
      'Before blockchain and AI, he helped build digital experiences for Coca-Cola, Gillette, P&G, Disney, Dr Pepper, Nissan, and ecommerce platforms with 1M+ daily users.',
  },
];

const philosophyLines = [
  'Start with Why.',
  'Make complexity disappear.',
  'Design for access, not exclusivity.',
  'Connect dots others ignore.',
  'Let action speak more loudly than intention.',
  'Build a life your children can be proud of — and a world they can inherit.',
];

const componentSuggestions = [
  {
    title: '1. HERO',
    detail: 'Full-screen <Card> with layered <Typography>, Framer Motion fade-in, parallax, and Lenis smooth scroll.',
  },
  {
    title: '2. Story Sections',
    detail: '<Card> + <Separator> with reveal animations triggered on scroll to maintain a “scroll film” rhythm.',
  },
  {
    title: '3. The Globe',
    detail: 'React-Globe integrated with Shadcn <Dialog> popups and <Tooltip> hover states for each luminous moment.',
  },
  {
    title: '4. Speaking & Recognition',
    detail: 'Shadcn <Tabs> or <Accordion> for categories plus a <Carousel> for events/logos and <Card> for awards.',
  },
  {
    title: '5. Work Section',
    detail: 'Grid layout with <Card> per product and Framer Motion hover-lift effects.',
  },
  {
    title: '6. Philosophy Section',
    detail: 'Minimal <Blockquote> with slow fade-in lines as the user scrolls down.',
  },
  {
    title: '7. Contact Section',
    detail: '<Button> variants for “Invite to Speak” / “Contact” plus a Shadcn <Form> for inquiries.',
  },
  {
    title: '8. Footer',
    detail: '<NavigationMenu> or a minimal <Footer> with tiny, elegant typography.',
  },
];

const contactLinks = [
  { label: 'Email', href: 'mailto:hello@andrescabrera.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/andrescabrera' },
  { label: 'Press Contact', href: 'mailto:press@andrescabrera.com' },
];

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

        {/* Cinematic Story Copy */}
        <section
          id="story-copy"
          className="relative mx-auto max-w-5xl space-y-10 px-6 py-20"
        >
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.65em] text-white/50">
              THE FINAL WEBSITE COPY — “THE FILM VERSION OF YOUR LIFE”
            </p>
            <h2 className="text-3xl font-light leading-tight text-white md:text-4xl">
              “This shouldn’t have happened. And yet… here we are.”
            </h2>
            <div className="space-y-3 text-base text-white/80 md:text-lg">
              <p>If you rewind Andrés Cabrera’s life, the ending doesn’t match the beginning.</p>
              <p>
                A Colombian kid who grew up far from the centers of influence. No political
                connections. No wealthy last name. No pre-designed path. And somehow the story jumps —
                to New York, to extraordinary visas, to global conversations, to building the kind of
                technology that reshapes how people learn, connect, and remember.
              </p>
              <p>
                If this were a movie, it would open here: with the unexpected outcome first, and then
                slowly reveal how impossible it once looked.
              </p>
              <p>
                Andrés lives in New York today not because the path was easy — but because he chose the
                path worth taking. The one that demanded persistence, discipline, and the belief that
                complexity can be transformed into clarity. Elegantly. Intentionally. Beautifully.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 shadow-[0_20px_60px_rgba(2,6,23,0.8)] md:flex-row md:items-center md:justify-between">
            <p>This is your official, world-class website story. Use as-is.</p>
            <Button variant="secondary" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Start the conversation
            </Button>
          </div>
        </section>

        {/* Why Section */}
        <section id="why-copy" className="relative mx-auto max-w-5xl space-y-8 px-6 py-20">
          <Card className="border-white/10 bg-slate-900/60 p-10">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.5em] text-white/50">
                THE WHY — “THE PART THAT MAKES EVERYTHING MAKE SENSE”
              </p>
              <div className="space-y-3 text-sm text-white/70">
                {whyStatements.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <p className="text-sm text-white/70">
                His philosophy is simple: You don’t wait for doors. You build walls and carve your own.
                This belief carried him across borders, through setbacks, and into spaces he once only
                saw in imagination.
              </p>
            </div>
          </Card>
        </section>



        {/* Speaking Section */}
        <section id="speaking-copy" className="relative mx-auto max-w-6xl space-y-8 px-6 py-20">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.6em] text-white/50">
              GLOBAL PRESENCE & SPEAKING — “THE MOMENTS WHERE THE WORLD LISTENED BACK”
            </p>
            <p className="text-2xl font-semibold text-white">
              Andrés never chased microphones. He chased truth, clarity, and action.
            </p>
            <p className="text-sm text-white/70">
              The microphones came later. People invite him because his story is not theoretical — it is lived.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {presenceMoments.map((moment) => (
              <Card key={moment.title} className="bg-slate-900/70 border-white/10 p-6">
                <p className="text-sm font-semibold text-white">{moment.title}</p>
                <p className="mt-2 text-sm text-white/70">{moment.detail}</p>
              </Card>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900/70 to-slate-900/30 p-6 text-sm text-white/70">
            <p>He speaks not to impress — but to illuminate.</p>
            <p>Not to motivate — but to translate the path between vision and action.</p>
            <p>Not to lecture — but to reveal how the improbable becomes inevitable when discipline shapes desire.</p>
          </div>
        </section>

        {/* Work Section */}
        <section id="work-copy" className="relative mx-auto max-w-6xl space-y-8 px-6 py-20">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.6em] text-white/50">WHAT HE BUILDS — “VISION WITH A TOOLKIT”</p>
            <h3 className="text-3xl font-semibold text-white">Every chapter built the next one.</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {workMoments.map((work) => (
              <Card key={work.title} className="bg-slate-900/70 border-white/10 p-6">
                <p className="text-sm font-semibold text-white">{work.title}</p>
                <p className="mt-3 text-sm text-white/70">{work.detail}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="philosophy-copy" className="relative mx-auto max-w-4xl space-y-6 px-6 py-20">
          <Card className="bg-slate-900/70 border-white/10 p-8">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.5em] text-white/50">
                THE PHILOSOPHY — “THE CODE BEHIND THE CODE”
              </p>
              <div className="space-y-2 text-sm text-white/70">
                {philosophyLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <p className="text-sm text-white/70">
                And above all: Build a life your children can be proud of — and a world they can inherit.
              </p>
            </div>
          </Card>
        </section>

        {/* Progress & Components */}
        <section id="progress" className="relative mx-auto max-w-5xl space-y-6 px-6 py-20">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.6em] text-white/50">
              IN PROGRESS — “THE STORY THAT FRAMES THE STORY”
            </p>
            <p className="text-sm text-white/70">
              Andrés is working quietly on a long-form project — a reflection on memory, technology, risk, and reinvention.
            </p>
            <p className="text-sm text-white/70">
              A story about what happens when a life refuses to stay ordinary. Coming soon.
            </p>
          </div>
        </section>

        {/* Component Recommendations */}
        <section id="components-copy" className="relative mx-auto max-w-6xl space-y-6 px-6 py-20">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.6em] text-white/50">SHADCN COMPONENT RECOMMENDATIONS</p>
            <p className="text-sm text-white/70">For a cinematic website:</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {componentSuggestions.map((suggestion) => (
              <Card key={suggestion.title} className="bg-slate-900/70 border-white/10 p-6">
                <p className="text-sm font-semibold text-white">{suggestion.title}</p>
                <p className="mt-3 text-sm text-white/70">{suggestion.detail}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative mx-auto max-w-5xl space-y-6 px-6 py-20">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.6em] text-white/50">CONTACT — “LET’S BUILD WHAT COMES NEXT”</p>
            <h3 className="text-3xl font-semibold text-white">
              Speaking • Advisory • Innovation Partnerships • Strategy
            </h3>
            <p className="text-sm text-white/70">Email • LinkedIn • Press Contact</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-white/70">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full border border-white/10 px-4 py-2 uppercase tracking-[0.3em] transition hover:border-white/40 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
            <p>Ready when you are.</p>
            <Button asChild variant="secondary" size="lg">
              <a href="mailto:hello@andrescabrera.com">Invite to speak</a>
            </Button>
          </div>
        </section>
         {/* AI Chat Section */}
        <AIChatSectionNew />
        <Footer />
      </main>
    </>
  );
}
