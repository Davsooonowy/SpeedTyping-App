import React, { useState, useEffect, ReactNode } from 'react';import { Box, Container, CssBaseline, Slide } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    setShowNavbar(true);
    setTimeout(() => setShowContent(true), 400);
    setTimeout(() => setShowFooter(true), 800);
  }, []);

  return (
    <>
      <CssBaseline />
      <Slide direction="down" in={showNavbar} mountOnEnter unmountOnExit>
        <div><Navbar /></div>
      </Slide>
      <Slide direction="up" in={showContent} mountOnEnter unmountOnExit>
        <Container maxWidth="lg" style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center' }}>
          <Box my={4} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {children}
          </Box>
        </Container>
      </Slide>
      <Slide direction="up" in={showFooter} mountOnEnter unmountOnExit>
        <div><Footer /></div>
      </Slide>
    </>
  );
};

export default Layout;
