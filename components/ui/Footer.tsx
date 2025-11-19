'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Experience', href: '#world-experience' },
  { label: 'Networking', href: '#networking' },
  { label: 'Recognition', href: '#recognition' },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/andrescabrera' },
  { label: 'GitHub', href: 'https://github.com/adacabrera' },
  { label: 'Email', href: 'mailto:hello@andrescabrera.com' },
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

        <div className="grid gap-6 rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Navigate</p>
              <div className="flex flex-wrap gap-3 text-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:border-white/40 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Reach out</p>
              <p className="text-sm text-white/70">hello@andrescabrera.com</p>
              <p className="text-sm text-white/70">Available for product teams everywhere.</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">On socials</p>
              <div className="flex flex-wrap gap-3 text-sm">
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
