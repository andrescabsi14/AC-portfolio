import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, useAnimation } from 'framer-motion';

const TWINKLE_SPEED_PERCENT = 150; // Adjust to scale twinkle animation speed (100 = default)
const TWINKLE_SPEED_MULTIPLIER = TWINKLE_SPEED_PERCENT / 100;

const STARFIELD_FADE_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.5, ease: 'easeInOut' }
  }
};

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
    vec2 coord = gl_PointCoord - 0.5;
    float dist = length(coord);

    float radial = smoothstep(0.5, 0.0, dist);
    float core = smoothstep(0.2, 0.0, dist);
    float sparkle = exp(-18.0 * dist * dist);

    float angle = atan(coord.y, coord.x);
    float cross = pow(abs(cos(angle * 4.0)), 2.0) * smoothstep(0.45, 0.0, dist);

    float alpha = vOpacity * (core * 0.6 + sparkle * 0.3 + radial * 0.1 + cross * 0.2);
    vec3 color = vColor * (0.35 + 0.65 * core) + vColor * sparkle * 0.8 + vColor * radial * 0.2;

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

const STAR_GLOW_VERTEX_SHADER = `
  attribute float size;
  attribute float speed;
  attribute float phase;
  attribute float twinkle;
  uniform float time;
  varying float vGlowIntensity;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    float depthScale = clamp(1400.0 / -mvPosition.z, 0.4, 4.5);
    gl_PointSize = size * depthScale * 3.0;

    float slowPulse = sin(time * speed + phase);
    float driftPulse = sin(time * (speed * 0.5 + 0.15) + phase * 1.1);
    float combined = 0.5 + 0.5 * (slowPulse * 0.6 + driftPulse * 0.4);
    vGlowIntensity = mix(0.15, 1.0, combined * twinkle);
  }
`;

const STAR_GLOW_FRAGMENT_SHADER = `
  varying float vGlowIntensity;

  void main() {
    vec2 coord = gl_PointCoord - 0.5;
    float dist = length(coord);

    float glow = exp(-6.0 * dist * dist);
    float halo = smoothstep(0.9, 0.0, dist);
    float alpha = (glow * 0.7 + halo * 0.3) * vGlowIntensity * 0.55;

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(0.7, 0.82, 1.0, alpha);
  }
`;

const StarfieldBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const section = document.getElementById('world-experience');
    if (!section) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsVisible(entries[0].isIntersecting);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    controls.start(isVisible ? 'visible' : 'hidden');
  }, [isVisible, controls]);

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

    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: STAR_GLOW_VERTEX_SHADER,
      fragmentShader: STAR_GLOW_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const starGlow = new THREE.Points(starGeometry, glowMaterial);
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(starGlow);
    scene.add(stars);

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      starMaterial.uniforms.time.value = elapsed;
      glowMaterial.uniforms.time.value = elapsed;
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
      glowMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 z-0 pointer-events-none"
      variants={STARFIELD_FADE_VARIANTS}
      initial="hidden"
      animate={controls}
    >
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 55% 20%, rgba(22,70,140,0.35), rgba(0,0,0,0) 45%), linear-gradient(180deg, rgba(2,7,15,0.95) 0%, rgba(1,2,6,0.85) 55%, rgba(0,0,0,0.98) 100%)'
        }}
      />
      <div ref={containerRef} className="absolute inset-0" />
    </motion.div>
  );
};

export default StarfieldBackground;
