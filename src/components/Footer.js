import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Divider,
  Link,
  IconButton,
  Tooltip,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useTranslation } from 'react-i18next';

const NAV_LINKS = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.gallery', href: '#gallery' },
  { key: 'nav.events', href: '#events' },
  { key: 'nav.contact', href: '#contact' },
];

const SOCIAL = [
  { icon: <FacebookIcon />, label: 'Facebook', href: 'https://facebook.com' },
  { icon: <YouTubeIcon />, label: 'YouTube', href: 'https://youtube.com' },
  { icon: <InstagramIcon />, label: 'Instagram', href: 'https://instagram.com' },
  { icon: <TwitterIcon />, label: 'Twitter', href: 'https://twitter.com' },
];

export default function Footer({ themeColor }) {
  const { t } = useTranslation();

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(135deg, #0d0000 0%, #1a0a0a 100%)`,
        borderTop: '1px solid rgba(255,215,0,0.15)',
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        {/* Top: logo + tagline centred */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography sx={{ fontSize: '2.8rem', lineHeight: 1, mb: 1.5 }}>🛕</Typography>
          <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 800, letterSpacing: 1, mb: 0.5 }}>
            Maa Kamakhya Mandir
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,200,100,0.6)', letterSpacing: 2, mb: 2 }}>
            माँ कामाख्या मंदिर · Vikaspuri, New Delhi
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,215,0,0.55)', fontStyle: 'italic', fontWeight: 400 }}>
            {t('footer.tagline')}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,215,0,0.1)', mb: 5 }} />

        <Grid container spacing={4} justifyContent="center" sx={{ mb: 5 }}>
          {/* Quick Links */}
          <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography
              variant="overline"
              sx={{ color: '#FFD700', letterSpacing: 3, fontWeight: 700, display: 'block', mb: 2 }}
            >
              {t('footer.quickLinks')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.key}
                  component="button"
                  onClick={() => scrollTo(link.href)}
                  underline="none"
                  sx={{
                    color: 'rgba(255,255,255,0.5)',
                    textAlign: { xs: 'center', sm: 'left' },
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '0.9rem',
                    '&:hover': { color: '#FFD700', paddingLeft: '6px' },
                  }}
                >
                  › {t(link.key)}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Vertical divider on desktop */}
          <Grid item sm={1} sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
            <Divider orientation="vertical" sx={{ borderColor: 'rgba(255,215,0,0.1)', height: '100%' }} />
          </Grid>

          {/* Follow Us */}
          <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography
              variant="overline"
              sx={{ color: '#FFD700', letterSpacing: 3, fontWeight: 700, display: 'block', mb: 2 }}
            >
              {t('footer.followUs')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
              {SOCIAL.map((s) => (
                <Tooltip key={s.label} title={s.label}>
                  <IconButton
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'rgba(255,255,255,0.45)',
                      bgcolor: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      transition: 'all 0.25s',
                      '&:hover': {
                        color: '#FFD700',
                        bgcolor: 'rgba(255,215,0,0.1)',
                        border: '1px solid rgba(255,215,0,0.4)',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 4px 12px rgba(255,215,0,0.15)',
                      },
                    }}
                  >
                    {s.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.25)', display: 'block', mt: 2 }}>
              📞 +91 93137 15551
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.25)', display: 'block', mt: 0.5 }}>
              ✉️ mokshdaynimakamakshadham@gmail.com
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,215,0,0.08)', mb: 3 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.35)' }}>
            {t('footer.rights')}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.3)', display: 'block', mt: 0.5 }}>
            Built with ❤️ for devotees worldwide
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
