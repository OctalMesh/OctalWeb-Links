import * as jsModule from "@eslint/js";
import eslintConfigPrettierModule from "eslint-config-prettier";
import * as reactHooksModule from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";
import globalsModule from "globals";
import tseslint from "typescript-eslint";

const js = ((jsModule as { default?: typeof jsModule }).default ?? jsModule) as typeof jsModule;
const reactHooks = ((reactHooksModule as { default?: typeof reactHooksModule }).default ??
  reactHooksModule) as typeof reactHooksModule;
const globals = ((globalsModule as { default?: typeof globalsModule }).default ??
  globalsModule) as typeof globalsModule;
const eslintConfigPrettier =
  (eslintConfigPrettierModule as { default?: unknown }).default ?? eslintConfigPrettierModule;

export default defineConfig([
  globalIgnores(["dist", ".astro"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, tseslint.configs.recommended, reactHooks.configs.flat.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  eslintConfigPrettier,
]);
