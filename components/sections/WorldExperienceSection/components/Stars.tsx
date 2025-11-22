import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGlobeMesh } from '../context/GlobeContext';

interface SoftStarsProps {
  visibility?: number;
}

export const SoftStars = ({ visibility = 1 }: SoftStarsProps) => {
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
      opacity: visibility * 0.95,
      fog: false,
      map: starTexture,
      vertexColors: true, // Use vertex colors for brightness variation
    });
  }, [starTexture, visibility]);

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

interface StarsParallaxProps {
  visibility?: number;
}

export const StarsParallax = ({ visibility = 1 }: StarsParallaxProps) => {
  const starsRef = useRef<THREE.Group>(null);
  const globeMeshRef = useGlobeMesh();

  useFrame(() => {
    if (starsRef.current && globeMeshRef.current) {
      // Rotate stars much slower than the globe for subtle parallax effect
      const slowMultiplier = 0.1; // Stars rotate at 10% of globe speed
      starsRef.current.rotation.x = globeMeshRef.current.rotation.x * slowMultiplier;
      starsRef.current.rotation.y = globeMeshRef.current.rotation.y * slowMultiplier;
      starsRef.current.rotation.z = globeMeshRef.current.rotation.z * slowMultiplier;
    }
  });

  return (
    <group ref={starsRef}>
      <SoftStars visibility={visibility} />
    </group>
  );
};
