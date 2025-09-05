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
    return (
      <div className="swiper destinationSlider">
        <div className="swiper-wrapper">
          <div className="text-center p-8">
            <div className="text-red-500">Error loading packages: {error}</div>
          </div>
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