import React, { useEffect, useState } from 'react';
import { ShoppingBag, Search, Loader2, X, Trash2, Plus, Minus, ShoppingCart, Check, Info, Mail } from 'lucide-react';
import { supabase } from '../services/supabase';
import { ShopProduct } from '../types';
import { useCart } from '../context/CartContext';

// --- PRODUCT MODAL COMPONENT ---
const ProductModal: React.FC<{
  group: ShopProduct[];
  isOpen: boolean;
  onClose: () => void;
  addToCart: (p: ShopProduct, qty: number) => void;
}> = ({ group, isOpen, onClose, addToCart }) => {
  // Sort by price
  const sortedGroup = [...group].sort((a, b) => a.price - b.price);
  const [selectedVariant, setSelectedVariant] = useState<ShopProduct>(sortedGroup[0]);
  const [quantity, setQuantity] = useState(1);

  // Reset selected variant and quantity when group changes
  useEffect(() => {
    if (group.length > 0) {
      const sorted = [...group].sort((a, b) => a.price - b.price);
      setSelectedVariant(sorted[0]);
      setQuantity(1);
    }
  }, [group]);

  if (!isOpen) return null;

  const hasVariations = sortedGroup.length > 1;

  const uniqueColors = Array.from(new Set(sortedGroup.map(v => v.color).filter(Boolean)));
  const uniqueSizes = Array.from(new Set(sortedGroup.map(v => v.size).filter(Boolean)));
  const uniqueVariations = Array.from(new Set(sortedGroup.map(v => v.variation).filter(Boolean)));

  const handleColorSelect = (c: string) => {
     const exactMatch = sortedGroup.find(v => v.color === c && v.size === selectedVariant.size && v.variation === selectedVariant.variation);
     if (exactMatch) setSelectedVariant(exactMatch);
     else {
         const firstMatch = sortedGroup.find(v => v.color === c);
         if (firstMatch) setSelectedVariant(firstMatch);
     }
  };

  const handleSizeSelect = (s: string) => {
     const exactMatch = sortedGroup.find(v => v.size === s && v.color === selectedVariant.color && v.variation === selectedVariant.variation);
     if (exactMatch) setSelectedVariant(exactMatch);
     else {
         const firstMatch = sortedGroup.find(v => v.size === s);
         if (firstMatch) setSelectedVariant(firstMatch);
     }
  };

  const handleVariationSelect = (v: string) => {
     const exactMatch = sortedGroup.find(x => x.variation === v && x.color === selectedVariant.color && x.size === selectedVariant.size);
     if (exactMatch) setSelectedVariant(exactMatch);
     else {
         const firstMatch = sortedGroup.find(x => x.variation === v);
         if (firstMatch) setSelectedVariant(firstMatch);
     }
  };
  
  // Check stock (if stock is explicitly 0, it's out of stock)
  const isOutOfStock = typeof selectedVariant.stock === 'number' && selectedVariant.stock <= 0;

  const handleInquiry = () => {
      const subject = encodeURIComponent(`Povpraševanje: ${selectedVariant.name}`);
      const variantInfo = selectedVariant.color || selectedVariant.size || selectedVariant.variation || 'Standard';
      const body = encodeURIComponent(
        `Pozdravljeni,\n\nZanima me dobavljivost za izdelek:\n` +
        `Naziv: ${selectedVariant.name}\n` +
        `Različica/Velikost: ${variantInfo}\n` +
        `Cena: ${selectedVariant.price} €\n\n` +
        `Prosim za informacijo, kdaj bo izdelek ponovno na voljo.\n\n` +
        `Lep pozdrav`
      );
      window.location.href = `mailto:vrtnarstvo.korsic@siol.net?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-nature-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-500 hover:text-gray-900 hover:bg-white transition-all shadow-sm"
        >
          <X size={24} />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-1/2 bg-gray-50 relative min-h-[300px] md:min-h-full">
           {selectedVariant.image_url ? (
             <img 
               src={selectedVariant.image_url} 
               alt={selectedVariant.name} 
               // REMOVED grayscale to keep image in color
               className="w-full h-full object-contain absolute inset-0 p-4"
             />
           ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-300">
               <ShoppingBag size={64} />
             </div>
           )}
           <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-bold text-nature-800 shadow-sm">
              {selectedVariant.category}
           </div>
           
           {/* Subtle Badge for Out of Stock */}
           {isOutOfStock && (
               <div className="absolute bottom-4 left-4 bg-red-100/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-red-200 shadow-sm">
                   <span className="text-red-700 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                       Trenutno ni na zalogi
                   </span>
               </div>
           )}
        </div>

        {/* Info Side */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-nature-900 mb-4">
            {selectedVariant.name}
          </h2>

          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-nature-600">
              {(selectedVariant.price || 0).toFixed(2)} €
            </span>
            {(selectedVariant.color || selectedVariant.size || selectedVariant.variation) && (
              <span className="text-lg text-gray-400 font-medium">
                 / {[selectedVariant.color, selectedVariant.size, selectedVariant.variation].filter(Boolean).join(' - ')}
              </span>
            )}
          </div>

          <div className="prose prose-sm text-gray-600 mb-8 leading-relaxed">
            <p>{selectedVariant.description}</p>
          </div>

          {/* Variations */}
          {hasVariations && (
            <div className="mb-6 space-y-4">
              {uniqueColors.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Barva:</span>
                  <div className="flex flex-wrap gap-2">
                    {uniqueColors.map(c => (
                      <button
                        key={c as string}
                        onClick={() => handleColorSelect(c as string)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                          selectedVariant.color === c ? 'bg-nature-50 border-nature-600 text-nature-700' : 'bg-white border-gray-100 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {c as string}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {uniqueSizes.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Velikost:</span>
                  <div className="flex flex-wrap gap-2">
                    {uniqueSizes.map(s => (
                      <button
                        key={s as string}
                        onClick={() => handleSizeSelect(s as string)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                          selectedVariant.size === s ? 'bg-nature-50 border-nature-600 text-nature-700' : 'bg-white border-gray-100 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {s as string}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {uniqueVariations.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Različica:</span>
                  <div className="flex flex-wrap gap-2">
                    {uniqueVariations.map(v => (
                      <button
                        key={v as string}
                        onClick={() => handleVariationSelect(v as string)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                          selectedVariant.variation === v ? 'bg-nature-50 border-nature-600 text-nature-700' : 'bg-white border-gray-100 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {v as string}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quantity Selector - Hide if out of stock */}
          {!isOutOfStock && (
            <div className="mb-8">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">
                    Količina:
                </span>
                <div className="flex items-center gap-4 bg-gray-50 rounded-xl w-max p-2 border border-gray-100">
                    <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-nature-600 hover:bg-nature-50 hover:text-nature-800 transition-all active:scale-95 disabled:opacity-50"
                        disabled={quantity <= 1}
                    >
                        <Minus size={18} />
                    </button>
                    <span className="font-bold text-xl w-8 text-center text-gray-900">{quantity}</span>
                    <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-nature-600 hover:bg-nature-50 hover:text-nature-800 transition-all active:scale-95"
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-auto pt-6 border-t border-gray-100">
            {isOutOfStock ? (
                // Out of Stock / Inquiry Button
                <button 
                  onClick={handleInquiry}
                  className="w-full bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 hover:border-gray-300 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <Mail size={24} className="text-gray-500 group-hover:text-gray-800" />
                  Oddaj zanimanje
                </button>
            ) : (
                // Add to Cart Button
                <button 
                  onClick={() => {
                      addToCart(selectedVariant, quantity);
                      onClose();
                  }}
                  className="w-full bg-nature-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-nature-700 transition-all shadow-lg shadow-nature-600/20 flex items-center justify-center gap-2 group"
                >
                  <Plus size={24} className="group-hover:scale-110 transition-transform" />
                  Dodaj v košarico ({quantity})
                </button>
            )}

            <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
              {isOutOfStock ? (
                  <span className="text-gray-500 font-medium">Obvestili vas bomo o dobavljivosti</span>
              ) : (
                  <span className="flex items-center gap-1"><Check size={12} /> Na zalogi v vrtnariji</span>
              )}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};


// --- PRODUCT CARD COMPONENT ---
const ProductCard: React.FC<{ 
  group: ShopProduct[], 
  addToCart: (p: ShopProduct, qty: number) => void,
  onOpenModal: (group: ShopProduct[]) => void
}> = ({ group, addToCart, onOpenModal }) => {
  // Sort variations by price
  const sortedGroup = [...group].sort((a, b) => a.price - b.price);
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct>(sortedGroup[0]);

  const hasVariations = sortedGroup.length > 1;

  const uniqueColors = Array.from(new Set(sortedGroup.map(v => v.color).filter(Boolean)));
  const uniqueSizes = Array.from(new Set(sortedGroup.map(v => v.size).filter(Boolean)));
  const uniqueVariations = Array.from(new Set(sortedGroup.map(v => v.variation).filter(Boolean)));

  const handleColorSelect = (c: string) => {
     const exactMatch = sortedGroup.find(v => v.color === c && v.size === selectedProduct.size && v.variation === selectedProduct.variation);
     if (exactMatch) setSelectedProduct(exactMatch);
     else {
         const firstMatch = sortedGroup.find(v => v.color === c);
         if (firstMatch) setSelectedProduct(firstMatch);
     }
  };

  const handleSizeSelect = (s: string) => {
     const exactMatch = sortedGroup.find(v => v.size === s && v.color === selectedProduct.color && v.variation === selectedProduct.variation);
     if (exactMatch) setSelectedProduct(exactMatch);
     else {
         const firstMatch = sortedGroup.find(v => v.size === s);
         if (firstMatch) setSelectedProduct(firstMatch);
     }
  };

  const handleVariationSelect = (v: string) => {
     const exactMatch = sortedGroup.find(x => x.variation === v && x.color === selectedProduct.color && x.size === selectedProduct.size);
     if (exactMatch) setSelectedProduct(exactMatch);
     else {
         const firstMatch = sortedGroup.find(x => x.variation === v);
         if (firstMatch) setSelectedProduct(firstMatch);
     }
  };

  // Check stock
  const isOutOfStock = typeof selectedProduct.stock === 'number' && selectedProduct.stock <= 0;

  const handleOpenClick = () => {
    onOpenModal(group);
  };

  const handleInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const subject = encodeURIComponent(`Povpraševanje: ${selectedProduct.name}`);
    const variantInfo = selectedProduct.color || selectedProduct.size || selectedProduct.variation || 'Standard';
    const body = encodeURIComponent(
        `Pozdravljeni,\n\nZanima me dobavljivost za izdelek:\n` +
        `Naziv: ${selectedProduct.name}\n` +
        `Različica/Velikost: ${variantInfo}\n` +
        `Cena: ${selectedProduct.price} €\n\n` +
        `Prosim za informacijo, kdaj bo izdelek ponovno na voljo.\n\n` +
        `Lep pozdrav`
    );
    window.location.href = `mailto:vrtnarstvo.korsic@siol.net?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative">
      
      {/* Clickable Area for Modal */}
      <div className="cursor-pointer" onClick={handleOpenClick}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
            {selectedProduct.image_url ? (
            <img 
                src={selectedProduct.image_url} 
                alt={selectedProduct.name} 
                // Removed grayscale, opacity-90
                className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
            />
            ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
                <ShoppingBag size={40} />
            </div>
            )}
            
            {/* Minimal overlay for out of stock, moved to corner so image is visible */}
            {isOutOfStock && (
                <div className="absolute top-3 left-3 bg-red-500/90 text-white px-2 py-1 rounded-md text-[10px] font-bold shadow-sm z-20">
                    NI ZALOGE
                </div>
            )}
            
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center z-10">
                <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-nature-900 font-bold text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg flex items-center gap-2">
                    <Info size={16} /> Poglej podrobnosti
                </div>
            </div>

            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-nature-800 shadow-sm pointer-events-none z-20">
            {selectedProduct.category}
            </div>
        </div>
      
        <div className="p-5 pb-0">
            <h3 className="font-serif font-bold text-xl mb-2 transition-colors text-gray-900 group-hover:text-nature-600">
            {selectedProduct.name}
            </h3>
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
            {selectedProduct.description}
            </p>
        </div>
      </div>

      <div className="px-5 pb-5 flex flex-col flex-1">
        {/* Variation Selector (Mini) */}
        {hasVariations && (
          <div className="mb-4 mt-auto space-y-2">
            {uniqueColors.length > 0 && (
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Barva:</span>
                <div className="flex flex-wrap gap-1.5">
                  {uniqueColors.map(c => (
                    <button
                      key={c as string}
                      onClick={(e) => { e.stopPropagation(); handleColorSelect(c as string); }}
                      className={`px-2 py-1 rounded-md text-xs font-bold border transition-all ${
                        selectedProduct.color === c ? 'bg-nature-50 text-nature-700 border-nature-300' : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
                      }`}
                    >
                      {c as string}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {uniqueSizes.length > 0 && (
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Velikost:</span>
                <div className="flex flex-wrap gap-1.5">
                  {uniqueSizes.map(s => (
                    <button
                      key={s as string}
                      onClick={(e) => { e.stopPropagation(); handleSizeSelect(s as string); }}
                      className={`px-2 py-1 rounded-md text-xs font-bold border transition-all ${
                        selectedProduct.size === s ? 'bg-nature-50 text-nature-700 border-nature-300' : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
                      }`}
                    >
                      {s as string}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {uniqueVariations.length > 0 && (
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Različica:</span>
                <div className="flex flex-wrap gap-1.5">
                  {uniqueVariations.map(v => (
                    <button
                      key={v as string}
                      onClick={(e) => { e.stopPropagation(); handleVariationSelect(v as string); }}
                      className={`px-2 py-1 rounded-md text-xs font-bold border transition-all ${
                        selectedProduct.variation === v ? 'bg-nature-50 text-nature-700 border-nature-300' : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
                      }`}
                    >
                      {v as string}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className={`flex items-center justify-between pt-4 border-t border-gray-50 ${!hasVariations ? 'mt-auto' : ''}`}>
          <div className="flex flex-col">
             <span className="text-xl font-bold text-nature-700">{(selectedProduct.price || 0).toFixed(2)} €</span>
             <span className="text-xs text-gray-400 line-clamp-1">
                 {[selectedProduct.color, selectedProduct.size, selectedProduct.variation].filter(Boolean).join(' - ')}
             </span>
          </div>
          
          {isOutOfStock ? (
             <button 
                onClick={handleInquiry}
                className="bg-gray-100 text-gray-600 p-2.5 rounded-full hover:bg-gray-200 hover:text-gray-900 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 group/btn z-10"
                title="Oddaj zanimanje"
            >
                <Mail size={20} className="group-hover/btn:hidden" />
                <span className="hidden group-hover/btn:inline text-xs font-bold px-1">Zanimanje</span>
            </button>
          ) : (
            <button 
                onClick={(e) => {
                    e.stopPropagation(); // Prevent opening modal
                    addToCart(selectedProduct, 1);
                }}
                className="bg-nature-100 text-nature-700 p-2.5 rounded-full hover:bg-nature-600 hover:text-white transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 group/btn z-10"
                title="Dodaj v košarico"
            >
                <Plus size={20} className="group-hover/btn:hidden" />
                <span className="hidden group-hover/btn:inline text-sm font-bold px-2">Dodaj</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export const ShopPage: React.FC = () => {
  const [productGroups, setProductGroups] = useState<ShopProduct[][]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Vse');
  const [categories, setCategories] = useState<string[]>(['Vse']);
  
  // Modal State
  const [selectedGroupForModal, setSelectedGroupForModal] = useState<ShopProduct[] | null>(null);
  
  const { addToCart, cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice } = useCart();

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  const fetchProducts = async () => {
    let productsData: ShopProduct[] = [];
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) {
        console.error('Error fetching products:', error);
      } else if (data && data.length > 0) {
        // Clean and validate data
        productsData = (data as ShopProduct[])
            .filter(p => p.name && p.price !== null) // Filter out incomplete products
            .map(p => ({
                ...p,
                name: p.name.trim(), // Remove extra spaces
                price: Number(p.price), // Ensure price is a number
                category: p.category ? p.category.trim() : 'Ostalo', // Normalize category names
                color: p.color ? p.color.trim() : undefined
            }));
      }
    } catch (err: any) {
      console.error('Supabase connection error:', err);
    }
      
    // Group products by name
    const groups: Record<string, ShopProduct[]> = {};
    productsData.forEach(p => {
        const key = p.name; 
        if (!groups[key]) groups[key] = [];
        groups[key].push(p);
    });

    setProductGroups(Object.values(groups));

    // Extract unique categories (sorted alphabetically)
    const uniqueCategories = ['Vse', ...Array.from(new Set(productsData.map((p) => p.category))).sort()];
    setCategories(uniqueCategories);
    
    setLoading(false);
  };

  const filteredGroups = productGroups.filter(group => {
    const firstProduct = group[0];
    const matchesSearch = (firstProduct.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                          (firstProduct.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Vse' || firstProduct.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20 font-sans relative">
      
      {/* Product Detail Modal */}
      {selectedGroupForModal && (
          <ProductModal 
            group={selectedGroupForModal} 
            isOpen={!!selectedGroupForModal}
            onClose={() => setSelectedGroupForModal(null)}
            addToCart={addToCart}
          />
      )}

      {/* Shopping Cart Sidebar */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-white shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-nature-900 text-white">
            <div className="flex items-center gap-3">
              <ShoppingBag size={24} />
              <h2 className="text-xl font-serif font-bold">Vaša košarica</h2>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <ShoppingBag size={64} className="mx-auto mb-4 opacity-20" />
                <p>Vaša košarica je prazna.</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 text-nature-600 font-bold hover:underline"
                >
                  Začnite z nakupovanjem
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 relative group">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-white">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 leading-tight">{item.name}</h4>
                      {(item.color || item.size || item.variation) && (
                          <span className="text-xs font-bold text-nature-600 bg-nature-50 px-2 py-0.5 rounded-full inline-block mt-1">
                              {[item.color, item.size, item.variation].filter(Boolean).join(' - ')}
                          </span>
                      )}
                      <p className="text-nature-600 font-medium mt-1">{(item.price || 0).toFixed(2)} €</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-3 bg-white rounded-full border border-gray-200 px-2 py-1 shadow-sm">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-nature-600"><Minus size={14} /></button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-nature-600"><Plus size={14} /></button>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="absolute top-2 right-2 text-gray-300 hover:text-red-500 p-2 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-center mb-6 text-lg">
                <span className="text-gray-600">Skupaj:</span>
                <span className="font-bold text-2xl text-nature-900">{(totalPrice || 0).toFixed(2)} €</span>
              </div>
              <button className="w-full bg-nature-600 text-white py-4 rounded-xl font-bold hover:bg-nature-700 transition-colors shadow-lg shadow-nature-600/20 flex items-center justify-center gap-2">
                Na blagajno <ShoppingCart size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[55] backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12">
            <span className="text-nature-600 font-bold tracking-widest uppercase text-sm mb-2 block">Spletna trgovina</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-nature-900 mb-6">
                Narava na vašem pragu
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Izberite iz naše ponudbe kakovostnih rastlin in dodatkov.
            </p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row gap-6 justify-between items-center">
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedCategory === cat 
                            ? 'bg-nature-600 text-white shadow-md' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-auto">
                <input 
                    type="text" 
                    placeholder="Išči izdelke..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64 pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-nature-500 focus:ring-1 focus:ring-nature-500 bg-gray-50"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
        </div>

        {/* Products Grid */}
        {loading ? (
            <div className="flex justify-center items-center py-20">
                <Loader2 size={40} className="animate-spin text-nature-600" />
            </div>
        ) : filteredGroups.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredGroups.map((group, index) => (
                    <ProductCard 
                        key={group[0].id || index} 
                        group={group} 
                        addToCart={addToCart}
                        onOpenModal={setSelectedGroupForModal}
                    />
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="bg-nature-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag size={32} className="text-nature-400" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Trgovina se polni</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                    Trenutno nalagamo nove izdelke. Prosimo, preverite ponovno kasneje ali nas kontaktirajte za naročilo.
                </p>
            </div>
        )}

      </div>
    </div>
  );
};