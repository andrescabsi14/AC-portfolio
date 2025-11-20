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

const articleCategories = [
  {
    title: 'Customer Care & Support',
    description: 'Transform your customer experience',
    articles: [
      {
        title: 'How to Reduce Response Time by 70% in 30 Days',
        href: '/articles/reduce-response-time-30-days',
        problem: 'Slow customer response times hurting satisfaction'
      },
      {
        title: 'How to Scale Support Without Hiring in 90 Days',
        href: '/articles/scale-support-90-days',
        problem: 'Growing support demands with limited resources'
      },
    ]
  },
  {
    title: 'Sales & Growth',
    description: 'Accelerate revenue with AI',
    articles: [
      {
        title: 'How to Automate Lead Qualification in 2 Weeks',
        href: '/articles/automate-lead-qualification-2-weeks',
        problem: 'Sales team wasting time on unqualified leads'
      },
      {
        title: 'How to Increase Conversion Rates by 40% in 60 Days',
        href: '/articles/increase-conversions-60-days',
        problem: 'Low conversion rates despite high traffic'
      },
    ]
  },
  {
    title: 'Operations & Efficiency',
    description: 'Streamline your workflows',
    articles: [
      {
        title: 'How to Eliminate Repetitive Tasks in 14 Days',
        href: '/articles/eliminate-repetitive-tasks-14-days',
        problem: 'Team spending hours on manual, repetitive work'
      },
      {
        title: 'How to Cut Operational Costs by 50% in 3 Months',
        href: '/articles/cut-costs-3-months',
        problem: 'High operational costs eating into margins'
      },
    ]
  },
  {
    title: 'Marketing & Engagement',
    description: 'Personalize at scale',
    articles: [
      {
        title: 'How to Personalize Experiences at Scale in 45 Days',
        href: '/articles/personalize-at-scale-45-days',
        problem: 'Generic experiences failing to engage customers'
      },
      {
        title: 'How to Generate Quality Content 10x Faster in 21 Days',
        href: '/articles/content-generation-21-days',
        problem: 'Content creation bottlenecks slowing growth'
      },
    ]
  },
  {
    title: 'Data & Insights',
    description: 'Turn data into decisions',
    articles: [
      {
        title: 'How to Transform Data into Insights in 7 Days',
        href: '/articles/data-insights-7-days',
        problem: 'Drowning in data but starving for insights'
      },
      {
        title: 'How to Predict Customer Behavior in 30 Days',
        href: '/articles/predict-behavior-30-days',
        problem: 'Unable to anticipate customer needs and churn'
      },
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
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Connect</p>
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

        {/* AI Solutions & Resources */}
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-semibold tracking-tight text-white">
              Become AI-Ready. Start Here.
            </h3>
            <p className="text-sm text-white/70">
              Practical guides to solve common business challenges with AI in measurable timeframes
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articleCategories.map((category) => (
              <div
                key={category.title}
                className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
                    {category.title}
                  </h4>
                  <p className="text-xs text-white/60">{category.description}</p>
                </div>
                <div className="space-y-3">
                  {category.articles.map((article) => (
                    <Link
                      key={article.href}
                      href={article.href}
                      className="group block space-y-1 rounded-lg border border-white/5 bg-white/[0.02] p-3 transition hover:border-white/20 hover:bg-white/[0.05]"
                    >
                      <p className="text-xs font-medium text-white/90 group-hover:text-white">
                        {article.title}
                      </p>
                      <p className="text-[10px] leading-relaxed text-white/50 group-hover:text-white/70">
                        {article.problem}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 text-center backdrop-blur">
            <p className="text-sm text-white/80">
              💡 <span className="font-semibold">Join our AI community</span> — Get exclusive insights, templates, and early access to new guides
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4"
              onClick={() => window.open('/community', '_blank')}
            >
              Join the Community
            </Button>
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
