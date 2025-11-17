'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const cryptoCompanies = [
  { name: 'Coinbase', color: 'from-blue-500 to-blue-600' },
  { name: 'Binance', color: 'from-yellow-500 to-orange-500' },
  { name: 'Kraken', color: 'from-purple-500 to-purple-600' },
  { name: 'Ethereum', color: 'from-gray-400 to-gray-600' },
  { name: 'Polygon', color: 'from-purple-600 to-pink-500' },
  { name: 'Chainlink', color: 'from-blue-400 to-blue-600' },
  { name: 'Uniswap', color: 'from-pink-500 to-pink-600' },
  { name: 'Aave', color: 'from-teal-400 to-teal-600' },
];

export default function CryptoLogosSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Create parallax effect for logos
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={sectionRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="w-full max-w-7xl px-8">
          {/* Grid of logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {cryptoCompanies.map((company, index) => (
              <motion.div
                key={index}
                style={{
                  y: index % 2 === 0 ? y1 : y2,
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="relative group"
              >
                {/* Logo container */}
                <div className="relative aspect-square rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden hover:border-zinc-600 transition-all">
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${company.color} opacity-0 group-hover:opacity-20 transition-opacity`}
                  />

                  {/* Company name */}
                  <span className="relative z-10 text-2xl md:text-3xl font-bold text-white">
                    {company.name}
                  </span>

                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${company.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Background animated gradient */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"
        />
      </div>
    </div>
  );
}
