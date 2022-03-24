import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "@vuetify/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
    {
      name: "vitest-plugin-beforeall",
      config: () => ({
        test: { setupFiles: ["./src/beforeAll.js"] },
      }),
    },
  ],
  test: {
    globals: true,
    // globalSetup: ["./src/setupTests.js"],

    environment: "jsdom",
    deps: {
      inline: ["vuetify"],
    },
    coverage: {
      reporter: ["text", "html", "lcov"],
    },
  },
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
