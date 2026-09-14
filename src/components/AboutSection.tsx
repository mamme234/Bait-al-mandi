import React from 'react';
import { Flame, Sparkles, HeartHandshake, UtensilsCrossed, ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden bg-[#0f0d0b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          
          {/* Left Visual Mosaic */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=600&auto=format&fit=crop"
                  alt="Traditional Majlis Interior"
                  className="rounded-3xl h-[280px] w-full object-cover border border-white/10 shadow-xl"
                />
                <img
                  src="https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=600&auto=format&fit=crop"
                  alt="Ancient Spices"
                  className="rounded-3xl h-[200px] w-full object-cover border border-[#c9a86a]/20 shadow-xl"
                />
              </div>

              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop"
                  alt="Family Dining"
                  className="rounded-3xl h-[220px] w-full object-cover border border-white/10 shadow-xl"
                />
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop"
                  alt="Underground Clay Pit"
                  className="rounded-3xl h-[260px] w-full object-cover border border-[#c9a86a]/30 shadow-xl"
                />
              </div>
            </div>

            {/* Central Floating Badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#e8c99a] via-[#c9a86a] to-[#a6864a] text-[#0f0d0b] rounded-2xl px-7 py-3.5 flex items-center gap-4 shadow-[0_15px_35px_-10px_rgba(201,168,106,0.6)] whitespace-nowrap">
              <span className="font-serif text-4xl font-extrabold leading-none">27</span>
              <div className="leading-tight text-left">
                <span className="block text-xs font-black tracking-widest uppercase">YEARS OF</span>
                <span className="block text-xs font-extrabold tracking-wider uppercase">AUTHENTICITY</span>
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="text-left">
            <span className="text-[#c9a86a] text-xs font-bold tracking-[.3em] uppercase block mb-3">
              — OUR STORY • قصتنا
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#faf5eb]">
              From Hadramawt's valleys to <br />
              <span className="italic bg-gradient-to-r from-[#f5e6c8] via-[#c9a86a] to-[#e8c99a] bg-clip-text text-transparent">
                Dubai's heart
              </span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#ede3d0]/75 leading-relaxed">
              Founded in 1998 by the Al-Hadrami family, Bait Al Mandi began with a single underground clay pit and an unyielding commitment: never cut corners on time or tradition.
            </p>

            <p className="mt-4 text-base text-[#ede3d0]/75 leading-relaxed">
              Every morning before dawn, fresh lamb shoulders and local chickens are marinated in our signature 11-spice blend, lowered into a 300°C subterranean clay tannour, and dough-sealed. As the meat tenderizes over glowing wood coals for six hours, its aromatic drippings fall into the aged basmati rice below, infusing every grain with deep smoke and rich marrow.
            </p>

            {/* Feature Bullet Points */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
              <div className="flex gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#c9a86a]/10 border border-[#c9a86a]/30 flex items-center justify-center text-[#c9a86a] shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#faf5eb]">Underground Clay Pits</h4>
                  <p className="text-xs text-[#ede3d0]/60 mt-1">Built by Yemen craftsmen with red clay & river stones.</p>
                </div>
              </div>

              <div className="flex gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#c9a86a]/10 border border-[#c9a86a]/30 flex items-center justify-center text-[#c9a86a] shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#faf5eb]">Aged Basmati Daily</h4>
                  <p className="text-xs text-[#ede3d0]/60 mt-1">Saffron threads, barberries, smoked ghee & raisins.</p>
                </div>
              </div>

              <div className="flex gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#c9a86a]/10 border border-[#c9a86a]/30 flex items-center justify-center text-[#c9a86a] shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#faf5eb]">Yemeni Hospitality</h4>
                  <p className="text-xs text-[#ede3d0]/60 mt-1">Complimentary Arabic coffee & dates with every visit.</p>
                </div>
              </div>

              <div className="flex gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#c9a86a]/10 border border-[#c9a86a]/30 flex items-center justify-center text-[#c9a86a] shrink-0">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#faf5eb]">Ramadan & Eid Trays</h4>
                  <p className="text-xs text-[#ede3d0]/60 mt-1">Full-size feasts serving 10 to 500 guests on demand.</p>
                </div>
              </div>
            </div>

            {/* Chef signature footer */}
            <div className="flex flex-wrap items-center justify-between gap-6 mt-10 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=200&auto=format&fit=crop"
                  alt="Master Pit Chef"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#c9a86a]"
                />
                <div>
                  <p className="font-serif text-xl italic text-[#faf5eb]">Chef Ahmed Al-Hadrami</p>
                  <p className="text-[11px] tracking-widest text-[#c9a86a] font-bold uppercase">FOUNDER & MASTER OF THE PIT</p>
                </div>
              </div>

              <a
                href="#menu"
                className="inline-flex items-center gap-2 border border-[#c9a86a]/40 hover:border-[#c9a86a] px-6 py-3 rounded-full text-sm font-bold text-[#faf5eb] hover:bg-[#c9a86a]/10 transition"
              >
                <span>Taste The Heritage</span>
                <ArrowRight className="w-4 h-4 text-[#c9a86a]" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
