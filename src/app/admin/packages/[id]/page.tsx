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
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Breadcrumbs,
  Link,
  Divider,
  Avatar,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Delete,
  LocationOn,
  Schedule,
  Person,
  Email,
  Phone,
  CalendarToday,
} from '@mui/icons-material';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

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
  registrations: Array<{
    _id: string;
    name: string;
    email: string;
    phone: string;
    registeredAt: string;
  }>;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export default function PackageView() {
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
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
        setPackageData(data.data);
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

  const deletePackage = async () => {
    if (!confirm('Are you sure you want to delete this package? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/packages/${packageId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        router.push('/admin/dashboard');
      } else {
        setError('Failed to delete package');
      }
    } catch (error) {
      console.error('Error deleting package:', error);
      setError('Failed to delete package');
    }
  };

  const getDescriptionHTML = (description: string) => {
    const htmlContent = marked.parse(description);
    return DOMPurify.sanitize(htmlContent as string);
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

  if (error || !packageData) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            {error || 'Package not found'}
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
        <Typography color="text.primary">
          {packageData.title}
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
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            startIcon={<Edit />}
            variant="contained"
            color="primary"
            onClick={() => router.push(`/admin/packages/${packageId}/edit`)}
          >
            Edit Package
          </Button>
          
          <Button
            startIcon={<Delete />}
            variant="outlined"
            color="error"
            onClick={deletePackage}
          >
            Delete Package
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Package Details */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              {packageData.title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="h6" color="text.secondary">
                {packageData.location}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Schedule sx={{ mr: 1, color: 'text.secondary' }} />
              <Chip
                label={`${packageData.days} Days / ${packageData.nights} Nights`}
                variant="outlined"
                color="primary"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Tags
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {packageData.tags.map((tag, index) => (
                  <Chip key={index} label={tag} variant="outlined" size="small" />
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Box
              sx={{ '& p': { mb: 2 }, '& ul': { mb: 2 }, '& ol': { mb: 2 } }}
              dangerouslySetInnerHTML={{
                __html: getDescriptionHTML(packageData.description)
              }}
            />
          </Paper>

          {/* Package Images */}
          {packageData.images && packageData.images.length > 0 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Images
              </Typography>
              <Grid container spacing={2}>
                {packageData.images.map((image, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="200"
                        image={image}
                        alt={`${packageData.title} - Image ${index + 1}`}
                        sx={{ objectFit: 'cover' }}
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}
        </Grid>

        {/* Sidebar - Package Info */}
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Package Info Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Package Information
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Created: {new Date(packageData.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Updated: {new Date(packageData.updatedAt).toLocaleDateString()}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Person sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">
                  {packageData.registrations.length} Registrations
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Registrations - Full Width at Bottom */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Registrations ({packageData.registrations.length})
        </Typography>
        
        {packageData.registrations.length === 0 ? (
          <Typography color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
            No registrations yet
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Registration Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {packageData.registrations.map((registration, index) => (
                  <TableRow key={registration._id || index}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 24, height: 24, mr: 1.5, bgcolor: 'primary.main', fontSize: 12 }}>
                          {registration.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="body2" fontWeight="medium">
                          {registration.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {registration.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {registration.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(registration.registeredAt).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
}