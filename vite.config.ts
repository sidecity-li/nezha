import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// import postcssConfig from "./postcss.config";

export default defineConfig(() => {
  const baseConfig: UserConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    build: {
      lib: {
        entry: {
          component: path.resolve(__dirname, "components/index.tsx"),
        },
        formats: ["es"],
        fileName: (_, entryName) => `${entryName}.js`,
        cssFileName: `component`,
      },
      rollupOptions: {
        external: [/^react/, /^@radix-ui/],
      },
      sourcemap: true,
    },
    css: {
    },
  };
  return {
    mode: "production",
    ...baseConfig,
  };
});
