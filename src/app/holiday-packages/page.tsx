'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePackages } from '@/hooks/usePackages';

export default function HolidayPackages() {
  const [activeTab, setActiveTab] = useState('all');
  const { packages, loading, error } = usePackages();

  // Filter packages by category
  const filteredPackages = activeTab === 'all' 
    ? packages 
    : packages.filter(pkg => (pkg.category || 'domestic') === activeTab);

  // Featured packages are just the first 3 packages from database
  const featuredPackages = packages.slice(0, 3);

  return (
    <>
      <Header currentPage="holiday-packages" />

      <div className="innerBanner">
        <figure><img src="/holidaybanner.jpg" alt="" /></figure>
        <div className="bannerCont container">
          <div className="innerBanCont">
            <div className="bannerTxt">
              <h1>The world is full of wonderful things you haven&apos;t seen yet...</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="exploreDreamDiscover gapsec">
        <img src="/planeimg2.svg" alt="" className="exploreDreamDiscoverPlane" />
        <div className="container">
          <div className="headingsec">
            <h3>Collect Moments</h3>
            <h2>Explore. Dream. Discover</h2>
          </div>
          <p>Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.</p>
          <p>Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.</p>
          <p>Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.</p>
        </div>
      </div>

      <div className="expFeaPack">
        <div className="container">
          <div className="headingsec">
            <h2>Explore Featured Packages</h2>
          </div>
          {loading ? (
            <div className="text-center py-5">
              <div className="text-gray-500">Loading featured packages...</div>
            </div>
          ) : error ? (
            <div className="text-center py-5">
              <div className="text-red-500">No packages available at the moment.</div>
            </div>
          ) : featuredPackages.length === 0 ? (
            <div className="text-center py-5">
              <div className="text-gray-500">No packages available.</div>
            </div>
          ) : (
            <div className="row">
              {featuredPackages.map((pkg) => (
                <div key={pkg.id} className="col-lg-4 col-md-6">
                  <div className="item">
                    <figure>
                      <img src={pkg.images[0] || '/destinationimg1.png'} alt={pkg.title} />
                    </figure>
                    <div className="detail">
                      <h3>{pkg.location} <span className="tag">{pkg.category === 'international' ? 'International' : 'Domestic'}</span></h3>
                      <h4><img src="/searchic.svg" alt="" /> {pkg.registrations.length} Registrations</h4>
                      <Link href={`/package/${pkg.id}`} className="arrowBtn">
                        <img src="/arrowbtn.svg" alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div> 
      </div>

      <div className="beyondLimit gapsec">
        <div className="container">
          <div className="headingsec">
            <h3>Venture Beyond Limits</h3>
            <h2>Explore Beyond the Norm</h2>
          </div>
          <div className="beyondLimitTab">
            <ul className="tabMenu" role="tablist">
              <li role="presentation">
                <button 
                  className={activeTab === 'all' ? 'active' : ''}
                  onClick={() => setActiveTab('all')}
                  type="button" 
                  role="tab"
                >
                  All Packages
                </button>
              </li>
              <li role="presentation">
                <button 
                  className={activeTab === 'domestic' ? 'active' : ''}
                  onClick={() => setActiveTab('domestic')}
                  type="button" 
                  role="tab"
                >
                  Domestic
                </button>
              </li>
              <li role="presentation">
                <button 
                  className={activeTab === 'international' ? 'active' : ''}
                  onClick={() => setActiveTab('international')}
                  type="button" 
                  role="tab"
                >
                  International
                </button>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade show active">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="text-gray-500">Loading packages...</div>
                  </div>
                ) : error ? (
                  <div className="text-center py-5">
                    <div className="text-red-500">No packages available at the moment.</div>
                  </div>
                ) : filteredPackages.length === 0 ? (
                  <div className="text-center py-5">
                    <div className="text-gray-500">No packages available for the selected category.</div>
                  </div>
                ) : (
                  <div className="row">
                    {filteredPackages.map((pkg) => (
                      <div key={pkg.id} className="col-lg-4 col-md-6">
                        <div className="item">
                          <figure>
                            <Link href={`/package/${pkg.id}`}>
                              <img src={pkg.images[0] || '/destinationimg1.png'} alt={pkg.title} />
                            </Link>
                          </figure>
                          <h3>{pkg.location}</h3>
                          <p>{pkg.description}</p>
                          <div className="durationBestTime">
                            <ul>
                              <li><span>Duration:</span> {pkg.nights} Nights / {pkg.days} Days</li>
                              <li><span>Best Time to Visit:</span> All Year Round</li>
                            </ul>
                          </div>
                          <Link href={`/package/${pkg.id}`} className="primaryBtn">Enquire</Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="trustTheExp" style={{background: 'url(/trustexpbg.png) no-repeat 0 0'}}>
        <div className="container">
          <div className="innerTrustExp">
            <div className="row">
              <div className="col-lg-5 lftimg">
                <figure><img src="/girlimg.png" alt="" /></figure>
              </div>
              <div className="col-lg-7">
                <div className="trustExpCont">
                  <div className="headingsec">
                    <h3>Wander in Style</h3>
                    <h2>Trust the Experts of Exploration.</h2>
                  </div>
                  <p>Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.</p>
                  <p>Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.</p>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}