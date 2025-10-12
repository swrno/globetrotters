'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Breadcrumbs,
  Link,
  Chip,
  TablePagination,
} from '@mui/material';
import {
  Mail,
  UserX,
  LayoutDashboard,
  Calendar,
} from 'lucide-react';

interface NewsletterSubscriber {
  _id: string;
  email: string;
  subscribedAt: string;
  source: string;
  isActive: boolean;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && !user) {
      router.push('/admin');
      return;
    }
    
    fetchSubscribers();
  }, [user, router]);

  const fetchSubscribers = async (page: number = 1) => {
    try {
      const response = await fetch(`/api/newsletter?page=${page}&limit=10`);
      const data = await response.json();
      if (data.success) {
        setSubscribers(data.data.subscribers);
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const unsubscribeUser = async (email: string) => {
    if (!confirm(`Are you sure you want to unsubscribe ${email}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/newsletter?email=${encodeURIComponent(email)}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setSubscribers(subscribers.filter(sub => sub.email !== email));
        setPagination(prev => ({ ...prev, total: prev.total - 1 }));
      }
    } catch (error) {
      console.error('Error unsubscribing user:', error);
    }
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    fetchSubscribers(newPage + 1);
  };

  if (typeof window !== 'undefined' && !user) {
    return null;
  }

  const footerSignups = subscribers.filter(sub => sub.source === 'footer').length;
  const contactSignups = subscribers.filter(sub => sub.source === 'contact_form').length;
  const thisWeekSignups = subscribers.filter(sub => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(sub.subscribedAt) > weekAgo;
  }).length;

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
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
            Newsletter Management
          </Typography>
        </Breadcrumbs>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    bgcolor: '#60a5fa', 
                    borderRadius: 2, 
                    p: 1.5, 
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Mail size={24} color="white" />
                  </Box>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                      Total Subscribers
                    </Typography>
                    <Typography variant="h4">
                      {pagination.total}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    bgcolor: '#4ade80', 
                    borderRadius: 2, 
                    p: 1.5, 
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <LayoutDashboard size={24} color="white" />
                  </Box>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                      Footer Signups
                    </Typography>
                    <Typography variant="h4">
                      {footerSignups}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    bgcolor: '#38bdf8', 
                    borderRadius: 2, 
                    p: 1.5, 
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Mail size={24} color="white" />
                  </Box>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                      Contact Form
                    </Typography>
                    <Typography variant="h4">
                      {contactSignups}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    bgcolor: '#fb923c', 
                    borderRadius: 2, 
                    p: 1.5, 
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Calendar size={24} color="white" />
                  </Box>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                      This Week
                    </Typography>
                    <Typography variant="h4">
                      {thisWeekSignups}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Subscribers Table */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h2">
                Newsletter Subscribers
              </Typography>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : subscribers.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="textSecondary">
                  No subscribers found.
                </Typography>
              </Box>
            ) : (
              <>
                <TableContainer component={Paper} variant="outlined">
                  <Table sx={{
                    '& .MuiTableCell-root': {
                      borderRight: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': {
                        borderRight: 'none'
                      }
                    }
                  }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Source</TableCell>
                        <TableCell>Subscribed</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subscribers.map((subscriber) => (
                        <TableRow key={subscriber._id} hover>
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {subscriber.email}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={subscriber.source}
                              color={
                                subscriber.source === 'footer' 
                                  ? 'primary'
                                  : subscriber.source === 'contact_form'
                                  ? 'secondary'
                                  : 'default'
                              }
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {new Date(subscriber.subscribedAt).toLocaleDateString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              size="small"
                              color="error"
                              variant="outlined"
                              startIcon={<UserX size={16} />}
                              onClick={() => unsubscribeUser(subscriber.email)}
                            >
                              Unsubscribe
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <TablePagination
                    component="div"
                    count={pagination.total}
                    page={pagination.page - 1}
                    onPageChange={handlePageChange}
                    rowsPerPage={pagination.limit}
                    rowsPerPageOptions={[10]}
                    showFirstButton
                    showLastButton
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}