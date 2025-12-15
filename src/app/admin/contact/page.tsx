'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal';
import PageHeader from '../../../components/PageHeader';
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
  Chip,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Mail,
  Phone,
  User,
  MessageSquare,
  Calendar,
  Trash2,
  Eye,
  X,
} from 'lucide-react';

interface Contact {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function ContactAdmin() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [deleting, setDeleting] = useState(false);
  
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && !user) {
      router.push('/admin');
      return;
    }
    
    fetchContacts();
  }, [user, router]);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (contactId: string) => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/contact/${contactId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setContacts(contacts.filter(contact => contact._id !== contactId));
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteClick = (contact: Contact) => {
    setSelectedContact(contact);
    setDeleteModalOpen(true);
  };

  const handleViewClick = (contact: Contact) => {
    setSelectedContact(contact);
    setViewModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedContact) {
      await deleteContact(selectedContact._id);
      setDeleteModalOpen(false);
      setSelectedContact(null);
    }
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (typeof window !== 'undefined' && !user) {
    return null;
  }

  const thisWeekContacts = contacts.filter(contact => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(contact.createdAt) > weekAgo;
  }).length;

  const todayContacts = contacts.filter(contact => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(contact.createdAt) >= today;
  }).length;

  const paginatedContacts = contacts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Page Header */}
        <PageHeader
          breadcrumbs={[
            { label: 'Admin', href: '/admin/dashboard' },
            { label: 'Contact Us' }
          ]}
          title="Contact Us Submissions"
          description="View and manage contact form submissions from customers."
        />

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
                      Total Contacts
                    </Typography>
                    <Typography variant="h4">
                      {contacts.length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
                    <Calendar size={24} color="white" />
                  </Box>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                      This Week
                    </Typography>
                    <Typography variant="h4">
                      {thisWeekContacts}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
                    <MessageSquare size={24} color="white" />
                  </Box>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                      Today
                    </Typography>
                    <Typography variant="h4">
                      {todayContacts}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Contacts Table */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h2">
                Contact Submissions
              </Typography>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : contacts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="textSecondary">
                  No contact submissions found.
                </Typography>
              </Box>
            ) : (
              <>
                <TableContainer component={Paper} variant="outlined" sx={{ border: '1px solid', borderColor: 'divider' }}>
                  <Table sx={{
                    '& .MuiTableCell-root': {
                      borderRight: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': {
                        borderRight: 'none'
                      }
                    },
                    '& .MuiTableHead-root': {
                      bgcolor: darkMode ? 'rgba(96, 165, 250, 0.08)' : 'rgba(96, 165, 250, 0.05)',
                    },
                    '& .MuiTableCell-head': {
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                      borderBottom: '2px solid',
                      borderColor: 'divider',
                    },
                    '& .MuiTableRow-root': {
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      }
                    }
                  }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Message</TableCell>
                        <TableCell>Submitted</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedContacts.map((contact) => (
                        <TableRow key={contact._id} hover>
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
                                {contact.fullName.charAt(0).toUpperCase()}
                              </Box>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {contact.fullName}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {contact.email}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {contact.phone}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                maxWidth: 300, 
                                overflow: 'hidden', 
                                textOverflow: 'ellipsis', 
                                whiteSpace: 'nowrap' 
                              }}
                            >
                              {contact.message}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {new Date(contact.createdAt).toLocaleTimeString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                              <Tooltip title="View Message">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => handleViewClick(contact)}
                                >
                                  <Eye size={18} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleDeleteClick(contact)}
                                >
                                  <Trash2 size={18} />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination */}
                <TablePagination
                  component="div"
                  count={contacts.length}
                  page={page}
                  onPageChange={handlePageChange}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  showFirstButton
                  showLastButton
                />
              </>
            )}
          </CardContent>
        </Card>
      </Container>

      {/* View Contact Modal */}
      <Dialog 
        open={viewModalOpen} 
        onClose={() => setViewModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Contact Details</Typography>
          <IconButton onClick={() => setViewModalOpen(false)} size="small">
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedContact && (
            <Box>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <User size={18} style={{ marginRight: 8 }} />
                      <Typography variant="subtitle2" color="textSecondary">
                        Full Name
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {selectedContact.fullName}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Phone size={18} style={{ marginRight: 8 }} />
                      <Typography variant="subtitle2" color="textSecondary">
                        Phone
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {selectedContact.phone}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Mail size={18} style={{ marginRight: 8 }} />
                      <Typography variant="subtitle2" color="textSecondary">
                        Email
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {selectedContact.email}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Calendar size={18} style={{ marginRight: 8 }} />
                      <Typography variant="subtitle2" color="textSecondary">
                        Submitted On
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {new Date(selectedContact.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <MessageSquare size={18} style={{ marginRight: 8 }} />
                      <Typography variant="subtitle2" color="textSecondary">
                        Message
                      </Typography>
                    </Box>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                        maxHeight: 300,
                        overflowY: 'auto'
                      }}
                    >
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {selectedContact.message}
                      </Typography>
                    </Paper>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewModalOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedContact(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Contact"
        message="This will permanently remove this contact submission. This action cannot be undone."
        itemName={selectedContact?.fullName || ''}
        loading={deleting}
      />
    </Box>
  );
}
