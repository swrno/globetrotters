'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const MaterialUIThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#60a5fa', // Light blue for primary actions
        light: '#93c5fd',
        dark: '#3b82f6',
      },
      secondary: {
        main: '#a78bfa', // Purple for secondary actions
        light: '#c4b5fd',
        dark: '#8b5cf6',
      },
      success: {
        main: '#4ade80', // Green
        light: '#86efac',
        dark: '#22c55e',
      },
      warning: {
        main: '#fb923c', // Orange
        light: '#fdba74',
        dark: '#f97316',
      },
      error: {
        main: '#f87171', // Red
        light: '#fca5a5',
        dark: '#ef4444',
      },
      info: {
        main: '#38bdf8', // Sky blue
        light: '#7dd3fc',
        dark: '#0ea5e9',
      },
      background: {
        default: darkMode ? '#0f0f0f' : '#f5f5f5',
        paper: darkMode ? '#1a1a1a' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#f5f5f5' : '#1a1a1a',
        secondary: darkMode ? '#a1a1a1' : '#666666',
      },
      divider: darkMode ? '#2a2a2a' : '#e0e0e0',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
            border: darkMode ? '1px solid #2a2a2a' : '1px solid #e0e0e0',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: darkMode ? '#2a2a2a' : '#e0e0e0',
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};