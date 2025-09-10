"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PackageRegistrationForm from "@/components/PackageRegistrationForm";
import Markdown from "@/components/Markdown";

// Mock data for demonstration
const mockPackageData = {
  id: "demo-himachal",
  location: "Himachal Pradesh",
  title: "Himachal Adventure Package",
  description: `Explore the magnificent beauty of Himachal Pradesh with our comprehensive adventure package. This carefully curated itinerary takes you through the snow-capped mountains, lush valleys, and vibrant cultural heritage of the region.

## Highlights
- Visit to Shimla and Manali
- Adventure activities like paragliding and river rafting
- Scenic drives through mountain passes
- Local cultural experiences
- Comfortable accommodations throughout the journey`,
  tags: ["adventure", "mountains", "trekking", "snow", "domestic", "himachal"],
  days: 6,
  nights: 5,
  cost_per_person: 25000,
  trip_highlight: {
    "scenicLandscapes": "**Rohtang Pass,** a stunning mountain pass at 3,978 meters, known for its breathtaking views and snow activities. It's a prime spot for adventure enthusiasts seeking skiing and snowboarding experiences.\n\n**Spiti Valley,** renowned for its rugged terrain, beautiful valleys, and unique cultural heritage. Highlights include Kye Gompa and Chandratal Lake, making it a must-visit for nature lovers and trekkers.",
    "adventureActivities": "**Paragliding in Manali** - Experience the thrill of flying over the beautiful valleys and snow-capped peaks.\n\n**River Rafting in Beas** - Navigate through exciting rapids while enjoying the scenic beauty of the river.",
    "culturalLandmarks": "**Hadimba Devi Temple** - An ancient cave temple surrounded by cedar forests.\n\n**Mall Road Shimla** - Colonial architecture and vibrant local markets.",
    "naturalAttractions": "**Solang Valley** - Known for adventure sports and scenic beauty.\n\n**Chandratal Lake** - A crescent-shaped lake at high altitude, perfect for camping."
  },
  itinerary: {
    description: "Himachal Pradesh, known as 'Dev Bhoomi' (Land of Gods), is a paradise in the Himalayas, offering serene landscapes, vibrant culture, and thrilling adventures. Famous for picturesque hill stations like Shimla, Manali, and Dharamshala, it blends colonial charm, Tibetan heritage, and natural beauty. From snow-capped peaks to lush valleys, Himachal is perfect for trekking, paragliding, and exploring spiritual sites. This 5 Nights / 6 Days itinerary promises a mix of scenic beauty, cultural experiences, and adventure to create unforgettable memories.",
    details: {
      "day1": "**Arrival in Shimla**\n\n- Arrive in Shimla (via Delhi or Chandigarh) and check into your hotel\n- Evening stroll on Mall Road, explore local shops, and enjoy local cuisine\n- Overnight stay in Shimla",
      "day2": "**Shimla Sightseeing**\n\n- Visit Jakhu Temple and Christ Church\n- Explore The Ridge and Mall Road\n- Take a toy train ride to Kalka (optional)\n- Overnight stay in Shimla",
      "day3": "**Shimla to Manali**\n\n- Early morning departure for Manali (8-9 hours drive)\n- Check into hotel upon arrival\n- Rest and acclimatize to the mountain climate\n- Overnight stay in Manali",
      "day4": "**Manali Local Sightseeing**\n\n- Visit Hadimba Devi Temple and Manu Temple\n- Explore Old Manali and Vashisht Hot Springs\n- Shopping at Mall Road Manali\n- Overnight stay in Manali",
      "day5": "**Solang Valley or Rohtang Pass Excursion**\n\n- Full day excursion to Solang Valley or Rohtang Pass (subject to weather)\n- Adventure activities like paragliding, zorbing, and skiing\n- Scenic photography and nature walks\n- Return to Manali for overnight stay",
      "day6": "**Departure**\n\n- Check out from hotel after breakfast\n- Departure to Delhi/Chandigarh\n- End of memorable Himachal tour"
    }
  },
  inclusions_exclusions: {
    dos: [
      "Accommodation for 5 nights (double sharing basis)",
      "Daily breakfast and dinner",
      "Transportation by private vehicle",
      "Sightseeing as per itinerary",
      "All permits and entry fees",
      "Professional driver cum guide"
    ],
    donts: [
      "Airfare or train fare",
      "Lunch and personal expenses",
      "Adventure activity charges",
      "Travel insurance",
      "Tips and gratuities",
      "Any item not specifically mentioned in inclusions"
    ]
  },
  images: [
    "/holidaygal1.png",
    "/holidaygal2.png", 
    "/holidaygal3.png",
    "/holidaygal4.png",
    "/holidaygal5.png",
    "/holidaygal6.png"
  ]
};

export default function PackageDetailsDemo() {
  const packageData = mockPackageData;
  const images = packageData.images;

  // Initialize easy responsive tabs after component mounts
  useEffect(() => {
    if (packageData && packageData.trip_highlight && typeof window !== 'undefined') {
      // Wait for the next tick to ensure DOM is ready
      setTimeout(() => {
        const $ = (window as any).$;
        if ($ && $('#parentHorizontalTab').length > 0) {
          $('#parentHorizontalTab').easyResponsiveTabs({
            type: 'default',
            width: 'auto',
            fit: true,
            tabidentify: 'hor_1',
          });
        }
      }, 100);
    }
  }, [packageData]);

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
                    <p>All Year Round</p>
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
              <div id="parentHorizontalTab">
                <ul className="resp-tabs-list hor_1">
                  {Object.keys(packageData.trip_highlight).map((key, index) => (
                    <li key={key}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </li>
                  ))}
                </ul>
                <div className="resp-tabs-container hor_1">
                  {Object.entries(packageData.trip_highlight).map(([key, value], index) => (
                    <div key={key}>
                      <Markdown content={value} />
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