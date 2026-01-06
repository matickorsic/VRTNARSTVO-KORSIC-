import React from 'react';
import { Instagram, Facebook } from 'lucide-react';

export const SocialCta: React.FC = () => {
  return (
    <section className="py-16 bg-white border-t border-nature-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12">
            <a 
                href="https://www.instagram.com/vrtnarija_korsic/" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-nature-700 font-medium hover:text-nature-900 transition-colors group"
            >
                <div className="p-3 bg-nature-50 rounded-full group-hover:bg-nature-100 transition-colors text-nature-600 group-hover:text-nature-800">
                    <Instagram size={24} />
                </div>
                <span className="text-lg">Sledite nam na Instagramu</span>
            </a>
            
            <a 
                href="https://www.facebook.com/profile.php?id=61556467823076&locale=sl_SI" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-nature-700 font-medium hover:text-nature-900 transition-colors group"
            >
                <div className="p-3 bg-nature-50 rounded-full group-hover:bg-nature-100 transition-colors text-nature-600 group-hover:text-nature-800">
                    <Facebook size={24} />
                </div>
                <span className="text-lg">Sledite nam na Facebooku</span>
            </a>
        </div>
      </div>
    </section>
  );
};