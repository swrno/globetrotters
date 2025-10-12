'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function PublicStyles() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  useEffect(() => {
    // Only load Bootstrap and other static styles for non-admin routes
    if (!isAdminRoute) {
      // Load Bootstrap scripts
      const jqueryScript = document.createElement('script');
      jqueryScript.src = '/js/jquery.min.js';
      jqueryScript.async = true;
      document.body.appendChild(jqueryScript);

      jqueryScript.onload = () => {
        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = '/js/bootstrap.min.js';
        bootstrapScript.async = true;
        document.body.appendChild(bootstrapScript);

        const swiperScript = document.createElement('script');
        swiperScript.src = '/js/swiper-bundle.min.js';
        swiperScript.async = true;
        document.body.appendChild(swiperScript);

        const fancyboxScript = document.createElement('script');
        fancyboxScript.src = '/js/fancybox.umd.js';
        fancyboxScript.async = true;
        document.body.appendChild(fancyboxScript);

        const tabsScript = document.createElement('script');
        tabsScript.src = '/js/easyResponsiveTabs.js';
        tabsScript.async = true;
        document.body.appendChild(tabsScript);

        const customScript = document.createElement('script');
        customScript.src = '/js/custom.js';
        customScript.async = true;
        document.body.appendChild(customScript);
      };

      return () => {
        // Cleanup scripts when component unmounts
        const scripts = document.querySelectorAll('script[src^="/js/"]');
        scripts.forEach(script => script.remove());
      };
    }
  }, [isAdminRoute]);

  // Don't render styles for admin routes
  if (isAdminRoute) {
    return null;
  }

  return (
    <>
      <link rel="stylesheet" href="/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/css/swiper.css" />
      <link rel="stylesheet" href="/css/fancybox.css" />
      <link rel="stylesheet" href="/css/easy-responsive-tabs.css" />
      <link rel="stylesheet" href="/style.css" />
    </>
  );
}
