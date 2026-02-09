'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import PageHeader from '../../../components/PageHeader';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Settings2,
  Calendar,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface CustomizedPackage {
  _id: string;
  packageId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  selectedInclusions: string[];
  customDays: number;
  customNights: number;
  customRequests: string;
  status: 'pending' | 'reviewed' | 'confirmed';
  priceSnapshot: number;
  createdAt: string;
}

export default function CustomPlansPage() {
  const [plans, setPlans] = useState<CustomizedPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/admin');
      return;
    }
    
    fetchPlans();
  }, [user, router]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/customized-packages');
      const data = await response.json();
      
      if (data.success) {
        setPlans(data.data);
      } else {
        setError(data.error || 'Failed to fetch custom plans');
      }
    } catch (err) {
      console.error('Error fetching plans:', err);
      setError('An error occurred while fetching plans');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!user) return null;

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  const paginatedPlans = plans.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <PageHeader
        breadcrumbs={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'Custom Plans' }
        ]}
        title="Customized Package Requests"
        description="Review and manage tailor-made holiday requests from customers."
        actions={
          <Chip 
            label={`${plans.length} Requests`} 
            color="primary" 
            variant="outlined" 
          />
        }
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ p: 1.5, bgcolor: 'rgba(96, 165, 250, 0.1)', borderRadius: 2, mr: 2, color: '#60a5fa' }}>
                <Clock size={24} />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Pending Review</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {plans.filter(p => p.status === 'pending').length}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ p: 1.5, bgcolor: 'rgba(34, 197, 94, 0.1)', borderRadius: 2, mr: 2, color: '#22c55e' }}>
                <CheckCircle2 size={24} />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Confirmed Plans</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {plans.filter(p => p.status === 'confirmed').length}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ p: 1.5, bgcolor: 'rgba(251, 146, 60, 0.1)', borderRadius: 2, mr: 2, color: '#fb923c' }}>
                <Settings2 size={24} />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Total Customizations</Typography>
                <Typography variant="h5" fontWeight="bold">{plans.length}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Requests Table */}
      <Paper sx={{ p: 2 }}>
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: 'action.hover' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Package ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Duration</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Custom Requests</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPlans.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    No custom plan requests found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedPlans.map((plan) => (
                  <TableRow key={plan._id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body2" fontWeight="bold">{plan.userName}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                          <Mail size={12} style={{ color: 'text.secondary' }} />
                          <Typography variant="caption" color="textSecondary">{plan.userEmail}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Phone size={12} style={{ color: 'text.secondary' }} />
                          <Typography variant="caption" color="textSecondary">{plan.userPhone}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={plan.packageId} 
                        size="small" 
                        variant="outlined"
                        onClick={() => router.push(`/package/${plan.packageId}`)}
                        sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {plan.customDays}D / {plan.customNights}N
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {plan.selectedInclusions.length} inclusions
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>
                      <Tooltip title={plan.customRequests}>
                        <Typography variant="body2" noWrap>
                          {plan.customRequests || 'No special requests'}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={plan.status.toUpperCase()} 
                        size="small"
                        color={
                          plan.status === 'confirmed' ? 'success' : 
                          plan.status === 'reviewed' ? 'info' : 'warning'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(plan.createdAt).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => router.push(`/package/${plan.packageId}`)}
                      >
                        <ExternalLink size={18} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={plans.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}
