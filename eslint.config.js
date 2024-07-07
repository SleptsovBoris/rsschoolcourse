import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginJSXRuntime from 'react/jsx-runtime';

export default [
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': eslintReactHooks,
      'react-refresh': eslintReactRefresh,
    },
  },
  {
    ignores: ['**/node_modules/', '.git/', 'eslint.config.js'],
  },
  { files: ['**/*.{ts,tsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: ['tsconfig.json', 'tsconfig.app.json'],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  pluginJSXRuntime,
  {
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      'react-compiler/react-compiler': 'error',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
