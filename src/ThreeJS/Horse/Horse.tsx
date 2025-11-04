/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, useEffect, useRef, type JSX, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, useGLTF, Center, useAnimations } from "@react-three/drei";
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
    // scene.traverse((obj) => {
    //   if ((obj as Mesh).isMesh) {
    //     const mesh = obj as Mesh;
    //     mesh.material = new THREE.MeshBasicMaterial({
    //       color: new THREE.Color(0x0000ff),
    //       transparent: true,
    //       opacity: 0.9,
    //       wireframe: true,
    //     });
    //   }
    // });
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, Math.PI / 2, 0);
    scene.scale.set(1.5, 1.5, 1.5);
  }, [actions, scene]);

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);

/* ===================== Easing helpers ===================== */
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

/* ===================== Timeline driver (Canvas ichida) ===================== */

type DriverProps = {
  onDone: () => void;
  coordinates: [number, number, number];
  setCoordinates: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  rotation: [number, number, number];
  setRotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
};

function HorseDriver({ onDone }: { onDone: () => void }) {
  const groupRef   = useRef<Group>(null!);
  const startRef   = useRef(0);
  const doneRef    = useRef(false);
  const matsRef    = useRef<Material[]>([]);
  const { viewport } = useThree();

  /* ────── responsive layout (frozen after start) ────── */
  const layoutRef = useRef({
    xLeft: 0, xRight: 0, xCenter: 0,
    yBottom: 0, yCenter: 0,
  });

  useEffect(() => {
    const marginX = Math.min(0.8, viewport.width  * 0.06);
    const marginY = Math.min(0.6, viewport.height * 0.08);
    layoutRef.current = {
      xLeft   : -viewport.width / 2 + marginX,
      xRight  :  viewport.width / 2 - marginX,
      xCenter : 0,
      yBottom : -viewport.height / 2 + marginY,
      yCenter : 0,
    };
  }, [viewport.width, viewport.height]);

  /* ────── collect materials once ────── */
  useEffect(() => {
    if (!groupRef.current) return;
    const mats: Material[] = [];
    groupRef.current.traverse((obj) => {
      if ((obj as Mesh).isMesh && (obj as Mesh).material) {
        const m = (obj as Mesh).material as Material;
        m.transparent = true;
        mats.push(m);
      }
    });
    matsRef.current = mats;
  }, []);

  /* ────── TOTAL DURATION ────── */
  const TOTAL = 5.8;   // total animation time (tweak as needed)
  const FADE  = 1.2;   // fade-out duration

  useFrame((state) => {
    if (!startRef.current) startRef.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startRef.current;
    const g = groupRef.current;
    if (!g) return;

    const t = Math.min(elapsed / TOTAL, 1); // 0 → 1

    // ────── PHASE WEIGHTS (smoothly blend) ──────
    const phase1End = 0.60;   // left → right
    const phase2End = 0.80;   // right → center + up
    const phase3End = 1.00;   // fade out

    // ────── PHASE 1: left → right (bottom) ──────
    const w1 = Math.min(t / phase1End, 1);
    const x1 = THREE.MathUtils.lerp(layoutRef.current.xLeft, layoutRef.current.xRight, easeInOutCubic(w1));
    const y1 = layoutRef.current.yBottom;

    // ────── PHASE 2: right → center + up + rotate + shrink ──────
    const w2 = t < phase1End ? 0 : (t - phase1End) / (phase2End - phase1End);
    const x2 = THREE.MathUtils.lerp(layoutRef.current.xRight, layoutRef.current.xCenter, easeInOutCubic(w2));
    const y2 = THREE.MathUtils.lerp(layoutRef.current.yBottom, layoutRef.current.yCenter + 0.35, easeInOutCubic(w2));
    const rot2 = Math.PI * easeOutQuad(w2);
    const scale2 = THREE.MathUtils.lerp(1.0, 0.78, w2);

    // ────── PHASE 3: fade out + shrink ──────
    const w3 = t < phase2End ? 0 : (t - phase2End) / (phase3End - phase2End);
    const fade = 1 - easeOutQuad(w3);
    const finalScale = THREE.MathUtils.lerp(0.78, 0.6, w3);

    // ────── BLEND ──────
    const x = t < phase1End ? x1
            : t < phase2End ? THREE.MathUtils.lerp(x1, x2, w2)
            : layoutRef.current.xCenter;

    const y = t < phase1End ? y1
            : t < phase2End ? THREE.MathUtils.lerp(y1, y2, w2)
            : layoutRef.current.yCenter + 0.35;

    const rotY = t < phase1End ? 0
               : t < phase2End ? rot2
               : Math.PI;

    const scale = t < phase1End ? 1.0
                : t < phase2End ? scale2
                : finalScale;

    const opacity = t < phase2End ? 1.0 : fade;

    // ────── APPLY ──────
    g.position.set(x, y, 0);
    g.rotation.set(0, rotY, 0);
    g.scale.setScalar(scale);
    g.visible = opacity > 0;
    matsRef.current.forEach(m => { if ('opacity' in m) (m as any).opacity = opacity; });

    // ────── DONE ──────
    if (t >= 1 && !doneRef.current) {
      doneRef.current = true;
      onDone();
      (window as any).__SHOW_LOGO__?.();
    }
  });

  return (
    <group ref={groupRef} position={[layoutRef.current.xLeft, layoutRef.current.yBottom, 0]}>
      <Center>
        <HorseModel />
      </Center>
    </group>
  );
}

/* ===================== Public component (Canvas wrapper) ===================== */

type HorseProps = {
  coordinates: [number, number, number];
  setCoordinates: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  rotation: [number, number, number];
  setRotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
};

const Horse: React.FC<HorseProps> = ({ coordinates, setCoordinates, rotation, setRotation }) => {
  const { horseAnimationFinished } = useAppSelector((s) => s.infoSlice);
  const dispatch = useAppDispatch();

  const handleDone = () => {
    dispatch(setHorseAnimationFinished(true));
  };

  if (horseAnimationFinished) return null;

  return (
    <Canvas shadows camera={{ position: [0, 5, 10], fov: 45 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <HorseDriver
          onDone={handleDone}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          rotation={rotation}
          setRotation={setRotation}
        />
        <ContactShadows position={[0, -0.001, 0]} opacity={0.35} blur={2.5} scale={14} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
};

export default Horse;
