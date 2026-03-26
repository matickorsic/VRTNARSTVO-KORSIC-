import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Page } from '../App';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkContent, setIsDarkContent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Home page logic: Text should be white on Hero (dark) and Features (dark), but dark on Catalog (light)
      if (currentPage === 'home') {
        // Hero is usually 100vh. Features is after that.
        // We switch to dark text when user scrolls past roughly 1.5 screen heights (entering light Catalog)
        // Estimation: Hero (100vh) + Features (~600px). 
        // Let's set a trigger point.
        const triggerPoint = window.innerHeight * 1.2; 
        setIsDarkContent(window.scrollY > triggerPoint);
      } else {
        // Other pages (About, Terms, etc.) usually have white background immediately
        setIsDarkContent(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavClick = (e: React.MouseEvent, target: string, page?: Page) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (page) {
      onNavigate(page);
      return;
    }

    if (target.startsWith('#')) {
      const lightPages: Page[] = ['about', 'category', 'company-details', 'terms', 'privacy-policy', 'cookies'];
      if (lightPages.includes(currentPage) && target !== '#contact') {
        onNavigate('home');
        setTimeout(() => {
          const element = document.querySelector(target);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          onNavigate('home');
          setTimeout(() => {
            const el = document.querySelector(target);
            el?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    }
  };

  const navLinks = [
    { name: 'Domov', target: '#home', page: 'home' as Page },
    { name: 'Rastline', target: '#catalog' },
    { name: 'O nas', target: '#about', page: 'about' as Page },
    { name: 'Kontakt', target: '#contact' },
  ];

  // Logic:
  // Mobile menu open -> Solid White bg needed for menu visibility.
  // Otherwise -> Transparent bg (User request: "brez ozadja").
  // Text color -> depends on isDarkContent (scroll position) OR isMobileMenuOpen.
  
  const useDarkText = isMobileMenuOpen || isDarkContent;

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isMobileMenuOpen 
          ? 'bg-white shadow-md py-4' 
          : isScrolled
            ? 'bg-transparent py-3 backdrop-blur-[2px]' // Minimal blur for legibility, no color
            : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo Section */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home', 'home')}
          className="flex items-center gap-2 group"
        >
          <img 
            src="/images/optimized/image-removebg-preview_aqkker.png" 
            decoding="async"
            fetchPriority="high"
            alt="Vrtnarstvo Koršič Logo" 
            className={`h-12 md:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
              !useDarkText ? 'brightness-0 invert opacity-90 drop-shadow-md' : ''
            }`}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.target}
              onClick={(e) => handleNavClick(e, link.target, link.page)}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                useDarkText 
                  ? 'text-nature-900 hover:text-nature-600' 
                  : 'text-white hover:text-nature-200 drop-shadow-md'
              } ${link.page === currentPage && link.page !== 'home' ? 'underline underline-offset-4 decoration-2 decoration-nature-400' : ''}`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden p-2 transition-colors ${
            useDarkText ? 'text-nature-800' : 'text-white drop-shadow-md'
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col p-6 gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.target}
              className={`text-lg font-medium py-2 border-b border-gray-50 ${
                 link.page === currentPage ? 'text-nature-600 font-bold' : 'text-gray-800'
              }`}
              onClick={(e) => handleNavClick(e, link.target, link.page)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};



