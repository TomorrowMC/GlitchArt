import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface WindowsXpPopupProps {
  id: number;
  title?: string;
  message: string;
  x: number;
  y: number;
  onClose: (id: number) => void;
  highlightClose?: boolean; // New prop
}

const WindowsXpPopup: React.FC<WindowsXpPopupProps> = ({
  id,
  title = "System Warning",
  message,
  x,
  y,
  onClose,
  highlightClose = false, // Default to false
}) => {
  const style = {
    left: `${x}%`,
    top: `${y}%`,
    transform: `translate(-${Math.min(x, 80)}%, -${Math.min(y, 80)}%)`,
  };

  // Add conditional classes for highlighting the close button
  const closeButtonClasses = `
    bg-red-600 text-white font-bold w-4 h-4 flex items-center justify-center
    text-xs border border-t-white border-l-white border-r-gray-500 border-b-gray-500
    leading-none hover:bg-red-700 active:bg-red-800
    active:border-t-gray-500 active:border-l-gray-500 active:border-r-white active:border-b-white
    ${highlightClose ? 'animate-pulse ring-2 ring-offset-1 ring-red-400 ring-offset-blue-600' : ''} // Highlight styles
  `;

  return (
    <div
      className="fixed bg-gray-200 border-2 border-t-white border-l-white border-r-gray-500 border-b-gray-500 shadow-md min-w-[300px] max-w-[400px] z-50 select-none font-[Tahoma]"
      style={style}
    >
      <div className="bg-gradient-to-r from-blue-800 to-blue-500 text-white text-xs font-bold p-1 flex justify-between items-center cursor-move">
        <span className="truncate">{title}</span>
        {/* Apply conditional classes to the close button */}
        <button
            className={closeButtonClasses}
            onClick={() => onClose(id)}
            aria-label="Close"
        >
          <FontAwesomeIcon icon={faTimes} size="xs" />
        </button>
      </div>
      <div className="p-4 text-black text-sm flex items-center gap-3">
        <FontAwesomeIcon icon={faExclamationTriangle} size="2x" className="text-red-600" />
        <p>{message}</p>
      </div>
       <div className="flex justify-center p-2 bg-gray-300 border-t border-gray-400">
         <button
            className="bg-gray-200 border border-t-white border-l-white border-r-gray-500 border-b-gray-500 px-5 py-0.5 text-sm text-black hover:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-gray-200 active:bg-gray-300"
            onClick={() => onClose(id)}
         >
            OK
         </button>
       </div>
    </div>
  );
};

export default WindowsXpPopup;