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
    // COMPLETELY DISABLE ALL JAVASCRIPT EFFECTS TO PREVENT ZOOM ISSUES
    console.log('All JavaScript effects disabled to prevent zoom issues on Home page');
    
    if (typeof window !== 'undefined') {
      // Set global flags to prevent any dynamic behavior
      (window as any).PREVENT_LAYOUT_SHIFTS = true;
      (window as any).DISABLE_ALL_JS_EFFECTS = true;
      
      // Override all problematic functions immediately
      window.getContainer = function() {
        console.log('getContainer function completely disabled');
        return;
      };
      
      // Disable all Swiper initialization
      if (window.Swiper) {
        const originalSwiper = window.Swiper;
        window.Swiper = function() {
          console.log('Swiper initialization disabled to prevent zoom issues');
          return { destroy: () => {}, on: () => {}, off: () => {} };
        };
        window.Swiper.use = () => {};
      }
      
      // Disable Fancybox
      if (window.Fancybox) {
        window.Fancybox.bind = function() {
          console.log('Fancybox disabled to prevent zoom issues');
          return;
        };
      }
      
      // Intercept and block all jQuery css modifications
      if (window.$ && window.jQuery) {
        const originalCss = window.$.fn.css;
        window.$.fn.css = function(prop: any, _value?: any) {
          console.log('All jQuery CSS modifications blocked to prevent zoom');
          return this;
        };
        
        // Disable jQuery animations
        const originalAnimate = window.$.fn.animate;
        window.$.fn.animate = function() {
          console.log('jQuery animations disabled to prevent zoom');
          return this;
        };
        
        // Override jQuery ready to prevent script execution
        window.$(document).ready(function() {
          console.log('jQuery ready executed but all effects disabled');
          window.getContainer = function() {
            console.log('getContainer disabled in jQuery ready');
            return;
          };
        });
      }
    }

    const initializeScripts = () => {
      // COMPLETELY DISABLE ALL SCRIPT INITIALIZATION
      console.log('Script initialization completely disabled to prevent zoom issues');
      
      if (window.globetrottersInitialized) {
        console.log('Scripts already disabled, skipping...');
        return;
      }

      // Only set the flag and ensure container-wrapper styling is static
      const containerWrappers = document.querySelectorAll('.container-wrapper');
      containerWrappers.forEach(element => {
        (element as HTMLElement).style.marginLeft = 'auto';
        (element as HTMLElement).style.transform = 'none';
        (element as HTMLElement).style.transition = 'none';
      });

      // Ensure all potentially problematic elements have static positioning
      const problematicElements = document.querySelectorAll('.swiper, .destinationSlider, .tourCateSlider, .testimonialSlider');
      problematicElements.forEach(element => {
        (element as HTMLElement).style.transform = 'none';
        (element as HTMLElement).style.transition = 'none';
      });

      window.globetrottersInitialized = true;
      console.log('All effects disabled - static layout enforced');
    };

    // Run immediately to disable any external scripts
    initializeScripts();
    
    // Also set a timer as backup to ensure effects stay disabled
    const timer = setTimeout(initializeScripts, 100);
    
    return () => {
      clearTimeout(timer);
      // No cleanup needed since everything is disabled
      console.log('useInitializeScripts cleanup - all effects remain disabled');
    };
  }, []);
};

export default useInitializeScripts;
