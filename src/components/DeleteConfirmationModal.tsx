'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  message?: string;
  itemName?: string;
  loading?: boolean;
}

export default function DeleteConfirmationModal({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Delete',
  message = 'This action cannot be undone. Please type "CONFIRM DELETE" to proceed.',
  itemName,
  loading = false,
}: DeleteConfirmationModalProps) {
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    if (!loading) {
      setConfirmText('');
      setError('');
      onClose();
    }
  };

  const handleConfirm = async () => {
    if (confirmText !== 'CONFIRM DELETE') {
      setError('Please type "CONFIRM DELETE" exactly as shown');
      return;
    }

    setError('');
    try {
      await onConfirm();
      setConfirmText('');
      onClose();
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && confirmText === 'CONFIRM DELETE') {
      handleConfirm();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ 
          bgcolor: 'error.main', 
          borderRadius: 1, 
          p: 0.5, 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <AlertTriangle size={24} color="white" />
        </Box>
        {title}
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          {itemName && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              You are about to delete: <strong>{itemName}</strong>
            </Alert>
          )}
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            {message}
          </Typography>
          
          <TextField
            fullWidth
            label='Type "CONFIRM DELETE" to proceed'
            value={confirmText}
            onChange={(e) => {
              setConfirmText(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            error={!!error}
            helperText={error}
            disabled={loading}
            autoFocus
            placeholder="CONFIRM DELETE"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: confirmText === 'CONFIRM DELETE' ? 'success.main' : 'error.main',
                  borderWidth: 2,
                }
              }
            }}
          />
          
          <Box sx={{ 
            mt: 2, 
            p: 1.5, 
            bgcolor: 'error.50', 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'error.main'
          }}>
            <Typography variant="caption" color="error.main" fontWeight="bold">
              ⚠️ WARNING: This action is permanent and cannot be undone!
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button 
          onClick={handleClose} 
          disabled={loading}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={confirmText !== 'CONFIRM DELETE' || loading}
          variant="contained"
          color="error"
          sx={{ 
            bgcolor: 'error.main',
            '&:hover': { bgcolor: 'error.dark' },
            '&.Mui-disabled': {
              bgcolor: 'action.disabledBackground',
              color: 'action.disabled'
            }
          }}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
