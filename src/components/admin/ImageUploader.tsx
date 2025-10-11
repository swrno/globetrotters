'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  Grid,
  CircularProgress,
  Alert,
  LinearProgress,
  Card,
  CardMedia,
  CardActions,
} from '@mui/material';
import {
  CloudUpload,
  Delete,
  Image as ImageIcon,
} from '@mui/icons-material';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUploader({ images, onChange, maxImages = 10 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState('');

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed the max
    if (images.length + files.length > maxImages) {
      setError(`You can only upload up to ${maxImages} images`);
      return;
    }

    setUploading(true);
    setError('');
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Update progress
        setUploadProgress(Math.round(((i) / files.length) * 100));

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          uploadedUrls.push(result.data.url);
        } else {
          throw new Error(result.error || 'Failed to upload image');
        }
      }

      // Update parent component with new images
      onChange([...images, ...uploadedUrls]);
      setUploadProgress(100);
      
      // Reset progress after a short delay
      setTimeout(() => {
        setUploadProgress(null);
      }, 1000);
    } catch (err) {
      console.error('Error uploading images:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload images');
    } finally {
      setUploading(false);
      // Reset file input
      e.target.value = '';
    }
  };

  const handleDelete = async (imageUrl: string, index: number) => {
    try {
      // Call delete API
      const response = await fetch('/api/upload/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Remove from local state
        const newImages = images.filter((_, i) => i !== index);
        onChange(newImages);
      } else {
        setError(result.error || 'Failed to delete image');
      }
    } catch (err) {
      console.error('Error deleting image:', err);
      setError('Failed to delete image');
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle2">
          Package Images ({images.length}/{maxImages})
        </Typography>
        
        <Button
          component="label"
          variant="contained"
          startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : <CloudUpload />}
          disabled={uploading || images.length >= maxImages}
        >
          {uploading ? 'Uploading...' : 'Upload Images'}
          <input
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            disabled={uploading || images.length >= maxImages}
          />
        </Button>
      </Box>

      {uploadProgress !== null && (
        <Box sx={{ mb: 2 }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
            Uploading... {uploadProgress}%
          </Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {images.length === 0 ? (
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            border: '2px dashed',
            borderColor: 'divider',
            bgcolor: 'background.default',
          }}
        >
          <ImageIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="body1" color="text.secondary" gutterBottom>
            No images uploaded yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Click &quot;Upload Images&quot; to add package photos
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {images.map((imageUrl, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={imageUrl}
                  alt={`Package image ${index + 1}`}
                  sx={{ objectFit: 'cover' }}
                />
                <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Image {index + 1}
                  </Typography>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(imageUrl, index)}
                    title="Delete image"
                  >
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
        Upload high-quality images for the package. Supported formats: JPG, PNG, WebP. 
        Images are automatically stored in Cloudinary.
      </Typography>
    </Box>
  );
}
