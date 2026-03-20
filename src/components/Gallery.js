import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
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
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';

function getVideoId(url) {
  const m = url.match(/embed\/([^?]+)/);
  return m ? m[1] : null;
}

/* ─── Thumbnail card shown in the grid ─── */
function VideoCard({ video, isHindi, isAdmin, onDelete, onPlay }) {
  const videoId = video.type === 'youtube' ? getVideoId(video.url) : null;
  const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;

  return (
    <Card
      sx={{
        bgcolor: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,215,0,0.1)',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{ position: 'relative', paddingTop: '56.25%', cursor: 'pointer' }}
        onClick={() => onPlay(video)}
      >
        {/* Thumbnail */}
        <Box
          sx={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: thumbnail ? `url(${thumbnail})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            bgcolor: '#1a0000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            '&:hover .play-btn': { transform: 'scale(1.12)', bgcolor: 'rgba(220,0,0,0.98)' },
          }}
        >
          {/* Dark overlay */}
          <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.25)' }} />

          {/* Play button */}
          <Box
            className="play-btn"
            sx={{
              position: 'relative',
              width: { xs: 52, md: 60 },
              height: { xs: 52, md: 60 },
              borderRadius: '50%',
              bgcolor: 'rgba(220,0,0,0.88)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 24px rgba(0,0,0,0.7)',
              transition: 'all 0.2s',
            }}
          >
            <Box
              sx={{
                width: 0, height: 0,
                borderTop: '11px solid transparent',
                borderBottom: '11px solid transparent',
                borderLeft: '20px solid #fff',
                ml: '5px',
              }}
            />
          </Box>

          {/* Fullscreen hint badge */}
          <Box
            sx={{
              position: 'absolute', bottom: 6, right: 6,
              bgcolor: 'rgba(0,0,0,0.55)',
              borderRadius: 1,
              px: 0.8, py: 0.2,
              display: 'flex', alignItems: 'center', gap: 0.4,
            }}
          >
            <FullscreenIcon sx={{ color: '#fff', fontSize: '0.9rem' }} />
            <Typography variant="caption" sx={{ color: '#fff', fontSize: '0.65rem', lineHeight: 1 }}>
              Tap to play
            </Typography>
          </Box>
        </Box>
      </Box>

      <CardContent
        sx={{
          p: 1.5,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
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
            sx={{ bgcolor: 'rgba(255,0,0,0.2)', color: '#ff6b6b', height: 18, fontSize: '0.65rem', mt: 0.5 }}
          />
        </Box>
        {isAdmin && (
          <IconButton
            size="small"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            sx={{ color: 'rgba(255,100,100,0.7)', '&:hover': { color: '#ff4444' } }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
}

/* ─── Fullscreen video dialog ─── */
function VideoDialog({ video, isHindi, onClose }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!video) return;

    // Try to lock landscape orientation
    const lockLandscape = async () => {
      try {
        const orient = window.screen && window.screen.orientation;
        if (orient && orient.lock) {
          await orient.lock('landscape');
        }
      } catch (_) {
        // Not supported or denied — user can rotate manually
      }
    };
    lockLandscape();

    return () => {
      // Unlock orientation on close
      try {
        const orient = window.screen && window.screen.orientation;
        if (orient && orient.unlock) {
          orient.unlock();
        }
      } catch (_) {}
    };
  }, [video]);

  if (!video) return null;

  const embedSrc =
    video.type === 'youtube'
      ? `${video.url}?rel=0&modestbranding=1&autoplay=1&playsinline=1`
      : null;

  return (
    <Dialog
      open
      onClose={onClose}
      fullScreen
      PaperProps={{
        sx: {
          bgcolor: '#000',
          m: 0,
          borderRadius: 0,
        },
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'fixed',
          top: { xs: 8, md: 16 },
          right: { xs: 8, md: 16 },
          zIndex: 10,
          bgcolor: 'rgba(0,0,0,0.7)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.3)',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.9)' },
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Centred video in black fullscreen */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#000',
        }}
      >
        {video.type === 'youtube' ? (
          /* 16:9 box that fills the smaller dimension */
          <Box
            sx={{
              width: '100%',
              maxWidth: '100vw',
              /* Fit to screen: on landscape mobile this gives full-width 16:9;
                 on portrait mobile it constrains height */
              aspectRatio: '16 / 9',
              maxHeight: '100vh',
            }}
          >
            <iframe
              ref={iframeRef}
              title={isHindi ? video.captionHi : video.caption}
              src={embedSrc}
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        ) : (
          <video
            src={video.url}
            controls
            autoPlay
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        )}
      </Box>

      {/* Caption bar at bottom */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          bgcolor: 'rgba(0,0,0,0.6)',
          px: 2, py: 1,
          textAlign: 'center',
        }}
      >
        <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.85)' }}>
          {isHindi ? video.captionHi : video.caption}
        </Typography>
      </Box>
    </Dialog>
  );
}

/* ─── Main Gallery component ─── */
export default function Gallery() {
  const { t, i18n } = useTranslation();
  const { isAdmin } = useAuth();
  const { photos, videos, deletePhoto, deleteVideo } = useContent();
  const [tab, setTab] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);

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
                '&.Mui-selected': { color: '#1a0000', bgcolor: '#FFD700', fontWeight: 700 },
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
                '&.Mui-selected': { color: '#1a0000', bgcolor: '#FFD700', fontWeight: 700 },
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
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                {photos.map((photo) => (
                  <Card
                    key={photo.id}
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,215,0,0.1)',
                      borderRadius: 2,
                      overflow: 'hidden',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                      '&:hover': { border: '1px solid rgba(255,215,0,0.4)', transform: 'scale(1.02)' },
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
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
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
                ))}
              </Box>
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
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                {videos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    isHindi={isHindi}
                    isAdmin={isAdmin}
                    onDelete={() => deleteVideo(video.id)}
                    onPlay={setPlayingVideo}
                  />
                ))}
              </Box>
            )}
          </>
        )}
      </Container>

      {/* Fullscreen video player */}
      {playingVideo && (
        <VideoDialog
          video={playingVideo}
          isHindi={isHindi}
          onClose={() => setPlayingVideo(null)}
        />
      )}

      {/* Photo Lightbox */}
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
              position: 'absolute', top: 8, right: 8,
              bgcolor: 'rgba(0,0,0,0.7)', color: '#fff', zIndex: 1,
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
