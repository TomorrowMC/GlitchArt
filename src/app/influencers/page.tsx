'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlitch } from '@/context/GlitchContext';
import { getInfluencerGlitches } from '@/lib/glitchMessages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

const INFLUENCERS = [
  { id: 1, name: 'Alex Rivera', handle: '@alex_codes', avatar: 'https://source.unsplash.com/random/100x100?person,man,coding', category: 'Tech' },
  { id: 2, name: 'Maya Green', handle: '@eco_maya', avatar: 'https://source.unsplash.com/random/100x100?person,woman,nature', category: 'Environment' },
  { id: 3, name: 'Chad Finnegan III', handle: '@chadonomics', avatar: 'https://source.unsplash.com/random/100x100?person,man,suit', category: 'Finance' },
  { id: 4, name: 'Jessie Power', handle: '@jessie_lifts', avatar: 'https://source.unsplash.com/random/100x100?person,woman,fitness', category: 'Fitness' },
  { id: 5, name: 'Kai Zen', handle: '@thinking_kai', avatar: 'https://source.unsplash.com/random/100x100?person,man,reading', category: 'Philosophy' },
  { id: 6, name: 'Riley Skye', handle: '@skyedraws', avatar: 'https://source.unsplash.com/random/100x100?person,woman,art', category: 'Art' },
  { id: 7, name: 'Gamer Girl GG', handle: '@gg_streams', avatar: 'https://source.unsplash.com/random/100x100?person,woman,gaming', category: 'Gaming' },
  { id: 8, name: 'Ben Beats', handle: '@benny_beats', avatar: 'https://source.unsplash.com/random/100x100?person,man,music', category: 'Music' },
];

export default function InfluencersPage() {
  const router = useRouter();
  const { triggerPopups } = useGlitch();
  const [canNavigate, setCanNavigate] = useState(false);
  const [followedInfluencers, setFollowedInfluencers] = useState<number[]>([]);
   const [popupsActiveForNav, setPopupsActiveForNav] = useState(false);

   const enableNavigation = () => {
     setCanNavigate(true);
     setPopupsActiveForNav(false);
   };

  const handleFollowClick = (influencerId: number) => {
    if (popupsActiveForNav) return;
     setFollowedInfluencers((prev) =>
       prev.includes(influencerId)
         ? prev.filter((id) => id !== influencerId)
         : [...prev, influencerId]
     );
    triggerPopups(getInfluencerGlitches(2), () => {});
  };

  const handleNextClick = () => {
    if (canNavigate) {
      router.push('/complete');
    } else {
       setPopupsActiveForNav(true);
      triggerPopups(getInfluencerGlitches(5), enableNavigation);
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4">
       {/* Modern Card */}
      <div className="w-full max-w-xl p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-slate-800">Who to Follow?</h1>
        <p className="text-sm text-center text-gray-500 pb-4">Get started by following some accounts.</p>

        {/* Modern List */}
        <div className="space-y-3 pt-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar"> {/* Added max height and scroll */}
          {INFLUENCERS.map((influencer) => (
            // Modern List Item Style
            <div key={influencer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 transition-shadow duration-200 ease-in-out hover:shadow-md">
              <div className="flex items-center space-x-4"> {/* Increased spacing */}
                <img src={influencer.avatar} alt={influencer.name} className="w-12 h-12 rounded-full object-cover" /> {/* Slightly larger avatar */}
                <div>
                  <p className="font-semibold text-sm text-slate-800">{influencer.name}</p>
                  <p className="text-xs text-indigo-600">{influencer.handle}</p> {/* Colored handle */}
                </div>
              </div>
              {/* Modern Follow/Following Button */}
              <button
                onClick={() => handleFollowClick(influencer.id)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 flex items-center gap-1.5 ${
                  followedInfluencers.includes(influencer.id)
                    ? 'bg-indigo-100 text-indigo-700 ring-1 ring-indigo-300' // Following style
                    : 'bg-indigo-600 text-white hover:bg-indigo-700' // Follow style
                }`}
              >
                {followedInfluencers.includes(influencer.id)
                   ? <><FontAwesomeIcon icon={faCheck} /> Following</>
                   : <><FontAwesomeIcon icon={faPlus} /> Follow</>
                }
              </button>
            </div>
          ))}
        </div>

         {/* Modern Next Button */}
        <button
          onClick={handleNextClick}
           className="w-full mt-8 px-4 py-2.5 text-sm font-semibold text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 ease-in-out hover:scale-[1.02] active:scale-[0.98] bg-indigo-600 hover:bg-indigo-700"
        >
          Finish Setup
        </button>
      </div>
    </main>
  );
}

// Optional: Add custom scrollbar styles in globals.css if desired
/*
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1; // slate-300
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8; // slate-500
}
*/