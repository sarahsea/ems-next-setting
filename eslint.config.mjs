import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'dist/',
      'build/',
      'node_modules/',
      '*.config.{js,ts,mjs,cjs}',
      '**/*.test.{js,ts,mjs,cts,mts,jsx,tsx}',
      '!.storybook',
      '**/*.stories.{js,ts,mjs,cts,mts,jsx,tsx}',
    ],
  },
  eslintPluginPrettierRecommended,
];

export default eslintConfig;
