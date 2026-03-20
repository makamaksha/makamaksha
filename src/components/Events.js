import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function isUpcoming(dateStr) {
  return new Date(dateStr) >= new Date();
}

export default function Events() {
  const { t, i18n } = useTranslation();
  const { isAdmin } = useAuth();
  const { events, deleteEvent } = useContent();
  const [tab, setTab] = useState(0);
  const isHindi = i18n.language === 'hi';

  const filtered = events.filter((e) => {
    if (tab === 0) return true;
    if (tab === 1) return isUpcoming(e.endDate || e.date);
    return !isUpcoming(e.endDate || e.date);
  });

  const scrollToAdmin = () => {
    const el = document.querySelector('#admin');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      id="events"
      sx={{ bgcolor: '#0d0000', py: { xs: 6, md: 10 }, scrollMarginTop: '64px' }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: '#FFD700', letterSpacing: 4, display: 'block', mb: 1 }}
          >
            ॥ उत्सव ॥
          </Typography>
          <Typography
            variant="h3"
            sx={{ color: '#fff', fontWeight: 700, mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}
          >
            {t('events.title')}
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,200,100,0.8)', fontWeight: 400 }}>
            {t('events.subtitle')}
          </Typography>
          <Divider sx={{ width: 60, borderColor: '#FFD700', borderWidth: 2, mx: 'auto', mt: 3 }} />
        </Box>

        {/* Filter Tabs + Add Button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{
              bgcolor: 'rgba(255,255,255,0.05)',
              borderRadius: 3,
              p: 0.5,
              '& .MuiTabs-indicator': { display: 'none' },
            }}
          >
            {[t('events.all'), t('events.upcoming'), t('events.past')].map((label, i) => (
              <Tab
                key={i}
                label={label}
                sx={{
                  color: 'rgba(255,255,255,0.6)',
                  borderRadius: 2,
                  minHeight: 38,
                  px: 2,
                  fontSize: '0.85rem',
                  '&.Mui-selected': {
                    color: '#1a0000',
                    bgcolor: '#FFD700',
                    fontWeight: 700,
                  },
                }}
              />
            ))}
          </Tabs>

          {isAdmin && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={scrollToAdmin}
              sx={{
                bgcolor: '#8B1A1A',
                color: '#FFD700',
                fontWeight: 700,
                '&:hover': { bgcolor: '#a52828' },
              }}
            >
              {t('events.addEvent')}
            </Button>
          )}
        </Box>

        {/* Events List */}
        {filtered.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '3rem', mb: 2 }}>🗓️</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>{t('events.noEvents')}</Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filtered.map((event) => {
              const upcoming = isUpcoming(event.endDate || event.date);
              return (
                <Grid item xs={12} key={event.id}>
                  <Card
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.04)',
                      border: `1px solid ${upcoming ? 'rgba(255,215,0,0.25)' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: 3,
                      transition: 'all 0.3s',
                      '&:hover': {
                        border: `1px solid ${upcoming ? 'rgba(255,215,0,0.5)' : 'rgba(255,255,255,0.2)'}`,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'flex-start' }}>
                        <Chip
                          label={upcoming ? t('events.upcoming') : t('events.past')}
                          size="small"
                          sx={{
                            bgcolor: upcoming ? 'rgba(76,175,80,0.2)' : 'rgba(158,158,158,0.2)',
                            color: upcoming ? '#81c784' : '#bdbdbd',
                            border: `1px solid ${upcoming ? 'rgba(76,175,80,0.4)' : 'rgba(158,158,158,0.3)'}`,
                            fontSize: '0.7rem',
                          }}
                        />
                        {isAdmin && (
                          <Button
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => deleteEvent(event.id)}
                            sx={{ color: 'rgba(255,100,100,0.6)', minWidth: 'auto', p: 0.5 }}
                          >
                          </Button>
                        )}
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{ color: '#FFD700', fontWeight: 700, mb: 1.5, lineHeight: 1.3 }}
                      >
                        {isHindi && event.titleHi ? event.titleHi : event.title}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CalendarMonthIcon sx={{ color: 'rgba(255,215,0,0.6)', fontSize: '1rem' }} />
                        <Typography variant="caption" sx={{ color: 'rgba(255,220,150,0.8)' }}>
                          {formatDate(event.date)}
                          {event.endDate && event.endDate !== event.date &&
                            ` – ${formatDate(event.endDate)}`}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <LocationOnIcon sx={{ color: 'rgba(255,215,0,0.6)', fontSize: '1rem' }} />
                        <Typography variant="caption" sx={{ color: 'rgba(255,220,150,0.8)' }}>
                          {isHindi && event.locationHi ? event.locationHi : event.location}
                        </Typography>
                      </Box>

                      <Divider sx={{ borderColor: 'rgba(255,215,0,0.1)', mb: 2 }} />

                      <Typography
                        variant="body2"
                        sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, flex: 1 }}
                      >
                        {isHindi && event.descriptionHi ? event.descriptionHi : event.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
