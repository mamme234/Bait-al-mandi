import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, ExternalLink, Navigation } from 'lucide-react';
import { Branch } from '../types';

export const BranchesSection: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  useEffect(() => {
    fetch('/api/branches')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setBranches(data);
          setSelectedBranch(data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="branches" className="py-20 lg:py-28 bg-[#0f0d0b] border-t border-[#c9a86a]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#c9a86a] text-xs font-bold tracking-[.3em] uppercase block mb-2">
            — VISIT US • فروعنا
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#faf5eb]">
            Find your nearest <span className="italic text-[#c9a86a]">house of mandi</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#ede3d0]/70 mt-2">
            14 branches across Dubai, Abu Dhabi, Sharjah, and Al Ain with dedicated family majlis halls.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
          
          {/* Branch List */}
          <div className="space-y-3">
            {branches.map((b) => {
              const isSelected = selectedBranch?.id === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBranch(b)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#c9a86a] bg-[#171310] shadow-xl'
                      : 'border-white/10 bg-[#120f0c] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-xl font-bold text-[#faf5eb]">{b.name}</h4>
                        {b.is_flagship && (
                          <span className="text-[10px] bg-[#c9a86a] text-[#0f0d0b] font-black px-2 py-0.5 rounded-full uppercase">
                            FLAGSHIP
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#ede3d0]/70 mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#c9a86a]" />
                        <span>{b.address}</span>
                      </p>
                    </div>

                    <span className="text-xs font-semibold text-[#c9a86a]">{b.city}</span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5 text-xs text-[#ede3d0]/60">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#c9a86a]" /> {b.hours_weekday}
                    </span>
                    <a
                      href={`tel:${b.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#c9a86a] font-bold hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" /> {b.phone}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Preview & Details for Selected Branch */}
          {selectedBranch && (
            <div className="bg-[#171310] border border-[#c9a86a]/25 rounded-3xl p-6 sm:p-8 shadow-2xl sticky top-24">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#faf5eb]">
                    {selectedBranch.name}
                  </h3>
                  <p className="text-xs text-[#ede3d0]/70 mt-1">{selectedBranch.address}</p>
                </div>

                <a
                  href={selectedBranch.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#c9a86a] text-[#0f0d0b] text-xs font-bold flex items-center gap-1.5 shrink-0 hover:brightness-110 transition"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>
              </div>

              {/* Embedded Interactive Map */}
              <div className="rounded-2xl overflow-hidden border border-white/10 h-64 bg-[#0f0d0b] relative">
                <iframe
                  title={`Map of ${selectedBranch.name}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    selectedBranch.name + ' ' + selectedBranch.address
                  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full grayscale invert-[0.88] opacity-80"
                  loading="lazy"
                />
              </div>

              {/* Delivery partners */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-[11px] font-bold tracking-widest text-[#ede3d0]/50 uppercase mb-3">
                  DELIVERY PARTNER INTEGRATION
                </p>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                  <a
                    href="https://talabat.com"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 rounded-xl bg-orange-600/15 border border-orange-500/30 text-orange-300 hover:bg-orange-600/25 transition"
                  >
                    Talabat
                  </a>
                  <a
                    href="https://deliveroo.ae"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 rounded-xl bg-teal-600/15 border border-teal-500/30 text-teal-300 hover:bg-teal-600/25 transition"
                  >
                    Deliveroo
                  </a>
                  <a
                    href="https://www.noon.com/food"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 rounded-xl bg-[#c9a86a]/15 border border-[#c9a86a]/30 text-[#e8c99a] hover:bg-[#c9a86a]/25 transition"
                  >
                    Noon Food
                  </a>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
