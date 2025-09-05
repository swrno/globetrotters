'use client';

import { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import SuccessModal from './SuccessModal';

interface Package {
  id: string;
  location: string;
  title: string;
  description: string;
  tags: string[];
  days: number;
  nights: number;
  registrations: any[];
  images: string[];
}

interface PackageCardProps {
  package: Package;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRegistrationSuccess = () => {
    setShowRegistration(false);
    setShowSuccess(true);
  };

  const getImageUrl = (image: string) => {
    if (image.startsWith('http')) {
      return image;
    }
    return image.startsWith('/') ? image : `/${image}`;
  };

  const primaryImage = pkg.images.length > 0 ? getImageUrl(pkg.images[0]) : '/manali.png';

  return (
    <>
      <div className="swiper-slide">
        <div className="item">
          <figure>
            <img src={primaryImage} alt={pkg.title} />
          </figure>
          <div className="package-info">
            <h3>{pkg.location}</h3>
            <h4>{pkg.title}</h4>
            <p className="package-duration">{pkg.days}D/{pkg.nights}N</p>
            <div className="package-tags">
              {pkg.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => setShowRegistration(true)}
              className="register-btn primaryBtn"
            >
              Register Interest
            </button>
          </div>
        </div>
      </div>

      {showRegistration && (
        <RegistrationForm
          packageId={pkg.id}
          packageTitle={pkg.title}
          onClose={() => setShowRegistration(false)}
          onSuccess={handleRegistrationSuccess}
        />
      )}

      {showSuccess && (
        <SuccessModal
          packageTitle={pkg.title}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  );
}