'use client';
import { Suspense, useState } from 'react';

import { Box } from '@mui/material';

import Footer from '@/app/ui/components/Footer';
import Sidebar, { type MenuNode } from '@/app/ui/components/Sidebar';
import Header from '@/app/ui/components/header/Header';

export default function ContentLayout({
  menu,
  children,
}: {
  menu: MenuNode[]; // Adjust type as necessary
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onToggleSidebar={handleToggleSidebar} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar menu={menu} open={sidebarOpen} onClose={handleToggleSidebar} />
        <Suspense fallback={<div>Loading...</div>}>
          <Box
            component="main"
            sx={{
              display: 'flex',
              flexGrow: 1,
              marginTop: '64px',
              height: 'calc(100vh - 64px)',
            }}
          >
            {children}
          </Box>
        </Suspense>
      </Box>
      <Footer />
    </Box>
  );
}
