'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlitch } from '@/context/GlitchContext';
import { getPersonalInfoGlitches } from '@/lib/glitchMessages';

export default function PersonalInfoPage() {
  const router = useRouter();
  // Use the requestNavigationAttempt function from the context
  const { triggerPopups, requestNavigationAttempt } = useGlitch();
  const [canNavigate, setCanNavigate] = useState(false); // Still needed for internal logic if popups just closed
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  // State for DOB components
  const [dobMonth, setDobMonth] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [dobYear, setDobYear] = useState('');

  const handleNextClick = () => {
    // Use the context function to handle the attempt
    requestNavigationAttempt(() => {
        // This callback runs only if navigation is allowed (no popups open)
        router.push('/interests');
    });
  };

  // --- Helper functions/arrays for DOB selects ---
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i); // Last 100 years
  const months = [
    { value: '01', label: 'January' }, { value: '02', label: 'February' },
    { value: '03', label: 'March' }, { value: '04', label: 'April' },
    { value: '05', label: 'May' }, { value: '06', label: 'June' },
    { value: '07', label: 'July' }, { value: '08', label: 'August' },
    { value: '09', label: 'September' }, { value: '10', label: 'October' },
    { value: '11', label: 'November' }, { value: '12', label: 'December' },
  ];
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  // --- End DOB helpers ---

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-slate-800">Your Information</h1>
        <p className="text-sm text-center text-gray-500 pb-4">Tell us a bit about yourself.</p>

        <div className="space-y-5">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            />
          </div>

          {/* Phone Input */}
           <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="(555) 555-5555"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            />
          </div>

          {/* Date of Birth Inputs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <div className="grid grid-cols-3 gap-3">
              {/* Month Select */}
              <select
                id="dob-month"
                value={dobMonth}
                onChange={(e) => setDobMonth(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              >
                <option value="" disabled>Month</option>
                {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
              {/* Day Select */}
               <select
                id="dob-day"
                value={dobDay}
                onChange={(e) => setDobDay(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              >
                <option value="" disabled>Day</option>
                 {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {/* Year Select */}
              <select
                id="dob-year"
                value={dobYear}
                onChange={(e) => setDobYear(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              >
                <option value="" disabled>Year</option>
                {years.map(y => <option key={y} value={String(y)}>{y}</option>)}
              </select>
            </div>
          </div>
        </div>

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