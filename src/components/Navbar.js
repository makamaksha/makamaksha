import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import AdminLoginDialog from './AdminLoginDialog';

const NAV_ITEMS = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.gallery', href: '#gallery' },
  { key: 'nav.events', href: '#events' },
  { key: 'nav.contact', href: '#contact' },
];

export default function Navbar({ themeColor }) {
  const { t, i18n } = useTranslation();
  const { isAdmin, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [langAnchor, setLangAnchor] = useState(null);

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLangAnchor(null);
  };

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: `linear-gradient(135deg, ${themeColor} 0%, #4a0e0e 100%)`,
          boxShadow: '0 2px 20px rgba(0,0,0,0.4)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo & Title */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
            onClick={() => scrollTo('#home')}
          >
            <Avatar
              sx={{
                bgcolor: 'rgba(255,200,100,0.2)',
                border: '2px solid rgba(255,200,100,0.6)',
                width: 40,
                height: 40,
                fontSize: '1.2rem',
              }}
            >
              🛕
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#FFD700',
                  lineHeight: 1.1,
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                }}
              >
                {i18n.language === 'hi' ? 'माँ कामाख्या मंदिर' : 'Maa Kamakhya Mandir'}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'rgba(255,220,150,0.85)', fontSize: '0.65rem' }}
              >
                Guwahati, Assam
              </Typography>
            </Box>
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.key}
                onClick={() => scrollTo(item.href)}
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 500,
                  px: 1.5,
                  '&:hover': {
                    color: '#FFD700',
                    bgcolor: 'rgba(255,215,0,0.1)',
                  },
                }}
              >
                {t(item.key)}
              </Button>
            ))}
          </Box>

          {/* Right Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Language Toggle */}
            <Tooltip title="Language / भाषा">
              <Button
                size="small"
                startIcon={<LanguageIcon />}
                onClick={(e) => setLangAnchor(e.currentTarget)}
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 2,
                  px: 1.5,
                  minWidth: 'auto',
                  '&:hover': { bgcolor: 'rgba(255,215,0,0.15)', color: '#FFD700' },
                }}
              >
                {i18n.language === 'hi' ? 'हिं' : 'EN'}
              </Button>
            </Tooltip>
            <Menu
              anchorEl={langAnchor}
              open={Boolean(langAnchor)}
              onClose={() => setLangAnchor(null)}
              PaperProps={{ sx: { bgcolor: '#1a1a1a', color: '#fff', mt: 1 } }}
            >
              <MenuItem
                onClick={() => toggleLanguage('en')}
                selected={i18n.language === 'en'}
                sx={{ '&.Mui-selected': { bgcolor: 'rgba(255,215,0,0.2)' } }}
              >
                🇺🇸 English
              </MenuItem>
              <MenuItem
                onClick={() => toggleLanguage('hi')}
                selected={i18n.language === 'hi'}
                sx={{ '&.Mui-selected': { bgcolor: 'rgba(255,215,0,0.2)' } }}
              >
                🇮🇳 हिंदी
              </MenuItem>
            </Menu>

            {/* Admin Controls */}
            {isAdmin ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  icon={<AdminPanelSettingsIcon />}
                  label={t('nav.adminPanel')}
                  onClick={() => scrollTo('#admin')}
                  sx={{
                    bgcolor: 'rgba(255,215,0,0.2)',
                    color: '#FFD700',
                    border: '1px solid rgba(255,215,0,0.4)',
                    display: { xs: 'none', sm: 'flex' },
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(255,215,0,0.3)' },
                  }}
                />
                <Tooltip title={t('nav.adminLogout')}>
                  <IconButton onClick={logout} sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Tooltip title={t('nav.adminLogin')}>
                <IconButton
                  onClick={() => setLoginOpen(true)}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    '&:hover': { color: '#FFD700' },
                  }}
                >
                  <AdminPanelSettingsIcon />
                </IconButton>
              </Tooltip>
            )}

            {/* Mobile Menu */}
            <IconButton
              sx={{ display: { md: 'none' }, color: '#fff' }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: 'linear-gradient(180deg, #2d0000 0%, #1a0000 100%)',
            color: '#fff',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ bgcolor: 'rgba(255,200,100,0.2)', fontSize: '1.2rem' }}>🛕</Avatar>
          <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 700, fontSize: '1rem' }}>
            {i18n.language === 'hi' ? 'माँ कामाख्या' : 'Maa Kamakhya'}
          </Typography>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,215,0,0.2)' }} />
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton
                onClick={() => scrollTo(item.href)}
                sx={{
                  '&:hover': { bgcolor: 'rgba(255,215,0,0.1)' },
                }}
              >
                <ListItemText
                  primary={t(item.key)}
                  primaryTypographyProps={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ borderColor: 'rgba(255,215,0,0.2)' }} />
        <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
          <Button
            variant={i18n.language === 'en' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => toggleLanguage('en')}
            sx={{
              flex: 1,
              color: i18n.language === 'en' ? '#1a0000' : '#FFD700',
              bgcolor: i18n.language === 'en' ? '#FFD700' : 'transparent',
              borderColor: '#FFD700',
            }}
          >
            English
          </Button>
          <Button
            variant={i18n.language === 'hi' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => toggleLanguage('hi')}
            sx={{
              flex: 1,
              color: i18n.language === 'hi' ? '#1a0000' : '#FFD700',
              bgcolor: i18n.language === 'hi' ? '#FFD700' : 'transparent',
              borderColor: '#FFD700',
            }}
          >
            हिंदी
          </Button>
        </Box>
        {isAdmin && (
          <Box sx={{ px: 2, pb: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={() => { logout(); setDrawerOpen(false); }}
              sx={{ color: '#FFD700', borderColor: '#FFD700' }}
            >
              {t('nav.adminLogout')}
            </Button>
          </Box>
        )}
      </Drawer>

      <AdminLoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
