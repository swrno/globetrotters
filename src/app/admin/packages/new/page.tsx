'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../contexts/AuthContext';
import PageHeader from '../../../../components/PageHeader';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  CircularProgress,
  Grid,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  ArrowBack,
  Save,
  Cancel,
  Add,
} from '@mui/icons-material';
import RichTextEditor from '../../../../components/admin/RichTextEditor';
import ImageUploader from '../../../../components/admin/ImageUploader';
import DynamicSectionEditor, { SectionItem } from '../../../../components/admin/DynamicSectionEditor';
import DynamicListEditor from '../../../../components/admin/DynamicListEditor';

export default function NewPackage() {
  const [formData, setFormData] = useState({
    location: '',
    title: '',
    description: '',
    tags: '',
    category: 'domestic',
    days: '',
    nights: '',
    cost_per_person: '',
    best_time_to_visit: '',
    video_url: '',
    trip_highlight: [] as SectionItem[],
    itinerary_description: '',
    itinerary_details: [] as SectionItem[],
    inclusions: [] as string[],
    exclusions: [] as string[],
  });
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { user } = useAuth();
  const router = useRouter();

  if (typeof window !== 'undefined' && !user) {
    router.push('/admin');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
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
      formData.trip_highlight.forEach(item => {
        if (item.title && item.description) {
          tripHighlight[item.title] = item.description;
        }
      });

      // Parse itinerary details
      const itineraryDetails: Record<string, string> = {};
      formData.itinerary_details.forEach(item => {
        if (item.title && item.description) {
          itineraryDetails[item.title] = item.description;
        }
      });

      const packageData = {
        location: formData.location,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        days: parseInt(formData.days),
        nights: parseInt(formData.nights),
        cost_per_person: parseFloat(formData.cost_per_person) || 0,
        best_time_to_visit: formData.best_time_to_visit || 'All Year Round',
        video_url: formData.video_url || undefined,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        images: images,
        trip_highlight: tripHighlight,
        itinerary: {
          description: formData.itinerary_description,
          details: itineraryDetails
        },
        inclusions_exclusions: {
          inclusions: formData.inclusions.filter(item => item.trim()),
          exclusions: formData.exclusions.filter(item => item.trim())
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
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Page Header */}
      <PageHeader
        breadcrumbs={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'Packages', href: '/admin/packages' },
          { label: 'Create New Package' }
        ]}
        title="Create New Package"
        description="Fill in the details below to create a new travel package. All fields marked with * are required."
      />

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
              <Box sx={{ mb: 2 }}>
                <RichTextEditor
                    value={formData.description}
                    onChange={(value: string) => {
                      setFormData(prev => ({
                        ...prev,
                        description: value || ''
                      }));
                    }}
                    label="Description *"
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Detailed description of the package.
                  </Typography>
                </Box>
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
              <FormControl fullWidth>
                <InputLabel>Package Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Package Category"
                >
                  <MenuItem value="domestic">Domestic</MenuItem>
                  <MenuItem value="international">International</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Select whether this is a domestic or international package
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <ImageUploader
                images={images}
                onChange={setImages}
                maxImages={10}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <DynamicSectionEditor
                items={formData.trip_highlight}
                onChange={(items) => setFormData(prev => ({ ...prev, trip_highlight: items }))}
                titleLabel="Highlight Title"
                descriptionLabel="Highlight Description"
                sectionTitle="Trip Highlights"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box sx={{ mb: 2 }}>
                <RichTextEditor
                    value={formData.itinerary_description}
                    onChange={(value: string) => {
                      setFormData(prev => ({
                        ...prev,
                        itinerary_description: value || ''
                      }));
                    }}
                    label="Itinerary Description"
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    General description of the itinerary.
                  </Typography>
                </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <DynamicSectionEditor
                items={formData.itinerary_details}
                onChange={(items) => setFormData(prev => ({ ...prev, itinerary_details: items }))}
                titleLabel="Day Title (e.g., Day 1: Arrival)"
                descriptionLabel="Day Description"
                sectionTitle="Itinerary Details"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <DynamicListEditor
                items={formData.inclusions}
                onChange={(items) => setFormData(prev => ({ ...prev, inclusions: items }))}
                label="Inclusion"
                sectionTitle="Inclusions"
                placeholder="e.g., Accommodation"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <DynamicListEditor
                items={formData.exclusions}
                onChange={(items) => setFormData(prev => ({ ...prev, exclusions: items }))}
                label="Exclusion"
                sectionTitle="Exclusions"
                placeholder="e.g., Airfare"
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