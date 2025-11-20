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
      uGlobeRotation: { value: 0 }, // Track the Y-axis rotation to keep day/night fixed
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
        uniform float uGlobeRotation;
        uniform float uTerminatorSoftness;
        uniform float uSunPhase;
        uniform float uPhaseProgress;
        uniform vec3 uDawnDuskColor;
        uniform float uTextureBlend;
        uniform float uIsExpanded;

        void main() {
          vec3 normal = normalize(vNormal);

          // Rotate light direction by inverse of globe rotation to keep day/night fixed in world space
          // As the globe rotates, we counter-rotate the light so it stays aligned with the actual sun position
          float angle = uGlobeRotation;
          float cosA = cos(angle);
          float sinA = sin(angle);

          vec3 origLightDir = normalize(uLightDir);
          vec3 lightDir = vec3(
            origLightDir.x * cosA + origLightDir.z * sinA,
            origLightDir.y,
            -origLightDir.x * sinA + origLightDir.z * cosA
          );
          lightDir = normalize(lightDir);

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
      // Only rotate mesh when NOT expanded
      // When expanded, keep mesh still so day/night pattern is truly fixed as camera rotates around it
      if (!isExpanded) {
        meshRef.current.rotation.y += delta * 0.02;
      }
      meshRef.current.rotation.x = THREE.MathUtils.degToRad(1.3);
      // Rotate 180 degrees to fix upside-down orientation
      meshRef.current.rotation.z = THREE.MathUtils.degToRad(180);
    }

      if (materialRef.current) {
        // Calculate sun direction based on actual real-time (not just state updates every 60s)
        // This creates a FIXED day/night terminator in world space
        // As time progresses, different locations come into and out of daylight
        const now = new Date();
        const localHours = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
        const dynamicTimeOfDay = (localHours % 24) / 24;

        const sunAngle = dynamicTimeOfDay * Math.PI * 2;
        const sunDirection = new THREE.Vector3(
          Math.cos(sunAngle),
          0.2,
          Math.sin(sunAngle)
        );
        sunDirection.applyQuaternion(tiltQuaternion).normalize();
        materialRef.current.uniforms.uLightDir.value.copy(sunDirection);

        // Update globe rotation to keep day/night lighting fixed in world space
        // When not expanded: counter-rotate light as globe spins
        // When expanded: keep rotation at 0 so light stays fixed in world space
        if (meshRef.current) {
          materialRef.current.uniforms.uGlobeRotation.value = isExpanded ? 0 : meshRef.current.rotation.y;
        }

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
    <mesh ref={meshRef} castShadow receiveShadow scale={[scale, scale, -scale]}>
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


const CameraController = ({ isExpanded, config }: { isExpanded: boolean; config: any }) => {
  const { camera } = useThree();

  useFrame(() => {
    // Only control camera when NOT expanded
    // When expanded, OrbitControls has full control
    if (!isExpanded) {
      const interpolationSpeed = config.notExpanded.camera.interpolationSpeed;
      const targetZ = config.notExpanded.camera.targetZ;

      camera.position.x += (0 - camera.position.x) * interpolationSpeed;
      camera.position.y += (0 - camera.position.y) * interpolationSpeed;
      camera.position.z += (targetZ - camera.position.z) * interpolationSpeed;
    }
  });

  return null;
};

export default function WorldExperienceSection() {
  // Globe configuration for expanded and non-expanded states
  const GLOBE_CONFIG = {
    notExpanded: {
      camera: {
        targetZ: 1.25,
        interpolationSpeed: 0.08,
      },
      canvas: {
        filter: 'blur(10px) brightness(70%) contrast(300%)',
        fov: 45,
        initialZ: 0.8,
      },
      orbitControls: {
        enableRotate: false,
        autoRotate: false,
        autoRotateSpeed: 0.4,
        minDistance: 1.8,
        maxDistance: 5.5,
      },
      overlays: {
        dottedOpacity: 1,
        darkOpacity: 0.3,
        transitionDuration: 0.5,
      },
    },
    expanded: {
      camera: {
        targetZ: 5.5,
        interpolationSpeed: 0.08,
      },
      canvas: {
        filter: 'none',
        fov: 45,
        initialZ: 0.8,
      },
      orbitControls: {
        enableRotate: true,
        autoRotate: true,
        autoRotateSpeed: 0.01,
        minDistance: 2.0,
        maxDistance: 8.0,
      },
      overlays: {
        dottedOpacity: 0,
        darkOpacity: 0,
        transitionDuration: 3,
      },
    },
  };

  const [globeReady, setGlobeReady] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sunPhase, setSunPhase] = useState('day');
  const [phaseProgress, setPhaseProgress] = useState(0);
  const scrollLockPosition = useRef(0);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (controlsRef.current) {
      const autoRotateConfig = isExpanded ? GLOBE_CONFIG.expanded.orbitControls.autoRotate : GLOBE_CONFIG.notExpanded.orbitControls.autoRotate;
      controlsRef.current.autoRotate = autoRotateConfig;
    }
  }, [isExpanded, GLOBE_CONFIG]);

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
    // Disable scrolling without changing position
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    document.documentElement.setAttribute('data-globe-expanded', 'true');
  } else {
    // Re-enable scrolling
    html.style.overflow = '';
    body.style.overflow = '';
    document.documentElement.setAttribute('data-globe-expanded', 'false');
  }

  return () => {
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

// Handle ESC key to close expanded globe view
useEffect(() => {
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isExpanded) {
      setIsExpanded(false);
    }
  };

  window.addEventListener('keydown', handleEscapeKey);
  return () => window.removeEventListener('keydown', handleEscapeKey);
}, [isExpanded]);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <section
      id="world-experience"
      className="relative w-full h-screen overflow-hidden bg-black snap-start"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_90%_at_50%_50%,_rgba(20,50,120,0.4),_rgba(0,0,0,1))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(30,80,180,0.15),_transparent_60%)]" />
      </div>

      <div className="relative z-10 w-full flex flex-col h-full">
        <div className="relative w-full h-full">
          <Canvas
            camera={{ position: [0, 0, GLOBE_CONFIG.notExpanded.canvas.initialZ], fov: GLOBE_CONFIG.notExpanded.canvas.fov }}
            className="absolute inset-0 w-full h-full"
            style={{
              filter: isExpanded ? GLOBE_CONFIG.expanded.canvas.filter : GLOBE_CONFIG.notExpanded.canvas.filter,
            }}
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
            <CameraController isExpanded={isExpanded} config={GLOBE_CONFIG} />
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
                    <Marker
                      key={index}
                      project={{
                        id: `moment-${index}`,
                        title: location.title,
                        location: { lat: location.lat, lng: location.lng },
                      } as any}
                      onSelect={() => {}}
                    />
                  ))}
                </group>
              </>
            )}
            <OrbitControls
              ref={controlsRef}
              enablePan={false}
              enableZoom={false}
              enableRotate={isExpanded ? GLOBE_CONFIG.expanded.orbitControls.enableRotate : GLOBE_CONFIG.notExpanded.orbitControls.enableRotate}
              autoRotate={isExpanded ? GLOBE_CONFIG.expanded.orbitControls.autoRotate : GLOBE_CONFIG.notExpanded.orbitControls.autoRotate}
              autoRotateSpeed={isExpanded ? GLOBE_CONFIG.expanded.orbitControls.autoRotateSpeed : GLOBE_CONFIG.notExpanded.orbitControls.autoRotateSpeed}
              minDistance={isExpanded ? GLOBE_CONFIG.expanded.orbitControls.minDistance : GLOBE_CONFIG.notExpanded.orbitControls.minDistance}
              maxDistance={isExpanded ? GLOBE_CONFIG.expanded.orbitControls.maxDistance : GLOBE_CONFIG.notExpanded.orbitControls.maxDistance}
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
          animate={{ opacity: isExpanded ? GLOBE_CONFIG.expanded.overlays.dottedOpacity : GLOBE_CONFIG.notExpanded.overlays.dottedOpacity }}
          transition={{ duration: isExpanded ? GLOBE_CONFIG.expanded.overlays.transitionDuration : GLOBE_CONFIG.notExpanded.overlays.transitionDuration, ease: 'easeInOut' }}
        />

        {/* Dark Overlay - only visible when not expanded */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-5 bg-black"
          animate={{ opacity: isExpanded ? GLOBE_CONFIG.expanded.overlays.darkOpacity : GLOBE_CONFIG.notExpanded.overlays.darkOpacity }}
          transition={{ duration: GLOBE_CONFIG.notExpanded.overlays.transitionDuration, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute px-6 text-center z-20"
          animate={isExpanded ? { top: 100, left: '50%', width: '100%', transform: 'translateX(-50%)' } : { top: '50%', left: '50%', width: '100%', transform: 'translate(-50%, -50%)' }}
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
          {globeReady && !isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pointer-events-auto"
            >
              <Button
                onClick={() => setIsExpanded(true)}
                className="cursor-pointer backdrop-blur-md bg-white/10 border border-white/30 text-white uppercase tracking-widest font-medium hover:bg-white/20 hover:border-white/50 transition-all"
              >
                Discover My Journey
              </Button>
            </motion.div>
          )}
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
                  className="fixed top-6 right-6 z-40 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors pointer-events-auto"
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
