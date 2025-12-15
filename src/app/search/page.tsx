'use client';

import { Suspense } from 'react';
import SearchResults from './SearchResults';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function SearchPage() {
  return (
    <>
      <Header currentPage="search" />
      <Suspense fallback={<div className="container py-5">Loading...</div>}>
        <SearchResults />
      </Suspense>
      <Footer />
    </>
  );
}
