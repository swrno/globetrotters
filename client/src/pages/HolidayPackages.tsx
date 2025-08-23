import { useState } from 'react';

const HolidayPackages = () => {
  const [activeTab, setActiveTab] = useState('domestic');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {/* Inner Banner */}
      <div className="innerBanner">
        <figure><img src="/images/holidaybanner.jpg" alt="" /></figure>
        <div className="bannerCont container">
          <div className="innerBanCont">
            <div className="bannerTxt">
              <h1>The world is full of wonderful things you haven't seen yet...</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Dream Discover Section */}
      <div className="exploreDreamDiscover gapsec">
        <img src="/images/planeimg2.svg" alt="" className="exploreDreamDiscoverPlane" />
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

      {/* Explore Featured Packages Section */}
      <div className="expFeaPack">
        <div className="container">
          <div className="headingsec">
            <h2>Explore Featured Packages</h2>
          </div>
          <div className="row">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="item">
                  <figure><img src="/images/psckdestinationimg.png" alt="" /></figure>
                  <div className="detail">
                    <h3>Manali <span className="tag">Domestic</span></h3>
                    <h4><img src="/images/searchic.svg" alt="" /> 100 Searches</h4>
                    <a href="#" className="arrowBtn"><img src="/images/arrowbtn.svg" alt="" /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Beyond Limit Section */}
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
                  id="domestic-tab" 
                  type="button" 
                  role="tab" 
                  aria-controls="domestic" 
                  aria-selected={activeTab === 'domestic'}
                  onClick={() => handleTabClick('domestic')}
                >
                  Domestic
                </button>
              </li>
              <li role="presentation">
                <button 
                  className={activeTab === 'international' ? 'active' : ''} 
                  id="international-tab" 
                  type="button" 
                  role="tab" 
                  aria-controls="international" 
                  aria-selected={activeTab === 'international'}
                  onClick={() => handleTabClick('international')}
                >
                  International
                </button>
              </li>
            </ul>
            <div className="tab-content">
              <div className={`tab-pane fade ${activeTab === 'domestic' ? 'show active' : ''}`} id="domestic" role="tabpanel" aria-labelledby="domestic-tab">
                <div className="row">
                  {Array.from({ length: 3 }, (_, index) => (
                    <div key={index} className="col-lg-4 col-md-6">
                      <div className="item">
                        <figure><a href="#"><img src="/images/destinationimg1.png" alt="" /></a></figure>
                        <h3>Kerala</h3>
                        <p>Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.</p>
                        <div className="durationBestTime">
                          <ul>
                            <li><span>Duration:</span> 5 Night / 6 Days (2N Shimla - 3N Manali - 1D Delhi)</li>
                            <li><span>Best Time to Visit:</span> APR - MAY</li>
                          </ul>
                        </div>
                        <a href="#" className="primaryBtn">Enquire</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`tab-pane fade ${activeTab === 'international' ? 'show active' : ''}`} id="international" role="tabpanel" aria-labelledby="international-tab">
                <div className="row">
                  {Array.from({ length: 3 }, (_, index) => (
                    <div key={index} className="col-lg-4 col-md-6">
                      <div className="item">
                        <figure><a href="#"><img src="/images/destinationimg1.png" alt="" /></a></figure>
                        <h3>Thailand</h3>
                        <p>Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.</p>
                        <div className="durationBestTime">
                          <ul>
                            <li><span>Duration:</span> 7 Night / 8 Days (3N Bangkok - 4N Phuket)</li>
                            <li><span>Best Time to Visit:</span> NOV - MAR</li>
                          </ul>
                        </div>
                        <a href="#" className="primaryBtn">Enquire</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Experience Section */}
      <div className="trustExp gapsec" style={{background: 'url(/images/trustexpbg.png) no-repeat center center', backgroundSize: 'cover'}}>
        <div className="container">
          <div className="trustExpCont">
            <div className="headingsec">
              <h3>Celebrating Excellence in Travel</h3>
              <h2>Trust Experience Numbers</h2>
            </div>
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="item">
                  <h3>2500+</h3>
                  <h4>Happy Travelers</h4>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="item">
                  <h3>50+</h3>
                  <h4>Destinations</h4>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="item">
                  <h3>100+</h3>
                  <h4>Verified Reviews</h4>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="item">
                  <h3>15+</h3>
                  <h4>Years Experience</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Travel Overview Section */}
      <div className="travelOverview gapsec">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="overviewImg">
                <figure><img src="/images/overviewimg.png" alt="" /></figure>
                <a href="/images/SampleVideo_1280x720_1mb.mp4" data-fancybox="overviewVideo" className="playbtn">
                  <img src="/images/playbtn2.svg" alt="" />
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="overviewCont">
                <div className="headingsec">
                  <h3>Your Adventure Awaits</h3>
                  <h2>Travel Overview</h2>
                </div>
                <p>Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.</p>
                <p>Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia.</p>
                <a href="#" className="primaryBtn">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Gallery Section */}
      <div className="ourGallery gapsec">
        <div className="container">
          <div className="headingsec">
            <h3>Picture Perfect Memories</h3>
            <h2>Our Gallery</h2>
          </div>
          <div className="galleryCont">
            <div className="row">
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="col-lg-4 col-6">
                  <figure>
                    <img src={`/images/holidaygal${index + 1}.png`} alt="" />
                    <a href={`/images/holidaygal${index + 1}.png`} data-fancybox="gallery-b">
                      <img src="/images/zoomic.svg" alt="" />
                    </a>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayPackages;
