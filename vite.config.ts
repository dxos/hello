import { defineConfig } from "vite";
import { ConfigPlugin } from "@dxos/config/vite-plugin";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    fs: {
      strict: false,
    },
  },
  build: {
    outDir: "out/hello-dxos",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        shell: resolve(__dirname, "./shell.html"),
      },
    },
  },
  worker: {
    format: "es",
    plugins: () => [topLevelAwait(), wasm()],
  },

  plugins: [
    ConfigPlugin(),
    topLevelAwait(),
    wasm(),
    react({ jsxRuntime: "classic" }),
  ],
});
