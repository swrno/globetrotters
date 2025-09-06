"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PackageRegistrationForm from "@/components/PackageRegistrationForm";
import Markdown from "@/components/Markdown";

interface Package {
  id: string;
  location: string;
  title: string;
  description: string;
  tags: string[];
  days: number;
  nights: number;
  cost_per_person: number;
  best_time_to_visit: string;
  video_url?: string;
  trip_highlight: Record<string, string>;
  itinerary: {
    description: string;
    details: {
      [key: string]: string;
    };
  };
  inclusions_exclusions: {
    dos: string[];
    donts: string[];
  };
  images: string[];
}

export default function PackageDetails() {
  const params = useParams();
  const packageId = params.id as string;
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPackage() {
      try {
        const response = await fetch(`/api/packages/${packageId}`);
        if (!response.ok) {
          throw new Error("Package not found");
        }
        const data = await response.json();
        if (data.success) {
          setPackageData(data.data);
          setImages(data.data.images);
        } else {
          setError("Package not found");
        }
      } catch (err) {
        console.error("Error fetching package:", err);
        setError("Package not found");
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
    if (image.startsWith("http")) {
      return image;
    }
    return image.startsWith("/") ? image : `/${image}`;
  };

  return (
    <>
      <Header currentPage="" />

      <div className="innerBanner">
        <figure className="overflow-hidden h-96">
          <img
            src={
              images && images.length > 0
                ? getImageUrl(images[0])
                : "/default-package.jpg"
            }
            alt={packageData.title}
            className="h-96 w-full object-cover object-center scale-110"
          />
        </figure>
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
              <div className="col-lg-3 col-md-4">
                <div className="item">
                  <figure>
                    <img src="/calendaric.svg" alt="" />
                  </figure>
                  <div className="cont">
                    <h4>Duration</h4>
                    <p>
                      {packageData.nights} Nights / {packageData.days} Days
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="item">
                  <figure>
                    <img src="/clockic.svg" alt="" />
                  </figure>
                  <div className="cont">
                    <h4>Best Time To Visit</h4>
                    <p>{packageData.best_time_to_visit || 'All Year Round'}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-4">
                <div className="item">
                  <figure>
                    <img src="/priceic.png" alt="" />
                  </figure>
                  <div className="cont">
                    <h4>Cost / Per Person (Approx)</h4>
                    <p>₹{packageData.cost_per_person || 'Contact for price'}</p>
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
                <div className="mb-4">
                  <Markdown content={packageData.description} />
                </div>
                <p>
                  This carefully crafted itinerary offers the perfect blend of
                  adventure, relaxation, and cultural immersion. Experience the
                  best of {packageData.location} with expert guides and
                  comfortable accommodations.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="overViewRight">
                <figure>
                  <img
                    src={
                      images && images.length > 0
                        ? getImageUrl(images[0])
                        : "/default-package.jpg"
                    }
                    alt={packageData.title}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  {packageData.video_url && (
                    <a 
                      href={packageData.video_url} 
                      data-fancybox="overviewVideo" 
                      className="playtn"
                    >
                      <img src="/playbtn2.svg" alt="Play Video" />
                    </a>
                  )}
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gallerysecHoliday gapsec">
        <div className="headingsec">
          <h2>Photo Gallery</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-4 col-6">
              <img
                src={
                  images && images.length > 0
                    ? getImageUrl(images[0])
                    : "/default-package.jpg"
                }
                alt=""
              />
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <img
                src={
                  images && images.length > 1
                    ? getImageUrl(images[1])
                    : "/default-package.jpg"
                }
                alt=""
              />
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <img
                src={
                  images && images.length > 2
                    ? getImageUrl(images[2])
                    : "/default-package.jpg"
                }
                alt=""
              />
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <img
                src={
                  images && images.length > 3
                    ? getImageUrl(images[3])
                    : "/default-package.jpg"
                }
                alt=""
              />
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <img
                src={
                  images && images.length > 4
                    ? getImageUrl(images[4])
                    : "/default-package.jpg"
                }
                alt=""
              />
            </div>
            <div className="col-lg-6 col-md-4 col-6">
              <img
                src={
                  images && images.length > 5
                    ? getImageUrl(images[5])
                    : "/default-package.jpg"
                }
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trip Highlights Section */}
      {packageData.trip_highlight && Object.keys(packageData.trip_highlight).length > 0 && (
        <div className="tripHighlights">
          <div className="container">
            <div className="headingsec">
              <h3>The Best Bits, All in One</h3>
              <h2>Trip Highlights</h2>
            </div>
            <div className="tabsContainer">
              <div className="trip-highlights-tabs">
                <ul className="nav nav-tabs" role="tablist">
                  {Object.keys(packageData.trip_highlight).map((key, index) => (
                    <li className="nav-item" role="presentation" key={key}>
                      <button
                        className={`nav-link ${index === 0 ? 'active' : ''}`}
                        id={`highlight-${key}-tab`}
                        data-bs-toggle="tab"
                        data-bs-target={`#highlight-${key}`}
                        type="button"
                        role="tab"
                        aria-controls={`highlight-${key}`}
                        aria-selected={index === 0 ? 'true' : 'false'}
                      >
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="tab-content">
                  {Object.entries(packageData.trip_highlight).map(([key, value], index) => (
                    <div
                      className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
                      id={`highlight-${key}`}
                      role="tabpanel"
                      aria-labelledby={`highlight-${key}-tab`}
                      key={key}
                    >
                      <div className="trip-highlight-content">
                        <Markdown content={value} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Itinerary Section */}
      {packageData.itinerary && packageData.itinerary.description && (
        <div className="itinerary gapsec">
          <img src="/dotted-plane.png" alt="" className="itineraryPlane" />
          <div className="container">
            <div className="headingsec">
              <h3>Crafting Your Dream Getaway</h3>
              <h2>Itinerary</h2>
              <p>{packageData.itinerary.description}</p>
            </div>
            <div className="accordionWrapper">
              <div className="accordion" id="itineraryAccordion">
                {Object.entries(packageData.itinerary.details).map(([day, details], index) => (
                  <div className="accordion-item" key={day}>
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${day}`}
                        aria-expanded={index === 0 ? 'true' : 'false'}
                        aria-controls={`collapse-${day}`}
                      >
                        {day.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </button>
                    </h2>
                    <div
                      id={`collapse-${day}`}
                      className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                      data-bs-parent="#itineraryAccordion"
                    >
                      <div className="accordion-body">
                        <Markdown content={details} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inclusions/Exclusions Section */}
      {(packageData.inclusions_exclusions?.dos?.length > 0 || packageData.inclusions_exclusions?.donts?.length > 0) && (
        <div className="includeExclude gapsec">
          <div className="container">
            <div className="headingsec">
              <h2>Inclusions / Exclusions</h2>
              <p>To help you plan your trip, we have put together a list of what&apos;s included and what&apos;s not included in your tour package. This will give you a clear understanding of what to expect and help you make any necessary arrangements before your journey begins.</p>
            </div>
            <div className="row">
              {packageData.inclusions_exclusions.dos?.length > 0 && (
                <div className="col-md-6">
                  <div className="itemInclude">
                    <h4>Inclusions</h4>
                    <ul>
                      {packageData.inclusions_exclusions.dos.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {packageData.inclusions_exclusions.donts?.length > 0 && (
                <div className="col-md-6">
                  <div className="itemExclude">
                    <h4>Exclusions</h4>
                    <ul>
                      {packageData.inclusions_exclusions.donts.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
                alert("Registration successful! We will contact you soon.");
              }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
