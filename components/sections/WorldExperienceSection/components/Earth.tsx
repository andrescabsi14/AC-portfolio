import { RefObject, useRef, useMemo, useEffect } from 'react';
import { useFrame, useLoader, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { latLngToCartesian } from '../utils';
import { CURRENT_LOCATION, DAY_TEXTURE_URL, NIGHT_TEXTURE_URL, CLOUDS_TEXTURE_URL, HIGH_DAY_TEXTURE_URL, HIGH_NIGHT_TEXTURE_URL, TEXTURE_U_OFFSET, TEXTURE_V_OFFSET } from '../constants';

interface EarthProps {
  onLoaded: () => void;
  scale?: number;
  timeOfDay: number;
  isExpanded?: boolean;
  sunPhase?: string;
  phaseProgress?: number;
  meshRef: RefObject<THREE.Mesh | null>;
  terminatorSoftness?: number;
  lightDir?: THREE.Vector3;
  rotationSpeed?: number;
  segments?: number;
  blur?: number;
  positionX?: number;
  positionY?: number;
  positionZ?: number;
}

export const Earth = ({
  onLoaded,
  scale = 1,
  timeOfDay,
  isExpanded = false,
  sunPhase = 'day',
  phaseProgress = 7,
  meshRef,
  terminatorSoftness = 0.35,
  lightDir = new THREE.Vector3(1, 0.2, 0.5),
  rotationSpeed = 0.02,
  segments = 64,
  blur = 0,
  positionX = 0,
  positionY = 0,
  positionZ = 0,
}: EarthProps) => {
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
        uLightDir: { value: lightDir.clone().normalize() },
        uTimeOfDay: { value: timeOfDay },
        uTerminatorSoftness: { value: terminatorSoftness },
        uSunPhase: { value: 0 }, // 0 = night, 1 = dawn, 2 = day, 3 = dusk
        uPhaseProgress: { value: 0 }, // 0 to 1 progress through phase
        uDawnDuskColor: { value: new THREE.Vector3(1.0, 0.6, 0.8) }, // Orange
        uTextureBlend: { value: 0 }, // 0 = low-res, 1 = high-res
        uIsExpanded: { value: isExpanded ? 1.0 : 0.0 }, // 1.0 = expanded, 0.0 = not expanded
        uBlur: { value: blur }, // 0 = no blur, >0 = blur effect
        uTextureUOffset: { value: TEXTURE_U_OFFSET }, // U (horizontal) texture offset
        uTextureVOffset: { value: TEXTURE_V_OFFSET }, // V (vertical) texture offset
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
        uniform float uBlur;
        uniform float uTextureUOffset;
        uniform float uTextureVOffset;

        // Texture blur function - applies 9-tap box blur
        vec3 blurTexture(sampler2D tex, vec2 uv, float blurAmount) {
          vec3 result = vec3(0.0);

          // 9-tap box blur (unrolled)
          result += texture2D(tex, uv + vec2(-1.0, -1.0) * blurAmount).rgb;
          result += texture2D(tex, uv + vec2(0.0, -1.0) * blurAmount).rgb;
          result += texture2D(tex, uv + vec2(1.0, -1.0) * blurAmount).rgb;
          result += texture2D(tex, uv + vec2(-1.0, 0.0) * blurAmount).rgb;
          result += texture2D(tex, uv + vec2(0.0, 0.0) * blurAmount).rgb;
          result += texture2D(tex, uv + vec2(1.0, 0.0) * blurAmount).rgb;
          result += texture2D(tex, uv + vec2(-1.0, 1.0) * blurAmount).rgb;
          result += texture2D(tex, uv + vec2(0.0, 1.0) * blurAmount).rgb;
          result += texture2D(tex, uv + vec2(1.0, 1.0) * blurAmount).rgb;

          return result / 9.0;
        }

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

        // Determine blur amount for texture sampling
        float blurAmount = uBlur > 0.0 ? uBlur * 0.005 : 0.0;
        vec2 correctedUv = vec2(vUv.x + uTextureUOffset, 1.0 - vUv.y + uTextureVOffset);

        // Sample low-res textures with optional blur
        vec3 lowDayColor = blurAmount > 0.0 ? blurTexture(uDayMap, correctedUv, blurAmount) : texture2D(uDayMap, correctedUv).rgb;
        vec3 lowNightColor = blurAmount > 0.0 ? blurTexture(uNightMap, correctedUv, blurAmount) : texture2D(uNightMap, correctedUv).rgb;
        vec3 cloudsColor = blurAmount > 0.0 ? blurTexture(uCloudsMap, correctedUv, blurAmount) : texture2D(uCloudsMap, correctedUv).rgb;

        // Sample high-res textures with optional blur
        vec3 highDayColor = blurAmount > 0.0 ? blurTexture(uHighDayMap, correctedUv, blurAmount) : texture2D(uHighDayMap, correctedUv).rgb;
        vec3 highNightColor = blurAmount > 0.0 ? blurTexture(uHighNightMap, correctedUv, blurAmount) : texture2D(uHighNightMap, correctedUv).rgb;

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
  }, [dayTexture, nightTexture, cloudsTexture, highDayTexture, highNightTexture, timeOfDay, sunPhase, phaseProgress, isExpanded, terminatorSoftness, lightDir, blur]);

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
  const expandAnimationRef = useRef({
    isAnimating: false,
    progress: 0,
    startQuaternion: new THREE.Quaternion(),
    targetQuaternion: new THREE.Quaternion(),
  });
  const hasAnimatedToNYCRef = useRef(false);

  // Handle globe centering when expanded
  useEffect(() => {
    if (isExpanded && !hasAnimatedToNYCRef.current && meshRef.current) {
      hasAnimatedToNYCRef.current = true;

      // Store the starting quaternion
      expandAnimationRef.current.startQuaternion.copy(meshRef.current.quaternion);

      // Calculate target rotation to center NYC
      const nycCartesian = latLngToCartesian(CURRENT_LOCATION.lat, CURRENT_LOCATION.lng, 1);

      // Create quaternion that rotates NYC point to face camera (positive Z direction)
      const targetDir = new THREE.Vector3(nycCartesian.x, nycCartesian.y, nycCartesian.z).normalize();
      const cameraDir = new THREE.Vector3(0, 0, 1); // Camera looks at positive Z

      expandAnimationRef.current.targetQuaternion.setFromUnitVectors(targetDir, cameraDir);

      // Start animation
      expandAnimationRef.current.isAnimating = true;
      expandAnimationRef.current.progress = 0;
    } else if (!isExpanded) {
      // Reset when not expanded
      hasAnimatedToNYCRef.current = false;
      expandAnimationRef.current.isAnimating = false;
    }
  }, [isExpanded]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      if (!initialRotationSet.current) {
        meshRef.current.rotation.x = THREE.MathUtils.degToRad(0);
        meshRef.current.rotation.z = THREE.MathUtils.degToRad(0);
        initialRotationSet.current = true;
      }

      // Handle NYC centering animation
      if (expandAnimationRef.current.isAnimating) {
        expandAnimationRef.current.progress += delta * 1.5; // 1.5x speed for smooth animation

        if (expandAnimationRef.current.progress >= 1) {
          // Animation complete
          meshRef.current.quaternion.copy(expandAnimationRef.current.targetQuaternion);
          expandAnimationRef.current.isAnimating = false;
        } else {
          // Interpolate between start and target quaternion
          meshRef.current.quaternion.copy(expandAnimationRef.current.startQuaternion);
          meshRef.current.quaternion.slerp(expandAnimationRef.current.targetQuaternion, expandAnimationRef.current.progress);
        }
      }

      if (!pointerStateRef.current.isDragging) {
        meshRef.current.rotation.y += delta * rotationSpeed;
      }
      meshRef.current.position.set(positionX, positionY, positionZ);
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
      materialRef.current.uniforms.uBlur.value = blur;

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
      position={[positionX, positionY, positionZ]}
      scale={[scale, scale, -scale]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <sphereGeometry args={[1, isExpanded ? segments : 32, isExpanded ? segments : 32]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};
