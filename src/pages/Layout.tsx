import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box display="flex">
      <Box flexGrow={1} display="flex" flexDirection="column" minHeight="100vh">
        <Navbar />
        <Box display='flex'>
        <Sidebar />
        <Box component="main" flexGrow={1} sx={{background: '#F9F9F8'}}>
          {children}
        </Box>          
        </Box>

        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
