'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlitch } from '@/context/GlitchContext';
import { getLoginGlitches } from '@/lib/glitchMessages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';

export default function LoginPage() {
  const router = useRouter();
  const { triggerPopups } = useGlitch();
  const [canNavigate, setCanNavigate] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccountClick = () => {
    if (canNavigate) {
      router.push('/personal-info');
    } else {
      triggerPopups(getLoginGlitches(5), () => {
        setCanNavigate(true);
      });
    }
  };

  return (
    // Main container centered on the page
    <main className="flex min-h-screen w-full items-center justify-center p-4">
      {/* Modern Card Styling */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        {/* Modern Title */}
        <h1 className="text-3xl font-bold text-center text-slate-800">Join Today</h1>
        <p className="text-sm text-center text-gray-500 pb-4">Connect with the world (maybe).</p>

        {/* Disabled Modern Buttons */}
        <button disabled className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-500 bg-gray-100 cursor-not-allowed opacity-60 transition-transform duration-150 ease-in-out">
          <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 mr-3" />
          Sign up with Google
        </button>
        <button disabled className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-500 bg-gray-100 cursor-not-allowed opacity-60 transition-transform duration-150 ease-in-out">
           <FontAwesomeIcon icon={faApple} className="w-5 h-5 mr-3" />
           Sign up with Apple
        </button>

        {/* Modern Separator */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-500"> or </span> {/* Match card background */}
          </div>
        </div>

        {/* Modern Inputs */}
         <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
           <input
            type="password"
            placeholder="Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />

        {/* Modern Clickable Button */}
        <button
          onClick={handleCreateAccountClick}
          // Example: Indigo color, modern styling
          className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
        >
          Create account
        </button>

         <p className="text-sm text-center text-gray-500 pt-4">
            Already have an account?{' '}
            <button disabled className="font-medium text-indigo-600 opacity-50 cursor-not-allowed">
              Sign in
            </button>
          </p>
      </div>
    </main>
  );
}