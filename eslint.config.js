import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactCompiler from 'eslint-plugin-react-compiler';

export default tseslint.config(
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
    },
    ignores: ['**/node_modules/', '.git/'],
  },
  { files: ['**/*.{ts,tsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: ['tsconfig.json', 'tsconfig.app.json'],
    },
  },
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
);
