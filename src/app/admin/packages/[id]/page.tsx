'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
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
  best_time_to_visit?: string;
  video_url?: string;
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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const packageId = params.id as string;

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

  useEffect(() => {
    if (!user) {
      router.push('/admin');
      return;
    }
    
    fetchPackage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router, packageId]);

  const deletePackage = async () => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/packages/${packageId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        router.push('/admin/packages');
      } else {
        setError('Failed to delete package');
      }
    } catch (error) {
      console.error('Error deleting package:', error);
      setError('Failed to delete package');
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deletePackage();
    setDeleteModalOpen(false);
  };

  const getDescriptionHTML = (description: string) => {
    const htmlContent = marked.parse(description);
    return DOMPurify.sanitize(htmlContent as string);
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return url;
    
    // YouTube URL patterns
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    
    if (match && match[1]) {
      // Convert to embed URL
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    // If already an embed URL or other video platform, return as is
    return url;
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
    <>
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
            onClick={handleDeleteClick}
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

            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Schedule sx={{ mr: 1, color: 'text.secondary' }} />
                <Chip
                  label={`${packageData.days} Days / ${packageData.nights} Nights`}
                  variant="outlined"
                  color="primary"
                />
              </Box>
              
              <Chip
                label={`₹${packageData.cost_per_person.toLocaleString()} per person`}
                variant="filled"
                color="success"
                sx={{ fontWeight: 'bold' }}
              />
              
              {packageData.best_time_to_visit && (
                <Chip
                  label={`Best Time: ${packageData.best_time_to_visit}`}
                  variant="outlined"
                  color="info"
                />
              )}
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

            {/* Video URL */}
            {packageData.video_url && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                  Overview Video
                </Typography>
                <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                  <iframe
                    src={getEmbedUrl(packageData.video_url)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      borderRadius: '8px'
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Box>
              </>
            )}

            {/* Trip Highlights */}
            {packageData.trip_highlight && Object.keys(packageData.trip_highlight).length > 0 && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                  Trip Highlights
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {Object.entries(packageData.trip_highlight).map(([key, value], index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                        {key.replace(/_/g, ' ').toUpperCase()}
                      </Typography>
                      <Box
                        sx={{ '& p': { mb: 1 }, '& ul': { mb: 1, pl: 3 } }}
                        dangerouslySetInnerHTML={{
                          __html: getDescriptionHTML(value)
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </>
            )}

            {/* Itinerary */}
            {packageData.itinerary && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                  Itinerary
                </Typography>
                {packageData.itinerary.description && (
                  <Box
                    sx={{ mb: 2, '& p': { mb: 1 } }}
                    dangerouslySetInnerHTML={{
                      __html: getDescriptionHTML(packageData.itinerary.description)
                    }}
                  />
                )}
                {packageData.itinerary.details && Object.keys(packageData.itinerary.details).length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    {Object.entries(packageData.itinerary.details).map(([day, details], index) => (
                      <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
                        <Typography variant="subtitle1" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                          {day.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Typography>
                        <Box
                          sx={{ '& p': { mb: 1 }, '& ul': { mb: 1, pl: 3 } }}
                          dangerouslySetInnerHTML={{
                            __html: getDescriptionHTML(details)
                          }}
                        />
                      </Paper>
                    ))}
                  </Box>
                )}
              </>
            )}

            {/* Inclusions & Exclusions */}
            {packageData.inclusions_exclusions && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                  Inclusions & Exclusions
                </Typography>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  {packageData.inclusions_exclusions.dos && packageData.inclusions_exclusions.dos.length > 0 && (
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Paper sx={{ p: 2, bgcolor: 'success.50', borderLeft: '4px solid', borderColor: 'success.main' }}>
                        <Typography variant="subtitle1" fontWeight="bold" color="success.main" sx={{ mb: 1 }}>
                          ✓ Included
                        </Typography>
                        <Box component="ul" sx={{ m: 0, pl: 3 }}>
                          {packageData.inclusions_exclusions.dos.map((item, index) => (
                            <li key={index}>
                              <Typography variant="body2">{item}</Typography>
                            </li>
                          ))}
                        </Box>
                      </Paper>
                    </Grid>
                  )}
                  {packageData.inclusions_exclusions.donts && packageData.inclusions_exclusions.donts.length > 0 && (
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Paper sx={{ p: 2, bgcolor: 'error.50', borderLeft: '4px solid', borderColor: 'error.main' }}>
                        <Typography variant="subtitle1" fontWeight="bold" color="error.main" sx={{ mb: 1 }}>
                          ✗ Not Included
                        </Typography>
                        <Box component="ul" sx={{ m: 0, pl: 3 }}>
                          {packageData.inclusions_exclusions.donts.map((item, index) => (
                            <li key={index}>
                              <Typography variant="body2">{item}</Typography>
                            </li>
                          ))}
                        </Box>
                      </Paper>
                    </Grid>
                  )}
                </Grid>
              </>
            )}
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

    {/* Delete Confirmation Modal */}
    <DeleteConfirmationModal
      open={deleteModalOpen}
      onClose={() => setDeleteModalOpen(false)}
      onConfirm={handleDeleteConfirm}
      title="Delete Package"
      message="This will permanently delete this package and all its registrations. This action cannot be undone."
      itemName={packageData?.title}
      loading={deleting}
    />
    </>
  );
}