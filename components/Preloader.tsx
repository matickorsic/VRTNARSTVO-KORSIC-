import React from 'react';

interface PreloaderProps {
  isLoading: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-nature-50 transition-opacity duration-700 ease-in-out ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Spinning Ring */}
        <div className="absolute w-40 h-40 md:w-56 md:h-56 border-4 border-nature-200 border-t-nature-600 rounded-full animate-spin-slow"></div>
        
        {/* Logo Container */}
        <div className="relative z-10 p-6 animate-pulse-slow">
            <img 
              src="https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769287031/image-removebg-preview_aqkker.png" 
              alt="Vrtnarstvo Koršič" 
              className="h-16 md:h-24 w-auto object-contain"
            />
        </div>
        
        <div className="mt-8 text-nature-800 font-serif text-sm tracking-widest uppercase animate-pulse">
            Nalaganje vrta...
        </div>
      </div>
    </div>
  );
};