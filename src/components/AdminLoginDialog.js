import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

export default function AdminLoginDialog({ open, onClose }) {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    const success = login(username, password);
    if (success) {
      setError('');
      setUsername('');
      setPassword('');
      onClose();
      setTimeout(() => {
        const el = document.querySelector('#admin');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      setError(t('admin.loginError'));
    }
  };

  const handleClose = () => {
    setError('');
    setUsername('');
    setPassword('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          background: 'linear-gradient(135deg, #1a0000 0%, #2d0a0a 100%)',
          border: '1px solid rgba(255,215,0,0.3)',
          borderRadius: 3,
          color: '#fff',
          minWidth: { xs: '90vw', sm: 400 },
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <AdminPanelSettingsIcon sx={{ color: '#FFD700', fontSize: 48 }} />
          <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700 }}>
            {t('admin.loginTitle')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            Kamakhya Mandir Administration
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 4, pb: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2, bgcolor: 'rgba(211,47,47,0.15)', color: '#ff6b6b' }}>
            {error}
          </Alert>
        )}
        <TextField
          fullWidth
          label={t('admin.username')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': { borderColor: 'rgba(255,215,0,0.4)' },
              '&:hover fieldset': { borderColor: 'rgba(255,215,0,0.7)' },
              '&.Mui-focused fieldset': { borderColor: '#FFD700' },
            },
            '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.6)' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#FFD700' },
          }}
        />
        <TextField
          fullWidth
          label={t('admin.password')}
          type={showPass ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPass(!showPass)} sx={{ color: 'rgba(255,255,255,0.5)' }}>
                  {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': { borderColor: 'rgba(255,215,0,0.4)' },
              '&:hover fieldset': { borderColor: 'rgba(255,215,0,0.7)' },
              '&.Mui-focused fieldset': { borderColor: '#FFD700' },
            },
            '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.6)' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#FFD700' },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 3, gap: 1 }}>
        <Button
          onClick={handleClose}
          sx={{ color: 'rgba(255,255,255,0.6)', flex: 1 }}
        >
          {t('admin.cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            flex: 2,
            bgcolor: '#8B1A1A',
            color: '#FFD700',
            fontWeight: 700,
            '&:hover': { bgcolor: '#a52828' },
          }}
        >
          {t('admin.login')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
