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
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';

const INFO_ITEMS = [
  { icon: <LocationOnIcon />, labelKey: 'contact.address', valueKey: 'contact.addressValue' },
  { icon: <PhoneIcon />, labelKey: 'contact.phone', valueKey: 'contact.phoneValue' },
  { icon: <EmailIcon />, labelKey: 'contact.email', valueKey: 'contact.emailValue' },
  { icon: <AccessTimeIcon />, labelKey: 'contact.timings', valueKey: 'contact.timingsValue' },
];

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
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

  return (
    <Box
      id="contact"
      sx={{ bgcolor: '#0a0000', py: { xs: 6, md: 10 }, scrollMarginTop: '64px' }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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

        <Grid container spacing={4}>
          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {INFO_ITEMS.map((item) => (
                <Card
                  key={item.labelKey}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,215,0,0.15)',
                    borderRadius: 2,
                    transition: 'all 0.3s',
                    '&:hover': {
                      border: '1px solid rgba(255,215,0,0.4)',
                      bgcolor: 'rgba(255,215,0,0.05)',
                    },
                  }}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, py: 2, '&:last-child': { pb: 2 } }}>
                    <Box
                      sx={{
                        color: '#FFD700',
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
                      <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.7)', display: 'block', mb: 0.3 }}>
                        {t(item.labelKey)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
                        {t(item.valueKey)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                bgcolor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,215,0,0.15)',
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700, mb: 3 }}>
                  {t('contact.formTitle')}
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={t('contact.name')}
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        sx={inputSx}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label={t('contact.message')}
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        multiline
                        rows={5}
                        sx={inputSx}
                      />
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
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
