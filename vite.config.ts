// import { defineConfig } from "vite";
// import * as path from "path";
// import react from "@vitejs/plugin-react-swc";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//       "@components": path.resolve(__dirname, "./src/components"),
//       "@utils": path.resolve(__dirname, "./src/utils"),
//       "@assets": path.resolve(__dirname, "./src/assets"),
//       "@pages": path.resolve(__dirname, "./src/pages"),
//       "@styles": path.resolve(__dirname, "./src/styles"),
//       "@store": path.resolve(__dirname, "./src/store"),
//       "@UI": path.resolve(__dirname, "./src/components/UI"),
//       "@services": path.resolve(__dirname, "./src/services"),
//       buffer: "buffer", // polyfill uchun
//     },
//   },
//   assetsInclude: ["**/*.glb", "**/*.gltf", "**/*.png", "**/*.jpg"],
// });

import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@UI": path.resolve(__dirname, "./src/components/UI"),
      "@services": path.resolve(__dirname, "./src/services"),
      buffer: "buffer",
    },
  },
  assetsInclude: ["**/*.glb", "**/*.gltf", "**/*.png", "**/*.jpg"],
});
