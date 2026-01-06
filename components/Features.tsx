import React, { useRef, useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';

export const Features: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger once
        }
      },
      {
        threshold: 0.1, // POPRAVEK: Znižan prag iz 0.5 na 0.1 za boljšo mobilno izkušnjo
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 bg-nature-900 relative overflow-hidden">
      {/* Decorative background elements for depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nature-800 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-nature-950 rounded-full blur-3xl opacity-40 translate-y-1/3 -translate-x-1/4"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Side - Organic Shape */}
          <div className="lg:w-1/2 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Abstract decorative border/ring */}
              <div className="absolute inset-0 border-2 border-nature-700/30 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-[spin_10s_linear_infinite]"></div>
              
              {/* Main Image with Organic Shape */}
              <div className="absolute inset-4 overflow-hidden shadow-2xl shadow-nature-950/50 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] transition-transform hover:scale-[1.02] duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop" 
                  alt="Vrtnarstvo Koršič Rastlinjaki" 
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-nature-900/40 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Text Side - Animated from Right */}
          <div 
            ref={textRef}
            className={`lg:w-1/2 text-white transition-all duration-[2000ms] ease-out transform ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-32'
            }`}
          >
            <h4 className="text-nature-400 font-bold tracking-widest uppercase text-sm mb-4">
              O našem podjetju
            </h4>
            
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">
              Smo majhno družinsko podjetje z več kot <span className="text-nature-400">30-letno tradicijo</span> v svetu vrtnarjenja.
            </h2>

            <div className="space-y-6 text-nature-100/90 text-lg font-light leading-relaxed">
              <p>
                Nahajamo se na čudoviti lokaciji v <strong className="text-white font-normal">Novi Gorici (Ščedne 6)</strong>, z enostavnim dostopom iz Vojkove ulice. V naši vrtnariji ponujamo bogato izbiro sezonskih rastlin, trajnic, dišavnic, okrasnih grmovnic, sobnih rastlin, zelenjave in jagodičevja. Poleg tega vam nudimo vrhunska gnojila, zemlje in lonce, ki bodo poskrbeli za vitalnost vašega vrta.
              </p>
              
              <p>
                Zagotavljamo vam kakovostne rastline, saj večino vzgojimo v naših <strong className="text-white font-normal">lastnih rastlinjakih</strong>. Od leta 1993 gradimo našo tradicijo in ustvarjamo čudovite zelene zgodbe za naše stranke.
              </p>

              <p className="italic text-nature-300 pt-4 font-serif text-xl border-l-2 border-nature-500 pl-4">
                Vabljeni, da nas obiščete in odkrijete pestro ponudbo vrtnarskih radosti pri Vrtnariji Koršič!
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};