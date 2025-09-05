'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HolidayPackages() {
  const [activeTab, setActiveTab] = useState('domestic');

  const packages = [
    {
      id: 1,
      name: 'Kerala',
      image: '/destinationimg1.png',
      description: 'Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.',
      duration: '5 Night / 6 Days (2N Shimla - 3N Manali - 1D Delhi)',
      bestTime: 'APR - MAY',
      type: 'domestic'
    },
    {
      id: 2,
      name: 'Goa',
      image: '/destinationimg1.png',
      description: 'Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.',
      duration: '4 Night / 5 Days',
      bestTime: 'NOV - MAR',
      type: 'domestic'
    },
    {
      id: 3,
      name: 'Rajasthan',
      image: '/destinationimg1.png',
      description: 'Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.',
      duration: '6 Night / 7 Days',
      bestTime: 'OCT - MAR',
      type: 'domestic'
    },
    {
      id: 4,
      name: 'Thailand',
      image: '/destinationimg1.png',
      description: 'Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.',
      duration: '5 Night / 6 Days',
      bestTime: 'NOV - APR',
      type: 'international'
    },
    {
      id: 5,
      name: 'Dubai',
      image: '/destinationimg1.png',
      description: 'Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.',
      duration: '4 Night / 5 Days',
      bestTime: 'NOV - MAR',
      type: 'international'
    }
  ];

  const featuredPackages = [
    { id: 1, name: 'Manali', tag: 'Domestic', searches: 100, image: '/psckdestinationimg.png' },
    { id: 2, name: 'Goa', tag: 'Domestic', searches: 85, image: '/psckdestinationimg.png' },
    { id: 3, name: 'Dubai', tag: 'International', searches: 120, image: '/psckdestinationimg.png' }
  ];

  const filteredPackages = packages.filter(pkg => pkg.type === activeTab);

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
          <div className="row">
            {featuredPackages.map((pkg) => (
              <div key={pkg.id} className="col-lg-4 col-md-6">
                <div className="item">
                  <figure><img src={pkg.image} alt="" /></figure>
                  <div className="detail">
                    <h3>{pkg.name} <span className="tag">{pkg.tag}</span></h3>
                    <h4><img src="/searchic.svg" alt="" /> {pkg.searches} Searches</h4>
                    <Link href="#" className="arrowBtn"><img src="/arrowbtn.svg" alt="" /></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                <div className="row">
                  {filteredPackages.map((pkg) => (
                    <div key={pkg.id} className="col-lg-4 col-md-6">
                      <div className="item">
                        <figure><Link href="#"><img src={pkg.image} alt="" /></Link></figure>
                        <h3>{pkg.name}</h3>
                        <p>{pkg.description}</p>
                        <div className="durationBestTime">
                          <ul>
                            <li><span>Duration:</span> {pkg.duration}</li>
                            <li><span>Best Time to Visit:</span> {pkg.bestTime}</li>
                          </ul>
                        </div>
                        <Link href="#" className="primaryBtn">Enquire</Link>
                      </div>
                    </div>
                  ))}
                </div>
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