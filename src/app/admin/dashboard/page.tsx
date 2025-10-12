'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import {
  Typography,
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
  Chip,
  CircularProgress,
  TablePagination,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Package as PackageIcon,
  Users,
  Mail,
  Star,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Phone,
  User,
  Calendar,
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
  registrations: any[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface Registration {
  _id: string;
  name: string;
  email: string;
  phone: string;
  packageId: string;
  packageTitle: string;
  packageLocation: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [regPage, setRegPage] = useState(0);
  const [regRowsPerPage, setRegRowsPerPage] = useState(10);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<{ id: string; title: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  
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
        
        // Flatten registrations from all packages
        const allRegistrations: Registration[] = [];
        data.data.forEach((pkg: Package) => {
          if (pkg.registrations && pkg.registrations.length > 0) {
            pkg.registrations.forEach((reg: any) => {
              allRegistrations.push({
                _id: `${pkg._id}_${reg.email}`,
                name: reg.name,
                email: reg.email,
                phone: reg.phone,
                packageId: pkg.id,
                packageTitle: pkg.title,
                packageLocation: pkg.location,
                createdAt: reg.createdAt || new Date().toISOString(),
              });
            });
          }
        });
        
        // Sort by most recent first
        allRegistrations.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        setRegistrations(allRegistrations);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePackage = async (packageId: string) => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/packages/${packageId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setPackages(packages.filter(pkg => pkg.id !== packageId));
        // Also remove related registrations
        setRegistrations(registrations.filter(reg => reg.packageId !== packageId));
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

  const handleRegPageChange = (event: unknown, newPage: number) => {
    setRegPage(newPage);
  };

  const handleRegRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegRowsPerPage(parseInt(event.target.value, 10));
    setRegPage(0);
  };

  if (!user) {
    return null;
  }

  const totalRegistrations = packages.reduce((total, pkg) => total + pkg.registrations.length, 0);
  const mostPopular = packages.length > 0 
    ? packages.reduce((a, b) => a.registrations.length > b.registrations.length ? a : b).location
    : 'N/A';

  const paginatedRegistrations = registrations.slice(
    regPage * regRowsPerPage,
    regPage * regRowsPerPage + regRowsPerPage
  );

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <Card sx={{ 
              height: '100%', 
              bgcolor: 'rgba(59, 130, 246, 0.1)', 
              borderColor: 'rgba(59, 130, 246, 0.3)',
              '&:hover': {
                bgcolor: 'rgba(59, 130, 246, 0.15)',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease'
              }
            }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 140 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                  <Box sx={{ 
                    mr: 2, 
                    color: '#60a5fa', 
                    flexShrink: 0,
                    bgcolor: 'rgba(59, 130, 246, 0.2)',
                    p: 1,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <PackageIcon size={28} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography color="text.secondary" gutterBottom variant="overline" sx={{ lineHeight: 1.2, display: 'block', mb: 1, fontSize: '0.7rem', letterSpacing: 1 }}>
                      Total Packages
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#60a5fa' }}>
                      {packages.length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <Card sx={{ 
              height: '100%', 
              bgcolor: 'rgba(34, 197, 94, 0.1)', 
              borderColor: 'rgba(34, 197, 94, 0.3)',
              '&:hover': {
                bgcolor: 'rgba(34, 197, 94, 0.15)',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease'
              }
            }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 140 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                  <Box sx={{ 
                    mr: 2, 
                    color: '#4ade80', 
                    flexShrink: 0,
                    bgcolor: 'rgba(34, 197, 94, 0.2)',
                    p: 1,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Users size={28} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography color="text.secondary" gutterBottom variant="overline" sx={{ lineHeight: 1.2, display: 'block', mb: 1, fontSize: '0.7rem', letterSpacing: 1 }}>
                      Total Registrations
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#4ade80' }}>
                      {totalRegistrations}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <Card sx={{ 
              height: '100%', 
              bgcolor: 'rgba(14, 165, 233, 0.1)', 
              borderColor: 'rgba(14, 165, 233, 0.3)',
              '&:hover': {
                bgcolor: 'rgba(14, 165, 233, 0.15)',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease'
              }
            }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 140 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                  <Box sx={{ 
                    mr: 2, 
                    color: '#38bdf8', 
                    flexShrink: 0,
                    bgcolor: 'rgba(14, 165, 233, 0.2)',
                    p: 1,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Mail size={28} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography color="text.secondary" gutterBottom variant="overline" sx={{ lineHeight: 1.2, display: 'block', mb: 1, fontSize: '0.7rem', letterSpacing: 1 }}>
                      Newsletter
                    </Typography>
                    <Button 
                      color="info"
                      onClick={() => router.push('/admin/newsletter')}
                      size="small"
                      variant="contained"
                      sx={{ 
                        mt: 0.5,
                        textTransform: 'none', 
                        fontSize: '0.75rem', 
                        fontWeight: 600,
                        px: 2,
                        py: 0.5,
                        borderRadius: 1.5,
                        bgcolor: '#38bdf8',
                        color: '#ffffff',
                        '&:hover': {
                          bgcolor: '#0ea5e9',
                          color: '#ffffff'
                        }
                      }}
                    >
                      Manage →
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <Card sx={{ 
              height: '100%', 
              bgcolor: 'rgba(168, 85, 247, 0.1)', 
              borderColor: 'rgba(168, 85, 247, 0.3)',
              '&:hover': {
                bgcolor: 'rgba(168, 85, 247, 0.15)',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease'
              }
            }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 140 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                  <Box sx={{ 
                    mr: 2, 
                    color: '#a78bfa', 
                    flexShrink: 0,
                    bgcolor: 'rgba(168, 85, 247, 0.2)',
                    p: 1,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Download size={28} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography color="text.secondary" gutterBottom variant="overline" sx={{ lineHeight: 1.2, display: 'block', mb: 1, fontSize: '0.7rem', letterSpacing: 1 }}>
                      Export Data
                    </Typography>
                    <Button 
                      onClick={() => router.push('/admin/registrations')}
                      size="small"
                      variant="contained"
                      sx={{ 
                        mt: 0.5,
                        textTransform: 'none', 
                        fontSize: '0.75rem', 
                        fontWeight: 600,
                        px: 2,
                        py: 0.5,
                        borderRadius: 1.5,
                        bgcolor: '#a78bfa',
                        color: '#ffffff',
                        '&:hover': {
                          bgcolor: '#8b5cf6',
                          color: '#ffffff'
                        }
                      }}
                    >
                      Download →
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <Card sx={{ 
              height: '100%', 
              bgcolor: 'rgba(251, 146, 60, 0.1)', 
              borderColor: 'rgba(251, 146, 60, 0.3)',
              '&:hover': {
                bgcolor: 'rgba(251, 146, 60, 0.15)',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease'
              }
            }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 140 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                  <Box sx={{ 
                    mr: 2, 
                    color: '#fb923c', 
                    flexShrink: 0,
                    bgcolor: 'rgba(251, 146, 60, 0.2)',
                    p: 1,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Star size={28} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography color="text.secondary" gutterBottom variant="overline" sx={{ lineHeight: 1.2, display: 'block', mb: 1, fontSize: '0.7rem', letterSpacing: 1 }}>
                      Most Popular
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600, color: '#fb923c' }}>
                      {mostPopular}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Packages Section */}
        <Card sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Travel Packages
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage your travel packages and itineraries
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="outlined"
                  startIcon={<Download size={18} />}
                  onClick={() => router.push('/admin/registrations')}
                  sx={{ borderColor: 'divider', color: 'text.primary' }}
                >
                  Download Registrations
                </Button>
                <Button 
                  variant="contained"
                  startIcon={<Plus size={18} />}
                  onClick={() => router.push('/admin/packages/new')}
                  sx={{ 
                    bgcolor: '#60a5fa',
                    '&:hover': {
                      bgcolor: '#3b82f6'
                    }
                  }}
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
              <TableContainer component={Paper} variant="outlined" sx={{ bgcolor: 'transparent', border: '1px solid', borderColor: 'divider' }}>
                <Table sx={{ 
                  '& .MuiTableCell-root': { 
                    borderRight: '1px solid', 
                    borderColor: 'divider',
                    py: 2
                  },
                  '& .MuiTableHead-root .MuiTableCell-root': {
                    bgcolor: 'rgba(255, 255, 255, 0.02)',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5
                  }
                }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Package</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Tags</TableCell>
                      <TableCell align="center">Registrations</TableCell>
                      <TableCell align="center" sx={{ borderRight: 'none !important' }}>Actions</TableCell>
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
                        <TableCell align="center" sx={{ borderRight: 'none !important' }}>
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            <IconButton 
                              size="small"
                              color="primary"
                              onClick={() => router.push(`/admin/packages/${pkg.id}`)}
                            >
                              <Eye size={18} />
                            </IconButton>
                            <IconButton 
                              size="small"
                              color="secondary"
                              onClick={() => router.push(`/admin/packages/${pkg.id}/edit`)}
                            >
                              <Edit size={18} />
                            </IconButton>
                            <IconButton 
                              size="small"
                              color="error"
                              onClick={() => handleDeleteClick(pkg.id, pkg.title)}
                            >
                              <Trash2 size={18} />
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

        {/* Registrations Section */}
        <Card sx={{ mt: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Recent Registrations
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  All package registrations across your travel packages
                </Typography>
              </Box>
              <Button 
                variant="outlined"
                startIcon={<Download size={18} />}
                onClick={() => router.push('/admin/registrations')}
                sx={{ borderColor: 'divider', color: 'text.primary' }}
              >
                Export All Data
              </Button>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : registrations.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Users size={48} style={{ color: 'text.secondary', marginBottom: 16 }} />
                <Typography color="textSecondary">
                  No registrations yet. Share your packages to get started!
                </Typography>
              </Box>
            ) : (
              <>
                <TableContainer component={Paper} variant="outlined" sx={{ bgcolor: 'transparent', border: '1px solid', borderColor: 'divider' }}>
                  <Table sx={{ 
                    '& .MuiTableCell-root': { 
                      borderRight: '1px solid', 
                      borderColor: 'divider',
                      py: 2
                    },
                    '& .MuiTableHead-root .MuiTableCell-root': {
                      bgcolor: 'rgba(255, 255, 255, 0.02)',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5
                    }
                  }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <User size={14} />
                            <Typography variant="subtitle2">Name</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Mail size={14} />
                            <Typography variant="subtitle2">Email</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Phone size={14} />
                            <Typography variant="subtitle2">Phone</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>Package Details</TableCell>
                        <TableCell sx={{ borderRight: 'none !important' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Calendar size={14} />
                            <Typography variant="subtitle2">Registration Date</Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedRegistrations.map((registration) => (
                        <TableRow key={registration._id} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box 
                                sx={{ 
                                  width: 32, 
                                  height: 32, 
                                  mr: 1.5,
                                  bgcolor: 'primary.main',
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  fontSize: '0.875rem',
                                  fontWeight: 'bold'
                                }}
                              >
                                {registration.name.charAt(0).toUpperCase()}
                              </Box>
                              <Typography variant="body2" fontWeight="medium">
                                {registration.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Tooltip title={registration.email}>
                              <Typography variant="body2" color="textSecondary">
                                {registration.email}
                              </Typography>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="textSecondary">
                              {registration.phone}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box>
                              <Typography variant="body2" fontWeight="medium">
                                {registration.packageTitle}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {registration.packageLocation}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ borderRight: 'none !important' }}>
                            <Box>
                              <Typography variant="body2">
                                {new Date(registration.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {new Date(registration.createdAt).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  component="div"
                  count={registrations.length}
                  rowsPerPage={regRowsPerPage}
                  page={regPage}
                  onPageChange={handleRegPageChange}
                  onRowsPerPageChange={handleRegRowsPerPageChange}
                  sx={{ borderTop: 1, borderColor: 'divider' }}
                />
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}