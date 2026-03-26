import React, { useEffect, useRef, useState } from 'react';
import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Enoletnice",
    category: "Sezonsko",
    image: "/images/optimized/IMG_2722_t9sls6.jpg", 
    imagePosition: "object-[center_55%]",
    description: "Bogata izbira sezonskega cvetja. Nudimo širok nabor visečih in pokončnih rastlin, primernih za sončne, senčne in polsenčne lege.",
    galleryImages: [
      "/images/optimized/IMG_2771_lu0qws.jpg",
      "/images/optimized/IMG_2807_gw3os5.jpg",
      "/images/optimized/IMG_2794_kmqzwv.jpg",
      "/images/optimized/IMG_2790_qxrmuo.jpg",
      "/images/optimized/IMG_2786_e9qhjh.jpg",
      "/images/optimized/IMG_2781_mxnb7c.jpg",
      "/images/optimized/IMG_2784_stj5jv.jpg",
      "/images/optimized/IMG_2783_wwmtwu.jpg",
      "/images/optimized/IMG_2779_y8lauw.jpg",
      "/images/optimized/IMG_2774_lnwvwy.jpg",
      "/images/optimized/IMG_2768_l1aiag.jpg",
      "/images/optimized/IMG_2766_vbcevs.jpg",
      "/images/optimized/IMG_1247_voyanb.jpg",
      "/images/optimized/IMG_1252_iyvolx.jpg",
      "/images/optimized/IMG_1248_wmjuf8.jpg",
      "/images/optimized/IMG_1239_zrhemf.jpg",
      "/images/optimized/IMG_1243_mtltv9.jpg",
      "/images/optimized/IMG_1237_xc05jf.jpg",
      "/images/optimized/IMG_1236_r6m95u.jpg",
      "/images/optimized/IMG_1235_gugf9z.jpg",
      "/images/optimized/IMG_1233_wmnlck.jpg",
      "/images/optimized/IMG_1234_r8yprf.jpg",
      "/images/optimized/IMG_1202_u5nahm.jpg",
      "/images/optimized/IMG_1231_dixamy.jpg",
      "/images/optimized/IMG_1085_w4whu1.jpg",
      "/images/optimized/IMG_1084_dmtlfw.jpg",
      "/images/optimized/IMG_1082_cju9wm.jpg",
      "/images/optimized/IMG_1079_ve3ebd.jpg",
      "/images/optimized/IMG_1065_ofgnh1.jpg",
      "/images/optimized/IMG_1078_avrtlc.jpg",
      "/images/optimized/IMG_0846_nxdf2v.jpg",
      "/images/optimized/IMG_1083_xkqayk.jpg",
      "/images/optimized/IMG_0855_qg7d9l.jpg"
    ]
  },
  {
    id: 2,
    name: "Trajnice",
    category: "Vrt",
    image: "/images/optimized/IMG_1087_tmn91g.jpg", 
    imagePosition: "object-[center_45%]",
    description: "Trpežne rastline, ki se vračajo vsako leto. Pri nas najdete vse od okrasnih trav, cvetočih in plezajočih trajnic, pa vse do različnih zelišč.",
    galleryImages: [
      "/images/optimized/IMG_1087_tghz6r.jpg",
      "/images/optimized/IMG_1222_z2ojgm.jpg",
      "/images/optimized/IMG_F7181367-3D2E-43E8-8741-A181BBE854A7_htp9nd.jpg",
      "/images/optimized/IMG_1214_ct2vky.jpg",
      "/images/optimized/IMG_2816_ayfuwf.jpg",
      "/images/optimized/IMG_0842_avsrkw.jpg",
      "/images/optimized/IMG_2764_hkbpfy.jpg",
      "/images/optimized/IMG_1216_sadgnd.jpg",
      "/images/optimized/IMG_1247_v5pbgv.jpg",
      "/images/optimized/IMG_0854_obyj0u.jpg",
      "/images/optimized/IMG_1217_t9rswu.jpg",
      "/images/optimized/IMG_2793_hkee1w.jpg",
      "/images/optimized/IMG_1210_uoupdg.jpg",
      "/images/optimized/IMG_2806_ycrhnc.jpg",
      "/images/optimized/IMG_1078_er1gac.jpg",
      "/images/optimized/IMG_0849_jos1ov.jpg",
      "/images/optimized/IMG_1208_thseqm.jpg",
      "/images/optimized/IMG_2768_zwgxv9.jpg",
      "/images/optimized/IMG_1243_wrfbgf.jpg",
      "/images/optimized/IMG_1081_n0xcf5.jpg",
      "/images/optimized/IMG_1212_ge47vn.jpg",
      "/images/optimized/IMG_1218_jmug4t.jpg",
      "/images/optimized/IMG_2817_arj5a8.jpg",
      "/images/optimized/IMG_0844_rutxdv.jpg",
      "/images/optimized/IMG_0848_pxngwk.jpg",
      "/images/optimized/IMG_1075_equerw.jpg",
      "/images/optimized/IMG_1077_sbyfph.jpg",
      "/images/optimized/IMG_2767_dxnyey.jpg",
      "/images/optimized/IMG_0845_ptl4nw.jpg",
      "/images/optimized/IMG_1089_hwehjx.jpg",
      "/images/optimized/IMG_1225_t8xg5b.jpg",
      "/images/optimized/IMG_1211_hrjkao.jpg",
      "/images/optimized/IMG_1088_z8cra4.jpg",
      "/images/optimized/IMG_0858_gefybg.jpg",
      "/images/optimized/IMG_2817_woie9u.jpg",
      "/images/optimized/IMG_1240_t1cc9h.jpg",
      "/images/optimized/IMG_2C2E2A80-21F2-4A1D-8371-42B29DAD1008_ghrkcs.jpg",
      "/images/optimized/IMG_1207_kyjeyb.jpg"
    ]
  },
  {
    id: 3,
    name: "Sobne rastline",
    category: "Dom",
    image: "/images/optimized/sobne-rastline_hnkotl.jpg", 
    description: "Ustvarite zeleno oazo v svojem domu. Pestra izbira listnatih in cvetočih sobnih rastlin, kaktusov ter sukulent."
  },
  {
    id: 4,
    name: "Grmičevje",
    category: "Urejanje",
    image: "/images/optimized/IMG_4446_hqpmkw.jpg", 
    imagePosition: "object-[center_45%]",
    description: "Okrasno grmičevje za vsak vrt. Nudimo pestro izbiro sadik za oblikovanje živih mej ter raznolike samostojne okrasne grme.",
    galleryImages: [
      {
        url: "/images/optimized/IMG_7066_ewpawo.jpg",
        title: "Forsythia intermedia 'Weekend'",
        description: "Listopaden grm z zelo zgodnjim in obilnim rumenim cvetenjem, ki polepša vrt še pred olistanjem."
      },
      {
        url: "/images/optimized/IMG_7068_beh30q.jpg",
        title: "Juniperus horizontalis 'Wiltonii'",
        description: "Nizek plazeč zimzelen iglavec srebrno-modre barve, odličen za pokrivanje tal, brežin in skalnjakov."
      },
      {
        url: "/images/optimized/IMG_7070_ip3xai.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/hydrangea-paniculata-vanille-fraise-R---Renhy-.jpg"],
        title: "Hydrangea paniculata 'Vanille Fraise'",
        description: "Dekorativna hortenzija s piramidalnimi socvetji, ki iz kremno bele postopoma prehajajo v rožnate tone."
      },
      {
        url: "/images/optimized/IMG_7067_y4dgpf.jpg",
        title: "Kalistemon Laevis",
        description: "Zimzeleni grm z značilnimi rdečimi cvetovi v obliki valjastih klasov, znan tudi kot čistilec steklenic."
      },
      {
        url: "/images/optimized/IMG_7069_i20fe0.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/berberis-th.-harlequin.jpg-+-piccola.jpg"],
        title: "Berberis Thunbergii Harlequin",
        description: "Listopaden grm z bordo rdečimi in belo pisanimi listi, primeren za gredice, skalnjake in samostojne zasaditve."
      },
      {
        url: "/images/optimized/IMG_7071_m1yrje.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/buddleja-davidii-pink-dettaglio-000236.jpg"],
        title: "Buddleja Davidii Pink Delight",
        description: "Metuljnik z dolgim poletnim cvetenjem in prijetnim vonjem, ki privablja metulje in druge opraševalce."
      },
      {
        url: "/images/optimized/IMG_7074_vdivon.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/juniperus-hor-blue-chip.jpg-+-piccola.jpg"],
        title: "Juniperus horizontalis Blue Chip",
        description: "Zimzelen plazeč iglavec intenzivne srebrno-modre barve za skalnjake, sadilnike in pokrivanje tal."
      },
      {
        url: "/images/optimized/IMG_7072_cifyoj.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/azalea-769531-1920.jpg"],
        title: "Azaleja Encore Sweetheart",
        description: "Kompaktna zimzelena azaleja z večkratnim cvetenjem v bogato rožnatih tonih skozi sezono."
      },
      {
        url: "/images/optimized/IMG_7073_w6wqha.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/juniperus-procubens-nana-dettaglio-015186.jpg"],
        title: "Juniperus Procubens Nana",
        description: "Počasi rastoč plazeč iglavec s sivkasto-zelenim listjem, zelo primeren za skalnjake in nizke zasaditve."
      },
      {
        url: "/images/optimized/IMG_7075_m17psj.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/nerium-oleander.jpg"],
        title: "Nerium Oleander",
        description: "Klasični oleander z dolgim cvetenjem in bujno rastjo, primeren za sončne lege in večje posode."
      },
      {
        url: "/images/optimized/IMG_7076_chpvbw.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/loropetalum-chinensis-black-dettaglio-000741.jpg"],
        title: "Loropetalum Chinensis Black Pearl",
        description: "Zimzelen grm s temno rdečim skoraj črnim listjem in vijoličnimi cvetovi, ki močno izstopa v zasaditvah."
      },
      {
        url: "/images/optimized/IMG_7077_gitdob.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/nandina-domestica-blush-pink-R---Aka-.jpg"],
        title: "Nandina Domestica Roza Blush",
        description: "Dekorativna nandina z rožnatimi mladimi listi, ki kasneje zelenijo in jeseni znova zažarijo v rdečih odtenkih."
      },
      {
        url: "/images/optimized/IMG_7083_nibscl.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/Berberis-Frikartii-Amstelveen--dettaglio-V19-000203.jpg"],
        title: "Berberis Frikartii Amstelveen",
        description: "Gosto razvejan zimzelen češmin s temno zelenimi listi in rumenim spomladanskim cvetenjem."
      },
      {
        url: "/images/optimized/IMG_7078_pswymx.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/cornus-alba-sibirica-dettaglio-000356.jpg"],
        title: "Cornus Alba Sibirica Variegata",
        description: "Listopaden kornus z belo obrobljenimi listi in izrazitimi rdečimi poganjki, ki pridejo do izraza tudi pozimi."
      },
      {
        url: "/images/optimized/IMG_7080_mxg6i8.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/ilex-altaclarensis-golden-dettaglio-000550.jpg"],
        title: "Ilex Altaclarensis Golden King",
        description: "Zimzelena bodika s sijočimi zelenimi listi in rumenim robom, odlična za poudarke v vrtu."
      },
      {
        url: "/images/optimized/IMG_7079_bkbzjq.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/viburnum-opulus-roseum-det.jpg"],
        title: "Viburnum Opulus Roseum",
        description: "Okrasna snežna kepa z velikimi belimi cvetnimi kroglami in močno sezonsko prisotnostjo v vrtu."
      },
      {
        url: "/images/optimized/IMG_7081_wcihtj.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/osmanthus-goshiki.jpg"],
        title: "Osmanthus Heterophyllus Goshiki",
        description: "Kompakten zimzelen osmantus s pisanimi listi v zelenih, kremnih, rožnatih in oranžnih tonih."
      },
      {
        url: "/images/optimized/IMG_7082_j41r4r.jpg",
        title: "Euonymus Fortunei Emerald'n Gold",
        description: "Nizek zimzelen grm za pokrivanje tal ali robne zasaditve, z listi v zelenih in zlatih odtenkih."
      },
      {
        url: "/images/optimized/IMG_7093_ohvxva.jpg",
        additionalUrls: [
          "https://www.bessicapiante.it/pics/catalogo/juniperus-squamata-blue-dettaglio-015188.jpg",
          "https://www.bessicapiante.it/pics/catalogo/juniperus-procubens-nana_3.jpg-+-piccola_3.jpg"
        ],
        title: "Juniperus Squamata Blue Star",
        description: "Počasi rastoč modrikast iglavec, zelo priljubljen za skalnjake, gredice in nižje poudarke."
      },
      {
        url: "/images/optimized/IMG_7092_xdw9ao.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/photinia-fraseri-red-dettaglio.jpg"],
        title: "Photinia Fraseri Red Robin",
        description: "Hitro rastoča zimzelena fotinija z izrazito rdečimi mladimi poganjki, idealna za žive meje."
      },
      {
        url: "/images/optimized/IMG_7096_ait94q.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/eucalyptus-gunni-azura-det.jpg"],
        title: "Evkaliptus Gunnii",
        description: "Dekorativen evkaliptus s srebrno-turkiznimi listi in lepo kompaktno rastjo za sončne lege."
      },
      {
        url: "/images/optimized/IMG_7091_esdmpg.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/013916-dettaglio.jpg"],
        title: "Japonska aukuba Crotonifolia",
        description: "Zimzelen grm z bleščečimi zelenimi listi z rumenimi pegami, primeren tudi za senčnejše lege."
      }
    ]
  },
  {
    id: 5,
    name: "Gnojila in Substrati",
    category: "Nega & Rast",
    image: "/images/optimized/IMG_2825_dyd926.jpg",
    imagePosition: "object-[center_60%]",
    description: "Vse za zdravo rast. Visokokakovostni substrati Triplo in profesionalna gnojila Venagro za optimalno vitalnost vaših rastlin."
  },
  {
    id: 6,
    name: "Okrasni lonci",
    category: "Dodatki",
    image: "/images/optimized/IMG_2824_vazlyr.jpg",
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
                    loading="lazy"
                    decoding="async"
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



