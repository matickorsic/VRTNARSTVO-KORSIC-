import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const IMAGES = [
  {
    url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769439007/IMG_6520_elwtrv.jpg",
    title: "Sansatia"
  },
  {
    url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769438995/IMG_6509_kfgh8g.jpg",
    title: "Azaleja"
  },
  {
    url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769439005/IMG_6515_vxgckr.jpg",
    title: "Levizija"
  },
  {
    url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769439007/IMG_6514_vt0ize.jpg",
    title: "Kalanhoja"
  },
  {
    url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769438997/IMG_6517_feilbj.jpg",
    title: "Nageljni"
  },
  {
    url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769439008/IMG_6503_ubpgn2.jpg",
    title: "Strelitzia"
  },
  {
    url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769439006/IMG_6513_szehmi.jpg",
    title: "Sobne rastline"
  },
  {
    url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769439007/IMG_6504_vghvaw.jpg",
    title: "Bršljan"
  },
  {
    url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769439002/IMG_6518_fkvgf3.jpg",
    title: "Trobentice"
  },
  {
    url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769439005/IMG_6507_stjyko.jpg",
    title: "Gazanije"
  },
  {
    url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769439003/IMG_6516_wcqea6.jpg",
    title: "Levizija"
  },
  {
    url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769438998/IMG_6511_mur5bs.jpg",
    title: "Primula obconica"
  },
  {
    url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769439002/IMG_6521_tqdwb6.jpg",
    title: "Mačehe"
  },
  {
    url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769439001/IMG_6519_j2ykhs.jpg",
    title: "Trobentice"
  },
  {
    url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769438997/IMG_6522_wbcehd.jpg",
    title: "Asparagus"
  },
  {
    url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769438997/IMG_6510_mq66t1.jpg",
    title: "Cinerarija"
  },
  {
    url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769438997/IMG_6506_buj0pv.jpg",
    title: "Kala"
  },
  {
    url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769438997/IMG_6512_bknum4.jpg",
    title: "Sezonska ponudba"
  }
];

export const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  // Responsive items to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };
    
    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, IMAGES.length - itemsToShow);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000); // 4 seconds

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h4 className="text-nature-600 font-bold tracking-widest uppercase text-sm mb-3">
              Galerija slik
            </h4>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-nature-900 mb-6">
              Trenutna ponudba iz vrtnarije
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Na voljo so različne vrste rastlin, primerne za sezonsko sajenje in dekoracijo. 
              Spodaj si lahko ogledate aktualne fotografije neposredno iz naših rastlinjakov.
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex gap-2 shrink-0">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full border border-nature-200 text-nature-700 hover:bg-nature-600 hover:text-white hover:border-transparent transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full border border-nature-200 text-nature-700 hover:bg-nature-600 hover:text-white hover:border-transparent transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Carousel Window */}
        <div className="relative">
          <div className="overflow-hidden -mx-4 px-4 py-4"> {/* Negative margin for shadow breathing room */}
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {IMAGES.map((img, index) => (
                <div 
                  key={index}
                  className="px-3 shrink-0"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
                    <img 
                      src={img.url} 
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-nature-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Content on hover */}
                    <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 w-full">
                      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg inline-block">
                        <p className="text-nature-900 font-serif text-lg font-bold">{img.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-nature-600' : 'w-2 bg-nature-200 hover:bg-nature-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
        </div>

      </div>
    </section>
  );
};