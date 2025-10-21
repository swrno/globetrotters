'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  id: string;
  location: string;
  title: string;
  images: string[];
  days: number;
  nights: number;
}

export default function SearchBox() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        performSearch(searchQuery);
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const performSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/packages/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.success) {
        setResults(data.data);
        setShowDropdown(data.data.length > 0);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (packageId: string) => {
    router.push(`/package/${packageId}`);
    setShowDropdown(false);
    setSearchQuery('');
  };

  return (
    <div className="col-md-3">
      <div className="form-group" style={{ position: 'relative' }} ref={dropdownRef}>
        <input
          type="text"
          placeholder="Destination"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) {
              setShowDropdown(true);
            }
          }}
        />
        
        {showDropdown && results.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              borderRadius: '10px',
              marginTop: '5px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
              maxHeight: '400px',
              overflowY: 'auto',
            }}
          >
            {isLoading ? (
              <div style={{ padding: '15px', textAlign: 'center', color: '#666' }}>
                Searching...
              </div>
            ) : (
              results.map((result) => (
                <div
                  key={result.id}
                  onClick={() => handleResultClick(result.id)}
                  style={{
                    padding: '12px 15px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {result.images && result.images[0] && (
                      <img
                        src={result.images[0]}
                        alt={result.title}
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#000735', marginBottom: '4px' }}>
                        {result.title}
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        {result.location} • {result.days}D/{result.nights}N
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
