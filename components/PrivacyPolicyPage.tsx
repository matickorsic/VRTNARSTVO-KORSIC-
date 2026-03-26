import React, { useEffect } from 'react';
import { Shield, Lock, Eye, FileText, Database, UserCheck, Server, Cookie, Scale } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
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
                    Politika zasebnosti
                </h1>
                <div className="w-24 h-1 bg-nature-400 mx-auto rounded-full"></div>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 border border-nature-100 shadow-sm prose prose-nature max-w-none text-gray-600">
                
                {/* Section 1: Controller */}
                <div className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                        <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">1</span>
                        Upravljavec osebnih podatkov
                    </h2>
                    <p className="mb-4">
                        Upravljavec osebnih podatkov je:
                    </p>
                    <div className="bg-nature-50 p-6 rounded-xl border border-nature-100 not-prose mb-4 flex flex-col md:flex-row gap-6 items-start">
                        <div className="p-3 bg-white rounded-full text-nature-600 shadow-sm shrink-0">
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
                    <p>
                        Upravljavec osebne podatke obdeluje skladno z Uredbo (EU) 2016/679 (GDPR) in veljavno zakonodajo Republike Slovenije.
                    </p>
                </div>

                {/* Section 2: Data Types */}
                <div className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                        <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">2</span>
                        Vrste osebnih podatkov
                    </h2>
                    <p>Upravljavec lahko obdeluje naslednje osebne podatke:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-nature-400 rounded-full"></div> Ime in priimek</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-nature-400 rounded-full"></div> E-poštni naslov</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-nature-400 rounded-full"></div> Telefonsko številko</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-nature-400 rounded-full"></div> Vsebino sporočila ali povpraševanja</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-nature-400 rounded-full"></div> IP naslov</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-nature-400 rounded-full"></div> Podatke o uporabi spletne strani (piškotki)</li>
                    </ul>
                </div>

                {/* Section 3 & 4: Purpose & Legal Basis */}
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div>
                        <h2 className="text-xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                            <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">3</span>
                            Namen obdelave
                        </h2>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2"><Database size={16} className="text-nature-500 mt-1 shrink-0"/> Odgovarjanje na povpraševanja in sporočila</li>
                            <li className="flex items-start gap-2"><Database size={16} className="text-nature-500 mt-1 shrink-0"/> Komunikacijo s strankami</li>
                            <li className="flex items-start gap-2"><Database size={16} className="text-nature-500 mt-1 shrink-0"/> Vodenje evidence komunikacije</li>
                            <li className="flex items-start gap-2"><Database size={16} className="text-nature-500 mt-1 shrink-0"/> Izboljševanje delovanja in vsebine spletne strani</li>
                            <li className="flex items-start gap-2"><Database size={16} className="text-nature-500 mt-1 shrink-0"/> Zagotavljanje varnosti spletne strani</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                            <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">4</span>
                            Pravna podlaga
                        </h2>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2"><Scale size={16} className="text-nature-500 mt-1 shrink-0"/> <strong>Privolitev:</strong> (člen 6(1)(a) GDPR)</li>
                            <li className="flex items-start gap-2"><Scale size={16} className="text-nature-500 mt-1 shrink-0"/> <strong>Zakoniti interes:</strong> (člen 6(1)(f) GDPR)</li>
                            <li className="flex items-start gap-2"><Scale size={16} className="text-nature-500 mt-1 shrink-0"/> <strong>Zakonska obveznost:</strong> (člen 6(1)(c) GDPR)</li>
                        </ul>
                    </div>
                </div>

                {/* Section 5: Retention */}
                <div className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                        <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">5</span>
                        Hramba osebnih podatkov
                    </h2>
                    <p>
                        Osebni podatki se hranijo toliko časa, kolikor je potrebno za dosego namena obdelave, do preklica privolitve uporabnika, oziroma v skladu z zakonsko določenimi roki hrambe.
                        Po izteku obdobja hrambe se podatki izbrišejo ali anonimizirajo.
                    </p>
                </div>

                {/* Section 6: Sharing */}
                <div className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                        <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">6</span>
                        Posredovanje osebnih podatkov
                    </h2>
                    <p>
                        Upravljavec osebnih podatkov ne posreduje tretjim osebam, razen pogodbenim obdelovalcem (npr. ponudnik gostovanja), kadar to zahteva zakon ali kadar uporabnik v to izrecno privoli.
                        Vsi pogodbeni obdelovalci zagotavljajo ustrezno raven varstva osebnih podatkov.
                    </p>
                </div>

                {/* Section 7: Cookies */}
                <div className="mb-10 bg-nature-50 p-6 rounded-2xl border border-nature-100">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                        <Cookie className="text-nature-600" />
                        7. Piškotki
                    </h2>
                    <p>
                        Spletna stran uporablja piškotke za pravilno delovanje spletne strani, analizo obiska in izboljšanje uporabniške izkušnje.
                        Uporabnik lahko piškotke kadarkoli omeji ali onemogoči v nastavitvah svojega brskalnika.
                    </p>
                </div>

                {/* Section 8: User Rights */}
                <div className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                        <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">8</span>
                        Pravice uporabnikov
                    </h2>
                    <p className="mb-4">Uporabnik ima pravico:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {['Do dostopa do osebnih podatkov', 'Do popravka netočnih podatkov', 'Do izbrisa osebnih podatkov (pravica do pozabe)', 'Do omejitve obdelave', 'Do ugovora obdelavi', 'Do prenosljivosti podatkov', 'Do preklica privolitve kadarkoli'].map((right, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                                <UserCheck size={18} className="text-nature-500" />
                                <span className="text-sm font-medium text-gray-700">{right}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-sm text-gray-500">Zahtevo lahko pošljete na e-poštni naslov upravljavca.</p>
                </div>

                {/* Section 9: Complaints */}
                <div className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                        <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">9</span>
                        Pravica do pritožbe
                    </h2>
                    <p className="mb-4">
                        Če uporabnik meni, da se osebni podatki obdelujejo v nasprotju z zakonodajo, ima pravico vložiti pritožbo pri:
                    </p>
                    <div className="bg-white p-4 border-l-4 border-nature-500 shadow-sm rounded-r-lg">
                        <p className="font-bold text-gray-900">Informacijski pooblaščenec Republike Slovenije</p>
                        <p>Dunajska cesta 22, 1000 Ljubljana</p>
                        <p>E-pošta: <a href="mailto:gp.ip@ip-rs.si" className="text-nature-600 hover:underline">gp.ip@ip-rs.si</a></p>
                    </div>
                </div>

                {/* Section 10, 11, 12 */}
                <div className="space-y-6 mt-12 border-t border-nature-200 pt-8">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-nature-100 text-nature-600 rounded-lg shrink-0">
                            <Lock size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg">10. Varnost osebnih podatkov</h3>
                            <p className="text-gray-600 text-sm mt-1">
                                Upravljavec uporablja ustrezne tehnične in organizacijske ukrepe za zaščito osebnih podatkov pred nepooblaščenim dostopom, izgubo, uničenjem ali zlorabo.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-nature-100 text-nature-600 rounded-lg shrink-0">
                            <FileText size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg">11. Spremembe politike zasebnosti</h3>
                            <p className="text-gray-600 text-sm mt-1">
                                Upravljavec si pridržuje pravico do spremembe te politike zasebnosti. Vsaka sprememba bo objavljena na spletni strani.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-nature-100 text-nature-600 rounded-lg shrink-0">
                            <Eye size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg">12. Veljavnost</h3>
                            <p className="text-gray-600 text-sm mt-1">
                                Ta politika zasebnosti velja od dneva objave na spletni strani.
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

