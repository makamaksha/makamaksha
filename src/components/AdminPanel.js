import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
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
  { label: 'Deep Red', value: '#8B1A1A', emoji: '🔴' },
  { label: 'Crimson', value: '#A50000', emoji: '❤️' },
  { label: 'Maroon', value: '#800000', emoji: '🍷' },
  { label: 'Deep Orange', value: '#7C2D12', emoji: '🟠' },
  { label: 'Saffron', value: '#9C4100', emoji: '🧡' },
  { label: 'Gold Brown', value: '#7A4E00', emoji: '🟡' },
  { label: 'Dark Purple', value: '#4A0E4E', emoji: '🟣' },
  { label: 'Royal Violet', value: '#3B0764', emoji: '💜' },
  { label: 'Indigo', value: '#1E1B4B', emoji: '🔵' },
  { label: 'Deep Blue', value: '#0D2137', emoji: '🌊' },
  { label: 'Teal', value: '#0F3460', emoji: '🐬' },
  { label: 'Forest Green', value: '#1B4332', emoji: '🌿' },
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
  const [videoPreview, setVideoPreview] = useState('');
  const [videoSizeWarn, setVideoSizeWarn] = useState(false);
  const videoInputRef = useRef();

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

  const handleVideoFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideoSizeWarn(false);
    if (file.size > 50 * 1024 * 1024) {
      setVideoSizeWarn(true);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setVideoPreview(objectUrl);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setVideoUrl(ev.target.result);
      setVideoType('file');
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

  const convertGoogleDriveUrl = (url) => {
    const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    const matchOpen = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
    if (matchOpen) return `https://drive.google.com/uc?export=view&id=${matchOpen[1]}`;
    return url;
  };

  const handlePhotoUrlChange = (e) => {
    const raw = e.target.value;
    const converted = convertGoogleDriveUrl(raw);
    setPhotoUrl(converted);
    setPhotoPreview(converted);
  };

  // ── Google Drive Picker ──────────────────────────────────────────────────
  const [drivePickerReady, setDrivePickerReady] = useState(false);
  const driveTokenRef = useRef(null);

  const GAPI_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const GCLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const isGoogleConfigured =
    GAPI_KEY && GAPI_KEY !== 'YOUR_API_KEY_HERE' &&
    GCLIENT_ID && GCLIENT_ID !== 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com';

  useEffect(() => {
    if (!isGoogleConfigured) return;

    let gapiOk = false;
    let gisOk = false;
    const checkReady = () => { if (gapiOk && gisOk) setDrivePickerReady(true); };

    const loadScript = (src, cb) => {
      if (document.querySelector(`script[src="${src}"]`)) { cb(); return; }
      const s = document.createElement('script');
      s.src = src; s.async = true; s.onload = cb;
      document.head.appendChild(s);
    };

    loadScript('https://apis.google.com/js/api.js', () => {
      window.gapi.load('picker', () => { gapiOk = true; checkReady(); });
    });
    loadScript('https://accounts.google.com/gsi/client', () => {
      gisOk = true; checkReady();
    });
  }, [isGoogleConfigured]);

  const showDrivePicker = (token, target) => {
    const viewId =
      target === 'video'
        ? window.google.picker.ViewId.DOCS_VIDEOS
        : window.google.picker.ViewId.DOCS_IMAGES;

    const view = new window.google.picker.DocsView(viewId).setIncludeFolders(false);

    new window.google.picker.PickerBuilder()
      .addView(view)
      .setOAuthToken(token)
      .setDeveloperKey(GAPI_KEY)
      .setCallback((data) => {
        if (data.action === window.google.picker.Action.PICKED) {
          const file = data.docs[0];
          if (target === 'video') {
            setVideoUrl(`https://drive.google.com/file/d/${file.id}/preview`);
            setVideoType('gdrive');
            setVideoCaption(file.name || 'Temple Video');
          } else {
            const url = `https://drive.google.com/uc?export=view&id=${file.id}`;
            setPhotoUrl(url);
            setPhotoPreview(url);
            setPhotoCaption(file.name ? file.name.replace(/\.[^/.]+$/, '') : 'Temple Photo');
          }
        }
      })
      .build()
      .setVisible(true);
  };

  const handleDrivePick = (target) => {
    if (!drivePickerReady) {
      setSnack('Google Drive picker is not ready yet, please wait a moment...');
      return;
    }
    if (driveTokenRef.current) {
      showDrivePicker(driveTokenRef.current, target);
      return;
    }
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: GCLIENT_ID,
      scope: 'https://www.googleapis.com/auth/drive.readonly',
      callback: (response) => {
        if (response.access_token) {
          driveTokenRef.current = response.access_token;
          showDrivePicker(response.access_token, target);
        }
      },
    });
    tokenClient.requestAccessToken();
  };
  // ────────────────────────────────────────────────────────────────────────

  const handleAddVideo = () => {
    if (!videoUrl) return;
    const embedUrl = videoType === 'youtube' ? getYoutubeEmbedUrl(videoUrl) : videoUrl;
    addVideo({
      url: embedUrl,
      caption: videoCaption || 'Temple Video',
      captionHi: videoCaptionHi || videoCaption || 'मंदिर वीडियो',
      type: videoType === 'gdrive' ? 'gdrive' : videoType,
    });
    setVideoCaption('');
    setVideoCaptionHi('');
    setVideoUrl('');
    setVideoPreview('');
    setVideoSizeWarn(false);
    if (videoInputRef.current) videoInputRef.current.value = '';
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
              bgcolor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,215,0,0.2)',
              borderRadius: 4,
              maxWidth: 700,
              mx: 'auto',
              overflow: 'hidden',
            }}
          >
            {/* Card header band */}
            <Box sx={{ background: 'linear-gradient(135deg, rgba(139,26,26,0.6) 0%, rgba(80,10,10,0.6) 100%)', px: 4, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <CloudUploadIcon sx={{ color: '#FFD700', fontSize: 28 }} />
              <Box>
                <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 700, lineHeight: 1.2 }}>
                  {t('admin.uploadPhoto')}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,220,150,0.7)' }}>
                  Add a new photo to the gallery
                </Typography>
              </Box>
            </Box>

            <CardContent sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Drop zone */}
              <Box
                onClick={() => photoInputRef.current?.click()}
                sx={{
                  border: `2px dashed ${photoPreview ? 'rgba(255,215,0,0.6)' : 'rgba(255,215,0,0.3)'}`,
                  borderRadius: 3,
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  bgcolor: photoPreview ? 'rgba(255,215,0,0.04)' : 'rgba(255,255,255,0.02)',
                  transition: 'all 0.25s',
                  '&:hover': {
                    border: '2px dashed rgba(255,215,0,0.8)',
                    bgcolor: 'rgba(255,215,0,0.06)',
                    transform: 'scale(1.005)',
                  },
                }}
              >
                {photoPreview ? (
                  <Box>
                    <img src={photoPreview} alt="preview" style={{ maxHeight: 180, maxWidth: '100%', borderRadius: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.6)', display: 'block', mt: 1 }}>
                      Click to change image
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <Box sx={{ fontSize: '3.5rem', mb: 1 }}>🖼️</Box>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, mb: 0.5 }}>
                      Click to select a photo
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)' }}>
                      Supports JPG · PNG · WEBP
                    </Typography>
                  </>
                )}
              </Box>
              <input ref={photoInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoFile} />

              {/* OR divider */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Divider sx={{ flex: 1, borderColor: 'rgba(255,215,0,0.15)' }} />
                <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.5)', fontWeight: 600 }}>OR</Typography>
                <Divider sx={{ flex: 1, borderColor: 'rgba(255,215,0,0.15)' }} />
              </Box>

              {/* Google Drive picker button */}
              {isGoogleConfigured ? (
                <Box>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleDrivePick('photo')}
                    disabled={!drivePickerReady}
                    sx={{
                      borderColor: 'rgba(66,133,244,0.5)',
                      color: '#4285F4',
                      fontWeight: 700,
                      py: 1.4,
                      fontSize: '0.95rem',
                      borderRadius: 2,
                      gap: 1.2,
                      '&:hover': { borderColor: '#4285F4', bgcolor: 'rgba(66,133,244,0.08)' },
                      '&.Mui-disabled': { borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.25)' },
                    }}
                  >
                    <Box component="span" sx={{ fontSize: '1.2rem' }}>
                      <svg width="18" height="18" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle', marginRight: 6 }}>
                        <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                        <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
                        <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
                        <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                        <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
                        <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 27h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
                      </svg>
                    </Box>
                    {drivePickerReady ? 'Pick Photo from Google Drive' : 'Loading Google Drive…'}
                  </Button>
                  <Typography variant="caption" sx={{ color: 'rgba(255,180,80,0.6)', mt: 0.6, display: 'block', pl: 0.5 }}>
                    ⚠️ The selected file must be shared publicly ("Anyone with the link") to appear on the website.
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ bgcolor: 'rgba(255,255,255,0.04)', borderRadius: 2, p: 2, border: '1px dashed rgba(255,215,0,0.15)' }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.45)', display: 'block', textAlign: 'center' }}>
                    🔑 Google Drive picker requires API keys in <code>.env.local</code>.<br />
                    See setup guide in project root.
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Divider sx={{ flex: 1, borderColor: 'rgba(255,215,0,0.15)' }} />
                <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.5)', fontWeight: 600 }}>OR PASTE URL</Typography>
                <Divider sx={{ flex: 1, borderColor: 'rgba(255,215,0,0.15)' }} />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Image URL / Google Drive Link"
                  value={photoUrl}
                  onChange={handlePhotoUrlChange}
                  placeholder="https://example.com/image.jpg  or  Google Drive share link"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkIcon sx={{ color: 'rgba(255,215,0,0.5)', fontSize: '1.1rem' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
                <Typography variant="caption" sx={{ color: 'rgba(255,220,100,0.55)', mt: 0.5, display: 'block', pl: 0.5 }}>
                  💡 Paste a direct image URL, Google Photos link (<code style={{ fontSize: '0.75em' }}>lh3.googleusercontent.com/...</code>), or a Google Drive share link — it will be auto-converted.
                </Typography>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField fullWidth label="Caption (English)" value={photoCaption} onChange={(e) => setPhotoCaption(e.target.value)} size="small" sx={inputSx} />
                <TextField fullWidth label="कैप्शन (हिंदी)" value={photoCaptionHi} onChange={(e) => setPhotoCaptionHi(e.target.value)} size="small" sx={inputSx} />
              </Box>

              <Button
                fullWidth
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onClick={handleAddPhoto}
                disabled={!photoUrl && !photoPreview}
                sx={{
                  background: 'linear-gradient(135deg, #8B1A1A 0%, #a52828 100%)',
                  color: '#FFD700',
                  fontWeight: 700,
                  py: 1.6,
                  fontSize: '1rem',
                  borderRadius: 2,
                  boxShadow: '0 4px 15px rgba(139,26,26,0.4)',
                  '&:hover': { background: 'linear-gradient(135deg, #a52828 0%, #c03030 100%)', boxShadow: '0 6px 20px rgba(139,26,26,0.6)' },
                  '&.Mui-disabled': { bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' },
                }}
              >
                Add Photo to Gallery
              </Button>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Upload Video */}
        <TabPanel value={tab} index={1}>
          <Card
            sx={{
              bgcolor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,215,0,0.2)',
              borderRadius: 4,
              maxWidth: 700,
              mx: 'auto',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ background: 'linear-gradient(135deg, rgba(139,26,26,0.6) 0%, rgba(80,10,10,0.6) 100%)', px: 4, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <VideoCallIcon sx={{ color: '#FFD700', fontSize: 28 }} />
              <Box>
                <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 700, lineHeight: 1.2 }}>
                  {t('admin.uploadVideo')}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,220,150,0.7)' }}>
                  Upload from device or add a YouTube / Drive link
                </Typography>
              </Box>
            </Box>

            <CardContent sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Device upload drop zone */}
              <Box
                onClick={() => videoInputRef.current && videoInputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    const synth = { target: { files: [file] } };
                    handleVideoFile(synth);
                  }
                }}
                sx={{
                  border: '2px dashed rgba(255,215,0,0.3)',
                  borderRadius: 3,
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  bgcolor: 'rgba(255,215,0,0.03)',
                  transition: 'all 0.2s',
                  '&:hover': { borderColor: 'rgba(255,215,0,0.6)', bgcolor: 'rgba(255,215,0,0.07)' },
                }}
              >
                {videoPreview ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                    <video
                      src={videoPreview}
                      controls
                      style={{ maxHeight: 180, maxWidth: '100%', borderRadius: 8, background: '#000' }}
                    />
                    <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.7)' }}>
                      Video selected — click to change
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>🎬</Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                      Click to select a video
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', mt: 0.5 }}>
                      MP4 format recommended · max 50 MB
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', display: 'block' }}>
                      or drag & drop here
                    </Typography>
                  </>
                )}
              </Box>
              <input
                ref={videoInputRef}
                type="file"
                accept="video/mp4,video/webm,video/*"
                style={{ display: 'none' }}
                onChange={handleVideoFile}
              />
              {videoSizeWarn && (
                <Typography variant="caption" sx={{ color: '#ff6b6b', fontWeight: 600 }}>
                  ⚠️ Video is larger than 50 MB. Please use YouTube or Google Drive for large videos.
                </Typography>
              )}
              {videoPreview && !videoSizeWarn && (
                <Box sx={{ bgcolor: 'rgba(255,165,0,0.1)', border: '1px solid rgba(255,165,0,0.3)', borderRadius: 2, p: 2 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,180,60,0.9)', display: 'block', fontWeight: 600 }}>
                    📱 Device videos play in this session only
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,180,60,0.6)', display: 'block', mt: 0.4 }}>
                    Browsers can't store large video files permanently. For videos that stay after refresh, upload to <strong>YouTube</strong> or <strong>Google Drive</strong> and add the link below instead.
                  </Typography>
                </Box>
              )}

              {/* OR divider */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Divider sx={{ flex: 1, borderColor: 'rgba(255,215,0,0.15)' }} />
                <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.5)', fontWeight: 600 }}>OR ADD LINK</Typography>
                <Divider sx={{ flex: 1, borderColor: 'rgba(255,215,0,0.15)' }} />
              </Box>

              {/* Type selector */}
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {[{ type: 'youtube', label: '▶ YouTube', desc: 'youtu.be link' }, { type: 'file', label: '📁 Direct URL', desc: 'mp4 / web link' }, { type: 'gdrive', label: '🟢 Google Drive', desc: 'Drive video' }].map((opt) => (
                  <Box
                    key={opt.type}
                    onClick={() => setVideoType(opt.type)}
                    sx={{
                      flex: 1,
                      p: 2,
                      borderRadius: 2,
                      border: `2px solid ${videoType === opt.type ? 'rgba(255,215,0,0.6)' : 'rgba(255,255,255,0.1)'}`,
                      bgcolor: videoType === opt.type ? 'rgba(255,215,0,0.08)' : 'transparent',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      '&:hover': { border: '2px solid rgba(255,215,0,0.4)' },
                    }}
                  >
                    <Typography sx={{ color: videoType === opt.type ? '#FFD700' : 'rgba(255,255,255,0.6)', fontWeight: 700, fontSize: '0.9rem' }}>
                      {opt.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)' }}>{opt.desc}</Typography>
                  </Box>
                ))}
              </Box>

              {/* Google Drive video picker */}
              {videoType === 'gdrive' && (
                <Box>
                  {isGoogleConfigured ? (
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => handleDrivePick('video')}
                      disabled={!drivePickerReady}
                      sx={{
                        borderColor: 'rgba(66,133,244,0.5)',
                        color: '#4285F4',
                        fontWeight: 700,
                        py: 1.4,
                        borderRadius: 2,
                        '&:hover': { borderColor: '#4285F4', bgcolor: 'rgba(66,133,244,0.08)' },
                        '&.Mui-disabled': { borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.25)' },
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle', marginRight: 8 }}>
                        <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                        <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
                        <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
                        <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                        <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
                        <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 27h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
                      </svg>
                      {drivePickerReady ? 'Pick Video from Google Drive' : 'Loading Google Drive…'}
                    </Button>
                  ) : (
                    <Box sx={{ bgcolor: 'rgba(255,255,255,0.04)', borderRadius: 2, p: 2, border: '1px dashed rgba(255,215,0,0.15)' }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.45)', display: 'block', textAlign: 'center' }}>
                        🔑 Google Drive picker requires API keys in <code>.env.local</code>.
                      </Typography>
                    </Box>
                  )}
                  <Typography variant="caption" sx={{ color: 'rgba(255,180,80,0.6)', mt: 0.6, display: 'block', pl: 0.5 }}>
                    ⚠️ Video must be shared publicly ("Anyone with the link") in Google Drive.
                  </Typography>
                </Box>
              )}

              <TextField
                fullWidth
                label={
                  videoType === 'youtube' ? 'YouTube URL (youtu.be/... or youtube.com/watch?v=...)'
                  : videoType === 'gdrive' ? 'Google Drive video URL (auto-filled after picking)'
                  : 'Video File URL'
                }
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkIcon sx={{ color: 'rgba(255,215,0,0.5)', fontSize: '1.1rem' }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputSx}
              />

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField fullWidth label="Caption (English)" value={videoCaption} onChange={(e) => setVideoCaption(e.target.value)} size="small" sx={inputSx} />
                <TextField fullWidth label="कैप्शन (हिंदी)" value={videoCaptionHi} onChange={(e) => setVideoCaptionHi(e.target.value)} size="small" sx={inputSx} />
              </Box>

              <Button
                fullWidth
                variant="contained"
                startIcon={<VideoCallIcon />}
                onClick={handleAddVideo}
                disabled={!videoUrl}
                sx={{
                  background: 'linear-gradient(135deg, #8B1A1A 0%, #a52828 100%)',
                  color: '#FFD700',
                  fontWeight: 700,
                  py: 1.6,
                  fontSize: '1rem',
                  borderRadius: 2,
                  boxShadow: '0 4px 15px rgba(139,26,26,0.4)',
                  '&:hover': { background: 'linear-gradient(135deg, #a52828 0%, #c03030 100%)', boxShadow: '0 6px 20px rgba(139,26,26,0.6)' },
                  '&.Mui-disabled': { bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' },
                }}
              >
                Add Video to Gallery
              </Button>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Add Event */}
        <TabPanel value={tab} index={2}>
          <Card
            sx={{
              bgcolor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,215,0,0.2)',
              borderRadius: 4,
              maxWidth: 800,
              mx: 'auto',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ background: 'linear-gradient(135deg, rgba(139,26,26,0.6) 0%, rgba(80,10,10,0.6) 100%)', px: 4, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EventIcon sx={{ color: '#FFD700', fontSize: 28 }} />
              <Box>
                <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 700, lineHeight: 1.2 }}>
                  {t('admin.addEvent')}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,220,150,0.7)' }}>
                  Publish a new event or festival
                </Typography>
              </Box>
            </Box>

            <CardContent sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {/* Title row */}
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.6)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'block', mb: 1 }}>
                  Event Title
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <TextField fullWidth label="Title (English)" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required sx={inputSx} />
                  <TextField fullWidth label="शीर्षक (हिंदी)" value={eventTitleHi} onChange={(e) => setEventTitleHi(e.target.value)} sx={inputSx} />
                </Box>
              </Box>

              {/* Date row */}
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.6)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'block', mb: 1 }}>
                  📅 Event Dates
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <TextField fullWidth label="Start Date *" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required InputLabelProps={{ shrink: true }} sx={inputSx} />
                  <TextField fullWidth label="End Date (optional)" type="date" value={eventEndDate} onChange={(e) => setEventEndDate(e.target.value)} InputLabelProps={{ shrink: true }} sx={inputSx} />
                </Box>
              </Box>

              {/* Location row */}
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.6)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'block', mb: 1 }}>
                  📍 Location
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <TextField fullWidth label="Location (English)" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} sx={inputSx} />
                  <TextField fullWidth label="स्थान (हिंदी)" value={eventLocationHi} onChange={(e) => setEventLocationHi(e.target.value)} sx={inputSx} />
                </Box>
              </Box>

              {/* Description */}
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.6)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'block', mb: 1 }}>
                  📝 Description
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField fullWidth label="Description (English)" value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} multiline rows={3} sx={inputSx} />
                  <TextField fullWidth label="विवरण (हिंदी)" value={eventDescHi} onChange={(e) => setEventDescHi(e.target.value)} multiline rows={3} sx={inputSx} />
                </Box>
              </Box>

              <Button
                fullWidth
                variant="contained"
                startIcon={<EventIcon />}
                onClick={handleAddEvent}
                disabled={!eventTitle || !eventDate}
                sx={{
                  background: 'linear-gradient(135deg, #8B1A1A 0%, #a52828 100%)',
                  color: '#FFD700',
                  fontWeight: 700,
                  py: 1.6,
                  fontSize: '1rem',
                  borderRadius: 2,
                  boxShadow: '0 4px 15px rgba(139,26,26,0.4)',
                  '&:hover': { background: 'linear-gradient(135deg, #a52828 0%, #c03030 100%)', boxShadow: '0 6px 20px rgba(139,26,26,0.6)' },
                  '&.Mui-disabled': { bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' },
                }}
              >
                Publish Event
              </Button>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Theme Color */}
        <TabPanel value={tab} index={3}>
          <Card
            sx={{
              bgcolor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,215,0,0.2)',
              borderRadius: 4,
              maxWidth: 680,
              mx: 'auto',
              overflow: 'hidden',
            }}
          >
            {/* Header band */}
            <Box sx={{ background: 'linear-gradient(135deg, rgba(139,26,26,0.6) 0%, rgba(80,10,10,0.6) 100%)', px: 4, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography sx={{ fontSize: 28 }}>🎨</Typography>
              <Box>
                <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 700, lineHeight: 1.2 }}>
                  {t('admin.themeColor')}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,220,150,0.7)' }}>
                  Customise Navbar and accent colours
                </Typography>
              </Box>
            </Box>

            <CardContent sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', gap: 3 }}>

              {/* Live preview bar */}
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,215,0,0.2)',
                  boxShadow: `0 4px 20px ${themeColor}55`,
                }}
              >
                <Box
                  sx={{
                    background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}99 100%)`,
                    px: 3,
                    py: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Typography sx={{ fontSize: '1.3rem' }}>🛕</Typography>
                  <Box>
                    <Typography sx={{ color: '#FFD700', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.1 }}>
                      Maa Kamakhya Mandir
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,220,150,0.8)', fontSize: '0.65rem' }}>
                      Vikaspuri, New Delhi
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ ml: 'auto', color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem' }}>
                    ← Navbar preview
                  </Typography>
                </Box>
              </Box>

              {/* Colour picker section */}
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.7)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'block', mb: 2 }}>
                  🎨 Pick any colour
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2.5,
                    borderRadius: 3,
                    border: '1px solid rgba(255,215,0,0.2)',
                    bgcolor: 'rgba(255,255,255,0.03)',
                  }}
                >
                  {/* Large colour picker swatch */}
                  <Box sx={{ position: 'relative', flexShrink: 0 }}>
                    <Box
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: 2.5,
                        bgcolor: themeColor,
                        border: '3px solid rgba(255,215,0,0.5)',
                        boxShadow: `0 0 20px ${themeColor}88`,
                        cursor: 'pointer',
                        overflow: 'hidden',
                        position: 'relative',
                        '&:hover': { opacity: 0.9 },
                      }}
                    >
                      <input
                        type="color"
                        value={themeColor}
                        onChange={(e) => onThemeChange(e.target.value)}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          cursor: 'pointer',
                          border: 'none',
                          padding: 0,
                        }}
                      />
                    </Box>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', textAlign: 'center', mt: 0.5, fontSize: '0.6rem' }}>
                      Click to pick
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.6)', display: 'block', mb: 0.8 }}>
                      Hex code
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      value={themeColor}
                      onChange={(e) => onThemeChange(e.target.value)}
                      placeholder="#8B1A1A"
                      inputProps={{ style: { fontFamily: 'monospace', fontSize: '1rem', letterSpacing: 2 } }}
                      sx={inputSx}
                    />
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', mt: 0.8, display: 'block' }}>
                      Click the swatch or type a hex value
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ borderColor: 'rgba(255,215,0,0.1)' }} />

              {/* Preset swatches */}
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.7)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', display: 'block', mb: 2 }}>
                  ✨ Preset themes
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1.5 }}>
                  {THEME_COLORS.map((c) => {
                    const active = themeColor === c.value;
                    return (
                      <Box
                        key={c.value}
                        onClick={() => onThemeChange(c.value)}
                        sx={{
                          borderRadius: 2.5,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: active ? '2px solid #FFD700' : '2px solid transparent',
                          boxShadow: active ? `0 0 14px ${c.value}99` : 'none',
                          transition: 'all 0.2s',
                          '&:hover': { border: '2px solid rgba(255,215,0,0.5)', transform: 'translateY(-2px)' },
                        }}
                      >
                        {/* Colour band */}
                        <Box
                          sx={{
                            bgcolor: c.value,
                            height: 48,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.4rem',
                          }}
                        >
                          {active ? '✓' : c.emoji}
                        </Box>
                        {/* Label */}
                        <Box
                          sx={{
                            bgcolor: 'rgba(255,255,255,0.05)',
                            px: 1,
                            py: 0.6,
                            textAlign: 'center',
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: active ? '#FFD700' : 'rgba(255,255,255,0.65)',
                              fontWeight: active ? 700 : 400,
                              fontSize: '0.7rem',
                              lineHeight: 1.2,
                              display: 'block',
                            }}
                          >
                            {c.label}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
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
