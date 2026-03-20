import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { useTranslation } from 'react-i18next';

const HIGHLIGHTS = [
  { iconKey: '🪔', titleKey: 'home.h1Title', descKey: 'home.h1Desc' },
  { iconKey: '🕉️', titleKey: 'home.h2Title', descKey: 'home.h2Desc' },
  { iconKey: '⏰', titleKey: 'home.h4Title', descKey: 'home.h4Desc' },
  { iconKey: '🌸', titleKey: 'home.h5Title', descKey: 'home.h5Desc' },
];

const STATS = [
  { valueKey: 'home.stat1', labelKey: 'home.stat1Label', icon: <TempleHinduIcon />, value: '8th C.' },
  { valueKey: 'home.stat2', labelKey: 'home.stat2Label', icon: <StarIcon />, value: '51st' },
  { valueKey: 'home.stat3', labelKey: 'home.stat3Label', icon: <PeopleIcon />, value: '2M+' },
  { valueKey: 'home.stat4', labelKey: 'home.stat4Label', icon: <CelebrationIcon />, value: '12+' },
];

export default function Home({ themeColor }) {
  const { t } = useTranslation();

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box id="home">
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(160deg, rgba(26,0,0,0.92) 0%, rgba(74,14,14,0.85) 50%, rgba(26,0,0,0.95) 100%),
            url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Kamakhya_Temple_6.jpg/1280px-Kamakhya_Temple_6.jpg') center/cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'radial-gradient(ellipse at center top, rgba(139,26,26,0.3) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255,200,100,0.8)',
            letterSpacing: 4,
            textTransform: 'uppercase',
            mb: 2,
            fontSize: '0.75rem',
          }}
        >
          ॥ शक्तिपीठ ॥ Shakti Peetha ॥
        </Typography>

        <Typography
          variant="h1"
          sx={{
            color: '#FFD700',
            fontWeight: 800,
            fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' },
            textShadow: '0 0 40px rgba(255,215,0,0.4)',
            mb: 1,
            lineHeight: 1.1,
          }}
        >
          {t('home.heroTitle')}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: 'rgba(255,220,180,0.9)',
            fontWeight: 400,
            mb: 2,
            fontSize: { xs: '1rem', sm: '1.3rem' },
          }}
        >
          {t('home.heroSubtitle')}
        </Typography>

        <Divider
          sx={{
            width: 80,
            borderColor: '#FFD700',
            borderWidth: 2,
            mb: 3,
            mx: 'auto',
          }}
        />

        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255,220,160,0.75)',
            fontStyle: 'italic',
            mb: 5,
            fontSize: { xs: '0.95rem', sm: '1.1rem' },
          }}
        >
          {t('home.heroTagline')}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => scrollTo('#contact')}
            sx={{
              bgcolor: '#FFD700',
              color: '#1a0000',
              fontWeight: 700,
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontSize: '1rem',
              '&:hover': { bgcolor: '#FFC300', transform: 'translateY(-2px)' },
              transition: 'all 0.2s',
            }}
          >
            {t('home.visitBtn')}
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => scrollTo('#about')}
            sx={{
              color: '#FFD700',
              borderColor: '#FFD700',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontSize: '1rem',
              '&:hover': {
                bgcolor: 'rgba(255,215,0,0.1)',
                borderColor: '#FFD700',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s',
            }}
          >
            {t('home.learnMoreBtn')}
          </Button>
        </Box>

        {/* Scroll indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
              '50%': { transform: 'translateX(-50%) translateY(-10px)' },
            },
          }}
        >
          <Typography sx={{ color: 'rgba(255,215,0,0.5)', fontSize: '1.5rem' }}>▼</Typography>
        </Box>
      </Box>

      {/* Stats Bar */}
      <Box sx={{ bgcolor: themeColor, py: 3 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            {STATS.map((stat, i) => (
              <Grid item xs={6} sm={3} key={i} sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h4"
                  sx={{ color: '#FFD700', fontWeight: 800, fontSize: { xs: '1.5rem', md: '2rem' } }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                  {t(stat.labelKey)}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Welcome Section */}
      <Box sx={{ bgcolor: '#0d0000', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography
            variant="overline"
            sx={{ color: '#FFD700', letterSpacing: 4, mb: 1, display: 'block' }}
          >
            ॥ जय माँ कामाख्या ॥
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: '#fff',
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
            }}
          >
            {t('home.welcomeTitle')}
          </Typography>
          <Divider sx={{ width: 60, borderColor: '#FFD700', borderWidth: 2, mx: 'auto', mb: 3 }} />
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.9,
              fontSize: { xs: '1rem', md: '1.1rem' },
            }}
          >
            {t('home.welcomeDesc')}
          </Typography>
        </Container>
      </Box>

      {/* Highlights Section */}
      <Box sx={{ bgcolor: '#110000', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              sx={{ color: '#fff', fontWeight: 700, mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}
            >
              {t('home.highlights')}
            </Typography>
            <Divider sx={{ width: 60, borderColor: '#FFD700', borderWidth: 2, mx: 'auto' }} />
          </Box>
          <Grid container spacing={3}>
            {HIGHLIGHTS.map((item, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Card
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,215,0,0.15)',
                    borderRadius: 3,
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      border: '1px solid rgba(255,215,0,0.4)',
                      bgcolor: 'rgba(255,215,0,0.06)',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography sx={{ fontSize: '2.5rem', mb: 1.5 }}>{item.iconKey}</Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: '#FFD700', fontWeight: 700, mb: 1 }}
                    >
                      {t(item.titleKey)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                      {t(item.descKey)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
