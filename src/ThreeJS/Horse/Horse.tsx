/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, useEffect, useRef, type JSX } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  useGLTF,
  Center,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";
import { Group, Mesh, Material } from "three";

import horseUrl from "@/assets/models/horse.glb?url";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setHorseAnimationFinished } from "@/store/slices/infoSlice";

/* ===================== Common (model) ===================== */

const MODEL_URL = horseUrl;

function HorseModel(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<Group>(null!);
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const firstAction = Object.values(actions)[0];
    if (firstAction) {
      firstAction.reset().fadeIn(0.2).play();
      firstAction.timeScale = 1;
    }
    // Transformlar tashqaridan boshqariladi.
  }, [actions]);

  return (
    <group ref={group} {...props} scale={2}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);

/* ===================== Easing ===================== */
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

/* ===================== Driver (autonomous animation with props offset) ===================== */

type DriverProps = {
  onDone: () => void;
  coordinates: [number, number, number]; // props -> start offset
  setCoordinates: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
  rotation: [number, number, number]; // props -> start rotation
  setRotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
};

const HorseDriver: React.FC<DriverProps> = ({
  onDone,
  coordinates,
  setCoordinates,
  rotation,
  setRotation,
}) => {
  const groupRef = useRef<Group>(null!);
  const startClockRef = useRef<number | null>(null);
  const finishedRef = useRef(false);
  const matsRef = useRef<Material[]>([]);
  const { viewport, scene } = useThree();

  // Props-dan kelgan start offset/rotation (animatsiya davomida qat’iy qoladi)
  const basePosRef = useRef(new THREE.Vector3(...coordinates));
  const baseRotRef = useRef(new THREE.Euler(...rotation));

  // Props o'zgarsa, faqat animatsiya boshlanmagan bo'lsa yangilab olamiz
  useEffect(() => {
    if (startClockRef.current === null) {
      basePosRef.current.set(...coordinates);
      baseRotRef.current.set(...rotation);
    }
  }, [coordinates, rotation]);

  // Layout (ekran o‘lchamiga nisbatan yo‘l generatsiyasi)
  const layoutRef = useRef({
    xLeft: -1,
    xRight: 1,
    xCenter: 0,
    yBottom: -0.8,
    yCenter: 0,
  });

  useEffect(() => {
    const marginX = Math.min(0.8, viewport.width * 0.06);
    const marginY = Math.min(0.6, viewport.height * 0.08);
    layoutRef.current = {
      xLeft: -viewport.width / 2 + marginX,
      xRight: viewport.width / 2 - marginX,
      xCenter: 0,
      yBottom: -viewport.height / 3 + marginY,
      yCenter: 0,
    };
  }, [viewport.width, viewport.height]);

  // Materiallarni to'plash (opacity boshqarish uchun)
  useEffect(() => {
    if (!groupRef.current) return;
    const mats: Material[] = [];
    groupRef.current.traverse((obj) => {
      if ((obj as Mesh).isMesh && (obj as Mesh).material) {
        const m = (obj as Mesh).material as Material;
        (m as any).transparent = true;
        (m as any).opacity = 1;
        mats.push(m);
      }
    });
    matsRef.current = mats;
  }, []);

  // --- Yangi: harakat yo'nalishini topish uchun ---
  const prevPosRef = useRef<THREE.Vector3 | null>(null);

  /* --------------------------
     PARTICLE SYSTEM SETTINGS
     --------------------------*/
  const MAX_PARTICLES = 250;
  const PARTICLE_LIFETIME = 0.9;
  const EMIT_PER_HOOF = 6;
  const GRAVITY = 1.6;
  const SPAWN_INTERVAL = 0.06;

  const pointsRef = useRef<THREE.Points | null>(null);
  const positionsRef = useRef<Float32Array | null>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);
  const lifetimesRef = useRef<Float32Array | null>(null);
  const agesRef = useRef<Float32Array | null>(null);
  const aliveRef = useRef<Uint8Array | null>(null);

  const hoofBonesRef = useRef<THREE.Object3D[]>([]);
  const bboxRef = useRef<THREE.Box3 | null>(null);

  // Bone’larni topish (bir marta)
  useEffect(() => {
    if (!groupRef.current) return;
    const candidates: THREE.Object3D[] = [];
    groupRef.current.traverse((o) => {
      const name = (o as any).name?.toLowerCase?.() || "";
      const isBone = (o as any).isBone || o.type === "Bone";
      if (!isBone) return;
      // keng yoyilgan nomlar: hoof, foot, toe, ankle
      if (/(hoof|foot|toe|ankle)/i.test(name)) candidates.push(o);
    });
    // Pastroqda joylashgan 4 tasini olish
    const byY: Array<{ o: THREE.Object3D; y: number }> = candidates.map((o) => {
      const p = new THREE.Vector3();
      (o as any).getWorldPosition?.(p);
      return { o, y: p.y };
    });
    byY.sort((a, b) => a.y - b.y);
    hoofBonesRef.current = byY.slice(0, 4).map((v) => v.o);

    // Fallback uchun bounding box
    const box = new THREE.Box3().setFromObject(groupRef.current);
    bboxRef.current = box;
  }, []);

  useEffect(() => {
    positionsRef.current = new Float32Array(MAX_PARTICLES * 3);
    velocitiesRef.current = new Float32Array(MAX_PARTICLES * 3);
    lifetimesRef.current = new Float32Array(MAX_PARTICLES);
    agesRef.current = new Float32Array(MAX_PARTICLES);
    aliveRef.current = new Uint8Array(MAX_PARTICLES);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionsRef.current, 3)
    );
    geometry.setAttribute(
      "aVelocity",
      new THREE.BufferAttribute(velocitiesRef.current, 3)
    );
    geometry.setAttribute(
      "aLife",
      new THREE.BufferAttribute(lifetimesRef.current, 1)
    );
    geometry.setAttribute(
      "aAge",
      new THREE.BufferAttribute(agesRef.current, 1)
    );
    geometry.setAttribute(
      "aAlive",
      new THREE.BufferAttribute(aliveRef.current, 1)
    );

    // yumshoq aylana tekstura
    const makeCircleTexture = () => {
      const size = 128;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      const grd = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      grd.addColorStop(0, "rgba(255,230,200, 0.4)");
      grd.addColorStop(0.4, "rgba(160,120,80,0.2)");
      grd.addColorStop(1, "rgba(120,80,40,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(canvas);
    };

    const map = makeCircleTexture();
    map.minFilter = THREE.LinearFilter;
    map.magFilter = THREE.LinearFilter;
    map.format = THREE.RGBAFormat;

    const vertexShader = `
      attribute vec3 aVelocity;
      attribute float aLife;
      attribute float aAge;
      attribute float aAlive;
      varying float vLifeRatio;
      varying float vAlive;
      void main() {
        vAlive = aAlive;
        vLifeRatio = clamp(1.0 - (aAge / max(aLife, 0.0001)), 0.0, 1.0);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float size = 4.0 * (0.5 + 0.5 * vLifeRatio);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform sampler2D uMap;
      uniform float uGlobalFade;     // <— YANGI
      varying float vLifeRatio;
      varying float vAlive;
      void main() {
        if (vAlive < 0.5) discard;
        vec4 tex = texture2D(uMap, gl_PointCoord);
        float alpha = tex.a * vLifeRatio;

        // chang rangi (o'zgarmagan)
        vec3 col = mix(vec3(0.9,0.85,0.7), vec3(0.45,0.3,0.15), 1.0 - vLifeRatio);

        // === global fade bilan ko'paytiramiz ===
        alpha *= uGlobalFade;

        gl_FragColor = vec4(col, alpha);
        if (gl_FragColor.a < 0.01) discard;
      }
    `;

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uMap: { value: map },
        uGlobalFade: { value: 1.0 }, // <— YANGI
      },
      vertexShader,
      fragmentShader,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    scene.add(points);
    pointsRef.current = points;

    return () => {
      scene.remove(points);
      geometry.dispose();
      (material.uniforms.uMap.value as THREE.Texture).dispose();
      material.dispose();
    };
  }, [scene]);

  const nextIndexRef = useRef(0);
  const spawnParticleAt = (
    pos: THREE.Vector3,
    backwardDir: THREE.Vector3,
    speed = 1.0
  ) => {
    const idx = nextIndexRef.current % MAX_PARTICLES;
    nextIndexRef.current += 1;

    aliveRef.current![idx] = 1;
    agesRef.current![idx] = 0;
    const life = PARTICLE_LIFETIME * (0.7 + Math.random() * 0.6);
    lifetimesRef.current![idx] = life;

    // YANGI (tavsiya):
    const jitterXZ = 0.4; // yon-yon tebranish (x,z)
    const jitterY = 0.1; // vertikal tebranish
    const downLift = 0.03; // tuyoq ostiga ozgina pastga tushirish

    positionsRef.current![idx * 3 + 0] =
      pos.x + (Math.random() - 0.5) * jitterXZ;
    positionsRef.current![idx * 3 + 1] =
      pos.y - downLift + (Math.random() - 0.5) * jitterY;
    positionsRef.current![idx * 3 + 2] =
      pos.z + (Math.random() - 0.5) * jitterXZ;

    // Tezlik: orqaga + biroz yuqoriga va lateral shovqin
    const lateral = new THREE.Vector3(
      (Math.random() - 0.5) * 0.4,
      0,
      (Math.random() - 0.5) * 0.4
    );

    const v = backwardDir
      .clone()
      .multiplyScalar(1.4 * speed) // orqaga
      .add(new THREE.Vector3(0, 1.2 * speed, 0)) // yuqoriga
      .add(lateral.multiplyScalar(0.25)); // yonlarga

    // const vx = (Math.random() - 0.5) * 0.8 * speed;
    // const vy = 0.7 + Math.random() * 1.0 * speed;
    // const vz = (Math.random() - 0.5) * 0.8 * speed;
    velocitiesRef.current![idx * 3 + 0] = v.x;
    velocitiesRef.current![idx * 3 + 1] = v.y;
    velocitiesRef.current![idx * 3 + 2] = v.z;

    const geom = pointsRef.current!.geometry as THREE.BufferGeometry;
    (geom.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (geom.attributes.aVelocity as THREE.BufferAttribute).needsUpdate = true;
    (geom.attributes.aLife as THREE.BufferAttribute).needsUpdate = true;
    (geom.attributes.aAge as THREE.BufferAttribute).needsUpdate = true;
    (geom.attributes.aAlive as THREE.BufferAttribute).needsUpdate = true;
  };

  const lastEmitRef = useRef(0);
  const lastReportRef = useRef(0);

  const TOTAL = 12; // s

  useFrame((state, delta) => {
    if (startClockRef.current === null)
      startClockRef.current = state.clock.elapsedTime;

    const elapsed = state.clock.elapsedTime - (startClockRef.current ?? 0);
    const g = groupRef.current;
    if (!g) return;

    // 0..1 va easing
    const tRaw = Math.min(elapsed / TOTAL, 1);
    const t = easeInOutSine(tRaw);

    // --- Yo'l (Bezier) + base offset
    const { xLeft, xRight, xCenter, yBottom, yCenter } = layoutRef.current;
    const p0 = new THREE.Vector3(xLeft - 5, yBottom, 0);
    const p1 = new THREE.Vector3(xCenter * 0.5, yBottom, 0);
    const p2 = new THREE.Vector3(xRight * 2, yBottom + 0.1, -0.1);
    const p3 = new THREE.Vector3(xCenter, yCenter + 2, -0.5);

    const curve = new THREE.Vector3().set(
      Math.pow(1 - t, 3) * p0.x +
        3 * Math.pow(1 - t, 2) * t * p1.x +
        3 * (1 - t) * Math.pow(t, 2) * p2.x +
        Math.pow(t, 3) * p3.x,
      Math.pow(1 - t, 3) * p0.y +
        3 * Math.pow(1 - t, 2) * t * p1.y +
        3 * (1 - t) * Math.pow(t, 2) * p2.y +
        Math.pow(t, 3) * p3.y,
      Math.pow(1 - t, 3) * p0.z +
        3 * Math.pow(1 - t, 2) * t * p1.z +
        3 * (1 - t) * Math.pow(t, 2) * p2.z +
        Math.pow(t, 3) * p3.z
    );

    const worldPos = curve.add(basePosRef.current);

    // burilish, scale, opacity
    let rotProgress = 0;
    if (t > 0.55) rotProgress = (t - 0.55) / 0.35;
    const rotYDelta = Math.PI * easeInOutSine(Math.min(rotProgress, 1));
    const scale = THREE.MathUtils.lerp(1, 0.7, t);
    const opacity = t < 0.85 ? 1 : 1 - (t - 0.85) / 0.15;

    // ... matsRef ga opacity berib bo'lgandan so'ng:
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.ShaderMaterial;
      if (mat?.uniforms?.uGlobalFade) {
        mat.uniforms.uGlobalFade.value = opacity; // chang ham ot bilan birga so'nsin
      }
    }

    g.position.copy(worldPos);
    g.rotation.set(
      baseRotRef.current.x,
      baseRotRef.current.y + rotYDelta,
      baseRotRef.current.z
    );
    g.scale.setScalar(scale);
    g.visible = opacity > 0;
    matsRef.current.forEach((m) => {
      if ("opacity" in m) (m as any).opacity = opacity;
    });

    // === Harakat yo'nalishi (orqaga uchirish uchun)
    const currentPos = g.position.clone();
    if (!prevPosRef.current) prevPosRef.current = currentPos.clone();
    const moveDir = currentPos.clone().sub(prevPosRef.current);
    if (moveDir.length() > 1e-5) moveDir.normalize();
    else moveDir.set(1, 0, 0);
    const backwardDir = moveDir.clone().multiplyScalar(-1);

    // --- Emit (tuyoqlardan). Bone bo'lmasa: bbox burchaklari fallback
    const now = state.clock.elapsedTime;
    const speedFactor = Math.max(
      0.5,
      1 + Math.abs(Math.sin(t * Math.PI * 2)) * 0.8
    );

    if (now - lastEmitRef.current > SPAWN_INTERVAL && t < 0.98) {
      lastEmitRef.current = now;

      let emitPoints: THREE.Vector3[] = [];

      if (hoofBonesRef.current.length >= 2) {
        // Bone-lardan aniq world nuqtalar
        emitPoints = hoofBonesRef.current.map((o) => {
          const p = new THREE.Vector3();
          (o as any).getWorldPosition?.(p);
          return p;
        });

        // 4 ta bilan cheklash (LF, RF, LB, RB kabi)
        if (emitPoints.length > 4) emitPoints = emitPoints.slice(0, 4);
      } else if (bboxRef.current) {
        // Fallback: bounding box burchaklari (pastki qavat)
        const b = bboxRef.current.clone().applyMatrix4(g.matrixWorld);
        const y = b.min.y + 0.02; // yerga yaqin
        emitPoints = [
          new THREE.Vector3(b.min.x, y, b.min.z), // LB
          new THREE.Vector3(b.max.x, y, b.min.z), // RB
          new THREE.Vector3(b.min.x, y, b.max.z), // LF
          new THREE.Vector3(b.max.x, y, b.max.z), // RF
        ];
      } else {
        // So'nggi-chora: model ostidagi 4 nuqta (taxmin)
        const s = 0.35;
        const base = g.position.clone();
        emitPoints = [
          base.clone().add(new THREE.Vector3(-s, -0.9, -s)),
          base.clone().add(new THREE.Vector3(s, -0.9, -s)),
          base.clone().add(new THREE.Vector3(-s, -0.9, s)),
          base.clone().add(new THREE.Vector3(s, -0.9, s)),
        ];
      }

      // Har bir tuyoqdan bir necha donadan
      for (const hw of emitPoints) {
        const count = Math.max(1, Math.floor(EMIT_PER_HOOF / 2));
        for (let i = 0; i < count; i++) {
          spawnParticleAt(hw, backwardDir, speedFactor);
        }
      }
    }

    // --- Zarralar fizikasi
    if (pointsRef.current) {
      const geom = pointsRef.current.geometry as THREE.BufferGeometry;
      const pos = positionsRef.current!;
      const vel = velocitiesRef.current!;
      const ages = agesRef.current!;
      const life = lifetimesRef.current!;
      const alive = aliveRef.current!;
      const dt = Math.min(delta, 0.033);

      for (let i = 0; i < MAX_PARTICLES; i++) {
        if (alive[i] === 0) continue;

        ages[i] += dt;
        if (ages[i] >= life[i]) {
          alive[i] = 0;
          pos[i * 3 + 0] = 9999;
          pos[i * 3 + 1] = 9999;
          pos[i * 3 + 2] = 9999;
          continue;
        }

        vel[i * 3 + 1] -= GRAVITY * dt * (0.6 + Math.random() * 0.6);
        pos[i * 3 + 0] += vel[i * 3 + 0] * dt;
        pos[i * 3 + 1] += vel[i * 3 + 1] * dt;
        pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
      }

      (geom.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (geom.attributes.aVelocity as THREE.BufferAttribute).needsUpdate = true;
      (geom.attributes.aAge as THREE.BufferAttribute).needsUpdate = true;
      (geom.attributes.aLife as THREE.BufferAttribute).needsUpdate = true;
      (geom.attributes.aAlive as THREE.BufferAttribute).needsUpdate = true;
    }

    // Report-back (throttle)
    if (now - lastReportRef.current > 0.05) {
      lastReportRef.current = now;
      setCoordinates([g.position.x, g.position.y, g.position.z]);
      setRotation([g.rotation.x, g.rotation.y, g.rotation.z]);
    }

    // keyingi freym uchun saqlash
    prevPosRef.current.copy(currentPos);

    // finish
    if (t >= 1 && !finishedRef.current) {
      finishedRef.current = true;
      onDone();
      (window as any).__SHOW_LOGO__?.();
    }
  });

  // Dastlabki joy: propsdan start offset
  return (
    <group
      ref={groupRef}
      position={[
        basePosRef.current.x,
        basePosRef.current.y,
        basePosRef.current.z,
      ]}
    >
      <Center>
        <HorseModel />
      </Center>
    </group>
  );
};

/* ===================== Public component (Canvas wrapper) ===================== */

type HorseProps = {
  coordinates: [number, number, number];
  setCoordinates: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
  rotation: [number, number, number];
  setRotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
};

const Horse: React.FC<HorseProps> = ({
  coordinates,
  setCoordinates,
  rotation,
  setRotation,
}) => {
  const { horseAnimationFinished } = useAppSelector((s) => s.info);
  const dispatch = useAppDispatch();

  const handleDone = () => {
    dispatch(setHorseAnimationFinished(true));
  };

  if (horseAnimationFinished) return null;

  return (
    <Canvas shadows camera={{ position: [0, 0, 20], fov: 45 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <HorseDriver
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          rotation={rotation}
          setRotation={setRotation}
          onDone={handleDone}
        />
        <ContactShadows
          position={[0, -0.001, 0]}
          opacity={0.35}
          blur={2.5}
          scale={14}
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
};

export default Horse;
