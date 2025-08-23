const Home = () => {
  return (
    <div style={{ overflow: 'hidden' }}>
      {/* Inline styles to ensure static layout for disabled sliders */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .static-slider .slider-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
          }
          .static-slider .static-slide {
            flex: 0 0 auto;
            min-width: 200px;
          }
          .horizontal-slider {
            padding: 20px 0;
            overflow: hidden;
          }
          .slider-container {
            display: flex;
            gap: 30px;
            overflow-x: auto;
            scroll-behavior: smooth;
            padding: 10px 0 20px 0;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: #ff6b35 #f0f0f0;
          }
          .slider-container::-webkit-scrollbar {
            height: 8px;
          }
          .slider-container::-webkit-scrollbar-track {
            background: #f0f0f0;
            border-radius: 4px;
          }
          .slider-container::-webkit-scrollbar-thumb {
            background: #ff6b35;
            border-radius: 4px;
          }
          .slider-container::-webkit-scrollbar-thumb:hover {
            background: #e55a2b;
          }
          .slide-item {
            flex: 0 0 280px;
            position: relative;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
            background: white;
          }
          .slide-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
          }
          .slide-item figure {
            margin: 0;
            position: relative;
            height: 200px;
            overflow: hidden;
          }
          .slide-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }
          .slide-item:hover img {
            transform: scale(1.1);
          }
          .package-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
            color: white;
            padding: 20px;
            text-align: left;
          }
          .package-overlay h3 {
            margin: 0 0 5px 0;
            font-size: 1.4rem;
            font-weight: bold;
          }
          .package-overlay p {
            margin: 0 0 10px 0;
            font-size: 0.9rem;
            opacity: 0.9;
          }
          .package-overlay .price {
            background: #ff6b35;
            padding: 5px 12px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 0.9rem;
            display: inline-block;
          }
          @media (max-width: 768px) {
            .slide-item {
              flex: 0 0 250px;
            }
            .slider-container {
              gap: 20px;
            }
            .slide-item figure {
              height: 150px;
            }
          }
          @media (max-width: 480px) {
            .slide-item {
              flex: 0 0 220px;
            }
            .horizontal-slider {
              padding: 10px 0;
            }
          }
          .tourCateSlider-disabled .slider-wrapper {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
          }
          .tourCateSlider-disabled .static-slide {
            flex: 0 0 auto;
            width: 200px;
          }
          .testimonialSlider .static-slider .slider-wrapper {
            display: block;
          }
          /* Disable any transforms or transitions that might cause zoom */
          .container-wrapper, .swiper, .destinationSlider, .tourCateSlider, .testimonialSlider {
            transform: none !important;
            transition: none !important;
            margin-left: auto !important;
          }
        `
      }} />
      
      {/* Banner Section */}
      <div className="banner">
        <figure>
          <img src="/images/banner.jpg" alt="" />
        </figure>
        <div className="bannerCont container">
          <div className="innerBanCont">
            <div className="bannerTxt">
              <h3>We maximize your vacation experience the right way</h3>
              <h1>Strategic Itineraries. Adventurous Memories</h1>
            </div>
            <div className="banFormSec">
              <div className="formFields">
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group">
                      <input type="text" placeholder="Destination" />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <select>
                        <option value="">Select Month of Travel</option>
                        <option value="Jan">Jan</option>
                        <option value="Feb">Feb</option>
                        <option value="Mar">Mar</option>
                        <option value="Apr">Apr</option>
                        <option value="May">May</option>
                        <option value="Jun">Jun</option>
                        <option value="Jul">Jul</option>
                        <option value="Aug">Aug</option>
                        <option value="Sep">Sep</option>
                        <option value="Oct">Oct</option>
                        <option value="Nov">Nov</option>
                        <option value="Dec">Dec</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <select>
                        <option value="">Select Duration of Travel</option>
                        <option value="2D/1N">2D/1N</option>
                        <option value="3D/2N">3D/2N</option>
                        <option value="4D/3N">4D/3N</option>
                        <option value="5D/4N">5D/4N</option>
                        <option value="6D/5N">6D/5N</option>
                        <option value="7D/6N">7D/6N</option>
                        <option value="8D+">8D+</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <select>
                        <option value="">Select Budget per Person</option>
                        <option value="Less than ₹20000">Less than ₹20000</option>
                        <option value="₹20001 to ₹40000">₹20001 to ₹40000</option>
                        <option value="₹40001 to ₹60000">₹40001 to ₹60000</option>
                        <option value="₹60001 to ₹80000">₹60001 to ₹80000</option>
                        <option value="₹80001 to ₹100000">₹80001 to ₹100000</option>
                        <option value="More than ₹100000">More than ₹100000</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="formBtn">
                  <input type="button" value="Search" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Globetrotters Section */}
      <div className="whyGlobetrotters gapsec">
        <img src="/images/dotted-plane.png" className="dotted-plane" alt="" />
        <div className="container">
          <div className="whyGlobetrottersTop">
            <div className="row">
              <div className="col-lg-6">
                <div className="lftImg">
                  <img src="/images/whyimg1.png" alt="" />
                  <img src="/images/whyimg2.png" alt="" />
                  <img src="/images/whyimg3.png" alt="" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="rightCont">
                  <div className="headingsec">
                    <h3>Elevate your travel experience</h3>
                    <h2>Why Globetrotters</h2>
                  </div>
                  <p>
                    Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                    aliquet odio mattis.Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
                    velit interdum, ac aliquet odio mattis.Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                    vulputate libero et velit interdum, ac aliquet odio mattis.Nunc vulputate libero et velit interdum, ac
                    aliquet odio mattis.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="whyGlobetrottersBot">
            <div className="row">
              <div className="col-lg-6">
                <div className="whyGlobetrottersBotCont">
                  <ul>
                    <li>
                      <figure>
                        <img src="/images/invoice.svg" alt="" />
                      </figure>
                      <div className="whyInfoCont">
                        <h4>Centralized Information</h4>
                        <p>
                          Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Nunc vulputate libero et velit
                          interdum, ac aliquet odio mattis.
                        </p>
                      </div>
                    </li>
                    <li>
                      <figure>
                        <img src="/images/network.svg" alt="" />
                      </figure>
                      <div className="whyInfoCont">
                        <h4>Worldwide Connectivity</h4>
                        <p>
                          Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Nunc vulputate libero et velit
                          interdum, ac aliquet odio mattis.
                        </p>
                      </div>
                    </li>
                    <li>
                      <figure>
                        <img src="/images/deflation.svg" alt="" />
                      </figure>
                      <div className="whyInfoCont">
                        <h4>Cost Saving</h4>
                        <p>
                          Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Nunc vulputate libero et velit
                          interdum, ac aliquet odio mattis.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="whyInfoVideo">
                  <figure>
                    <div className="thumbnailImg">
                      <img src="/images/whyimg4.png" alt="" />
                    </div>
                    <a href="#" className="playbtn" style={{ pointerEvents: 'none' }}>
                      <img src="/images/playbtn.svg" alt="" />
                    </a>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Holiday Packages Section */}
      <div 
        className="feaHolidayPack gapsec"
        style={{
          background: 'url(/images/featureholidaybg.png) no-repeat 0 0',
          backgroundSize: '100% 100%',
          padding: '60px 0'
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-5 feaHolidayPackCont">
              <div className="lftCont">
                <div className="headingsec">
                  <h3>Uncover hidden gems with us</h3>
                  <h2>Featured Holiday Packages</h2>
                </div>
                <p>
                  Discover breathtaking destinations with our carefully curated holiday packages. From snow-capped mountains to pristine beaches, 
                  we offer unforgettable experiences that create lasting memories. Each package is designed to provide you with the perfect balance 
                  of adventure, relaxation, and cultural immersion.
                </p>
                <a href="#" className="primaryBtn">Explore All Packages</a>
              </div>
            </div>
            <div className="col-lg-7 feaHolidayPackSlider">
              <div className="horizontal-slider">
                <div className="slider-container">
                  <div className="slide-item">
                    <figure>
                      <img src="/images/holidaygal1.png" alt="Manali Holiday Package" />
                      <div className="package-overlay">
                        <h3>Manali</h3>
                        <p>Mountain Paradise</p>
                        <span className="price">₹25,000</span>
                      </div>
                    </figure>
                  </div>
                  <div className="slide-item">
                    <figure>
                      <img src="/images/holidaygal2.png" alt="Kashmir Holiday Package" />
                      <div className="package-overlay">
                        <h3>Kashmir</h3>
                        <p>Heaven on Earth</p>
                        <span className="price">₹35,000</span>
                      </div>
                    </figure>
                  </div>
                  <div className="slide-item">
                    <figure>
                      <img src="/images/holidaygal3.png" alt="Goa Holiday Package" />
                      <div className="package-overlay">
                        <h3>Goa</h3>
                        <p>Beach Bliss</p>
                        <span className="price">₹18,000</span>
                      </div>
                    </figure>
                  </div>
                  <div className="slide-item">
                    <figure>
                      <img src="/images/holidaygal4.png" alt="Kerala Holiday Package" />
                      <div className="package-overlay">
                        <h3>Kerala</h3>
                        <p>God's Own Country</p>
                        <span className="price">₹28,000</span>
                      </div>
                    </figure>
                  </div>
                  <div className="slide-item">
                    <figure>
                      <img src="/images/holidaygal5.png" alt="Rajasthan Holiday Package" />
                      <div className="package-overlay">
                        <h3>Rajasthan</h3>
                        <p>Royal Heritage</p>
                        <span className="price">₹32,000</span>
                      </div>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Home About Section */}
      <div className="homeAbout gapsec">
        <img src="/images/planeimg2.svg" alt="" className="aboutPlaneImg" />
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="aboutLftImg">
                <img src="/images/aboutimgbig.png" alt="" className="aboutimgbig" />
                <img src="/images/aboutimgsmall.png" alt="" className="aboutimgsmall" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="headingsec">
                <h3>Know our Story</h3>
                <h2>About Us</h2>
              </div>
              <p>
                Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                aliquet odio mattis.Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis.Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
                libero et velit interdum, ac aliquet odio mattis.Nunc vulputate libero et velit interdum, ac aliquet odio
                mattis.
              </p>
              <p>
                Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                aliquet odio mattis.Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis.Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
                libero et velit interdum, ac aliquet odio mattis.Nunc vulputate libero et velit interdum, ac aliquet odio
                mattis.
              </p>
              <a href="#" className="primaryBtn">Know more</a>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Categories Section */}
      <div className="tourCate gapsec">
        <div className="container">
          <div className="innerTourCate">
            <div className="headingsec">
              <h3>Embrace your wanderlust</h3>
              <h2>Tour Categories</h2>
            </div>
            <div className="static-slider tourCateSlider-disabled">
              <div className="slider-wrapper">
                <div className="static-slide">
                  <div className="item">
                    <figure>
                      <img src="/images/cateimg1.png" alt="" />
                    </figure>
                    <h4>
                      <a href="#">Hiking</a>
                    </h4>
                  </div>
                </div>
                <div className="static-slide">
                  <div className="item">
                    <figure>
                      <img src="/images/cateimg2.png" alt="" />
                    </figure>
                    <h4>
                      <a href="#">Adventure</a>
                    </h4>
                  </div>
                </div>
                <div className="static-slide">
                  <div className="item">
                    <figure>
                      <img src="/images/cateimg3.png" alt="" />
                    </figure>
                    <h4>
                      <a href="#">Cultural</a>
                    </h4>
                  </div>
                </div>
                <div className="static-slide">
                  <div className="item">
                    <figure>
                      <img src="/images/cateimg1.png" alt="" />
                    </figure>
                    <h4>
                      <a href="#">Beach</a>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Recent Collections Section */}
      <div className="ourRecentColl gapsec">
        <div className="container">
          <div className="headingsec">
            <h3>Some unforgettable memories</h3>
            <h2>Our Recent Collections</h2>
          </div>
          <div className="imgGal">
            <div className="row">
              <div className="col-lg-7">
                <div className="imgGalWrap">
                  <figure>
                    <img src="/images/galimg1.png" alt="" />
                    <a href="#" style={{ pointerEvents: 'none' }}>
                      <img src="/images/zoomic.svg" alt="" />
                    </a>
                  </figure>
                  <figure>
                    <img src="/images/galimg2.png" alt="" />
                    <a href="#" style={{ pointerEvents: 'none' }}>
                      <img src="/images/zoomic.svg" alt="" />
                    </a>
                  </figure>
                  <figure>
                    <img src="/images/galimg3.png" alt="" />
                    <a href="#" style={{ pointerEvents: 'none' }}>
                      <img src="/images/zoomic.svg" alt="" />
                    </a>
                  </figure>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="imgGalWrap">
                  <figure>
                    <img src="/images/galimg4.png" alt="" />
                    <a href="#" style={{ pointerEvents: 'none' }}>
                      <img src="/images/zoomic.svg" alt="" />
                    </a>
                  </figure>
                  <figure>
                    <img src="/images/galimg5.png" alt="" />
                    <a href="#" style={{ pointerEvents: 'none' }}>
                      <img src="/images/zoomic.svg" alt="" />
                    </a>
                  </figure>
                  <figure>
                    <img src="/images/galimg6.png" alt="" />
                    <a href="#" style={{ pointerEvents: 'none' }}>
                      <img src="/images/zoomic.svg" alt="" />
                    </a>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonialSec gapsec">
        <div className="container">
          <div className="headingsec">
            <h3>Testimonials</h3>
            <h2>What Our Clients Say</h2>
          </div>
          <div className="authorImg">
            <img src="/images/authorimg1.png" alt="" />
            <img src="/images/authorimg1.png" alt="" />
            <img src="/images/authorimg1.png" alt="" />
            <img src="/images/authorimg1.png" alt="" />
            <img src="/images/authorimg1.png" alt="" />
          </div>
          <div className="testimonialSlider">
            <div className="static-slider">
              <div className="slider-wrapper">
                <div className="static-slide" style={{ display: 'block' }}>
                  <figure>
                    <img src="/images/commaimg.png" alt="" />
                  </figure>
                  <p>
                    Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                    aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                    himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Horem ipsum dolor sit amet, consectetur
                    adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                  </p>
                  <h3>John Doe</h3>
                </div>
                <div className="static-slide" style={{ display: 'none' }}>
                  <figure>
                    <img src="/images/commaimg.png" alt="" />
                  </figure>
                  <p>
                    Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                    aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                    himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Horem ipsum dolor sit amet, consectetur
                    adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                  </p>
                  <h3>Jane Smith</h3>
                </div>
                <div className="static-slide" style={{ display: 'none' }}>
                  <figure>
                    <img src="/images/commaimg.png" alt="" />
                  </figure>
                  <p>
                    Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                    aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                    himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Horem ipsum dolor sit amet, consectetur
                    adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                  </p>
                  <h3>Mike Johnson</h3>
                </div>
              </div>
              <div className="swiper-pagination" style={{ display: 'none' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Instagram Feed Section */}
      <div className="instaFeed gapsec">
        <img src="/images/planeimg2.svg" alt="" className="instaFeedPlane" />
        <div className="container">
          <div className="headingsec">
            <h3>We are on Instagram</h3>
            <h2>Follow Us</h2>
          </div>
          <div className="instaFeed">
            <ul>
              <li>
                <a href="#">
                  <figure>
                    <img src="/images/instaimg.png" alt="" />
                  </figure>
                  <img src="/images/instaic.svg" alt="" className="instaLogo" />
                </a>
              </li>
              <li>
                <a href="#">
                  <figure>
                    <img src="/images/instaimg.png" alt="" />
                  </figure>
                  <img src="/images/instaic.svg" alt="" className="instaLogo" />
                </a>
              </li>
              <li>
                <a href="#">
                  <figure>
                    <img src="/images/instaimg.png" alt="" />
                  </figure>
                  <img src="/images/instaic.svg" alt="" className="instaLogo" />
                </a>
              </li>
              <li>
                <a href="#">
                  <figure>
                    <img src="/images/instaimg.png" alt="" />
                  </figure>
                  <img src="/images/instaic.svg" alt="" className="instaLogo" />
                </a>
              </li>
              <li>
                <a href="#">
                  <figure>
                    <img src="/images/instaimg.png" alt="" />
                  </figure>
                  <img src="/images/instaic.svg" alt="" className="instaLogo" />
                </a>
              </li>
              <li>
                <a href="#">
                  <figure>
                    <img src="/images/instaimg.png" alt="" />
                  </figure>
                  <img src="/images/instaic.svg" alt="" className="instaLogo" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;