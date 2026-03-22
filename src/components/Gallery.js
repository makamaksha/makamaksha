import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Pagination,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';

const PHOTOS_PER_PAGE = 9;
const VIDEOS_PER_PAGE = 6;
const CAROUSEL_INTERVAL = 4000;

const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='220'%3E%3Crect width='400' height='220' fill='%231a0000'/%3E%3Ctext x='50%25' y='50%25' fill='%23FFD700' text-anchor='middle' dy='.3em' font-size='14' font-family='sans-serif'%3E%F0%9F%9B%95 Image Not Available%3C/text%3E%3C/svg%3E";

/* ──────────────────────────────────────────────
   Hero Carousel
────────────────────────────────────────────── */
function PhotoCarousel({ photos, isHindi, onOpen }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback(
    (idx) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent((idx + photos.length) % photos.length);
        setAnimating(false);
      }, 300);
    },
    [animating, photos.length]
  );

  const next = useCallback(() => goTo(current + 1), [goTo, current]);
  const prev = useCallback(() => goTo(current - 1), [goTo, current]);

  // Auto-advance
  useEffect(() => {
    if (photos.length < 2) return;
    timerRef.current = setInterval(next, CAROUSEL_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [next, photos.length]);

  const pause = () => clearInterval(timerRef.current);
  const resume = () => {
    if (photos.length < 2) return;
    timerRef.current = setInterval(next, CAROUSEL_INTERVAL);
  };

  if (!photos.length) return null;
  const photo = photos[current];

  return (
    <Box
      sx={{ position: 'relative', mb: 5, borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Main image */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 240, sm: 360, md: 480 },
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => onOpen(photo)}
      >
        <img
          src={photo.url}
          alt={isHindi ? photo.captionHi : photo.caption}
          onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: animating ? 0 : 1,
            transition: 'opacity 0.3s ease',
            display: 'block',
          }}
        />
        {/* Gradient overlay */}
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)' }} />

        {/* Caption */}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: { xs: 2, md: 3 } }}>
          <Typography
            variant="h6"
            sx={{ color: '#FFD700', fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.8)', fontSize: { xs: '0.95rem', md: '1.2rem' } }}
          >
            {isHindi ? photo.captionHi : photo.caption}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            Click to view full size
          </Typography>
        </Box>

        {/* Counter badge */}
        <Box sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'rgba(0,0,0,0.55)', borderRadius: 2, px: 1.5, py: 0.5 }}>
          <Typography variant="caption" sx={{ color: '#FFD700', fontWeight: 700 }}>
            {current + 1} / {photos.length}
          </Typography>
        </Box>
      </Box>

      {/* Left arrow */}
      {photos.length > 1 && (
        <IconButton
          onClick={(e) => { e.stopPropagation(); prev(); }}
          sx={{
            position: 'absolute', left: { xs: 6, md: 14 }, top: '50%', transform: 'translateY(-50%)',
            bgcolor: 'rgba(0,0,0,0.55)', color: '#FFD700',
            border: '1px solid rgba(255,215,0,0.3)',
            '&:hover': { bgcolor: 'rgba(139,26,26,0.85)', borderColor: '#FFD700' },
            transition: 'all 0.2s',
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      )}

      {/* Right arrow */}
      {photos.length > 1 && (
        <IconButton
          onClick={(e) => { e.stopPropagation(); next(); }}
          sx={{
            position: 'absolute', right: { xs: 6, md: 14 }, top: '50%', transform: 'translateY(-50%)',
            bgcolor: 'rgba(0,0,0,0.55)', color: '#FFD700',
            border: '1px solid rgba(255,215,0,0.3)',
            '&:hover': { bgcolor: 'rgba(139,26,26,0.85)', borderColor: '#FFD700' },
            transition: 'all 0.2s',
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      )}

      {/* Dot indicators */}
      {photos.length > 1 && (
        <Box sx={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 0.8 }}>
          {photos.map((_, i) => (
            <Box
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              sx={{
                width: i === current ? 20 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: i === current ? '#FFD700' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

/* ──────────────────────────────────────────────
   Video Card
────────────────────────────────────────────── */
function VideoCard({ video, isHindi, isAdmin, onDelete, onPlay }) {
  const videoId = video.type === 'youtube' ? (video.url.match(/embed\/([^?]+)/) || [])[1] : null;
  const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
  const isGdrive = video.type === 'gdrive' || video.url.includes('drive.google.com');

  return (
    <Card sx={{ bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,215,0,0.1)', borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ position: 'relative', paddingTop: '56.25%', cursor: 'pointer' }} onClick={() => onPlay(video)}>
        <Box
          sx={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: thumbnail ? `url(${thumbnail})` : 'none',
            backgroundSize: 'cover', backgroundPosition: 'center',
            bgcolor: isGdrive ? '#0a1628' : '#1a0000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            '&:hover .play-btn': { transform: 'scale(1.12)', bgcolor: 'rgba(220,0,0,0.98)' },
          }}
        >
          <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.25)' }} />
          {isGdrive && !thumbnail && (
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) translateY(-20px)', opacity: 0.3 }}>
              <svg width="40" height="36" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
                <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
                <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
                <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 27h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
              </svg>
            </Box>
          )}
          <Box className="play-btn" sx={{ position: 'relative', width: { xs: 52, md: 60 }, height: { xs: 52, md: 60 }, borderRadius: '50%', bgcolor: 'rgba(220,0,0,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.7)', transition: 'all 0.2s' }}>
            <Box sx={{ width: 0, height: 0, borderTop: '11px solid transparent', borderBottom: '11px solid transparent', borderLeft: '20px solid #fff', ml: '5px' }} />
          </Box>
          <Box sx={{ position: 'absolute', bottom: 6, right: 6, bgcolor: 'rgba(0,0,0,0.55)', borderRadius: 1, px: 0.8, py: 0.2, display: 'flex', alignItems: 'center', gap: 0.4 }}>
            <FullscreenIcon sx={{ color: '#fff', fontSize: '0.9rem' }} />
            <Typography variant="caption" sx={{ color: '#fff', fontSize: '0.65rem', lineHeight: 1 }}>Tap to play</Typography>
          </Box>
        </Box>
      </Box>
      <CardContent sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', '&:last-child': { pb: 1.5 } }}>
        <Box>
          <Typography variant="body2" sx={{ color: '#FFD700', fontWeight: 600 }}>
            {isHindi ? video.captionHi : video.caption}
          </Typography>
          <Chip
            label={video.type === 'youtube' ? 'YouTube' : video.type === 'gdrive' ? 'Google Drive' : 'Video'}
            size="small"
            sx={{ bgcolor: video.type === 'gdrive' ? 'rgba(66,133,244,0.2)' : 'rgba(255,0,0,0.2)', color: video.type === 'gdrive' ? '#4285F4' : '#ff6b6b', height: 18, fontSize: '0.65rem', mt: 0.5 }}
          />
        </Box>
        {isAdmin && (
          <IconButton size="small" onClick={(e) => { e.stopPropagation(); onDelete(); }} sx={{ color: 'rgba(255,100,100,0.7)', '&:hover': { color: '#ff4444' } }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
}

/* ──────────────────────────────────────────────
   Fullscreen Video Dialog
────────────────────────────────────────────── */
function VideoDialog({ video, isHindi, onClose }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!video) return;
    const lockLandscape = async () => {
      try {
        const orient = window.screen && window.screen.orientation;
        if (orient && orient.lock) await orient.lock('landscape');
      } catch (_) {}
    };
    lockLandscape();
    return () => {
      try {
        const orient = window.screen && window.screen.orientation;
        if (orient && orient.unlock) orient.unlock();
      } catch (_) {}
    };
  }, [video]);

  if (!video) return null;

  const isIframe = video.type === 'youtube' || video.type === 'gdrive' || video.url.includes('drive.google.com');
  const embedSrc = video.type === 'youtube'
    ? `${video.url}?rel=0&modestbranding=1&autoplay=1&playsinline=1`
    : isIframe ? video.url : null;

  return (
    <Dialog open onClose={onClose} fullScreen PaperProps={{ sx: { bgcolor: '#000', m: 0, borderRadius: 0 } }}>
      <IconButton onClick={onClose} sx={{ position: 'fixed', top: { xs: 8, md: 16 }, right: { xs: 8, md: 16 }, zIndex: 10, bgcolor: 'rgba(0,0,0,0.7)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.9)' } }}>
        <CloseIcon />
      </IconButton>
      <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#000' }}>
        {isIframe ? (
          <Box sx={{ width: '100%', maxWidth: '100vw', aspectRatio: '16 / 9', maxHeight: '100vh' }}>
            <iframe ref={iframeRef} title={isHindi ? video.captionHi : video.caption} src={embedSrc} style={{ width: '100%', height: '100%', border: 'none', display: 'block' }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
          </Box>
        ) : (
          <video src={video.url} controls autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        )}
      </Box>
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'rgba(0,0,0,0.6)', px: 2, py: 1, textAlign: 'center' }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.85)' }}>
          {isHindi ? video.captionHi : video.caption}
        </Typography>
      </Box>
    </Dialog>
  );
}

/* ──────────────────────────────────────────────
   Main Gallery
────────────────────────────────────────────── */
export default function Gallery() {
  const { t, i18n } = useTranslation();
  const { isAdmin } = useAuth();
  const { photos, videos, deletePhoto, deleteVideo } = useContent();
  const [tab, setTab] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [photoPage, setPhotoPage] = useState(1);
  const [videoPage, setVideoPage] = useState(1);

  const isHindi = i18n.language === 'hi';

  // Reset page when tab changes
  const handleTabChange = (_, v) => {
    setTab(v);
    setPhotoPage(1);
    setVideoPage(1);
  };

  // Pagination slices
  const photoPageCount = Math.ceil(photos.length / PHOTOS_PER_PAGE);
  const pagedPhotos = photos.slice((photoPage - 1) * PHOTOS_PER_PAGE, photoPage * PHOTOS_PER_PAGE);

  const videoPageCount = Math.ceil(videos.length / VIDEOS_PER_PAGE);
  const pagedVideos = videos.slice((videoPage - 1) * VIDEOS_PER_PAGE, videoPage * VIDEOS_PER_PAGE);

  const paginationSx = {
    mt: 4,
    display: 'flex',
    justifyContent: 'center',
    '& .MuiPaginationItem-root': {
      color: 'rgba(255,215,0,0.7)',
      borderColor: 'rgba(255,215,0,0.2)',
    },
    '& .MuiPaginationItem-root.Mui-selected': {
      bgcolor: '#8B1A1A',
      color: '#FFD700',
      borderColor: '#8B1A1A',
      fontWeight: 700,
    },
    '& .MuiPaginationItem-root:hover': {
      bgcolor: 'rgba(139,26,26,0.3)',
    },
  };

  return (
    <Box id="gallery" sx={{ bgcolor: '#080000', py: { xs: 6, md: 10 }, scrollMarginTop: '64px' }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" sx={{ color: '#FFD700', letterSpacing: 4, display: 'block', mb: 1 }}>
            ॥ दिव्य दर्शन ॥
          </Typography>
          <Typography variant="h3" sx={{ color: '#fff', fontWeight: 700, mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
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
            onChange={handleTabChange}
            sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 3, p: 0.5, '& .MuiTabs-indicator': { display: 'none' } }}
          >
            <Tab
              icon={<PhotoLibraryIcon />}
              iconPosition="start"
              label={`${t('gallery.photos')} ${photos.length > 0 ? `(${photos.length})` : ''}`}
              sx={{ color: 'rgba(255,255,255,0.6)', borderRadius: 2, minHeight: 44, px: 3, '&.Mui-selected': { color: '#1a0000', bgcolor: '#FFD700', fontWeight: 700 } }}
            />
            <Tab
              icon={<VideoLibraryIcon />}
              iconPosition="start"
              label={`${t('gallery.videos')} ${videos.length > 0 ? `(${videos.length})` : ''}`}
              sx={{ color: 'rgba(255,255,255,0.6)', borderRadius: 2, minHeight: 44, px: 3, '&.Mui-selected': { color: '#1a0000', bgcolor: '#FFD700', fontWeight: 700 } }}
            />
          </Tabs>
        </Box>

        {/* ── Photos Tab ── */}
        {tab === 0 && (
          photos.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '3rem', mb: 2 }}>📷</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>{t('gallery.noPhotos')}</Typography>
            </Box>
          ) : (
            <>
              {/* Hero Carousel — uses ALL photos */}
              <PhotoCarousel photos={photos} isHindi={isHindi} onOpen={setLightbox} />

              {/* Divider */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <Divider sx={{ flex: 1, borderColor: 'rgba(255,215,0,0.15)' }} />
                <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.5)', letterSpacing: 2, fontWeight: 600 }}>
                  ALL PHOTOS
                </Typography>
                <Divider sx={{ flex: 1, borderColor: 'rgba(255,215,0,0.15)' }} />
              </Box>

              {/* Paginated Photo Grid */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                {pagedPhotos.map((photo) => (
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
                      height="200"
                      image={photo.url}
                      alt={isHindi ? photo.captionHi : photo.caption}
                      onClick={() => setLightbox(photo)}
                      sx={{ objectFit: 'cover' }}
                      onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }}
                    />
                    <CardContent sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', '&:last-child': { pb: 1.5 } }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255,215,0,0.8)', flex: 1 }} onClick={() => setLightbox(photo)}>
                        {isHindi ? photo.captionHi : photo.caption}
                      </Typography>
                      {isAdmin && (
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); deletePhoto(photo.id); }} sx={{ color: 'rgba(255,100,100,0.7)', '&:hover': { color: '#ff4444' } }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Box>

              {/* Photo Pagination */}
              {photoPageCount > 1 && (
                <Box sx={paginationSx}>
                  <Pagination
                    count={photoPageCount}
                    page={photoPage}
                    onChange={(_, v) => { setPhotoPage(v); window.scrollTo({ top: document.getElementById('gallery')?.offsetTop - 80, behavior: 'smooth' }); }}
                    variant="outlined"
                    shape="rounded"
                    size="large"
                  />
                </Box>
              )}
            </>
          )
        )}

        {/* ── Videos Tab ── */}
        {tab === 1 && (
          videos.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '3rem', mb: 2 }}>🎬</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>{t('gallery.noVideos')}</Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                {pagedVideos.map((video) => (
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

              {/* Video Pagination */}
              {videoPageCount > 1 && (
                <Box sx={paginationSx}>
                  <Pagination
                    count={videoPageCount}
                    page={videoPage}
                    onChange={(_, v) => { setVideoPage(v); window.scrollTo({ top: document.getElementById('gallery')?.offsetTop - 80, behavior: 'smooth' }); }}
                    variant="outlined"
                    shape="rounded"
                    size="large"
                  />
                </Box>
              )}
            </>
          )
        )}

      </Container>

      {/* Fullscreen video player */}
      {playingVideo && (
        <VideoDialog video={playingVideo} isHindi={isHindi} onClose={() => setPlayingVideo(null)} />
      )}

      {/* Photo Lightbox */}
      <Dialog
        open={Boolean(lightbox)}
        onClose={() => setLightbox(null)}
        maxWidth="lg"
        PaperProps={{ sx: { bgcolor: '#000', p: 0, borderRadius: 2, overflow: 'hidden' } }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton onClick={() => setLightbox(null)} sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.7)', color: '#fff', zIndex: 1, '&:hover': { bgcolor: 'rgba(0,0,0,0.9)' } }}>
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
