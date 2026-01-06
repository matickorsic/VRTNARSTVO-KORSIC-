import React, { useEffect, useState, useRef } from 'react';
import { Mountain, Eye, Sparkles, MapPin, Phone, Mail } from 'lucide-react';

type TabType = 'poslanstvo' | 'vizija' | 'vrednote';

export const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('vizija');
  const [isTextVisible, setIsTextVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Intersection Observer for Text
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTextVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 } // Zvišan prag na 40%
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white min-h-screen pt-32 font-sans">
      
      {/* Intro Section: Kdo smo mi */}
      <div className="container mx-auto px-4 md:px-6 mb-20">
        <div className="text-center mb-12">
          <span className="text-nature-600 font-bold tracking-widest uppercase text-sm mb-2 block">O našem podjetju</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-nature-900 mb-6 leading-tight">
            Družinska tradicija, prepletena z ljubeznijo do narave
          </h1>
          <div className="w-24 h-1 bg-nature-400 mx-auto rounded-full"></div>
        </div>

        <div 
          ref={textRef}
          className={`max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed text-center space-y-6 transition-all duration-[2000ms] ease-out transform ${
            isTextVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-32'
          }`}
        >
          <p>
            Smo majhno družinsko podjetje z več kot 30-letno tradicijo v svetu vrtnarjenja. Nahajamo se na čudoviti lokaciji v Novi Gorici (Ščedne 6), z enostavnim dostopom iz Vojkove ulice.
          </p>
          <p>
             V naši vrtnariji ponujamo bogato izbiro sezonskih rastlin, trajnic, dišavnic, okrasnih grmovnic, sobnih rastlin, zelenjave in jagodičevja. Poleg tega vam nudimo vrhunska gnojila, zemlje in lonce, ki bodo poskrbeli za vitalnost vašega vrta.
          </p>
          <p>
             Zagotavljamo vam kakovostne rastline, saj večino vzgojimo v naših 4000 kvadratnih metrov velikih rastlinjakih. Od leta 1993 gradimo našo tradicijo in ustvarjamo čudovite zelene zgodbe za naše stranke. Vabljeni, da nas obiščete in odkrijete pestro ponudbo vrtnarskih radosti pri Vrtnariji Koršič!
          </p>
        </div>
      </div>

      {/* Tabs Section: Poslanstvo, Vizija, Vrednote */}
      <div className="bg-nature-50/50 py-16 mb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-nature-100">
            
            {/* Tab Headers */}
            <div className="flex border-b border-gray-100">
              <button 
                onClick={() => setActiveTab('poslanstvo')}
                className={`flex-1 py-8 flex flex-col items-center gap-3 transition-all duration-300 ${activeTab === 'poslanstvo' ? 'bg-white text-nature-700' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
              >
                <Mountain size={32} className={activeTab === 'poslanstvo' ? 'text-nature-600' : 'text-gray-400'} />
                <span className={`font-serif font-bold text-lg ${activeTab === 'poslanstvo' ? 'text-nature-900' : ''}`}>Poslanstvo</span>
                {activeTab === 'poslanstvo' && <div className="h-1 w-12 bg-nature-500 rounded-full mt-2"></div>}
              </button>

              <button 
                onClick={() => setActiveTab('vizija')}
                className={`flex-1 py-8 flex flex-col items-center gap-3 transition-all duration-300 border-l border-r border-gray-100 ${activeTab === 'vizija' ? 'bg-white text-nature-700' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
              >
                <Eye size={32} className={activeTab === 'vizija' ? 'text-nature-600' : 'text-gray-400'} />
                <span className={`font-serif font-bold text-lg ${activeTab === 'vizija' ? 'text-nature-900' : ''}`}>Vizija</span>
                {activeTab === 'vizija' && <div className="h-1 w-12 bg-nature-500 rounded-full mt-2"></div>}
              </button>

              <button 
                onClick={() => setActiveTab('vrednote')}
                className={`flex-1 py-8 flex flex-col items-center gap-3 transition-all duration-300 ${activeTab === 'vrednote' ? 'bg-white text-nature-700' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
              >
                <Sparkles size={32} className={activeTab === 'vrednote' ? 'text-nature-600' : 'text-gray-400'} />
                <span className={`font-serif font-bold text-lg ${activeTab === 'vrednote' ? 'text-nature-900' : ''}`}>Vrednote</span>
                {activeTab === 'vrednote' && <div className="h-1 w-12 bg-nature-500 rounded-full mt-2"></div>}
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-10 md:p-14 min-h-[250px] flex items-center justify-center text-center">
              {activeTab === 'poslanstvo' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Naše poslanstvo je pomagati vam ustvariti in ohraniti čudovite zelene oaze okoli vašega doma. 
                    Naša ekipa strokovnjakov vam z znanjem in izkušnjami svetuje pri izbiri najboljših rastlin ter vam pomaga pri skrbi za vaš vrt.
                  </p>
                </div>
              )}

              {activeTab === 'vizija' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Naša vizija je postati vodilni ponudnik kakovostnih rastlin ter trajnostnih rešitev za zeleno okolje. 
                    Želimo navdihovati ljudi, da z našimi rastlinami ustvarjajo prijetne in harmonične zelene prostore, ki prispevajo k boljšemu počutju in trajnostnemu življenju.
                  </p>
                </div>
              )}

              {activeTab === 'vrednote' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Naše vrednote temeljijo na kakovosti, strokovnosti in trajnostnem razvoju. Zavezani smo skrbnemu ravnanju z naravo, odgovornemu pristopu do strank ter nenehnemu izboljševanju naših izdelkov in storitev. 
                    Verjamemo, da lahko z ljubeznijo do rastlin in narave prispevamo k lepšemu in bolj zelenemu svetu.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Map Section - Kje se nahajamo */}
      <div className="relative">
        <div className="container mx-auto px-4 md:px-6 mb-8">
           <h2 className="text-3xl md:text-5xl font-serif font-bold text-nature-300 uppercase tracking-wide">
             Kje se nahajamo ?
           </h2>
        </div>
        
        <div className="w-full h-[500px] relative">
          {/* Google Maps Iframe 
              Using specific CID for Vrtnarstvo Korsic to ensure Pin Drop.
              Removed grayscale filter for better visibility.
          */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2786.177242813583!2d13.65364831556637!3d45.95555317911006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477b00ae0a000001%3A0x6c6e76878d650000!2sVrtnarstvo%20Kor%C5%A1i%C4%8D!5e0!3m2!1ssl!2ssi!4v1709650000000!5m2!1ssl!2ssi"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokacija Vrtnarstvo Koršič"
          ></iframe>

          {/* Floating Info Card */}
          <div className="absolute top-1/2 left-4 md:left-20 transform -translate-y-1/2 bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-sm border-l-4 border-nature-500">
             <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Vrtnarstvo Koršič</h3>
             <p className="text-nature-600 font-medium mb-6">Metod Koršič</p>
             
             <div className="space-y-4">
               <div className="flex items-start gap-3">
                 <div className="bg-nature-100 p-2 rounded-full text-nature-600">
                    <MapPin size={20} />
                 </div>
                 <div>
                   <p className="font-bold text-gray-800">Naslov</p>
                   <p className="text-gray-600">Ščedne 6, 5000 Nova Gorica</p>
                 </div>
               </div>

               <div className="flex items-start gap-3">
                 <div className="bg-nature-100 p-2 rounded-full text-nature-600">
                    <Phone size={20} />
                 </div>
                 <div>
                   <p className="font-bold text-gray-800">Telefon</p>
                   <p className="text-gray-600">+386 53 006 059</p>
                 </div>
               </div>
               
               <div className="mt-6 pt-6 border-t border-gray-200">
                  <a 
                    href="https://www.google.com/maps/dir//Vrtnarstvo+Koršič+Ščedne+6+5000+Nova+Gorica" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-nature-600 text-white py-3 rounded-xl hover:bg-nature-700 transition-colors font-medium shadow-lg shadow-nature-600/20"
                  >
                    Navodila za pot
                  </a>
               </div>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
};