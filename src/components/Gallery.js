import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Dialog,
  DialogContent,
  IconButton,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';

export default function Gallery() {
  const { t, i18n } = useTranslation();
  const { isAdmin } = useAuth();
  const { photos, videos, deletePhoto, deleteVideo } = useContent();
  const [tab, setTab] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  const isHindi = i18n.language === 'hi';

  return (
    <Box
      id="gallery"
      sx={{ bgcolor: '#080000', py: { xs: 6, md: 10 }, scrollMarginTop: '64px' }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: '#FFD700', letterSpacing: 4, display: 'block', mb: 1 }}
          >
            ॥ दिव्य दर्शन ॥
          </Typography>
          <Typography
            variant="h3"
            sx={{ color: '#fff', fontWeight: 700, mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}
          >
            {t('gallery.title')}
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,200,100,0.8)', fontWeight: 400 }}>
            {t('gallery.subtitle')}
          </Typography>
          <Divider sx={{ width: 60, borderColor: '#FFD700', borderWidth: 2, mx: 'auto', mt: 3 }} />
        </Box>

        {/* Tabs */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
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
            <Tab
              icon={<PhotoLibraryIcon />}
              iconPosition="start"
              label={t('gallery.photos')}
              sx={{
                color: 'rgba(255,255,255,0.6)',
                borderRadius: 2,
                minHeight: 44,
                px: 3,
                '&.Mui-selected': {
                  color: '#1a0000',
                  bgcolor: '#FFD700',
                  fontWeight: 700,
                },
              }}
            />
            <Tab
              icon={<VideoLibraryIcon />}
              iconPosition="start"
              label={t('gallery.videos')}
              sx={{
                color: 'rgba(255,255,255,0.6)',
                borderRadius: 2,
                minHeight: 44,
                px: 3,
                '&.Mui-selected': {
                  color: '#1a0000',
                  bgcolor: '#FFD700',
                  fontWeight: 700,
                },
              }}
            />
          </Tabs>
        </Box>

        {/* Photos Tab */}
        {tab === 0 && (
          <>
            {photos.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '3rem', mb: 2 }}>📷</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>{t('gallery.noPhotos')}</Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {photos.map((photo) => (
                  <Grid item xs={12} sm={4} key={photo.id}>
                    <Card
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,215,0,0.1)',
                        borderRadius: 2,
                        overflow: 'hidden',
                        transition: 'all 0.3s',
                        cursor: 'pointer',
                        '&:hover': {
                          border: '1px solid rgba(255,215,0,0.4)',
                          transform: 'scale(1.02)',
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="220"
                        image={photo.url}
                        alt={isHindi ? photo.captionHi : photo.caption}
                        onClick={() => setLightbox(photo)}
                        sx={{ objectFit: 'cover' }}
                        onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='220'%3E%3Crect width='400' height='220' fill='%231a0000'/%3E%3Ctext x='50%25' y='50%25' fill='%23FFD700' text-anchor='middle' dy='.3em' font-size='14' font-family='sans-serif'%3E%F0%9F%9B%95 Image Not Available%3C/text%3E%3C/svg%3E"; }}
                      />
                      <CardContent
                        sx={{
                          p: 1.5,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          '&:last-child': { pb: 1.5 },
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: 'rgba(255,215,0,0.8)', flex: 1 }}
                          onClick={() => setLightbox(photo)}
                        >
                          {isHindi ? photo.captionHi : photo.caption}
                        </Typography>
                        {isAdmin && (
                          <IconButton
                            size="small"
                            onClick={(e) => { e.stopPropagation(); deletePhoto(photo.id); }}
                            sx={{ color: 'rgba(255,100,100,0.7)', '&:hover': { color: '#ff4444' } }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}

        {/* Videos Tab */}
        {tab === 1 && (
          <>
            {videos.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '3rem', mb: 2 }}>🎬</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>{t('gallery.noVideos')}</Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {videos.map((video) => (
                  <Grid item xs={12} sm={4} key={video.id}>
                    <Card
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,215,0,0.1)',
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                        {video.type === 'youtube' ? (
                          <iframe
                            title={isHindi ? video.captionHi : video.caption}
                            src={`${video.url}?rel=0&modestbranding=1`}
                            style={{
                              position: 'absolute',
                              top: 0, left: 0,
                              width: '100%', height: '100%',
                              border: 'none',
                            }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        ) : (
                          <video
                            src={video.url}
                            controls
                            style={{
                              position: 'absolute',
                              top: 0, left: 0,
                              width: '100%', height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        )}
                      </Box>
                      <CardContent
                        sx={{
                          p: 1.5,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          '&:last-child': { pb: 1.5 },
                        }}
                      >
                        <Box>
                          <Typography variant="body2" sx={{ color: '#FFD700', fontWeight: 600 }}>
                            {isHindi ? video.captionHi : video.caption}
                          </Typography>
                          <Chip
                            label={video.type === 'youtube' ? 'YouTube' : 'Video'}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(255,0,0,0.2)',
                              color: '#ff6b6b',
                              height: 18,
                              fontSize: '0.65rem',
                              mt: 0.5,
                            }}
                          />
                        </Box>
                        {isAdmin && (
                          <IconButton
                            size="small"
                            onClick={() => deleteVideo(video.id)}
                            sx={{ color: 'rgba(255,100,100,0.7)', '&:hover': { color: '#ff4444' } }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Container>

      {/* Lightbox */}
      <Dialog
        open={Boolean(lightbox)}
        onClose={() => setLightbox(null)}
        maxWidth="lg"
        PaperProps={{ sx: { bgcolor: '#000', p: 0, borderRadius: 2, overflow: 'hidden' } }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={() => setLightbox(null)}
            sx={{
              position: 'absolute',
              top: 8, right: 8,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: '#fff',
              zIndex: 1,
              '&:hover': { bgcolor: 'rgba(0,0,0,0.9)' },
            }}
          >
            <CloseIcon />
          </IconButton>
          {lightbox && (
            <>
              <img
                src={lightbox.url}
                alt={isHindi ? lightbox.captionHi : lightbox.caption}
                style={{ maxWidth: '90vw', maxHeight: '85vh', display: 'block' }}
                onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%231a0000'/%3E%3Ctext x='50%25' y='50%25' fill='%23FFD700' text-anchor='middle' dy='.3em' font-size='18' font-family='sans-serif'%3E%F0%9F%9B%95 Image Not Available%3C/text%3E%3C/svg%3E"; }}
              />
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,215,0,0.8)' }}>
                  {isHindi ? lightbox.captionHi : lightbox.caption}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
