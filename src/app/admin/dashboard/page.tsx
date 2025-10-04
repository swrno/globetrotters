'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Avatar,
  Chip,
  CircularProgress,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Logout,
  Inventory,
  People,
  Email,
  Star,
  Visibility,
  Edit,
  Delete,
  Add,
  DarkMode,
  LightMode,
  Download,
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
  registrations: any[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/admin');
      return;
    }
    
    fetchPackages();
  }, [user, router]);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages');
      const data = await response.json();
      if (data.success) {
        setPackages(data.data);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePackage = async (packageId: string) => {
    if (!confirm('Are you sure you want to delete this package?')) {
      return;
    }

    try {
      const response = await fetch(`/api/packages/${packageId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setPackages(packages.filter(pkg => pkg.id !== packageId));
      }
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  if (!user) {
    return null;
  }

  const totalRegistrations = packages.reduce((total, pkg) => total + pkg.registrations.length, 0);
  const mostPopular = packages.length > 0 
    ? packages.reduce((a, b) => a.registrations.length > b.registrations.length ? a : b).location
    : 'N/A';

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Avatar src="/logo.svg" sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                icon={<LightMode />}
                checkedIcon={<DarkMode />}
              />
            }
            label=""
            sx={{ mr: 2 }}
          />
          
          <Typography variant="body2" sx={{ mr: 2 }}>
            {user.email}
          </Typography>
          
          <Button
            color="inherit"
            onClick={logout}
            startIcon={<Logout />}
            variant="outlined"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    <Inventory />
                  </Avatar>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                      Total Packages
                    </Typography>
                    <Typography variant="h4">
                      {packages.length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                    <People />
                  </Avatar>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                      Total Registrations
                    </Typography>
                    <Typography variant="h4">
                      {totalRegistrations}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                    <Email />
                  </Avatar>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                      Newsletter
                    </Typography>
                    <Button 
                      color="primary"
                      onClick={() => router.push('/admin/newsletter')}
                      size="small"
                    >
                      Manage →
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                    <Download />
                  </Avatar>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                      Export Data
                    </Typography>
                    <Button 
                      color="primary"
                      onClick={() => router.push('/admin/registrations')}
                      size="small"
                    >
                      Download →
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                    <Star />
                  </Avatar>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                      Most Popular
                    </Typography>
                    <Typography variant="h6">
                      {mostPopular}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Packages Section */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h2">
                Travel Packages
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={() => router.push('/admin/registrations')}
                >
                  Download Registrations
                </Button>
                <Button 
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => router.push('/admin/packages/new')}
                >
                  Add New Package
                </Button>
              </Box>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : packages.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="textSecondary">
                  No packages found. Create your first package!
                </Typography>
              </Box>
            ) : (
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Package</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Tags</TableCell>
                      <TableCell align="center">Registrations</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {packages.map((pkg) => (
                      <TableRow key={pkg.id} hover>
                        <TableCell>
                          <Box>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {pkg.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {pkg.location}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={`${pkg.days}D/${pkg.nights}N`} 
                            variant="outlined" 
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {pkg.tags.slice(0, 2).map((tag, index) => (
                              <Chip 
                                key={index}
                                label={tag} 
                                size="small" 
                                variant="outlined"
                              />
                            ))}
                            {pkg.tags.length > 2 && (
                              <Chip 
                                label={`+${pkg.tags.length - 2}`} 
                                size="small" 
                                variant="outlined"
                              />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={pkg.registrations.length}
                            color={pkg.registrations.length > 0 ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            <IconButton 
                              size="small"
                              color="primary"
                              onClick={() => router.push(`/admin/packages/${pkg.id}`)}
                            >
                              <Visibility />
                            </IconButton>
                            <IconButton 
                              size="small"
                              color="secondary"
                              onClick={() => router.push(`/admin/packages/${pkg.id}/edit`)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton 
                              size="small"
                              color="error"
                              onClick={() => deletePackage(pkg.id)}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}