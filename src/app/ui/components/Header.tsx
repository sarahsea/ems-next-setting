import { Box } from '@mui/material';
import React from 'react';
import LocaleSwitcher from './LocaleSwitcher';

function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '64px',
        alignItems: 'center',
        padding: '0 16px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <h1>Header</h1>
      <LocaleSwitcher />
    </Box>
  );
}

export default Header;
