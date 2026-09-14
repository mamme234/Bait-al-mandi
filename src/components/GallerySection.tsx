import React, { useState } from 'react';
import { Camera, Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop',
      title: 'Royal Lamb Mandi Shoulder',
      category: 'Food'
    },
    {
      src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=900&auto=format&fit=crop',
      title: 'Family Floor Majlis Hall',
      category: 'Majlis'
    },
    {
      src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=900&auto=format&fit=crop',
      title: 'Traditional Clay Pit Glow',
      category: 'The Pit'
    },
    {
      src: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=900&auto=format&fit=crop',
      title: 'Saffron & Raisin Basmati Rice',
      category: 'Food'
    },
    {
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=900&auto=format&fit=crop',
      title: 'Private Royal Dining Suite',
      category: 'Majlis'
    },
    {
      src: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=900&auto=format&fit=crop',
      title: 'Sayadiah Fish & Dakous Sauce',
      category: 'Food'
    },
    {
      src: 'https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=900&auto=format&fit=crop',
      title: '11 Hadrami Heritage Spices',
      category: 'The Pit'
    },
    {
      src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=900&auto=format&fit=crop',
      title: 'Grand Platter For 8 Guests',
      category: 'Food'
    }
  ];

  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters = ['All', 'Food', 'Majlis', 'The Pit'];
  const filteredImages = images.filter(
    (img) => activeFilter === 'All' || img.category === activeFilter
  );

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#120f0c] border-t border-[#c9a86a]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[#c9a86a] text-xs font-bold tracking-[.3em] uppercase block mb-2">
              — GALLERY • المعرض
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#faf5eb]">
              A feast for the <span className="italic text-[#c9a86a]">eyes first</span>
            </h2>
          </div>

          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                  activeFilter === f
                    ? 'bg-gradient-to-r from-[#e8c99a] to-[#c9a86a] text-[#0f0d0b]'
                    : 'border border-white/10 text-[#ede3d0]/70 hover:border-[#c9a86a]/30'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="group relative h-56 sm:h-64 rounded-3xl overflow-hidden border border-white/10 cursor-pointer shadow-lg bg-[#0f0d0b]"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-3 left-3 right-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[10px] font-bold text-[#c9a86a] uppercase tracking-wider block">
                  {img.category}
                </span>
                <p className="font-serif text-sm font-bold text-[#faf5eb] truncate">
                  {img.title}
                </p>
              </div>

              <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0f0d0b]/70 backdrop-blur text-[#c9a86a] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Expand className="w-3.5 h-3.5" />
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full border border-white/20 text-[#ede3d0] flex items-center justify-center hover:bg-white/10 transition z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={prevLightbox}
            className="absolute left-4 sm:left-8 w-12 h-12 rounded-full border border-[#c9a86a]/40 bg-[#0f0d0b]/80 text-[#c9a86a] flex items-center justify-center hover:bg-[#c9a86a] hover:text-[#0f0d0b] transition z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextLightbox}
            className="absolute right-4 sm:right-8 w-12 h-12 rounded-full border border-[#c9a86a]/40 bg-[#0f0d0b]/80 text-[#c9a86a] flex items-center justify-center hover:bg-[#c9a86a] hover:text-[#0f0d0b] transition z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full text-center">
            <img
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].title}
              className="max-h-[75vh] w-auto mx-auto rounded-3xl object-contain border border-[#c9a86a]/30 shadow-2xl"
            />
            <h4 className="font-serif text-2xl font-bold text-[#faf5eb] mt-4">
              {filteredImages[lightboxIndex].title}
            </h4>
            <p className="text-xs text-[#c9a86a] uppercase tracking-widest mt-1">
              Bait Al Mandi • {filteredImages[lightboxIndex].category}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
