import React from 'react';
import { Sprout, ShieldCheck, MapPin, Tag } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      id: 1,
      icon: <Sprout className="w-8 h-8 text-nature-600" />,
      title: "Strokovno svetovanje",
      description: "Izkušnje, ki ustvarjajo rast. Naši strokovnjaki vam pomagajo pri vsakem koraku."
    },
    {
      id: 2,
      icon: <ShieldCheck className="w-8 h-8 text-nature-600" />,
      title: "Dolgoletne izkušnje",
      description: "Tradicija, ki gradi zaupanje. Z vami rastemo in cvetimo že več kot 30 let."
    },
    {
      id: 3,
      icon: <MapPin className="w-8 h-8 text-nature-600" />,
      title: "Dostopna lokacija",
      description: "Enostaven dostop in veliko parkirišče neposredno pred našim vrtnim centrom."
    },
    {
      id: 4,
      icon: <Tag className="w-8 h-8 text-nature-600" />,
      title: "Konkurenčne cene",
      description: "Najboljše cene za najboljšo kakovost. Vrhunske rastline po poštenih cenah."
    }
  ];

  return (
    <section className="py-24 bg-nature-50">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-nature-600 font-bold tracking-widest uppercase text-sm mb-3">
            Lastnosti
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-nature-900">
            Zakaj nas izbrati?
          </h3>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div 
              key={benefit.id} 
              className="group bg-white p-8 rounded-3xl shadow-sm border border-nature-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-6 p-4 bg-nature-50 rounded-2xl group-hover:bg-nature-100 transition-colors duration-300">
                {benefit.icon}
              </div>
              
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h4>
              
              <p className="text-gray-500 leading-relaxed text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};