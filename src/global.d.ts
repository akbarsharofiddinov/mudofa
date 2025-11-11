/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare module "*.glb";
declare module "*.png";
declare module "*.jpg";

declare module "meshline" {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

declare module "*.glb" {
  const src: string;
  export default src;
}
declare module "*.gltf" {
  const src: string;
  export default src;
}
declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.css";
declare module "html-docx-js/dist/html-docx";
declare module "mammoth";
declare module "file-saver";
declare module "react-quill";
declare module "*.png";
declare module "*.glb";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      meshLineMaterial: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}