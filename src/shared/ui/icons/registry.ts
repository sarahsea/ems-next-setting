import dynamic from 'next/dynamic';

// 아이콘을 개별 청크로 동적 로딩(필요할 때만 네트워크 요청)
export const iconRegistry = {
  battery: dynamic(() => import('./raw/bat.svg'), { ssr: false }),
  pms: dynamic(() => import('./raw/pms.svg'), { ssr: false }),
} as const;

export type IconName = keyof typeof iconRegistry;
