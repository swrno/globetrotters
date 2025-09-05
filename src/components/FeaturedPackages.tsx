'use client';

import { usePackages } from '@/hooks/usePackages';
import PackageCard from './PackageCard';

export default function FeaturedPackages() {
  const { packages, loading, error } = usePackages();

  if (loading) {
    return (
      <div className="swiper destinationSlider">
        <div className="swiper-wrapper">
          <div className="text-center p-8">
            <div className="text-gray-500">Loading packages...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    // Show fallback data when there's an error
    const fallbackPackages = [
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

    return (
      <div className="swiper destinationSlider">
        <div className="swiper-wrapper">
          {fallbackPackages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>
      </div>
    );
  }

  if (packages.length === 0) {
    return (
      <div className="swiper destinationSlider">
        <div className="swiper-wrapper">
          <div className="text-center p-8">
            <div className="text-gray-500">No packages available yet.</div>
          </div>
        </div>
      </div>
    );
  }

  // Show up to 5 featured packages
  const featuredPackages = packages.slice(0, 5);

  return (
    <div className="swiper destinationSlider">
      <div className="swiper-wrapper">
        {featuredPackages.map((pkg) => (
          <PackageCard key={pkg.id} package={pkg} />
        ))}
      </div>
    </div>
  );
}