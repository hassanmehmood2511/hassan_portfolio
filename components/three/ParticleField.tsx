"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Scroll-driven particle field.
 * A fine dust cloud that slowly rotates, reacts to the cursor, and morphs
 * through a sequence of shapes as the page scrolls.
 */

interface ParticleFieldProps {
  isDark: boolean;
  isMobile: boolean;
}

// Small deterministic PRNG so the layout is stable between renders
function makeRandom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type ShapeFn = (i: number, count: number, rnd: () => number) => [number, number, number];

// 1. Organic sphere (hero)
const sphere: ShapeFn = (i, count, rnd) => {
  const y = 1 - (i / (count - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const theta = i * 2.39996;
  const x = Math.cos(theta) * r;
  const z = Math.sin(theta) * r;
  const wobble = 1.7 + Math.sin(x * 3 + 1) * Math.cos(y * 2.5) * Math.sin(z * 3 + 2) * 0.3;
  const jitter = (rnd() - 0.5) * 0.18;
  const radius = wobble + jitter;
  return [x * radius, y * radius, z * radius];
};

// 2. Flowing wave surface (about / skills)
const wave: ShapeFn = (i, count, rnd) => {
  const cols = Math.ceil(Math.sqrt(count * 1.7));
  const cx = i % cols;
  const cz = Math.floor(i / cols);
  const rows = count / cols;
  const x = (cx / cols - 0.5) * 6.4;
  const z = (cz / rows - 0.5) * 4.2;
  const y = Math.sin(x * 0.9) * Math.cos(z * 1.1) * 0.5 + Math.sin(x * 2.2 + z * 1.6) * 0.12;
  return [x + (rnd() - 0.5) * 0.02, y, z + (rnd() - 0.5) * 0.02];
};

// 3. Torus ring (experience)
const torus: ShapeFn = (i, count, rnd) => {
  const u = (i / count) * Math.PI * 2 * 29;
  const v = rnd() * Math.PI * 2;
  const tube = 0.22 + 0.14 * Math.sin(u * 3) ** 2;
  const R = 1.85 + Math.cos(v) * tube;
  return [Math.cos(u) * R, Math.sin(u) * R, Math.sin(v) * tube];
};

// 4. Stacked columns, like a bar chart (projects)
const columns: ShapeFn = (i, count, rnd) => {
  const bars = 5;
  const b = i % bars;
  const heights = [1.6, 2.6, 2.0, 3.2, 2.3];
  const x = (b - (bars - 1) / 2) * 0.95 + (rnd() - 0.5) * 0.5;
  const y = -1.6 + rnd() * heights[b];
  const z = (rnd() - 0.5) * 0.5;
  return [x, y, z];
};

// 5. Galaxy spiral (education / contact)
const spiral: ShapeFn = (i, count, rnd) => {
  const arms = 3;
  const t = rnd();
  const arm = i % arms;
  const radius = 0.15 + t * 2.4;
  const angle = (arm / arms) * Math.PI * 2 + t * 5.5;
  const spread = (rnd() - 0.5) * 0.35 * (1 - t * 0.5);
  return [
    Math.cos(angle) * radius + spread,
    (rnd() - 0.5) * 0.25,
    Math.sin(angle) * radius + spread,
  ];
};

const SHAPES: ShapeFn[] = [sphere, wave, torus, columns, spiral];
// Section ids that trigger each morph step (in order)
const STEP_SECTIONS = ["about", "experience", "projects", "education"];
// Per-shape base tilt (x rotation) so flat shapes read well
const TILTS = [0.15, 0.42, 0.0, 0.08, 0.55];

const vertexShader = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute float aSeed;

  uniform float uMix;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  uniform float uPush;
  uniform float uIntro;

  varying float vSeed;
  varying float vDepth;

  void main() {
    // Each particle starts its transition slightly offset for an organic morph
    float t = smoothstep(aSeed * 0.4, aSeed * 0.4 + 0.6, uMix);
    vec3 p = mix(aFrom, aTo, t);

    // Swirl while in transit
    float transit = sin(3.14159 * t);
    p += transit * 0.45 * vec3(
      sin(aSeed * 91.0 + uTime * 0.7),
      cos(aSeed * 53.0 + uTime * 0.6),
      sin(aSeed * 37.0 - uTime * 0.5)
    );

    // Gentle constant drift
    p += 0.05 * vec3(
      sin(p.y * 2.0 + uTime * 0.6 + aSeed * 6.0),
      cos(p.z * 1.8 + uTime * 0.5),
      sin(p.x * 2.2 - uTime * 0.4)
    );

    // Intro: particles gather in from a wider scatter
    p *= mix(2.4 + aSeed * 2.5, 1.0, uIntro);

    vec4 world = modelMatrix * vec4(p, 1.0);

    // Push particles away from the cursor (in world XY)
    vec2 d = world.xy - uMouse;
    float r2 = dot(d, d);
    world.xy += normalize(d + 0.0001) * 0.45 * exp(-r2 * 2.2) * uPush;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;

    vDepth = clamp((p.z + 2.5) / 5.0, 0.0, 1.0);
    vSeed = aSeed;
    gl_PointSize = uSize * uPixelRatio * (0.7 + aSeed * 0.6) * (6.0 / -mv.z);
  }
`;

const fragmentShader = /* glsl */ `

  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uAlpha;
  uniform float uIntro;

  varying float vSeed;
  varying float vDepth;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float soft = smoothstep(0.5, 0.1, d);
    if (soft < 0.01) discard;

    vec3 color = mix(uColorA, uColorB, smoothstep(0.35, 0.7, vSeed));
    color = mix(color, uColorC, step(0.93, vSeed));

    float alpha = uAlpha * uIntro * (0.35 + 0.65 * vDepth) * soft;
    gl_FragColor = vec4(color, alpha);
  }
`;

export const ParticleField: React.FC<ParticleFieldProps> = ({ isDark, isMobile }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport, camera, size } = useThree();

  const count = isMobile ? 6000 : 16000;

  // Pre-compute every shape once
  const { geometry, shapeBuffers } = useMemo(() => {
    const rnd = makeRandom(20960);
    const buffers = SHAPES.map((fn) => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const [x, y, z] = fn(i, count, rnd);
        arr[i * 3] = x;
        arr[i * 3 + 1] = y;
        arr[i * 3 + 2] = z;
      }
      return arr;
    });

    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) seeds[i] = rnd();

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(buffers[0].slice(), 3));
    geo.setAttribute("aFrom", new THREE.BufferAttribute(buffers[0].slice(), 3));
    geo.setAttribute("aTo", new THREE.BufferAttribute(buffers[1].slice(), 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 10);

    return { geometry: geo, shapeBuffers: buffers };
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uMix: { value: 0 },
          uTime: { value: 0 },
          uSize: { value: 2.2 },
          uPixelRatio: { value: 1 },
          uMouse: { value: new THREE.Vector2(99, 99) },
          uPush: { value: 0 },
          uIntro: { value: 0 },
          uAlpha: { value: 0.8 },
          uColorA: { value: new THREE.Color() },
          uColorB: { value: new THREE.Color() },
          uColorC: { value: new THREE.Color() },
        },
      }),
    []
  );

  // Mutable handle to the GPU resources for effects and the frame loop
  const gpu = useRef({ geometry, material, shapeBuffers });
  useEffect(() => {
    gpu.current = { geometry, material, shapeBuffers };
  }, [geometry, material, shapeBuffers]);

  // Theme colors (from globals.css palette)
  useEffect(() => {
    const { material } = gpu.current;
    const u = material.uniforms;
    if (isDark) {
      u.uColorA.value.set("#F3EBDD"); // sand light
      u.uColorB.value.set("#2F6B4F"); // green mid
      u.uColorC.value.set("#C98A4B"); // copper accent
      material.blending = THREE.AdditiveBlending;
    } else {
      u.uColorA.value.set("#123D2B"); // deep green
      u.uColorB.value.set("#2F6B4F"); // green mid
      u.uColorC.value.set("#C98A4B"); // copper accent
      material.blending = THREE.NormalBlending;
    }
    material.needsUpdate = true;
  }, [isDark, geometry, material]);

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  // Live state kept in refs so scrolling never triggers React re-renders
  const state = useRef({
    stage: 0,
    targetStage: 0,
    pairIndex: -1,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    mouseActive: false,
    rotation: 0,
    shift: 0,
    alpha: 0.8,
    reduced: false,
  });

  useEffect(() => {
    const s = state.current;
    s.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const onMove = (e: PointerEvent) => {
      s.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      s.targetMouseY = -((e.clientY / window.innerHeight) * 2 - 1);
      s.mouseActive = true;
    };
    const onLeave = () => {
      s.mouseActive = false;
    };

    const computeStage = () => {
      const probe = window.scrollY + window.innerHeight * 0.6;
      let stage = 0;
      for (const id of STEP_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        stage += Math.min(Math.max((probe - top) / (window.innerHeight * 0.5) + 0.5, 0), 1);
      }
      s.targetStage = stage;

      // Fade the field back while reading content-heavy sections
      const hero = document.getElementById("hero");
      const inHero = hero ? hero.getBoundingClientRect().bottom > window.innerHeight * 0.45 : true;
      s.alpha = inHero ? 0.85 : 0.45;
    };

    if (finePointer) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("scroll", computeStage, { passive: true });
    window.addEventListener("resize", computeStage);
    computeStage();
    s.stage = s.targetStage;

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", computeStage);
      window.removeEventListener("resize", computeStage);
    };
  }, []);

  useFrame((frameState, rawDelta) => {
    const points = pointsRef.current;
    if (!points) return;
    const { geometry, material, shapeBuffers } = gpu.current;
    const s = state.current;
    const u = material.uniforms;
    const delta = Math.min(rawDelta, 0.05);
    const ease = s.reduced ? 1 : 1 - Math.pow(0.002, delta);

    // Morph progress
    s.stage += (s.targetStage - s.stage) * ease;
    const maxStage = SHAPES.length - 1;
    const stage = THREE.MathUtils.clamp(s.stage, 0, maxStage);
    const pair = Math.min(Math.floor(stage), maxStage - 1);

    if (pair !== s.pairIndex) {
      (geometry.getAttribute("aFrom") as THREE.BufferAttribute).copyArray(shapeBuffers[pair]).needsUpdate = true;
      (geometry.getAttribute("aTo") as THREE.BufferAttribute).copyArray(shapeBuffers[pair + 1]).needsUpdate = true;
      s.pairIndex = pair;
    }
    u.uMix.value = stage - pair;

    // Intro gather
    u.uIntro.value = s.reduced ? 1 : Math.min(1, u.uIntro.value + delta * 0.6);

    // Rotation: slow spin, blending toward the per-shape tilt
    if (!s.reduced) s.rotation = (s.rotation + delta * 0.12) % (Math.PI * 2);
    const tiltA = TILTS[pair];
    const tiltB = TILTS[pair + 1];
    const tilt = tiltA + (tiltB - tiltA) * (stage - pair);

    s.mouseX += (s.targetMouseX - s.mouseX) * ease * 0.6;
    s.mouseY += (s.targetMouseY - s.mouseY) * ease * 0.6;

    points.rotation.y = s.rotation + s.mouseX * 0.15;
    points.rotation.x = tilt - s.mouseY * 0.1;

    // In the hero, sit behind the portrait on desktop; centre afterwards
    const desktop = size.width > 820;
    const heroWeight = Math.max(0, 1 - stage);
    const targetShift = desktop ? heroWeight * 2.2 : 0;
    s.shift += (targetShift - s.shift) * ease;
    points.position.x = s.shift;
    points.position.y = desktop ? 0.2 * heroWeight : 0;
    // Sit behind the 3D portrait while in the hero so dots never cover the photo
    points.position.z = -3.6 * heroWeight;

    // Enlarge in the hero to compensate for sitting further back, forming a halo
    const scale = THREE.MathUtils.clamp(viewport.aspect / 1.2, 0.6, 1) * (1 + 0.7 * heroWeight);
    points.scale.setScalar(scale);

    // Cursor position projected to world space at z = 0
    const vp = viewport.getCurrentViewport(camera, [0, 0, 0]);
    u.uMouse.value.set((s.mouseX * vp.width) / 2, (s.mouseY * vp.height) / 2);
    u.uPush.value += ((s.mouseActive && !s.reduced ? 1 : 0) - u.uPush.value) * ease;

    u.uAlpha.value += (s.alpha * (isDark ? 1 : 0.85) - u.uAlpha.value) * ease;
    u.uTime.value = s.reduced ? 0 : frameState.clock.getElapsedTime();
    u.uPixelRatio.value = frameState.gl.getPixelRatio();
    u.uSize.value = isMobile ? 2.6 : 2.2;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
};
