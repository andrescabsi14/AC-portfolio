'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Recognition {
  id: number;
  title: string;
  subtitle: string;
  year: number;
  description: string;
  icon: string;
}

const recognitions: Recognition[] = [
  {
    id: 1,
    title: 'Young Leaders of the Americas',
    subtitle: 'U.S. Department of State',
    year: 2016,
    description:
      'Honored as one of 250 exceptional young entrepreneurs from across Latin America and the Caribbean, recognized for innovative leadership and commitment to economic development.',
    icon: '🏆',
  },
  {
    id: 2,
    title: 'DTU Young Influencer',
    subtitle: 'Denmark Technical University',
    year: 2018,
    description:
      'Acknowledged as a young influencer in technology and sustainable innovation, contributing to the advancement of cutting-edge solutions in Northern Europe.',
    icon: '⭐',
  },
];

export default function RecognitionSection() {
  const [selectedRecognition, setSelectedRecognition] = useState<number | null>(null);

  return (
    <section
      id="recognition"
      className="relative min-h-screen w-full overflow-hidden bg-black snap-start flex items-center justify-center"
    >
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black z-10" />
        {/* Placeholder for background */}
        <div className="w-full h-full bg-gradient-to-br from-amber-950/30 via-black to-purple-950/30" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full px-6 py-20">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2
            className="text-6xl md:text-8xl lg:text-9xl font-light text-white mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            Recognition
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 font-light">
            Acknowledged excellence across borders
          </p>
        </motion.div>

        {/* Recognition Cards Grid */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
          {recognitions.map((recognition, index) => (
            <motion.div
              key={recognition.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onHoverStart={() => setSelectedRecognition(recognition.id)}
              onHoverEnd={() => setSelectedRecognition(null)}
              className="group relative"
            >
              <div
                className={`
                  relative h-full p-8 md:p-12 rounded-2xl
                  bg-white/5 backdrop-blur-xl border border-white/10
                  transition-all duration-500 cursor-pointer
                  ${
                    selectedRecognition === recognition.id
                      ? 'bg-white/10 border-white/30 scale-105'
                      : 'hover:bg-white/8 hover:border-white/20'
                  }
                `}
              >
                {/* Icon */}
                <div className="text-6xl md:text-7xl mb-6">{recognition.icon}</div>

                {/* Year Badge */}
                <div className="inline-block px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-6">
                  <span className="text-white font-light text-sm">{recognition.year}</span>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-light text-white mb-3 leading-tight">
                  {recognition.title}
                </h3>

                {/* Subtitle */}
                <p className="text-lg text-gray-400 font-light mb-6">{recognition.subtitle}</p>

                {/* Description */}
                <p className="text-gray-300 font-light leading-relaxed">
                  {recognition.description}
                </p>

                {/* Decorative Corner */}
                <div
                  className={`
                    absolute top-0 right-0 w-24 h-24
                    border-t border-r border-white/20 rounded-tr-2xl
                    transition-all duration-500
                    ${selectedRecognition === recognition.id ? 'border-white/40' : ''}
                  `}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Events */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-light text-white mb-8">Notable Events</h3>

            <div className="space-y-6">
              {/* Richard Branson Meeting */}
              <div className="flex gap-4 pb-6 border-b border-white/10">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-light text-white mb-2">
                    Meeting with Richard Branson
                  </h4>
                  <p className="text-gray-400 font-light">
                    Engaged in meaningful discussions with Sir Richard Branson during the YLAI
                    Fellowship at the U.S. Department of State, exchanging insights on
                    entrepreneurship and innovation.
                  </p>
                </div>
              </div>

              {/* Presidential Summits */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-light text-white mb-2">Presidential Summits</h4>
                  <p className="text-gray-400 font-light">
                    Participated in high-level presidential summits and international conferences,
                    contributing to discussions on technology, innovation, and global economic
                    development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
