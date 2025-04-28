'use client';

import React, { useState } from 'react';
import { useGlitch } from '@/context/GlitchContext';
import { getCompleteGlitches } from '@/lib/glitchMessages';

export default function CompletePage() {
  const { triggerPopups, triggerSnow } = useGlitch();
  const [snowTriggered, setSnowTriggered] = useState(false);

  const handleCompleteClick = () => {
    if (snowTriggered) return;
    const onPopupsClosed = () => {
        triggerSnow();
        setSnowTriggered(true);
    };
     triggerPopups(getCompleteGlitches(7), onPopupsClosed);
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4 relative">
        {/* Modern Card */}
      <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-xl shadow-2xl text-center z-10"> {/* Ensure content is above potential snow */}
        <h1 className="text-3xl font-bold text-center text-slate-800">You're All Set!</h1>
        <p className="text-md text-gray-600">
            Ready to dive in? One final click...
        </p>

        {/* Modern, Ominous Button */}
        <button
          onClick={handleCompleteClick}
          disabled={snowTriggered}
           // Using red for warning/final step, modern style
          className={`w-full px-6 py-3 text-lg font-bold text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-150 ease-in-out mt-6 ${
            snowTriggered
             ? 'bg-gray-400 cursor-not-allowed opacity-70' // Disabled style
             : 'bg-red-600 hover:bg-red-700 hover:scale-[1.03] active:scale-[0.97]' // Active style
          }`}
        >
          ENTER THE VOID
        </button>

        {/* System Failure message appears after snow effect is triggered */}
        {snowTriggered && (
             <p className="text-red-600 font-bold animate-pulse mt-6 text-lg">SYSTEM FAILURE DETECTED</p>
        )}
      </div>
      {/* Note: The actual <SnowEffect /> component is rendered by the GlitchProvider */}
    </main>
  );
}