'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Experience', href: '#world-experience' },
  { label: 'Networking', href: '#networking' },
  { label: 'Recognition', href: '#recognition' },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/andrescabrera', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/adacabrera', icon: 'github' },
  { label: 'Twitter', href: 'https://twitter.com/andrescabrera', icon: 'twitter' },
  { label: 'Medium', href: 'https://medium.com/@andrescabrera', icon: 'medium' },
  { label: 'Email', href: 'mailto:hello@andrescabrera.com', icon: 'email' },
];

const footerLinks = [
  {
    title: 'Resources',
    links: [
      { label: 'AI-Ready Guide', href: '/ai-ready' },
      { label: 'Articles', href: '/articles' },
      { label: 'Case Studies', href: '/case-studies' },
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Community', href: '/community' },
    ]
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/80 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.45em] text-white/60">Still curious?</p>
            <h3 className="text-3xl font-semibold tracking-tight text-white">
              Let’s build something worth shipping.
            </h3>
            <p className="text-sm text-white/70">
              I design and ship products that make measurable impact. Share your next challenge and let’s talk strategy.
            </p>
          </div>
          <Button
            variant="secondary"
            size="lg"
            className="w-full md:w-auto"
            onClick={() => document.getElementById('ai-chat')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start the conversation
          </Button>
        </div>

        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-5">
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-2">
            <h3 className="text-xl font-semibold text-white">Andrés Cabrera</h3>
            <p className="text-sm text-white/70">
              Building AI-first solutions that make measurable impact. From NYC to the world.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:border-white/40 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                {section.title}
              </p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Navigation Column */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              Navigate
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>



        <div className="flex flex-col gap-6 border-t border-white/5 pt-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Andrés Cabrera. All rights reserved.</span>
          <span className="text-white/90">Shaped with intent from NYC to the world.</span>
        </div>
      </div>
    </footer>
  );
}
