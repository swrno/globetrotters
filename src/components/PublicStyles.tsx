'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function PublicStyles() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  useEffect(() => {
    // Only load Bootstrap and other static styles for non-admin routes
    if (!isAdminRoute) {
      // Load Bootstrap and other scripts in-order (disable async so execution order is preserved)
      const jqueryScript = document.createElement('script');
      jqueryScript.src = '/js/jquery.min.js';
      jqueryScript.async = false;
      document.body.appendChild(jqueryScript);

      jqueryScript.onload = () => {
        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = '/js/bootstrap.min.js';
        bootstrapScript.async = false;
        document.body.appendChild(bootstrapScript);

        const swiperScript = document.createElement('script');
        swiperScript.src = '/js/swiper-bundle.min.js';
        swiperScript.async = false;
        document.body.appendChild(swiperScript);

        const fancyboxScript = document.createElement('script');
        fancyboxScript.src = '/js/fancybox.umd.js';
        fancyboxScript.async = false;
        document.body.appendChild(fancyboxScript);

        const tabsScript = document.createElement('script');
        tabsScript.src = '/js/easyResponsiveTabs.js';
        tabsScript.async = false;
        document.body.appendChild(tabsScript);

        const customScript = document.createElement('script');
        customScript.src = '/js/custom.js';
        customScript.async = false;
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

  // This component only injects scripts now; styles are added server-side in the layout
  return null;
}
