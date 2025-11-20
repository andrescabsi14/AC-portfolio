'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

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

export default function AIReadyPage() {
  return (
    <>
      <Header />
      <main className="relative bg-black overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative mx-auto max-w-6xl px-6 py-32 text-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.6em] text-white/50">
              Become AI-Ready
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Transform Your Business with AI
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-white/70">
              Practical guides to solve common business challenges with AI in measurable timeframes.
              Expand your vision and discover what's possible when you partner with technology that understands your goals.
            </p>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="relative mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
              <h3 className="text-xl font-semibold text-white">Industry-Specific Solutions</h3>
              <p className="text-sm text-white/70">
                Challenges organized by business function — from customer care to data analytics —
                so you can find exactly what you need.
              </p>
            </div>
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
              <h3 className="text-xl font-semibold text-white">Time-Bound Results</h3>
              <p className="text-sm text-white/70">
                Every guide includes realistic timelines — from 7 days to 90 days —
                so you know exactly what to expect.
              </p>
            </div>
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
              <h3 className="text-xl font-semibold text-white">Proven Approaches</h3>
              <p className="text-sm text-white/70">
                Learn from real implementations and best practices that have delivered measurable impact
                for businesses like yours.
              </p>
            </div>
          </div>
        </section>

        {/* AI Solutions & Resources - Pre-Footer */}
        <section className="relative mx-auto max-w-6xl space-y-12 px-6 py-20">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Start Here
            </h2>
            <p className="mx-auto max-w-2xl text-base text-white/70">
              Explore practical guides organized by business function. Each article provides actionable insights
              and free advice to help you understand what's possible with AI.
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

          {/* Community CTA */}
          <div className="rounded-xl border border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 text-center backdrop-blur">
            <h3 className="mb-3 text-2xl font-semibold text-white">
              Join Our AI Community
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-sm text-white/80">
              Get exclusive insights, implementation templates, and early access to new guides.
              Connect with other leaders who are building AI-ready organizations.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => window.open('/community', '_blank')}
              >
                Join the Community
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('/contact', '_blank')}
              >
                Talk to an Expert
              </Button>
            </div>
          </div>
        </section>

        {/* Partner Section */}
        <section className="relative mx-auto max-w-4xl px-6 py-16">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm md:p-12">
            <div className="space-y-6 text-center">
              <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Ready to Build Your AI Solution?
              </h3>
              <p className="mx-auto max-w-2xl text-base text-white/70">
                Partner with a team that understands your business and can deliver fast, simple solutions
                to your specific challenges. Let's build your path to becoming AI-first.
              </p>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => document.getElementById('ai-chat')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start the Conversation
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
