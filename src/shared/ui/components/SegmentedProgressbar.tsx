'use client';
// SegmentedProgressBar.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme, type Theme, type PaletteColor } from '@mui/material/styles';

type PaletteColorKey = {
  [K in keyof Theme['palette']]: Theme['palette'][K] extends PaletteColor
    ? K
    : never;
}[keyof Theme['palette']];
type ColorProp = PaletteColorKey;

type Props = {
  label?: string; // 좌측 라벨 (예: "SOH")
  value: number; // 0~100
  segments?: number; // 분절 개수
  height?: number; // 바 높이(px)
  gap?: number; // 분절 간격(px)
  radius?: number; // 각 분절 라운드(px)
  color?: ColorProp; // 채워진 색
  emptyColor?: string; // 빈 칸 색
  showValue?: boolean; // 우측 % 표시
  formatValue?: (v: number) => string; // % 표기 커스터마이즈
};

export default function SegmentedProgressBar({
  label,
  value,
  segments = 12,
  height = 12,
  gap = 1,
  radius = 0,
  color = 'primary',
  emptyColor = 'rgba(255,255,255,0.18)',
  showValue = true,
  formatValue = (v) => `${v.toFixed(1)}%`,
}: Props) {
  const clamped = Math.max(0, Math.min(100, value));
  const filled = Math.floor((clamped / 100) * segments);
  const frac = (clamped / 100) * segments - filled; // 0~<1
  const theme = useTheme();
  const fillColor = theme.palette[color]?.main ?? theme.palette[color];

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center',
        columnGap: 1,
      }}
    >
      {label ? (
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      ) : (
        <span />
      )}

      {/* 바 영역 */}
      <Box
        role="progressbar"
        aria-label={label ?? 'progress'}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(clamped)}
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${segments}, 1fr)`,
          gap,
        }}
      >
        {Array.from({ length: segments }).map((_, i) => {
          const isFull = i < filled;
          const isPartial = i === filled && frac > 0 && filled < segments;

          return (
            <Box
              key={i}
              sx={{
                height,
                borderRadius: radius,
                backgroundColor: isFull ? fillColor : emptyColor,
                overflow: 'hidden',
                ...(isPartial && {
                  // 부분 채움: 왼→오른쪽으로 frac 만큼만 채운다
                  backgroundImage: `linear-gradient(to right, ${fillColor} ${
                    frac * 100
                  }%, ${emptyColor} ${frac * 100}%)`,
                }),
              }}
            />
          );
        })}
      </Box>

      {showValue ? (
        <Typography variant="body2" fontWeight={700}>
          {formatValue(clamped)}
        </Typography>
      ) : (
        <span />
      )}
    </Box>
  );
}
