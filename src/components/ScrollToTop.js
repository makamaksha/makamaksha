import React, { useState, useEffect } from 'react';
import { Fab, Zoom, Tooltip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={visible}>
      <Tooltip title="Back to top" placement="left">
        <Fab
          onClick={handleClick}
          size="medium"
          sx={{
            position: 'fixed',
            bottom: { xs: 20, md: 32 },
            right: { xs: 16, md: 32 },
            zIndex: 1300,
            bgcolor: '#8B1A1A',
            color: '#FFD700',
            border: '2px solid rgba(255,215,0,0.4)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            '&:hover': {
              bgcolor: '#a52828',
              border: '2px solid rgba(255,215,0,0.7)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s',
          }}
        >
          <KeyboardArrowUpIcon sx={{ fontSize: '1.8rem' }} />
        </Fab>
      </Tooltip>
    </Zoom>
  );
}
