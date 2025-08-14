import Box from '@mui/material/Box';
import React from 'react';

export default function loading() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      loading...
    </Box>
  );
}
