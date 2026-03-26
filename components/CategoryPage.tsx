import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ImageOff, X } from 'lucide-react';
import { Category, CategoryGalleryDetails, CategoryGalleryImage } from '../types';

interface CategoryPageProps {
  category: Category;
  onBack: () => void;
}

interface GalleryItem {
  id: number;
  url: string;
  additionalUrls: string[];
  title: string;
  description?: string;
  details?: CategoryGalleryDetails;
}

const DETAIL_LABELS: Record<string, string> = {
  plantType: 'Vrsta rastline',
  family: 'Botanična družina',
  height: 'Višina rastline',
  maxHeight: 'Maksimalna višina',
  evergreen: 'Obstojnost listov',
  exposure: 'Sonce',
  water: 'Zalivanje',
  blooming: 'Cvetenje',
  potSize: 'Velikost lonca',
  leafShape: 'Oblika listov',
  leafColor: 'Barva listov',
  flowerColor: 'Barva cveta',
  use: 'Uporaba',
  minTemp: 'Najnižja temperatura',
  soil: 'Tla',
  pruning: 'Obrezovanje',
  trunk: 'Obseg trupa',
  diameter: 'Premer',
};

const normalizeGalleryItem = (
  item: string | CategoryGalleryImage,
  index: number,
  categoryName: string
): GalleryItem => {
  if (typeof item === 'string') {
    return {
      id: index,
      url: item,
      additionalUrls: [],
      title: `${categoryName} ${index + 1}`,
    };
  }

  return {
    id: index,
    url: item.url,
    additionalUrls: item.additionalUrls || [],
    title: item.title || `${categoryName} ${index + 1}`,
    description: item.description,
    details: item.details,
  };
};

export const CategoryPage: React.FC<CategoryPageProps> = ({ category, onBack }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedImage]);

  const galleryItems = useMemo(
    () => (category.galleryImages || []).map((item, index) => normalizeGalleryItem(item, index, category.name)),
    [category.galleryImages, category.name]
  );

  const allSelectedImages = selectedImage
    ? [selectedImage.url, ...selectedImage.additionalUrls].filter(Boolean)
    : [];

  const detailEntries = selectedImage?.details
    ? Object.entries(selectedImage.details).filter(([, value]) => value !== undefined && value !== '')
    : [];

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="container mx-auto px-4 md:px-6">
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
            <br className="mb-2" />
            Spodaj si lahko ogledate primere iz naše trenutne ponudbe.
          </p>
        </div>

        {galleryItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedImage(item)}
                className="aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative group transform hover:-translate-y-1 bg-gray-100 text-left"
              >
                <img
                  src={item.url}
                  loading="lazy"
                  decoding="async"
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-nature-900/55 via-nature-900/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-nature-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg mb-3">
                    {item.title}
                  </span>
                  {item.description && (
                    <p className="text-white text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-16 p-8 bg-nature-50 rounded-2xl text-center border border-nature-100 flex flex-col items-center gap-4">
            <div className="p-4 bg-white rounded-full text-nature-300">
              <ImageOff size={32} />
            </div>
            <p className="text-nature-800 font-medium">
              Galerija je v pripravi. Kmalu bomo dodali sveže fotografije naših {category.name.toLowerCase()}.
            </p>
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-nature-950/90 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row relative animate-in zoom-in-95 duration-300 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-nature-900 hover:bg-white transition-colors shadow-md"
            >
              <X size={24} />
            </button>

            <div className="w-full md:w-1/2 h-[50vh] md:h-auto bg-gray-100 flex flex-col">
              <div className="flex-1 relative overflow-hidden">
                <img
                  src={allSelectedImages[activeImageIndex]}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain md:object-cover transition-all duration-500"
                />
              </div>

              {allSelectedImages.length > 1 && (
                <div className="p-4 bg-white border-t border-nature-100 flex justify-center gap-3 overflow-x-auto">
                  {allSelectedImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === index
                          ? 'border-nature-600 scale-105 shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={image} alt={`${selectedImage.title} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col">
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-nature-900 mb-4">
                  {selectedImage.title}
                </h2>
                {selectedImage.description && (
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {selectedImage.description}
                  </p>
                )}
              </div>

              {detailEntries.length > 0 && (
                <div className="mt-auto pt-6 border-t border-nature-100">
                  <h3 className="text-xl font-serif font-bold text-nature-800 mb-4">
                    Podrobnosti
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {detailEntries.map(([key, value]) => (
                      <div key={key} className="bg-nature-50 rounded-xl p-4 border border-nature-100">
                        <p className="text-[11px] uppercase tracking-wider text-nature-500 font-bold mb-1">
                          {DETAIL_LABELS[key] || key}
                        </p>
                        <p className="text-sm text-nature-900 font-medium">
                          {typeof value === 'boolean' ? (value ? 'Da' : 'Ne') : String(value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
