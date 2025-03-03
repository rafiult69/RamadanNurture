import React, { useState } from 'react';
import { Link } from 'wouter';

export default function PrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPrayerTimes = async (city) => {
    try {
      setLoading(true);
      setError('');

      // Changed country from SA to BD for Bangladesh
      const encodedCity = encodeURIComponent(city);
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodedCity}&country=BD&method=4`);

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();

      if (data.code === 200) {
        setPrayerTimes(data.data.timings);
      } else {
        setError(`Could not fetch prayer times: ${data.status || 'Unknown error'}`);
      }
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
      console.error('Prayer times fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      fetchPrayerTimes(location);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/">
        <div className="inline-flex items-center mb-4 text-primary hover:underline cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </div>
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-center">Prayer Times in Bangladesh</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter city name (e.g., Dhaka, Chittagong)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button 
            type="submit" 
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Prayer Times'}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {prayerTimes && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-primary text-white px-6 py-4">
            <h2 className="text-xl font-semibold">Prayer Times for {location}, Bangladesh</h2>
            <p className="text-white/80">{new Date().toLocaleDateString()}</p>
          </div>
          <div className="divide-y">
            {Object.entries(prayerTimes)
              .filter(([name]) => ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].includes(name))
              .map(([name, time]) => (
                <div key={name} className="flex justify-between items-center px-6 py-4">
                  <span className="font-medium">{name}</span>
                  <span>{time}</span>
                </div>
              ))
            }
          </div>
        </div>
      )}

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">About Prayer Times in Bangladesh</h3>
        <p className="mb-4">
          Prayer times are calculated based on your location and the position of the sun. 
          The five obligatory prayers in Islam are Fajr (dawn), Dhuhr (noon), 
          Asr (afternoon), Maghrib (sunset), and Isha (night).
        </p>
        <p className="mb-4">
          Common cities in Bangladesh include Dhaka, Chittagong, Khulna, Rajshahi, Sylhet, 
          and Barisal. Enter any city in Bangladesh to get accurate prayer times.
        </p>
        <p>
          The times shown are approximate and may vary slightly based on location and calculation method. 
          It's always recommended to verify with your local mosque.
        </p>
      </div>
    </div>
  );
}