'use client';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    // 드리프트 줄이기: 다음 '정시 초'에 맞춰 예약
    let id: NodeJS.Timeout;
    const schedule = () => {
      const ms = 1000 - (Date.now() % 1000);
      id = setTimeout(() => {
        setNow(new Date());
        schedule();
      }, ms);
    };
    schedule();
    return () => clearTimeout(id);
  }, []);

  const formattedTime = dayjs(now).format('YYYY-MM-DD HH:mm:ss');

  return (
    <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
      <Typography variant="body1">{formattedTime}</Typography>
    </Box>
  );
}
