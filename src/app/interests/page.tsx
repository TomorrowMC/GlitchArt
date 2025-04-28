'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlitch } from '@/context/GlitchContext';
import { getInterestGlitches } from '@/lib/glitchMessages';

const INTERESTS = ['Digital', 'Politics', 'Economy', 'Sports', 'Science', 'Art', 'Gaming', 'Music', 'Travel']; // Added more

export default function InterestsPage() {
  const router = useRouter();
  const { triggerPopups } = useGlitch();
  const [canNavigate, setCanNavigate] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [popupsActiveForNav, setPopupsActiveForNav] = useState(false);

   const enableNavigation = () => {
     setCanNavigate(true);
     setPopupsActiveForNav(false);
   };

  const handleInterestClick = (interest: string) => {
    if (popupsActiveForNav) return;
     setSelectedInterests((prev) =>
       prev.includes(interest)
         ? prev.filter((i) => i !== interest)
         : [...prev, interest]
     );
    triggerPopups(getInterestGlitches(2), () => {});
  };

  const handleNextClick = () => {
    if (canNavigate) {
      router.push('/influencers');
    } else {
      setPopupsActiveForNav(true);
      triggerPopups(getInterestGlitches(5), enableNavigation);
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4">
      {/* Modern Card */}
      <div className="w-full max-w-xl p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-slate-800">What are you interested in?</h1>
        <p className="text-sm text-center text-gray-500 pb-4">Select a few topics to personalize your feed.</p>

        {/* Modern Grid Layout for Interests */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 pt-4">
          {INTERESTS.map((interest) => (
            <button
              key={interest}
              onClick={() => handleInterestClick(interest)}
               // Modern Chip/Button Style
              className={`p-3 rounded-full text-sm font-medium text-center border-2 transition-all duration-200 ease-in-out hover:shadow-md active:scale-95 ${
                selectedInterests.includes(interest)
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' // Selected style
                  : 'bg-gray-100 border-gray-200 text-slate-700 hover:bg-indigo-100 hover:border-indigo-300 hover:text-indigo-800' // Default style
              }`}
            >
              {interest}
            </button>
          ))}
        </div>

        {/* Modern Next Button */}
        <button
          onClick={handleNextClick}
          disabled={selectedInterests.length < 3} // Example: require at least 3
          className={`w-full mt-8 px-4 py-2.5 text-sm font-semibold text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 ease-in-out hover:scale-[1.02] active:scale-[0.98] ${
            selectedInterests.length < 3
            ? 'bg-gray-400 cursor-not-allowed opacity-70'
            : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {selectedInterests.length < 3 ? `Select ${3 - selectedInterests.length} more` : 'Next Step'}
        </button>
      </div>
    </main>
  );
}