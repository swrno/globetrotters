const Home = () => {
  return (
    <div>
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
                    <a href="/images/SampleVideo_1280x720_1mb.mp4" data-fancybox="gallery" className="playbtn">
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
          backgroundSize: '100% 100%'
        }}
      >
        <div className="container-wrapper">
          <div className="row m-0">
            <div className="col-lg-5 feaHolidayPackCont">
              <div className="lftCont">
                <div className="headingsec">
                  <h3>Uncover hidden gems with us</h3>
                  <h2>Featured Holiday Packages</h2>
                </div>
                <p>
                  Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                  aliquet odio mattis.Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
                  velit interdum, ac aliquet odio mattis.Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.Nunc vulputate libero et velit interdum, ac
                  aliquet odio mattis.
                </p>
                <a href="#" className="primaryBtn">Explore</a>
              </div>
            </div>
            <div className="col-lg-7 feaHolidayPackSlider">
              <div className="swiper destinationSlider">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="item">
                      <figure>
                        <img src="/images/manali.png" alt="" />
                      </figure>
                      <h3>Manali</h3>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="item">
                      <figure>
                        <img src="/images/manali.png" alt="" />
                      </figure>
                      <h3>Kashmir</h3>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="item">
                      <figure>
                        <img src="/images/manali.png" alt="" />
                      </figure>
                      <h3>Goa</h3>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="item">
                      <figure>
                        <img src="/images/manali.png" alt="" />
                      </figure>
                      <h3>Kerala</h3>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="item">
                      <figure>
                        <img src="/images/manali.png" alt="" />
                      </figure>
                      <h3>Rajasthan</h3>
                    </div>
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
            <div className="swiper tourCateSlider">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="item">
                    <figure>
                      <img src="/images/cateimg1.png" alt="" />
                    </figure>
                    <h4>
                      <a href="#">Hiking</a>
                    </h4>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="item">
                    <figure>
                      <img src="/images/cateimg2.png" alt="" />
                    </figure>
                    <h4>
                      <a href="#">Adventure</a>
                    </h4>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="item">
                    <figure>
                      <img src="/images/cateimg3.png" alt="" />
                    </figure>
                    <h4>
                      <a href="#">Cultural</a>
                    </h4>
                  </div>
                </div>
                <div className="swiper-slide">
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
                    <a href="/images/galimg1.png" data-fancybox="gallery-a">
                      <img src="/images/zoomic.svg" alt="" />
                    </a>
                  </figure>
                  <figure>
                    <img src="/images/galimg2.png" alt="" />
                    <a href="/images/galimg2.png" data-fancybox="gallery-a">
                      <img src="/images/zoomic.svg" alt="" />
                    </a>
                  </figure>
                  <figure>
                    <img src="/images/galimg3.png" alt="" />
                    <a href="/images/galimg3.png" data-fancybox="gallery-a">
                      <img src="/images/zoomic.svg" alt="" />
                    </a>
                  </figure>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="imgGalWrap">
                  <figure>
                    <img src="/images/galimg4.png" alt="" />
                    <a href="/images/galimg4.png" data-fancybox="gallery-a">
                      <img src="/images/zoomic.svg" alt="" />
                    </a>
                  </figure>
                  <figure>
                    <img src="/images/galimg5.png" alt="" />
                    <a href="/images/galimg5.png" data-fancybox="gallery-a">
                      <img src="/images/zoomic.svg" alt="" />
                    </a>
                  </figure>
                  <figure>
                    <img src="/images/galimg6.png" alt="" />
                    <a href="/images/galimg6.png" data-fancybox="gallery-a">
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
            <div className="swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
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
                <div className="swiper-slide">
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
                <div className="swiper-slide">
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
              <div className="swiper-pagination"></div>
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