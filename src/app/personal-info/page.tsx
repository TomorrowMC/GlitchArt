'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlitch } from '@/context/GlitchContext';
import { getPersonalInfoGlitches } from '@/lib/glitchMessages';

export default function PersonalInfoPage() {
  const router = useRouter();
  const { triggerPopups } = useGlitch();
  const [canNavigate, setCanNavigate] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');

  const handleNextClick = () => {
    if (canNavigate) {
      router.push('/interests');
    } else {
      triggerPopups(getPersonalInfoGlitches(5), () => {
        setCanNavigate(true);
      });
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4">
       {/* Modern Card Styling */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-slate-800">Your Information</h1>
        <p className="text-sm text-center text-gray-500 pb-4">Tell us a bit about yourself.</p>

        <div className="space-y-5"> {/* Increased spacing */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // Modern Input Style
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            // Modern Input Style
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
          <input
            type="text"
            placeholder="Date of Birth (e.g., YYYY-MM-DD)"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
             // Modern Input Style
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>

        {/* Modern Next Button */}
        <button
          onClick={handleNextClick}
          className="w-full mt-8 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
        >
          Next Step
        </button>
      </div>
    </main>
  );
}