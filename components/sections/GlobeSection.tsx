'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function GlobeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const [globeReady, setGlobeReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Transform scroll to globe scale (starts at 1, shrinks to 0.05)
  const globeScale = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0.05]);
  const globeOpacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0]);

  // Transform to white point
  const whitePointScale = useTransform(scrollYProgress, [0.8, 0.85], [0, 1]);
  const whitePointOpacity = useTransform(scrollYProgress, [0.8, 0.85], [0, 1]);


  useEffect(() => {
    if (globeRef.current && globeReady) {
      // Initial camera position
      globeRef.current.pointOfView({
        lat: 4.7110, // Bogota
        lng: -74.0721,
        altitude: 2.5,
      }, 1000);

      // Animate to show the route
      setTimeout(() => {
        if (globeRef.current) {
          globeRef.current.pointOfView({
            lat: 20, // Mid point between Bogota and NYC
            lng: -60,
            altitude: 2,
          }, 3000);
        }
      }, 2000);
    }
  }, [globeReady]);

  // Arc data for flight path
  const arcsData = [
    {
      startLat: 4.7110,
      startLng: -74.0721,
      endLat: 40.7128,
      endLng: -74.0060,
      color: ['#ffffff', '#00ff88'],
    },
  ];

  // Points data
  const pointsData = [
    { lat: 4.7110, lng: -74.0721, size: 0.8, color: '#0891b2', label: 'Bogotá' },
    { lat: 40.7128, lng: -74.0060, size: 0.8, color: '#0891b2', label: 'New York' },
  ];

  return (
    <div ref={sectionRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Globe Container */}
        <motion.div
          style={{
            scale: globeScale,
            opacity: globeOpacity,
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            arcsData={arcsData}
            arcColor="color"
            arcDashLength={0.4}
            arcDashGap={0.2}
            arcDashAnimateTime={3000}
            arcStroke={0.5}
            pointsData={pointsData}
            pointAltitude={0.01}
            pointRadius="size"
            pointColor="color"
            pointLabel="label"
            onGlobeReady={() => setGlobeReady(true)}
            width={typeof window !== 'undefined' ? window.innerWidth : 1920}
            height={typeof window !== 'undefined' ? window.innerHeight : 1080}
          />

          {/* Overlay to make stars more subtle */}
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </motion.div>

        {/* White Point that appears as globe shrinks */}
        <motion.div
          style={{
            scale: whitePointScale,
            opacity: whitePointOpacity,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-4 h-4 bg-white rounded-full" />
        </motion.div>

        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center z-10"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-white">
            The Journey
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            From Bogotá to the World
          </p>
        </motion.div>
      </div>
    </div>
  );
}
