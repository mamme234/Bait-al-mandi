import React from 'react';
import { Flame, Play, Clock, Sparkles, ShieldAlert, Award } from 'lucide-react';

interface PitMethodProps {
  onOpenVideo: () => void;
}

export const PitMethod: React.FC<PitMethodProps> = ({ onOpenVideo }) => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background with Darkened Image */}
      <img
        src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1600&auto=format&fit=crop"
        alt="Fire pit background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f0d0b] via-[#0f0d0b]/90 to-[#0f0d0b]/40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div>
            <span className="text-[#c9a86a] tracking-[.3em] text-xs font-bold uppercase block mb-2">
              — THE HADRAMI METHOD
            </span>
            
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#faf5eb]">
              Sealed underground.<br />
              <span className="italic bg-gradient-to-r from-[#f5e6c8] via-[#c9a86a] to-[#e8c99a] bg-clip-text text-transparent">
                Opened at your table.
              </span>
            </h2>

            <p className="mt-5 text-[#ede3d0]/80 text-base sm:text-lg leading-relaxed">
              Unlike ordinary restaurants that boil or steam meat, traditional Mandi requires a real earthen pit. Wood logs burn down to radiant embers, generating intense radiant heat that melts connective tissues while sealing in succulent juices.
            </p>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 max-w-[480px]">
              <div className="text-center bg-white/[0.05] border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                <p className="font-serif text-3xl sm:text-4xl font-bold text-[#c9a86a]">300°C</p>
                <p className="text-[10px] tracking-widest text-[#ede3d0]/70 uppercase font-semibold mt-1">CLAY PIT HEAT</p>
              </div>
              <div className="text-center bg-white/[0.05] border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                <p className="font-serif text-3xl sm:text-4xl font-bold text-[#c9a86a]">6 hrs</p>
                <p className="text-[10px] tracking-widest text-[#ede3d0]/70 uppercase font-semibold mt-1">SLOW SMOKE</p>
              </div>
              <div className="text-center bg-white/[0.05] border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                <p className="font-serif text-3xl sm:text-4xl font-bold text-[#c9a86a]">11</p>
                <p className="text-[10px] tracking-widest text-[#ede3d0]/70 uppercase font-semibold mt-1">SECRET SPICES</p>
              </div>
            </div>

            {/* Watch ceremony button */}
            <button
              onClick={onOpenVideo}
              className="mt-8 inline-flex items-center gap-4 group cursor-pointer text-left"
            >
              <span className="w-16 h-16 rounded-full bg-[#c9a86a] text-[#0f0d0b] flex items-center justify-center text-xl group-hover:scale-110 shadow-[0_0_40px_rgba(201,168,106,.6)] transition-transform">
                <Play className="w-6 h-6 ml-0.5 fill-current" />
              </span>
              <div>
                <span className="block font-bold text-base text-[#faf5eb]">Watch the unsealing ceremony</span>
                <span className="block text-xs text-[#ede3d0]/70">Filmed inside our Jumeirah 1 live pit kitchen</span>
              </div>
            </button>
          </div>

          {/* Right Highlights Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#171310]/85 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl">
              <span className="w-12 h-12 rounded-2xl bg-[#c9a86a]/15 text-[#c9a86a] flex items-center justify-center font-bold text-xl mb-4">
                🍖
              </span>
              <h4 className="font-bold text-lg text-[#faf5eb]">Falls off the bone</h4>
              <p className="text-sm text-[#ede3d0]/70 mt-1 leading-relaxed">
                No knife required. Tender enough to eat with a spoon and fresh tandoor khubz.
              </p>
            </div>

            <div className="bg-[#171310]/85 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl sm:mt-6">
              <span className="w-12 h-12 rounded-2xl bg-[#c9a86a]/15 text-[#c9a86a] flex items-center justify-center font-bold text-xl mb-4">
                🍚
              </span>
              <h4 className="font-bold text-lg text-[#faf5eb]">Pit-smoked Basmati</h4>
              <p className="text-sm text-[#ede3d0]/70 mt-1 leading-relaxed">
                Rice sits directly under the suspended meat, absorbing the golden rendered juices.
              </p>
            </div>

            <div className="bg-[#171310]/85 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl sm:-mt-6">
              <span className="w-12 h-12 rounded-2xl bg-[#c9a86a]/15 text-[#c9a86a] flex items-center justify-center font-bold text-xl mb-4">
                👨‍👩‍👧‍👦
              </span>
              <h4 className="font-bold text-lg text-[#faf5eb]">Grand Family Trays</h4>
              <p className="text-sm text-[#ede3d0]/70 mt-1 leading-relaxed">
                Served on hand-hammered brass trays for the authentic Arab majlis bonding.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#e8c99a] via-[#c9a86a] to-[#a6864a] text-[#0f0d0b] rounded-3xl p-6 shadow-xl">
              <p className="font-serif text-2xl font-bold leading-tight">
                “The gold standard of Yemeni Mandi in the Gulf.”
              </p>
              <p className="text-xs font-black tracking-widest mt-4 uppercase">
                — TIME OUT DUBAI RESTAURANT AWARDS
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
