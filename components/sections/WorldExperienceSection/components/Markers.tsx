import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGlobeMesh } from '../context/GlobeContext';
import { normalizeHexColor, latLngToCartesian } from '../utils';
import { CURRENT_LOCATION } from '../constants';

// Texture and normal map generator for realistic metallic marker appearance
const createMetallicMaterials = (color: string) => {
  const normalizedColor = normalizeHexColor(color);
  const rgb = parseInt(normalizedColor.replace('#', ''), 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;

  // Create main texture
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return { texture: new THREE.CanvasTexture(canvas), normalMap: new THREE.CanvasTexture(canvas) };

  // Create detailed metallic surface with strong contrast
  const imageData = ctx.createImageData(256, 256);
  const data = imageData.data;

  for (let i = 0; i < 256; i++) {
    for (let j = 0; j < 256; j++) {
      const index = (i * 256 + j) * 4;

      // Multiple layers of noise for realistic metallic finish
      let noise = 0;
      let amplitude = 1;
      let maxAmplitude = 0;

      for (let octave = 0; octave < 5; octave++) {
        const freq = Math.pow(2, octave);
        noise += amplitude * Math.sin((i * freq) / 64) * Math.cos((j * freq) / 64);
        maxAmplitude += amplitude;
        amplitude *= 0.5;
      }
      noise = (noise / maxAmplitude + 1) / 2;

      // Scratches and micro-details
      const scratch = Math.sin(i * 0.3) * Math.cos(j * 0.2) * 0.5;
      const dust = Math.random() * 0.3;
      const metallic = noise * 0.6 + scratch * 0.25 + dust * 0.15;

      // Create strong metallic highlights
      const highlight = Math.pow(Math.max(0, metallic - 0.3) * 2, 1.5) * 0.6;

      // Apply with strong metallic shine
      const finalValue = Math.min(1, metallic + highlight);
      data[index] = Math.min(255, r + finalValue * 100);
      data[index + 1] = Math.min(255, g + finalValue * 100);
      data[index + 2] = Math.min(255, b + finalValue * 100);
      data[index + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);

  // Add heavy directional brushed pattern
  ctx.globalAlpha = 0.3;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;
  for (let i = 0; i < 150; i++) {
    const startX = Math.random() * 256;
    const startY = Math.random() * 256;
    const length = Math.random() * 120 + 40;
    const angle = (Math.random() * 0.4 - 0.2) + (Math.PI / 4); // Directional bias

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + Math.cos(angle) * length, startY + Math.sin(angle) * length);
    ctx.stroke();
  }

  // Add some darker scratches
  ctx.globalAlpha = 0.25;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 100; i++) {
    const startX = Math.random() * 256;
    const startY = Math.random() * 256;
    const length = Math.random() * 60 + 20;
    const angle = Math.random() * Math.PI * 2;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + Math.cos(angle) * length, startY + Math.sin(angle) * length);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  // Create normal map for depth
  const normalCanvas = document.createElement('canvas');
  normalCanvas.width = 256;
  normalCanvas.height = 256;
  const normalCtx = normalCanvas.getContext('2d');
  if (!normalCtx) return { texture, normalMap: new THREE.CanvasTexture(normalCanvas) };

  const normalImageData = normalCtx.createImageData(256, 256);
  const normalData = normalImageData.data;

  for (let i = 0; i < 256; i++) {
    for (let j = 0; j < 256; j++) {
      const index = (i * 256 + j) * 4;

      // Generate normal map with strong detail
      const noise1 = Math.sin(i * 0.5) * Math.cos(j * 0.3);
      const noise2 = Math.sin(i * 0.2) * Math.cos(j * 0.4) * 0.5;
      const detail = (noise1 + noise2) * 0.5;

      // Normal map: encode as RGB
      // Use detail for bumpy surface
      normalData[index] = 128 + detail * 100; // X component
      normalData[index + 1] = 128 + Math.sin(j * 0.4) * 50; // Y component
      normalData[index + 2] = 200 + detail * 30; // Z component (mostly up)
      normalData[index + 3] = 255;
    }
  }
  normalCtx.putImageData(normalImageData, 0, 0);

  const normalMap = new THREE.CanvasTexture(normalCanvas);
  normalMap.magFilter = THREE.LinearFilter;
  normalMap.minFilter = THREE.LinearMipmapLinearFilter;

  return { texture, normalMap };
};

interface MarkerSphereProps {
  position: [number, number, number];
  color: string;
  emissiveColor: string;
  hoverColor?: string;
  hoverEmissiveColor?: string;
  size?: number;
  onHover?: (isHovering: boolean) => void;
  onClick?: () => void;
  metalness?: number;
  roughness?: number;
  segments?: number;
}

export const MarkerSphere = ({
  position,
  color,
  emissiveColor,
  hoverColor = '#19bdefff',
  hoverEmissiveColor = '#19bdefff',
  size = 0.005,
  onHover,
  onClick,
  metalness = 0.7,
  roughness = 0.2,
  segments = 16,
}: MarkerSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const targetScaleRef = useRef(1);

  const sanitizedColor = useMemo(() => normalizeHexColor(color), [color]);
  const sanitizedEmissiveColor = useMemo(() => normalizeHexColor(emissiveColor), [emissiveColor]);
  const sanitizedHoverColor = useMemo(() => normalizeHexColor(hoverColor), [hoverColor]);
  const sanitizedHoverEmissiveColor = useMemo(
    () => normalizeHexColor(hoverEmissiveColor),
    [hoverEmissiveColor]
  );

  const { texture, normalMap } = useMemo(() => createMetallicMaterials(sanitizedColor), [sanitizedColor]);
  const defaultColor = useMemo(
    () => new THREE.Color(sanitizedColor).multiplyScalar(0.7),
    [sanitizedColor]
  );
  const hoverColorValue = useMemo(() => new THREE.Color(sanitizedHoverColor), [sanitizedHoverColor]);
  const defaultEmissive = useMemo(
    () => new THREE.Color(sanitizedEmissiveColor).multiplyScalar(0.8),
    [sanitizedEmissiveColor]
  );
  const hoverEmissive = useMemo(() => new THREE.Color(sanitizedHoverEmissiveColor), [sanitizedHoverEmissiveColor]);

  useEffect(() => {
    return () => {
      texture.dispose();
      normalMap.dispose();
    };
  }, [texture, normalMap]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Smooth scale animation
      targetScaleRef.current = isHovered ? 1.4 : 1;
      const currentScale = meshRef.current.scale.x;
      meshRef.current.scale.setScalar(currentScale + (targetScaleRef.current - currentScale) * 0.1);

      // Only rotate while hovered for dynamic touch
      if (isHovered) {
        meshRef.current.rotation.y += 0.02;

        // Pulse on hover
        const pulse = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.05;
        meshRef.current.scale.multiplyScalar(pulse / currentScale);
      }

      // Update emissive intensity on hover
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      const targetIntensity = isHovered ? 1.5 : 0.9;
      material.emissiveIntensity += (targetIntensity - material.emissiveIntensity) * 0.1;
      material.color.lerp(isHovered ? hoverColorValue : defaultColor, 0.12);
      material.emissive.lerp(isHovered ? hoverEmissive : defaultEmissive, 0.08);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(event) => {
        event.stopPropagation();
      }}
      onPointerOver={() => {
        setIsHovered(true);
        onHover?.(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setIsHovered(false);
        onHover?.(false);
        document.body.style.cursor = 'default';
      }}
    >
      <sphereGeometry args={[size, segments, segments]} />
      <meshStandardMaterial
        map={texture}
        normalMap={normalMap}
        color={defaultColor.getStyle()}
        emissive={defaultEmissive.getStyle()}
        emissiveIntensity={0.9}
        metalness={metalness}
        roughness={roughness}
      />
    </mesh>
  );
};

interface MarkersGroupProps {
  children: React.ReactNode;
}

export const MarkersGroup = ({ children }: MarkersGroupProps) => {
  const markersRef = useRef<THREE.Group>(null);
  const globeMeshRef = useGlobeMesh();

  useFrame(() => {
    if (markersRef.current && globeMeshRef.current) {
      // Sync markers rotation with globe rotation
      markersRef.current.rotation.copy(globeMeshRef.current.rotation);
    }
  });

  return <group ref={markersRef}>{children}</group>;
};

interface CurrentLocationPulseProps {
  color?: string;
  pulseSize?: number;
  pulseSpeed?: number;
  visibility?: number;
}

export const CurrentLocationPulse = ({
  color = '#a21111ff',
  pulseSize = 0.02,
  pulseSpeed = 0.6,
  visibility = 1
}: CurrentLocationPulseProps) => {
  const position = useMemo(() => {
    const phi = (90 - CURRENT_LOCATION.lat) * (Math.PI / 180);
    const theta = (CURRENT_LOCATION.lng + 180) * (Math.PI / 180);
    const radius = 1.02;
    return [
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      -radius * Math.sin(phi) * Math.sin(theta)
    ] as [number, number, number];
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
      (coreRef.current.material as THREE.MeshStandardMaterial).opacity = visibility;
    }

    // Pulse wave 1
    if (pulse1Ref.current) {
      const progress1 = (time * pulseSpeed) % 2.5;
      const scale1 = 1 + progress1 * 3;
      const opacity1 = Math.max(0, 1 - progress1 / 2.5);
      pulse1Ref.current.scale.setScalar(scale1);
      (pulse1Ref.current.material as THREE.MeshBasicMaterial).opacity = opacity1 * 0.5 * visibility;
    }

    // Pulse wave 2
    if (pulse2Ref.current) {
      const progress2 = ((time * pulseSpeed) + 0.83) % 2.5;
      const scale2 = 1 + progress2 * 3;
      const opacity2 = Math.max(0, 1 - progress2 / 2.5);
      pulse2Ref.current.scale.setScalar(scale2);
      (pulse2Ref.current.material as THREE.MeshBasicMaterial).opacity = opacity2 * 0.5 * visibility;
    }

    // Pulse wave 3
    if (pulse3Ref.current) {
      const progress3 = ((time * pulseSpeed) + 1.66) % 2.5;
      const scale3 = 1 + progress3 * 3;
      const opacity3 = Math.max(0, 1 - progress3 / 2.5);
      pulse3Ref.current.scale.setScalar(scale3);
      (pulse3Ref.current.material as THREE.MeshBasicMaterial).opacity = opacity3 * 0.5 * visibility;
    }
  });

  return (
    <group position={position}>
      {/* Core glowing marker */}
      <mesh ref={coreRef} scale={pulseSize / 0.02}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          toneMapped={false}
          transparent
        />
      </mesh>

      {/* Expanding pulse spheres with additive blending */}
      <mesh ref={pulse1Ref}>
        <sphereGeometry args={[pulseSize * 1.25, 16, 16]} />
        <meshBasicMaterial
          color="#6a6a6aff"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={pulse2Ref}>
        <sphereGeometry args={[pulseSize * 1.25, 16, 16]} />
        <meshBasicMaterial
          color="#6a6a6aff"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={pulse3Ref}>
        <sphereGeometry args={[pulseSize * 1.25, 16, 16]} />
        <meshBasicMaterial
          color="#6a6a6aff"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
