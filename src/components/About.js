import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DirectionsIcon from '@mui/icons-material/Directions';
import SubwayIcon from '@mui/icons-material/Subway';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlightIcon from '@mui/icons-material/Flight';
import { useTranslation } from 'react-i18next';

const SIGNIFICANCE = [
  'about.significance1',
  'about.significance2',
  'about.significance3',
  'about.significance4',
  'about.significance5',
];

const TRAVEL = [
  { icon: <FlightIcon />, key: 'about.byAir' },
  { icon: <SubwayIcon />, key: 'about.byTrain' },
  { icon: <DirectionsBusIcon />, key: 'about.byRoad' },
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
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
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
                  <Typography sx={{ fontSize: '2rem' }}>🔱</Typography>
                  <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700 }}>
                    {t('about.significanceTitle')}
                  </Typography>
                </Box>
                <List dense disablePadding>
                  {SIGNIFICANCE.map((key) => (
                    <ListItem key={key} disableGutters sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon sx={{ color: '#FFD700', fontSize: '1.1rem' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={t(key)}
                        primaryTypographyProps={{
                          color: 'rgba(255,255,255,0.8)',
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Location */}
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
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
                  <Typography sx={{ fontSize: '2rem' }}>📍</Typography>
                  <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700 }}>
                    {t('about.locationTitle')}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                    mb: 3,
                    p: 2,
                    bgcolor: 'rgba(255,215,0,0.05)',
                    borderRadius: 2,
                    border: '1px solid rgba(255,215,0,0.1)',
                  }}
                >
                  <LocationOnIcon sx={{ color: '#FFD700', mt: 0.3, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
                    {t('about.locationDesc')}
                  </Typography>
                </Box>

                <List dense disablePadding>
                  {TRAVEL.map((item) => (
                    <ListItem key={item.key} disableGutters sx={{ py: 0.8 }}>
                      <ListItemIcon sx={{ minWidth: 36, color: '#FFD700' }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={t(item.key)}
                        primaryTypographyProps={{
                          color: 'rgba(255,255,255,0.75)',
                          fontSize: '0.9rem',
                          lineHeight: 1.5,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                {/* Google Maps Embed — Vikaspuri, New Delhi */}
                <Box sx={{ mt: 3, borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(255,215,0,0.2)' }}>
                  <iframe
                    title="Maa Kamakhya Mandir, Vikaspuri New Delhi"
                    src="https://maps.google.com/maps?q=JG-1+62B+Vikaspuri+New+Delhi+110018&output=embed"
                    width="100%"
                    height="220"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </Box>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<DirectionsIcon />}
                  href="https://www.google.com/maps/dir/?api=1&destination=JG-1+62B+Vikaspuri+New+Delhi+110018"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    mt: 2,
                    color: '#FFD700',
                    borderColor: 'rgba(255,215,0,0.5)',
                    fontWeight: 600,
                    '&:hover': { bgcolor: 'rgba(255,215,0,0.08)', borderColor: '#FFD700' },
                  }}
                >
                  {t('about.getDirections')}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
