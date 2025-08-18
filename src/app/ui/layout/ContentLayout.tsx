'use client';
import { Box } from '@mui/material';
import Header from '@/app/ui/components/Header';
import Footer from '@/app/ui/components/Footer';
import Sidebar from '@/app/ui/components/Sidebar';
import { Suspense, useState } from 'react';

export default function ContentLayout({
  menu,
  children,
}: {
  menu: any; // Adjust type as necessary
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onToggleSidebar={handleToggleSidebar} />
      <Sidebar menu={menu} open={sidebarOpen} onClose={handleToggleSidebar} />
      <Suspense fallback={<div>Loading...</div>}>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          border="solid 1px green"
        >
          {children}
        </Box>
      </Suspense>
      <Footer />
    </Box>
  );
}
