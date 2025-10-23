'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Package {
  id: string;
  location: string;
  title: string;
  description: string;
  tags: string[];
  days: number;
  nights: number;
  images: string[];
  registrations: { name: string; email: string; phone: string }[];
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter state
  const [destination, setDestination] = useState(searchParams.get('destination') || '');
  const [month, setMonth] = useState(searchParams.get('month') || '');
  const [duration, setDuration] = useState(searchParams.get('duration') || '');
  const [budget, setBudget] = useState(searchParams.get('budget') || '');

  useEffect(() => {
    fetchPackages();
  }, [searchParams]);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/packages');
      const data = await response.json();
      
      if (data.success) {
        const filtered = filterPackages(data.data);
        setPackages(filtered);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPackages = (allPackages: Package[]) => {
    return allPackages.filter(pkg => {
      // Filter by destination
      if (destination) {
        const searchTerm = destination.toLowerCase();
        const matchesLocation = pkg.location.toLowerCase().includes(searchTerm);
        const matchesTitle = pkg.title.toLowerCase().includes(searchTerm);
        const matchesTags = pkg.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        if (!matchesLocation && !matchesTitle && !matchesTags) {
          return false;
        }
      }

      // Filter by duration
      if (duration) {
        const durationStr = `${pkg.days}D/${pkg.nights}N`;
        if (duration === '8D+') {
          if (pkg.days < 8) return false;
        } else if (duration !== durationStr) {
          return false;
        }
      }

      // Note: Month and Budget filtering would require additional package metadata
      // For now, we'll just filter by destination and duration

      return true;
    });
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination);
    if (month) params.append('month', month);
    if (duration) params.append('duration', duration);
    if (budget) params.append('budget', budget);
    
    router.push(`/search?${params.toString()}`);
  };

  const getDomesticInternational = (tags: string[]) => {
    const internationalTags = ['international', 'europe', 'asia', 'africa', 'america', 'thailand', 'dubai', 'singapore', 'malaysia'];
    return tags.some(tag => internationalTags.includes(tag.toLowerCase())) ? 'international' : 'domestic';
  };

  return (
    <>
      <div className="innerBanner">
        <figure><img src="/holidaybanner.jpg" alt="" /></figure>
        <div className="bannerCont container">
          <div className="innerBanCont">
            <div className="bannerTxt">
              <h1>Search Results</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="searchFilters gapsec">
        <div className="container">
          <div className="banFormSec" style={{ marginBottom: '40px' }}>
            <div className="formFields">
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <select value={month} onChange={(e) => setMonth(e.target.value)}>
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
                    <select value={duration} onChange={(e) => setDuration(e.target.value)}>
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
                    <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                      <option value="">Select Budget per Person</option>
                      <option value="<20000">Less than ₹20000</option>
                      <option value="20001-40000">₹20001 to ₹40000</option>
                      <option value="40001-60000">₹40001 to ₹60000</option>
                      <option value="60001-80000">₹60001 to ₹80000</option>
                      <option value="80001-100000">₹80001 to ₹100000</option>
                      <option value=">100000">More than ₹100000</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="formBtn">
                <input type="button" value="Search" onClick={handleSearch} />
              </div>
            </div>
          </div>

          <div className="searchResultsCount" style={{ marginBottom: '20px' }}>
            <h3>Found {packages.length} package{packages.length !== 1 ? 's' : ''}</h3>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="text-gray-500">Loading packages...</div>
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-5">
              <div className="text-gray-500">No packages found matching your criteria.</div>
            </div>
          ) : (
            <div className="row">
              {packages.map((pkg) => (
                <div key={pkg.id} className="col-lg-4 col-md-6" style={{ marginBottom: '30px' }}>
                  <div className="item">
                    <figure>
                      <Link href={`/package/${pkg.id}`}>
                        <img src={pkg.images[0] || '/destinationimg1.png'} alt={pkg.title} />
                      </Link>
                    </figure>
                    <h3>{pkg.location}</h3>
                    <p>{pkg.description}</p>
                    <div className="durationBestTime">
                      <ul>
                        <li><span>Duration:</span> {pkg.nights} Nights / {pkg.days} Days</li>
                        <li><span>Best Time to Visit:</span> All Year Round</li>
                      </ul>
                    </div>
                    <Link href={`/package/${pkg.id}`} className="primaryBtn">Enquire</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
