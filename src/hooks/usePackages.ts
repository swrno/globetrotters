'use client';

import { useState, useEffect } from 'react';

interface Package {
  _id: string;
  id: string;
  location: string;
  title: string;
  description: string;
  tags: string[];
  days: number;
  nights: number;
  registrations: any[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  // If loading takes too long, show fallback data
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading && packages.length === 0) {
        setPackages(getFallbackPackages());
        setLoading(false);
        setError('Using demo data');
      }
    }, 5000); // Show fallback after 5 seconds

    return () => clearTimeout(timeout);
  }, [loading, packages.length]);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/packages');
      const data = await response.json();
      
      if (data.success) {
        setPackages(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch packages');
        // Use fallback data that matches the raw HTML design
        setPackages(getFallbackPackages());
      }
    } catch (err) {
      setError('An error occurred while fetching packages');
      // Use fallback data that matches the raw HTML design
      setPackages(getFallbackPackages());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackPackages = (): Package[] => [
    {
      _id: '1',
      id: '1',
      location: 'Manali',
      title: 'Himalayan Adventure',
      description: 'Experience the breathtaking beauty of Manali with snow-capped mountains and adventure activities.',
      tags: ['Adventure', 'Mountains', 'Snow'],
      days: 5,
      nights: 4,
      registrations: [],
      images: ['/manali.png'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '2',
      id: '2',
      location: 'Goa',
      title: 'Beach Paradise',
      description: 'Relax on pristine beaches and enjoy the vibrant nightlife of Goa.',
      tags: ['Beach', 'Relaxation', 'Nightlife'],
      days: 4,
      nights: 3,
      registrations: [],
      images: ['/manali.png'], // Using same image for demo
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '3',
      id: '3',
      location: 'Kerala',
      title: 'Backwater Bliss',
      description: 'Cruise through the serene backwaters and experience Kerala\'s natural beauty.',
      tags: ['Nature', 'Backwaters', 'Culture'],
      days: 6,
      nights: 5,
      registrations: [],
      images: ['/manali.png'], // Using same image for demo
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '4',
      id: '4',
      location: 'Rajasthan',
      title: 'Royal Heritage',
      description: 'Explore the majestic palaces and forts of Rajasthan.',
      tags: ['Heritage', 'Palaces', 'Culture'],
      days: 7,
      nights: 6,
      registrations: [],
      images: ['/manali.png'], // Using same image for demo
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '5',
      id: '5',
      location: 'Ladakh',
      title: 'High Altitude Adventure',
      description: 'Experience the rugged beauty of Ladakh and its unique landscape.',
      tags: ['Adventure', 'High Altitude', 'Landscape'],
      days: 8,
      nights: 7,
      registrations: [],
      images: ['/manali.png'], // Using same image for demo
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return { packages, loading, error, refetch: fetchPackages };
}