'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import PageHeader from '@/components/PageHeader';
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
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
  Filter,
  X,
  Grid3x3,
  List,
  LayoutGrid,
} from 'lucide-react';

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
  
  // Filter states
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [durationFilter, setDurationFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'list'>('table');
  
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
    // Filter packages based on search query and all filters
    let filtered = [...packages];
    
    // Search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(pkg => 
        pkg.title.toLowerCase().includes(query) ||
        pkg.location.toLowerCase().includes(query) ||
        pkg.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Location filter
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(pkg => pkg.location === selectedLocation);
    }
    
    // Tag filter
    if (selectedTag !== 'all') {
      filtered = filtered.filter(pkg => pkg.tags.includes(selectedTag));
    }
    
    // Price range filter
    filtered = filtered.filter(pkg => 
      pkg.cost_per_person >= priceRange[0] && pkg.cost_per_person <= priceRange[1]
    );
    
    // Duration filter
    if (durationFilter !== 'all') {
      if (durationFilter === '1-3') {
        filtered = filtered.filter(pkg => pkg.days >= 1 && pkg.days <= 3);
      } else if (durationFilter === '4-7') {
        filtered = filtered.filter(pkg => pkg.days >= 4 && pkg.days <= 7);
      } else if (durationFilter === '8-14') {
        filtered = filtered.filter(pkg => pkg.days >= 8 && pkg.days <= 14);
      } else if (durationFilter === '15+') {
        filtered = filtered.filter(pkg => pkg.days >= 15);
      }
    }
    
    setFilteredPackages(filtered);
  }, [searchQuery, packages, selectedLocation, selectedTag, priceRange, durationFilter]);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages');
      const data = await response.json();
      
      if (data.success) {
        setPackages(data.data);
        setFilteredPackages(data.data);
        
        // Set initial price range based on actual data
        if (data.data.length > 0) {
          const prices = data.data.map((pkg: Package) => pkg.cost_per_person);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setPriceRange([minPrice, maxPrice]);
        }
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

  // Get unique locations and tags
  const uniqueLocations = Array.from(new Set(packages.map(pkg => pkg.location))).sort();
  const uniqueTags = Array.from(new Set(packages.flatMap(pkg => pkg.tags))).sort();
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedLocation('all');
    setSelectedTag('all');
    setDurationFilter('all');
    const prices = packages.map(pkg => pkg.cost_per_person);
    if (prices.length > 0) {
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
    setSearchQuery('');
  };
  
  // Check if any filters are active
  const hasActiveFilters = 
    selectedLocation !== 'all' || 
    selectedTag !== 'all' || 
    durationFilter !== 'all' || 
    searchQuery !== '' ||
    (packages.length > 0 && (
      priceRange[0] !== Math.min(...packages.map(p => p.cost_per_person)) ||
      priceRange[1] !== Math.max(...packages.map(p => p.cost_per_person))
    ));

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Page Header */}
      <PageHeader
        breadcrumbs={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'Packages' }
        ]}
        title="Travel Packages"
        description="Manage your travel packages, create new destinations, and track customer registrations."
        actions={
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
        }
      />

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

      {/* Search Bar and Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
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
          
          <Button
            startIcon={<Filter size={18} />}
            onClick={() => setShowFilters(!showFilters)}
            variant={showFilters ? 'contained' : 'outlined'}
            sx={{ minWidth: '140px', whiteSpace: 'nowrap' }}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </Box>
        
        {hasActiveFilters && !showFilters && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              startIcon={<X size={18} />}
              onClick={clearFilters}
              variant="text"
              size="small"
              color="error"
            >
              Clear All Filters
            </Button>
          </Box>
        )}
        
        {/* Filters Section */}
        {showFilters && (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              {/* Location Filter */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Location</InputLabel>
                  <Select
                    value={selectedLocation}
                    label="Location"
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <MenuItem value="all">All Locations</MenuItem>
                    {uniqueLocations.map((location) => (
                      <MenuItem key={location} value={location}>
                        {location}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              {/* Tag Filter */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Tag</InputLabel>
                  <Select
                    value={selectedTag}
                    label="Tag"
                    onChange={(e) => setSelectedTag(e.target.value)}
                  >
                    <MenuItem value="all">All Tags</MenuItem>
                    {uniqueTags.map((tag) => (
                      <MenuItem key={tag} value={tag}>
                        {tag}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              {/* Duration Filter */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Duration</InputLabel>
                  <Select
                    value={durationFilter}
                    label="Duration"
                    onChange={(e) => setDurationFilter(e.target.value)}
                  >
                    <MenuItem value="all">All Durations</MenuItem>
                    <MenuItem value="1-3">1-3 Days</MenuItem>
                    <MenuItem value="4-7">4-7 Days</MenuItem>
                    <MenuItem value="8-14">8-14 Days</MenuItem>
                    <MenuItem value="15+">15+ Days</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              {/* Price Range Filter */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={(_, newValue) => setPriceRange(newValue as number[])}
                  valueLabelDisplay="auto"
                  min={0}
                  max={Math.max(...packages.map(p => p.cost_per_person), 100000)}
                  step={1000}
                  valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
                />
              </Grid>
            </Grid>
            
            {/* Active Filters Display */}
            {hasActiveFilters && (
              <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Active Filters:
                </Typography>
                {selectedLocation !== 'all' && (
                  <Chip
                    label={`Location: ${selectedLocation}`}
                    onDelete={() => setSelectedLocation('all')}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
                {selectedTag !== 'all' && (
                  <Chip
                    label={`Tag: ${selectedTag}`}
                    onDelete={() => setSelectedTag('all')}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
                {durationFilter !== 'all' && (
                  <Chip
                    label={`Duration: ${durationFilter} days`}
                    onDelete={() => setDurationFilter('all')}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
                {searchQuery && (
                  <Chip
                    label={`Search: "${searchQuery}"`}
                    onDelete={() => setSearchQuery('')}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
              </Box>
            )}
          </Box>
        )}
      </Paper>

      {/* View Switching and Results Counter */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          {hasActiveFilters && (
            <Typography variant="body2" color="text.secondary">
              Showing {filteredPackages.length} of {packages.length} packages
            </Typography>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Grid View">
            <IconButton
              onClick={() => setViewMode('grid')}
              color={viewMode === 'grid' ? 'primary' : 'default'}
              sx={{ 
                bgcolor: viewMode === 'grid' ? 'rgba(96, 165, 250, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(96, 165, 250, 0.15)' }
              }}
            >
              <LayoutGrid size={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="List View">
            <IconButton
              onClick={() => setViewMode('list')}
              color={viewMode === 'list' ? 'primary' : 'default'}
              sx={{ 
                bgcolor: viewMode === 'list' ? 'rgba(96, 165, 250, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(96, 165, 250, 0.15)' }
              }}
            >
              <List size={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Table View">
            <IconButton
              onClick={() => setViewMode('table')}
              color={viewMode === 'table' ? 'primary' : 'default'}
              sx={{ 
                bgcolor: viewMode === 'table' ? 'rgba(96, 165, 250, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(96, 165, 250, 0.15)' }
              }}
            >
              <Grid3x3 size={20} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Packages Display */}
      {filteredPackages.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">
            {hasActiveFilters ? 'No packages found matching your filters.' : 'No packages available. Create your first package!'}
          </Typography>
          {hasActiveFilters && (
            <Button
              variant="outlined"
              onClick={clearFilters}
              sx={{ mt: 2 }}
            >
              Clear Filters
            </Button>
          )}
        </Paper>
      ) : (
        <>
          {/* Grid View */}
          {viewMode === 'grid' && (
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

          {/* List View */}
          {viewMode === 'list' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filteredPackages.map((pkg) => (
                <Card key={pkg._id} sx={{ '&:hover': { boxShadow: 4 } }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 200, height: 150, borderRadius: 1, objectFit: 'cover', flexShrink: 0 }}
                        image={pkg.images[0] || '/placeholder-image.jpg'}
                        alt={pkg.title}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                          <Typography variant="h6" fontWeight="bold">
                            {pkg.title}
                          </Typography>
                          <Chip 
                            label={`₹${pkg.cost_per_person.toLocaleString()}`}
                            color="success"
                            sx={{ fontWeight: 'bold' }}
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <MapPin size={16} />
                            <Typography variant="body2" color="text.secondary">
                              {pkg.location}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Calendar size={16} />
                            <Typography variant="body2" color="text.secondary">
                              {pkg.days}D/{pkg.nights}N
                            </Typography>
                          </Box>
                          <Chip label={`${pkg.registrations.length} registrations`} size="small" variant="outlined" />
                        </Box>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {getShortDescription(pkg.description, 200)}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                          {pkg.tags.slice(0, 5).map((tag, index) => (
                            <Chip key={index} label={tag} size="small" variant="outlined" />
                          ))}
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<Eye size={16} />}
                            onClick={() => router.push(`/admin/packages/${pkg.id}`)}
                          >
                            View
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<Edit size={16} />}
                            onClick={() => router.push(`/admin/packages/${pkg.id}/edit`)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<Trash2 size={16} />}
                            onClick={() => handleDeleteClick(pkg._id, pkg.title)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {/* Table View */}
          {viewMode === 'table' && (
            <TableContainer component={Paper} variant="outlined" sx={{ border: '1px solid', borderColor: 'divider' }}>
              <Table sx={{
                '& .MuiTableHead-root': {
                  bgcolor: darkMode ? 'rgba(96, 165, 250, 0.08)' : 'rgba(96, 165, 250, 0.05)',
                },
                '& .MuiTableCell-head': {
                  fontWeight: 'bold',
                  borderBottom: '2px solid',
                  borderColor: 'divider',
                },
                '& .MuiTableRow-root': {
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }
              }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Package</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Registrations</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPackages.map((pkg) => (
                    <TableRow key={pkg._id} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                      <TableCell>
                        <Avatar
                          src={pkg.images[0] || '/placeholder-image.jpg'}
                          alt={pkg.title}
                          variant="rounded"
                          sx={{ width: 60, height: 60 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {pkg.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                          {pkg.tags.slice(0, 2).map((tag, index) => (
                            <Chip key={index} label={tag} size="small" variant="outlined" />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <MapPin size={14} />
                          <Typography variant="body2">{pkg.location}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {pkg.days}D / {pkg.nights}N
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={`₹${pkg.cost_per_person.toLocaleString()}`}
                          size="small"
                          color="success"
                          sx={{ fontWeight: 'bold' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={pkg.registrations.length}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Tooltip title="View">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => router.push(`/admin/packages/${pkg.id}`)}
                            >
                              <Eye size={16} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              color="info"
                              onClick={() => router.push(`/admin/packages/${pkg.id}/edit`)}
                            >
                              <Edit size={16} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteClick(pkg._id, pkg.title)}
                            >
                              <Trash2 size={16} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
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
