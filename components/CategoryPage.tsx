import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  CircleDot,
  Droplets,
  Flower2,
  ImageOff,
  Layout,
  Leaf,
  Maximize2,
  Palette,
  Ruler,
  Scissors,
  Shovel,
  Sprout,
  Sun,
  Tag,
  ThermometerSnowflake,
  TreeDeciduous,
  X,
} from 'lucide-react';
import { SHRUBBERY_GALLERY } from './shrubberyData';
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

const fixText = (value?: string) => {
  if (!value) {
    return value || '';
  }

  if (!/[ÅÄÂÃ]/.test(value)) {
    return value;
  }

  try {
    const bytes = Uint8Array.from(value.split('').map((char) => char.charCodeAt(0)));
    return new TextDecoder('utf-8').decode(bytes);
  } catch {
    return value;
  }
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

  const sourceGallery = useMemo(() => {
    if (category.name === 'Grmičevje') {
      return SHRUBBERY_GALLERY;
    }

    return category.galleryImages || [];
  }, [category.galleryImages, category.name]);

  const galleryItems = useMemo(
    () => sourceGallery.map((item, index) => normalizeGalleryItem(item, index, category.name)),
    [sourceGallery, category.name]
  );

  const allSelectedImages = selectedImage
    ? [selectedImage.url, ...selectedImage.additionalUrls].filter(Boolean)
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
            {fixText(category.name)}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            {fixText(category.description)}
            <br className="mb-2" />
            Spodaj si lahko ogledate primere iz naše trenutne ponudbe.
          </p>
        </div>

        {galleryItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => {
              const useContainLayout = category.name === 'Grmičevje' || Boolean(item.details);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedImage(item)}
                  className="aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative group transform hover:-translate-y-1 bg-gray-100 text-left"
                >
                  {useContainLayout ? (
                    <div className="w-full h-full bg-white flex flex-col">
                      <div className="flex-1 p-4 flex items-center justify-center bg-gray-50">
                        <img
                          src={item.url}
                          loading="lazy"
                          decoding="async"
                          alt={fixText(item.title)}
                          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4 border-t border-gray-100 bg-white">
                        <span className="inline-block bg-nature-50 text-nature-900 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm mb-3">
                          {fixText(item.title)}
                        </span>
                        {item.description && (
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                            {fixText(item.description)}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={item.url}
                        loading="lazy"
                        decoding="async"
                        alt={fixText(item.title)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-nature-900/55 via-nature-900/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <span className="inline-block bg-white/90 backdrop-blur-sm text-nature-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg mb-3">
                          {fixText(item.title)}
                        </span>
                        {item.description && (
                          <p className="text-white text-sm leading-relaxed line-clamp-3">
                            {fixText(item.description)}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-16 p-8 bg-nature-50 rounded-2xl text-center border border-nature-100 flex flex-col items-center gap-4">
            <div className="p-4 bg-white rounded-full text-nature-300">
              <ImageOff size={32} />
            </div>
            <p className="text-nature-800 font-medium">
              Galerija je v pripravi. Kmalu bomo dodali sveže fotografije naših {fixText(category.name).toLowerCase()}.
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
                  alt={fixText(selectedImage.title)}
                  className="w-full h-full object-contain transition-all duration-500"
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
                      <img src={image} alt={`${fixText(selectedImage.title)} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col">
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-nature-900 mb-4">
                  {fixText(selectedImage.title)}
                </h2>
                {selectedImage.description && (
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {fixText(selectedImage.description)}
                  </p>
                )}
              </div>

              {selectedImage.details && (
                <div className="mt-auto pt-6 flex flex-col gap-8">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-nature-800 mb-4 border-b border-nature-100 pb-2">Značilnosti</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedImage.details.plantType && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-nature-50 rounded-lg text-nature-700">
                            <Sprout size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-nature-500 uppercase font-bold tracking-wider">Vrsta rastline</p>
                            <p className="text-nature-900 font-medium text-sm">{fixText(selectedImage.details.plantType)}</p>
                          </div>
                        </div>
                      )}
                      {selectedImage.details.family && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-nature-50 rounded-lg text-nature-700">
                            <Tag size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-nature-500 uppercase font-bold tracking-wider">Botanična družina</p>
                            <p className="text-nature-900 font-medium text-sm">{fixText(selectedImage.details.family)}</p>
                          </div>
                        </div>
                      )}
                      {selectedImage.details.potSize && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-nature-50 rounded-lg text-nature-700">
                            <CircleDot size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-nature-500 uppercase font-bold tracking-wider">Velikost lonca</p>
                            <p className="text-nature-900 font-medium text-sm">{fixText(selectedImage.details.potSize)}</p>
                          </div>
                        </div>
                      )}
                      {selectedImage.details.diameter && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-nature-50 rounded-lg text-nature-700">
                            <CircleDot size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-nature-500 uppercase font-bold tracking-wider">Premer rastline</p>
                            <p className="text-nature-900 font-medium text-sm">{fixText(selectedImage.details.diameter)}</p>
                          </div>
                        </div>
                      )}
                      {selectedImage.details.trunk && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-nature-50 rounded-lg text-nature-700">
                            <TreeDeciduous size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-nature-500 uppercase font-bold tracking-wider">Obseg trupa</p>
                            <p className="text-nature-900 font-medium text-sm">{fixText(selectedImage.details.trunk)}</p>
                          </div>
                        </div>
                      )}
                      {selectedImage.details.leafColor && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-nature-50 rounded-lg text-nature-700">
                            <Palette size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-nature-500 uppercase font-bold tracking-wider">Barva listov</p>
                            <p className="text-nature-900 font-medium text-sm">{fixText(selectedImage.details.leafColor)}</p>
                          </div>
                        </div>
                      )}
                      {selectedImage.details.blooming && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-nature-50 rounded-lg text-nature-700">
                            <Flower2 size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-nature-500 uppercase font-bold tracking-wider">Obdobje cvetenja</p>
                            <p className="text-nature-900 font-medium text-sm">{fixText(selectedImage.details.blooming)}</p>
                          </div>
                        </div>
                      )}
                      {selectedImage.details.evergreen !== undefined && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-nature-50 rounded-lg text-nature-700">
                            <Leaf size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-nature-500 uppercase font-bold tracking-wider">Obstojnost listov</p>
                            <p className="text-nature-900 font-medium text-sm">
                              {selectedImage.details.evergreen ? 'Zimzeleno' : 'Listopadno'}
                            </p>
                          </div>
                        </div>
                      )}
                      {selectedImage.details.height && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-nature-50 rounded-lg text-nature-700">
                            <Ruler size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-nature-500 uppercase font-bold tracking-wider">Višina rastline</p>
                            <p className="text-nature-900 font-medium text-sm">{fixText(selectedImage.details.height)}</p>
                          </div>
                        </div>
                      )}
                      {selectedImage.details.leafShape && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-nature-50 rounded-lg text-nature-700">
                            <Leaf size={18} className="rotate-45" />
                          </div>
                          <div>
                            <p className="text-[10px] text-nature-500 uppercase font-bold tracking-wider">Oblika listov</p>
                            <p className="text-nature-900 font-medium text-sm">{fixText(selectedImage.details.leafShape)}</p>
                          </div>
                        </div>
                      )}
                      {selectedImage.details.flowerColor && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-nature-50 rounded-lg text-nature-700">
                            <Palette size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-nature-500 uppercase font-bold tracking-wider">Barva cveta</p>
                            <p className="text-nature-900 font-medium text-sm">{fixText(selectedImage.details.flowerColor)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-serif font-bold text-nature-800 mb-4 border-b border-nature-100 pb-2">Informacije</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedImage.details.use && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-nature-50 rounded-lg text-nature-700">
                            <Layout size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-nature-500 uppercase font-bold tracking-wider">Uporaba</p>
                            <p className="text-nature-900 font-medium text-sm">{fixText(selectedImage.details.use)}</p>
                          </div>
                        </div>
                      )}
                      {selectedImage.details.exposure && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-nature-50 rounded-lg text-nature-700">
                            <Sun size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-nature-500 uppercase font-bold tracking-wider">Lega</p>
                            <p className="text-nature-900 font-medium text-sm">{fixText(selectedImage.details.exposure)}</p>
                          </div>
                        </div>
                      )}
                      {selectedImage.details.soil && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-nature-50 rounded-lg text-nature-700">
                            <Shovel size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-nature-500 uppercase font-bold tracking-wider">Tla</p>
                            <p className="text-nature-900 font-medium text-sm">{fixText(selectedImage.details.soil)}</p>
                          </div>
                        </div>
                      )}
                      {selectedImage.details.pruning && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-nature-50 rounded-lg text-nature-700">
                            <Scissors size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-nature-500 uppercase font-bold tracking-wider">Obrezovanje</p>
                            <p className="text-nature-900 font-medium text-sm">{fixText(selectedImage.details.pruning)}</p>
                          </div>
                        </div>
                      )}
                      {selectedImage.details.maxHeight && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-nature-50 rounded-lg text-nature-700">
                            <Maximize2 size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-nature-500 uppercase font-bold tracking-wider">Končna velikost</p>
                            <p className="text-nature-900 font-medium text-sm">{fixText(selectedImage.details.maxHeight)}</p>
                          </div>
                        </div>
                      )}
                      {selectedImage.details.minTemp && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-nature-50 rounded-lg text-nature-700">
                            <ThermometerSnowflake size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-nature-500 uppercase font-bold tracking-wider">Min. temperatura</p>
                            <p className="text-nature-900 font-medium text-sm">{fixText(selectedImage.details.minTemp)}</p>
                          </div>
                        </div>
                      )}
                      {selectedImage.details.water && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-nature-50 rounded-lg text-nature-700">
                            <Droplets size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-nature-500 uppercase font-bold tracking-wider">Zalivanje</p>
                            <p className="text-nature-900 font-medium text-sm">{fixText(selectedImage.details.water)}</p>
                          </div>
                        </div>
                      )}
                    </div>
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
