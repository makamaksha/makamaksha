import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Divider,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  Chip,
  InputAdornment,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import EventIcon from '@mui/icons-material/Event';
import LinkIcon from '@mui/icons-material/Link';
import { useTranslation } from 'react-i18next';
import { useContent } from '../context/ContentContext';

const THEME_COLORS = [
  { label: 'Deep Red', value: '#8B1A1A' },
  { label: 'Maroon', value: '#800000' },
  { label: 'Dark Purple', value: '#4A0E4E' },
  { label: 'Deep Blue', value: '#0D2137' },
  { label: 'Forest Green', value: '#1B4332' },
  { label: 'Deep Orange', value: '#7C2D12' },
];

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ pt: 3 }}>{children}</Box> : null;
}

export default function AdminPanel({ themeColor, onThemeChange }) {
  const { t } = useTranslation();
  const { addPhoto, addVideo, addEvent } = useContent();
  const [tab, setTab] = useState(0);
  const [snack, setSnack] = useState('');

  // Photo upload state
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoCaptionHi, setPhotoCaptionHi] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const photoInputRef = useRef();

  // Video state
  const [videoCaption, setVideoCaption] = useState('');
  const [videoCaptionHi, setVideoCaptionHi] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoType, setVideoType] = useState('youtube');

  // Event state
  const [eventTitle, setEventTitle] = useState('');
  const [eventTitleHi, setEventTitleHi] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventLocationHi, setEventLocationHi] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventDescHi, setEventDescHi] = useState('');

  const handlePhotoFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoPreview(ev.target.result);
      setPhotoUrl(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddPhoto = () => {
    if (!photoUrl && !photoPreview) return;
    addPhoto({
      url: photoUrl || photoPreview,
      caption: photoCaption || 'Temple Photo',
      captionHi: photoCaptionHi || photoCaption || 'मंदिर फ़ोटो',
    });
    setPhotoCaption('');
    setPhotoCaptionHi('');
    setPhotoPreview('');
    setPhotoUrl('');
    if (photoInputRef.current) photoInputRef.current.value = '';
    setSnack(t('admin.uploadSuccess'));
  };

  const getYoutubeEmbedUrl = (url) => {
    const patterns = [
      /youtube\.com\/watch\?v=([^&]+)/,
      /youtu\.be\/([^?]+)/,
      /youtube\.com\/embed\/([^?]+)/,
    ];
    for (const p of patterns) {
      const m = url.match(p);
      if (m) return `https://www.youtube.com/embed/${m[1]}`;
    }
    return url;
  };

  const handleAddVideo = () => {
    if (!videoUrl) return;
    const embedUrl = videoType === 'youtube' ? getYoutubeEmbedUrl(videoUrl) : videoUrl;
    addVideo({
      url: embedUrl,
      caption: videoCaption || 'Temple Video',
      captionHi: videoCaptionHi || videoCaption || 'मंदिर वीडियो',
      type: videoType,
    });
    setVideoCaption('');
    setVideoCaptionHi('');
    setVideoUrl('');
    setSnack(t('admin.uploadSuccess'));
  };

  const handleAddEvent = () => {
    if (!eventTitle || !eventDate) return;
    addEvent({
      title: eventTitle,
      titleHi: eventTitleHi || eventTitle,
      date: eventDate,
      endDate: eventEndDate || eventDate,
      location: eventLocation || 'Kamakhya Temple',
      locationHi: eventLocationHi || eventLocation || 'कामाख्या मंदिर',
      description: eventDesc,
      descriptionHi: eventDescHi || eventDesc,
    });
    setEventTitle('');
    setEventTitleHi('');
    setEventDate('');
    setEventEndDate('');
    setEventLocation('');
    setEventLocationHi('');
    setEventDesc('');
    setEventDescHi('');
    setSnack(t('admin.eventAdded'));
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
    '& .MuiInputBase-input[type="date"]': { colorScheme: 'dark' },
  };

  return (
    <Box
      id="admin"
      sx={{
        bgcolor: '#05000a',
        py: { xs: 6, md: 10 },
        scrollMarginTop: '64px',
        borderTop: '2px solid rgba(255,215,0,0.2)',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            label="ADMIN ONLY"
            sx={{
              bgcolor: 'rgba(139,26,26,0.4)',
              color: '#FFD700',
              border: '1px solid rgba(255,215,0,0.4)',
              mb: 2,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          />
          <Typography
            variant="h3"
            sx={{ color: '#FFD700', fontWeight: 700, mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}
          >
            {t('admin.title')}
          </Typography>
          <Divider sx={{ width: 60, borderColor: '#FFD700', borderWidth: 2, mx: 'auto', mt: 2 }} />
        </Box>

        {/* Tabs */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              bgcolor: 'rgba(255,255,255,0.05)',
              borderRadius: 3,
              p: 0.5,
              '& .MuiTabs-indicator': { display: 'none' },
            }}
          >
            {[
              { label: t('admin.uploadPhoto'), icon: '📷' },
              { label: t('admin.uploadVideo'), icon: '🎬' },
              { label: t('admin.addEvent'), icon: '🗓️' },
              { label: t('admin.themeColor'), icon: '🎨' },
            ].map((item, i) => (
              <Tab
                key={i}
                label={`${item.icon} ${item.label}`}
                sx={{
                  color: 'rgba(255,255,255,0.6)',
                  borderRadius: 2,
                  minHeight: 42,
                  px: 2,
                  fontSize: '0.82rem',
                  '&.Mui-selected': {
                    color: '#1a0000',
                    bgcolor: '#FFD700',
                    fontWeight: 700,
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Upload Photo */}
        <TabPanel value={tab} index={0}>
          <Card
            sx={{
              bgcolor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,215,0,0.2)',
              borderRadius: 3,
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700, mb: 3 }}>
                📷 {t('admin.uploadPhoto')}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {/* File Upload Area */}
                  <Box
                    onClick={() => photoInputRef.current?.click()}
                    sx={{
                      border: '2px dashed rgba(255,215,0,0.4)',
                      borderRadius: 2,
                      p: 3,
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': { border: '2px dashed rgba(255,215,0,0.8)', bgcolor: 'rgba(255,215,0,0.05)' },
                    }}
                  >
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="preview"
                        style={{ maxHeight: 160, maxWidth: '100%', borderRadius: 8 }}
                      />
                    ) : (
                      <>
                        <CloudUploadIcon sx={{ color: 'rgba(255,215,0,0.5)', fontSize: 48, mb: 1 }} />
                        <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>
                          Click to upload photo
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                          JPG, PNG, WEBP supported
                        </Typography>
                      </>
                    )}
                  </Box>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handlePhotoFile}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.6)', display: 'block', mb: 1 }}>
                    — OR paste an image URL —
                  </Typography>
                  <TextField
                    fullWidth
                    label="Image URL"
                    value={photoUrl}
                    onChange={(e) => { setPhotoUrl(e.target.value); setPhotoPreview(e.target.value); }}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LinkIcon sx={{ color: 'rgba(255,215,0,0.5)', fontSize: '1rem' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={inputSx}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Caption (English)"
                    value={photoCaption}
                    onChange={(e) => setPhotoCaption(e.target.value)}
                    size="small"
                    sx={inputSx}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="कैप्शन (हिंदी)"
                    value={photoCaptionHi}
                    onChange={(e) => setPhotoCaptionHi(e.target.value)}
                    size="small"
                    sx={inputSx}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={handleAddPhoto}
                    disabled={!photoUrl && !photoPreview}
                    sx={{
                      bgcolor: '#8B1A1A',
                      color: '#FFD700',
                      fontWeight: 700,
                      py: 1.3,
                      '&:hover': { bgcolor: '#a52828' },
                      '&.Mui-disabled': { bgcolor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' },
                    }}
                  >
                    {t('admin.uploadPhoto')}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Upload Video */}
        <TabPanel value={tab} index={1}>
          <Card
            sx={{
              bgcolor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,215,0,0.2)',
              borderRadius: 3,
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700, mb: 3 }}>
                🎬 {t('admin.uploadVideo')}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    {['youtube', 'file'].map((type) => (
                      <Chip
                        key={type}
                        label={type === 'youtube' ? '▶ YouTube URL' : '📁 File URL'}
                        onClick={() => setVideoType(type)}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: videoType === type ? 'rgba(255,215,0,0.2)' : 'transparent',
                          color: videoType === type ? '#FFD700' : 'rgba(255,255,255,0.5)',
                          border: `1px solid ${videoType === type ? 'rgba(255,215,0,0.6)' : 'rgba(255,255,255,0.2)'}`,
                        }}
                      />
                    ))}
                  </Box>
                  <TextField
                    fullWidth
                    label={videoType === 'youtube' ? 'YouTube URL (e.g. https://youtu.be/...)' : 'Video File URL'}
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LinkIcon sx={{ color: 'rgba(255,215,0,0.5)', fontSize: '1rem' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={inputSx}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Caption (English)"
                    value={videoCaption}
                    onChange={(e) => setVideoCaption(e.target.value)}
                    size="small"
                    sx={inputSx}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="कैप्शन (हिंदी)"
                    value={videoCaptionHi}
                    onChange={(e) => setVideoCaptionHi(e.target.value)}
                    size="small"
                    sx={inputSx}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<VideoCallIcon />}
                    onClick={handleAddVideo}
                    disabled={!videoUrl}
                    sx={{
                      bgcolor: '#8B1A1A',
                      color: '#FFD700',
                      fontWeight: 700,
                      py: 1.3,
                      '&:hover': { bgcolor: '#a52828' },
                      '&.Mui-disabled': { bgcolor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' },
                    }}
                  >
                    {t('admin.uploadVideo')}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Add Event */}
        <TabPanel value={tab} index={2}>
          <Card
            sx={{
              bgcolor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,215,0,0.2)',
              borderRadius: 3,
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700, mb: 3 }}>
                🗓️ {t('admin.addEvent')}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={`${t('admin.eventTitle')} (English)`}
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    required
                    sx={inputSx}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={`${t('admin.eventTitle')} (हिंदी)`}
                    value={eventTitleHi}
                    onChange={(e) => setEventTitleHi(e.target.value)}
                    sx={inputSx}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('admin.eventDate')}
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={inputSx}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="End Date (optional)"
                    type="date"
                    value={eventEndDate}
                    onChange={(e) => setEventEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={inputSx}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={`${t('admin.eventLocation')} (English)`}
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    sx={inputSx}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={`${t('admin.eventLocation')} (हिंदी)`}
                    value={eventLocationHi}
                    onChange={(e) => setEventLocationHi(e.target.value)}
                    sx={inputSx}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={`${t('admin.eventDesc')} (English)`}
                    value={eventDesc}
                    onChange={(e) => setEventDesc(e.target.value)}
                    multiline
                    rows={3}
                    sx={inputSx}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={`${t('admin.eventDesc')} (हिंदी)`}
                    value={eventDescHi}
                    onChange={(e) => setEventDescHi(e.target.value)}
                    multiline
                    rows={3}
                    sx={inputSx}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<EventIcon />}
                    onClick={handleAddEvent}
                    disabled={!eventTitle || !eventDate}
                    sx={{
                      bgcolor: '#8B1A1A',
                      color: '#FFD700',
                      fontWeight: 700,
                      py: 1.3,
                      '&:hover': { bgcolor: '#a52828' },
                      '&.Mui-disabled': { bgcolor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' },
                    }}
                  >
                    {t('admin.saveEvent')}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Theme Color */}
        <TabPanel value={tab} index={3}>
          <Card
            sx={{
              bgcolor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,215,0,0.2)',
              borderRadius: 3,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700, mb: 1 }}>
                🎨 {t('admin.themeColor')}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 3 }}>
                Select a theme color to customize the Navbar and accent elements
              </Typography>

              <Grid container spacing={2}>
                {THEME_COLORS.map((c) => (
                  <Grid item xs={6} sm={4} key={c.value}>
                    <Box
                      onClick={() => onThemeChange(c.value)}
                      sx={{
                        bgcolor: c.value,
                        borderRadius: 2,
                        p: 2,
                        textAlign: 'center',
                        cursor: 'pointer',
                        border: themeColor === c.value ? '3px solid #FFD700' : '3px solid transparent',
                        transition: 'all 0.2s',
                        '&:hover': { opacity: 0.85, transform: 'scale(1.05)' },
                      }}
                    >
                      <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600, fontSize: '0.8rem' }}>
                        {c.label}
                      </Typography>
                      {themeColor === c.value && (
                        <Typography variant="caption" sx={{ color: '#FFD700' }}>✓ Active</Typography>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.6)', display: 'block', mb: 1 }}>
                  Custom Color (hex):
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <input
                    type="color"
                    value={themeColor}
                    onChange={(e) => onThemeChange(e.target.value)}
                    style={{
                      width: 48,
                      height: 48,
                      border: 'none',
                      borderRadius: 8,
                      cursor: 'pointer',
                      background: 'transparent',
                    }}
                  />
                  <TextField
                    size="small"
                    value={themeColor}
                    onChange={(e) => onThemeChange(e.target.value)}
                    placeholder="#8B1A1A"
                    sx={{ ...inputSx, flex: 1 }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>
      </Container>

      <Snackbar
        open={Boolean(snack)}
        autoHideDuration={3000}
        onClose={() => setSnack('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          onClose={() => setSnack('')}
          sx={{ bgcolor: 'rgba(76,175,80,0.2)', color: '#81c784', border: '1px solid rgba(76,175,80,0.4)' }}
        >
          {snack}
        </Alert>
      </Snackbar>
    </Box>
  );
}
