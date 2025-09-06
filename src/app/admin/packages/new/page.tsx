'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  CircularProgress,
  Breadcrumbs,
  Link,
  Grid,
  Alert,
} from '@mui/material';
import {
  ArrowBack,
  Save,
  Cancel,
  Add,
} from '@mui/icons-material';

export default function NewPackage() {
  const [formData, setFormData] = useState({
    location: '',
    title: '',
    description: '',
    tags: '',
    days: '',
    nights: '',
    cost_per_person: '',
    best_time_to_visit: '',
    video_url: '',
    images: '',
    trip_highlight: '',
    itinerary_description: '',
    itinerary_details: '',
    inclusions: '',
    exclusions: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { user } = useAuth();
  const router = useRouter();

  if (typeof window !== 'undefined' && !user) {
    router.push('/admin');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Parse trip highlights
      const tripHighlight: Record<string, string> = {};
      if (formData.trip_highlight.trim()) {
        const highlights = formData.trip_highlight.split('\n');
        highlights.forEach((highlight, index) => {
          if (highlight.trim()) {
            const [key, ...valueParts] = highlight.split(':');
            if (key && valueParts.length > 0) {
              tripHighlight[key.trim()] = valueParts.join(':').trim();
            }
          }
        });
      }

      // Parse itinerary details
      const itineraryDetails: Record<string, string> = {};
      if (formData.itinerary_details.trim()) {
        const details = formData.itinerary_details.split('\n---\n');
        details.forEach((detail, index) => {
          if (detail.trim()) {
            const [key, ...valueParts] = detail.split(':');
            if (key && valueParts.length > 0) {
              itineraryDetails[key.trim()] = valueParts.join(':').trim();
            }
          }
        });
      }

      const packageData = {
        location: formData.location,
        title: formData.title,
        description: formData.description,
        days: parseInt(formData.days),
        nights: parseInt(formData.nights),
        cost_per_person: parseFloat(formData.cost_per_person) || 0,
        best_time_to_visit: formData.best_time_to_visit || 'All Year Round',
        video_url: formData.video_url || undefined,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        images: formData.images.split(',').map(img => img.trim()).filter(img => img),
        trip_highlight: tripHighlight,
        itinerary: {
          description: formData.itinerary_description,
          details: itineraryDetails
        },
        inclusions_exclusions: {
          dos: formData.inclusions.split('\n').map(item => item.trim()).filter(item => item),
          donts: formData.exclusions.split('\n').map(item => item.trim()).filter(item => item)
        }
      };

      const response = await fetch('/api/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(packageData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1500);
      } else {
        setError(data.error || 'Failed to create package');
      }
    } catch (error) {
      setError('An error occurred while creating the package');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          color="inherit"
          href="/admin/dashboard"
          onClick={(e) => {
            e.preventDefault();
            router.push('/admin/dashboard');
          }}
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          Admin Dashboard
        </Link>
        <Typography color="text.primary">
          New Package
        </Typography>
      </Breadcrumbs>

      {/* Header Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push('/admin/dashboard')}
          variant="outlined"
        >
          Back to Dashboard
        </Button>
        
        <Typography variant="h4" component="h1">
          Create New Package
        </Typography>
        
        <Box /> {/* Spacer */}
      </Box>

      {/* Form */}
      <Paper sx={{ p: 4 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Package created successfully! Redirecting to dashboard...
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g., Manali, Himachal Pradesh"
                helperText="The destination location for this package"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Package Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Manali Adventure Package"
                helperText="The main title of the travel package"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Days"
                name="days"
                type="number"
                value={formData.days}
                onChange={handleChange}
                required
                inputProps={{ min: 1 }}
                helperText="Number of days for the trip"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Nights"
                name="nights"
                type="number"
                value={formData.nights}
                onChange={handleChange}
                required
                inputProps={{ min: 0 }}
                helperText="Number of nights for the trip"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Cost Per Person"
                name="cost_per_person"
                type="number"
                value={formData.cost_per_person}
                onChange={handleChange}
                inputProps={{ min: 0, step: 100 }}
                helperText="Cost per person in INR (optional)"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Best Time To Visit"
                name="best_time_to_visit"
                value={formData.best_time_to_visit}
                onChange={handleChange}
                placeholder="e.g., APR - MAY, Winter Season, All Year Round"
                helperText="Best season or months to visit this destination"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Video URL"
                name="video_url"
                value={formData.video_url}
                onChange={handleChange}
                placeholder="https://example.com/video.mp4 or /videos/package-video.mp4"
                helperText="Optional video URL for the overview section (supports MP4, YouTube, etc.)"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={8}
                placeholder="Enter package description in markdown format..."
                helperText="Detailed description of the package (Markdown supported)"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="adventure, mountains, trekking, snow"
                helperText="Comma-separated tags to categorize the package"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Image URLs"
                name="images"
                value={formData.images}
                onChange={handleChange}
                placeholder="/manali1.jpg, /manali2.jpg, /manali3.jpg"
                helperText="Comma-separated image URLs for the package"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Trip Highlights"
                name="trip_highlight"
                value={formData.trip_highlight}
                onChange={handleChange}
                multiline
                rows={6}
                placeholder={`Scenic Landscapes: Rohtang Pass, a stunning mountain pass at 3,978 meters, known for its breathtaking views
Adventure Activities: Paragliding, skiing, and snowboarding experiences
Cultural Landmarks: Ancient temples and local heritage sites
Natural Attractions: Beautiful valleys and pristine lakes`}
                helperText="Enter highlights as 'Key: Description' format, one per line"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Itinerary Description"
                name="itinerary_description"
                value={formData.itinerary_description}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="A detailed overview of the trip itinerary..."
                helperText="General description of the itinerary"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Itinerary Details"
                name="itinerary_details"
                value={formData.itinerary_details}
                onChange={handleChange}
                multiline
                rows={8}
                placeholder={`Day 1: Arrival in Shimla
- Arrive in Shimla and check into hotel
- Evening stroll on Mall Road
---
Day 2: Shimla Sightseeing
- Visit Jakhu Temple
- Explore local markets
---
Day 3: Departure
- Check out from hotel
- Departure to home`}
                helperText="Enter itinerary as 'Day X: Title' followed by details, separate days with '---'"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Inclusions"
                name="inclusions"
                value={formData.inclusions}
                onChange={handleChange}
                multiline
                rows={6}
                placeholder={`Accommodation for 5 nights (double sharing basis)
Daily breakfast and dinner
Local transportation
Professional guide services
All permit fees
Travel insurance`}
                helperText="Enter inclusions, one per line"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Exclusions"
                name="exclusions"
                value={formData.exclusions}
                onChange={handleChange}
                multiline
                rows={6}
                placeholder={`Airfare or train fare
Personal expenses
Additional meals not mentioned
Tips and gratuities
Adventure activity charges
Emergency evacuation`}
                helperText="Enter exclusions, one per line"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={() => router.push('/admin/dashboard')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} /> : <Add />}
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Package'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}