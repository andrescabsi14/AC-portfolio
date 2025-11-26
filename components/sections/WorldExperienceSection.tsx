'use client';

import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import StarfieldBackground from '@/components/ui/StarfieldBackground';
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
  {
    id: 'ylai',
    title: 'Washington, D.C.',
    subtitle: 'YLAI Fellowship — U.S. Department of State',
    description:
      'Selected by the U.S. Department of State for the Young Leaders of the Americas Initiative. Recognized among the top young leaders across 36 countries.',
    image: '/photos/milestones/ylai.jpg',
    lat: 38.9072,
    lng: -77.0369,
    color: '#ef4444',
    type: 'milestone'
  },
  {
    id: 'dtu',
    title: 'Copenhagen, Denmark',
    subtitle: 'DTU Young Influencer — C40 World Mayors Summit',
    description:
      'Represented the Americas at the C40 World Mayors Summit as a Young Influencer selected by the Denmark Technical University.',
    image: '/photos/milestones/dtu.jpg',
    lat: 55.6761,
    lng: 12.5683,
    color: '#ef4444',
    type: 'milestone'
  },
  {
    id: 'mit',
    title: 'Bogotá, Colombia',
    subtitle: 'MIT Technology Review — Innovators Under 35 (Nominee)',
    description:
      'Nominated by MIT Technology Review for pioneering work using neural networks for disease detection.',
    image: '/photos/milestones/mit35.jpg',
    lat: 4.7110,
    lng: -74.0721,
    color: '#ef4444',
    type: 'milestone'
  },
  {
    id: 'c40',
    title: 'Copenhagen, Denmark',
    subtitle: 'C40 World Mayors Summit',
    description:
      'Participated in global climate discussions with world leaders, representing the Americas in innovation-focused sessions.',
    image: '/photos/events/c40.jpg',
    lat: 55.6761,
    lng: 12.5683,
    color: '#D4AF37',
    type: 'event'
  },
  {
    id: 'techcamp-bolivia',
    title: 'La Paz, Bolivia',
    subtitle: 'TechCamp — Department of State',
    description:
      'Contributed to an international TechCamp focused on digital innovation and cross-border collaboration.',
    image: '/photos/events/techcamp-bolivia.jpg',
    lat: -16.5000,
    lng: -68.1193,
    color: '#D4AF37',
    type: 'event'
  },
  {
    id: 'peru-leadership',
    title: 'Lima, Peru',
    subtitle: 'APEC Leadership Program',
    description:
      'Selected for APEC Leadership initiatives focused on trade, innovation, and high-impact community development.',
    image: '/photos/events/apec.jpg',
    lat: -12.0464,
    lng: -77.0428,
    color: '#D4AF37',
    type: 'event'
  },
  {
    id: 'vessel-ny',
    title: 'New York, USA',
    subtitle: 'Vessel — GenAI Infrastructure',
    description:
      'Founder of Vessel, a GenAI memory and agent orchestration platform recognized by Stanford PhDs and NYU neuroscientists at NY Tech Week.',
    image: '/photos/projects/vessel.jpg',
    lat: 40.7128,
    lng: -74.0060,
    color: '#06b6d4',
    type: 'project'
  },
  {
    id: 'realio',
    title: 'New York, USA',
    subtitle: 'Realio — Multi-Chain RWA Platform',
    description:
      'Engineered multi-chain smart contracts and a P2P OTC trading system handling $50M+ in tokenized real-world assets.',
    image: '/photos/projects/realio.jpg',
    lat: 40.7128,
    lng: -74.0060,
    color: '#06b6d4',
    type: 'project'
  },
  {
    id: 'astrakode',
    title: 'Rome, Italy',
    subtitle: 'AstraKode — No-Code Smart Contract Platform',
    description:
      'Architected a no-code Solidity platform enabling 1,000+ monthly smart contract deployments with full AWS serverless infra.',
    image: '/photos/projects/astrakode.jpg',
    lat: 41.9028,
    lng: 12.4964,
    color: '#06b6d4',
    type: 'project'
  },
  {
    id: 'coca-cola-fanta',
    title: 'Atlanta, USA',
    subtitle: 'Coca-Cola — What The Fanta Campaign',
    description:
      'Built multilingual animated React + AEM experience deployed in 44 countries for Coca-Cola’s global Halloween campaign.',
    image: '/photos/projects/cocacola.jpg',
    lat: 33.7490,
    lng: -84.3880,
    color: '#06b6d4',
    type: 'project'
  },
  {
    id: 'everlyhealth',
    title: 'Austin, TX',
    subtitle: 'EverlyHealth — Telehealth Infrastructure',
    description:
      'Led development of HIPAA-compliant telehealth systems processing 1M+ daily transactions with 99.99% uptime.',
    image: '/photos/projects/everlyhealth.jpg',
    lat: 30.2672,
    lng: -97.7431,
    color: '#06b6d4',
    type: 'project'
  },
  {
    id: 'scoutcool',
    title: 'Buenos Aires, Argentina',
    subtitle: 'Scout.cool — dYdX, Uniswap, Livepeer Explorer',
    description:
      'Principal Engineer for a high-performance blockchain explorer serving dYdX, Uniswap, and Livepeer with $1B+ TVL tracked.',
    image: '/photos/projects/scout.jpg',
    lat: -34.6037,
    lng: -58.3816,
    color: '#06b6d4',
    type: 'project'
  },
  {
    id: 'belatrix',
    title: 'Mendoza, Argentina',
    subtitle: 'Belatrix — ML & Blockchain Engineering',
    description:
      'Built Deep Convolutional GANs and led front-end architecture for an early blockchain startup.',
    image: '/photos/projects/belatrix.jpg',
    lat: -32.8895,
    lng: -68.8458,
    color: '#06b6d4',
    type: 'project'
  },
  {
    id: 'mds-digital',
    title: 'Bogotá, Colombia',
    subtitle: 'MDS Digital — Fortune 500 Web Experiences',
    description:
      'Developed digital experiences for Coca-Cola, Disney, ESPN, Nissan, Dr Pepper, and Discovery Channel across 20+ web applications.',
    image: '/photos/projects/mds.jpg',
    lat: 4.7110,
    lng: -74.0721,
    color: '#06b6d4',
    type: 'project'
  },
  {
    id: 'djes',
    title: 'Bogotá, Colombia',
    subtitle: 'DJES — SMB Web Platforms',
    description:
      'Built WordPress and Django REST API experiences for multiple small businesses across Colombia.',
    image: '/photos/projects/djes.jpg',
    lat: 4.7110,
    lng: -74.0721,
    color: '#06b6d4',
    type: 'project'
  }
];

// Sun direction constant - used for both surface lighting and atmosphere
const SUN_DIRECTION = new THREE.Vector3(-1, 0, 0.2).normalize();
const NON_EXPANDED_SPIN_SPEED = 0.05;
const EXPANDED_SPIN_SPEED = 0.1;
const NON_EXPANDED_ALTITUDE = 0.4;
const EXPANDED_ALTITUDE = 2.5;
function WorldExperienceSectionContent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [placesData, setPlacesData] = useState<GeoJSONData | null>(null);
  const [selectedMoment, setSelectedMoment] = useState<GlobeMoment | null>(null);
  const [globeMaterial, setGlobeMaterial] = useState<THREE.Material | null>(null);
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const scrollPositionRef = useRef(0);
  const globeEl = useRef<any>(null);
  const atmosphereRef = useRef<THREE.Mesh | null>(null);
  const cloudTextureRef = useRef<THREE.Texture | null>(null);
  const ATMOSPHERE_RADIUS_MULTIPLIER = isExpanded ? 1 : 1;

  // Load GeoJSON data
  useEffect(() => {
    fetch('/ne_110m_populated_places_simple.geojson')
      .then((res) => res.json())
      .then((data) => setPlacesData(data));
  }, []);

  const getCloudTexture = useCallback(() => {
    if (!cloudTextureRef.current) {
      const loader = new THREE.TextureLoader();
      cloudTextureRef.current = loader.load('/earthcloudshigh.jpg');
    }
    return cloudTextureRef.current;
  }, []);

  // Load textures and create shader material
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    Promise.all([
      loader.loadAsync('/earthhighday.jpg'),
      loader.loadAsync('/earthhighnight.jpg'),
      loader.loadAsync('/earthcloudshigh.jpg')
    ]).then(([dayTexture, nightTexture, cloudsTexture]) => {
      cloudTextureRef.current = cloudsTexture;
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
      globeEl.current.pointOfView({ lat: 0, lng: -90, altitude: EXPANDED_ALTITUDE }, 1000);
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
      globeEl.current.pointOfView({ lat: 0, lng: -90, altitude: NON_EXPANDED_ALTITUDE }, 1000);
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
      controls.autoRotateSpeed = isExpanded ? EXPANDED_SPIN_SPEED : NON_EXPANDED_SPIN_SPEED;

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

  const globeObjects = useMemo<any[]>(() => {
    const baseObjects = [{ type: 'cloud', radius: 1.1 }];
    return isExpanded ? [...baseObjects, ...GLOBE_MOMENT_LOCATIONS] : baseObjects;
  }, [isExpanded]);

  const labelData = useMemo<GlobeMoment[]>(() => (isExpanded ? GLOBE_MOMENT_LOCATIONS : []), [isExpanded]);

  const renderGlobeObject = useCallback(
    (d: any) => {
      if (d.type === 'cloud') {
        const cloudsTexture = getCloudTexture();
        const geometry = new THREE.SphereGeometry(d.radius * 100, 64, 64);
        const material = new THREE.MeshPhongMaterial({
          map: cloudsTexture || undefined,
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
      head.position.set(0, 0, 4);
      group.add(head);

      // Pin Body (Cylinder)
      const bodyGeometry = new THREE.CylinderGeometry(0.2, 0, 4, 8);
      const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.rotation.x = Math.PI / 2;
      body.position.set(0, 0, 2);
      group.add(body);

      return group;
    },
    [getCloudTexture]
  );

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

      // Set up controls - Enable autoRotate for globe spinning
      const controls = globeEl.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = NON_EXPANDED_SPIN_SPEED;
      controls.enableZoom = false;

      // Set initial view
      globeEl.current.pointOfView({ lat: 0, lng: -90, altitude: NON_EXPANDED_ALTITUDE });

      console.log('Globe initialized successfully');
    } catch (error) {
      console.error('Error initializing globe:', error);
    }
  }, [isGlobeReady]);

  return (
    <>
      <section
        id="world-experience"
        className="relative h-screen w-full bg-black-70 overflow-hidden transition-all duration-500"
        style={{
          transition: 'filter 0.6s ease'
        }}
      >
        {/* Gradient Fade-in for Next Section */}
        <div className="absolute top-0 left-0 right-0 h-[20vh] bg-gradient-to-b from-black via-black/40 to-transparent pointer-events-none z-30" />

        {/* Independent Starfield Background */}
        <motion.div initial={{ opacity: 0 }} animate={
          isExpanded
            ? { opacity: 1 }
            : { opacity: 0 }
        }
          transition={{ duration: 0.5, ease: 'easeInOut' }}>
          <StarfieldBackground />
        </motion.div>

        <div
          className="absolute inset-0 z-10 flex justify-center pointer-events-none top-0 mt-20"
          style={{ overflow: 'hidden', opacity: isExpanded ? 1 : 0.7, }}
        >
          <div className="pointer-events-auto w-full h-full flex justify-center" style={{
            filter: isExpanded ? 'none' : 'hue-rotate(-30deg) blur(5px) brightness(1.6)',
            transition: 'filter 0.6s ease'
          }}>
            {placesData && globeMaterial && (
              <Globe
                ref={globeEl}
                globeMaterial={globeMaterial}
                backgroundColor="rgba(0,0,0,0)"
                objectsData={globeObjects}
                objectLat="lat"
                objectLng="lng"
                objectAltitude={(d: any) => (d.type === 'cloud' ? 0 : 0.01)}
                objectThreeObject={renderGlobeObject}
                onObjectClick={(obj: any) => {
                  if (obj.type !== 'cloud') {
                    setSelectedMoment(obj as GlobeMoment);
                  }
                }}
                onGlobeReady={() => {
                  console.log('Globe ready callback fired');
                  setIsGlobeReady(true);
                }}
                labelsData={labelData}
                labelLat="lat"
                labelLng="lng"
                labelText="title"
                labelSize={1}
                labelDotRadius={0.5}
                labelColor={() => "rgba(255, 255, 255, 0.75)"}
                labelResolution={2}
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
              ? { top: '8%', left: '50%', width: '100%', transform: 'translateX(-50%)' } // Lowered further to avoid header overlap
              : { top: '40vw', left: '50vw', width: '100%', transform: 'translate(-50%, -50%)' }
          }
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20, }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-light text-white mb-4"
            style={{ letterSpacing: '-0.04em' }}
          >
            World Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white-400 font-light mb-8"
          >
            Global impact across continents
          </motion.p>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
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
        {/* Gradient Fade-in for Next Section */}
        <div className="absolute bottom-0 left-0 right-0 h-[20vh] bg-gradient-to-b from-transparent via-black/40 to-black pointer-events-none z-30" />
      </section>


      {/* Moment Lightbox */}
      <MomentLightbox moment={selectedMoment} onClose={() => setSelectedMoment(null)} />
    </>
  );
}

export default function WorldExperienceSection() {
  return <WorldExperienceSectionContent />;
}
