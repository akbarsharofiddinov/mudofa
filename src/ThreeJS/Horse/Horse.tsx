import React, { Suspense, useEffect, useRef, type JSX } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows, useGLTF, Center, useAnimations } from "@react-three/drei";
import { Group } from "three";
import * as THREE from "three"

import horseUrl from "@/assets/models/horse.glb?url";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setHorseAnimationFinished } from "@/store/slices/infoSlice";

interface IProps {
  coordinates: [number, number, number]
  setCoordinates: React.Dispatch<React.SetStateAction<[number, number, number]>>
  rotation: [number, number, number]
  setRotation: React.Dispatch<React.SetStateAction<[number, number, number]>>
}

const MODEL_URL = horseUrl;

function HorseModel(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<Group>(null!);
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Animatsiyani yoqish
    const firstAction = Object.values(actions)[0];
    if (firstAction) {
      firstAction.play();
      firstAction.timeScale = 1;
    }

    // ✅ Har bir meshga gologramma materiali qo‘llash
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0xff77700),
          transparent: true,
          opacity: 0.2,
          wireframe: true, // to‘rli ko‘rinish
        });
      }
    });

    scene.position.set(0, 0, 0);
    scene.rotation.set(0, Math.PI / 2, 0);
    scene.scale.set(1.5, 1.5, 1.5);

  }, [actions, animations, scene]);

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);

const Horse: React.FC<IProps> = ({ coordinates, setCoordinates, rotation, setRotation }) => {

  const [scale, setScale] = React.useState(14);
  const { horseAnimationFinished } = useAppSelector(state => state.infoSlice)

  const dispatch = useAppDispatch()

  useEffect(() => {

    if (coordinates[0] <= 24 && coordinates[1] === -2.6) {
      setTimeout(() => {
        setCoordinates((prev) => {
          return [prev[0] + 0.08, prev[1], prev[2]];
        })
      }, 10);
    }

    if (coordinates[0] >= 24) {
      setCoordinates(prev => [prev[0], 2.6, prev[2]]);
      setRotation([0, Math.PI, 0]);
    }

    if (coordinates[1] === 2.6 && rotation[1] === Math.PI) {
      setTimeout(() => {
        setCoordinates((prev) => {
          if (prev[0] >= 1 && prev[0] <= 2) {
            dispatch(setHorseAnimationFinished(true))
          }
          return [prev[0] >= 1.2 ? prev[0] - 0.08 : prev[0], prev[1], prev[2]];
        })
      }, 10);
    }
  }, [coordinates, setCoordinates, rotation, setRotation, dispatch]);

  useEffect(() => {
    if (horseAnimationFinished) {
      setScale(0)
    }
  }, [horseAnimationFinished])

  return (
    <>
      {!horseAnimationFinished && (
        <Canvas shadows camera={{ position: [0, 200, 800], fov: 45 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            {/* <axesHelper args={[5]} /> */}
            <group position={[coordinates[0], coordinates[1], coordinates[2]]} rotation={rotation}>
              <Center>
                <HorseModel />
              </Center>
            </group>
            <ContactShadows position={[0, -0.001, 0]} opacity={0.4} blur={2.5} scale={14} />
            <Environment preset="city" />
            <OrbitControls makeDefault
              target={[1, 0.7, 0]}
              maxDistance={15}
              minDistance={15}
              enableRotate={false}     // 🛑 Aylantirishni bloklaydi
              enableZoom={false}       // 🛑 Zoomni bloklaydi
              enablePan={false}
            />
          </Suspense>
        </Canvas>
      )}
    </>
  );
};

export default Horse;
