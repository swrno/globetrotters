'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBox() {
  const [destination, setDestination] = useState('');
  const [month, setMonth] = useState('');
  const [duration, setDuration] = useState('');
  const [budget, setBudget] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination);
    if (month) params.append('month', month);
    if (duration) params.append('duration', duration);
    if (budget) params.append('budget', budget);
    
    router.push(`/search?${params.toString()}`);
  };

  return (
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
  );
}
