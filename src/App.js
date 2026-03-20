import React from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import './i18n';

import { AuthProvider, useAuth } from './context/AuthContext';
import { ContentProvider, useContent } from './context/ContentContext';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Gallery from './components/Gallery';
import Events from './components/Events';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#8B1A1A' },
    secondary: { main: '#FFD700' },
    background: { default: '#0a0000', paper: '#110000' },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Noto Sans Devanagari", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth' },
        body: {
          backgroundColor: '#0a0000',
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-track': { background: '#0a0000' },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255,215,0,0.3)',
            borderRadius: 3,
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(255,215,0,0.5)',
          },
        },
      },
    },
  },
});

function AppContent() {
  const { isAdmin } = useAuth();
  const { themeColor, updateThemeColor } = useContent();

  return (
    <Box sx={{ bgcolor: '#0a0000', minHeight: '100vh' }}>
      <Navbar themeColor={themeColor} />
      <Box component="main" sx={{ pt: '64px' }}>
        <Home themeColor={themeColor} />
        <About />
        <Gallery />
        <Events />
        <Contact />
        {isAdmin && (
          <AdminPanel
            themeColor={themeColor}
            onThemeChange={updateThemeColor}
          />
        )}
      </Box>
      <Footer themeColor={themeColor} />
      <ScrollToTop />
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <ContentProvider>
          <AppContent />
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
