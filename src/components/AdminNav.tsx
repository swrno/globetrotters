'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  LayoutDashboard,
  Package,
  Users,
  Mail,
  Moon,
  Sun,
  LogOut,
} from 'lucide-react';

export default function AdminNav() {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  // Don't show nav on login page
  if (pathname === '/admin') {
    return null;
  }

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Packages', path: '/admin/packages', icon: Package },
    { label: 'Registrations', path: '/admin/registrations', icon: Users },
    { label: 'Newsletter', path: '/admin/newsletter', icon: Mail },
  ];

  return (
    <AppBar position="sticky" elevation={1} sx={{ 
      bgcolor: darkMode ? '#1a1a1a' : '#ffffff',
      color: darkMode ? '#ffffff' : '#000000'
    }}>
      <Toolbar>
        <Box component="img" src="/logo.svg" alt="Logo" sx={{ height: 40, mr: 3 }} />
        
        {/* Navigation Items */}
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname?.startsWith(item.path);
            return (
              <Button
                key={item.path}
                color="inherit"
                onClick={() => router.push(item.path)}
                startIcon={<Icon size={18} />}
                sx={{ 
                  borderBottom: isActive ? '2px solid' : 'none',
                  borderColor: '#60a5fa',
                  borderRadius: 0,
                  pb: 1,
                }}
              >
                {item.label}
              </Button>
            );
          })}
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
        
        <Typography variant="body2" sx={{ mr: 2 }}>
          {user?.email}
        </Typography>
        
        <Button
          color="inherit"
          onClick={logout}
          startIcon={<LogOut size={20} />}
          variant="outlined"
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
