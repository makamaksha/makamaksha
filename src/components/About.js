import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const SIGNIFICANCE_ITEMS = [
  { icon: '🛕', key: 'about.significance1' },
  { icon: '🙏', key: 'about.significance2' },
  { icon: '🪔', key: 'about.significance3' },
  { icon: '❤️', key: 'about.significance4' },
  { icon: '🔱', key: 'about.significance5' },
  { icon: '🌸', key: 'about.significance6' },
];

export default function About() {
  const { t } = useTranslation();

  return (
    <Box
      id="about"
      sx={{ bgcolor: '#0a0000', py: { xs: 6, md: 10 }, scrollMarginTop: '64px' }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{ color: '#FFD700', letterSpacing: 4, display: 'block', mb: 1 }}
          >
            ॥ शक्तिपीठ ॥
          </Typography>
          <Typography
            variant="h3"
            sx={{ color: '#fff', fontWeight: 700, mb: 2, fontSize: { xs: '1.8rem', md: '2.5rem' } }}
          >
            {t('about.title')}
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,200,100,0.8)', fontWeight: 400 }}>
            {t('about.subtitle')}
          </Typography>
          <Divider sx={{ width: 60, borderColor: '#FFD700', borderWidth: 2, mx: 'auto', mt: 3 }} />
        </Box>

        <Grid container spacing={4}>
          {/* History */}
          <Grid item xs={12} md={7} sx={{ display: 'flex' }}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,215,0,0.15)',
                borderRadius: 3,
                height: '100%',
                width: '100%',
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Typography sx={{ fontSize: '2rem' }}>📜</Typography>
                  <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700 }}>
                    {t('about.historyTitle')}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, mb: 2 }}
                >
                  {t('about.historyDesc1')}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}
                >
                  {t('about.historyDesc2')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* About Mata Kamakhya Devi */}
          <Grid item xs={12} md={5} sx={{ display: 'flex' }}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,215,0,0.15)',
                borderRadius: 3,
                height: '100%',
                width: '100%',
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Typography sx={{ fontSize: '2rem' }}>🌸</Typography>
                  <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700 }}>
                    {t('about.architectureTitle')}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}
                >
                  {t('about.architectureDesc')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Saturday Kirtan & Divine Prasad */}
          <Grid item xs={12}>
            <Card
              sx={{
                bgcolor: 'rgba(139,26,26,0.15)',
                border: '1px solid rgba(255,215,0,0.35)',
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Typography sx={{ fontSize: '2rem' }}>🪔</Typography>
                  <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700 }}>
                    {t('about.kirtanTitle')}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.9, fontSize: { xs: '0.95rem', md: '1rem' } }}
                >
                  {t('about.kirtanDesc')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Significance */}
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700 }}>
                🔱 {t('about.significanceTitle')}
              </Typography>
              <Divider sx={{ width: 50, borderColor: '#FFD700', borderWidth: 2, mx: 'auto', mt: 1.5 }} />
            </Box>
            <Grid container spacing={3}>
              {SIGNIFICANCE_ITEMS.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.key} sx={{ display: 'flex' }}>
                  <Card
                    sx={{
                      bgcolor: 'rgba(139,26,26,0.12)',
                      border: '1px solid rgba(255,215,0,0.2)',
                      borderRadius: 3,
                      width: '100%',
                      textAlign: 'center',
                      transition: 'all 0.3s',
                      '&:hover': {
                        border: '1px solid rgba(255,215,0,0.5)',
                        bgcolor: 'rgba(139,26,26,0.25)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(255,215,0,0.08)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                      <Typography sx={{ fontSize: '2.8rem', lineHeight: 1 }}>{item.icon}</Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontWeight: 500 }}
                      >
                        {t(item.key)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
