'use client';

import { useRouter } from 'next/navigation';

interface Package {
  id: string;
  location: string;
  title: string;
  description: string;
  tags: string[];
  category: 'domestic' | 'international';
  days: number;
  nights: number;
  registrations: any[];
  images: string[];
}

interface PackageCardProps {
  package: Package;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/package/${pkg.id}`);
  };

  const getImageUrl = (image: string) => {
    if (image.startsWith('http')) {
      return image;
    }
    return image.startsWith('/') ? image : `/${image}`;
  };

  const primaryImage = pkg.images.length > 0 ? getImageUrl(pkg.images[0]) : '/manali.png';

  return (
    <div className="swiper-slide">
      <div className="item" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <figure>
          <img src={primaryImage} alt={pkg.title} />
        </figure>
        <h3>{pkg.location}</h3>
      </div>
    </div>
  );
}