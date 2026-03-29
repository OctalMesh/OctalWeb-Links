import * as jsModule from "@eslint/js";
import * as eslintConfigPrettierModule from "eslint-config-prettier";
import * as reactHooksModule from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import * as globalsModule from "globals";
import tseslint from "typescript-eslint";

const js = ((jsModule as { default?: typeof jsModule }).default ?? jsModule) as typeof jsModule;
const reactHooks = ((reactHooksModule as { default?: typeof reactHooksModule }).default ??
  reactHooksModule) as typeof reactHooksModule;
const globals = ((globalsModule as { default?: typeof globalsModule }).default ??
  globalsModule) as typeof globalsModule;
const eslintConfigPrettier =
  (eslintConfigPrettierModule as { default?: unknown }).default ?? eslintConfigPrettierModule;

export default defineConfig([
  globalIgnores(["dist", "src/routeTree.gen.ts"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "react-refresh/only-export-components": [
        "error",
        {
          allowConstantExport: true,
          allowExportNames: [
            "useIsInView",
            "buttonVariants",
            "pathClassName",
            "staticAnimations",
            "useAnimateIconContext",
            "getVariants",
          ],
        },
      ],
    },
  },

  eslintConfigPrettier,
]);
