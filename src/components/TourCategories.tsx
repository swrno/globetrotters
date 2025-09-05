'use client';

import { useEffect, useRef } from 'react';

export default function TourCategories() {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Swiper after component mounts
    if (typeof window !== 'undefined' && window.Swiper && swiperRef.current) {
      new window.Swiper(swiperRef.current, {
        loop: false, // Disable loop since we only have 4 slides
        slidesPerView: 3,
        spaceBetween: 20,
        autoplay: {
          delay: 2500,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        },
      });
    }
  }, []);

  return (
    <div className="tourCate gapsec">
      <div className="container">
        <div className="innerTourCate">
          <div className="headingsec">
            <h3>Embrace your wanderlust</h3>
            <h2>Tour Categories</h2>
          </div>
          <div className="swiper tourCateSlider" ref={swiperRef}>
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="item">
                  <figure><img src="/cateimg1.png" alt="Cruise" /></figure>
                  <h4><a href="#"> Cruise</a></h4>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="item">
                  <figure><img src="/cateimg2.png" alt="Hiking" /></figure>
                  <h4><a href="#"> Hiking</a></h4>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="item">
                  <figure><img src="/cateimg3.png" alt="Wildlife" /></figure>
                  <h4><a href="#"> Wildlife</a></h4>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="item">
                  <figure><img src="/cateimg3.png" alt="Adventure" /></figure>
                  <h4><a href="#"> Adventure</a></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}