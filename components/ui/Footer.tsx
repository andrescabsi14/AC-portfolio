'use client';

import Link from 'next/link';
import PreFooterContact from '@/components/ui/PreFooterContact';

const navLinks = [
  { label: 'Experience', href: '#world-experience' },
  { label: 'Networking', href: '#networking' },
  { label: 'Recognition', href: '#recognition' },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrescabsi', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/andrescabsi14', icon: 'github' },
  { label: 'Twitter', href: 'https://twitter.com/andrescabrera', icon: 'twitter' },
  { label: 'Medium', href: 'https://medium.com/@andrescabrera', icon: 'medium' },
  { label: 'Email', href: 'mailto:hello@vessel.nyc', icon: 'email' },
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

interface FooterProps {
  variant?: 'assessment' | 'contact';
}

export default function Footer({ variant = 'contact' }: FooterProps) {
  return (
    <footer className="border-t border-white/5 bg-black/80 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl space-y-12">
        <PreFooterContact variant={variant} />

        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-5">
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-2">
            <h3 className="text-xl font-semibold text-white">Andrés Cabrera</h3>
            <p className="text-sm text-white/70">
              Building AI-First solutions that make measurable impact. <br />From NYC to the world.
            </p>
            <div className="flex flex-wrap pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/70 transition hover:border-white/40 hover:text-white"
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
          <span>© {new Date().getFullYear()} Vessel Tech Inc. All rights reserved.</span>
          <span className="text-white/90">NYC</span>
        </div>
      </div>
    </footer>
  );
}
