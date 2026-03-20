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
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Typography sx={{ fontSize: '2rem' }}>🛕</Typography>
              <Box>
                <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 700 }}>
                  Maa Kamakhya Mandir
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,200,100,0.7)' }}>
                  माँ कामाख्या मंदिर
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, mb: 2 }}>
              One of India's most sacred Shakti Peethas, nestled atop Nilachal Hill in Guwahati, Assam. A beacon of divine energy and spiritual awakening.
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: 'rgba(255,215,0,0.6)', fontStyle: 'italic', fontWeight: 400 }}
            >
              {t('footer.tagline')}
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" sx={{ color: '#FFD700', fontWeight: 700, mb: 2 }}>
              {t('footer.quickLinks')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.key}
                  component="button"
                  onClick={() => scrollTo(link.href)}
                  underline="none"
                  sx={{
                    color: 'rgba(255,255,255,0.55)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    fontSize: '0.9rem',
                    '&:hover': { color: '#FFD700' },
                  }}
                >
                  › {t(link.key)}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Info */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ color: '#FFD700', fontWeight: 700, mb: 2 }}>
              Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Darshan Timings', 'Festivals', 'Directions', 'Donations'].map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}
                >
                  › {item}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Social */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ color: '#FFD700', fontWeight: 700, mb: 2 }}>
              {t('footer.followUs')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              {SOCIAL.map((s) => (
                <Tooltip key={s.label} title={s.label}>
                  <IconButton
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'rgba(255,255,255,0.5)',
                      bgcolor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      '&:hover': {
                        color: '#FFD700',
                        bgcolor: 'rgba(255,215,0,0.1)',
                        border: '1px solid rgba(255,215,0,0.4)',
                      },
                    }}
                  >
                    {s.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>

            {/* Temple Hours */}
            <Box
              sx={{
                bgcolor: 'rgba(255,215,0,0.05)',
                border: '1px solid rgba(255,215,0,0.15)',
                borderRadius: 2,
                p: 1.5,
              }}
            >
              <Typography variant="caption" sx={{ color: '#FFD700', display: 'block', fontWeight: 600, mb: 0.5 }}>
                ⏰ Temple Hours
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                5:30 AM – 10:00 PM (All Days)
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,215,0,0.1)', mb: 3 }} />

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
