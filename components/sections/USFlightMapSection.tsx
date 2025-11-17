'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function USFlightMapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [globeReady, setGlobeReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const globeOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 1]);

  // Cities data
  const cities = [
    { lat: 40.7357, lng: -74.1724, name: 'Newark', order: 1 },
    { lat: 42.3314, lng: -83.0458, name: 'Detroit', order: 2 },
    { lat: 38.9072, lng: -77.0369, name: 'Washington D.C.', order: 3 },
    { lat: 40.7357, lng: -74.1724, name: 'Newark', order: 4 },
    { lat: 4.7110, lng: -74.0721, name: 'Bogotá', order: 5 },
  ];

  // Create arcs for the flight routes
  const arcsData = [
    {
      startLat: cities[0].lat,
      startLng: cities[0].lng,
      endLat: cities[1].lat,
      endLng: cities[1].lng,
      color: ['#00ff88', '#00ffff'],
    },
    {
      startLat: cities[1].lat,
      startLng: cities[1].lng,
      endLat: cities[2].lat,
      endLng: cities[2].lng,
      color: ['#00ffff', '#ff00ff'],
    },
    {
      startLat: cities[2].lat,
      startLng: cities[2].lng,
      endLat: cities[3].lat,
      endLng: cities[3].lng,
      color: ['#ff00ff', '#ffff00'],
    },
    {
      startLat: cities[3].lat,
      startLng: cities[3].lng,
      endLat: cities[4].lat,
      endLng: cities[4].lng,
      color: ['#ffff00', '#00ff88'],
    },
  ];

  const pointsData = cities.map((city) => ({
    lat: city.lat,
    lng: city.lng,
    size: 0.5,
    color: '#00ff88',
    label: city.name,
  }));

  return (
    <div ref={sectionRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ opacity: globeOpacity }}
          className="w-full h-full"
        >
          <Globe
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            arcsData={arcsData}
            arcColor="color"
            arcDashLength={0.4}
            arcDashGap={0.2}
            arcDashAnimateTime={2000}
            arcStroke={0.6}
            pointsData={pointsData}
            pointAltitude={0.01}
            pointRadius="size"
            pointColor="color"
            pointLabel="label"
            onGlobeReady={() => {
              setGlobeReady(true);
            }}
            width={typeof window !== 'undefined' ? window.innerWidth : 1920}
            height={typeof window !== 'undefined' ? window.innerHeight : 1080}
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-20 left-0 right-0 text-center z-10"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white">
            The American Journey
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mt-4">
            Newark → Detroit → Washington → Newark → Bogotá
          </p>
        </motion.div>
      </div>
    </div>
  );
}
