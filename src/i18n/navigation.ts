import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'es'] as const;

export const localePrefix = 'always';

const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });

export { Link, redirect, usePathname, useRouter };
