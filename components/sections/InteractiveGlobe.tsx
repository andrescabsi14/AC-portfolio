'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { projects, allYears, allTags, Project } from '@/data/projects';
import ProjectLightbox from '@/components/ui/ProjectLightbox';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function InteractiveGlobe() {
  const globeRef = useRef<any>(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects based on year and tags
  const filteredProjects = projects.filter((project) => {
    const yearMatch = selectedYear === null || project.year === selectedYear;
    const tagMatch =
      selectedTags.length === 0 || selectedTags.some((tag) => project.tags.includes(tag));
    return yearMatch && tagMatch;
  });

  useEffect(() => {
    if (globeRef.current && globeReady) {
      // Set initial camera position
      globeRef.current.pointOfView({
        lat: 20,
        lng: -40,
        altitude: 2.5,
      }, 1000);
    }
  }, [globeReady]);

  const handlePointClick = (point: any) => {
    const project = filteredProjects.find((p) => p.id === point.id);
    if (project) {
      setSelectedProject(project);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Prepare data for globe
  const pointsData = filteredProjects.map((project) => ({
    id: project.id,
    lat: project.location.lat,
    lng: project.location.lng,
    size: 0.8,
    color: '#00ff88',
    label: project.title,
  }));

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Globe */}
      <div className="absolute inset-0">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointsData={pointsData}
          pointAltitude={0.01}
          pointRadius="size"
          pointColor="color"
          pointLabel="label"
          onPointClick={handlePointClick}
          onGlobeReady={() => setGlobeReady(true)}
          width={typeof window !== 'undefined' ? window.innerWidth : 1920}
          height={typeof window !== 'undefined' ? window.innerHeight : 1080}
        />
      </div>

      {/* Year Filter - Left Side */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          {/* All years button */}
          <motion.button
            onClick={() => setSelectedYear(null)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-bold transition-all ${
              selectedYear === null
                ? 'bg-cyan-400 border-cyan-400 text-black'
                : 'bg-black/50 border-white/30 text-white hover:border-cyan-400'
            }`}
          >
            <span className="text-xs">ALL</span>
          </motion.button>

          {allYears.map((year, index) => (
            <motion.button
              key={year}
              onClick={() => setSelectedYear(year === selectedYear ? null : year)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-bold transition-all ${
                selectedYear === year
                  ? 'bg-cyan-400 border-cyan-400 text-black'
                  : 'bg-black/50 border-white/30 text-white hover:border-cyan-400'
              }`}
            >
              {year}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Tag Filter Pills - Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-0 right-0 z-10 flex justify-center"
      >
        <div className="flex flex-wrap gap-3 max-w-4xl px-4 justify-center">
          {allTags.map((tag, index) => (
            <motion.button
              key={tag}
              onClick={() => toggleTag(tag)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.05 }}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedTags.includes(tag)
                  ? 'bg-cyan-400 text-black'
                  : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:border-cyan-400'
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Info text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute top-8 right-8 text-right z-10"
      >
        <p className="text-white/60 text-sm">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
        </p>
        <p className="text-white/40 text-xs mt-1">Click on a point to explore</p>
      </motion.div>

      {/* Lightbox */}
      <ProjectLightbox project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
