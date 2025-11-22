'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import MomentLightbox from '@/components/ui/MomentLightbox';
import * as THREE from 'three';

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
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
  color: string;
  type: 'milestone' | 'event';
}

// Globe moments with coordinates
const GLOBE_MOMENT_LOCATIONS: GlobeMoment[] = [
  {
    id: 'ylai',
    title: 'Washington, D.C.',
    subtitle: 'YLAI Fellowship',
    description: 'Selected as one of 250 exceptional young leaders from Latin America and the Caribbean. Recognized by President Barack Obama at the U.S. Department of State.',
    image: '/photos/certificate/PresidentObamaCertificate.jpg',
    lat: 38.9072,
    lng: -77.0369,
    color: '#ef4444',
    type: 'milestone'
  },
  {
    id: 'dtu',
    title: 'Copenhagen, Denmark',
    subtitle: 'DTU Young Influencer',
    description: 'Acknowledged as a leading voice in sustainable innovation and technology at the C40 World Mayors Summit.',
    image: '/photos/certificate/TechCamp-Bolivia.jpg',
    lat: 55.6761,
    lng: 12.5683,
    color: '#ef4444',
    type: 'milestone'
  },
  {
    id: 'techcamp',
    title: 'La Paz, Bolivia',
    subtitle: 'TechCamp Innovation',
    description: 'Leading digital innovation workshops and fostering cross-border collaboration in technology.',
    image: '/photos/certificate/TechCamp-Bolivia.jpg',
    lat: -16.5000,
    lng: -68.1193,
    color: '#ef4444',
    type: 'milestone'
  },
  {
    id: 'maastricht',
    title: 'Maastricht, Netherlands',
    subtitle: 'AI Research & Development',
    description: 'Advanced research in Artificial Intelligence and agentic workflows.',
    image: '/images/globe/copenhagen-aarhus-c40.jpg', // Placeholder
    lat: 50.8514,
    lng: 5.6910,
    color: '#ef4444',
    type: 'milestone'
  },
  {
    id: 'miami',
    title: 'Miami, USA',
    subtitle: 'Blockchain & AI Hub',
    description: 'Architecting decentralized solutions and enterprise AI systems.',
    image: '/images/globe/new-york-hudson-yards.jpg', // Placeholder
    lat: 25.7617,
    lng: -80.1918,
    color: '#ef4444',
    type: 'milestone'
  },
  // High-Level Events
  {
    id: 'event-europe',
    title: 'European Summit',
    subtitle: 'Strategic Innovation',
    description: 'Collaborating with European tech leaders on future-ready infrastructure.',
    image: '/photos/mlb/IMG_5006.jpeg',
    lat: 48.8566, // Paris
    lng: 2.3522,
    color: '#3b82f6', // Blue for events
    type: 'event'
  },
  {
    id: 'event-asia',
    title: 'Asian Tech Forum',
    subtitle: 'Global Expansion',
    description: 'Bridging markets and technologies across the Pacific.',
    image: '/photos/mlb/IMG_5005.jpeg',
    lat: 35.6762, // Tokyo
    lng: 139.6503,
    color: '#3b82f6',
    type: 'event'
  },
  {
    id: 'event-africa',
    title: 'African Innovation',
    subtitle: 'Emerging Markets',
    description: 'Empowering the next generation of digital builders.',
    image: '/photos/mlb/IMG_4998.jpeg',
    lat: -1.2921, // Nairobi
    lng: 36.8219,
    color: '#3b82f6',
    type: 'event'
  }
];

function WorldExperienceSectionContent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [placesData, setPlacesData] = useState<GeoJSONData | null>(null);
  const [selectedMoment, setSelectedMoment] = useState<GlobeMoment | null>(null);
  const [globeMaterial, setGlobeMaterial] = useState<THREE.Material | null>(null);
  const scrollPositionRef = useRef(0);
  const globeEl = useRef<any>(null);

  // Load GeoJSON data
  useEffect(() => {
    fetch('/ne_110m_populated_places_simple.geojson')
      .then((res) => res.json())
      .then((data) => setPlacesData(data));
  }, []);

  // Load textures and create shader material
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    Promise.all([
      loader.loadAsync('/earthhighday.jpg'),
      loader.loadAsync('/earthhighnight.jpg'),
      loader.loadAsync('/earthcloudshigh.jpg')
    ]).then(([dayTexture, nightTexture, cloudsTexture]) => {
      // Earth Material
      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          dayTexture: { value: dayTexture },
          nightTexture: { value: nightTexture },
          sunDirection: { value: new THREE.Vector3(1, 0.5, 1).normalize() }
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vSunDir;
          uniform vec3 sunDirection;
          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vSunDir = normalize((viewMatrix * vec4(sunDirection, 0.0)).xyz);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D dayTexture;
          uniform sampler2D nightTexture;
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vSunDir;
          void main() {
            vec3 dayColor = texture2D(dayTexture, vUv).rgb;
            vec3 nightColor = texture2D(nightTexture, vUv).rgb;
            float cosineAngleSunToNormal = dot(vNormal, vSunDir);
            float mixAmount = smoothstep(-0.2, 0.2, cosineAngleSunToNormal);
            vec3 color = mix(nightColor, dayColor, mixAmount);
            gl_FragColor = vec4(color, 1.0);
          }
        `
      });
      setGlobeMaterial(shaderMaterial);

      // Cloud Mesh
      if (globeEl.current) {
        const cloudGeometry = new THREE.SphereGeometry(globeEl.current.getGlobeRadius() * 1.005, 75, 75);
        const cloudMaterial = new THREE.MeshPhongMaterial({
          map: cloudsTexture,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide
        });
        const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
        globeEl.current.scene().add(cloudMesh);

        // Animate clouds
        const animateClouds = () => {
          cloudMesh.rotation.y += 0.0005;
          requestAnimationFrame(animateClouds);
        };
        animateClouds();
      }
    });
  }, []);

  const openGlobe = useCallback(() => {
    scrollPositionRef.current = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollPositionRef.current}px`;
    setIsExpanded(true);

    if (globeEl.current) {
      globeEl.current.pointOfView({ altitude: 2.5 }, 1000);
    }
  }, []);

  const closeGlobe = useCallback(() => {
    setIsExpanded(false);
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    setTimeout(() => {
      window.scrollTo(0, scrollPositionRef.current);
    }, 0);

    if (globeEl.current) {
      globeEl.current.pointOfView({ altitude: 0.1 }, 1000);
    }
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

  // Handle rotation and zoom based on expanded state
  useEffect(() => {
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      if (controls) {
        controls.autoRotate = isExpanded;
        controls.autoRotateSpeed = 0.1;
        controls.enableZoom = isExpanded;
        controls.minDistance = isExpanded ? 200 : globeEl.current.getGlobeRadius() * 1.5; // Lock zoom distance if needed
        controls.maxDistance = isExpanded ? 500 : globeEl.current.getGlobeRadius() * 1.5;
        controls.update();
      }
    }
  }, [isExpanded]);

  return (
    <>
      <section
        id="world-experience"
        className={`${isExpanded ? 'fixed inset-0 z-50' : 'relative w-full h-screen'} overflow-hidden bg-black snap-start bg-[url('https://unpkg.com/three-globe/example/img/night-sky.png')] bg-cover bg-center transition-all duration-1000`}
      >
        <div
          className={`absolute inset-0 z-0 transition-all duration-1000 ${!isExpanded ? 'scale-150 blur-sm brightness-50 sepia-[.3]' : 'translate-y-[10%]'}`}
        >
          {/* Royal Blue Overlay */}
          {!isExpanded && (
            <div className="absolute inset-0 z-10 bg-blue-900/20 mix-blend-overlay pointer-events-none" />
          )}

          <div className="absolute inset-0 z-0">
            {placesData && globeMaterial && (
              <Globe
                ref={globeEl}
                globeMaterial={globeMaterial}
                backgroundColor="rgba(0,0,0,0)"
                // Custom markers for globe moments
                objectsData={isExpanded ? GLOBE_MOMENT_LOCATIONS : []}
                objectLat="lat"
                objectLng="lng"
                objectAltitude={0.005}
                objectThreeObject={() => {
                  // Create a pin marker
                  const pinGroup = new THREE.Group();

                  // Pin Head (Sphere)
                  const headGeometry = new THREE.SphereGeometry(1.5, 16, 16);
                  const headMaterial = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
                  const head = new THREE.Mesh(headGeometry, headMaterial);
                  head.position.y = 4;
                  pinGroup.add(head);

                  // Pin Body (Cylinder/Cone)
                  const bodyGeometry = new THREE.CylinderGeometry(0.2, 0, 4, 8);
                  const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
                  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
                  body.position.y = 2;
                  pinGroup.add(body);

                  return pinGroup;
                }}
                objectLabel={(d: any) => `
                  <div style="
                    background: rgba(0, 0, 0, 0.9);
                    padding: 12px 16px;
                    border-radius: 8px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    max-width: 250px;
                    font-family: sans-serif;
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
                onObjectClick={(obj: any) => {
                  setSelectedMoment(obj as GlobeMoment);
                }}
                onGlobeReady={() => {
                  if (globeEl.current) {
                    globeEl.current.controls().autoRotateSpeed = 0.1;
                    // Set initial view to America (approx lat 20, lng -90)
                    // Zoomed in more (altitude 0.05 instead of 0.1)
                    globeEl.current.pointOfView({ lat: 20, lng: -90, altitude: 0.05 });
                  }
                }}
                width={typeof window !== 'undefined' ? window.innerWidth : 1920}
                height={typeof window !== 'undefined' ? window.innerHeight : 1080}
              />
            )}
          </div>

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
      </section >

      {isExpanded && <div className="fixed inset-0 z-40" onClick={closeGlobe} />
      }

      {/* Moment Lightbox */}
      <MomentLightbox moment={selectedMoment} onClose={() => setSelectedMoment(null)} />
    </>
  );
}

export default function WorldExperienceSection() {
  return <WorldExperienceSectionContent />;
}
