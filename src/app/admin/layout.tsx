'use client';

import { AuthProvider } from '../../contexts/AuthContext';
import { MaterialUIThemeProvider } from '../../contexts/ThemeContext';
import AdminNav from '../../components/AdminNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <MaterialUIThemeProvider>
        <AdminNav />
        {children}
      </MaterialUIThemeProvider>
    </AuthProvider>
  );
}