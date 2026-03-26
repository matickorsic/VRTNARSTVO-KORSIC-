import React, { useEffect } from 'react';
import { FileText, Shield, Scale } from 'lucide-react';

export const TermsPage: React.FC = () => {
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
                    Splošni pogoji uporabe
                </h1>
                <div className="w-24 h-1 bg-nature-400 mx-auto rounded-full"></div>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 border border-nature-100 shadow-sm prose prose-nature max-w-none text-gray-600">
                
                {/* Section 1 */}
                <div className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                        <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">1</span>
                        Splošne določbe
                    </h2>
                    <p className="mb-4">
                        Ti splošni pogoji uporabe urejajo dostop in uporabo spletne strani Vrtnarstvo Koršič (v nadaljevanju: spletna stran), ki jo upravlja:
                    </p>
                    <div className="bg-nature-50 p-6 rounded-xl border border-nature-100 not-prose mb-4">
                        <p className="font-bold text-gray-900">Metod Koršič – nosilec dopolnilne dejavnosti na kmetiji</p>
                        <p>Sedež: Ščedne 6, 5000 Nova Gorica, Slovenija</p>
                        <p>Davčna številka: SI69488576</p>
                        <p>Matična številka: 2872331000</p>
                        <p>E-pošta: <a href="mailto:vrtnarstvo.korsic@siol.net" className="text-nature-600 hover:underline">vrtnarstvo.korsic@siol.net</a></p>
                        <p>Telefon: +386 53 006 059</p>
                    </div>
                    <p>
                        Z uporabo spletne strani se šteje, da uporabnik soglaša s temi splošnimi pogoji.
                    </p>
                </div>

                {/* Section 2 */}
                <div className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                        <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">2</span>
                        Namen spletne strani
                    </h2>
                    <p>
                        Spletna stran je namenjena predstavitvi dejavnosti, ponudbe, delovnega časa in kontaktnih podatkov vrtnarije Vrtnarstvo Koršič. 
                        Spletna stran ne omogoča spletnega nakupa ali spletnega plačevanja izdelkov.
                    </p>
                </div>

                {/* Section 3 */}
                <div className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                        <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">3</span>
                        Informacije in točnost podatkov
                    </h2>
                    <p>
                        Upravljavec si prizadeva zagotavljati točne, ažurne in popolne informacije, vendar si pridržuje pravico do sprememb vsebin brez predhodnega obvestila.
                        Upravljavec ne odgovarja za morebitne napake ali netočnosti v vsebinah.
                    </p>
                </div>

                {/* Section 4 */}
                <div className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                        <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">4</span>
                        Intelektualna lastnina
                    </h2>
                    <p>
                        Vse vsebine na spletni strani (besedila, fotografije, logotipi, grafični elementi) so last upravljavca ali njegovih partnerjev in so zaščitene z avtorskimi pravicami.
                        Brez pisnega dovoljenja upravljavca ni dovoljeno:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>kopiranje,</li>
                        <li>razmnoževanje,</li>
                        <li>distribuiranje ali</li>
                        <li>javna objava vsebin.</li>
                    </ul>
                </div>

                {/* Section 5 */}
                <div className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                        <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">5</span>
                        Odgovornost
                    </h2>
                    <p>
                        Uporaba spletne strani je na lastno odgovornost uporabnika. Upravljavec ne odgovarja za:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>morebitno nedelovanje spletne strani,</li>
                        <li>škodo, nastalo zaradi uporabe informacij,</li>
                        <li>povezave na zunanje spletne strani tretjih oseb.</li>
                    </ul>
                </div>

                {/* Section 6 */}
                <div className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                        <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">6</span>
                        Kontaktni obrazci in povpraševanja
                    </h2>
                    <p>
                        V primeru oddaje povpraševanja ali sporočila prek kontaktnega obrazca uporabnik jamči, da so posredovani podatki točni.
                        Podatki se obdelujejo skladno s Politiko zasebnosti.
                    </p>
                </div>

                {/* Section 7 */}
                <div className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-nature-800 mb-4 flex items-center gap-2">
                        <span className="bg-nature-100 text-nature-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans">7</span>
                        Varstvo osebnih podatkov
                    </h2>
                    <p>
                        Upravljavec osebne podatke obdeluje skladno z veljavno zakonodajo in Splošno uredbo o varstvu podatkov (GDPR).
                        Podrobnosti so opredeljene v dokumentu Politika zasebnosti, ki je dostopen na spletni strani.
                    </p>
                </div>

                {/* Section 8 & 9 */}
                <div className="grid md:grid-cols-2 gap-8 mt-12 bg-nature-50 p-6 rounded-2xl border border-nature-100">
                     <div>
                        <h3 className="text-lg font-bold text-nature-800 mb-2 flex items-center gap-2">
                            <FileText size={18} /> 8. Spremembe pogojev
                        </h3>
                        <p className="text-sm">
                            Upravljavec si pridržuje pravico do spremembe teh splošnih pogojev.
                            Spremenjeni pogoji stopijo v veljavo z dnem objave na spletni strani.
                        </p>
                     </div>
                     <div>
                        <h3 className="text-lg font-bold text-nature-800 mb-2 flex items-center gap-2">
                            <Scale size={18} /> 9. Veljavno pravo
                        </h3>
                        <p className="text-sm">
                            Za razlago in uporabo teh splošnih pogojev se uporablja pravo Republike Slovenije.
                            Za morebitne spore je pristojno stvarno pristojno sodišče v Sloveniji.
                        </p>
                     </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

