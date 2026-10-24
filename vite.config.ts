import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "welkui-font-license",
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "fonts/ShortStack-OFL.txt",
          source: readFileSync(
            new URL("./assets/font/short_stack/OFL.txt", import.meta.url),
            "utf8",
          ),
        });
        this.emitFile({
          type: "asset",
          fileName: "licenses/QR-CODE-DEPENDENCIES.txt",
          source: readFileSync(
            new URL(
              "./assets/licenses/QR-CODE-DEPENDENCIES.txt",
              import.meta.url,
            ),
            "utf8",
          ),
        });
      },
    },
    {
      name: "welkui-client-boundaries",
      renderChunk(code, chunk) {
        // Rollup removes directives; restore them on component modules, not the barrel.
        const source = chunk.facadeModuleId
          ? this.getModuleInfo(chunk.facadeModuleId)?.code
          : undefined;
        if (source && /^\s*["']use client["'];/.test(source)) {
          return { code: `"use client";\n${code}`, map: null };
        }
      },
    },
  ],
  build: {
    lib: {
      entry: {
        index: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
        styles: fileURLToPath(
          new URL("./src/styles/index.ts", import.meta.url),
        ),
      },
      formats: ["es"],
      fileName: "index",
      cssFileName: "styles",
    },
    rollupOptions: {
      external: (id) => /^(react|react-dom)(\/|$)/.test(id),
      onwarn(warning, warn) {
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" &&
          warning.message.includes('"use client"')
        ) {
          return;
        }
        warn(warning);
      },
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
  },
});
