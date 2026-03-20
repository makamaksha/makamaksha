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
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlightIcon from '@mui/icons-material/Flight';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocationOnIcon from '@mui/icons-material/LocationOn';
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
  { icon: <TrainIcon />, key: 'about.byTrain' },
  { icon: <DirectionsBusIcon />, key: 'about.byRoad' },
];

const MAHAVIDYAS = [
  'Kali', 'Tara', 'Sodashi', 'Bhuvaneshwari', 'Bhairavi',
  'Chhinnamasta', 'Dhumavati', 'Bagalamukhi', 'Matangi', 'Kamala',
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
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,215,0,0.15)',
                borderRadius: 3,
                height: '100%',
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

          {/* Architecture */}
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,215,0,0.15)',
                borderRadius: 3,
                height: '100%',
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Typography sx={{ fontSize: '2rem' }}>🛕</Typography>
                  <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700 }}>
                    {t('about.architectureTitle')}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, mb: 3 }}
                >
                  {t('about.architectureDesc')}
                </Typography>

                <Typography variant="subtitle2" sx={{ color: '#FFD700', mb: 1.5 }}>
                  10 Mahavidya Temples:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                  {MAHAVIDYAS.map((m) => (
                    <Chip
                      key={m}
                      label={m}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(139,26,26,0.4)',
                        color: 'rgba(255,220,150,0.9)',
                        border: '1px solid rgba(255,215,0,0.2)',
                        fontSize: '0.7rem',
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Significance */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,215,0,0.15)',
                borderRadius: 3,
                height: '100%',
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
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,215,0,0.15)',
                borderRadius: 3,
                height: '100%',
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

                {/* Google Maps Embed */}
                <Box sx={{ mt: 3, borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(255,215,0,0.2)' }}>
                  <iframe
                    title="Kamakhya Temple Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.735482025093!2d91.63879387540266!3d26.166200677096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5a1b3c7b4b35%3A0x56e7e53dc1e08f8f!2sKamakhya%20Temple!5e0!3m2!1sen!2sin!4v1698761234567!5m2!1sen!2sin"
                    width="100%"
                    height="200"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
