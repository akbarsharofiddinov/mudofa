// /* eslint-disable @typescript-eslint/no-explicit-any */

// 'use client';
// import { useEffect, useRef, useState, Suspense } from 'react';
// import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
// import {
//   useGLTF,
//   useTexture,
//   Environment,
//   Lightformer,
//   OrbitControls,
//   useCursor,
// } from '@react-three/drei';
// import {
//   Physics,
//   RigidBody,
//   BallCollider,
//   CuboidCollider,
//   useRopeJoint,
//   useSphericalJoint,
//   type RigidBodyProps,
// } from '@react-three/rapier';
// import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
// import * as THREE from 'three';

// // Assets
// import cardGLB from '@/assets/models/card.glb';
// import lanyardPng from '@/assets/textures/lanyard/lanyard.png';

// extend({ MeshLineGeometry, MeshLineMaterial });

// export default function Lanyard({
//   position = [0, 0, 30],
//   fov = 20,
// }: {
//   position?: [number, number, number];
//   fov?: number;
// }) {
//   return (
//     <div className="relative z-0 w-full h-screen flex justify-center items-center" style={{ background: 'transparent' }}>
//       <Canvas
//         camera={{ position, fov }}
//         gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
//         style={{ background: 'transparent' }}
//         onCreated={({ gl, scene }) => {
//           gl.setClearColor(0x000000 as any, 0);
//           gl.setClearAlpha?.(0);
//           scene.background = null;
//         }}
//       >
//         <ambientLight intensity={Math.PI} />

//         {/* Fizika: ip + card tabiiy osilib tursin */}
//         <Physics gravity={[0, -20, 0]} timeStep={1 / 60}>
//           <Suspense fallback={null}>
//             <BandWithRope />
//           </Suspense>
//         </Physics>

//         <Environment blur={0.75} background={false}>
//           <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
//           <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
//           <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
//           <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
//         </Environment>
//       </Canvas>
//     </div>
//   );
// }

// function BandWithRope({ maxSpeed = 50, minSpeed = 0 }: { maxSpeed?: number; minSpeed?: number }) {
//   // Rope bodies + card
//   const fixed = useRef<any>(null);
//   const j1 = useRef<any>(null);
//   const j2 = useRef<any>(null);
//   const j3 = useRef<any>(null);
//   const card = useRef<any>(null);
//   const band = useRef<any>(null);

//   const vec = new THREE.Vector3();
//   const dir = new THREE.Vector3();
//   const ang = new THREE.Vector3();
//   const rot = new THREE.Vector3();

//   const frontTex = useTexture(lanyardPng);

//   function makeTextTexture(text: string, color: string, bg: string) {
//     const canvas = document.createElement('canvas');
//     canvas.width = 1024;
//     canvas.height = 1536;
//     const ctx = canvas.getContext('2d')!;
//     ctx.fillStyle = bg;
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = color;
//     ctx.font = 'bold 100px Arial';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     const lines = text.split('\n');
//     lines.forEach((line, i) => {
//       ctx.fillText(line, canvas.width / 2, canvas.height / 2 + i * 120);
//     });
//     const tex = new THREE.CanvasTexture(canvas);
//     tex.needsUpdate = true;
//     return tex;
//   }


//   const segmentProps: Partial<RigidBodyProps> = {
//     type: 'dynamic',
//     canSleep: true,
//     colliders: false,
//     angularDamping: 4,
//     linearDamping: 4,
//   };

//   const { nodes, materials } = useGLTF(cardGLB) as any;
//   const texture = useTexture(lanyardPng);
//   const { gl, camera } = useThree();
//   const baseMap = (materials.base as any)?.map as THREE.Texture | undefined;

//   // Texture/Anisotropy
//   useEffect(() => {
//     const maxAniso = gl.capabilities.getMaxAnisotropy?.() ?? 8;
//     if (baseMap) {
//       baseMap.anisotropy = maxAniso;
//       baseMap.needsUpdate = true;
//     }
//     if (texture) {
//       texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//       texture.anisotropy = maxAniso;
//       texture.needsUpdate = true;
//     }
//   }, [baseMap, texture, gl]);

//   // Curve for continuous rope rendering
//   const [curve] = useState(
//     () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
//   );
//   curve.curveType = 'chordal';

//   // Hover/drag UX
//   const [hovered, setHovered] = useState(false);
//   const [dragging, setDragging] = useState(false);
//   useCursor(hovered, dragging ? 'grabbing' : 'pointer');

//   // Drag delta (world-space)
//   const dragOffset = useRef<THREE.Vector3 | null>(null);

//   const onPointerOver = (e: any) => {
//     e.stopPropagation();
//     setHovered(true);
//   };
//   const onPointerOut = (e: any) => {
//     e.stopPropagation();
//     setHovered(false);
//   };
//   const onPointerDown = (e: any) => {
//     e.stopPropagation();
//     e.target.setPointerCapture(e.pointerId);
//     // Kinematic rejimga o‘tamiz
//     setDragging(true);
//     // pointer world pos - card world pos ni saqlab qo‘yamiz
//     const world = pointerToWorld(e, camera);
//     const ct = card.current.translation();
//     dragOffset.current = new THREE.Vector3(world.x - ct.x, world.y - ct.y, world.z - ct.z);
//   };
//   const onPointerMove = (e: any) => {
//     if (!dragging || !dragOffset.current) return;
//     e.stopPropagation();
//     // pointer world pos - offset => next kinematic position
//     const world = pointerToWorld(e, camera);
//     const nx = world.x - dragOffset.current.x;
//     const ny = world.y - dragOffset.current.y;
//     const nz = world.z - dragOffset.current.z;
//     // Uxlab tursin
//     [card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp());
//     card.current?.setNextKinematicTranslation({ x: nx, y: ny, z: nz });
//   };
//   const onPointerUp = (e: any) => {
//     e.stopPropagation();
//     try {
//       e.target.releasePointerCapture(e.pointerId);
//     } catch (error) {
//       console.log(error)
//     }
//     setDragging(false);
//     dragOffset.current = null;
//   };

//   // Build joints (rope -> card)
//   useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.5]); // length ~0.5
//   useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.5]);
//   useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.5]);
//   useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

//   // Center the system:
//   // - fixed anchor y=1.5 at center x/z
//   // - rope ~1.5 long => card y≈0 at rest
//   const anchorPos: [number, number, number] = [0, 1.5, 0];

//   useFrame((state, delta) => {
//     // Update rope polyline points and slight damping rotation on card
//     if (fixed.current) {
//       // smooth lerp for j1/j2 to reduce jitter
//       [j1, j2].forEach((ref) => {
//         if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
//         const dist = ref.current.lerped.distanceTo(ref.current.translation());
//         const clamped = Math.max(0.1, Math.min(1, dist));
//         ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clamped * (maxSpeed - minSpeed)));
//       });

//       curve.points[0].copy(j3.current.translation());
//       curve.points[1].copy(j2.current.lerped);
//       curve.points[2].copy(j1.current.lerped);
//       curve.points[3].copy(fixed.current.translation());

//       if (band.current?.geometry?.setPoints) {
//         band.current.geometry.setPoints(curve.getPoints(32));
//       }

//       // slight stabilization for card yaw
//       if (!dragging && card.current) {
//         ang.copy(card.current.angvel());
//         rot.copy(card.current.rotation());
//         card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
//       }
//     }
//   });

//   // pointer -> world helper
//   function pointerToWorld(e: any, cam: THREE.Camera) {
//     vec.set(e.clientX / window.innerWidth * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1, 0.5).unproject(cam);
//     dir.copy(vec).sub(cam.position).normalize();
//     const distance = (cam as any).position.length?.() ?? 30;
//     vec.add(dir.multiplyScalar(distance));
//     return { x: vec.x, y: vec.y, z: vec.z };
//   }



//   // Responsive `meshline` res
//   const [isSmall, setIsSmall] = useState<boolean>(() => (typeof window !== 'undefined' ? window.innerWidth < 1024 : false));
//   useEffect(() => {
//     const h = () => setIsSmall(window.innerWidth < 1024);
//     window.addEventListener('resize', h);
//     return () => window.removeEventListener('resize', h);
//   }, []);

//   return (
//     <>
//       {/* Drag vaqtida OrbitControls o‘chadi */}
//       <OrbitControls enabled={!dragging} />

//       {/* Anchor (mix) va rope segmentlari */}
//       <group position={[0, 0, 0]}>
//         {/* yuqori mix — sahna markazidan biroz tepada */}
//         <RigidBody ref={fixed} {...segmentProps} type="fixed" position={anchorPos} />

//         {/* rope bo'g'inlari */}
//         <RigidBody ref={j1} {...segmentProps} position={[anchorPos[0] + 0.5, anchorPos[1], anchorPos[2]]}>
//           <BallCollider args={[0.08]} />
//         </RigidBody>
//         <RigidBody ref={j2} {...segmentProps} position={[anchorPos[0] + 1.0, anchorPos[1], anchorPos[2]]}>
//           <BallCollider args={[0.08]} />
//         </RigidBody>
//         <RigidBody ref={j3} {...segmentProps} position={[anchorPos[0] + 1.5, anchorPos[1] - 0.2, anchorPos[2]]}>
//           <BallCollider args={[0.08]} />
//         </RigidBody>

//         {/* Card — drag paytida kinematic, aks holda dynamic */}
//         <RigidBody
//           ref={card}
//           {...segmentProps}
//           type={dragging ? 'kinematicPosition' : 'dynamic'}
//           position={[anchorPos[0] + 2.0, anchorPos[1] - 0.2, anchorPos[2]]}
//         >
//           <CuboidCollider args={[0.8, 1.125, 0.01]} />
//           <group
//             scale={2.25}
//             position={[0, -1.2, -0.05]}
//             onPointerOver={onPointerOver}
//             onPointerOut={onPointerOut}
//             onPointerDown={onPointerDown}
//             onPointerMove={onPointerMove}
//             onPointerUp={onPointerUp}
//           >
//             <mesh geometry={nodes.card.geometry}>
//               <meshPhysicalMaterial
//                 // map={frontTex}
//                 clearcoat={1}
//                 clearcoatRoughness={0.15}
//                 roughness={0.9}
//                 metalness={0.8}
//               />
//             </mesh>

//             <mesh geometry={nodes.clip.geometry} material={materials.metal} />
//             <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
//           </group>
//         </RigidBody>
//       </group>

//       {/* Rope chizig‘i — uzluksiz ko‘rinadi */}
//       <mesh ref={band}>
//         <meshLineGeometry />
//         <meshLineMaterial
//           color="white"
//           depthTest={false}
//           resolution={isSmall ? [1000, 2000] : [1000, 1000]}
//           useMap
//           map={texture}
//           repeat={[-4, 1]}
//           lineWidth={1}
//         />
//       </mesh>
//     </>
//   );
// }

// // Preload
// useGLTF.preload(cardGLB);
