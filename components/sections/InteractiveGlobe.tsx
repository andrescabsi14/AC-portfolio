'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { projects, allYears, allTags, Project } from '@/data/projects';
import ProjectLightbox from '@/components/ui/ProjectLightbox';
import * as solar from 'solar-calculator';
import * as THREE from 'three';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function InteractiveGlobe() {
  const globeRef = useRef<any>(null);
  const animationRef = useRef<number | null>(null);
  const globeMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showExpandingLight, setShowExpandingLight] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  // Calculate sun position based on current time
  const getSunPosition = (date: Date) => {
    const day = new Date(+date).setUTCHours(0, 0, 0, 0);
    const t = solar.century(date);
    const longitude = ((day - +date) / 864e5) * 360 - 180;
    return {
      lng: longitude - solar.equationOfTime(t) / 4,
      lat: solar.declination(t),
    };
  };

  // Filter projects based on year and tags
  const filteredProjects = projects.filter((project) => {
    const yearMatch = selectedYear === null || project.year === selectedYear;
    const tagMatch =
      selectedTags.length === 0 || selectedTags.some((tag) => project.tags.includes(tag));
    return yearMatch && tagMatch;
  });

  // Setup day-night cycle shader
  useEffect(() => {
    if (!globeReady || !globeRef.current) return;

    const globeMaterial = globeRef.current.globeMaterial();
    if (!globeMaterial) return;

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const dayTexture = textureLoader.load('//unpkg.com/three-globe/example/img/earth-day.jpg');
    const nightTexture = textureLoader.load('//unpkg.com/three-globe/example/img/earth-night.jpg');

    // Create custom shader material
    const customMaterial = new THREE.ShaderMaterial({
      uniforms: {
        dayTexture: { value: dayTexture },
        nightTexture: { value: nightTexture },
        sunPosition: { value: new THREE.Vector2() },
        globeRotation: { value: new THREE.Vector2() },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec2 vUv;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D dayTexture;
        uniform sampler2D nightTexture;
        uniform vec2 sunPosition;
        uniform vec2 globeRotation;

        varying vec3 vNormal;
        varying vec2 vUv;

        #define PI 3.14159265359

        float toRad(float deg) {
          return deg * PI / 180.0;
        }

        vec3 Polar2Cartesian(vec2 c) {
          float theta = toRad(90.0 - c.x);
          float phi = toRad(90.0 - c.y);
          return vec3(sin(phi) * cos(theta), cos(phi), sin(phi) * sin(theta));
        }

        void main() {
          // Rotation matrices for globe rotation
          float rotYAngle = toRad(globeRotation.x);
          float rotXAngle = toRad(globeRotation.y);

          mat3 rotY = mat3(
            cos(rotYAngle), 0.0, sin(rotYAngle),
            0.0, 1.0, 0.0,
            -sin(rotYAngle), 0.0, cos(rotYAngle)
          );

          mat3 rotX = mat3(
            1.0, 0.0, 0.0,
            0.0, cos(rotXAngle), -sin(rotXAngle),
            0.0, sin(rotXAngle), cos(rotXAngle)
          );

          // Calculate sun direction
          vec3 rotatedSunDirection = rotX * rotY * Polar2Cartesian(sunPosition);

          // Calculate lighting intensity
          float intensity = dot(normalize(vNormal), normalize(rotatedSunDirection));

          // Get day and night colors
          vec4 dayColor = texture2D(dayTexture, vUv);
          vec4 nightColor = texture2D(nightTexture, vUv);

          // Blend between day and night
          float blendFactor = smoothstep(-0.1, 0.1, intensity);
          gl_FragColor = mix(nightColor, dayColor, blendFactor);
        }
      `,
    });

    globeMaterialRef.current = customMaterial;

    // Apply custom material to globe
    globeRef.current.globeMaterial(customMaterial);

    // Update sun position based on current time
    const updateSunPosition = () => {
      const now = new Date();
      const sunPos = getSunPosition(now);
      if (globeMaterialRef.current) {
        globeMaterialRef.current.uniforms.sunPosition.value.set(sunPos.lng, sunPos.lat);
      }
    };

    // Initial update
    updateSunPosition();

    // Update sun position every minute
    const interval = setInterval(updateSunPosition, 60000);

    return () => clearInterval(interval);
  }, [globeReady]);

  // Update globe rotation when camera moves
  useEffect(() => {
    if (!globeReady || !globeRef.current) return;

    const updateGlobeRotation = () => {
      const pov = globeRef.current.pointOfView();
      if (globeMaterialRef.current && pov) {
        globeMaterialRef.current.uniforms.globeRotation.value.set(pov.lng || 0, pov.lat || 0);
      }
    };

    // Update on camera change
    const controls = globeRef.current.controls();
    if (controls) {
      controls.addEventListener('change', updateGlobeRotation);
      return () => controls.removeEventListener('change', updateGlobeRotation);
    }
  }, [globeReady]);

  // Auto-rotation effect
  useEffect(() => {
    if (globeRef.current && globeReady && !isSpinning && !selectedProject) {
      let rotationAngle = 0;
      const rotationSpeed = 0.2; // Slow rotation speed

      const animate = () => {
        if (globeRef.current && !isSpinning && !selectedProject) {
          rotationAngle += rotationSpeed;
          const controls = globeRef.current.controls();
          if (controls) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.3;
          }
        }
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [globeReady, isSpinning, selectedProject]);

  // Initial camera position
  useEffect(() => {
    if (globeRef.current && globeReady) {
      globeRef.current.pointOfView({
        lat: 20,
        lng: -40,
        altitude: 2.5,
      }, 1000);

      // Enable auto-rotate and disable zoom
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.3;
        controls.enableZoom = false;
        controls.minDistance = 200;
        controls.maxDistance = 500;
      }
    }
  }, [globeReady]);

  // Handle year selection - focus on a project from that year
  const handleYearSelect = (year: number | null) => {
    setSelectedYear(year === selectedYear ? null : year);

    if (year && globeRef.current) {
      const yearProjects = projects.filter((p) => p.year === year);
      if (yearProjects.length > 0) {
        const project = yearProjects[0];
        globeRef.current.pointOfView(
          {
            lat: project.location.lat,
            lng: project.location.lng,
            altitude: 2,
          },
          1500
        );
      }
    }
  };

  // Handle point click with spinning and expanding light animation
  const handlePointClick = (point: any) => {
    const project = filteredProjects.find((p) => p.id === point.id);
    if (project && globeRef.current) {
      setIsSpinning(true);

      // Stop auto-rotation
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = false;
      }

      // Spin faster
      let spinSpeed = 1;
      const spinInterval = setInterval(() => {
        spinSpeed += 0.5;
        if (spinSpeed > 10) {
          clearInterval(spinInterval);
          // Show expanding light
          setShowExpandingLight(true);
          setIsExpanding(true);

          // Show lightbox after expansion
          setTimeout(() => {
            setSelectedProject(project);
            setIsSpinning(false);
            setShowExpandingLight(false);
          }, 600);
        }
      }, 50);
    }
  };

  // Handle close - fade out and return to rotation
  const handleClose = () => {
    setIsExpanding(false);
    setSelectedProject(null);

    // Resume auto-rotation
    setTimeout(() => {
      if (globeRef.current) {
        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.3;
        }
      }
    }, 500);
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
    size: 0.6,
    color: '#0891b2',
    label: project.title,
  }));

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Globe */}
      <div className="absolute inset-0" style={{ opacity: 1 }}>
        <Globe
          ref={globeRef}
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          pointsData={pointsData}
          pointAltitude={0.01}
          pointRadius="size"
          pointColor="color"
          pointLabel="label"
          onPointClick={handlePointClick}
          onGlobeReady={() => setGlobeReady(true)}
          width={typeof window !== 'undefined' ? window.innerWidth : 1920}
          height={typeof window !== 'undefined' ? window.innerHeight : 1080}
          atmosphereColor="rgba(34, 211, 238, 0.15)"
          atmosphereAltitude={0.15}
        />
      </div>

      {/* Overlay to make stars more subtle */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Expanding Light Overlay */}
      <AnimatePresence>
        {showExpandingLight && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 100, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
          >
            <div className="w-4 h-4 bg-white rounded-full shadow-2xl shadow-cyan-400/50" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Year Filter - Right Side (Smaller) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 space-y-2">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-2"
        >
          {/* All years button */}
          <motion.button
            onClick={() => handleYearSelect(null)}
            whileHover={{ scale: 1.15, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold transition-all backdrop-blur-md shadow-lg ${
              selectedYear === null
                ? 'bg-cyan-400 border-cyan-400 text-black shadow-cyan-400/50'
                : 'bg-black/30 border-white/30 text-white text-xs hover:border-cyan-400 hover:shadow-cyan-400/30'
            }`}
          >
            <span className="text-[10px] font-bold">ALL</span>
          </motion.button>

          {allYears.map((year, index) => (
            <motion.button
              key={year}
              onClick={() => handleYearSelect(year)}
              whileHover={{ scale: 1.15, x: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold transition-all backdrop-blur-md shadow-lg ${
                selectedYear === year
                  ? 'bg-cyan-400 border-cyan-400 text-black shadow-cyan-400/50'
                  : 'bg-black/30 border-white/30 text-white text-xs hover:border-cyan-400 hover:shadow-cyan-400/30'
              }`}
            >
              <span className="text-[11px]">{year}</span>
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
        <div className="flex flex-wrap gap-2 md:gap-3 max-w-4xl px-4 justify-center">
          {allTags.map((tag, index) => (
            <motion.button
              key={tag}
              onClick={() => toggleTag(tag)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.05 }}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all text-sm shadow-lg ${
                selectedTags.includes(tag)
                  ? 'bg-cyan-400 text-black shadow-cyan-400/50'
                  : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:border-cyan-400 hover:shadow-cyan-400/30'
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
        className="absolute top-24 md:top-8 left-8 text-left z-10"
      >
        <motion.p
          className="text-white/80 text-base md:text-lg font-semibold mb-1"
          whileHover={{ scale: 1.05 }}
        >
          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
        </motion.p>
        <p className="text-white/50 text-xs md:text-sm">
          ✨ Click on a point to explore
        </p>
      </motion.div>

      {/* Lightbox */}
      <ProjectLightbox
        project={selectedProject}
        onClose={handleClose}
        isExpanding={isExpanding}
      />
    </div>
  );
}
