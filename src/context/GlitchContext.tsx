'use client';

import React, { createContext, useState, useContext, ReactNode, useRef, useCallback } from 'react';
import WindowsXpPopup from '@/components/WindowsXpPopup';
import SnowEffect from '@/components/SnowEffect';

interface Popup {
  id: number;
  message: string;
  x: number;
  y: number;
}

interface GlitchContextType {
  triggerPopups: (messages: string[], onAllClosedInitially?: () => void) => void; // Optional callback for initial trigger
  requestNavigationAttempt: (proceedCallback: () => void) => void; // New function
  triggerSnow: () => void;
}

const GlitchContext = createContext<GlitchContextType | undefined>(undefined);

export const useGlitch = () => {
  const context = useContext(GlitchContext);
  if (!context) {
    throw new Error('useGlitch must be used within a GlitchProvider');
  }
  return context;
};

interface GlitchProviderProps {
  children: ReactNode;
}

const GlitchProvider: React.FC<GlitchProviderProps> = ({ children }) => {
  const [activePopups, setActivePopups] = useState<Popup[]>([]);
  const [showSnow, setShowSnow] = useState(false);
  const [highlightClose, setHighlightClose] = useState(false); // State for highlighting
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const onAllClosedCallbackRef = useRef<(() => void) | null>(null); // Stores the action to take AFTER popups close
  const popupCounterRef = useRef<number>(0);
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for highlight timeout

  // Preload audio
  if (typeof window !== 'undefined' && !audioRef.current) {
    audioRef.current = new Audio('/sounds/xp_error.wav');
    audioRef.current.volume = 0.5;
  }

  const playErrorSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => console.error("Error playing sound:", error));
    }
  }, []);

  const closePopup = useCallback((id: number) => {
    setActivePopups((prev) => prev.filter((popup) => popup.id !== id));
    popupCounterRef.current -= 1;

    // If highlighting was active, turn it off after closing one
    // Alternatively, keep it on until all are closed or timeout
    // setHighlightClose(false); // Option 1: Turn off immediately

    // Check if all popups related to the *last trigger* are now closed
    if (popupCounterRef.current === 0) {
        setHighlightClose(false); // Option 2: Turn off when all are closed
        if (highlightTimeoutRef.current) { // Clear any pending highlight timeout
            clearTimeout(highlightTimeoutRef.current);
            highlightTimeoutRef.current = null;
        }
        // If there was a callback waiting for all popups to close, execute it
        if (onAllClosedCallbackRef.current) {
            onAllClosedCallbackRef.current();
            onAllClosedCallbackRef.current = null; // Clear the callback
        }
    }
  }, []);

  // This function now ONLY triggers the initial appearance of popups
  const triggerPopups = useCallback((messages: string[], onAllClosedInitially?: () => void) => {
    // Only trigger if no popups are currently active from a previous trigger
    if (popupCounterRef.current > 0) return;

    playErrorSound();
    setHighlightClose(false); // Ensure highlighting is off initially

    const newPopups: Popup[] = [];
    messages.forEach((msg) => {
      newPopups.push({
        id: Date.now() + Math.random(),
        message: msg,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
      });
    });

    popupCounterRef.current = newPopups.length;
    // Store the callback that should run *after* these initial popups close (if provided)
    if (onAllClosedInitially) {
        onAllClosedCallbackRef.current = onAllClosedInitially;
    } else {
        onAllClosedCallbackRef.current = null; // Ensure no stale callback
    }
    setActivePopups((prev) => [...prev, ...newPopups]);

  }, [playErrorSound]);

  // New function called when user tries to proceed (e.g., clicks Next)
  const requestNavigationAttempt = useCallback((proceedCallback: () => void) => {
     if (popupCounterRef.current > 0) {
        // Popups are open, trigger highlight
        setHighlightClose(true);
        playErrorSound(); // Play sound again as feedback

        // Optional: Automatically turn off highlight after a short delay
        if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
        highlightTimeoutRef.current = setTimeout(() => {
            setHighlightClose(false);
            highlightTimeoutRef.current = null;
        }, 1500); // Turn off highlight after 1.5 seconds

     } else {
        // No popups open, allow the action (navigation, etc.)
        proceedCallback();
     }
  }, [playErrorSound]); // Include dependencies

   const triggerSnow = useCallback(() => {
     setShowSnow(true);
   }, []);

  return (
    // Pass highlight state down to popups
    <GlitchContext.Provider value={{ triggerPopups, requestNavigationAttempt, triggerSnow }}>
      {children}
      {activePopups.map((popup) => (
        <WindowsXpPopup
          key={popup.id}
          id={popup.id}
          message={popup.message}
          x={popup.x}
          y={popup.y}
          onClose={closePopup}
          highlightClose={highlightClose} // Pass down the highlight state
        />
      ))}
       {showSnow && <SnowEffect />}
    </GlitchContext.Provider>
  );
};

export default GlitchProvider;