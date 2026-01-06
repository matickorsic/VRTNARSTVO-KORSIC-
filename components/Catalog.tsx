import React, { useEffect, useRef, useState } from 'react';
import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Enoletnice",
    category: "Sezonsko",
    image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?q=80&w=1000&auto=format&fit=crop", 
    description: "Bogata izbira sezonskega cvetja. Nudimo širok nabor visečih in pokončnih rastlin, primernih za sončne, senčne in polsenčne lege."
  },
  {
    id: 2,
    name: "Trajnice",
    category: "Vrt",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop", 
    description: "Trpežne rastline, ki se vračajo vsako leto. Pri nas najdete vse od okrasnih trav, cvetočih in plezajočih trajnic, pa vse do različnih zelišč."
  },
  {
    id: 3,
    name: "Sobne rastline",
    category: "Dom",
    image: "https://images.unsplash.com/photo-1611735341450-74d61e66ee01?q=80&w=1000&auto=format&fit=crop", // Indoor plants
    description: "Ustvarite zeleno oazo v svojem domu. Pestra izbira listnatih in cvetočih sobnih rastlin, kaktusov ter sukulent."
  },
  {
    id: 4,
    name: "Grmičevje",
    category: "Urejanje",
    image: "https://images.unsplash.com/photo-1662386993218-05d836376c3a?q=80&w=1000&auto=format&fit=crop", 
    description: "Okrasno grmičevje za vsak vrt. Nudimo pestro izbiro sadik za oblikovanje živih mej ter raznolike samostojne okrasne grme."
  },
  {
    id: 5,
    name: "Gnojila in Substrati",
    category: "Nega & Rast",
    image: "https://images.unsplash.com/photo-1590757731778-d0554eb45089?q=80&w=1000&auto=format&fit=crop", // Combined soil/fertilizer
    description: "Vse za zdravo rast. Visokokakovostni substrati Triplo in profesionalna gnojila Venagro za optimalno vitalnost vaših rastlin."
  },
  {
    id: 6,
    name: "Okrasni lonci",
    category: "Dodatki",
    image: "https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=1000&auto=format&fit=crop", 
    description: "Širok izbor modernih okrasnih loncev poljske znamke Form Plastic različnih oblik in barv za popestritev vašega ambienta."
  }
];

interface CatalogProps {
  onSelectCategory?: (category: Category) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onSelectCategory }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        // POPRAVEK: Znižan threshold na 0.01 (1%). 
        // Na mobilnih napravah je sekcija zelo visoka. Če zahtevamo 20% vidnost,
        // se morda nikoli ne sproži, ker je 20% sekcije višje od celotnega ekrana.
        threshold: 0.01, 
        rootMargin: "-50px" 
      } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getAnimationClass = (index: number) => {
    // Duration podaljšan na 1500ms
    const baseClass = "transition-all duration-[1500ms] ease-out";
    
    if (isVisible) {
      return `${baseClass} opacity-100 translate-x-0 translate-y-0`;
    }

    // Hidden State
    const mobileHidden = "opacity-0 translate-y-20";
    
    // Desktop Hidden States
    let desktopHidden = "";
    if (index % 3 === 0) desktopHidden = "md:-translate-x-24 md:translate-y-0"; // Left Col
    else if (index % 3 === 1) desktopHidden = "md:translate-y-24 md:translate-x-0"; // Middle Col
    else desktopHidden = "md:translate-x-24 md:translate-y-0"; // Right Col

    return `${baseClass} ${mobileHidden} ${desktopHidden}`;
  };

  return (
    <section id="catalog" className="py-20 bg-white overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-nature-600 font-semibold tracking-wide uppercase text-sm mb-2">Naša zbirka</h2>
          <h3 className="text-5xl font-serif font-bold text-nature-900 mb-6">NAŠA PONUDBA</h3>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Z nami bo vaš vrt cvetel! Kliknite na kategorijo za ogled podrobnosti in galerije.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((item, index) => (
            <div 
              key={item.id} 
              onClick={() => onSelectCategory && onSelectCategory(item)}
              className={`group bg-nature-50/30 rounded-2xl overflow-hidden hover:shadow-xl border border-nature-100 flex flex-col cursor-pointer hover:-translate-y-2 ${getAnimationClass(index)}`}
              // Povečan delay na 250ms (prej 150ms) za bolj razločen "stagger" učinek
              style={{ transitionDelay: `${index * 250}ms` }} 
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-nature-800 shadow-sm">
                  {item.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-2xl font-serif font-bold text-gray-800 group-hover:text-nature-700 transition-colors">{item.name}</h4>
                </div>
                <p className="text-gray-500 text-sm flex-1 leading-relaxed">{item.description}</p>
                <div className="mt-4 pt-4 border-t border-nature-100/50 flex justify-between items-center">
                    <span className="text-xs text-nature-600 font-medium bg-nature-100 px-3 py-1.5 rounded-full">Oglej si galerijo</span>
                    <span className="text-nature-400 text-sm group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Vrtnarstvo+Koršič+Ščedne+6+Nova+Gorica"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-nature-800 text-white px-8 py-3 rounded-full hover:bg-nature-700 transition-colors shadow-lg shadow-nature-800/20 font-medium"
          >
            Obiščite nas
          </a>
        </div>
      </div>
    </section>
  );
};