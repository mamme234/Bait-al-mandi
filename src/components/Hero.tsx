import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Utensils, 
  Calendar, 
  Play, 
  Award, 
  Star, 
  Clock, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { MenuItem } from '../types';

interface HeroProps {
  onOpenVideo: () => void;
  featuredDish?: MenuItem;
}

export const Hero: React.FC<HeroProps> = ({ onOpenVideo, featuredDish }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { isAr } = useLanguage();
  const [dealTimeLeft, setDealTimeLeft] = useState('04:42:19');

  useEffect(() => {
    let seconds = 4 * 3600 + 42 * 60 + 19;
    const interval = setInterval(() => {
      seconds = Math.max(0, seconds - 1);
      const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
      const s = String(seconds % 60).padStart(2, '0');
      setDealTimeLeft(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const defaultHeroDish: MenuItem = featuredDish || {
    id: 1,
    name: 'Royal Lamb Mandi',
    category: 'Mandi',
    description: '6-hr underground pit-smoked lamb shoulder, saffron basmati, dakous & shafout.',
    price: 68,
    image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop',
    is_spicy: false,
    is_vegetarian: false,
    tags: ['bestseller']
  };

  const handleQuickAdd = () => {
    addToCart(defaultHeroDish, 1);
    setIsCartOpen(true);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#c9a86a]/15">
      {/* Ambient background glows */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#c9a86a]/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[550px] h-[550px] rounded-full bg-[#b5452a]/15 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Hero Story Content */}
          <div className="flex flex-col items-start text-left">
            
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/[0.04] border border-[#c9a86a]/30 rounded-full pl-2 pr-4 py-1.5 mb-6 shadow-inner">
              <span className="bg-gradient-to-r from-[#e8c99a] to-[#c9a86a] text-[#0f0d0b] text-[11px] font-extrabold px-3 py-0.5 rounded-full tracking-wider flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" /> 4.9 RATED
              </span>
              <span className="text-[12.5px] text-[#ede3d0]/90 font-medium">
                2M+ Guests • Michelin Guide Selection 2024–2026
              </span>
            </div>

            {/* Arabic Welcome Headline */}
            <p className="font-serif text-[#c9a86a] text-2xl sm:text-3xl font-medium tracking-wide mb-2">
              مطعم بيت المندي الأصيل
            </p>

            {/* Main Display Headline */}
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-[80px] font-semibold tracking-tight leading-[0.98] text-[#faf5eb]">
              Fire Beneath.{' '}
              <span className="block italic bg-gradient-to-r from-[#f5e6c8] via-[#c9a86a] to-[#e8c99a] bg-clip-text text-transparent">
                Flavor Above.
              </span>
            </h1>

            {/* Story Paragraph */}
            <p className="mt-6 text-base sm:text-lg text-[#faf5eb]/75 leading-relaxed max-w-[560px]">
              Slow-cooked in authentic subterranean clay pits for 6 hours, the ancient Hadrami way. Tender smoked lamb shoulder, fragrant golden saffron basmati, and secret family spices — served in our grand majlis since <span className="text-[#faf5eb] font-bold">1998</span>.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mt-8 w-full sm:w-auto">
              <a
                href="#menu"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#e8c99a] via-[#c9a86a] to-[#a6864a] text-[#0f0d0b] px-8 py-4 rounded-full font-bold text-sm tracking-wider shadow-[0_12px_30px_-8px_rgba(201,168,106,.5)] hover:brightness-105 hover:-translate-y-0.5 transition-all"
              >
                <Utensils className="w-4 h-4" />
                <span>EXPLORE MENU</span>
              </a>

              <a
                href="#reserve"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 border border-[#c9a86a]/40 hover:border-[#c9a86a] bg-white/[0.03] hover:bg-[#c9a86a]/10 text-[#faf5eb] px-7 py-4 rounded-full font-bold text-sm tracking-wider transition-all"
              >
                <Calendar className="w-4 h-4 text-[#c9a86a]" />
                <span>BOOK MAJLIS</span>
              </a>

              <button
                onClick={onOpenVideo}
                className="w-full sm:w-auto mt-2 sm:mt-0 inline-flex items-center gap-3 py-2 px-3 group text-left cursor-pointer"
              >
                <span className="w-12 h-12 rounded-full border border-[#c9a86a]/40 bg-[#1d1814] flex items-center justify-center text-[#c9a86a] group-hover:bg-[#c9a86a] group-hover:text-[#0f0d0b] transition-all shadow-md">
                  <Play className="w-4 h-4 ml-0.5 fill-current" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[11px] font-bold tracking-[.25em] text-[#ede3d0]/60 uppercase">Watch Pit Story</span>
                  <span className="block text-sm font-bold text-[#faf5eb]">The 6-Hour Unsealing</span>
                </span>
              </button>
            </div>

            {/* Key Metrics / Highlights */}
            <div className="grid grid-cols-3 gap-3 sm:gap-5 mt-10 w-full max-w-[540px]">
              <div className="bg-[#1d1814]/80 border border-white/[0.08] rounded-2xl p-4 text-center shadow-lg">
                <p className="font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#f5e6c8] to-[#c9a86a] bg-clip-text text-transparent">
                  27+
                </p>
                <p className="text-[11px] tracking-widest text-[#ede3d0]/60 font-semibold mt-1">YEARS LEGACY</p>
              </div>
              <div className="bg-[#1d1814]/80 border border-white/[0.08] rounded-2xl p-4 text-center shadow-lg">
                <p className="font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#f5e6c8] to-[#c9a86a] bg-clip-text text-transparent">
                  48
                </p>
                <p className="text-[11px] tracking-widest text-[#ede3d0]/60 font-semibold mt-1">SIGNATURE DISHES</p>
              </div>
              <div className="bg-[#1d1814]/80 border border-white/[0.08] rounded-2xl p-4 text-center shadow-lg">
                <p className="font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#f5e6c8] to-[#c9a86a] bg-clip-text text-transparent">
                  100%
                </p>
                <p className="text-[11px] tracking-widest text-[#ede3d0]/60 font-semibold mt-1">FRESH & HALAL</p>
              </div>
            </div>

          </div>

          {/* Right Hero Arch Frame with Featured Dish */}
          <div className="relative mx-auto w-full max-w-[480px] lg:max-w-none">
            {/* Arabian Arch Frame Container */}
            <div className="p-2 sm:p-3 rounded-[40px] sm:rounded-[48px] bg-gradient-to-b from-[#c9a86a]/40 via-[#c9a86a]/10 to-transparent border border-[#c9a86a]/30 shadow-2xl">
              <div className="relative rounded-[32px] sm:rounded-[42px] overflow-hidden aspect-[4/5] bg-[#171310]">
                <img
                  src={defaultHeroDish.image_url}
                  alt={defaultHeroDish.name}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b] via-[#0f0d0b]/30 to-transparent" />

                {/* Floating Pit Heat Live Tag */}
                <div className="absolute top-4 left-4 bg-[#0f0d0b]/85 backdrop-blur-md border border-[#c9a86a]/30 rounded-2xl px-3.5 py-2 flex items-center gap-2.5 shadow-xl">
                  <span className="w-8 h-8 rounded-full bg-orange-500/15 text-orange-400 flex items-center justify-center">
                    <Flame className="w-4 h-4 fill-current animate-pulse" />
                  </span>
                  <div>
                    <span className="text-[10px] tracking-widest font-extrabold text-[#ede3d0]/60 block uppercase">
                      LIVE CLAY PIT
                    </span>
                    <span className="text-xs font-bold text-[#faf5eb] block">300°C Slow Underground</span>
                  </div>
                </div>

                {/* Floating Today's Flash Deal */}
                <div className="absolute top-4 right-4 bg-[#0f0d0b]/85 backdrop-blur-md border border-[#c9a86a]/30 rounded-2xl px-3.5 py-2 shadow-xl text-right">
                  <span className="text-[10px] tracking-widest font-extrabold text-[#c9a86a] block uppercase">
                    FLASH OFFER
                  </span>
                  <span className="text-xs font-mono font-bold text-[#faf5eb]">{dealTimeLeft}</span>
                </div>

                {/* Bottom Card Inside Image */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#171310]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-2xl">
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-[#c9a86a] tracking-wider uppercase block">
                      ★ SIGNATURE OF HADRAMAWT
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#faf5eb] truncate">
                      {defaultHeroDish.name}
                    </h3>
                    <p className="text-xs text-[#ede3d0]/70 truncate">
                      Smoked 6 hrs • Aged saffron rice • Dakous
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-serif text-xl sm:text-2xl font-bold text-[#c9a86a]">
                      AED {defaultHeroDish.price}
                    </p>
                    <button
                      onClick={handleQuickAdd}
                      className="mt-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#e8c99a] to-[#c9a86a] text-[#0f0d0b] text-xs font-extrabold hover:brightness-110 shadow-md transition"
                    >
                      + ADD TO CART
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Five Star Pill Badge Under Frame */}
            <div className="mt-4 flex items-center justify-between px-2 text-xs text-[#ede3d0]/70">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#c9a86a]">
                  {'★★★★★'.split('').map((char, i) => (
                    <span key={i}>{char}</span>
                  ))}
                </div>
                <span className="font-bold text-[#faf5eb]">4.9 / 5</span>
                <span>(12,400+ Verified UAE Reviews)</span>
              </div>
              <span className="hidden sm:inline font-semibold text-[#c9a86a]">
                Free Delivery over AED 150
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
