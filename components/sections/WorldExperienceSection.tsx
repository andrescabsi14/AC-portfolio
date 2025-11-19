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
}

export default function WorldExperienceSection() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Convert projects to globe points
  const globePoints: GlobePoint[] = projects.map((project) => ({
    id: project.id,
    lat: project.location.lat,
    lng: project.location.lng,
    size: 0.8,
    color: '#ffffff',
    label: project.title,
  }));

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
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
        <div className="w-full h-full bg-black" />
      </div>

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
            atmosphereColor="#ffffff"
            atmosphereAltitude={0.15}
            pointsData={globePoints}
            pointLat="lat"
            pointLng="lng"
            pointColor="color"
            pointAltitude={0.01}
            pointRadius="size"
            pointLabel="label"
            onPointClick={(point) => handlePointClick(point as GlobePoint)}
            pointsMerge={true}
            enablePointerInteraction={true}
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
