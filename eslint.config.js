import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import boundaries from "eslint-plugin-boundaries";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "node_modules", "src/assets/lottie"]),
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
              allow: { to: { type: ["app", "feature", "shared", "assets"] } },
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
