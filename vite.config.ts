import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(() => {
  const baseConfig: UserConfig = {
    plugins: [react(), tailwindcss()],
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
        cssFileName: `component.css`,
      },
      rollupOptions: {
        external: ['react', 'react/jsx-runtime', 'react-dom'],
      },
      sourcemap: true,
    },
  };
  return {
    mode: "development",
    ...baseConfig,
  };
});
