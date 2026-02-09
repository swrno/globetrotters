"use client";

import dynamic from 'next/dynamic';

const TamboWrapper = dynamic(() => import('./TamboWrapper'), {
  ssr: false,
});

export default TamboWrapper;
