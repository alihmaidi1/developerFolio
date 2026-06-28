import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import boundaries from "eslint-plugin-boundaries";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "dist",
    "node_modules",
    "src/assets/lottie",
    "src/animations",
    "src/components",
    "src/content",
    "src/hooks",
    "src/i18n",
    "src/layouts",
    "src/pages",
    "src/routes",
    "src/store",
    "src/three",
    "src/utils",
    "src/sources.ts",
    "src/features/sounds",
  ]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: { boundaries },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.app.json",
        },
      },
      "boundaries/elements": [
        { type: "app", pattern: "src/main.tsx" },
        { type: "store", pattern: "src/app/store/**" },
        { type: "app", pattern: "src/app/**" },
        {
          type: "feature",
          pattern: "src/features/*",
          mode: "folder",
          capture: ["featureName"],
        },
        { type: "shared", pattern: "src/shared/**" },
        { type: "assets", pattern: "src/assets/**" },
      ],
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: { type: "app" },
              allow: {
                to: { type: ["app", "store", "feature", "shared", "assets"] },
              },
            },
            {
              from: { type: "store" },
              allow: { to: { type: ["store", "feature", "shared"] } },
            },
            {
              from: { type: "feature" },
              allow: {
                to: [
                  {
                    type: "feature",
                    captured: { featureName: "{{from.featureName}}" },
                  },
                  { type: "shared" },
                  { type: "store" },
                  { type: "assets" },
                ],
              },
            },
            {
              from: { type: "shared" },
              allow: { to: { type: ["shared", "assets"] } },
            },
          ],
        },
      ],
    },
  },
]);
