'use client';

import { useState, useEffect } from 'react';

interface Package {
  _id: string;
  id: string;
  location: string;
  title: string;
  description: string;
  tags: string[];
  category: 'domestic' | 'international';
  days: number;
  nights: number;
  cost_per_person: number;
  registrations: any[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/packages');
      const data = await response.json();
      
      if (data.success) {
        setPackages(data.data || []);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch packages');
        setPackages([]);
      }
    } catch (err) {
      setError('An error occurred while fetching packages');
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return { packages, loading, error, refetch: fetchPackages };
}