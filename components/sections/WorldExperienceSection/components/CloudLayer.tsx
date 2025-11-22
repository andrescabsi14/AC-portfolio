import { useRef, useMemo, useEffect, RefObject } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useGlobeMesh } from '../context/GlobeContext';
import { CLOUDS_TEXTURE_URL } from '../constants';

interface CloudLayerProps {
  opacity?: number;
  scale?: number;
  positionX?: number;
  positionY?: number;
  positionZ?: number;
  blur?: number;
  rotationSpeed?: number;
}

export const CloudLayer = ({
  opacity = 0.6,
  scale = 1.08,
  positionX = 0,
  positionY = 0,
  positionZ = 0,
  blur = 0,
  rotationSpeed = 0.02
}: CloudLayerProps) => {
  const cloudsTexture = useLoader(THREE.TextureLoader, CLOUDS_TEXTURE_URL);
  cloudsTexture.flipY = false;

  useEffect(() => {
    return () => {
      cloudsTexture.dispose();
    };
  }, [cloudsTexture]);

  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const globeMeshRef = useGlobeMesh();

  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: cloudsTexture },
        uOpacity: { value: opacity },
        uBlur: { value: blur },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uOpacity;
        uniform float uBlur;
        varying vec2 vUv;

        void main() {
          vec2 correctedUv = vec2(vUv.x, 1.0 - vUv.y);
          vec4 texColor = vec4(0.0);

          // Apply blur effect - sample texture at multiple offsets
          if (uBlur > 0.0) {
            float blurAmount = uBlur * 0.01;

            // 9-tap box blur (unrolled)
            texColor += texture2D(uTexture, correctedUv + vec2(-1.0, -1.0) * blurAmount);
            texColor += texture2D(uTexture, correctedUv + vec2(0.0, -1.0) * blurAmount);
            texColor += texture2D(uTexture, correctedUv + vec2(1.0, -1.0) * blurAmount);
            texColor += texture2D(uTexture, correctedUv + vec2(-1.0, 0.0) * blurAmount);
            texColor += texture2D(uTexture, correctedUv + vec2(0.0, 0.0) * blurAmount);
            texColor += texture2D(uTexture, correctedUv + vec2(1.0, 0.0) * blurAmount);
            texColor += texture2D(uTexture, correctedUv + vec2(-1.0, 1.0) * blurAmount);
            texColor += texture2D(uTexture, correctedUv + vec2(0.0, 1.0) * blurAmount);
            texColor += texture2D(uTexture, correctedUv + vec2(1.0, 1.0) * blurAmount);
            texColor /= 9.0;
          } else {
            texColor = texture2D(uTexture, correctedUv);
          }

          texColor.a *= uOpacity;
          gl_FragColor = texColor;
        }
      `,
      transparent: true,
      depthWrite: false,
    });
    materialRef.current = mat;
    return mat;
  }, [cloudsTexture]);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      if (globeMeshRef.current) {
        meshRef.current.quaternion.copy(globeMeshRef.current.quaternion);
      } else {
        meshRef.current.rotation.y += delta * rotationSpeed;
      }
      meshRef.current.position.x = positionX;
      meshRef.current.position.y = positionY;
      meshRef.current.position.z = positionZ;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uOpacity.value = opacity;
      materialRef.current.uniforms.uBlur.value = blur;
    }
  });

  return (
    <mesh ref={meshRef} position={[positionX, positionY, positionZ]} scale={[scale, scale, scale]}>
      <sphereGeometry args={[1, 64, 64]} />
      <primitive object={material} attach="material" ref={materialRef} />
    </mesh>
  );
};
