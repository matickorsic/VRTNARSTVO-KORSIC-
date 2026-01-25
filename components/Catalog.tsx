import React, { useEffect, useRef, useState } from 'react';
import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Enoletnice",
    category: "Sezonsko",
    image: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769286530/IMG_2722_t9sls6.jpg", 
    imagePosition: "object-[center_55%]",
    description: "Bogata izbira sezonskega cvetja. Nudimo širok nabor visečih in pokončnih rastlin, primernih za sončne, senčne in polsenčne lege.",
    galleryImages: [
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292331/IMG_2771_lu0qws.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292351/IMG_2807_gw3os5.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292350/IMG_2794_kmqzwv.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292350/IMG_2790_qxrmuo.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292348/IMG_2786_e9qhjh.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292344/IMG_2781_mxnb7c.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292339/IMG_2784_stj5jv.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292338/IMG_2783_wwmtwu.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292337/IMG_2779_y8lauw.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292336/IMG_2774_lnwvwy.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292330/IMG_2768_l1aiag.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292327/IMG_2766_vbcevs.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292324/IMG_1247_voyanb.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292322/IMG_1252_iyvolx.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292322/IMG_1248_wmjuf8.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292321/IMG_1239_zrhemf.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292319/IMG_1243_mtltv9.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292319/IMG_1237_xc05jf.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292314/IMG_1236_r6m95u.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292313/IMG_1235_gugf9z.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292310/IMG_1233_wmnlck.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292308/IMG_1234_r8yprf.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292306/IMG_1202_u5nahm.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292306/IMG_1231_dixamy.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292306/IMG_1085_w4whu1.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292299/IMG_1084_dmtlfw.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292299/IMG_1082_cju9wm.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292296/IMG_1079_ve3ebd.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292295/IMG_1065_ofgnh1.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292295/IMG_1078_avrtlc.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292294/IMG_0846_nxdf2v.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292293/IMG_1083_xkqayk.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292287/IMG_0855_qg7d9l.jpg"
    ]
  },
  {
    id: 2,
    name: "Trajnice",
    category: "Vrt",
    image: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769287431/IMG_1087_tmn91g.jpg", 
    imagePosition: "object-[center_45%]",
    description: "Trpežne rastline, ki se vračajo vsako leto. Pri nas najdete vse od okrasnih trav, cvetočih in plezajočih trajnic, pa vse do različnih zelišč.",
    galleryImages: [
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365280/IMG_1087_tghz6r.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365335/IMG_1222_z2ojgm.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365343/IMG_F7181367-3D2E-43E8-8741-A181BBE854A7_htp9nd.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365305/IMG_1214_ct2vky.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365373/IMG_2816_ayfuwf.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365293/IMG_0842_avsrkw.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365366/IMG_2764_hkbpfy.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365319/IMG_1216_sadgnd.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365351/IMG_1247_v5pbgv.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365280/IMG_0854_obyj0u.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365324/IMG_1217_t9rswu.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365371/IMG_2793_hkee1w.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365300/IMG_1210_uoupdg.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365365/IMG_2806_ycrhnc.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365344/IMG_1078_er1gac.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365322/IMG_0849_jos1ov.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365289/IMG_1208_thseqm.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365365/IMG_2768_zwgxv9.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365349/IMG_1243_wrfbgf.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365273/IMG_1081_n0xcf5.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365305/IMG_1212_ge47vn.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365333/IMG_1218_jmug4t.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365375/IMG_2817_arj5a8.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365313/IMG_0844_rutxdv.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365325/IMG_0848_pxngwk.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365338/IMG_1075_equerw.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365280/IMG_1077_sbyfph.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365366/IMG_2767_dxnyey.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365329/IMG_0845_ptl4nw.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365286/IMG_1089_hwehjx.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365344/IMG_1225_t8xg5b.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365300/IMG_1211_hrjkao.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365290/IMG_1088_z8cra4.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365313/IMG_0858_gefybg.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292367/IMG_2817_woie9u.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365351/IMG_1240_t1cc9h.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365334/IMG_2C2E2A80-21F2-4A1D-8371-42B29DAD1008_ghrkcs.jpg",
      "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365289/IMG_1207_kyjeyb.jpg"
    ]
  },
  {
    id: 3,
    name: "Sobne rastline",
    category: "Dom",
    image: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769287489/sobne-rastline_hnkotl.jpg", 
    description: "Ustvarite zeleno oazo v svojem domu. Pestra izbira listnatih in cvetočih sobnih rastlin, kaktusov ter sukulent."
  },
  {
    id: 4,
    name: "Grmičevje",
    category: "Urejanje",
    image: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769288298/IMG_4446_hqpmkw.jpg", 
    imagePosition: "object-[center_45%]",
    description: "Okrasno grmičevje za vsak vrt. Nudimo pestro izbiro sadik za oblikovanje živih mej ter raznolike samostojne okrasne grme."
  },
  {
    id: 5,
    name: "Gnojila in Substrati",
    category: "Nega & Rast",
    image: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769290355/IMG_2825_dyd926.jpg",
    imagePosition: "object-[center_60%]",
    description: "Vse za zdravo rast. Visokokakovostni substrati Triplo in profesionalna gnojila Venagro za optimalno vitalnost vaših rastlin."
  },
  {
    id: 6,
    name: "Okrasni lonci",
    category: "Dodatki",
    image: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769288878/IMG_2824_vazlyr.jpg",
    imagePosition: "object-[center_85%]",
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
    const baseClass = "transition-all duration-[1500ms] ease-out";
    
    if (isVisible) {
      return `${baseClass} opacity-100 translate-x-0 translate-y-0`;
    }

    const mobileHidden = "opacity-0 translate-y-20";
    
    let desktopHidden = "";
    if (index % 3 === 0) desktopHidden = "md:-translate-x-24 md:translate-y-0"; 
    else if (index % 3 === 1) desktopHidden = "md:translate-y-24 md:translate-x-0"; 
    else desktopHidden = "md:translate-x-24 md:translate-y-0"; 

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
              style={{ transitionDelay: `${index * 250}ms` }} 
            >
              <div className="relative h-64 overflow-hidden">
                {item.video ? (
                  <video 
                    src={item.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${item.imagePosition || 'object-center'}`}
                  />
                )}
                
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