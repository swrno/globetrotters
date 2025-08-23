import { useEffect } from 'react';

declare global {
  interface Window {
    $: any;
    jQuery: any;
    Swiper: any;
    Fancybox: any;
    globetrottersInitialized?: boolean;
    swiperInstances?: any[];
    getContainer?: () => void;
  }
}

const useInitializeScripts = () => {
  useEffect(() => {
    // IMMEDIATELY disable any container manipulation to prevent zoom
    if (typeof window !== 'undefined') {
      // Set a global flag to prevent any layout manipulation
      (window as any).PREVENT_LAYOUT_SHIFTS = true;
      
      // Override getContainer immediately
      window.getContainer = function() {
        console.log('getContainer function disabled to prevent zoom issues');
        return;
      };
      
      // Intercept any jQuery css modifications to margin-left on container-wrapper
      if (window.$ && window.jQuery) {
        const originalCss = window.$.fn.css;
        window.$.fn.css = function(prop: any, _value?: any) {
          // Prevent margin-left modifications on container-wrapper
          if ((this.hasClass('container-wrapper') || this.is('.container-wrapper')) && 
              (prop === 'margin-left' || (typeof prop === 'object' && prop['margin-left']))) {
            console.log('Blocked margin-left modification on container-wrapper to prevent zoom');
            return this;
          }
          return originalCss.apply(this, arguments);
        };
        
        // Override getContainer in jQuery ready
        window.$(document).ready(function() {
          window.getContainer = function() {
            console.log('getContainer function disabled in jQuery ready');
            return;
          };
        });
      }
    }

    const initializeScripts = () => {
      // Prevent multiple initializations
      if (window.globetrottersInitialized) {
        console.log('Scripts already initialized, skipping...');
        return;
      }

      console.log('Initializing Globetrotters scripts...');

      if (window.$ && window.jQuery && window.Swiper && window.Fancybox) {
        // FIRST: Immediately disable the problematic getContainer function
        console.log('Disabling getContainer function before any other initialization...');
        if (window.$) {
          // Override any existing getContainer function
          window.getContainer = function() {
            console.log('getContainer called but disabled to prevent zoom issues');
            return;
          };
          
          // Remove any resize event listeners that might call getContainer
          window.$(window).off('resize');
          
          // Ensure container-wrapper has proper CSS
          const containerWrappers = document.querySelectorAll('.container-wrapper');
          containerWrappers.forEach(element => {
            (element as HTMLElement).style.marginLeft = 'auto';
            (element as HTMLElement).style.transform = 'none';
          });
        }

        // Initialize Swiper sliders with error handling
        window.swiperInstances = window.swiperInstances || [];

        try {
          // Destroy existing instances if any
          if (window.swiperInstances.length > 0) {
            window.swiperInstances.forEach(swiper => {
              if (swiper && swiper.destroy) {
                swiper.destroy(true, true);
              }
            });
            window.swiperInstances = [];
          }

          const destinationSlider = document.querySelector('.destinationSlider');
          if (destinationSlider && !destinationSlider.classList.contains('swiper-initialized')) {
            const destinationSwiper = new window.Swiper('.destinationSlider', {
              loop: true,
              slidesPerView: 2.2,
              spaceBetween: 30,
              autoplay: {
                delay: 2500,
                disableOnInteraction: false,
              },
              breakpoints: {
                0: {
                  slidesPerView: 1.2,
                  spaceBetween: 15,
                },
                480: {
                  slidesPerView: 2.2,
                  spaceBetween: 30,
                },
              }
            });
            window.swiperInstances.push(destinationSwiper);
          }

          const tourCateSlider = document.querySelector('.tourCateSlider');
          if (tourCateSlider && !tourCateSlider.classList.contains('swiper-initialized')) {
            const tourCateSwiper = new window.Swiper('.tourCateSlider', {
              loop: true,
              slidesPerView: 3,
              spaceBetween: 20,
              autoplay: {
                delay: 2500,
                disableOnInteraction: false,
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
              }
            });
            window.swiperInstances.push(tourCateSwiper);
          }

          const testimonialSlider = document.querySelector('.testimonialSlider .swiper');
          if (testimonialSlider && !testimonialSlider.classList.contains('swiper-initialized')) {
            const testimonialSwiper = new window.Swiper('.testimonialSlider .swiper', {
              loop: true,
              slidesPerView: 1,
              autoplay: {
                delay: 2500,
                disableOnInteraction: false,
              },
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
              },
            });
            window.swiperInstances.push(testimonialSwiper);
          }

          // Initialize Fancybox only once
          try {
            window.Fancybox.bind('[data-fancybox="gallery"]', {});
            window.Fancybox.bind('[data-fancybox="overviewVideo"]', {});
            window.Fancybox.bind('[data-fancybox="gallery-a"]', {});
            window.Fancybox.bind('[data-fancybox="gallery-b"]', {});
          } catch (fancyboxError) {
            console.warn('Fancybox initialization warning:', fancyboxError);
          }

          // Initialize responsive tabs
          const horizontalTab = window.$('#parentHorizontalTab');
          if (horizontalTab.length && !horizontalTab.hasClass('easyResponsiveTabs')) {
            horizontalTab.easyResponsiveTabs({
              type: 'default',
              width: 'auto',
              fit: true,
              tabidentify: 'hor_1',
            });
          }

          // Disable the problematic getContainer function that causes zoom issues
          // Override the getContainer function to prevent it from executing
          if (window.$) {
            window.getContainer = function() {
              // Do nothing - this prevents the original getContainer from running
              console.log('getContainer function disabled to prevent zoom issues');
            };
            
            // Remove any existing resize event listeners that call getContainer
            window.$(window).off('resize.getContainer');
            
            // Ensure container-wrapper has proper CSS instead of JS manipulation
            const containerWrapper = document.querySelector('.container-wrapper');
            if (containerWrapper) {
              (containerWrapper as HTMLElement).style.marginLeft = 'auto';
            }
          }

          window.globetrottersInitialized = true;
        } catch (error) {
          console.error('Error initializing scripts:', error);
        }
      }
    };

    // Run immediately to override any external scripts
    initializeScripts();
    
    // Also set a timer as backup
    const timer = setTimeout(initializeScripts, 100);
    return () => {
      clearTimeout(timer);
      // Cleanup on unmount
      if (window.swiperInstances) {
        window.swiperInstances.forEach(swiper => {
          if (swiper && swiper.destroy) {
            swiper.destroy(true, true);
          }
        });
      }
      // Cleanup jQuery events if any
      if (window.$) {
        window.$(window).off('resize.globetrotters');
      }
    };
  }, []);
};

export default useInitializeScripts;
