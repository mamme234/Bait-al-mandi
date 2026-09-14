import React, { useState } from 'react';
import { Users, Calendar, Phone, CheckCircle2, Sparkles, Building, HeartHandshake } from 'lucide-react';

export const CateringSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Wedding Feast');
  const [guestCount, setGuestCount] = useState(50);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const packages = [
    {
      title: 'Whole Lamb Feasts',
      sub: 'Weddings & Eid',
      desc: 'Live on-site unsealing ceremony. Whole lamb over saffron basmati, 8 hot sides, fresh khubz & service staff.',
      price: 'From AED 89 / Guest',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=700&auto=format&fit=crop'
    },
    {
      title: 'Corporate Majlis & Iftars',
      sub: 'Company Gatherings',
      desc: 'Individual VIP trays or grand shared platters. Audio/video support, partitioned majlis, and brand customization.',
      price: 'From AED 75 / Guest',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=700&auto=format&fit=crop'
    },
    {
      title: 'Franchise & Partnership',
      sub: 'Regional Expansion',
      desc: 'Join 14 branches across the UAE. Turnkey pit construction, master chef training, and guaranteed supply chain.',
      price: 'Investment from AED 650k',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=700&auto=format&fit=crop'
    }
  ];

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    try {
      setSubmitting(true);
      await fetch('/api/catering', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          phone,
          event_type: eventType,
          guest_count: guestCount,
          event_date: date,
          location
        })
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="catering" className="py-20 lg:py-28 bg-[#120f0c] border-t border-[#c9a86a]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#c9a86a] text-xs font-bold tracking-[.3em] uppercase block mb-2">
            — MAJLIS • CATERING • EVENTS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#faf5eb]">
            We bring the pit <span className="italic text-[#c9a86a]">to you</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#ede3d0]/70 mt-3 leading-relaxed">
            From intimate 20-guest home majlis gatherings to 1,000-guest royal wedding walimas across the Emirates.
          </p>
        </div>

        {/* 3 Package Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="bg-[#171310] border border-white/10 hover:border-[#c9a86a]/40 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col"
            >
              <div className="h-52 overflow-hidden bg-[#0f0d0b]">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-[#c9a86a] tracking-widest uppercase block">
                    {pkg.sub}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#faf5eb] mt-1">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-[#ede3d0]/70 mt-2 leading-relaxed">
                    {pkg.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-bold text-xs text-[#faf5eb]">{pkg.price}</span>
                  <button
                    onClick={() => {
                      setEventType(pkg.title);
                      document.getElementById('cateringForm')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#c9a86a] hover:underline cursor-pointer"
                  >
                    Inquire Now →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Inquire Form */}
        <div id="cateringForm" className="bg-[#171310] border border-[#c9a86a]/25 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="font-serif text-3xl font-bold text-[#faf5eb]">Catering Request Received</h3>
              <p className="text-xs text-[#ede3d0]/70 mt-2 max-w-md mx-auto">
                Shukran {fullName}! Our head catering supervisor will contact you on WhatsApp (+{phone}) within 1 hour with menu proposals and custom pricing.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2 rounded-full border border-[#c9a86a]/40 text-xs text-[#c9a86a]"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitInquiry} className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#faf5eb] text-center mb-4">
                Instant Catering Quote Request
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase block mb-1">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Mohammed Al Hashimi"
                    className="w-full bg-[#0f0d0b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf5eb] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase block mb-1">
                    PHONE / WHATSAPP *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 50 XXX XXXX"
                    className="w-full bg-[#0f0d0b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf5eb] outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase block mb-1">
                    EVENT TYPE
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-[#0f0d0b] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-[#faf5eb] outline-none"
                  >
                    <option value="Wedding Feast">Wedding Feast</option>
                    <option value="Corporate Majlis">Corporate Majlis</option>
                    <option value="Family Gathering">Family Gathering</option>
                    <option value="Eid Celebration">Eid Celebration</option>
                    <option value="Franchise Inquiry">Franchise Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase block mb-1">
                    GUESTS COUNT
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={2000}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-[#0f0d0b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf5eb] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase block mb-1">
                    EVENT DATE
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#0f0d0b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf5eb] outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#e8c99a] via-[#c9a86a] to-[#a6864a] text-[#0f0d0b] font-black text-xs tracking-wider transition hover:brightness-110 disabled:opacity-50 mt-2 cursor-pointer"
              >
                {submitting ? 'SENDING INQUIRY...' : 'REQUEST OFFICIAL CATERING QUOTE'}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
