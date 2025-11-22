'use client';

import { useCallback, useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { projects, Project } from '@/data/projects';
import ProjectLightbox from '@/components/ui/ProjectLightbox';
import { Button } from '@/components/ui/button';
import { AdminControlPanel } from '@/components/ui/AdminControlPanel';
import { GlobeConfigProvider, useGlobeConfig } from '@/contexts/GlobeConfigContext';
import { GlobeProvider } from './context/GlobeContext';
import { Earth } from './components/Earth';
import { Atmosphere, OuterGlow } from './components/Atmosphere';
import { CloudLayer } from './components/CloudLayer';
import { StarsParallax } from './components/Stars';
import { MarkerSphere, MarkersGroup, CurrentLocationPulse } from './components/Markers';
import { CameraController } from './components/Camera';
import { calculateSunPosition, getMarkerTransform, getTimeRatio, normalizeHexColor } from './utils';
import { ADMIN, CURRENT_LOCATION, GLOBE_MOMENT_LOCATIONS, GLOBE_CONFIG } from './constants';

function WorldExperienceSectionContent() {
  const { config } = useGlobeConfig();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [globeLoadedOnce, setGlobeLoadedOnce] = useState(false);
  const [sunPhase, setSunPhase] = useState('day');
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState(() => getTimeRatio());
  const controlsRef = useRef<any>(null);
  const globeMeshRef = useRef<THREE.Mesh>(null);
  const scrollPositionRef = useRef(0);

  // Memoize project markers
  const projectMarkers = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      transform: getMarkerTransform(project.location.lat, project.location.lng, config.markerDistanceFromGlobe, config.markerLineHeight),
    }));
  }, [config.markerDistanceFromGlobe, config.markerLineHeight]);

  // Memoize moment markers
  const momentMarkers = useMemo(() => {
    return GLOBE_MOMENT_LOCATIONS.map((location, index) => ({
      ...location,
      id: `moment-${index}`,
      transform: getMarkerTransform(location.lat, location.lng, config.markerDistanceFromGlobe, config.markerLineHeight),
    }));
  }, [config.markerDistanceFromGlobe, config.markerLineHeight]);

  // Globe position (dynamic when expanded)
  const dynamicGlobePositionX = isExpanded ? config.globePositionX : 0;
  const dynamicGlobePositionY = isExpanded ? config.globePositionY : 0;
  const dynamicGlobePositionZ = isExpanded ? config.globePositionZ : 0;

  // Handlers
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

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleGlobeLoaded = () => {
    setGlobeLoadedOnce(true);
  };

  // Update sun position
  useEffect(() => {
    const updateSunPosition = () => {
      const sunData = calculateSunPosition(CURRENT_LOCATION.lat, CURRENT_LOCATION.lng, new Date());
      setSunPhase(sunData.phase);
      setPhaseProgress(sunData.phaseProgress ?? 0);
    };

    updateSunPosition();
    const interval = setInterval(updateSunPosition, 60000);
    return () => clearInterval(interval);
  }, []);

  // Update time of day
  useEffect(() => {
    const updateTime = () => setTimeOfDay(getTimeRatio());
    const timer = setInterval(updateTime, 60_000);
    return () => clearInterval(timer);
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, []);

  return (
    <>
      <section
        id="world-experience"
        className={`${isExpanded ? 'fixed inset-0 z-50' : 'relative w-full h-screen'} overflow-hidden bg-black snap-start`}
      >
        {/* Background gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_90%_at_50%_50%,_rgba(20,50,120,0.4),_rgba(0,0,0,1))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(30,80,180,0.15),_transparent_60%)]" />
        </div>

        <div className="relative z-10 w-full flex flex-col h-full">
          <div className="relative w-full h-full">
            {/* 3D Canvas */}
            <Canvas
              camera={{ position: [0, 0, 0.8], fov: 45 }}
              className="absolute inset-0 w-full h-full"
              style={{
                filter: isExpanded ? GLOBE_CONFIG.expanded.filter : GLOBE_CONFIG.notExpanded.filter,
              }}
              gl={{ antialias: true, alpha: false }}
            >
              <GlobeProvider globeRef={globeMeshRef}>
                <ambientLight intensity={isExpanded ? config.ambientLightIntensity : 0.2} />
                <directionalLight position={[5, 5, 5]} intensity={isExpanded ? config.directionalLightIntensity : 0.7} />

                {isExpanded && <StarsParallax visibility={config.starVisibility} />}

                <Suspense fallback={null}>
                  <Earth
                    onLoaded={handleGlobeLoaded}
                    scale={config.globeScale}
                    timeOfDay={timeOfDay}
                    isExpanded={isExpanded}
                    sunPhase={sunPhase}
                    phaseProgress={phaseProgress}
                    meshRef={globeMeshRef}
                    terminatorSoftness={config.terminatorSoftness}
                    lightDir={new THREE.Vector3(config.lightDir.x, config.lightDir.y, config.lightDir.z)}
                    rotationSpeed={config.rotationSpeed}
                    segments={config.globeSegments}
                    blur={config.globeBlur}
                    positionX={dynamicGlobePositionX}
                    positionY={dynamicGlobePositionY}
                    positionZ={dynamicGlobePositionZ}
                  />

                  <CloudLayer
                    opacity={config.cloudOpacity}
                    scale={config.cloudScale}
                    positionX={config.cloudPositionX}
                    positionY={config.cloudPositionY}
                    positionZ={config.cloudPositionZ}
                    blur={config.cloudBlur}
                    rotationSpeed={config.rotationSpeed}
                  />

                  {isExpanded && (
                    <Atmosphere
                      color={config.atmosphereColor}
                      intensity={config.atmosphereIntensity}
                      scale={config.atmosphereScale}
                      positionX={config.atmospherePositionX}
                      positionY={config.atmospherePositionY}
                      positionZ={config.atmospherePositionZ}
                      blur={config.atmosphereBlur}
                      glow={config.atmosphereGlow}
                      terminatorSoftness={config.terminatorSoftness}
                    />
                  )}

                  {isExpanded && (
                    <OuterGlow
                      color={config.glowColor}
                      intensity={config.glowIntensity}
                      scale={config.glowScale}
                      positionX={config.glowPositionX}
                      positionY={config.glowPositionY}
                      positionZ={config.glowPositionZ}
                    />
                  )}

                  {/* Markers */}
                  {isExpanded && globeLoadedOnce && (
                    <MarkersGroup>
                      <group scale={[1.1, 1.1, 1.1]}>
                        {/* Project markers */}
                        <group>
                          {projectMarkers.map((marker) => (
                            <group key={marker.id}>
                              <mesh
                                position={marker.transform.position}
                                quaternion={marker.transform.quaternion}
                              >
                                <cylinderGeometry args={[config.markerCylinderBaseRadius, config.markerCylinderBaseRadius, marker.transform.height, 8]} />
                                <meshStandardMaterial
                                  color={normalizeHexColor(config.projectMarkerCylinderColor)}
                                  emissive={normalizeHexColor(config.projectMarkerCylinderEmissive)}
                                  emissiveIntensity={0.7}
                                />
                              </mesh>
                              <MarkerSphere
                                position={marker.transform.tipPosition}
                                color={config.projectMarkerColor}
                                emissiveColor={config.projectMarkerEmissive}
                                size={config.projectMarkerTipRadius}
                                metalness={config.projectMarkerMetalness}
                                roughness={config.projectMarkerRoughness}
                                segments={config.projectMarkerSegments}
                                hoverColor={config.projectMarkerHoverColor}
                                hoverEmissiveColor={config.projectMarkerHoverEmissive}
                                onClick={() => handleProjectSelect(marker)}
                              />
                            </group>
                          ))}
                        </group>

                        {/* Moment markers */}
                        <group>
                          {momentMarkers.map((marker) => (
                            <group key={marker.id}>
                              <mesh
                                position={marker.transform.position}
                                quaternion={marker.transform.quaternion}
                              >
                                <cylinderGeometry args={[config.markerCylinderBaseRadius, config.markerCylinderBaseRadius, marker.transform.height, 8]} />
                                <meshStandardMaterial
                                  color={normalizeHexColor(config.momentMarkerCylinderColor)}
                                  emissive={normalizeHexColor(config.momentMarkerCylinderEmissive)}
                                  emissiveIntensity={0.6}
                                />
                              </mesh>
                              <MarkerSphere
                                position={marker.transform.tipPosition}
                                color={config.momentMarkerColor}
                                emissiveColor={config.momentMarkerEmissive}
                                size={config.momentMarkerTipRadius}
                                metalness={config.momentMarkerMetalness}
                                roughness={config.momentMarkerRoughness}
                                segments={config.momentMarkerSegments}
                                hoverColor={config.momentMarkerHoverColor}
                                hoverEmissiveColor={config.momentMarkerHoverEmissive}
                              />
                            </group>
                          ))}
                        </group>

                        <CurrentLocationPulse
                          color={config.currentLocationColor}
                          pulseSize={config.currentLocationPulseSize}
                          pulseSpeed={config.currentLocationPulseSpeed}
                          visibility={config.currentLocationVisibility}
                        />
                      </group>
                    </MarkersGroup>
                  )}
                </Suspense>

                <CameraController isExpanded={isExpanded} config={GLOBE_CONFIG} />
                <OrbitControls
                  ref={controlsRef}
                  enablePan={false}
                  enableZoom={false}
                  enableRotate={false}
                  autoRotate={false}
                  autoRotateSpeed={0}
                  minDistance={2.0}
                  maxDistance={8.0}
                />
              </GlobeProvider>
            </Canvas>

            {/* Dotted Overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(0,0,0,var(--dotted-overlay-opacity, 0.25)) 1.5px, transparent 1.5px)`,
                backgroundSize: '4px 4px',
              }}
              animate={{ opacity: isExpanded ? GLOBE_CONFIG.expanded.dottedOpacity : GLOBE_CONFIG.notExpanded.dottedOpacity }}
              transition={{ duration: isExpanded ? GLOBE_CONFIG.expanded.overlayDuration : GLOBE_CONFIG.notExpanded.overlayDuration, ease: 'easeInOut' }}
            />

            {/* Dark Overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-5 bg-black"
              animate={{ opacity: isExpanded ? GLOBE_CONFIG.expanded.darkOpacity : GLOBE_CONFIG.notExpanded.darkOpacity }}
              transition={{ duration: isExpanded ? GLOBE_CONFIG.expanded.overlayDuration : GLOBE_CONFIG.notExpanded.overlayDuration, ease: 'easeInOut' }}
            />

            {/* Title and CTA */}
            <motion.div
              className="absolute px-6 text-center z-20"
              animate={isExpanded ? { top: 20, left: '50%', width: '100%', transform: 'translateX(-50%)' } : { top: '50%', left: '50%', width: '100%', transform: 'translate(-50%, -50%)' }}
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
              {globeLoadedOnce && !isExpanded && (
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

            {/* Close button */}
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

            {/* Admin Control Panel */}
            {ADMIN && <AdminControlPanel isExpanded={isExpanded} />}
          </div>

          {/* Project Lightbox */}
          <AnimatePresence>
            {selectedProject && (
              <ProjectLightbox project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Backdrop for closing globe */}
      {isExpanded && (
        <div className="fixed inset-0 z-40" onClick={closeGlobe} />
      )}
    </>
  );
}

export default function WorldExperienceSection() {
  return (
    <GlobeConfigProvider>
      <WorldExperienceSectionContent />
    </GlobeConfigProvider>
  );
}
