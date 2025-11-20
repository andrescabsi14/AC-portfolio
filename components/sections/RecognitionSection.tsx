'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Recognition {
  id: number;
  title: string;
  subtitle: string;
  year: number;
  description: string;
  image: string;
}

const recognitions: Recognition[] = [
  {
    id: 1,
    title: 'Young Leaders of the Americas',
    subtitle: 'Certificate from President of the United States Barack Obama',
    year: 2016,
    description:
      'Honored as one of 250 exceptional young entrepreneurs from across Latin America and the Caribbean. This certificate was awarded by President Barack Obama in recognition of innovative leadership and commitment to economic development through the Young Leaders of the Americas Initiative (YLAI).',
    image: '/photos/certificate/PresidentObamaCertificate.jpg',
  },
  {
    id: 2,
    title: 'DTU Young Influencer',
    subtitle: 'C40 World\'s Mayor Summit',
    year: 2018,
    description:
      'Acknowledged as a young influencer in technology and sustainable innovation, contributing to the advancement of cutting-edge solutions in Northern Europe.',
    image: '/photos/certificate/TechCamp-Bolivia.jpg',
  },
];

const notableEvents = [
  {
    id: 1,
    title: 'Meeting with Richard Branson',
    icon: '🚀',
    description:
      'Engaged in meaningful discussions with Sir Richard Branson during the YLAI Fellowship at the U.S. Department of State, exchanging insights on entrepreneurship and innovation.',
    gradient: 'from-red-500/20 to-orange-500/20',
    borderColor: 'border-red-500/30',
  },
  {
    id: 2,
    title: 'Presidential Summits',
    icon: '🌍',
    description:
      'Participated in high-level presidential summits and international conferences, contributing to discussions on technology, innovation, and global economic development.',
    gradient: 'from-blue-500/20 to-purple-500/20',
    borderColor: 'border-blue-500/30',
  },
];

export default function RecognitionSection() {
  const [selectedRecognition, setSelectedRecognition] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState<number | null>(null);

  return (
    <section
      id="recognition"
      className="relative min-h-screen w-full overflow-hidden bg-black snap-start flex items-center justify-center py-20"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black z-10" />
        <div className="w-full h-full bg-gradient-to-br from-amber-950/30 via-black to-purple-950/30" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            Recognition
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 font-light">
            Acknowledged excellence across borders
          </p>
        </motion.div>

        {/* Recognition Cards Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {recognitions.map((recognition, index) => (
              <motion.div
                key={recognition.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                onHoverStart={() => setSelectedRecognition(recognition.id)}
                onHoverEnd={() => setSelectedRecognition(null)}
              >
                <Card
                  className={`
                    bg-white/5 backdrop-blur-xl border-white/10 h-full
                    transition-all duration-500 cursor-pointer overflow-hidden
                    ${
                      selectedRecognition === recognition.id
                        ? 'bg-white/10 border-white/30 scale-105'
                        : 'hover:bg-white/8 hover:border-white/20'
                    }
                  `}
                  onClick={() => setLightboxOpen(recognition.id)}
                >
                  <div className="relative">
                    {/* Image with Gradient Overlay */}
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={recognition.image}
                        alt={recognition.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% via-black/20 via-70% to-black/80" />
                    </div>
                  </div>
                  <CardHeader className="pb-8">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-amber-300 mb-2">
                          {recognition.year}
                        </p>
                        <CardTitle className="text-2xl md:text-3xl font-light text-white leading-tight">
                          {recognition.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-sm text-gray-400 font-light">
                        {recognition.subtitle}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Notable Events */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-5xl mx-auto"
          >
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-light text-white">
                  Notable Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {notableEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      className={`
                        flex gap-4 ${
                          index < notableEvents.length - 1 ? 'pb-6 border-b border-white/10' : ''
                        }
                      `}
                    >
                      <div
                        className={`
                          flex-shrink-0 w-12 h-12 rounded-full
                          bg-gradient-to-br ${event.gradient}
                          border ${event.borderColor}
                          flex items-center justify-center
                        `}
                      >
                        <span className="text-2xl">{event.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-light text-white mb-2">{event.title}</h4>
                        <p className="text-gray-400 font-light leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLightboxOpen(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-2xl mx-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {recognitions.map((recognition) => {
              if (recognition.id !== lightboxOpen) return null;
              return (
                <div key={recognition.id} className="space-y-4">
                  <div>
                    <h2 className="text-4xl font-light text-white mb-2">
                      {recognition.title}
                    </h2>
                    <p className="text-xl text-gray-300">
                      {recognition.subtitle}
                    </p>
                  </div>
                  <p className="text-gray-300 font-light leading-relaxed text-lg">
                    {recognition.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
