import React, { useEffect } from 'react';
import { Cookie, Shield, Info, Settings, Clock, Share2, UserCheck, RefreshCw, CheckCircle } from 'lucide-react';

export const CookiesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <span className="text-nature-600 font-bold tracking-widest uppercase text-sm mb-2 block">Pravni dokumenti</span>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-nature-900 mb-6">
                    Politika piškotkov
                </h1>
                <div className="w-24 h-1 bg-nature-400 mx-auto rounded-full"></div>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 border border-nature-100 shadow-sm prose prose-nature max-w-none text-gray-600">
                
                {/* Section 1: What are cookies */}
                <div className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                        <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">1</span>
                        Kaj so piškotki
                    </h2>
                    <div className="bg-nature-50 p-6 rounded-2xl border border-nature-100 flex gap-4 items-start">
                        <Cookie className="text-nature-600 shrink-0 mt-1" size={24} />
                        <div>
                            <p className="mb-2 font-medium text-gray-900">
                                Piškotki so majhne besedilne datoteke, ki jih spletna stran shrani v uporabnikov brskalnik ob obisku spletne strani.
                            </p>
                            <p className="text-sm">
                                Omogočajo pravilno delovanje spletne strani, izboljšujejo uporabniško izkušnjo ter omogočajo analizo obiska.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Controller */}
                <div className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                        <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">2</span>
                        Upravljavec piškotkov
                    </h2>
                    <p className="mb-4">
                        Upravljavec spletne strani in piškotkov je:
                    </p>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 items-start">
                        <div className="p-3 bg-nature-50 rounded-full text-nature-600 shadow-sm shrink-0">
                            <Shield size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-lg mb-1">Metod Koršič – nosilec dopolnilne dejavnosti na kmetiji</p>
                            <p>Ščedne 6, 5000 Nova Gorica, Slovenija</p>
                            <div className="mt-2 text-sm space-y-1 text-gray-600">
                                <p><strong>Davčna številka:</strong> SI69488576 (zavezanec za DDV)</p>
                                <p><strong>Matična številka:</strong> 2872331000</p>
                                <p><strong>E-pošta:</strong> <a href="mailto:vrtnarstvo.korsic@siol.net" className="text-nature-600 hover:underline">vrtnarstvo.korsic@siol.net</a></p>
                                <p><strong>Telefon:</strong> +386 53 006 059</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3: Types of cookies */}
                <div className="mb-12">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-6 flex items-center gap-2">
                        <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">3</span>
                        Vrste piškotkov, ki jih uporabljamo
                    </h2>
                    
                    <div className="space-y-6">
                        {/* 3.1 Essential */}
                        <div className="border border-green-100 rounded-xl overflow-hidden">
                            <div className="bg-green-50 px-6 py-4 border-b border-green-100 flex items-center gap-2">
                                <CheckCircle size={20} className="text-green-600" />
                                <h3 className="font-bold text-green-800 m-0 text-lg">3.1 Nujno potrebni piškotki</h3>
                            </div>
                            <div className="p-6 bg-white">
                                <p className="mb-3 text-gray-700">Ti piškotki so nujni za delovanje spletne strani in ne zahtevajo privolitve uporabnika.</p>
                                <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                                    <strong>Primeri:</strong> omogočanje pravilnega delovanja strani, shranjevanje nastavitev soglasja za piškotke.
                                </div>
                            </div>
                        </div>

                        {/* 3.2 Analytics */}
                        <div className="border border-blue-100 rounded-xl overflow-hidden">
                            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex items-center gap-2">
                                <Info size={20} className="text-blue-600" />
                                <h3 className="font-bold text-blue-800 m-0 text-lg">3.2 Analitični piškotki</h3>
                            </div>
                            <div className="p-6 bg-white">
                                <p className="mb-3 text-gray-700">Analitični piškotki omogočajo zbiranje anonimnih podatkov o uporabi spletne strani (npr. število obiskov, obiskane strani). Ti piškotki se namestijo samo na podlagi uporabnikove privolitve.</p>
                                <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                                    <strong>Primer:</strong> Google Analytics
                                </div>
                            </div>
                        </div>

                        {/* 3.3 Marketing */}
                        <div className="border border-purple-100 rounded-xl overflow-hidden">
                            <div className="bg-purple-50 px-6 py-4 border-b border-purple-100 flex items-center gap-2">
                                <Share2 size={20} className="text-purple-600" />
                                <h3 className="font-bold text-purple-800 m-0 text-lg">3.3 Marketinški piškotki</h3>
                            </div>
                            <div className="p-6 bg-white">
                                <p className="mb-3 text-gray-700">Marketinški piškotki se uporabljajo za prikaz prilagojenih oglasov in merjenje učinkovitosti oglaševanja. Ti piškotki se namestijo samo na podlagi uporabnikove izrecne privolitve.</p>
                                <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                                    <strong>Primer:</strong> Meta (Facebook) Pixel
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 4: Management */}
                <div className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                        <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">4</span>
                        Upravljanje s piškotki
                    </h2>
                    <p>Uporabnik lahko kadarkoli:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-2 mb-4">
                        <li>spremeni ali prekliče soglasje za piškotke,</li>
                        <li>omeji ali onemogoči piškotke v nastavitvah svojega brskalnika.</li>
                    </ul>
                    <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100">
                        <Info size={16} className="mt-0.5 shrink-0" />
                        <p><strong>Pomembno:</strong> Onemogočanje piškotkov lahko vpliva na delovanje spletne strani.</p>
                    </div>
                </div>

                {/* Section 5: Duration */}
                <div className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                        <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">5</span>
                        Trajanje piškotkov
                    </h2>
                    <p className="mb-4">Piškotki so lahko:</p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                            <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                                <RefreshCw size={16} className="text-nature-600" /> Sejni piškotki
                            </div>
                            <p className="text-sm text-gray-600">Izbrišejo se ob zaprtju brskalnika.</p>
                        </div>
                        <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                             <div className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                                <Clock size={16} className="text-nature-600" /> Trajni piškotki
                            </div>
                            <p className="text-sm text-gray-600">Ostanejo shranjeni določen čas ali do izbrisa.</p>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                        Trajanje posameznih piškotkov je določeno s strani ponudnikov posameznih storitev.
                    </p>
                </div>

                {/* Section 6 & 7 */}
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div>
                        <h2 className="text-xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                            <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">6</span>
                            Posredovanje podatkov
                        </h2>
                        <p className="text-sm mb-2">
                            Podatki, zbrani s piškotki, se lahko posredujejo ponudnikom analitičnih in oglaševalskih storitev (npr. Google, Meta), ki delujejo kot pogodbeni obdelovalci osebnih podatkov.
                        </p>
                        <p className="text-sm font-medium text-nature-700">
                            Ti ponudniki zagotavljajo ustrezne zaščitne ukrepe v skladu z GDPR.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                            <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">7</span>
                            Pravice uporabnikov
                        </h2>
                        <p className="text-sm mb-2">
                            Uporabnik ima v zvezi s piškotki enake pravice kot pri obdelavi osebnih podatkov: dostop, popravek, izbris, ugovor, preklic soglasja.
                        </p>
                        <p className="text-sm">
                            Več informacij je na voljo v dokumentu <span className="font-medium text-nature-700">Politika zasebnosti</span>.
                        </p>
                    </div>
                </div>

                {/* Section 8 & 9 */}
                <div className="mt-12 pt-8 border-t border-nature-200">
                     <div className="flex flex-col md:flex-row gap-8 justify-between">
                         <div className="flex-1">
                            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <Settings size={18} className="text-nature-500" /> 8. Spremembe politike
                            </h3>
                            <p className="text-sm text-gray-600">
                                Upravljavec si pridržuje pravico do spremembe te politike piškotkov. Vsaka sprememba bo objavljena na spletni strani.
                            </p>
                         </div>
                         <div className="flex-1">
                            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <CheckCircle size={18} className="text-nature-500" /> 9. Veljavnost
                            </h3>
                            <p className="text-sm text-gray-600">
                                Ta politika piškotkov velja od dneva objave na spletni strani.
                            </p>
                         </div>
                     </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

