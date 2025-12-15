'use client';

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
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import ImageUploader from '../../../../../components/admin/ImageUploader';

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
    trip_highlight: '',
    itinerary_description: '',
    itinerary_details: `Day 1: Arrival in Shimla
- Arrive in Shimla and check into hotel
- Evening stroll on Mall Road
---
Day 2: Shimla Sightseeing
- Visit Jakhu Temple
- Explore local markets
---
Day 3: Departure
- Check out from hotel
- Departure to home`,
    inclusions: '',
    exclusions: '',
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
        
        // Convert trip_highlight object to string format with ## headings
        const tripHighlightStr = Object.entries(pkg.trip_highlight || {})
          .map(([key, value]) => `## ${key}\n${value}`)
          .join('\n\n');
        
        // Convert itinerary details to string format
        const itineraryDetailsStr = Object.entries(pkg.itinerary?.details || {})
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n---\n');
        
        setFormData({
          location: pkg.location,
          title: pkg.title,
          description: pkg.description,
          tags: pkg.tags.join(', '),
          category: pkg.category || 'domestic',
          days: pkg.days.toString(),
          nights: pkg.nights.toString(),
          cost_per_person: pkg.cost_per_person?.toString() || '',
          best_time_to_visit: pkg.best_time_to_visit || '',
          video_url: pkg.video_url || '',
          trip_highlight: tripHighlightStr,
          itinerary_description: pkg.itinerary?.description || '',
          itinerary_details: itineraryDetailsStr,
          inclusions: pkg.inclusions_exclusions?.inclusions?.join('\n') || '',
          exclusions: pkg.inclusions_exclusions?.exclusions?.join('\n') || '',
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
      // Parse trip highlights - split by ## headings
      const tripHighlight: Record<string, string> = {};
      if (formData.trip_highlight.trim()) {
        // Split by ## heading markers to get sections
        const sections = formData.trip_highlight.split(/^##\s+/m).filter(s => s.trim());
        sections.forEach((section) => {
          const lines = section.split('\n');
          const key = lines[0].trim(); // First line is the category name
          const value = lines.slice(1).join('\n').trim(); // Rest is the content
          if (key && value) {
            tripHighlight[key] = value;
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
          inclusions: formData.inclusions.split('\n').map(item => item.trim()).filter(item => item),
          exclusions: formData.exclusions.split('\n').map(item => item.trim()).filter(item => item)
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
                <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
                  Description *
                </Typography>
                <Paper sx={{ border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
                  <MDEditor
                    value={formData.description}
                    onChange={(value?: string) => {
                      setFormData(prev => ({
                        ...prev,
                        description: value || ''
                      }));
                    }}
                    preview="edit"
                    height={350}
                    data-color-mode="light"
                    textareaProps={{
                      placeholder: 'Enter package description in markdown format...\n\n## Example:\n\n**Explore the magnificent beauty** of this destination with our comprehensive package.\n\n### Highlights\n- Amazing scenic views\n- Cultural experiences\n- Adventure activities\n\n> This trip offers unforgettable memories and experiences that will last a lifetime.',
                      style: { fontSize: '14px', lineHeight: '1.5' }
                    }}
                    style={{
                      backgroundColor: '#fafafa'
                    }}
                  />
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Detailed description of the package. Use Markdown for formatting: **bold**, *italic*, ## headings, - lists, {'>'}quotes, etc.
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
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
                  Trip Highlights
                </Typography>
                <Paper sx={{ border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
                  <MDEditor
                    value={formData.trip_highlight}
                    onChange={(value?: string) => {
                      setFormData(prev => ({
                        ...prev,
                        trip_highlight: value || ''
                      }));
                    }}
                    preview="edit"
                    height={350}
                    data-color-mode="light"
                    textareaProps={{
                      placeholder: '## Scenic Landscapes\n• Rohtang Pass at 3,978 meters with breathtaking views\n• Pine forests and alpine meadows\n• Snow-capped mountain peaks\n\n## Adventure Activities\n1. Paragliding experiences\n2. Skiing and snowboarding\n3. Trekking trails\n\n## Cultural Landmarks\nVisit ancient temples and local heritage sites\n\nExplore vibrant local markets and traditions',
                      style: { fontSize: '14px', lineHeight: '1.5' }
                    }}
                    style={{
                      backgroundColor: '#fafafa'
                    }}
                  />
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Format: Use ## for category headings, then use bullet points (•, -, *), numbered lists (1. 2. 3.), or paragraphs for content. Supports markdown formatting.
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
                  Itinerary Description
                </Typography>
                <Paper sx={{ border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
                  <MDEditor
                    value={formData.itinerary_description}
                    onChange={(value?: string) => {
                      setFormData(prev => ({
                        ...prev,
                        itinerary_description: value || ''
                      }));
                    }}
                    preview="edit"
                    height={200}
                    data-color-mode="light"
                    textareaProps={{
                      placeholder: 'A detailed overview of the trip itinerary...\n\nExample: **Himachal Pradesh**, known as \'Dev Bhoomi\' (Land of Gods), is a paradise in the Himalayas, offering serene landscapes, vibrant culture, and thrilling adventures.',
                      style: { fontSize: '14px', lineHeight: '1.5' }
                    }}
                    style={{
                      backgroundColor: '#fafafa'
                    }}
                  />
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  General description of the itinerary with markdown formatting support.
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
                  Itinerary Details
                </Typography>
                <Paper sx={{ border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
                  <MDEditor
                    value={formData.itinerary_details}
                    onChange={(value?: string) => {
                      setFormData(prev => ({
                        ...prev,
                        itinerary_details: value || ''
                      }));
                    }}
                    preview="edit"
                    height={300}
                    data-color-mode="light"
                    textareaProps={{
                      placeholder: 'Enter detailed itinerary with markdown formatting:\n\n**Day 1: Arrival in Shimla**\n\n- Arrive in Shimla and check into hotel\n- Evening stroll on Mall Road\n\n---\n\n**Day 2: Shimla Sightseeing**\n\n- Visit Jakhu Temple\n- Explore local markets\n\n---\n\n**Day 3: Departure**\n\n- Check out from hotel\n- Departure to home',
                      style: { fontSize: '14px', lineHeight: '1.5' }
                    }}
                    style={{
                      backgroundColor: '#fafafa'
                    }}
                  />
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Enter itinerary as **Day X: Title** followed by details, separate days with --- (horizontal rule).
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
                  Inclusions
                </Typography>
                <Paper sx={{ border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
                  <MDEditor
                    value={formData.inclusions}
                    onChange={(value?: string) => {
                      setFormData(prev => ({
                        ...prev,
                        inclusions: value || ''
                      }));
                    }}
                    preview="edit"
                    height={250}
                    data-color-mode="light"
                    textareaProps={{
                      placeholder: 'Enter inclusions with markdown formatting:\n\n- **Accommodation** for 5 nights (double sharing basis)\n- **Daily breakfast and dinner**\n- **Local transportation**\n- **Professional guide services**\n- All permit fees\n- Travel insurance',
                      style: { fontSize: '14px', lineHeight: '1.5' }
                    }}
                    style={{
                      backgroundColor: '#fafafa'
                    }}
                  />
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Enter inclusions with markdown formatting. Use bullet points and **bold** for emphasis.
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
                  Exclusions
                </Typography>
                <Paper sx={{ border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
                  <MDEditor
                    value={formData.exclusions}
                    onChange={(value?: string) => {
                      setFormData(prev => ({
                        ...prev,
                        exclusions: value || ''
                      }));
                    }}
                    preview="edit"
                    height={250}
                    data-color-mode="light"
                    textareaProps={{
                      placeholder: 'Enter exclusions with markdown formatting:\n\n- **Airfare or train fare**\n- Personal expenses\n- Additional meals not mentioned\n- Tips and gratuities\n- Adventure activity charges\n- Emergency evacuation',
                      style: { fontSize: '14px', lineHeight: '1.5' }
                    }}
                    style={{
                      backgroundColor: '#fafafa'
                    }}
                  />
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Enter exclusions with markdown formatting. Use bullet points and **bold** for emphasis.
                </Typography>
              </Box>
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