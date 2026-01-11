'use client';

import { useEffect, useRef } from 'react';
import { usePackages } from '../hooks/usePackages';
import PackageCard from './PackageCard';

export default function FeaturedPackages() {
  const { packages, loading, error } = usePackages();
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Swiper after component mounts. Try global first, then dynamic import.
    let swInstance: any = null;
    let mounted = true;

    const options = {
      loop: true,
      slidesPerView: 2.5,
      spaceBetween: 30,
      autoplay: {
        delay: 3000,
      },
      breakpoints: {
        0: {
          slidesPerView: 1.2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 2.5,
          spaceBetween: 30,
        },
      },
    };

    async function initSwiper() {
      if (!swiperRef.current) return;

      // If the global script provided Swiper, use it
      if (typeof window !== 'undefined' && (window as any).Swiper) {
        swInstance = new (window as any).Swiper(swiperRef.current, options);
        return;
      }

      // Otherwise dynamically import the module
      try {
        const mod = await import('swiper');
        const { Autoplay } = await import('swiper/modules');
        const SwiperCtor = (mod && (mod.default || mod.Swiper)) as any;
        const modules: any[] = [Autoplay];
        if (!mounted) return;
        if (SwiperCtor && swiperRef.current) {
          // Pass modules when using the ESM build so features like autoplay work
          const opts = { ...options, modules };
          swInstance = new SwiperCtor(swiperRef.current, opts);
        }
      } catch (err) {
        // Fail silently but log to console to help debugging
        // eslint-disable-next-line no-console
        console.error('Failed to initialize Swiper:', err);
      }
    }

    initSwiper();

    return () => {
      mounted = false;
      if (swInstance && typeof swInstance.destroy === 'function') {
        try {
          swInstance.destroy(true, true);
        } catch (e) {
          // ignore
        }
      }
    };
  }, [packages]); // Re-initialize when packages change

  if (loading) {
    return (
      <div className="swiper destinationSlider" ref={swiperRef}>
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="text-center p-8">
              <div className="text-gray-500">Loading packages...</div>
            </div>
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
        category: 'domestic' as const,
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
        category: 'domestic' as const,
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
        category: 'domestic' as const,
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
        category: 'domestic' as const,
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
        category: 'domestic' as const,
        days: 8,
        nights: 7,
        registrations: [],
        images: ['/manali.png'], // Using same image for demo
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    return (
      <div className="swiper destinationSlider" ref={swiperRef}>
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
      <div className="swiper destinationSlider" ref={swiperRef}>
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="text-center p-8">
              <div className="text-gray-500">No packages available yet.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show up to 5 featured packages
  const featuredPackages = packages.slice(0, 5);

  return (
    <div className="swiper destinationSlider" ref={swiperRef}>
      <div className="swiper-wrapper">
        {featuredPackages.map((pkg) => (
          <PackageCard key={pkg.id} package={pkg} />
        ))}
      </div>
    </div>
  );
}