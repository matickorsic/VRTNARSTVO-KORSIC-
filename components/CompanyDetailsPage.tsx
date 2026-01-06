import React, { useEffect } from 'react';
import { Building2, MapPin, FileText, Phone, Mail, ShieldCheck } from 'lucide-react';

export const CompanyDetailsPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
            <span className="text-nature-600 font-bold tracking-widest uppercase text-sm mb-2 block">Pravno obvestilo</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-nature-900 mb-6">
                Podatki o podjetju
            </h1>
            <div className="w-24 h-1 bg-nature-400 mx-auto rounded-full"></div>
            </div>

            <div className="bg-nature-50 rounded-3xl p-8 md:p-12 border border-nature-100 shadow-sm">
                
                {/* Main Company Name */}
                <div className="flex items-start gap-4 mb-8 pb-8 border-b border-nature-200">
                    <div className="p-3 bg-white rounded-full text-nature-700 shadow-sm shrink-0">
                        <Building2 size={24} />
                    </div>
                    <div>
                        <h2 className="text-xs font-bold text-nature-600 uppercase tracking-wider mb-1">Polno ime podjetja</h2>
                        <p className="text-xl md:text-2xl font-serif font-bold text-gray-900 leading-snug">
                            METOD KORŠIČ - NOSILEC DOPOLNILNE DEJAVNOSTI NA KMETIJI
                        </p>
                        <p className="text-gray-600 mt-1">VRTNARSTVO KORŠIČ</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Location */}
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-white rounded-full text-nature-600 shadow-sm shrink-0">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Sedež podjetja</h3>
                            <p className="text-gray-900 font-medium">Ščedne 6</p>
                            <p className="text-gray-900 font-medium">5000 Nova Gorica</p>
                            <p className="text-gray-500 text-sm">Slovenija</p>
                        </div>
                    </div>

                    {/* Registration */}
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-white rounded-full text-nature-600 shadow-sm shrink-0">
                            <FileText size={20} />
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Registracija</h3>
                            <div className="space-y-1">
                                <p className="text-gray-900">
                                    <span className="text-gray-500 text-sm mr-2">Matična številka:</span>
                                    <span className="font-mono font-medium">2872331000</span>
                                </p>
                                <p className="text-gray-900">
                                    <span className="text-gray-500 text-sm mr-2">Davčna številka:</span>
                                    <span className="font-mono font-medium">SI69488576</span>
                                </p>
                                <div className="inline-flex items-center gap-1 text-xs text-nature-700 bg-nature-100 px-2 py-1 rounded mt-1">
                                    <ShieldCheck size={12} />
                                    Zavezanec za DDV
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="flex items-start gap-4 md:col-span-2 pt-6 border-t border-nature-200">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-full text-nature-600 shadow-sm">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Telefon</h3>
                                    <a href="tel:+38653006059" className="text-nature-700 hover:underline font-medium">+386 53 006 059</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-full text-nature-600 shadow-sm">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">E-pošta</h3>
                                    <a href="mailto:matic.korsic@vrtnarstvokorsic.si" className="text-nature-700 hover:underline font-medium">matic.korsic@vrtnarstvokorsic.si</a>
                                </div>
                            </div>
                         </div>
                    </div>

                </div>
            </div>

            <p className="text-center text-gray-400 text-sm mt-12">
                Podatki so informativne narave in so usklajeni z javno dostopnimi evidencami (AJPES).
            </p>

        </div>
      </div>
    </div>
  );
};