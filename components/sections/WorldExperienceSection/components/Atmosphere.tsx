import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AtmosphereProps {
  color?: string;
  intensity?: number;
  scale?: number;
  positionX?: number;
  positionY?: number;
  positionZ?: number;
  blur?: number;
  glow?: number;
  terminatorSoftness?: number;
}

export const Atmosphere = ({
  color = '#0077be',
  intensity = 0.4,
  scale = 1.05,
  positionX = 0,
  positionY = 0,
  positionZ = 0,
  blur = 0,
  glow = 0,
  terminatorSoftness = 0.25,
}: AtmosphereProps) => {
  // Parse color to RGB
  const rgb = parseInt(color.replace('#', ''), 16);
  const r = ((rgb >> 16) & 255) / 255;
  const g = ((rgb >> 8) & 255) / 255;
  const b = (rgb & 255) / 255;

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Vector3(r, g, b) },
          uIntensity: { value: intensity },
          uTerminatorSoftness: { value: terminatorSoftness },
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform vec3 uColor;
          uniform float uIntensity;
          uniform float uTerminatorSoftness;
          void main() {
            vec3 viewDir = vec3(0.0, 0.0, 1.0);
            float facing = dot(vNormal, viewDir);
            float softness = smoothstep(-uTerminatorSoftness, uTerminatorSoftness, facing);
            float glow = pow(clamp(0.7 - softness * 0.7, 0.0, 1.0), 2.2);
            float alpha = (glow * 0.6 + softness * 0.4) * uIntensity;
            gl_FragColor = vec4(uColor, alpha);
          }
        `,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      }),
    [r, g, b, intensity, terminatorSoftness]
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
      ref.current.position.x = positionX;
      ref.current.position.y = positionY;
      ref.current.position.z = positionZ;
      if (material.uniforms.uIntensity) {
        material.uniforms.uIntensity.value = intensity + glow;
      }
      if (material.uniforms.uTerminatorSoftness) {
        material.uniforms.uTerminatorSoftness.value = terminatorSoftness;
      }
    }
  });

  return (
    <mesh ref={ref} position={[positionX, positionY, positionZ]} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

interface OuterGlowProps {
  color?: string;
  intensity?: number;
  scale?: number;
  positionX?: number;
  positionY?: number;
  positionZ?: number;
}

export const OuterGlow = ({
  color = '#0857f7',
  intensity = 0.9,
  scale = 1.15,
  positionX = 0,
  positionY = 0,
  positionZ = 0
}: OuterGlowProps) => {
  // Parse color to RGB
  const rgb = parseInt(color.replace('#', ''), 16);
  const r = ((rgb >> 16) & 255) / 255;
  const g = ((rgb >> 8) & 255) / 255;
  const b = (rgb & 255) / 255;

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uGlowColor: { value: new THREE.Vector3(r, g, b) },
          uIntensity: { value: intensity },
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform vec3 uGlowColor;
          uniform float uIntensity;
          void main() {
            float intensity = pow(1.05 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.5);
            gl_FragColor = vec4(uGlowColor, intensity * uIntensity);
          }
        `,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      }),
    [r, g, b, intensity]
  );

  useEffect(() => {
    return () => material.dispose();
  }, [material]);

  return (
    <mesh position={[positionX, positionY, positionZ]} scale={[scale, scale, scale]}>
      <sphereGeometry args={[1, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};
