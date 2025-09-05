'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { MaterialUIThemeProvider } from '@/contexts/ThemeContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <MaterialUIThemeProvider>
        {children}
      </MaterialUIThemeProvider>
    </AuthProvider>
  );
}