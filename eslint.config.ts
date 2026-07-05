// eslint.config.ts
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginNode from 'eslint-plugin-node';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import {fixupPluginRules} from '@eslint/compat';
import {defineConfig, globalIgnores} from 'eslint/config';

const nodeRecommendedModuleRules =
  eslintPluginNode.configs['recommended-module'].rules;

const nodeDevConfigRules = {
  ...nodeRecommendedModuleRules,
  'node/no-unpublished-import': 'off',
  'node/no-unpublished-require': 'off',
  'node/no-extraneous-import': 'off',
  'node/no-extraneous-require': 'off',
  'node/no-missing-import': 'off',
  'node/no-missing-require': 'off',
  'node/no-unsupported-features/es-syntax': 'off',
  'node/no-unsupported-features/es-builtins': 'off',
  'node/no-unsupported-features/node-builtins': 'off',
};

export default defineConfig([
  globalIgnores(['dist', 'node_modules', '**/node_modules/**']),
  // Configuration for source files
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.app.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.app.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
        },
      },
      react: {
        version: 'detect',
      },
    },
    plugins: {
      prettier,
      import: eslintPluginImport,
      react: eslintPluginReact,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'prettier/prettier': 'error',

      'no-console': 'off',
      'import/no-unresolved': 'error',
      'import/no-deprecated': 'warn',
      'no-unused-vars': 'off', // Turned off in favor of TS rule
      'no-warning-comments': 'warn',
      'no-nested-ternary': 'off',

      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-useless-fragment': 'warn',
      'react/no-deprecated': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/set-state-in-effect': 'off',

      '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-deprecated': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  // Node tooling configs (Vite, Tailwind, etc.)
  {
    files: ['vite.config.ts', 'tailwind.config.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
      parser: tseslint.parser,
    },
    plugins: {
      prettier,
      node: fixupPluginRules(eslintPluginNode),
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...nodeDevConfigRules,
      'prettier/prettier': 'error',
      'no-console': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
  // ESLint config (without node plugin — devDependency imports are expected)
  {
    files: ['eslint.config.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
      parser: tseslint.parser,
    },
    plugins: {
      prettier,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
  eslintConfigPrettier,
]);
