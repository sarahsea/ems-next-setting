import { Box, Grid } from "@mui/material";
import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";
import Sidebar from "@/app/component/Sidebar";
import { Suspense } from "react";

export default function MainLayout({
  menu,
  children,
}: {
  menu: any; // Adjust type as necessary
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Sidebar />
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
