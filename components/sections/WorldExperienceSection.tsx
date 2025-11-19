'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { projects, Project } from '@/data/projects';
import ProjectLightbox from '@/components/ui/ProjectLightbox';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

interface GlobePoint {
  id: string;
  lat: number;
  lng: number;
  size: number;
  color: string;
  label: string;
  isCurrentLocation?: boolean;
}

// Current location (New York)
const CURRENT_LOCATION = {
  lat: 40.7128,
  lng: -74.0060,
  label: 'Current Location: New York',
};

export default function WorldExperienceSection() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Convert projects to globe points
  const projectPoints: GlobePoint[] = projects.map((project) => ({
    id: project.id,
    lat: project.location.lat,
    lng: project.location.lng,
    size: 0.8,
    color: '#06b6d4',
    label: project.title,
    isCurrentLocation: false,
  }));

  // Add current location marker
  const globePoints: GlobePoint[] = [
    ...projectPoints,
    {
      id: 'current-location',
      lat: CURRENT_LOCATION.lat,
      lng: CURRENT_LOCATION.lng,
      size: 1.2,
      color: '#22d3ee',
      label: CURRENT_LOCATION.label,
      isCurrentLocation: true,
    },
  ];

  // Setup globe on mount
  useEffect(() => {
    if (!globeReady || !globeRef.current) return;

    // Set initial camera position
    globeRef.current.pointOfView({ altitude: 2.5 });

    // Configure controls
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = true;
      controls.minDistance = 200;
      controls.maxDistance = 500;
    }
  }, [globeReady]);

  const handlePointClick = (point: GlobePoint) => {
    if (point.isCurrentLocation) return;

    const project = projects.find((p) => p.id === point.id);
    if (project) {
      setSelectedProject(project);
    }
  };

  return (
    <section
      id="world-experience"
      className="relative h-screen w-full overflow-hidden bg-black snap-start"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Video element - you can add your video here */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          style={{ display: 'none' }} // Hidden by default, show when video is added
        >
          {/* <source src="/videos/stars-loop.mp4" type="video/mp4" /> */}
        </video>

        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-blue-900/20 to-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
      </div>

      {/* Pulse animation styles for current location */}
      <style jsx global>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }

        .pulse-marker {
          position: relative;
        }

        .pulse-marker::before,
        .pulse-marker::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid #22d3ee;
          transform: translate(-50%, -50%);
          animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }

        .pulse-marker::after {
          animation-delay: 1s;
        }
      `}</style>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col">
        {/* Title */}
        <div className="pt-24 px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-light text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            World Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 font-light"
          >
            Global impact across continents
          </motion.p>
        </div>

        {/* Globe */}
        <div className="flex-1 relative">
          <Globe
            ref={globeRef}
            onGlobeReady={() => setGlobeReady(true)}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg"
            bumpImageUrl="https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png"
            atmosphereColor="#1e3a8a"
            atmosphereAltitude={0.15}
            pointsData={globePoints}
            pointLat="lat"
            pointLng="lng"
            pointColor={(point: GlobePoint) => point.isCurrentLocation ? '#22d3ee' : '#06b6d4'}
            pointAltitude={0.01}
            pointRadius={(point: GlobePoint) => point.isCurrentLocation ? 1.2 : 0.8}
            pointLabel="label"
            onPointClick={(point) => handlePointClick(point as GlobePoint)}
            pointsMerge={true}
            enablePointerInteraction={true}
            htmlElementsData={globePoints.filter(p => p.isCurrentLocation)}
            htmlElement={(d: GlobePoint) => {
              if (!d.isCurrentLocation) return undefined;
              const el = document.createElement('div');
              el.className = 'pulse-marker';
              el.style.width = '12px';
              el.style.height = '12px';
              el.style.borderRadius = '50%';
              el.style.backgroundColor = '#22d3ee';
              el.style.boxShadow = '0 0 10px #22d3ee, 0 0 20px #22d3ee';
              return el;
            }}
          />
        </div>

        {/* Project Count */}
        {globeReady && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
          >
            <div className="px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
              <p className="text-white/80 text-sm font-light">
                <span className="font-medium text-white">{projects.length}</span> projects across{' '}
                <span className="font-medium text-white">
                  {new Set(projects.map((p) => p.location.country)).size}
                </span>{' '}
                countries
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Project Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectLightbox project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
