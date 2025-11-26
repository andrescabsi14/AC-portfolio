'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import GlassButton from '@/components/ui/GlassButton';
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
  type: 'milestone' | 'event' | 'project';
}

// Globe moments with coordinates
const GLOBE_MOMENT_LOCATIONS: GlobeMoment[] = [
  // Milestones (Red)
  {
    id: 'ylai',
    title: 'Washington, D.C.',
    subtitle: 'YLAI Fellowship',
    description: 'Selected by the U.S. Department of State as one of 250 exceptional young leaders. Recognized by President Obama.',
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
    description: 'Selected as a Young Influencer by Denmark Technical University for the C40 World Mayors Summit.',
    image: '/photos/certificate/TechCamp-Bolivia.jpg', // Placeholder
    lat: 55.6761,
    lng: 12.5683,
    color: '#ef4444',
    type: 'milestone'
  },
  {
    id: 'innovators',
    title: 'Mexico City',
    subtitle: 'MIT Technology Review',
    description: 'Innovators Under 35 - Recognition for technological impact in the region.',
    image: '/photos/innovators35.jpg',
    lat: 19.4326,
    lng: -99.1332,
    color: '#ef4444',
    type: 'milestone'
  },

  // High-Level Events (Gold)
  {
    id: 'apec',
    title: 'Lima, Peru',
    subtitle: 'APEC Summit',
    description: 'Delegate at the Asia-Pacific Economic Cooperation summit, discussing trade and technology.',
    image: '/photos/Obama-Lima-TownHall.jpg',
    lat: -12.0464,
    lng: -77.0428,
    color: '#D4AF37', // Gold
    type: 'event'
  },
  {
    id: 'ges',
    title: 'Silicon Valley',
    subtitle: 'Global Entrepreneurship Summit',
    description: 'Selected delegate for the Global Entrepreneurship Summit hosted at Stanford University.',
    image: '/photos/mlb/IMG_5006.jpeg', // Placeholder
    lat: 37.4275,
    lng: -122.1697,
    color: '#D4AF37',
    type: 'event'
  },
  {
    id: 'michigan',
    title: 'Ann Arbor, MI',
    subtitle: 'University of Michigan',
    description: 'Fellowship and collaboration on social impact and innovation ecosystems.',
    image: '/photos/mlb/IMG_5005.jpeg', // Placeholder
    lat: 42.2808,
    lng: -83.7430,
    color: '#D4AF37',
    type: 'event'
  },
  {
    id: 'techcamp',
    title: 'La Paz, Bolivia',
    subtitle: 'TechCamp',
    description: 'Digital innovation workshops fostering cross-border collaboration.',
    image: '/photos/certificate/TechCamp-Bolivia.jpg',
    lat: -16.5000,
    lng: -68.1193,
    color: '#D4AF37',
    type: 'event'
  },
  {
    id: 'maastricht',
    title: 'Maastricht, Netherlands',
    subtitle: 'AI Research',
    description: 'Advanced research in Artificial Intelligence and agentic workflows.',
    image: '/images/globe/copenhagen-aarhus-c40.jpg', // Placeholder
    lat: 50.8514,
    lng: 5.6910,
    color: '#D4AF37',
    type: 'event'
  },

  // Projects (Cyan/Teal)
  {
    id: 'astra-code',
    title: 'Rome, Italy',
    subtitle: 'Astra Code',
    description: 'Leading the development of advanced AI solutions for the Italian market.',
    image: '/images/globe/copenhagen-aarhus-c40.jpg', // Placeholder
    lat: 41.9028,
    lng: 12.4964,
    color: '#06b6d4', // Cyan
    type: 'project'
  },
  {
    id: 'san-diego',
    title: 'San Diego, USA',
    subtitle: 'Strategic Project',
    description: 'Spearheading innovative technology initiatives in Southern California.',
    image: '/images/globe/new-york-hudson-yards.jpg', // Placeholder
    lat: 32.7157,
    lng: -117.1611,
    color: '#06b6d4', // Cyan
    type: 'project'
  }
];

// Sun direction constant - used for both surface lighting and atmosphere
const SUN_DIRECTION = new THREE.Vector3(-1, 0, 0.2).normalize();

// Atmosphere distance from globe surface (1.05 = 5% larger than globe)
const ATMOSPHERE_RADIUS_MULTIPLIER = 1;

function WorldExperienceSectionContent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [placesData, setPlacesData] = useState<GeoJSONData | null>(null);
  const [selectedMoment, setSelectedMoment] = useState<GlobeMoment | null>(null);
  const [globeMaterial, setGlobeMaterial] = useState<THREE.Material | null>(null);
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const scrollPositionRef = useRef(0);
  const globeEl = useRef<any>(null);
  const atmosphereRef = useRef<THREE.Mesh | null>(null);

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
      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          dayTexture: { value: dayTexture },
          nightTexture: { value: nightTexture },
          sunDirection: { value: SUN_DIRECTION } // Sun from left-front
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform sampler2D dayTexture;
          uniform sampler2D nightTexture;
          uniform vec3 sunDirection;
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            // Day/night lighting
            float intensity = dot(vNormal, sunDirection);
            vec4 dayColor = texture2D(dayTexture, vUv);
            vec4 nightColor = texture2D(nightTexture, vUv);
            vec4 baseColor = mix(nightColor, dayColor, smoothstep(-0.2, 0.2, intensity));
            
            // Rim light on sunlit edge
            vec3 viewDir = normalize(vViewPosition);
            float rimDot = 1.0 - max(0.0, dot(viewDir, vNormal));
            float sunAlignment = max(0.0, dot(vNormal, sunDirection));
            float rimIntensity = pow(rimDot, 3.0) * sunAlignment;
            vec3 rimColor = vec3(0.6, 1, 3.0) * rimIntensity * 0.5; // Glow intensity on the globe glow
            
            gl_FragColor = vec4(baseColor.rgb + rimColor, 1.0);
          }
        `
      });
      setGlobeMaterial(shaderMaterial);
    });
  }, []);

  const handleExpand = () => {
    scrollPositionRef.current = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollPositionRef.current}px`;
    setIsExpanded(true);

    if (globeEl.current) {
      globeEl.current.pointOfView({ altitude: 2.5 }, 1000);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setSelectedMoment(null);
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    setTimeout(() => {
      window.scrollTo({ top: scrollPositionRef.current, behavior: 'smooth' });
    }, 100);

    if (globeEl.current) {
      globeEl.current.pointOfView({ altitude: 0.1 }, 1000);
    }
  };

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
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [isExpanded]);

  // Control rotation
  useEffect(() => {
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      controls.autoRotate = true; // Always rotate
      controls.autoRotateSpeed = 0.3; // Slightly faster rotation

      // Disable zoom when not expanded
      controls.enableZoom = isExpanded;
      if (!isExpanded) {
        controls.minDistance = 150; // Lock zoom
        controls.maxDistance = 150;
      } else {
        controls.minDistance = 100; // Allow zoom
        controls.maxDistance = 400;
      }
    }
  }, [isExpanded]);

  // Initialize globe when ready (more reliable than onGlobeReady callback)
  useEffect(() => {
    if (!isGlobeReady || !globeEl.current || atmosphereRef.current) {
      return;
    }

    try {
      console.log('Initializing globe...');

      // Create custom atmosphere glow
      const atmosphereGeometry = new THREE.SphereGeometry(100 * ATMOSPHERE_RADIUS_MULTIPLIER, 64, 64);
      const atmosphereMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vec3 viewDirection = normalize(cameraPosition - vPosition);
            float rim = 1.0 - abs(dot(vNormal, viewDirection));
            rim = pow(rim, 2.5);
            vec3 normalizedPos = normalize(vPosition);
            float rightSide = smoothstep(-0.8, 0.2, normalizedPos.x);
            float glow = rim * (0.3 + 0.7 * rightSide);
            vec3 glowColor = vec3(0.7, 0.7, 1.0); // Earth's blue atmosphere
            gl_FragColor = vec4(glowColor, glow * 0.8);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false
      });

      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      atmosphereRef.current = atmosphere;
      globeEl.current.scene().add(atmosphere);

      // Apply Earth's axial tilt
      const scene = globeEl.current.scene();
      scene.rotation.z = THREE.MathUtils.degToRad(23.5);

      // Set up controls
      const controls = globeEl.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;
      controls.enableZoom = false;

      // Set initial view
      globeEl.current.pointOfView({ lat: 0, lng: -90, altitude: 2 });

      console.log('Globe initialized successfully');
    } catch (error) {
      console.error('Error initializing globe:', error);
    }
  }, [isGlobeReady]);

  return (
    <>
      <section id="world-experience" className="relative h-screen w-full bg-black-70 overflow-hidden">
        {/* Background Stars - Ensure z-index allows visibility */}
        <div className="absolute inset-0 bg-[url('https://unpkg.com/three-globe/example/img/night-sky.png')] opacity-20 brightness-30 pointer-events-none z-0" />

        {/* Blinking Stars Effect */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="stars-small"></div>
          <div className="stars-medium"></div>
          <div className="stars-large"></div>
        </div>

        <div className="absolute inset-0 z-10" style={{ overflow: 'hidden' }}>
          {placesData && globeMaterial && (
            <Globe
              ref={globeEl}
              globeMaterial={globeMaterial}
              backgroundColor="rgba(0,0,0,1)"
              objectsData={[
                {
                  type: 'cloud',
                  radius: 1.1
                },
                ...(isExpanded ? GLOBE_MOMENT_LOCATIONS : [])
              ]}
              objectLat="lat"
              objectLng="lng"
              objectAltitude={0.75}
              objectThreeObject={(d: any) => {
                if (d.type === 'cloud') {
                  const loader = new THREE.TextureLoader();
                  const cloudsTexture = loader.load('/earthcloudshigh.jpg');
                  const geometry = new THREE.SphereGeometry(d.radius * 100, 64, 64);
                  const material = new THREE.MeshPhongMaterial({
                    map: cloudsTexture,
                    transparent: true,
                    opacity: 0.7,
                    blending: THREE.AdditiveBlending,
                    side: THREE.DoubleSide
                  });
                  const cloudMesh = new THREE.Mesh(geometry, material);

                  const animate = () => {
                    cloudMesh.rotation.y += 0.0005;
                    requestAnimationFrame(animate);
                  };
                  animate();

                  return cloudMesh;
                }

                // Create 3D Pin for Milestones/Events/Projects
                const group = new THREE.Group();

                // Color based on type
                const color = d.color ? new THREE.Color(d.color) : new THREE.Color(0xff0000);

                // Pin Head (Sphere)
                const headGeometry = new THREE.SphereGeometry(1.5, 16, 16);
                const headMaterial = new THREE.MeshLambertMaterial({ color: color });
                const head = new THREE.Mesh(headGeometry, headMaterial);
                head.position.y = 4;
                group.add(head);

                // Pin Body (Cylinder)
                const bodyGeometry = new THREE.CylinderGeometry(0.2, 0, 4, 8);
                const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
                const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
                body.position.y = 2;
                group.add(body);

                return group;
              }}
              onObjectClick={(obj: any) => {
                if (obj.type !== 'cloud') {
                  setSelectedMoment(obj as GlobeMoment);
                }
              }}
              onGlobeReady={() => {
                console.log('Globe ready callback fired');
                setIsGlobeReady(true);
              }}
              labelsData={isExpanded ? GLOBE_MOMENT_LOCATIONS : []}
              labelLat="lat"
              labelLng="lng"
              labelText="title"
              labelSize={1.5}
              labelDotRadius={0.5}
              labelColor={() => "rgba(255, 255, 255, 0.75)"}
              labelResolution={2}
              width={typeof window !== 'undefined' ? window.innerWidth : 1920}
              height={typeof window !== 'undefined' ? window.innerHeight : 1080}
            />
          )}
        </div>

        <motion.div
          className="absolute px-6 text-center z-20 pointer-events-none"
          animate={
            isExpanded
              ? { top: 140, left: '50%', width: '100%', transform: 'translateX(-50%)' } // Lowered further to avoid header overlap
              : { top: '50%', left: '50%', width: '100%', transform: 'translate(-50%, -50%)' }
          }
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-light text-white mb-4"
            style={{ letterSpacing: '-0.04em' }}
          >
            World Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
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
              <GlassButton onClick={handleExpand}>
                Discover My Journey
              </GlassButton>
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={handleClose}
                className="fixed cursor-pointer top-32 right-6 z-40 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors pointer-events-auto" // Lowered to top-32
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

              {/* Legend Box */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="fixed bottom-8 left-8 z-40 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-4 pointer-events-auto"
              >
                <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                    <span className="text-xs text-gray-300">Career Milestones</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                    <span className="text-xs text-gray-300">High-Level Events</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                    <span className="text-xs text-gray-300">Projects</span>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>

      {/* Moment Lightbox */}
      <MomentLightbox moment={selectedMoment} onClose={() => setSelectedMoment(null)} />
    </>
  );
}

export default function WorldExperienceSection() {
  return <WorldExperienceSectionContent />;
}
