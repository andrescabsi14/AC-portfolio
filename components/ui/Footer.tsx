'use client';

import Link from 'next/link';

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/andrescabrera' },
  { label: 'GitHub', href: 'https://github.com/adacabrera' },
  { label: 'Twitter', href: 'https://twitter.com/andrescabrera' },
  { label: 'Medium', href: 'https://medium.com/@andrescabrera' },
  { label: 'Email', href: 'mailto:hello@andrescabrera.com' },
];

const resourceLinks = [
  { label: 'AI-Ready Guides', href: '#ai-ready' },
  { label: 'Articles', href: '/articles' },
  { label: 'Case Studies', href: '/case-studies' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#ai-chat' },
];

const navLinks = [
  { label: 'Experience', href: '#world-experience' },
  { label: 'Networking', href: '#networking' },
  { label: 'Recognition', href: '#recognition' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-2xl font-light text-white tracking-tight">
              Andrés Cabrera
            </h3>
            <p className="text-white/40 font-light leading-relaxed">
              Building AI-first solutions for global enterprises. Operating across North America, Europe, and Asia.
            </p>
          </div>

          {/* Resources */}
          <div className="md:col-span-2 space-y-4">
            <p className="text-xs uppercase tracking-widest text-white/30 font-light">
              Resources
            </p>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white font-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2 space-y-4">
            <p className="text-xs uppercase tracking-widest text-white/30 font-light">
              Company
            </p>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white font-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigate */}
          <div className="md:col-span-2 space-y-4">
            <p className="text-xs uppercase tracking-widest text-white/30 font-light">
              Navigate
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white font-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-2 space-y-4">
            <p className="text-xs uppercase tracking-widest text-white/30 font-light">
              Connect
            </p>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/50 hover:text-white font-light transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30 font-light tracking-wider">
            © {new Date().getFullYear()} Andrés Cabrera. All rights reserved.
          </p>
          <p className="text-xs text-white/40 font-light tracking-wider">
            Shaped with intent from NYC to the world
          </p>
        </div>
      </div>
    </footer>
  );
}
