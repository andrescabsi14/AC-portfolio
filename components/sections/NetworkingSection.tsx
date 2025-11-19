'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
      className="relative min-h-screen w-full overflow-hidden bg-black snap-start py-20"
    >
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black z-10" />
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
            className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            Networking
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-light">
            Building bridges across continents
          </p>
        </motion.div>

        {/* Cards Grid - Show all events */}
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {networkingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-300 border-cyan-500/20">
                        {event.year}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-light text-white leading-tight mb-2">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-light">
                      {event.organization}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
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
                      <span className="font-light">{event.location}</span>
                    </div>
                    <p className="text-gray-300 font-light text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
