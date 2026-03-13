import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { Page } from '../App';

interface HeroProps {
  onNavigate: (page: Page) => void;
  onVideoLoaded?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onVideoLoaded }) => {
  
  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    // Ciljamo specifičen ID za delovni čas v footerju
    const hoursSection = document.getElementById('working-hours');
    if (hoursSection) {
      // block: 'center' zagotovi, da je element na sredini ekrana, ne na vrhu
      hoursSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // Fallback
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCatalog = (e: React.MouseEvent) => {
    e.preventDefault();
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-nature-900">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <iframe
          src="https://player.vimeo.com/video/1126626352?background=1&autoplay=1&loop=1&byline=0&title=0"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-[177.77vh] h-[56.25vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none object-cover"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          title="Video ozadje"
          onLoad={onVideoLoaded}
        ></iframe>
        {/* Text readability overlay (Left to Right) */}
        <div className="absolute inset-0 bg-gradient-to-r from-nature-900/90 via-nature-900/40 to-transparent"></div>
        {/* Header readability overlay (Top to Bottom) */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-nature-900/60 to-transparent pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20">
        <div className="max-w-3xl text-white">
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold tracking-wider mb-6 border border-white/30 uppercase">
            Družinska tradicija od leta 1993
          </div>
          
          {/* Mobile Title (Smaller) & Desktop Title */}
          <h1 className="text-4xl md:text-7xl font-serif font-bold leading-tight mb-6 uppercase">
            Dobrodošli na <br/>
            <span className="text-nature-300">vrtnariji</span>
          </h1>

          {/* Mobile Description (Shortened) */}
          <p className="text-lg text-gray-200 mb-8 font-light leading-relaxed md:hidden">
            Smo majhno družinsko podjetje z več kot 30-letno tradicijo v svetu vrtnarjenja. Nahajamo se na čudoviti lokaciji v Novi Gorici, kjer ustvarjamo zelene zgodbe...
          </p>

          {/* Desktop Description (Full) */}
          <p className="text-xl text-gray-200 mb-8 font-light leading-relaxed hidden md:block">
            Smo majhno družinsko podjetje z več kot 30-letno tradicijo v svetu vrtnarjenja. Nahajamo se na čudoviti lokaciji v Novi Gorici (Ščedne 6), z enostavnim dostopom iz Vojkove ulice. V naši vrtnariji ponujamo bogato izbiro sezonskih rastlin, trajnic, dišavnic, okrasnih grmovnic, sobnih rastlin, zelenjave in jagodičevja. Poleg tega vam nudimo vrhunska gnojila, zemlje in lonce, ki bodo poskrbeli za vitalnost vašega vrta.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <a 
              href="#catalog" 
              onClick={handleScrollToCatalog}
              className="bg-nature-500 hover:bg-nature-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-medium transition-all flex items-center justify-center gap-2 group"
            >
              Raziščite naše rastline
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#working-hours"
              onClick={handleScrollToContact}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-3 md:px-8 md:py-4 rounded-full font-medium transition-all text-center flex items-center justify-center gap-2"
            >
              <Clock size={18} />
              Delovni čas
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};