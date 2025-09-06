'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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

interface Package {
  _id: string;
  id: string;
  location: string;
  title: string;
  description: string;
  tags: string[];
  days: number;
  nights: number;
  cost_per_person: number;
  trip_highlight: Record<string, string>;
  itinerary: {
    description: string;
    details: {
      [key: string]: string;
    };
  };
  inclusions_exclusions: {
    dos: string[];
    donts: string[];
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
    days: '',
    nights: '',
    cost_per_person: '',
    images: '',
    trip_highlight: '',
    itinerary_description: '',
    itinerary_details: '',
    inclusions: '',
    exclusions: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const packageId = params.id as string;

  useEffect(() => {
    if (!user) {
      router.push('/admin');
      return;
    }
    
    fetchPackage();
  }, [user, router, packageId]);

  const fetchPackage = async () => {
    try {
      const response = await fetch(`/api/packages/${packageId}`);
      const data = await response.json();
      
      if (data.success) {
        const pkg = data.data;
        setPackageData(pkg);
        
        // Convert trip_highlight object to string format
        const tripHighlightStr = Object.entries(pkg.trip_highlight || {})
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n');
        
        // Convert itinerary details to string format
        const itineraryDetailsStr = Object.entries(pkg.itinerary?.details || {})
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n---\n');
        
        setFormData({
          location: pkg.location,
          title: pkg.title,
          description: pkg.description,
          tags: pkg.tags.join(', '),
          days: pkg.days.toString(),
          nights: pkg.nights.toString(),
          cost_per_person: pkg.cost_per_person?.toString() || '',
          images: pkg.images.join(', '),
          trip_highlight: tripHighlightStr,
          itinerary_description: pkg.itinerary?.description || '',
          itinerary_details: itineraryDetailsStr,
          inclusions: pkg.inclusions_exclusions?.dos?.join('\n') || '',
          exclusions: pkg.inclusions_exclusions?.donts?.join('\n') || '',
        });
      } else {
        setError('Package not found');
      }
    } catch (error) {
      console.error('Error fetching package:', error);
      setError('Failed to load package');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

      const response = await fetch(`/api/packages/${packageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(packageData),
      });

      const data = await response.json();

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
        <Link
          color="inherit"
          href={`/admin/packages/${packageId}`}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/admin/packages/${packageId}`);
          }}
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          {packageData?.title}
        </Link>
        <Typography color="text.primary">
          Edit
        </Typography>
      </Breadcrumbs>

      {/* Header Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push(`/admin/packages/${packageId}`)}
          variant="outlined"
        >
          Back to Package
        </Button>
        
        <Typography variant="h4" component="h1">
          Edit Package
        </Typography>
        
        <Box /> {/* Spacer */}
      </Box>

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