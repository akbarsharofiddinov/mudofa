/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useRef, useState, type JSX } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor, useTexture } from "@react-three/drei";
import { useAtom } from "jotai";
import { easing } from "maath";
import {
  Bone,
  BoxGeometry,
  Color,
  Group,
  MathUtils,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
  SRGBColorSpace,
  Uint16BufferAttribute,
  Float32BufferAttribute,
  Vector3,
  Texture,
  Material,
} from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { pageAtom, pages } from "./UI";

/* ---------- Constants ---------- */

const easingFactor = 0.5;
const easingFactorFold = 0.3;
const insideCurveStrength = 0.18;
const outsideCurveStrength = 0.05;
const turningCurveStrength = 0.09;

const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.71;
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

/* ---------- Static page geometry with skinning attributes ---------- */

const pageGeometry = new BoxGeometry(
  PAGE_WIDTH,
  PAGE_HEIGHT,
  PAGE_DEPTH,
  PAGE_SEGMENTS,
  2
);
pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);

const position = pageGeometry.attributes.position;
const vertex = new Vector3();
const skinIndexes: number[] = [];
const skinWeights: number[] = [];

for (let i = 0; i < position.count; i++) {
  vertex.fromBufferAttribute(position, i);
  const x = vertex.x;

  const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
  const skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;

  skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
  skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}

pageGeometry.setAttribute(
  "skinIndex",
  new Uint16BufferAttribute(skinIndexes, 4)
);
pageGeometry.setAttribute(
  "skinWeight",
  new Float32BufferAttribute(skinWeights, 4)
);

/* ---------- Materials ---------- */

const whiteColor = new Color("white");
const emissiveColor = new Color("orange");

const pageMaterials: MeshStandardMaterial[] = [
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: "#111" }),
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: whiteColor }),
];

/* ---------- Preload textures ---------- */

pages.forEach((p: any) => {
  useTexture.preload(`/textures/${p.front}.jpg`);
  useTexture.preload(`/textures/${p.back}.jpg`);
  useTexture.preload(`/textures/book-cover-roughness.jpg`);
});

/* ---------- Types ---------- */

type PageData = {
  front: string;
  back: string;
};

type PageProps = PageData & {
  number: number;
  page: number;
  opened: boolean;
  bookClosed: boolean;
} & JSX.IntrinsicElements["group"];

type BookProps = JSX.IntrinsicElements["group"];

/* ---------- Page component ---------- */

const Page: React.FC<PageProps> = ({
  number,
  front,
  back,
  page,
  opened,
  bookClosed,
  ...props
}) => {
  // We may or may not have a roughness map depending on cover pages
  const rawMaps = useTexture(
    [
      `/textures/${front}.jpg`,
      `/textures/${back}.jpg`,
      ...(number === 0 || number === pages.length - 1
        ? [`/textures/book-cover-roughness.jpg`]
        : []),
    ] as const
  ) as unknown as Texture[];

  const picture = rawMaps[0] as Texture;
  const picture2 = rawMaps[1] as Texture;
  const pictureRoughness = rawMaps[2] as Texture | undefined;

  picture.colorSpace = SRGBColorSpace;
  picture2.colorSpace = SRGBColorSpace;

  const group = useRef<Group>(null);
  const turnedAt = useRef<number>(0);
  const lastOpened = useRef<boolean>(opened);

  const skinnedMeshRef = useRef<SkinnedMesh | null>(null);

  const manualSkinnedMesh = useMemo(() => {
    const bones: Bone[] = [];
    for (let i = 0; i <= PAGE_SEGMENTS; i++) {
      const bone = new Bone();
      bones.push(bone);
      bone.position.x = i === 0 ? 0 : SEGMENT_WIDTH;
      if (i > 0) bones[i - 1].add(bone);
    }

    const skeleton = new Skeleton(bones);

    const materials: MeshStandardMaterial[] = [
      ...pageMaterials,
      new MeshStandardMaterial({
        color: whiteColor,
        map: picture,
        ...(number === 0
          ? { roughnessMap: pictureRoughness }
          : { roughness: 0.1 }),
        emissive: emissiveColor,
        emissiveIntensity: 0,
      }),
      new MeshStandardMaterial({
        color: whiteColor,
        map: picture2,
        ...(number === pages.length - 1
          ? { roughnessMap: pictureRoughness }
          : { roughness: 0.1 }),
        emissive: emissiveColor,
        emissiveIntensity: 0,
      }),
    ];

    const mesh = new SkinnedMesh(pageGeometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    mesh.add(skeleton.bones[0]);
    mesh.bind(skeleton);
    return mesh;
  }, [number, picture, picture2, pictureRoughness]);

  const [_, setPage] = useAtom(pageAtom);
  const [highlighted, setHighlighted] = useState(false);
  useCursor(highlighted);

  useFrame((_, delta) => {
    const sm = skinnedMeshRef.current;
    if (!sm || !group.current) return;

    // Handle emissive highlight (materials[4] and [5] are front/back printed sides)
    const mats = sm.material as Material | Material[];
    if (Array.isArray(mats)) {
      const m4 = mats[4] as MeshStandardMaterial | undefined;
      const m5 = mats[5] as MeshStandardMaterial | undefined;
      const emissiveIntensity = highlighted ? 0.22 : 0;
      if (m4) {
        m4.emissiveIntensity = MathUtils.lerp(
          m4.emissiveIntensity,
          emissiveIntensity,
          0.1
        );
      }
      if (m5) {
        m5.emissiveIntensity = MathUtils.lerp(
          m5.emissiveIntensity,
          emissiveIntensity,
          0.1
        );
      }
    }

    if (lastOpened.current !== opened) {
      turnedAt.current = Date.now();
      lastOpened.current = opened;
    }

    let turningTime = Math.min(400, Date.now() - turnedAt.current) / 400;
    turningTime = Math.sin(turningTime * Math.PI);

    let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
    if (!bookClosed) {
      targetRotation += degToRad(number * 0.8);
    }

    const bones = sm.skeleton.bones;
    for (let i = 0; i < bones.length; i++) {
      const target = i === 0 ? group.current : bones[i];

      const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
      const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
      const turningIntensity =
        Math.sin((i * Math.PI) / bones.length) * turningTime;

      let rotationAngle =
        insideCurveStrength * insideCurveIntensity * targetRotation -
        outsideCurveStrength * outsideCurveIntensity * targetRotation +
        turningCurveStrength * turningIntensity * targetRotation;

      let foldRotationAngle = degToRad(Math.sign(targetRotation) * 2);

      if (bookClosed) {
        if (i === 0) {
          rotationAngle = targetRotation;
          foldRotationAngle = 0;
        } else {
          rotationAngle = 0;
          foldRotationAngle = 0;
        }
      }

      // Y rotation (page turning)
      easing.dampAngle(
        (target as Group | Bone).rotation as unknown as any,
        "y",
        rotationAngle,
        easingFactor,
        delta
      );

      // X rotation (folding while turning)
      const foldIntensity =
        i > 8
          ? Math.sin((i * Math.PI) / bones.length - 0.5) * turningTime
          : 0;

      easing.dampAngle(
        (target as Group | Bone).rotation as unknown as any,
        "x",
        foldRotationAngle * foldIntensity,
        easingFactorFold,
        delta
      );
    }
  });

  return (
    <group
      {...props}
      ref={group}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHighlighted(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHighlighted(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setPage(opened ? number : number + 1);
        setHighlighted(false);
      }}
    >
      <primitive
        object={manualSkinnedMesh}
        ref={skinnedMeshRef as any}
        position-z={-number * PAGE_DEPTH + page * PAGE_DEPTH}
      />
    </group>
  );
};

/* ---------- Book component ---------- */

export const Book: React.FC<BookProps> = ({ ...props }) => {
  const [page] = useAtom(pageAtom);
  const [delayedPage, setDelayedPage] = useState<number>(page);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const goToPage = () => {
      setDelayedPage((prev) => {
        if (page === prev) return prev;

        timeout = setTimeout(
          goToPage,
          Math.abs(page - prev) > 2 ? 50 : 150
        );

        if (page > prev) return prev + 1;
        if (page < prev) return prev - 1;
        return prev;
      });
    };

    goToPage();
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [page]);

  return (
    <group {...props} rotation-y={-Math.PI / 2}>
      {pages.map((pageData: PageData, index: number) => (
        <Page
          key={index}
          page={delayedPage}
          number={index}
          opened={delayedPage > index}
          bookClosed={delayedPage === 0 || delayedPage === pages.length}
          {...pageData}
        />
      ))}
    </group>
  );
};
