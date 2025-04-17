import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfig from './tsconfig.json';

const SRC_PATH = path.resolve(__dirname, 'src');

const parseTsConfigPaths = (
  paths: Record<string, string[]>
): Record<string, string> => {
  const aliases: Record<string, string> = {};

  for (const [alias, targetPaths] of Object.entries(paths)) {
    const normalizedKey = alias.replace('/*', '');
    const normalizedPath = targetPaths[0].replace('/*', '');
    aliases[normalizedKey] = path.resolve(SRC_PATH, normalizedPath);
  }

  return aliases;
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ``,
        includePaths: [path.resolve(__dirname, 'src/styles')],
      },
    },
  },
});
