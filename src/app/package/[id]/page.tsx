'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PackageRegistrationForm from '@/components/PackageRegistrationForm';

interface Package {
  id: string;
  location: string;
  title: string;
  description: string;
  tags: string[];
  days: number;
  nights: number;
  images: string[];
}

export default function PackageDetails() {
  const params = useParams();
  const packageId = params.id as string;
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPackage() {
      try {
        const response = await fetch(`/api/packages/${packageId}`);
        if (!response.ok) {
          throw new Error('Package not found');
        }
        const data = await response.json();
        if (data.success) {
          setPackageData(data.data);
        } else {
          setError('Package not found');
        }
      } catch (err) {
        console.error('Error fetching package:', err);
        setError('Package not found');
      } finally {
        setLoading(false);
      }
    }

    if (packageId) {
      fetchPackage();
    }
  }, [packageId]);

  if (loading) {
    return (
      <>
        <Header currentPage="" />
        <div className="container py-5">
          <div className="text-center">
            <div className="text-gray-500">Loading package details...</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !packageData) {
    return (
      <>
        <Header currentPage="" />
        <div className="container py-5">
          <div className="text-center">
            <div className="text-red-500">Package not found</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const getImageUrl = (image: string) => {
    if (image.startsWith('http')) {
      return image;
    }
    return image.startsWith('/') ? image : `/${image}`;
  };

  const primaryImage = packageData.images.length > 0 ? getImageUrl(packageData.images[0]) : '/manali.png';

  return (
    <>
      <Header currentPage="" />

      <div className="innerBanner">
        <figure><img src={primaryImage} alt={packageData.title} /></figure>
        <div className="bannerCont container">
          <div className="innerBanCont">
            <div className="bannerTxt">
              <h1>{packageData.location}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="durationCostTime gapsec">
        <div className="container">
          <div className="innerCont">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="item">
                  <figure><img src="/calendaric.svg" alt="" /></figure>
                  <div className="cont">
                    <h4>Duration</h4>
                    <p>{packageData.nights} Nights / {packageData.days} Days</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="item">
                  <figure><img src="/clockic.svg" alt="" /></figure>
                  <div className="cont">
                    <h4>Best Time To Visit</h4>
                    <p>All Year Round</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="item">
                  <figure><img src="/priceic.png" alt="" /></figure>
                  <div className="cont">
                    <h4>Package Type</h4>
                    <p>{packageData.tags.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overView">
        <img src="/planeimg2.svg" alt="" className="overviewPlaneImg" />
        <div className="container">
          <div className="headingsec">
            <h2>Overview</h2>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="overViewLeft">
                <h3>{packageData.title}</h3>
                <p>{packageData.description}</p>
                <p>This carefully crafted itinerary offers the perfect blend of adventure, relaxation, and cultural immersion. Experience the best of {packageData.location} with expert guides and comfortable accommodations.</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="overViewRight">
                <figure>
                  <img src={primaryImage} alt={packageData.title} />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gallerysecHoliday gapsec">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-4 col-6">
              <img src={primaryImage} alt="" />
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <img src={primaryImage} alt="" />
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <img src={primaryImage} alt="" />
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <img src={primaryImage} alt="" />
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <img src={primaryImage} alt="" />
            </div>
            <div className="col-lg-6 col-md-4 col-6">
              <img src={primaryImage} alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form Section */}
      <div className="contactBot gapsec">
        <div className="container">
          <div className="headingsec">
            <h3>Register your interest for this package</h3>
            <h2>Book Your Adventure</h2>
          </div>
          <div className="formSec">
            <PackageRegistrationForm
              packageId={packageData.id}
              packageTitle={packageData.title}
              onSuccess={() => {
                alert('Registration successful! We will contact you soon.');
              }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}