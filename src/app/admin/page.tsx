'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Lock, Eye, EyeOff, Sun, Moon } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, user } = useAuth();
  const { darkMode } = useTheme();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/admin/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await login(email, password);
    
    if (success) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }
    
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Theme Toggle Button */}
        <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
          <IconButton
            onClick={() => {
              const newMode = !darkMode;
              localStorage.setItem('darkMode', String(newMode));
              window.location.reload(); // Simple way to apply theme change
            }}
            sx={{
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                bgcolor: 'action.hover',
              }
            }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>
        </Box>

        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Box sx={{ 
            m: 1, 
            bgcolor: 'rgba(96, 165, 250, 0.15)', 
            width: 64, 
            height: 64, 
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#60a5fa',
            border: '1px solid rgba(96, 165, 250, 0.3)'
          }}>
            <Lock size={32} />
          </Box>
          
          <Typography component="h1" variant="h4" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
            Admin Login
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Access your admin dashboard
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@globetrotters.com"
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ 
                mt: 3, 
                mb: 2,
                bgcolor: '#60a5fa',
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#3b82f6'
                },
                '&:disabled': {
                  bgcolor: 'rgba(96, 165, 250, 0.3)'
                }
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </Box>

          <Paper 
            variant="outlined" 
            sx={{ p: 2, mt: 2, width: '100%' }}
          >
            <Typography variant="body2" color="text.secondary" align="center">
              <strong>Demo credentials:</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Email: admin@globetrotters.com
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Password: admin123
            </Typography>
          </Paper>
        </Paper>
      </Box>
    </Container>
  );
}