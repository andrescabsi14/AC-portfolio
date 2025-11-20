'use client';

import { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { projects, Project } from '@/data/projects';
import ProjectLightbox from '@/components/ui/ProjectLightbox';
import { Button } from '@/components/ui/button';

const DAY_TEXTURE_URL = '/8081_earthmap4k.jpg';
const NIGHT_TEXTURE_URL = '/8081_earthlights4k.jpg';
const CLOUDS_TEXTURE_URL = '/earthclouds.jpg';
const HIGH_DAY_TEXTURE_URL = '/earthhighday.jpg';
const HIGH_NIGHT_TEXTURE_URL = '/earthhighnight.jpg';

const CURRENT_LOCATION = {
  lat: 40.7128,
  lng: -74.0060,
  label: 'Current Location: New York',
};

// Globe moments with coordinates
const GLOBE_MOMENT_LOCATIONS = [
  { title: 'Bogotá — the origin.', lat: 4.7110, lng: -74.0055 },
  { title: 'Dallas — the mayor\'s office.', lat: 32.7767, lng: -96.7970 },
  { title: 'Detroit — congressmen, city leaders, and the awakening of a global perspective.', lat: 42.3314, lng: -83.0458 },
  { title: 'Washington D.C. — the U.S. Department of State, seventh floor.', lat: 38.8951, lng: -77.0369 },
  { title: 'Copenhagen & Aarhus — representing the Americas as a DTU Young Influencer at the C40 World Mayors Summit.', lat: 55.6761, lng: 12.5683 },
  { title: 'Lima — the APEC Summit.', lat: -12.0464, lng: -77.0428 },
  { title: 'Spain, Bolivia, Memphis — entrepreneurship, culture, and the belief that ideas move faster than borders.', lat: 40.4637, lng: -3.7492 },
  { title: 'Santa Clara & Silicon Valley — invited to share approaches to frontier technology.', lat: 37.3541, lng: -121.9552 },
  { title: 'New York — the city he saw in 2014 from the still-unfinished Hudson Yards.', lat: 40.7128, lng: -74.0060 },
];

// Sun position calculator for a given location and date
const calculateSunPosition = (lat: number, lng: number, date: Date) => {
  // Simplified sunrise/sunset calculation
  const J2000 = new Date('2000-01-01').getTime();
  const julianDay = (date.getTime() - J2000) / 86400000 + 2451545;

  // Mean solar time
  const n = julianDay - 2451545 + 0.0008;
  const J = n - lng / 360;
  const M = (357.5291 + 0.98560028 * J) % 360;
  const C = (1.9146 - 0.004817 * Math.cos(M * Math.PI / 180) - 0.000135 * Math.cos(2 * M * Math.PI / 180)) * Math.sin(M * Math.PI / 180);
  const lambda = (280.4665 + 36000.76983 * (julianDay / 36525) + C) % 360;
  const SunDec = Math.asin(Math.sin(23.4397 * Math.PI / 180) * Math.sin(lambda * Math.PI / 180));

  const latRad = lat * Math.PI / 180;
  const cosH = -Math.tan(latRad) * Math.tan(SunDec);

  if (cosH > 1) return { sunrise: null, sunset: null, isDay: false, phase: 'night' };
  if (cosH < -1) return { sunrise: null, sunset: null, isDay: true, phase: 'day' };

  const H = Math.acos(cosH) * 180 / Math.PI;
  const T0 = (J % 1) + lng / 360;
  const sunrise = T0 - H / 360;
  const sunset = T0 + H / 360;

  const localTime = (date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600) / 24;

  // Normalize to 0-1 range
  const normalizedSunrise = sunrise < 0 ? sunrise + 1 : sunrise > 1 ? sunrise - 1 : sunrise;
  const normalizedSunset = sunset < 0 ? sunset + 1 : sunset > 1 ? sunset - 1 : sunset;

  const dawnStart = normalizedSunrise - 0.02; // ~30 min before
  const dawnEnd = normalizedSunrise + 0.02;
  const duskStart = normalizedSunset - 0.02;
  const duskEnd = normalizedSunset + 0.02;

  let phase = 'night';
  let phaseProgress = 0;

  if (localTime >= dawnStart && localTime < dawnEnd) {
    phase = 'dawn';
    phaseProgress = (localTime - dawnStart) / (dawnEnd - dawnStart);
  } else if (localTime >= dawnEnd && localTime < duskStart) {
    phase = 'day';
    phaseProgress = 1;
  } else if (localTime >= duskStart && localTime < duskEnd) {
    phase = 'dusk';
    phaseProgress = (localTime - duskStart) / (duskEnd - duskStart);
  }

  return {
    sunrise: normalizedSunrise,
    sunset: normalizedSunset,
    isDay: localTime >= dawnEnd && localTime < duskStart,
    phase,
    phaseProgress,
  };
};

const latLngToCartesian = (lat: number, lng: number, radius = 1.02): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

const Atmosphere = () => {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.5 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
            gl_FragColor = vec4(0.0, 0.57, 1.0, intensity);
          }
        `,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      }),
    []
  );

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <mesh ref={ref} scale={1.05}>
      <sphereGeometry args={[1, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const OuterGlow = () => {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(1.05 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.5);
            vec3 glowColor = vec3(0.08, 0.4, 1.0);
            gl_FragColor = vec4(glowColor, intensity * 0.9);
          }
        `,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      }),
    []
  );

  useEffect(() => {
    return () => material.dispose();
  }, [material]);

  return (
    <mesh scale={[1.15, 1.15, 1.15]}>
      <sphereGeometry args={[1, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const Earth = ({
  onLoaded,
  scale = 1,
  timeOfDay,
  isExpanded = false,
  sunPhase = 'day',
  phaseProgress = 0,
}: {
  onLoaded: () => void;
  scale?: number;
  timeOfDay: number;
  isExpanded?: boolean;
  sunPhase?: string;
  phaseProgress?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const blendFactorRef = useRef(0);

  // Load low-res textures
  const dayTexture = useLoader(THREE.TextureLoader, DAY_TEXTURE_URL);
  const nightTexture = useLoader(THREE.TextureLoader, NIGHT_TEXTURE_URL);
  const cloudsTexture = useLoader(THREE.TextureLoader, CLOUDS_TEXTURE_URL);

  // Load high-res textures
  const highDayTexture = useLoader(THREE.TextureLoader, HIGH_DAY_TEXTURE_URL);
  const highNightTexture = useLoader(THREE.TextureLoader, HIGH_NIGHT_TEXTURE_URL);

  // Setup texture properties
  dayTexture.flipY = false;
  nightTexture.flipY = false;
  cloudsTexture.flipY = false;
  highDayTexture.flipY = false;
  highNightTexture.flipY = false;

  const loadedRef = useRef(false);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

const shaderMaterial = useMemo(() => {
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uDayMap: { value: dayTexture },
      uNightMap: { value: nightTexture },
      uCloudsMap: { value: cloudsTexture },
      uHighDayMap: { value: highDayTexture },
      uHighNightMap: { value: highNightTexture },
      uLightDir: { value: new THREE.Vector3(1, 0.2, 0.5).normalize() },
      uTimeOfDay: { value: timeOfDay },
      uTerminatorSoftness: { value: 0.2 },
      uSunPhase: { value: 0 }, // 0 = night, 1 = dawn, 2 = day, 3 = dusk
      uPhaseProgress: { value: 0 }, // 0 to 1 progress through phase
      uDawnDuskColor: { value: new THREE.Vector3(1.0, 0.6, 0.2) }, // Orange
      uTextureBlend: { value: 0 }, // 0 = low-res, 1 = high-res
      uIsExpanded: { value: isExpanded ? 1.0 : 0.0 }, // 1.0 = expanded, 0.0 = not expanded
    },
      vertexShader: `
        varying vec3 vNormal;
        varying vec2 vUv;
        varying vec3 vWorldPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vUv = uv;
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec2 vUv;
        varying vec3 vWorldPos;
        uniform sampler2D uDayMap;
        uniform sampler2D uNightMap;
        uniform sampler2D uCloudsMap;
        uniform sampler2D uHighDayMap;
        uniform sampler2D uHighNightMap;
        uniform vec3 uLightDir;
        uniform float uTerminatorSoftness;
        uniform float uSunPhase;
        uniform float uPhaseProgress;
        uniform vec3 uDawnDuskColor;
        uniform float uTextureBlend;
        uniform float uIsExpanded;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 lightDir = normalize(uLightDir);

          // More precise day/night boundary calculation
          float intensity = dot(normal, lightDir);

          // Smooth transition zone (terminator line)
          float transitionStart = -uTerminatorSoftness;
          float transitionEnd = uTerminatorSoftness;
          float dayFactor = smoothstep(transitionStart, transitionEnd, intensity);

          // Sample low-res textures
          vec3 lowDayColor = texture2D(uDayMap, vUv).rgb;
          vec3 lowNightColor = texture2D(uNightMap, vUv).rgb;
          vec3 cloudsColor = texture2D(uCloudsMap, vUv).rgb;

          // Sample high-res textures
          vec3 highDayColor = texture2D(uHighDayMap, vUv).rgb;
          vec3 highNightColor = texture2D(uHighNightMap, vUv).rgb;

          // When not expanded, show only clouds; when expanded, use day texture
          vec3 displayDayColor = mix(cloudsColor, lowDayColor, uIsExpanded);

          // Blend between low-res and high-res textures
          vec3 dayColor = mix(displayDayColor, highDayColor, uTextureBlend);
          vec3 nightColor = mix(lowNightColor, highNightColor, uTextureBlend);

          // Blend day and night based on the terminator line
          vec3 baseColor = mix(nightColor, dayColor, dayFactor);

          // Dawn/Dusk color overlay
          vec3 dawnDuskOverlay = vec3(0.0);
          float dawnDuskIntensity = 0.0;

          if (uSunPhase == 1.0) {
            // Dawn: orange fading to blue as sun rises
            dawnDuskOverlay = mix(uDawnDuskColor, vec3(0.3, 0.6, 0.95), uPhaseProgress);
            dawnDuskIntensity = 0.4 * (1.0 - uPhaseProgress);
          } else if (uSunPhase == 3.0) {
            // Dusk: blue fading to orange as sun sets
            dawnDuskOverlay = mix(vec3(0.3, 0.6, 0.95), uDawnDuskColor, uPhaseProgress);
            dawnDuskIntensity = 0.4 * uPhaseProgress;
          }

          // Apply dawn/dusk color to base color
          baseColor = mix(baseColor, dawnDuskOverlay, dawnDuskIntensity);

          // Atmospheric glow at terminator - softer and blurrier
          float terminatorGlow = smoothstep(-0.8, 0.2, intensity) * smoothstep(0.8, -0.2, intensity);
          vec3 atmosphereGlow = vec3(0.3, 0.6, 0.95) * terminatorGlow * 0.2;

          // Rim light for atmosphere
          vec3 rimColor = vec3(0.05, 0.35, 0.8) * pow(max(0.0, 1.0 - intensity), 3.5) * 0.3;

          // City lights glow at night
          vec3 nightGlow = nightColor * 0.08 * (1.0 - dayFactor);

          // Dayside ambient light
          vec3 dayAmbient = dayColor * 0.1 * dayFactor;

          vec3 finalColor = baseColor + atmosphereGlow + rimColor + nightGlow + dayAmbient;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: false,
    });
    materialRef.current = mat;
    return mat;
  }, [dayTexture, nightTexture, cloudsTexture, highDayTexture, highNightTexture, timeOfDay, sunPhase, phaseProgress, isExpanded]);

  useEffect(() => {
    if (!loadedRef.current && dayTexture && nightTexture) {
      loadedRef.current = true;
      onLoaded();
    }
  }, [dayTexture, nightTexture, onLoaded]);

  const tiltQuaternion = useMemo(() => {
    const axis = new THREE.Vector3(0, 0, 1);
    return new THREE.Quaternion().setFromAxisAngle(axis, THREE.MathUtils.degToRad(23.5));
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Continuous rotation with speed based on expanded state
      const rotationSpeed = isExpanded ? 0.01 : 0.02;
      meshRef.current.rotation.y += delta * rotationSpeed;
      meshRef.current.rotation.x = THREE.MathUtils.degToRad(1.3);
      // Rotate 180 degrees to fix upside-down orientation
      meshRef.current.rotation.z = THREE.MathUtils.degToRad(180);
    }

      if (materialRef.current) {
        const sunAngle = timeOfDay * Math.PI * 2;
        const sunDirection = new THREE.Vector3(
          Math.cos(sunAngle),
          0.2,
          Math.sin(sunAngle)
        );
        sunDirection.applyQuaternion(tiltQuaternion).normalize();
        materialRef.current.uniforms.uLightDir.value.copy(sunDirection);
        materialRef.current.uniforms.uTimeOfDay.value = timeOfDay;
        materialRef.current.uniforms.uIsExpanded.value = isExpanded ? 1.0 : 0.0;

        // Update sun phase uniforms
        const phaseMap: { [key: string]: number } = { night: 0, dawn: 1, day: 2, dusk: 3 };
        materialRef.current.uniforms.uSunPhase.value = phaseMap[sunPhase] || 0;
        materialRef.current.uniforms.uPhaseProgress.value = phaseProgress;

        // Animate texture blend (3 seconds = 3000ms)
        const targetBlend = isExpanded ? 1 : 0;
        const blendSpeed = delta * (1 / 3); // Full transition in 3 seconds
        blendFactorRef.current += (targetBlend - blendFactorRef.current) * blendSpeed;
        materialRef.current.uniforms.uTextureBlend.value = blendFactorRef.current;
      }
    });

  useEffect(() => {
    return () => {
      shaderMaterial.dispose();
    };
  }, [shaderMaterial]);

  return (
    <mesh ref={meshRef} castShadow receiveShadow scale={[scale, scale, scale]}>
      <sphereGeometry args={[1, 128, 128]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

const Marker = ({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (project: Project) => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const position = useMemo(
    () => latLngToCartesian(project.location.lat, project.location.lng, 1.03),
    [project]
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(project);
      }}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
    >
      <sphereGeometry args={[0.04, 12, 12]} />
      <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.9} metalness={0.2} />
    </mesh>
  );
};

const CurrentLocationPulse = () => {
  const position = useMemo(
    () => latLngToCartesian(CURRENT_LOCATION.lat, CURRENT_LOCATION.lng, 1.04),
    []
  );
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (glowRef.current) {
      glowRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <mesh ref={glowRef} position={position}>
      <sphereGeometry args={[0.045, 16, 16]} />
      <meshStandardMaterial color="#fcd34d" emissive="#fcd34d" emissiveIntensity={0.8} />
    </mesh>
  );
};

const LightBeamMarker = ({ location }: { location: (typeof GLOBE_MOMENT_LOCATIONS)[0] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const position = useMemo(() => latLngToCartesian(location.lat, location.lng, 1.02), [location]);

  return (
    <group ref={groupRef} position={position}>
      {/* Black sphere marker */}
      <mesh>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial
          color="#000000"
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* White wireframe border */}
      <mesh>
        <sphereGeometry args={[0.037, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe={true}
          transparent={true}
          opacity={0.8}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

const CameraController = ({ isExpanded }: { isExpanded: boolean }) => {
  const { camera } = useThree();
  const targetZ = useRef(2.5);

  useEffect(() => {
    // Default: z = 1.6 (zoomed out, globe smaller)
    // Expanded: z = 2.5 (zoomed out more, entire globe visible)
    targetZ.current = isExpanded ? 2.5 : 1.6;
  }, [isExpanded]);

  useFrame(() => {
    // Smooth camera animation
    camera.position.z += (targetZ.current - camera.position.z) * 0.08;
  });

  return null;
};

export default function WorldExperienceSection() {
  const [globeReady, setGlobeReady] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sunPhase, setSunPhase] = useState('day');
  const [phaseProgress, setPhaseProgress] = useState(0);
  const scrollLockPosition = useRef(0);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isExpanded;
    }
  }, [isExpanded]);

  // Calculate sun position for New York
  useEffect(() => {
    const updateSunPosition = () => {
      const sunData = calculateSunPosition(CURRENT_LOCATION.lat, CURRENT_LOCATION.lng, new Date());
      setSunPhase(sunData.phase);
      setPhaseProgress(sunData.phaseProgress ?? 0);
    };

    updateSunPosition();
    const interval = setInterval(updateSunPosition, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

const getTimeRatio = () => {
  const now = new Date();
  // Get local time in hours (0-24)
  const localHours = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  // Normalize to 0-1 range (0 = midnight, 0.5 = noon)
  return (localHours % 24) / 24;
};

useEffect(() => {
  const html = document.documentElement;
  const body = document.body;

  if (isExpanded) {
    scrollLockPosition.current = window.scrollY;
    html.style.position = 'fixed';
    html.style.top = `-${scrollLockPosition.current}px`;
    html.style.width = '100%';
    body.style.position = 'fixed';
    body.style.top = `-${scrollLockPosition.current}px`;
    body.style.width = '100%';
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    document.documentElement.setAttribute('data-globe-expanded', 'true');
  } else {
    if (scrollLockPosition.current) {
      window.scrollTo(0, scrollLockPosition.current);
      scrollLockPosition.current = 0;
    }
    html.style.position = '';
    html.style.top = '';
    html.style.width = '';
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    html.style.overflow = '';
    body.style.overflow = '';
    document.documentElement.setAttribute('data-globe-expanded', 'false');
  }

  return () => {
    html.style.position = '';
    html.style.top = '';
    html.style.width = '';
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    html.style.overflow = '';
    body.style.overflow = '';
  };
}, [isExpanded]);

const [timeOfDay, setTimeOfDay] = useState(() => getTimeRatio());

useEffect(() => {
  const updateTime = () => setTimeOfDay(getTimeRatio());
  const timer = setInterval(updateTime, 60_000);
  return () => clearInterval(timer);
}, []);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <section
      id="world-experience"
      className="relative min-h-screen w-full overflow-hidden bg-black snap-start"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_90%_at_50%_50%,_rgba(20,50,120,0.4),_rgba(0,0,0,1))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(30,80,180,0.15),_transparent_60%)]" />
      </div>

      <div className="relative z-10 w-full flex flex-col">
        <div className="relative w-full h-screen">
          <Canvas
            camera={{ position: [0, 0, 0.8], fov: 45 }}
            className="absolute inset-0 w-full h-full"
            gl={{ antialias: true, alpha: false }}
          >
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={1.1} />
            <Stars radius={120} depth={60} count={5000} factor={5} saturation={0.1} fade speed={0.15} />
            <Suspense fallback={null}>
              <Earth onLoaded={() => setGlobeReady(true)} scale={1.1} timeOfDay={timeOfDay} isExpanded={isExpanded} sunPhase={sunPhase} phaseProgress={phaseProgress} />
              <Atmosphere />
              <OuterGlow />
            </Suspense>
            <CurrentLocationPulse />
            <CameraController isExpanded={isExpanded} />
            {isExpanded && (
              <>
                <group>
                  {projects.map((project) => (
                    <Marker
                      key={project.id}
                      project={project}
                      onSelect={handleProjectSelect}
                    />
                  ))}
                </group>
                <group>
                  {GLOBE_MOMENT_LOCATIONS.map((location, index) => (
                    <LightBeamMarker
                      key={index}
                      location={location}
                    />
                  ))}
                </group>
              </>
            )}
            <OrbitControls
              ref={controlsRef}
              enablePan={false}
              enableZoom={false}
              enableRotate={isExpanded}
              autoRotate={false}
              autoRotateSpeed={0.4}
              minDistance={1.8}
              maxDistance={4.5}
            />
          </Canvas>
        </div>

        {/* Dotted Overlay - only visible when not expanded */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0,0,0,var(--dotted-overlay-opacity, 0.25)) 1.5px, transparent 1.5px)`,
            backgroundSize: '4px 4px',
          }}
          animate={{ opacity: isExpanded ? 0 : 1 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />

        {/* Dark Overlay - only visible when not expanded */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-5 bg-black"
          animate={{ opacity: isExpanded ? 0 : 0.15 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        <motion.div
          className="pointer-events-none absolute px-6 text-center z-20"
          animate={isExpanded ? { top: 24, left: '50%', width: '100%', transform: 'translateX(-50%)' } : { top: '50%', left: '50%', width: '100%', transform: 'translate(-50%, -50%)' }}
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
            className="text-lg md:text-xl text-gray-400 font-light"
          >
            Global impact across continents
          </motion.p>
        </motion.div>

        {globeReady && (
          <>
            <AnimatePresence>
              {isExpanded && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-24 right-6 z-40 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors pointer-events-auto"
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-auto z-30"
            >
              {!isExpanded && (
                <Button
                  onClick={() => setIsExpanded(true)}
                  className="backdrop-blur-md bg-white/10 border border-white/30 text-white uppercase tracking-widest font-medium hover:bg-white/20 hover:border-white/50 transition-all"
                >
                  Discover My Journey
                </Button>
              )}
            </motion.div>
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectLightbox project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
