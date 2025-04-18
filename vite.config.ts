import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
import preserveDirectives from "rollup-preserve-directives";

export default defineConfig((config) => {
  console.log(config, "config");
  const baseConfig: UserConfig = {
    plugins: [svgr(), react(), preserveDirectives()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    build: {
      lib: {
        entry: {
          component: path.resolve(__dirname, "components/index.tsx"),
          util: path.resolve(__dirname, "lib/index.tsx"),
          hooks: path.resolve(__dirname, "hooks/index.tsx"),
        },
        formats: ["es"],
        fileName: (_, entryName) => `${entryName}.js`,
        cssFileName: `component`,
      },
      rollupOptions: {
        external: [/^react/, "@ark-ui/react"],
        output: {
          preserveModules: true,
        },
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
