import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig((config) => {
  console.log(config, "config");
  const baseConfig: UserConfig = {
    plugins: [svgr(), react()],
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
        external: [/^react/],
      },
      sourcemap: true,
    },
    css: {},
  };
  return {
    mode: "production",
    ...baseConfig,
  };
});
