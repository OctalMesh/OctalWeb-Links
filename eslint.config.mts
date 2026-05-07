import jsModule from "@eslint/js";
import eslintConfigPrettierModule from "eslint-config-prettier";
import astroModule from "eslint-plugin-astro";
import reactHooksModule from "eslint-plugin-react-hooks";
import reactRefreshModule from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globalsModule from "globals";
import tseslint from "typescript-eslint";

//<editor-fold desc="Custom Plugins" defaultstate="collapsed">
const LAYER_WEIGHTS = {
  app: 0,
  pages: 1,
  widgets: 2,
  features: 3,
  entities: 4,
  shared: 5,
} as const;

type Layer = keyof typeof LAYER_WEIGHTS;

// noinspection JSUnusedGlobalSymbols
const fsdPlugin: any = {
  rules: {
    "fsd-logic": {
      meta: {
        type: "problem" as const,
        messages: {
          publicApi:
            "FSD: Public API violation. Direct import of internal files is prohibited.",
          layerHierarchy:
            "FSD: Layer hierarchy violation. The [{{importLayer}}] layer cannot be imported from [{{currentLayer}}].",
          crossSlice:
            "FSD: Hierarchy violation. Importing between slices of the same layer [{{layer}}] is not allowed ({{importSlice}} <- {{currentSlice}}).",
        },
        schema: [],
      },
      create(context: any) {
        const fullPath: string = context.filename || "";
        const normalizedPath = fullPath.replace(/\\/g, "/");

        const srcMatch = normalizedPath.match(
          /src\/(app|pages|widgets|features|entities|shared)(?:\/([^/]+))?/,
        );
        const currentLayer = srcMatch?.[1] as Layer | undefined;
        const currentSlice = srcMatch?.[2];

        // noinspection JSUnusedGlobalSymbols
        return {
          ImportDeclaration(node: any) {
            const importPath = node.source.value;
            if (typeof importPath !== "string") {
              return;
            }

            const match = importPath.match(
              /^@(app|pages|widgets|features|entities|shared)\/([^/]+)(?:\/(.+))?/,
            );
            if (!match) {
              return;
            }

            const [, importLayerRaw, importSlice, internalPath] = match;
            const importLayer = importLayerRaw as Layer;

            if (
              currentLayer &&
              currentLayer in LAYER_WEIGHTS &&
              importLayer in LAYER_WEIGHTS
            ) {
              const currentWeight = LAYER_WEIGHTS[currentLayer];
              const importWeight = LAYER_WEIGHTS[importLayer];

              if (importWeight < currentWeight) {
                return context.report({
                  node,
                  messageId: "layerHierarchy",
                  data: { importLayer, currentLayer },
                });
              }

              if (
                currentLayer === importLayer &&
                !["shared", "app"].includes(currentLayer) &&
                currentSlice !== importSlice
              ) {
                return context.report({
                  node,
                  messageId: "crossSlice",
                  data: { layer: currentLayer, importSlice, currentSlice },
                });
              }
            }

            if (internalPath && !["shared", "app"].includes(importLayer)) {
              if (!internalPath.match(/^index(\.(ts|tsx|js|jsx))?$/)) {
                context.report({ node, messageId: "publicApi" });
              }
            }
          },
        };
      },
    },
  },
};
//</editor-fold>

export default defineConfig([
  globalIgnores(["dist", ".astro", "node_modules"]),

  //<editor-fold desc="TS & JS" defaultstate="collapsed">
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    extends: [
      ...tseslint.configs.recommended,
      jsModule.configs.recommended,
      reactHooksModule.configs.flat.recommended,
    ],
    plugins: {
      "react-refresh": reactRefreshModule,
      fsd: fsdPlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      globals: globalsModule.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-unused-vars": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "fsd/fsd-logic": "error",
    },
  },
  //</editor-fold>

  //<editor-fold desc="Astro" defaultstate="collapsed">
  {
    files: ["src/**/*.astro"],
    extends: [...astroModule.configs.recommended],
    plugins: { fsd: fsdPlugin },
    rules: {
      "fsd/fsd-logic": "error",
    },
  },
  //</editor-fold>

  eslintConfigPrettierModule,
]);
