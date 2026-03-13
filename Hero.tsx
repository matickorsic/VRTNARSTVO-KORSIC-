import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Page } from '../App';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkContent, setIsDarkContent] = useState(false);
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(false);
  
  const { itemCount, setIsCartOpen } = useCart();
  
  // Feature flag za spletno trgovino
  const isShopLive = false;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Home page logic: Text should be white on Hero (dark) and Features (dark), but dark on Catalog (light)
      if (currentPage === 'home') {
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

  const handleNavClick = (e: React.MouseEvent, target: string, page?: Page, isComingSoon?: boolean) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (isComingSoon) {
      setIsComingSoonModalOpen(true);
      return;
    }

    if (page) {
      onNavigate(page);
      return;
    }

    if (target.startsWith('#')) {
      const lightPages: Page[] = ['about', 'category', 'company-details', 'terms', 'privacy-policy', 'cookies', 'shop'];
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
    { name: 'Spletna trgovina', target: '#shop', page: 'shop' as Page, isComingSoon: !isShopLive },
    { name: 'O nas', target: '#about', page: 'about' as Page },
    { name: 'Kontakt', target: '#contact' },
  ];

  const useDarkText = isMobileMenuOpen || isDarkContent;

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isMobileMenuOpen 
          ? 'bg-white shadow-md py-4' 
          : isScrolled
            ? 'bg-transparent py-3 backdrop-blur-[2px]' 
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
            src="https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769287031/image-removebg-preview_aqkker.png" 
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
              onClick={(e) => handleNavClick(e, link.target, link.page, link.isComingSoon)}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                useDarkText 
                  ? 'text-nature-900 hover:text-nature-600' 
                  : 'text-white hover:text-nature-200 drop-shadow-md'
              } ${link.page === currentPage && link.page !== 'home' ? 'underline underline-offset-4 decoration-2 decoration-nature-400' : ''}`}
            >
              {link.name}
            </a>
          ))}
          
          {/* Cart Button */}
          {isShopLive && (
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  useDarkText 
                  ? 'text-nature-900 hover:bg-nature-50'
                  : 'text-white hover:bg-white/10 drop-shadow-md'
              }`}
              title="Košarica"
            >
              <ShoppingBag size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {itemCount}
                </span>
              )}
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
            {isShopLive && (
              <button 
                  onClick={() => setIsCartOpen(true)}
                  className={`relative p-2 ${useDarkText ? 'text-nature-800' : 'text-white drop-shadow-md'}`}
              >
                  <ShoppingBag size={24} />
                  {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                          {itemCount}
                      </span>
                  )}
              </button>
            )}

            <button 
            className={`p-2 transition-colors ${
                useDarkText ? 'text-nature-800' : 'text-white drop-shadow-md'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>
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
              onClick={(e) => handleNavClick(e, link.target, link.page, link.isComingSoon)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}

      {/* Coming Soon Modal */}
      {isComingSoonModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsComingSoonModalOpen(false)}></div>
          <div className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full relative z-10 text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsComingSoonModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="w-20 h-20 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <ShoppingBag className="text-nature-600" size={40} />
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Prihaja letos!</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Naša spletna trgovina je trenutno v nastajanju. Trudimo se, da vam kmalu ponudimo najboljše rastline in opremo za vaš vrt kar preko spleta.
            </p>
            <button 
              onClick={() => setIsComingSoonModalOpen(false)}
              className="bg-nature-600 text-white px-8 py-3 rounded-full font-bold hover:bg-nature-700 transition-colors w-full"
            >
              Razumem
            </button>
          </div>
        </div>
      )}
    </header>
  );
};