// src/types/meshline-r3f.d.ts
import type { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import type { Object3DNode, MaterialNode } from '@react-three/fiber'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>
      meshLineMaterial: MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>
    }
  }
}
