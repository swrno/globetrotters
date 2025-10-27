'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/PageHeader';
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
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import ImageUploader from '@/components/admin/ImageUploader';

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
    trip_highlight: '',
    itinerary_description: '',
    itinerary_details: '',
    inclusions: '',
    exclusions: '',
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
                      placeholder: '**Day 1: Arrival in Shimla**\n- Arrive in Shimla and check into hotel\n- Evening stroll on Mall Road\n\n---\n\n**Day 2: Shimla Sightseeing**\n\n- Visit Jakhu Temple\n- Explore local markets\n\n---\n\n**Day 3: Departure**\n\n- Check out from hotel\n- Departure to home',
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