import React from 'react';
import { Star, Quote } from 'lucide-react';

// Tukaj lahko ročno uredite mnenja, ki se prikažejo na strani
const REVIEWS = [
  {
    id: 1,
    author: "Peter Kaiser",
    rating: 5,
    text: "Velika in raznolika izbira lončnic. Morda celo največja na goriškem. Na voljo imajo tudi rezano cvetje, ki ga na željo tudi aranžirajo. Prodajalci so strokovni, profesionalni in ustrežljivi. Poleg cvetja prodajajo tudi nekatere druge vrtnarske artikle. Pred prodajalno imajo tudi prosto parkirišče.",
    date: "pred 2 mesecema"
  },
  {
    id: 2,
    author: "Bogomir Črv",
    rating: 5,
    text: "Pestra izbira vrtnin in cvetja, profesionalno osebje.",
    date: "pred 4 leti"
  },
  {
    id: 3,
    author: "Lilijana Seljak Humar",
    rating: 5,
    text: "Super prodajalci in super izbira.",
    date: "pred 4 leti"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-nature-50 relative overflow-hidden">
      {/* Decorative background logo/icon */}
      <div className="absolute top-10 left-10 opacity-5 pointer-events-none">
        <Quote size={200} className="text-nature-900" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-nature-600 font-bold tracking-widest uppercase text-sm mb-3">
            Mnenja strank
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-nature-900 mb-6">
            Besede naših kupcev
          </h3>
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="font-bold text-2xl text-gray-800">4.9</span>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} fill="currentColor" />
              ))}
            </div>
            <span className="text-gray-500 text-sm">(Google Reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-3xl shadow-sm border border-nature-100 flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-nature-100 flex items-center justify-center text-nature-700 font-bold text-lg shrink-0">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{review.author}</div>
                  <div className="text-xs text-gray-400">{review.date}</div>
                </div>
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                    alt="Google"
                    className="w-5 h-5 ml-auto opacity-50"
                />
              </div>
              <div className="flex text-yellow-400 mb-4 text-sm">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed italic flex-grow">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a 
            href="https://share.google/wKhp3J9HrJmP0z28u" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-nature-700 font-medium hover:text-nature-900 transition-colors border border-nature-200 px-6 py-3 rounded-full hover:bg-white hover:shadow-sm"
          >
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                alt="Google"
                className="w-5 h-5"
            />
            Preberite vsa mnenja na Google
          </a>
        </div>
      </div>
    </section>
  );
};