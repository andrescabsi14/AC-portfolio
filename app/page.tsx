'use client';

import GlobeSection from '@/components/sections/GlobeSection';
import BikeRevealSection from '@/components/sections/BikeRevealSection';
import TimelineSection from '@/components/sections/TimelineSection';
import YLAISection from '@/components/sections/YLAISection';
import VideoSection from '@/components/sections/VideoSection';
import USFlightMapSection from '@/components/sections/USFlightMapSection';
import BitcoinSection from '@/components/sections/BitcoinSection';
import CryptoLogosSection from '@/components/sections/CryptoLogosSection';
import DenmarkSection from '@/components/sections/DenmarkSection';

export default function Home() {
  return (
    <main className="relative bg-black">
      {/* Section 1-2: Globe with route and shrink animation */}
      <GlobeSection />

      {/* Section 3: White point expands to bike/Calle 85 */}
      <BikeRevealSection />

      {/* Section 4: Horizontal scrolling timeline */}
      <TimelineSection />

      {/* Section 5: YLAI Presidential trip */}
      <YLAISection />

      {/* Section 6: Video section with 2016 AI */}
      <VideoSection />

      {/* Section 7: US flight map */}
      <USFlightMapSection />

      {/* Section 8: Bitcoin flip */}
      <BitcoinSection />

      {/* Section 9: Crypto companies logos */}
      <CryptoLogosSection />

      {/* Section 10: Denmark */}
      <DenmarkSection />

      {/* Footer */}
      <footer className="relative h-screen flex items-center justify-center bg-gradient-to-t from-zinc-900 to-black">
        <div className="text-center space-y-6">
          <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            The Journey Continues
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto px-8">
            This is just the beginning. Every line of code, every challenge overcome,
            every connection made is part of a larger story still being written.
          </p>
        </div>
      </footer>
    </main>
  );
}
