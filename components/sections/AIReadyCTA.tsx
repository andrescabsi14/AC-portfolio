'use client';

import { Button } from '@/components/ui/button';

export default function AIReadyCTA() {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 backdrop-blur md:p-8">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:text-left">
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-white">
            Ready to become AI-ready?
          </h4>
          <p className="text-sm text-white/70">
            Explore practical guides to solve common business challenges with AI
          </p>
        </div>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => window.location.href = '/ai-ready'}
        >
          Explore AI Solutions
        </Button>
      </div>
    </div>
  );
}
