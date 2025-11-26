import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TWINKLE_SPEED_PERCENT = 150; // Adjust to scale twinkle animation speed (100 = default)
const TWINKLE_SPEED_MULTIPLIER = TWINKLE_SPEED_PERCENT / 100;

// Custom shader for stationary, ultra-realistic twinkling stars
const STAR_VERTEX_SHADER = `
  attribute float size;
  attribute float speed;
  attribute float phase;
  attribute float twinkle;
  attribute vec3 color;
  varying float vOpacity;
  varying vec3 vColor;
  uniform float time;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float depthScale = clamp(1200.0 / -mvPosition.z, 0.6, 4.5);
    gl_PointSize = size * depthScale;

    float slowPulse = sin(time * speed + phase);
    float driftPulse = sin(time * (speed * 0.35 + 0.05) + phase * 1.7);
    float sparkle = sin(time * (speed * 2.4 + 0.18) + phase * 3.5);
    float microPulse = sin(time * (speed * 4.0 + 0.33) + phase * 5.0) * 0.2;
    float flicker = slowPulse * 0.45 + driftPulse * 0.25 + sparkle * 0.25 + microPulse;
    float normalized = clamp(0.45 + flicker * (twinkle + 0.15), 0.0, 1.0);
    normalized = normalized * normalized * (3.0 - 2.0 * normalized);

    vOpacity = mix(0.65, 1.15, normalized);
    vColor = color;
  }
`;

const STAR_FRAGMENT_SHADER = `
  varying float vOpacity;
  varying vec3 vColor;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);

    float halo = smoothstep(0.65, 0.0, dist);
    float core = smoothstep(0.25, 0.0, dist);
    float bloom = exp(-9.0 * dist * dist);

    vec3 color = vColor * (0.55 + 0.45 * halo) + vColor * bloom * 0.6;
    float alpha = vOpacity * (core * 0.7 + bloom * 0.3);

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

const StarfieldBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight || 1,
      1,
      5000
    );
    camera.position.z = 1500;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const starGeometry = new THREE.BufferGeometry();
    const baseStarCount = 8200;
    const accentStarCount = 350;
    const clusterConfigs = Array.from({ length: 7 }, () => ({
      center: new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(2600),
        THREE.MathUtils.randFloatSpread(2600),
        -(700 + Math.random() * 2200)
      ),
      spread: THREE.MathUtils.randFloat(120, 260),
      depthSpread: THREE.MathUtils.randFloat(120, 260),
      count: Math.floor(THREE.MathUtils.randFloat(90, 160))
    }));
    const clusterStarCount = clusterConfigs.reduce((sum, cfg) => sum + cfg.count, 0);
    const starCount = baseStarCount + clusterStarCount + accentStarCount;

    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    const speeds = new Float32Array(starCount);
    const phases = new Float32Array(starCount);
    const twinkles = new Float32Array(starCount);
    const colors = new Float32Array(starCount * 3);

    const coolPalette = [
      new THREE.Color(0xfafcfe),
      new THREE.Color(0xe4edff),
      new THREE.Color(0xd2f3ff)
    ];
    const warmPalette = [
      new THREE.Color(0xfff1da),
      new THREE.Color(0xffd7b2),
      new THREE.Color(0xffc6a1)
    ];
    const palettes = [coolPalette, warmPalette];

    const assignStar = (
      index: number,
      position: THREE.Vector3,
      sizeRange: [number, number],
      speedRange: [number, number],
      twinkleRange: [number, number],
      palette: THREE.Color[]
    ) => {
      positions[index * 3] = position.x;
      positions[index * 3 + 1] = position.y;
      positions[index * 3 + 2] = position.z;

      sizes[index] = THREE.MathUtils.randFloat(sizeRange[0], sizeRange[1]);
      speeds[index] = THREE.MathUtils.randFloat(speedRange[0], speedRange[1]);
      phases[index] = Math.random() * Math.PI * 2;
      twinkles[index] = THREE.MathUtils.randFloat(twinkleRange[0], twinkleRange[1]);

      const color = palette[Math.floor(Math.random() * palette.length)].clone();
      const tint = 0.8 + Math.random() * 0.4;
      colors[index * 3] = color.r * tint;
      colors[index * 3 + 1] = color.g * tint;
      colors[index * 3 + 2] = color.b * tint;
    };

    const baseSizeRange: [number, number] = [0.7, 1.9];
    const baseSpeedRange: [number, number] = [
      0.35 * TWINKLE_SPEED_MULTIPLIER,
      0.85 * TWINKLE_SPEED_MULTIPLIER
    ];
    const baseTwinkleRange: [number, number] = [0.3, 0.75];
    const clusterSizeRange: [number, number] = [1.2, 2.6];
    const clusterSpeedRange: [number, number] = [
      0.45 * TWINKLE_SPEED_MULTIPLIER,
      1.0 * TWINKLE_SPEED_MULTIPLIER
    ];
    const clusterTwinkleRange: [number, number] = [0.45, 0.85];
    const accentSizeRange: [number, number] = [2.4, 4.2];
    const accentSpeedRange: [number, number] = [
      0.7 * TWINKLE_SPEED_MULTIPLIER,
      1.6 * TWINKLE_SPEED_MULTIPLIER
    ];
    const accentTwinkleRange: [number, number] = [0.6, 1.0];

    let pointer = 0;

    for (let i = 0; i < baseStarCount; i++) {
      const position = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(4800),
        THREE.MathUtils.randFloatSpread(4800),
        -(400 + Math.random() * 3200)
      );
      assignStar(
        pointer++,
        position,
        baseSizeRange,
        baseSpeedRange,
        baseTwinkleRange,
        palettes[Math.random() > 0.55 ? 0 : 1]
      );
    }

    clusterConfigs.forEach((cluster) => {
      for (let i = 0; i < cluster.count; i++) {
        const position = new THREE.Vector3(
          cluster.center.x + THREE.MathUtils.randFloatSpread(cluster.spread),
          cluster.center.y + THREE.MathUtils.randFloatSpread(cluster.spread),
          cluster.center.z + THREE.MathUtils.randFloatSpread(cluster.depthSpread)
        );

        assignStar(
          pointer++,
          position,
          clusterSizeRange,
          clusterSpeedRange,
          clusterTwinkleRange,
          Math.random() > 0.4 ? coolPalette : warmPalette
        );
      }
    });

    for (let i = 0; i < accentStarCount; i++) {
      const position = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(3400),
        THREE.MathUtils.randFloatSpread(3400),
        -(450 + Math.random() * 2500)
      );
      assignStar(
        pointer++,
        position,
        accentSizeRange,
        accentSpeedRange,
        accentTwinkleRange,
        warmPalette
      );
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    starGeometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
    starGeometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
    starGeometry.setAttribute('twinkle', new THREE.BufferAttribute(twinkles, 1));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: STAR_VERTEX_SHADER,
      fragmentShader: STAR_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      starMaterial.uniforms.time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const resizeRenderer = () => {
      if (!container) return;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    let resizeObserver: ResizeObserver | null = null;
    resizeRenderer();
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(resizeRenderer);
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', resizeRenderer);
    }

    // Cleanup
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', resizeRenderer);
      }
      cancelAnimationFrame(animationId);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ background: 'black' }}
    />
  );
};

export default StarfieldBackground;
