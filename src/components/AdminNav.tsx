'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Switch,
  FormControlLabel,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme as useMuiTheme,
  Collapse,
} from '@mui/material';
import {
  LayoutDashboard,
  Package,
  Users,
  Mail,
  Moon,
  Sun,
  LogOut,
  MessageSquare,
  Menu as MenuIcon,
  ChevronDown,
  Database,
  X,
  ChevronRight,
} from 'lucide-react';

export default function AdminNav() {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customerDataAnchor, setCustomerDataAnchor] = useState<null | HTMLElement>(null);
  const [mobileCustomerDataOpen, setMobileCustomerDataOpen] = useState(false);
  
  const customerDataOpen = Boolean(customerDataAnchor);

  // Don't show nav on login page
  if (pathname === '/admin') {
    return null;
  }

  const handleCustomerDataClick = (event: React.MouseEvent<HTMLElement>) => {
    setCustomerDataAnchor(event.currentTarget);
  };

  const handleCustomerDataClose = () => {
    setCustomerDataAnchor(null);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
    handleCustomerDataClose();
  };

  const toggleMobileCustomerData = () => {
    setMobileCustomerDataOpen(!mobileCustomerDataOpen);
  };

  const isCustomerDataActive = pathname?.startsWith('/admin/registrations') || pathname?.startsWith('/admin/contact');

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Packages', path: '/admin/packages', icon: Package },
    { label: 'Newsletter', path: '/admin/newsletter', icon: Mail },
  ];

  const customerDataItems = [
    { label: 'Registrations', path: '/admin/registrations', icon: Users },
    { label: 'Contact Us', path: '/admin/contact', icon: MessageSquare },
  ];

  return (
    <AppBar position="sticky" elevation={1} sx={{ 
      bgcolor: darkMode ? '#1a1a1a' : '#ffffff',
      color: darkMode ? '#ffffff' : '#000000'
    }}>
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
        <Box component="img" src="/logo.svg" alt="Logo" sx={{ height: { xs: 32, sm: 40 }, mr: { xs: 1, sm: 3 } }} />
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              color="inherit"
              onClick={() => setMobileMenuOpen(true)}
              edge="end"
            >
              <MenuIcon size={24} />
            </IconButton>
          </Box>
        )}

        {/* Desktop Navigation Items */}
        {!isMobile && (
          <>
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname?.startsWith(item.path);
                return (
                  <Button
                    key={item.path}
                    color="inherit"
                    onClick={() => handleNavigate(item.path)}
                    startIcon={<Icon size={18} />}
                    sx={{ 
                      borderBottom: isActive ? '2px solid' : 'none',
                      borderColor: '#60a5fa',
                      borderRadius: 0,
                      pb: 1,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
              
              {/* Customer Data Dropdown */}
              <Button
                color="inherit"
                onClick={handleCustomerDataClick}
                startIcon={<Database size={18} />}
                endIcon={<ChevronDown size={16} />}
                sx={{ 
                  borderBottom: isCustomerDataActive ? '2px solid' : 'none',
                  borderColor: '#60a5fa',
                  borderRadius: 0,
                  pb: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                Customer Data
              </Button>
              <Menu
                anchorEl={customerDataAnchor}
                open={customerDataOpen}
                onClose={handleCustomerDataClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                sx={{
                  '& .MuiPaper-root': {
                    bgcolor: darkMode ? '#1a1a1a' : '#ffffff',
                    color: darkMode ? '#ffffff' : '#000000',
                    mt: 1,
                  }
                }}
              >
                {customerDataItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname?.startsWith(item.path);
                  return (
                    <MenuItem 
                      key={item.path}
                      onClick={() => handleNavigate(item.path)}
                      sx={{
                        bgcolor: isActive ? 'action.selected' : 'transparent',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        }
                      }}
                    >
                      <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
                        <Icon size={18} />
                      </ListItemIcon>
                      <ListItemText>{item.label}</ListItemText>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
            
            {/* Right Side Controls */}
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  icon={<Sun size={20} />}
                  checkedIcon={<Moon size={20} />}
                />
              }
              label=""
              sx={{ mr: 2 }}
            />
            
            <Typography variant="body2" sx={{ mr: 2, display: { xs: 'none', md: 'block' } }}>
              {user?.email}
            </Typography>
            
            <Button
              color="inherit"
              onClick={logout}
              startIcon={<LogOut size={20} />}
              variant="outlined"
              sx={{ whiteSpace: 'nowrap' }}
            >
              Logout
            </Button>
          </>
        )}

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: 280,
              bgcolor: darkMode ? '#1a1a1a' : '#ffffff',
              color: darkMode ? '#ffffff' : '#000000',
            }
          }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <X size={20} />
            </IconButton>
          </Box>
          <Divider />
          
          <List>
            {/* User Info */}
            <ListItem sx={{ py: 2 }}>
              <ListItemText 
                primary={user?.email} 
                primaryTypographyProps={{ 
                  variant: 'body2',
                  sx: { wordBreak: 'break-word' }
                }}
              />
            </ListItem>
            <Divider />

            {/* Navigation Items */}
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname?.startsWith(item.path);
              return (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton 
                    onClick={() => handleNavigate(item.path)}
                    selected={isActive}
                  >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                      <Icon size={20} />
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}

            {/* Customer Data Collapsible */}
            <ListItem disablePadding>
              <ListItemButton onClick={toggleMobileCustomerData}>
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  <Database size={20} />
                </ListItemIcon>
                <ListItemText primary="Customer Data" />
                {mobileCustomerDataOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </ListItemButton>
            </ListItem>
            <Collapse in={mobileCustomerDataOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {customerDataItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname?.startsWith(item.path);
                  return (
                    <ListItem key={item.path} disablePadding>
                      <ListItemButton 
                        onClick={() => handleNavigate(item.path)}
                        selected={isActive}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                          <Icon size={18} />
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>

            <Divider sx={{ my: 2 }} />

            {/* Dark Mode Toggle */}
            <ListItem>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    icon={<Sun size={20} />}
                    checkedIcon={<Moon size={20} />}
                  />
                }
                label="Dark Mode"
              />
            </ListItem>

            {/* Logout */}
            <ListItem disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  <LogOut size={20} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
