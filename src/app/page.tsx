import FeaturedPackages from '@/components/FeaturedPackages';
import NewsletterSignup from '@/components/NewsletterSignup';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TourCategories from '@/components/TourCategories';
import SearchBox from '@/components/SearchBox';

export default function Home() {
  return (
    <>
      <Header currentPage="home" />

      <div className="banner">
        <figure><img src="/banner.jpg" alt="" /></figure>
        <div className="bannerCont container">
          <div className="innerBanCont">
            <div className="bannerTxt">
              <h3>We maximize your vacation experience the right way</h3>
              <h1>Strategic Itineraries. Adventurous Memories</h1>
            </div>
            <div className="banFormSec">
              <div className="formFields">
                <SearchBox />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="whyGlobetrotters gapsec">
        <img src="/dotted-plane.png" className="dotted-plane" alt="" />
        <div className="container">
          <div className="whyGlobetrottersTop">
            <div className="row">
              <div className="col-lg-6">
                <div className="lftImg">
                  <img src="/whyimg1.png" alt="" />
                  <img src="/whyimg2.png" alt="" />
                  <img src="/whyimg3.png" alt="" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="rightCont">
                  <div className="headingsec">
                    <h3>Elevate your travel experience</h3>
                    <h2>Why Globetrotters</h2>
                  </div>
                  <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                    aliquet odio mattis.Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
                    velit interdum, ac aliquet odio mattis.Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                    vulputate libero et velit interdum, ac aliquet odio mattis.Nunc vulputate libero et velit interdum, ac
                    aliquet odio mattis.</p>
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
                      <figure><img src="/invoice.svg" alt="" /></figure>
                      <div className="whyInfoCont">
                        <h4>Centralized Information</h4>
                        <p> Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Nunc vulputate libero et velit
                          interdum, ac aliquet odio mattis.</p>
                      </div>
                    </li>
                    <li>
                      <figure><img src="/network.svg" alt="" /></figure>
                      <div className="whyInfoCont">
                        <h4>Worldwide Connectivity</h4>
                        <p> Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Nunc vulputate libero et velit
                          interdum, ac aliquet odio mattis.</p>
                      </div>
                    </li>
                    <li>
                      <figure><img src="/deflation.svg" alt="" /></figure>
                      <div className="whyInfoCont">
                        <h4>Cost Saving</h4>
                        <p> Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Nunc vulputate libero et velit
                          interdum, ac aliquet odio mattis.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="whyInfoVideo">
                  <figure>
                    <div className="thumbnailImg">
                      <img src="/whyimg4.png" alt="" />
                    </div>
                    <a href="/SampleVideo_1280x720_1mb.mp4" data-fancybox="gallery" className="playbtn">
                      <img src="/playbtn.svg" alt="" />
                    </a>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="feaHolidayPack gapsec" style={{background: 'url(/featureholidaybg.png) no-repeat 0 0', backgroundSize: '100% 100%'}}>
        <div className="container-wrapper">
          <div className="row m-0">
            <div className="col-lg-5 feaHolidayPackCont">
              <div className="lftCont">
                <div className="headingsec">
                  <h3>Uncover hidden gems with us</h3>
                  <h2>Featured Holiday Packages</h2>
                </div>
                <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                  aliquet odio mattis.Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
                  velit interdum, ac aliquet odio mattis.Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.Nunc vulputate libero et velit interdum, ac
                  aliquet odio mattis.</p>
                <a href="/holiday-packages" className="primaryBtn">Explore</a>
              </div>
            </div>
            <div className="col-lg-7 feaHolidayPackSlider">
              <FeaturedPackages />
            </div>
          </div>
        </div>
      </div>

      <div className="homeAbout gapsec">
        <img src="/planeimg2.svg" alt="" className="aboutPlaneImg" />
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="aboutLftImg">
                <img src="/aboutimgbig.png" alt="" className="aboutimgbig" />
                <img src="/aboutimgsmall.png" alt="" className="aboutimgsmall" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="headingsec">
                <h3>Know our Story</h3>
                <h2>About Us</h2>
              </div>
              <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                aliquet odio mattis.Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis.Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
                libero et velit interdum, ac aliquet odio mattis.Nunc vulputate libero et velit interdum, ac aliquet odio
                mattis.</p>
              <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                aliquet odio mattis.Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis.Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
                libero et velit interdum, ac aliquet odio mattis.Nunc vulputate libero et velit interdum, ac aliquet odio
                mattis.</p>
              <a href="/about" className="primaryBtn">Know more</a>
            </div>
          </div>
        </div>
      </div>

      <TourCategories />

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
                    <img src="/galimg1.png" alt="" />
                    <a href="/galimg1.png" data-fancybox="gallery-a"><img src="/zoomic.svg" alt="" /></a>
                  </figure>
                  <figure>
                    <img src="/galimg2.png" alt="" />
                    <a href="/galimg2.png" data-fancybox="gallery-a"><img src="/zoomic.svg" alt="" /></a>
                  </figure>
                  <figure>
                    <img src="/galimg3.png" alt="" />
                    <a href="/galimg3.png" data-fancybox="gallery-a"><img src="/zoomic.svg" alt="" /></a>
                  </figure>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="imgGalWrap">
                  <figure>
                    <img src="/galimg4.png" alt="" />
                    <a href="/galimg4.png" data-fancybox="gallery-a"><img src="/zoomic.svg" alt="" /></a>
                  </figure>
                  <figure>
                    <img src="/galimg5.png" alt="" />
                    <a href="/galimg5.png" data-fancybox="gallery-a"><img src="/zoomic.svg" alt="" /></a>
                  </figure>
                  <figure>
                    <img src="/galimg6.png" alt="" />
                    <a href="/galimg6.png" data-fancybox="gallery-a"><img src="/zoomic.svg" alt="" /></a>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonialSec gapsec">
        <div className="container">
          <div className="headingsec">
            <h3>Testimonials</h3>
            <h2>What Our Clients Say</h2>
          </div>
          <div className="authorImg">
            <img src="/authorimg1.png" alt="" />
            <img src="/authorimg1.png" alt="" />
            <img src="/authorimg1.png" alt="" />
            <img src="/authorimg1.png" alt="" />
            <img src="/authorimg1.png" alt="" />
          </div>
          <div className="testimonialSlider">
            <div className="swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <figure><img src="/commaimg.png" alt="" /></figure>
                  <p>Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                    aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                    himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Horem ipsum dolor sit amet, consectetur
                    adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. </p>
                  <h3>John Doe</h3>
                </div>
                <div className="swiper-slide">
                  <figure><img src="/commaimg.png" alt="" /></figure>
                  <p>Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                    aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                    himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Horem ipsum dolor sit amet, consectetur
                    adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. </p>
                  <h3>John Doe</h3>
                </div>
                <div className="swiper-slide">
                  <figure><img src="/commaimg.png" alt="" /></figure>
                  <p>Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                    aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                    himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Horem ipsum dolor sit amet, consectetur
                    adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. </p>
                  <h3>John Doe</h3>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="instaFeed gapsec">
        <img src="/planeimg2.svg" alt="" className="instaFeedPlane" />
        <div className="container">
          <div className="headingsec">
            <h3>We are on Instagram </h3>
            <h2>Follow Us</h2>
          </div>
          <div className="instaFeed">
            <ul>
              <li>
                <a href="#">
                  <figure>
                    <img src="/instaimg.png" alt="" />
                  </figure>
                  <img src="/instaic.svg" alt="" className="instaLogo" />
                </a>
              </li>
              <li>
                <a href="#">
                  <figure>
                    <img src="/instaimg.png" alt="" />
                  </figure>
                  <img src="/instaic.svg" alt="" className="instaLogo" />
                </a>
              </li>
              <li>
                <a href="#">
                  <figure>
                    <img src="/instaimg.png" alt="" />
                  </figure>
                  <img src="/instaic.svg" alt="" className="instaLogo" />
                </a>
              </li>
              <li>
                <a href="#">
                  <figure>
                    <img src="/instaimg.png" alt="" />
                  </figure>
                  <img src="/instaic.svg" alt="" className="instaLogo" />
                </a>
              </li>
              <li>
                <a href="#">
                  <figure>
                    <img src="/instaimg.png" alt="" />
                  </figure>
                  <img src="/instaic.svg" alt="" className="instaLogo" />
                </a>
              </li>
              <li>
                <a href="#">
                  <figure>
                    <img src="/instaimg.png" alt="" />
                  </figure>
                  <img src="/instaic.svg" alt="" className="instaLogo" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
