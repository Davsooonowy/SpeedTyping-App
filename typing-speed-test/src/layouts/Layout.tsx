import React, { ReactNode } from 'react';
import { AppBar, Box, Toolbar, Typography, Container, CssBaseline } from '@mui/material';
import Navbar from '../components/Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center' }}>
        <Box my={4} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </Box>
      </Container>
    </>
  );
};

export default Layout;
