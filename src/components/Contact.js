import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Divider,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import DirectionsIcon from '@mui/icons-material/Directions';
import FlightIcon from '@mui/icons-material/Flight';
import SubwayIcon from '@mui/icons-material/Subway';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { useTranslation } from 'react-i18next';

const TRAVEL = [
  { icon: <FlightIcon sx={{ color: '#FFD700', fontSize: '1.1rem' }} />, key: 'about.byAir' },
  { icon: <SubwayIcon sx={{ color: '#FFD700', fontSize: '1.1rem' }} />, key: 'about.byTrain' },
  { icon: <DirectionsBusIcon sx={{ color: '#FFD700', fontSize: '1.1rem' }} />, key: 'about.byRoad' },
];

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${form.name} — Maa Kamakhya Mandir Website`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.open(
      `mailto:mokshdaynimakamakshadham@gmail.com?subject=${subject}&body=${body}`,
      '_blank'
    );
    setSuccess(true);
    setForm({ name: '', email: '', message: '' });
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      color: '#fff',
      '& fieldset': { borderColor: 'rgba(255,215,0,0.3)' },
      '&:hover fieldset': { borderColor: 'rgba(255,215,0,0.6)' },
      '&.Mui-focused fieldset': { borderColor: '#FFD700' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#FFD700' },
  };

  const INFO = [
    {
      icon: <LocationOnIcon sx={{ color: '#FFD700' }} />,
      label: t('contact.address'),
      value: t('contact.addressValue'),
      href: null,
    },
    {
      icon: <PhoneIcon sx={{ color: '#FFD700' }} />,
      label: t('contact.phone'),
      value: t('contact.phoneValue'),
      href: 'tel:+919313715551',
    },
    {
      icon: <EmailIcon sx={{ color: '#FFD700' }} />,
      label: t('contact.email'),
      value: t('contact.emailValue'),
      href: 'mailto:mokshdaynimakamakshadham@gmail.com',
    },
    {
      icon: <AccessTimeIcon sx={{ color: '#FFD700' }} />,
      label: t('contact.timings'),
      value: t('contact.timingsValue'),
      href: null,
    },
  ];

  return (
    <Box
      id="contact"
      sx={{ bgcolor: '#0a0000', py: { xs: 6, md: 10 }, scrollMarginTop: '64px' }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: '#FFD700', letterSpacing: 4, display: 'block', mb: 1 }}
          >
            ॥ संपर्क ॥
          </Typography>
          <Typography
            variant="h3"
            sx={{ color: '#fff', fontWeight: 700, mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}
          >
            {t('contact.title')}
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,200,100,0.8)', fontWeight: 400 }}>
            {t('contact.subtitle')}
          </Typography>
          <Divider sx={{ width: 60, borderColor: '#FFD700', borderWidth: 2, mx: 'auto', mt: 3 }} />
        </Box>

        {/* 2-Column Layout using Flexbox for guaranteed side-by-side */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 4,
            alignItems: 'stretch',
          }}
        >
          {/* LEFT — Location, Address, How to Reach, Map */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,215,0,0.15)',
                borderRadius: 3,
                height: '100%',
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700, mb: 3 }}>
                  🛕 Maa Kamakhya Mandir
                </Typography>

                {/* Contact Info */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 3 }}>
                  {INFO.map((item) => (
                    <Box key={item.label} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box
                        sx={{
                          bgcolor: 'rgba(255,215,0,0.1)',
                          borderRadius: '50%',
                          p: 1,
                          display: 'flex',
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: 'rgba(255,215,0,0.7)', display: 'block', mb: 0.3, textTransform: 'uppercase', letterSpacing: 1 }}
                        >
                          {item.label}
                        </Typography>
                        {item.href ? (
                          <Typography
                            component="a"
                            href={item.href}
                            variant="body2"
                            sx={{
                              color: 'rgba(255,255,255,0.85)',
                              lineHeight: 1.6,
                              textDecoration: 'none',
                              wordBreak: 'break-all',
                              '&:hover': { color: '#FFD700' },
                            }}
                          >
                            {item.value}
                          </Typography>
                        ) : (
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
                            {item.value}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,215,0,0.1)', mb: 2.5 }} />

                {/* How to Reach */}
                <Typography variant="subtitle2" sx={{ color: '#FFD700', fontWeight: 700, mb: 1.5, letterSpacing: 1, textTransform: 'uppercase' }}>
                  📍 {t('about.locationTitle')}
                </Typography>
                <List dense disablePadding sx={{ mb: 3 }}>
                  {TRAVEL.map((item) => (
                    <ListItem key={item.key} disableGutters sx={{ py: 0.7 }}>
                      <ListItemIcon sx={{ minWidth: 34 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={t(item.key)}
                        primaryTypographyProps={{
                          color: 'rgba(255,255,255,0.75)',
                          fontSize: '0.88rem',
                          lineHeight: 1.5,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                {/* Google Maps */}
                <Box sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(255,215,0,0.2)', mb: 2 }}>
                  <iframe
                    title="Maa Kamakhya Mandir Location"
                    src="https://maps.google.com/maps?q=JG-1+62B+Vikaspuri+New+Delhi+110018&output=embed"
                    width="100%"
                    height="200"
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
                    color: '#FFD700',
                    borderColor: 'rgba(255,215,0,0.5)',
                    fontWeight: 600,
                    py: 1.2,
                    '&:hover': { bgcolor: 'rgba(255,215,0,0.08)', borderColor: '#FFD700' },
                  }}
                >
                  Get Directions on Google Maps
                </Button>
              </CardContent>
            </Card>
          </Box>

          {/* RIGHT — Send Message Form */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,215,0,0.15)',
                borderRadius: 3,
                height: '100%',
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700, mb: 3 }}>
                  {t('contact.formTitle')}
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    fullWidth
                    label={t('contact.name')}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    sx={inputSx}
                  />
                  <TextField
                    fullWidth
                    label={t('contact.emailField')}
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    sx={inputSx}
                  />
                  <TextField
                    fullWidth
                    label={t('contact.message')}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    multiline
                    rows={8}
                    sx={inputSx}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    endIcon={<SendIcon />}
                    sx={{
                      bgcolor: '#8B1A1A',
                      color: '#FFD700',
                      fontWeight: 700,
                      py: 1.5,
                      fontSize: '1rem',
                      '&:hover': { bgcolor: '#a52828' },
                    }}
                  >
                    {t('contact.send')}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ bgcolor: 'rgba(76,175,80,0.2)', color: '#81c784', border: '1px solid rgba(76,175,80,0.4)' }}
        >
          {t('contact.sendSuccess')}
        </Alert>
      </Snackbar>
    </Box>
  );
}
