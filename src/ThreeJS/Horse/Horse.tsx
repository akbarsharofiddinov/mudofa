import { Suspense, useEffect, useRef, useState, type JSX } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows, useGLTF, Center, useAnimations } from "@react-three/drei";
import { Group } from "three";
import * as THREE from "three"

import horseUrl from "@/assets/models/horse.glb?url";

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
      firstAction.timeScale = 1.5;
    }

    // ✅ Har bir meshga gologramma materiali qo‘llash
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x003fff), // neon ko‘k
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

const Horse: React.FC = () => {
  const [xCoordinate, setXCoordinate] = useState(-22);

  useEffect(() => {
    if (xCoordinate > 22) {
      setXCoordinate(-22)
    } else {
      setTimeout(() => {
        setXCoordinate(prev => prev + .1)
      }, 10);
    }
  }, [xCoordinate])

  return (
    <>
      <Canvas shadows camera={{ position: [0, 200, 800], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          {/* <axesHelper args={[5]} /> */}
          <group position={[xCoordinate, -5, 0]} rotation={[0, 0, 0]}>
            <Center>
              <HorseModel />
            </Center>
          </group>
          <ContactShadows position={[0, -0.001, 0]} opacity={0.4} blur={2.5} scale={10} />
          <Environment preset="city" />
          <OrbitControls makeDefault
            target={[1, 0.7, 0]}
            maxDistance={20}
            minDistance={20}
            enableRotate={false}     // 🛑 Aylantirishni bloklaydi
            enableZoom={false}       // 🛑 Zoomni bloklaydi
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Horse;
