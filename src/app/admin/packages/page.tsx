'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  TextField,
  InputAdornment,
  CircularProgress,
  IconButton,
  Tooltip,
  Paper,
} from '@mui/material';
import {
  Plus,
  Search,
  MapPin,
  Calendar,
  Eye,
  Edit,
  Trash2,
  DollarSign,
} from 'lucide-react';

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
  images: string[];
  registrations: any[];
  createdAt: string;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<{ id: string; title: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/admin');
      return;
    }
    
    fetchPackages();
  }, [user, router]);

  useEffect(() => {
    // Filter packages based on search query
    if (searchQuery.trim() === '') {
      setFilteredPackages(packages);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = packages.filter(pkg => 
        pkg.title.toLowerCase().includes(query) ||
        pkg.location.toLowerCase().includes(query) ||
        pkg.tags.some(tag => tag.toLowerCase().includes(query))
      );
      setFilteredPackages(filtered);
    }
  }, [searchQuery, packages]);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages');
      const data = await response.json();
      
      if (data.success) {
        setPackages(data.data);
        setFilteredPackages(data.data);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePackage = async (id: string) => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/packages/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setPackages(packages.filter(pkg => pkg._id !== id));
        setFilteredPackages(filteredPackages.filter(pkg => pkg._id !== id));
      }
    } catch (error) {
      console.error('Error deleting package:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteClick = (packageId: string, packageTitle: string) => {
    setPackageToDelete({ id: packageId, title: packageTitle });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (packageToDelete) {
      await deletePackage(packageToDelete.id);
      setDeleteModalOpen(false);
      setPackageToDelete(null);
    }
  };

  const getShortDescription = (text: string, maxLength = 150) => {
    const stripped = text.replace(/[#*\n]/g, ' ').trim();
    return stripped.length > maxLength 
      ? stripped.substring(0, maxLength) + '...' 
      : stripped;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Travel Packages
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => router.push('/admin/packages/new')}
          sx={{ 
            bgcolor: '#60a5fa',
            '&:hover': { bgcolor: '#3b82f6' },
            color: '#ffffff'
          }}
        >
          Add New Package
        </Button>
      </Box>

      {/* Search Bar */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search packages by title, location, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ bgcolor: darkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(96, 165, 250, 0.08)' }}>
            <CardContent>
              <Typography variant="h3" fontWeight="bold" color="primary">
                {packages.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Packages
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ bgcolor: darkMode ? 'rgba(74, 222, 128, 0.1)' : 'rgba(74, 222, 128, 0.08)' }}>
            <CardContent>
              <Typography variant="h3" fontWeight="bold" color="success.main">
                {packages.reduce((acc, pkg) => acc + pkg.registrations.length, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Registrations
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ bgcolor: darkMode ? 'rgba(251, 146, 60, 0.1)' : 'rgba(251, 146, 60, 0.08)' }}>
            <CardContent>
              <Typography variant="h3" fontWeight="bold" color="warning.main">
                {new Set(packages.map(pkg => pkg.location)).size}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Unique Destinations
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Packages Grid */}
      {filteredPackages.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">
            {searchQuery ? 'No packages found matching your search.' : 'No packages available. Create your first package!'}
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredPackages.map((pkg) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pkg._id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                  transition: 'all 0.3s ease'
                }
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={pkg.images[0] || '/placeholder-image.jpg'}
                  alt={pkg.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {pkg.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <MapPin size={16} style={{ marginRight: 4 }} />
                    <Typography variant="body2" color="text.secondary">
                      {pkg.location}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Calendar size={16} style={{ marginRight: 4 }} />
                    <Typography variant="body2" color="text.secondary">
                      {pkg.days} Days / {pkg.nights} Nights
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {getShortDescription(pkg.description)}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    {pkg.tags.slice(0, 3).map((tag, index) => (
                      <Chip key={index} label={tag} size="small" variant="outlined" />
                    ))}
                    {pkg.tags.length > 3 && (
                      <Chip label={`+${pkg.tags.length - 3}`} size="small" variant="outlined" />
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DollarSign size={18} color="#4ade80" />
                      <Typography variant="h6" fontWeight="bold" color="success.main">
                        ₹{pkg.cost_per_person.toLocaleString()}
                      </Typography>
                    </Box>
                    <Chip 
                      label={`${pkg.registrations.length} registrations`} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
                
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Tooltip title="View Details">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => router.push(`/admin/packages/${pkg.id}`)}
                    >
                      <Eye size={18} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Package">
                    <IconButton
                      size="small"
                      color="info"
                      onClick={() => router.push(`/admin/packages/${pkg.id}/edit`)}
                    >
                      <Edit size={18} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Package">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(pkg._id, pkg.title)}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setPackageToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Package"
        message="This will permanently delete this package and all its registrations. This action cannot be undone."
        itemName={packageToDelete?.title}
        loading={deleting}
      />
    </Container>
  );
}
