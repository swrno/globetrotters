'use client';

import { marked } from 'marked';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '../../../../../contexts/AuthContext';
import PageHeader from '../../../../../components/PageHeader';
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
  Chip,
} from '@mui/material';
import {
  ArrowBack,
  Save,
  Cancel,
} from '@mui/icons-material';
import ImageUploader from '../../../../../components/admin/ImageUploader';
import DynamicSectionEditor, { SectionItem } from '../../../../../components/admin/DynamicSectionEditor';
import DynamicListEditor from '../../../../../components/admin/DynamicListEditor';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('../../../../../components/admin/RichTextEditor'), { ssr: false });

interface Package {
  _id: string;
  id: string;
  location: string;
  title: string;
  description: string;
  tags: string[];
  category: 'domestic' | 'international';
  days: number;
  nights: number;
  cost_per_person: number;
  best_time_to_visit: string;
  video_url?: string;
  trip_highlight: Record<string, string>;
  itinerary: {
    description: string;
    details: {
      [key: string]: string;
    };
  };
  inclusions_exclusions: {
    inclusions: string[];
    exclusions: string[];
  };
  registrations: any[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export default function EditPackage() {
  const [packageData, setPackageData] = useState<Package | null>(null);
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const packageId = params.id as string;

  const fetchPackage = useCallback(async () => {
    try {
      const response = await fetch(`/api/packages/${packageId}`);
      const data = await response.json();
      
      if (data.success) {
        const pkg = data.data;
        setPackageData(pkg);
        
        // Convert trip_highlight object to array
        const tripHighlightArray = Object.entries(pkg.trip_highlight || {})
          .map(([title, description]) => ({ title, description: description ? (marked.parse(description as string) as string) : '' }));
        
        // Convert itinerary details to array
        const itineraryDetailsArray = Object.entries(pkg.itinerary?.details || {})
          .map(([title, description]) => ({ title, description: description ? (marked.parse(description as string) as string) : '' }));
        
        setFormData({
          location: pkg.location,
          title: pkg.title,
          description: pkg.description ? (marked.parse(pkg.description) as string) : '',
          tags: pkg.tags.join(', '),
          category: pkg.category || 'domestic',
          days: pkg.days.toString(),
          nights: pkg.nights.toString(),
          cost_per_person: pkg.cost_per_person?.toString() || '',
          best_time_to_visit: pkg.best_time_to_visit || '',
          video_url: pkg.video_url || '',
          trip_highlight: tripHighlightArray,
          itinerary_description: pkg.itinerary?.description ? (marked.parse(pkg.itinerary.description) as string) : '',
          itinerary_details: itineraryDetailsArray,
          inclusions: pkg.inclusions_exclusions?.inclusions || [],
          exclusions: pkg.inclusions_exclusions?.exclusions || [],
        });
        
        // Set images separately
        setImages(pkg.images || []);
      } else {
        setError('Package not found');
      }
    } catch (error) {
      console.error('Error fetching package:', error);
      setError('Failed to load package');
    } finally {
      setLoading(false);
    }
  }, [packageId]);

  useEffect(() => {
    if (!user) {
      router.push('/admin');
      return;
    }
    
    fetchPackage();
  }, [user, router, packageId, fetchPackage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
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

      const response = await fetch(`/api/packages/${packageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(packageData),
      });

      const data = await response.json();

      console.log('Server response:', data);

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push(`/admin/packages/${packageId}`);
        }, 1500);
      } else {
        setError(data.error || 'Failed to update package');
      }
    } catch (error) {
      console.error('Error updating package:', error);
      setError('An error occurred while updating the package');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error && !packageData) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push('/admin/dashboard')}
            sx={{ mt: 2 }}
          >
            Back to Dashboard
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <PageHeader
        breadcrumbs={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'Packages', href: '/admin/packages' },
          { label: 'Edit Package' }
        ]}
        title="Edit Package"
        description="Update package details below. Changes will be saved to the database."
      />

      {/* Form */}
      <Paper sx={{ p: 4 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Package updated successfully! Redirecting...
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
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '12px 14px',
                  },
                }}
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
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '12px 14px',
                  },
                }}
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
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '12px 14px',
                  },
                }}
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
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '12px 14px',
                  },
                }}
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
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '12px 14px',
                  },
                }}
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
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '12px 14px',
                  },
                }}
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
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '12px 14px',
                  },
                }}
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
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '12px 14px',
                  },
                }}
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

            {packageData && (
              <Grid size={{ xs: 12 }}>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Package Statistics
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created: {new Date(packageData.createdAt).toLocaleDateString()} | 
                    Registrations: {packageData.registrations.length} | 
                    Last Updated: {new Date(packageData.updatedAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>
            )}

            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={() => router.push(`/admin/packages/${packageId}`)}
                  disabled={saving}
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={saving ? <CircularProgress size={20} /> : <Save />}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}