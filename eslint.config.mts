import jsModule from "@eslint/js";
import eslintConfigPrettierModule from "eslint-config-prettier";
import astroModule from "eslint-plugin-astro";
import boundaries from "eslint-plugin-boundaries";
import reactHooksModule from "eslint-plugin-react-hooks";
import reactRefreshModule from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globalsModule from "globals";
import tseslint from "typescript-eslint";

//<editor-fold desc="General configuration" defaultstate="collapsed">
const boundariesSettings: any = {
  "boundaries/include": ["src/**/*"],

  "boundaries/elements": [
    { type: "app", pattern: "src/app/**" },
    { type: "pages", pattern: "src/pages/**" },
    { type: "widgets", pattern: "src/widgets/**" },
    { type: "features", pattern: "src/features/**" },
    { type: "entities", pattern: "src/entities/**" },
    { type: "shared", pattern: "src/shared/**" },
  ],

  "import/resolver": {
    typescript: {
      alwaysTryTypes: true,
      project: "./tsconfig.json",
    },
  },
};

const boundariesRule: any = [
  "error",
  {
    default: "disallow",
    rules: [
      { from: { type: "shared" }, allow: [{ to: { type: "shared" } }] },
      {
        from: { type: "entities" },
        allow: [{ to: { type: "shared" } }, { to: { type: "entities" } }],
      },
      {
        from: { type: "features" },
        allow: [
          { to: { type: "shared" } },
          { to: { type: "entities" } },
          { to: { type: "features" } },
        ],
      },
      {
        from: { type: "widgets" },
        allow: [
          { to: { type: "shared" } },
          { to: { type: "entities" } },
          { to: { type: "features" } },
          { to: { type: "widgets" } },
        ],
      },
      {
        from: { type: "pages" },
        allow: [
          { to: { type: "shared" } },
          { to: { type: "entities" } },
          { to: { type: "features" } },
          { to: { type: "widgets" } },
          { to: { type: "pages" } },
          { to: { type: "app" } },
        ],
      },
      {
        from: { type: "app" },
        allow: [
          { to: { type: "shared" } },
          { to: { type: "entities" } },
          { to: { type: "features" } },
          { to: { type: "widgets" } },
          { to: { type: "pages" } },
          { to: { type: "app" } },
        ],
      },
    ],
  },
];
//</editor-fold>

export default defineConfig([
  //<editor-fold desc="TS & JS" defaultstate="collapsed">
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    extends: [
      ...tseslint.configs.recommended,
      jsModule.configs.recommended,
      reactHooksModule.configs.flat.recommended,
    ],
    plugins: {
      boundaries,
      "react-refresh": reactRefreshModule,
    },
    languageOptions: {
      ecmaVersion: "latest",
      globals: globalsModule.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: boundariesSettings,
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
      "boundaries/dependencies": boundariesRule,
    },
  },
  //</editor-fold>

  //<editor-fold desc="Astro" defaultstate="collapsed">
  {
    files: ["src/**/*.astro"],
    extends: [...astroModule.configs.recommended],
    plugins: { boundaries },
    settings: boundariesSettings,
    rules: {
      "boundaries/dependencies": boundariesRule,
    },
  },
  //</editor-fold>

  eslintConfigPrettierModule,
  globalIgnores(["dist", ".astro"]),
]);
