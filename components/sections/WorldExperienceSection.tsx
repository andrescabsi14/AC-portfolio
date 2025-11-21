'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, Suspense, RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useLoader, useThree, ThreeEvent } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { projects, Project } from '@/data/projects';
import ProjectLightbox from '@/components/ui/ProjectLightbox';
import { Button } from '@/components/ui/button';

// Context for sharing the globe mesh reference
const GlobeContext = createContext<{ globeMeshRef: RefObject<THREE.Mesh | null> } | null>(null);

const useGlobeMesh = () => {
  const context = useContext(GlobeContext);
  if (!context) {
    throw new Error('useGlobeMesh must be used within GlobeContextProvider');
  }
  return context.globeMeshRef;
};

const GlobeProvider = ({ children, globeRef }: { children?: React.ReactNode; globeRef: RefObject<THREE.Mesh | null> }) => {
  return <GlobeContext.Provider value={{ globeMeshRef: globeRef }}>{children}</GlobeContext.Provider>;
};

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

const LINE_MARKER_RADIUS = 1.03;
const LINE_MARKER_HEIGHT = 0.35;

const getMarkerTransform = (lat: number, lng: number) => {
  const positionVec = latLngToCartesian(lat, lng, LINE_MARKER_RADIUS);
  const direction = positionVec.clone().normalize();
  const center = direction.clone().multiplyScalar(LINE_MARKER_RADIUS - LINE_MARKER_HEIGHT / 2);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
  return {
    position: [center.x, center.y, center.z] as [number, number, number],
    tipPosition: [positionVec.x, positionVec.y, positionVec.z] as [number, number, number],
    quaternion,
    height: LINE_MARKER_HEIGHT,
  };
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
      ref.current.rotation.y += delta * 0.02; // Unexpanded
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

const CloudLayer = () => {
  const cloudsTexture = useLoader(THREE.TextureLoader, CLOUDS_TEXTURE_URL);
  cloudsTexture.flipY = false;

  useEffect(() => {
    return () => {
      cloudsTexture.dispose();
    };
  }, [cloudsTexture]);

  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} scale={[1.08, 1.08, 1.08]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={cloudsTexture}
        transparent={true}
        opacity={0.6}
        emissive="#ffffff"
        emissiveMap={cloudsTexture}
        emissiveIntensity={0.3}
        depthWrite={false}
      />
    </mesh>
  );
};

const Earth = ({
  onLoaded,
  scale = 1,
  timeOfDay,
  isExpanded = false,
  sunPhase = 'day',
  phaseProgress = 7,
  meshRef,
}: {
  onLoaded: () => void;
  scale?: number;
  timeOfDay: number;
  isExpanded?: boolean;
  sunPhase?: string;
  phaseProgress?: number;
  meshRef: RefObject<THREE.Mesh | null>;
}) => {
  const blendFactorRef = useRef(0);

  // Load low-res textures
  const dayTexture = useLoader(THREE.TextureLoader, DAY_TEXTURE_URL);
  const nightTexture = useLoader(THREE.TextureLoader, NIGHT_TEXTURE_URL);
  const cloudsTexture = useLoader(THREE.TextureLoader, CLOUDS_TEXTURE_URL);

  // Load high-res textures only when expanded
  const highDayTexture = isExpanded ? useLoader(THREE.TextureLoader, HIGH_DAY_TEXTURE_URL) : dayTexture;
  const highNightTexture = isExpanded ? useLoader(THREE.TextureLoader, HIGH_NIGHT_TEXTURE_URL) : nightTexture;

  // Setup texture properties
  dayTexture.flipY = false;
  nightTexture.flipY = false;
  cloudsTexture.flipY = false;
  highDayTexture.flipY = false;
  highNightTexture.flipY = false;

  const loadedRef = useRef(false);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const pointerStateRef = useRef({
    isDragging: false,
    lastX: 0,
    lastY: 0,
  });
  const initialRotationSet = useRef(false);

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
        uTerminatorSoftness: { value: 0.35 }, // Wider terminator for more realistic atmosphere
        uSunPhase: { value: 0 }, // 0 = night, 1 = dawn, 2 = day, 3 = dusk
        uPhaseProgress: { value: 0 }, // 0 to 1 progress through phase
        uDawnDuskColor: { value: new THREE.Vector3(1.0, 0.6, 0.8) }, // Orange
        uTextureBlend: { value: 0 }, // 0 = low-res, 1 = high-res
        uIsExpanded: { value: isExpanded ? 1.0 : 0.0 }, // 1.0 = expanded, 0.0 = not expanded
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying vec3 vWorldNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
          vUv = uv;
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying vec3 vWorldNormal;
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
          // Use world-space normal for fixed lighting direction (light stays in place when globe rotates)
          vec3 worldNormal = normalize(vWorldNormal);
          vec3 lightDir = normalize(uLightDir);

          // More precise day/night boundary calculation using world-space normal
          float intensity = dot(worldNormal, lightDir);

          // Smooth transition zone (terminator line) - wider for more realistic gradient
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
            dawnDuskIntensity = 0.1 * (1.0 - uPhaseProgress);
          } else if (uSunPhase == 3.0) {
            // Dusk: blue fading to orange as sun sets
            dawnDuskOverlay = mix(vec3(0.3, 0.6, 0.15), uDawnDuskColor, uPhaseProgress);
            dawnDuskIntensity = 0.4 * uPhaseProgress;
          }

          // Apply dawn/dusk color to base color
          baseColor = mix(baseColor, dawnDuskOverlay, dawnDuskIntensity);

          // Enhanced atmospheric glow at terminator - subtle warm tones
          float terminatorGlow = smoothstep(-1.0, 0.3, intensity) * smoothstep(1.0, -0.3, intensity);
          // Add subtle warm orange near terminator, blended with cool blue
          vec3 warmGlow = vec3(1.0, 0.5, 0.1) * terminatorGlow * 0.005;
          vec3 blueGlow = vec3(0.3, 0.6, 0.95) * terminatorGlow * 0.15;
          vec3 atmosphereGlow = warmGlow + blueGlow;

          // Rim light for atmosphere - enhanced fresnel effect with warm accent
          float rimFactor = pow(max(0.0, 1.0 - abs(intensity)), 2.0);
          // Add warmth to the rim without being overwhelming
          vec3 rimColor = vec3(0.2, 0.4, 0.15) * rimFactor * 0.05;
          vec3 warmAccent = vec3(1.0, 0.6, 0.2) * max(0.0, -intensity) * 0.001; // Warm glow on night side
          rimColor += warmAccent;

          // City lights glow at night - more visible
          vec3 nightGlow = nightColor * 0.12 * (1.0 - dayFactor);

          // Dayside ambient light
          vec3 dayAmbient = dayColor * 0.15 * dayFactor;

          // Specular highlight on water (based on normal vector characteristics)
          float waterSpec = max(0.0, dot(worldNormal, lightDir)) * dayFactor;
          vec3 specularGlow = vec3(1.0, 1.0, 0.95) * waterSpec * 0.2;

          vec3 finalColor = baseColor + atmosphereGlow + rimColor + nightGlow + dayAmbient + specularGlow;

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

  useEffect(() => {
    if (!isExpanded) {
      pointerStateRef.current.isDragging = false;
    }
  }, [isExpanded]);

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (!isExpanded) return;
    event.stopPropagation();
    pointerStateRef.current.isDragging = true;
    pointerStateRef.current.lastX = event.clientX;
    pointerStateRef.current.lastY = event.clientY;
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!isExpanded || !pointerStateRef.current.isDragging || !meshRef.current) return;
    event.stopPropagation();
    const deltaX = event.clientX - pointerStateRef.current.lastX;
    const deltaY = event.clientY - pointerStateRef.current.lastY;
    pointerStateRef.current.lastX = event.clientX;
    pointerStateRef.current.lastY = event.clientY;

    const rotationSpeed = 0.005;
    meshRef.current.rotation.y += deltaX * rotationSpeed;
    meshRef.current.rotation.x += deltaY * rotationSpeed;
    meshRef.current.rotation.x = THREE.MathUtils.clamp(
      meshRef.current.rotation.x,
      -Math.PI / 2,
      Math.PI / 2
    );
  };

  const handlePointerUp = () => {
    pointerStateRef.current.isDragging = false;
  };

  const tiltQuaternion = useMemo(() => {
    const axis = new THREE.Vector3(0, 0, 1);
    return new THREE.Quaternion().setFromAxisAngle(axis, THREE.MathUtils.degToRad(23.5));
  }, []);

  const phaseMap = useMemo(() => ({ night: 0, dawn: 1, day: 2, dusk: 3 } as Record<string, number>), []);
  const frameCountRef = useRef(0);

  useFrame((_, delta) => {
    if (meshRef.current) {
      if (!initialRotationSet.current) {
        meshRef.current.rotation.x = THREE.MathUtils.degToRad(1.3);
        meshRef.current.rotation.z = THREE.MathUtils.degToRad(180);
        initialRotationSet.current = true;
      }

      if (!pointerStateRef.current.isDragging) {
        meshRef.current.rotation.y += delta * 0.02;
      }
    }

    if (materialRef.current) {
      // Throttle sun calculation to every 30 frames (~500ms at 60fps)
      frameCountRef.current++;
      if (frameCountRef.current % 30 === 0) {
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
      }

      materialRef.current.uniforms.uTimeOfDay.value = timeOfDay;
      materialRef.current.uniforms.uIsExpanded.value = isExpanded ? 1.0 : 0.0;

      // Update sun phase uniforms
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
    <mesh
      ref={meshRef}
      castShadow
      receiveShadow
      scale={[scale, scale, -scale]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <sphereGeometry args={[1, isExpanded ? 64 : 32, isExpanded ? 64 : 32]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

const CurrentLocationPulse = () => {
  const position = useMemo(() => {
    const vec = latLngToCartesian(CURRENT_LOCATION.lat, CURRENT_LOCATION.lng, 1.11);
    return [vec.x, vec.y, vec.z] as [number, number, number];
  }, []);

  const coreRef = useRef<THREE.Mesh>(null);
  const pulse1Ref = useRef<THREE.Mesh>(null);
  const pulse2Ref = useRef<THREE.Mesh>(null);
  const pulse3Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Gentle rotation and pulse on the core
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.02;
      const coreScale = 1 + Math.sin(time * 2) * 0.1;
      coreRef.current.scale.setScalar(coreScale);
    }

    // Pulse wave 1
    if (pulse1Ref.current) {
      const progress1 = (time * 0.6) % 2.5;
      const scale1 = 1 + progress1 * 3;
      const opacity1 = Math.max(0, 1 - progress1 / 2.5);
      pulse1Ref.current.scale.setScalar(scale1);
      (pulse1Ref.current.material as THREE.MeshBasicMaterial).opacity = opacity1 * 0.5;
    }

    // Pulse wave 2
    if (pulse2Ref.current) {
      const progress2 = ((time * 0.6) + 0.83) % 2.5;
      const scale2 = 1 + progress2 * 3;
      const opacity2 = Math.max(0, 1 - progress2 / 2.5);
      pulse2Ref.current.scale.setScalar(scale2);
      (pulse2Ref.current.material as THREE.MeshBasicMaterial).opacity = opacity2 * 0.5;
    }

    // Pulse wave 3
    if (pulse3Ref.current) {
      const progress3 = ((time * 0.6) + 1.66) % 2.5;
      const scale3 = 1 + progress3 * 3;
      const opacity3 = Math.max(0, 1 - progress3 / 2.5);
      pulse3Ref.current.scale.setScalar(scale3);
      (pulse3Ref.current.material as THREE.MeshBasicMaterial).opacity = opacity3 * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Core glowing marker */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial
          color="#fcd34d"
          emissive="#fcd34d"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Expanding pulse spheres with additive blending */}
      <mesh ref={pulse1Ref}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial
          color="#fcd34d"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={pulse2Ref}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial
          color="#fcd34d"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={pulse3Ref}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial
          color="#fcd34d"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};


const SoftStars = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const baseColorsRef = useRef<Float32Array | null>(null);
  const twinkleOffsetsRef = useRef<Float32Array | null>(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(15000); // 5000 stars * 3 coordinates
    const colors = new Float32Array(15000); // RGB color for each vertex
    const twinkleOffsets = new Float32Array(5000); // Random offset for twinkling

    for (let i = 0; i < 15000; i += 3) {
      positions[i] = (Math.random() - 0.5) * 240; // x
      positions[i + 1] = (Math.random() - 0.5) * 240; // y
      positions[i + 2] = (Math.random() - 0.5) * 240; // z

      // Random brightness for each star (0.3 to 1.0)
      const brightness = 0.3 + Math.random() * 0.7;
      colors[i] = brightness; // r
      colors[i + 1] = brightness; // g
      colors[i + 2] = brightness; // b
    }

    // Random twinkling offsets for each star
    for (let i = 0; i < 5000; i++) {
      twinkleOffsets[i] = Math.random() * Math.PI * 2;
    }

    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    baseColorsRef.current = colors.slice();
    twinkleOffsetsRef.current = twinkleOffsets;

    return g;
  }, []);

  // Create glowing star texture with strong light bloom effect
  const starTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Create a bright, energetic glow with strong light emission
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 50);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');      // Pure white core
      gradient.addColorStop(0.1, 'rgba(255, 250, 220, 1)');    // Warm white
      gradient.addColorStop(0.25, 'rgba(220, 240, 255, 0.8)'); // Light blue glow
      gradient.addColorStop(0.45, 'rgba(180, 210, 255, 0.5)'); // Medium blue glow
      gradient.addColorStop(0.7, 'rgba(120, 160, 255, 0.2)');  // Fading blue
      gradient.addColorStop(1, 'rgba(80, 120, 200, 0)');       // Transparent edge
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.22, // Balanced star size
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.95,
      fog: false,
      map: starTexture,
      vertexColors: true, // Use vertex colors for brightness variation
    });
  }, [starTexture]);

  // Animate twinkling
  useFrame(({ clock }) => {
    if (pointsRef.current && baseColorsRef.current && twinkleOffsetsRef.current) {
      const colors = geometry.attributes.color.array as Float32Array;
      const time = clock.getElapsedTime();

      for (let i = 0; i < 5000; i++) {
        const baseIdx = i * 3;
        const baseBrightness = baseColorsRef.current[baseIdx];
        const offset = twinkleOffsetsRef.current[i];

        // Create twinkling effect using sine wave
        const twinkle = 0.5 + 0.5 * Math.sin(time * 2 + offset);
        const finalBrightness = baseBrightness * (0.5 + twinkle * 0.5);

        colors[baseIdx] = finalBrightness;
        colors[baseIdx + 1] = finalBrightness;
        colors[baseIdx + 2] = finalBrightness;
      }
      geometry.attributes.color.needsUpdate = true;
    }
  });

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
      starTexture.dispose();
    };
  }, [geometry, material, starTexture]);

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

const StarsParallax = () => {
  const starsRef = useRef<THREE.Group>(null);
  const globeMeshRef = useGlobeMesh();

  useFrame(() => {
    if (starsRef.current && globeMeshRef.current) {
      // Rotate stars much slower than the globe for subtle parallax effect
      const slowMultiplier = 0.1; // Stars rotate at 15% of globe speed
      starsRef.current.rotation.x = globeMeshRef.current.rotation.x * slowMultiplier;
      starsRef.current.rotation.y = globeMeshRef.current.rotation.y * slowMultiplier;
      starsRef.current.rotation.z = globeMeshRef.current.rotation.z * slowMultiplier;
    }
  });

  return (
    <group ref={starsRef}>
      <SoftStars />
    </group>
  );
};

const MarkersGroup = ({ children }: { children: React.ReactNode }) => {
  const markersRef = useRef<THREE.Group>(null);
  const globeMeshRef = useGlobeMesh();

  useFrame(() => {
    if (markersRef.current && globeMeshRef.current) {
      // Sync markers rotation with globe rotation
      markersRef.current.rotation.x = globeMeshRef.current.rotation.x;
      markersRef.current.rotation.y = globeMeshRef.current.rotation.y;
      markersRef.current.rotation.z = globeMeshRef.current.rotation.z;
    }
  });

  return <group ref={markersRef}>{children}</group>;
};

const CameraController = ({ isExpanded, config }: { isExpanded: boolean; config: any }) => {
  const { camera } = useThree();
  const interpolationSpeed = 0.08;

  useFrame(() => {
    const currentConfig = isExpanded ? config.expanded : config.notExpanded;
    const targetZ = currentConfig.cameraZ;

    camera.position.x += (0 - camera.position.x) * interpolationSpeed;
    camera.position.y += (0 - camera.position.y) * interpolationSpeed;
    camera.position.z += (targetZ - camera.position.z) * interpolationSpeed;
  });

  return null;
};

export default function WorldExperienceSection() {
  const GLOBE_CONFIG = {
    notExpanded: {
      cameraZ: 1.5,
      filter: 'brightness(0.7) contrast(3)',
      dottedOpacity: 1,
      darkOpacity: 0.3,
      overlayDuration: 0.5,
    },
    expanded: {
      cameraZ: 3.7,
      filter: 'none',
      dottedOpacity: 0,
      darkOpacity: 0.2, // Opacity for the globe
      overlayDuration: 3,
    },
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [globeLoadedOnce, setGlobeLoadedOnce] = useState(false);
  const [sunPhase, setSunPhase] = useState('day');
  const [phaseProgress, setPhaseProgress] = useState(0);
  const controlsRef = useRef<any>(null);
  const globeMeshRef = useRef<THREE.Mesh>(null);
  const scrollPositionRef = useRef(0); // Store scroll position for restoration

  const projectMarkers = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      transform: getMarkerTransform(project.location.lat, project.location.lng),
    }));
  }, []);

  const momentMarkers = useMemo(() => {
    return GLOBE_MOMENT_LOCATIONS.map((location, index) => ({
      ...location,
      id: `moment-${index}`,
      transform: getMarkerTransform(location.lat, location.lng),
    }));
  }, []);

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

  useEffect(() => {
    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, []);

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
        closeGlobe();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [isExpanded, closeGlobe]);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleGlobeLoaded = () => {
    setGlobeLoadedOnce(true);
  };

  return (
    <>
      <section
        id="world-experience"
        className={`${isExpanded ? 'fixed inset-0 z-50' : 'relative w-full h-screen'} overflow-hidden bg-black snap-start`}
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_90%_at_50%_50%,_rgba(20,50,120,0.4),_rgba(0,0,0,1))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(30,80,180,0.15),_transparent_60%)]" />
        </div>

        <div className="relative z-10 w-full flex flex-col h-full">
          <div className="relative w-full h-full">
            <Canvas
              camera={{ position: [0, 0, 0.8], fov: 45 }}
              className="absolute inset-0 w-full h-full"
              style={{
                filter: isExpanded ? GLOBE_CONFIG.expanded.filter : GLOBE_CONFIG.notExpanded.filter,
              }}
              gl={{ antialias: true, alpha: false }}
            >
              <GlobeProvider globeRef={globeMeshRef}>
                <ambientLight intensity={isExpanded ? 0.3 : 0.2} />
                <directionalLight position={[5, 5, 5]} intensity={isExpanded ? 0.9 : 0.7} />
                {isExpanded && <StarsParallax />}
                <Suspense fallback={null}>
                  <Earth
                    onLoaded={handleGlobeLoaded}
                    scale={1.1}
                    timeOfDay={timeOfDay}
                    isExpanded={isExpanded}
                    sunPhase={sunPhase}
                    phaseProgress={phaseProgress}
                    meshRef={globeMeshRef}
                  />
                  <CloudLayer />
                  {isExpanded && <Atmosphere />}
                  {isExpanded && <OuterGlow />}
                  {/* Markers positioned at geographic locations on the globe - only render after Earth is fully loaded */}
                  {isExpanded && globeLoadedOnce && (
                    <MarkersGroup>
                      <group>
                        {projectMarkers.map((marker) => (
                          <group key={marker.id}>
                            <mesh
                              position={marker.transform.position}
                              quaternion={marker.transform.quaternion}
                            >
                              <cylinderGeometry args={[0.01, 0.01, marker.transform.height, 8]} />
                              <meshStandardMaterial color="#0ea5e9" emissive="#38bdf8" emissiveIntensity={0.7} />
                            </mesh>
                            <mesh
                              position={marker.transform.tipPosition}
                              onClick={(event) => {
                                event.stopPropagation();
                                handleProjectSelect(marker);
                              }}
                              onPointerOver={() => {
                                document.body.style.cursor = 'pointer';
                              }}
                              onPointerOut={() => {
                                document.body.style.cursor = 'default';
                              }}
                            >
                              <sphereGeometry args={[0.035, 12, 12]} />
                              <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.9} metalness={0.2} />
                            </mesh>
                          </group>
                        ))}
                      </group>
                      <group>
                        {momentMarkers.map((marker) => (
                          <group key={marker.id}>
                            <mesh
                              position={marker.transform.position}
                              quaternion={marker.transform.quaternion}
                            >
                              <cylinderGeometry args={[0.008, 0.008, marker.transform.height, 8]} />
                              <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.6} />
                            </mesh>
                            <mesh
                              position={marker.transform.tipPosition}
                              onPointerOver={() => {
                                document.body.style.cursor = 'pointer';
                              }}
                              onPointerOut={() => {
                                document.body.style.cursor = 'default';
                              }}
                            >
                              <sphereGeometry args={[0.025, 12, 12]} />
                              <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8} metalness={0.1} />
                            </mesh>
                          </group>
                        ))}
                      </group>
                      <CurrentLocationPulse />
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

            {/* Dotted Overlay - only visible when not expanded */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(0,0,0,var(--dotted-overlay-opacity, 0.25)) 1.5px, transparent 1.5px)`,
                backgroundSize: '4px 4px',
              }}
              animate={{ opacity: isExpanded ? GLOBE_CONFIG.expanded.dottedOpacity : GLOBE_CONFIG.notExpanded.dottedOpacity }}
              transition={{ duration: isExpanded ? GLOBE_CONFIG.expanded.overlayDuration : GLOBE_CONFIG.notExpanded.overlayDuration, ease: 'easeInOut' }}
            />

        {/* Dark Overlay - only visible when not expanded */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-5 bg-black"
          animate={{ opacity: isExpanded ? GLOBE_CONFIG.expanded.darkOpacity : GLOBE_CONFIG.notExpanded.darkOpacity }}
          transition={{ duration: isExpanded ? GLOBE_CONFIG.expanded.overlayDuration : GLOBE_CONFIG.notExpanded.overlayDuration, ease: 'easeInOut' }}
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

          <AnimatePresence>
            {isExpanded && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={closeGlobe}
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
          </div>

          <AnimatePresence>
            {selectedProject && (
              <ProjectLightbox project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
          </AnimatePresence>
        </div>
      </section>

      {isExpanded && (
        <div className="fixed inset-0 z-40" onClick={closeGlobe} />
      )}
    </>
  );
}
