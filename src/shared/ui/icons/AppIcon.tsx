'use client';

import * as React from 'react';
import { forwardRef } from 'react';

import { SvgIcon, SvgIconProps } from '@mui/material';

import { iconRegistry, IconName } from './registry';

export type AppIconProps = Omit<SvgIconProps, 'component'> & {
  /** registry에서 등록한 아이콘 이름 */
  name: IconName;
  /** 접근성 이름(의미 전달용일 때). decorative=false일 때 권장 */
  title?: string;
  /** 장식용 여부. true면 스크린리더에서 숨김 */
  decorative?: boolean;
};

/**
 * 공통 아이콘 컴포넌트
 * - 색상: MUI palette 연동(currentColor)
 * - 크기: fontSize/sx로 제어
 * - 접근성: decorative=true(기본)면 aria-hidden, 의미 전달 시 decorative=false + title
 */
const AppIcon = forwardRef<SVGSVGElement, AppIconProps>(function AppIcon(
  { name, decorative = true, title, ...props },
  ref,
) {
  const LazyIcon = iconRegistry[name] as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  // 접근성 처리
  const a11yProps = decorative
    ? { 'aria-hidden': true }
    : { role: 'img', 'aria-label': title ?? name };

  return (
    <SvgIcon
      ref={ref}
      component={LazyIcon}
      inheritViewBox
      // MUI 색상/크기 제어: color, fontSize, sx 등 그대로 사용
      {...a11yProps}
      {...props}
    />
  );
});

export default AppIcon;
