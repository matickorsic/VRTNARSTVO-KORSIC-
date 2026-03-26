import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin, FileText, Shield, Cookie, Info } from 'lucide-react';
import { Page } from '../App';
import { Category } from '../types';
import { CATEGORIES } from './Catalog';

interface FooterProps {
  onNavigate?: (page: Page) => void;
  onSelectCategory?: (category: Category) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  
  const handleCategoryClick = (e: React.MouseEvent, category: Category) => {
    e.preventDefault();
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  return (
    <footer id="contact" className="bg-soil-50 text-soil-900 border-t border-soil-200 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Impressum Short */}
          <div>
            <h3 className="font-serif font-bold text-2xl text-nature-800 mb-4">VRTNARSTVO KORŠIČ</h3>
            <p className="text-sm text-soil-600 leading-relaxed mb-6">
              Smo družinsko podjetje z več kot 30-letno tradicijo v svetu vrtnarjenja. V naših lastnih rastlinjakih v Novi Gorici ustvarjamo čudovite zelene zgodbe za vaš dom in vrt.
            </p>
            
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/vrtnarija_korsic/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-soil-200 flex items-center justify-center text-soil-600 hover:bg-nature-600 hover:text-white hover:border-transparent transition-all"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61556467823076&locale=sl_SI" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-soil-200 flex items-center justify-center text-soil-600 hover:bg-nature-600 hover:text-white hover:border-transparent transition-all"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Raziščite</h4>
            <ul className="space-y-3 text-sm text-soil-600">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <a 
                    href={`#category-${category.id}`}
                    onClick={(e) => handleCategoryClick(e, category)}
                    className="hover:text-nature-700 transition-colors cursor-pointer block"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Kontakt</h4>
            <ul className="space-y-4 text-sm text-soil-600">
              <li className="flex items-start gap-3">
                <MapPin className="text-nature-600 shrink-0" size={18} />
                <span>Ščedne 6<br/>5000 Nova Gorica, Slovenija</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-nature-600 shrink-0" size={18} />
                <span>+386 53 006 059</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-nature-600 shrink-0" size={18} />
                <span>vrtnarstvo.korsic@siol.net</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div id="working-hours">
            <h4 className="font-bold text-lg mb-6">Delovni čas</h4>
            <ul className="space-y-3 text-sm text-soil-600">
              <li className="flex justify-between">
                <span>Pon - Pet</span>
                <span className="font-medium text-soil-800">08:00 - 17:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sobota</span>
                <span className="font-medium text-soil-800">08:00 - 12:00</span>
              </li>
              <li className="flex justify-between">
                <span>Nedelja in prazniki</span>
                <span className="text-nature-600 font-medium">Zaprto</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links & Copyright */}
        <div className="border-t border-soil-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-soil-500">
          <p>&copy; {new Date().getFullYear()} Vrtnarstvo Koršič. Vse pravice pridržane.</p>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <button 
              onClick={() => onNavigate && onNavigate('company-details')}
              className="flex items-center gap-2 hover:text-soil-800 transition-colors"
            >
              <Info size={14} />
              <span>Podatki o podjetju</span>
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('terms')}
              className="flex items-center gap-2 hover:text-soil-800 transition-colors"
            >
              <FileText size={14} />
              <span>Splošni pogoji</span>
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('privacy-policy')}
              className="flex items-center gap-2 hover:text-soil-800 transition-colors"
            >
              <Shield size={14} />
              <span>Politika zasebnosti</span>
            </button>
            <button
              onClick={() => onNavigate && onNavigate('cookies')}
              className="flex items-center gap-2 hover:text-soil-800 transition-colors"
            >
              <Cookie size={14} />
              <span>Piškotki</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
