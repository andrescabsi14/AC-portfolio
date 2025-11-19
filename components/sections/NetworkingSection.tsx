'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NetworkEvent {
  id: number;
  title: string;
  organization: string;
  year: number;
  location: string;
  description: string;
  image?: string;
}

const networkingEvents: NetworkEvent[] = [
  {
    id: 1,
    title: 'Young Leaders of the Americas Initiative',
    organization: 'U.S. Department of State',
    year: 2016,
    location: 'Washington, D.C.',
    description:
      'Selected as one of 250 young entrepreneurs from Latin America and the Caribbean to participate in an intensive leadership program.',
  },
  {
    id: 2,
    title: 'DTU Young Influencer Recognition',
    organization: 'Denmark Technical University',
    year: 2018,
    location: 'Copenhagen, Denmark',
    description:
      'Recognized as a young influencer in technology and innovation, contributing to the advancement of sustainable solutions.',
  },
  {
    id: 3,
    title: 'Presidential Summit',
    organization: 'Government Leadership',
    year: 2019,
    location: 'International',
    description:
      'Participated in high-level presidential summits focusing on innovation, technology, and economic development.',
  },
  {
    id: 4,
    title: 'Meeting with Richard Branson',
    organization: 'Virgin Group',
    year: 2016,
    location: 'U.S. Department of State',
    description:
      'Engaged in discussions with entrepreneur Richard Branson during the YLAI program, exchanging insights on innovation and entrepreneurship.',
  },
  {
    id: 5,
    title: 'C40 World Mayors Summit',
    organization: 'C40 Cities',
    year: 2019,
    location: 'Copenhagen, Denmark',
    description:
      'Contributed to discussions on climate action and sustainable urban development with global city leaders.',
  },
];

export default function NetworkingSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = networkingEvents.length - 1;
      if (newIndex >= networkingEvents.length) newIndex = 0;
      return newIndex;
    });
  };

  const currentEvent = networkingEvents[currentIndex];

  return (
    <section
      id="networking"
      className="relative h-screen w-full overflow-hidden bg-black snap-start"
    >
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black z-10" />
        {/* Placeholder for background image */}
        <div className="w-full h-full bg-gradient-to-br from-blue-950 via-black to-purple-950" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-6xl md:text-8xl font-light text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            Networking
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-light">
            Building bridges across continents
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative max-w-5xl mx-auto w-full">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12">
                <div className="space-y-6">
                  {/* Year Badge */}
                  <div className="inline-block px-4 py-2 bg-white/10 rounded-full border border-white/20">
                    <span className="text-white font-light text-sm">{currentEvent.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-5xl font-light text-white leading-tight">
                    {currentEvent.title}
                  </h3>

                  {/* Organization & Location */}
                  <div className="flex flex-wrap gap-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span className="font-light">{currentEvent.organization}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="font-light">{currentEvent.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-lg font-light leading-relaxed">
                    {currentEvent.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group"
            aria-label="Previous"
          >
            <svg
              className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group"
            aria-label="Next"
          >
            <svg
              className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-12">
          {networkingEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-8' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
