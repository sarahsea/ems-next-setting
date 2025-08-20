import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import boundaries from 'eslint-plugin-boundaries';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // =====================================================================
  // next 기본 권장 세팅
  // =====================================================================
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'dist/',
      'build/',
      'node_modules/',
      '*.config.{js,ts,mjs,cjs}',
      '**/*.test.{js,ts,mjs,cts,mts,jsx,tsx}',
      '**/*.stories.{js,ts,mjs,cts,mts,jsx,tsx}',
      // next 빌드 산출물
      '.next/',
      'out/',
      'coverage/',
    ],
  },
  // =====================================================================
  // FSD 아키텍쳐
  // =====================================================================
  {
    files: ['src/**/*.{ts,tsx,d.ts}'],
    plugins: {
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        { type: 'shared', pattern: 'src/shared/*' },
        { type: 'entities', pattern: 'src/entities/*' },
        { type: 'features', pattern: 'src/features/*' },
        { type: 'widgets', pattern: 'src/widgets/*' },
        { type: 'pages', pattern: 'src/pages/*' },
        { type: 'app', pattern: 'src/app/*' },
      ],
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'shared', allow: ['shared'] },
            { from: 'entities', allow: ['shared'] },
            { from: 'features', allow: ['shared', 'entities'] },
            {
              from: 'widgets',
              allow: ['shared', 'entities', 'features'],
            },
            {
              from: 'pages',
              allow: ['shared', 'entities', 'features', 'widgets'],
            },
            { from: 'app', allow: ['*'] },
          ],
        },
      ],
    },
  },
  // =====================================================================
  // MUI icon import 규칙
  // =====================================================================
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@mui/icons-material',
              message:
                "Avoid importing directly from @mui/icons-material. Use direct icon imports (e.g., '@mui/icons-material/Add') instead.",
            },
          ],
        },
      ],
    },
  },
  // =====================================================================
  // import 정렬 규칙
  // =====================================================================
  {
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: 'react', group: 'builtin', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
          },
          'newlines-between': 'always-and-inside-groups',
        },
      ],
    },
  },
  // =====================================================================
  // prettier 충돌 방지 (항상 마지막에 위치해야 함)
  // =====================================================================
  eslintPluginPrettierRecommended,
];

export default eslintConfig;
