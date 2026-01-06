import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Category } from '../types';

interface CategoryPageProps {
  category: Category;
  onBack: () => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category, onBack }) => {
  // Scroll to top when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Generate placeholder items for the grid
  // We don't need random heights anymore, just random shades for the green boxes
  const galleryItems = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    shade: 100 + Math.floor(Math.random() * 5) * 100 // Varying shades of green
  }));

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Navigation & Header */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-nature-700 hover:text-nature-900 font-medium mb-8 transition-colors"
        >
          <div className="p-2 bg-nature-50 rounded-full group-hover:bg-nature-100 transition-colors">
            <ArrowLeft size={20} />
          </div>
          Nazaj na ponudbo
        </button>

        <div className="mb-16">
          <span className="text-nature-600 font-bold tracking-widest uppercase text-sm mb-2 block">
            Galerija
          </span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-nature-900 mb-6">
            {category.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            {category.description} 
            <br className="mb-2"/>
            Spodaj si lahko ogledate primere iz naše trenutne zaloge.
          </p>
        </div>

        {/* Standard Grid Gallery (3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div 
              key={item.id}
              className="aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative group transform hover:-translate-y-1"
            >
              {/* Green Placeholder */}
              <div 
                className={`w-full h-full bg-nature-${item.shade < 900 ? item.shade : 500} flex items-center justify-center`}
              >
                <div className="text-white/30 font-serif text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Foto {item.id + 1}
                </div>
              </div>
              
              {/* Overlay for realism feeling */}
              <div className="absolute inset-0 bg-gradient-to-t from-nature-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              {/* Caption placeholder */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="inline-block bg-white/90 backdrop-blur-sm text-nature-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  {category.name} {item.id + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder Message */}
        <div className="mt-16 p-8 bg-nature-50 rounded-2xl text-center border border-nature-100">
          <p className="text-nature-800 font-medium">
            Galerija je v pripravi. Kmalu bomo dodali sveže fotografije naših {category.name.toLowerCase()}.
          </p>
        </div>

      </div>
    </div>
  );
};