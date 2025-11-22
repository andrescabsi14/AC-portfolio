'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import MomentLightbox from '@/components/ui/MomentLightbox';

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

interface Place {
  properties: {
    name: string;
    latitude: number;
    longitude: number;
    pop_max: number;
  };
}

interface GeoJSONData {
  features: Place[];
}

interface GlobeMoment {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
}

// Globe moments with coordinates
const GLOBE_MOMENT_LOCATIONS: GlobeMoment[] = [
  {
    title: 'Bogotá',
    subtitle: 'The origin.',
    description:
      'Where the journey began — growing up in Bogotá, learning to build without permission and think beyond the neighborhood.',
    image: '/images/globe/bogota-origin.jpg',
    lat: 4.7110,
    lng: -74.0055,
  },
  {
    title: 'Dallas',
    subtitle: "The mayor's office.",
    description:
      "A first taste of U.S. civic leadership — conversations inside the mayor's office about cities, innovation, and opportunity.",
    image: '/images/globe/dallas-mayor.jpg',
    lat: 32.7767,
    lng: -96.7970,
  },
  {
    title: 'Detroit',
    subtitle: 'Congressmen, city leaders, and the awakening of a global perspective.',
    description:
      'In Detroit, meetings with congressmen and city leaders expanded a local story into a global mission for impact.',
    image: '/images/globe/detroit-leaders.jpg',
    lat: 42.3314,
    lng: -83.0458,
  },
  {
    title: 'Washington D.C.',
    subtitle: 'The U.S. Department of State, seventh floor.',
    description:
      'On the seventh floor of the State Department, policy, diplomacy, and entrepreneurship collided in a single hallway.',
    image: '/images/globe/washington-state-dept.jpg',
    lat: 38.8951,
    lng: -77.0369,
  },
  {
    title: 'Copenhagen & Aarhus',
    subtitle:
      'Representing the Americas as a DTU Young Influencer at the C40 World Mayors Summit.',
    description:
      'Representing the Americas among mayors, climate leaders, and innovators, shaping conversations about cities and the future.',
    image: '/images/globe/copenhagen-aarhus-c40.jpg',
    lat: 55.6761,
    lng: 12.5683,
  },
  {
    title: 'Lima',
    subtitle: 'The APEC Summit.',
    description:
      'At APEC in Lima, the focus shifted from local startups to the geopolitics of trade, technology, and shared prosperity.',
    image: '/images/globe/lima-apec.jpg',
    lat: -12.0464,
    lng: -77.0428,
  },
  {
    title: 'Spain, Bolivia, Memphis',
    subtitle: 'Entrepreneurship, culture, and the belief that ideas move faster than borders.',
    description:
      'Workshops, talks, and collaborations across three continents proving that good ideas can outrun passports and borders.',
    image: '/images/globe/spain-bolivia-memphis.jpg',
    lat: 40.4637,
    lng: -3.7492,
  },
  {
    title: 'Santa Clara & Silicon Valley',
    subtitle: 'Invited to share approaches to frontier technology.',
    description:
      'In the heart of Silicon Valley, sharing experiments at the edge of AI, Web3, and the next wave of tools for builders.',
    image: '/images/globe/silicon-valley-frontier-tech.jpg',
    lat: 37.3541,
    lng: -121.9552,
  },
  {
    title: 'New York',
    subtitle: 'The city first seen in 2014 from the still-unfinished Hudson Yards.',
    description:
      'Looking over an unfinished Hudson Yards in 2014 and deciding that one day, the work would belong in this skyline.',
    image: '/images/globe/new-york-hudson-yards.jpg',
    lat: 40.7128,
    lng: -74.0060,
  },
];

function WorldExperienceSectionContent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [placesData, setPlacesData] = useState<GeoJSONData | null>(null);
  const [selectedMoment, setSelectedMoment] = useState<GlobeMoment | null>(null);
  const scrollPositionRef = useRef(0);
  const globeEl = useRef<any>(null);

  // Load GeoJSON data
  useEffect(() => {
    fetch('/ne_110m_populated_places_simple.geojson')
      .then((res) => res.json())
      .then((data) => setPlacesData(data));
  }, []);

  const openGlobe = useCallback(() => {
    scrollPositionRef.current = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollPositionRef.current}px`;
    setIsExpanded(true);
  }, []);

  const closeGlobe = useCallback(() => {
    setIsExpanded(false);
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    setTimeout(() => {
      window.scrollTo(0, scrollPositionRef.current);
    }, 0);
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, []);

  // Handle ESC key to close expanded globe view
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isExpanded) {
        closeGlobe();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [isExpanded, closeGlobe]);

  return (
    <>
      <section
        id="world-experience"
        className={`${isExpanded ? 'fixed inset-0 z-50' : 'relative w-full h-screen'} overflow-hidden bg-black snap-start`}
      >
        <div className="absolute inset-0 z-0">
          {placesData && (
            <Globe
              ref={globeEl}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
              labelsData={placesData.features}
              labelLat={(d: any) => d.properties.latitude}
              labelLng={(d: any) => d.properties.longitude}
              labelText={(d: any) => d.properties.name}
              labelSize={(d: any) => Math.sqrt(d.properties.pop_max) * 4e-4}
              labelDotRadius={(d: any) => Math.sqrt(d.properties.pop_max) * 4e-4}
              labelColor={() => 'rgba(255, 165, 0, 0.75)'}
              labelResolution={2}
              // Custom markers for globe moments
              pointsData={GLOBE_MOMENT_LOCATIONS}
              pointLat="lat"
              pointLng="lng"
              pointColor={() => '#ff6b6b'}
              pointAltitude={0.01}
              pointRadius={0.5}
              pointLabel={(d: any) => `
                <div style="
                  background: rgba(0, 0, 0, 0.9);
                  padding: 12px 16px;
                  border-radius: 8px;
                  border: 1px solid rgba(255, 255, 255, 0.2);
                  max-width: 250px;
                ">
                  <div style="
                    font-size: 16px;
                    font-weight: 500;
                    color: white;
                    margin-bottom: 4px;
                  ">${d.title}</div>
                  <div style="
                    font-size: 12px;
                    color: rgba(255, 255, 255, 0.7);
                    font-style: italic;
                  ">${d.subtitle}</div>
                </div>
              `}
              onPointClick={(point: any) => {
                setSelectedMoment(point as GlobeMoment);
              }}
              width={typeof window !== 'undefined' ? window.innerWidth : 1920}
              height={typeof window !== 'undefined' ? window.innerHeight : 1080}
            />
          )}
        </div>

        <motion.div
          className="absolute px-6 text-center z-20 pointer-events-none"
          animate={
            isExpanded
              ? { top: 20, left: '50%', width: '100%', transform: 'translateX(-50%)' }
              : { top: '50%', left: '50%', width: '100%', transform: 'translate(-50%, -50%)' }
          }
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-light text-white mb-4"
            style={{ letterSpacing: '-0.04em' }}
          >
            World Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white-400 font-light mb-8"
          >
            Global impact across continents
          </motion.p>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pointer-events-auto"
            >
              <Button
                onClick={openGlobe}
                className="cursor-pointer backdrop-blur-md bg-white/10 border border-white/30 text-white uppercase tracking-widest font-medium hover:bg-white/20 hover:border-white/50 transition-all"
              >
                Discover My Journey
              </Button>
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={closeGlobe}
              className="fixed cursor-pointer top-6 right-6 z-40 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors pointer-events-auto"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </section>

      {isExpanded && <div className="fixed inset-0 z-40" onClick={closeGlobe} />}

      {/* Moment Lightbox */}
      <MomentLightbox moment={selectedMoment} onClose={() => setSelectedMoment(null)} />
    </>
  );
}

export default function WorldExperienceSection() {
  return <WorldExperienceSectionContent />;
}
