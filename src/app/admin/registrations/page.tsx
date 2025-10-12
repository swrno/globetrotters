'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/PageHeader';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Breadcrumbs,
  Link,
  Grid,
  Alert,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Table as MuiTable,
  Menu,
} from '@mui/material';
import {
  Download,
  FileSpreadsheet,
  Table as TableIcon,
  FileJson,
  FileText,
  ChevronDown,
} from 'lucide-react';

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

interface Package {
  _id: string;
  id: string;
  title: string;
  location: string;
  registrations: Array<{
    name: string;
    email: string;
    phone: string;
    createdAt?: string;
  }>;
}

export default function RegistrationsDownload() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  
  const { user } = useAuth();
  const router = useRouter();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = (format: 'excel' | 'csv' | 'json') => {
    switch (format) {
      case 'excel':
        downloadExcel();
        break;
      case 'csv':
        downloadCSV();
        break;
      case 'json':
        downloadJSON();
        break;
    }
    handleMenuClose();
  };

  useEffect(() => {
    if (!user) {
      router.push('/admin');
      return;
    }
    
    fetchData();
  }, [user, router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch all packages with registrations
      const response = await fetch('/api/packages');
      const data = await response.json();
      
      if (data.success) {
        const packagesData = data.data;
        setPackages(packagesData);
        
        // Flatten registrations from all packages
        const allRegistrations: Registration[] = [];
        
        packagesData.forEach((pkg: Package) => {
          if (pkg.registrations && pkg.registrations.length > 0) {
            pkg.registrations.forEach((reg) => {
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
        
        setRegistrations(allRegistrations);
      } else {
        setError('Failed to fetch registrations');
      }
    } catch (err) {
      console.error('Error fetching registrations:', err);
      setError('An error occurred while fetching registrations');
    } finally {
      setLoading(false);
    }
  };

  const getFilteredRegistrations = () => {
    if (selectedPackage === 'all') {
      return registrations;
    }
    return registrations.filter(reg => reg.packageId === selectedPackage);
  };

  const downloadExcel = () => {
    const filteredData = getFilteredRegistrations();
    
    if (filteredData.length === 0) {
      alert('No registrations to download');
      return;
    }

    // Prepare data for Excel
    const excelData = filteredData.map(reg => ({
      'Name': reg.name,
      'Email': reg.email,
      'Phone': reg.phone,
      'Package ID': reg.packageId,
      'Package Title': reg.packageTitle,
      'Package Location': reg.packageLocation,
      'Registration Date': new Date(reg.createdAt).toLocaleDateString(),
      'Registration Time': new Date(reg.createdAt).toLocaleTimeString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

    // Auto-size columns
    const colWidths = Object.keys(excelData[0]).map(key => ({
      wch: Math.max(key.length, ...excelData.map(row => String(row[key as keyof typeof row]).length))
    }));
    worksheet['!cols'] = colWidths;

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    const filename = selectedPackage === 'all' 
      ? 'all_registrations.xlsx'
      : `${selectedPackage}_registrations.xlsx`;
    
    saveAs(blob, filename);
  };

  const downloadCSV = () => {
    const filteredData = getFilteredRegistrations();
    
    if (filteredData.length === 0) {
      alert('No registrations to download');
      return;
    }

    // Prepare CSV data
    const csvData = filteredData.map(reg => ({
      'Name': reg.name,
      'Email': reg.email,
      'Phone': reg.phone,
      'Package ID': reg.packageId,
      'Package Title': reg.packageTitle,
      'Package Location': reg.packageLocation,
      'Registration Date': new Date(reg.createdAt).toLocaleDateString(),
      'Registration Time': new Date(reg.createdAt).toLocaleTimeString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(csvData);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    
    const filename = selectedPackage === 'all' 
      ? 'all_registrations.csv'
      : `${selectedPackage}_registrations.csv`;
    
    saveAs(blob, filename);
  };

  const downloadJSON = () => {
    const filteredData = getFilteredRegistrations();
    
    if (filteredData.length === 0) {
      alert('No registrations to download');
      return;
    }

    const jsonData = {
      exportDate: new Date().toISOString(),
      totalRecords: filteredData.length,
      filter: selectedPackage === 'all' ? 'All Packages' : `Package: ${selectedPackage}`,
      registrations: filteredData.map(reg => ({
        name: reg.name,
        email: reg.email,
        phone: reg.phone,
        package: {
          id: reg.packageId,
          title: reg.packageTitle,
          location: reg.packageLocation,
        },
        registrationDate: reg.createdAt,
      }))
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    
    const filename = selectedPackage === 'all' 
      ? 'all_registrations.json'
      : `${selectedPackage}_registrations.json`;
    
    saveAs(blob, filename);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  const filteredRegistrations = getFilteredRegistrations();
  const paginatedRegistrations = filteredRegistrations.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Page Header */}
      <PageHeader
        breadcrumbs={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'Registrations' }
        ]}
        title="Package Registrations"
        description="View, filter, and export customer registration data across all travel packages."
        actions={
          <Chip 
            label={`${filteredRegistrations.length} Registrations`} 
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

      {/* Filter and Download Section */}
      <Paper sx={{ p: 4, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Export Registrations
        </Typography>
        
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Filter by Package</InputLabel>
              <Select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                label="Filter by Package"
              >
                <MenuItem value="all">All Packages</MenuItem>
                {packages.map((pkg) => (
                  <MenuItem key={pkg.id} value={pkg.id}>
                    {pkg.title} ({pkg.registrations?.length || 0} registrations)
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<Download size={18} />}
                endIcon={<ChevronDown size={18} />}
                onClick={handleMenuClick}
                disabled={filteredRegistrations.length === 0}
                sx={{ 
                  bgcolor: '#60a5fa',
                  '&:hover': { bgcolor: '#3b82f6' },
                  color: '#ffffff'
                }}
              >
                Download Registrations
              </Button>
              
              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={() => handleDownload('excel')}>
                  <FileSpreadsheet size={18} style={{ marginRight: 8 }} />
                  Excel (.xlsx)
                </MenuItem>
                <MenuItem onClick={() => handleDownload('csv')}>
                  <FileText size={18} style={{ marginRight: 8 }} />
                  CSV (.csv)
                </MenuItem>
                <MenuItem onClick={() => handleDownload('json')}>
                  <FileJson size={18} style={{ marginRight: 8 }} />
                  JSON (.json)
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Registrations
              </Typography>
              <Typography variant="h4">
                {registrations.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Packages
              </Typography>
              <Typography variant="h4">
                {packages.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Filtered Results
              </Typography>
              <Typography variant="h4">
                {filteredRegistrations.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Registrations Table */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Registration Preview
        </Typography>
        
        <TableContainer component={Paper} variant="outlined" sx={{ border: '1px solid', borderColor: 'divider' }}>
          <MuiTable sx={{ 
            '& .MuiTableCell-root': { 
              borderRight: '1px solid', 
              borderColor: 'divider' 
            },
            '& .MuiTableHead-root .MuiTableCell-root': {
              fontWeight: 'bold',
              bgcolor: 'action.hover'
            }
          }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Package</TableCell>
                <TableCell>Location</TableCell>
                <TableCell sx={{ borderRight: 'none !important' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRegistrations.map((registration) => (
                <TableRow key={registration._id} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                  <TableCell>{registration.name}</TableCell>
                  <TableCell>{registration.email}</TableCell>
                  <TableCell>{registration.phone}</TableCell>
                  <TableCell>{registration.packageTitle}</TableCell>
                  <TableCell>{registration.packageLocation}</TableCell>
                  <TableCell sx={{ borderRight: 'none !important' }}>
                    {new Date(registration.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredRegistrations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}