import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      coverage: {
        reporter: ['text', 'json', 'html'],
        all: true,
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/**/*.d.ts',
          'src/index.tsx',
          'src/App.tsx',
          'src/components/ErrorBoundary.tsx',
          'src/pages/MainPage/MainPage.tsx',
          'src/pages/404ErrorPage/404ErrorPage.tsx',
          'src/vite-env.d.ts',
        ],
        statements: 80,
      },
    },
  }),
);
