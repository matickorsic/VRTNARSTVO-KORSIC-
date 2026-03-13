import React, { useState, useEffect } from 'react';
import { Cookie, X, Check, Shield } from 'lucide-react';
import { Page } from '../App';

interface CookieConsentProps {
  onNavigate: (page: Page) => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Preveri, če je uporabnik že podal soglasje
    const consent = localStorage.getItem('vrtnarstvo-korsic-cookie-consent');
    
    // Če soglasja še ni, prikaži pasico z majhnim zamikom
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('vrtnarstvo-korsic-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('vrtnarstvo-korsic-cookie-consent', 'essential-only');
    setIsVisible(false);
  };

  const handleReadMore = () => {
    onNavigate('cookies');
    // Ne zapremo pasice takoj, če uporabnik želi samo prebrati več,
    // lahko pa jo zapremo, če se odločimo, da navigacija šteje kot interakcija.
    // Tukaj jo pustimo odprto, da se lahko odloči po branju, ali pa jo skrijemo.
    // Za boljšo UX jo pustimo odprto ali minimiziramo.
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 animate-in slide-in-from-bottom-10 duration-500">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-nature-100 p-6 md:flex items-center justify-between gap-8">
        
        {/* Text Content */}
        <div className="flex items-start gap-4 mb-6 md:mb-0">
          <div className="p-3 bg-nature-50 text-nature-600 rounded-full shrink-0 hidden sm:flex">
            <Cookie size={24} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-gray-900 text-lg mb-2 flex items-center gap-2">
              <span className="sm:hidden"><Cookie size={20} className="text-nature-600"/></span>
              Piškotki in zasebnost
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Spletna stran uporablja piškotke za zagotavljanje boljše uporabniške izkušnje in spremljanje statistike obiska. 
              S klikom na "Sprejmi vse" soglašate z uporabo vseh piškotkov.
            </p>
            <button 
              onClick={handleReadMore}
              className="text-sm text-nature-600 font-medium underline mt-2 hover:text-nature-800 transition-colors"
            >
              Preberite več o piškotkih
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button 
            onClick={handleDecline}
            className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors whitespace-nowrap"
          >
            Samo nujni
          </button>
          <button 
            onClick={handleAcceptAll}
            className="px-8 py-2.5 rounded-full bg-nature-600 text-white text-sm font-medium hover:bg-nature-700 transition-colors shadow-lg shadow-nature-600/20 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Check size={16} />
            Sprejmi vse
          </button>
        </div>

      </div>
    </div>
  );
};