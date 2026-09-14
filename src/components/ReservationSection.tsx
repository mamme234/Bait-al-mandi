import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Armchair, 
  DoorClosed, 
  Sparkles,
  Phone,
  AlertCircle
} from 'lucide-react';
import { Reservation } from '../types';

interface ReservationSectionProps {
  onReservationConfirmed: (res: Reservation) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationConfirmed
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('Jumeirah 1 Flagship (Dubai)');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState(4);
  const [seatingStyle, setSeatingStyle] = useState('Floor Majlis');
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState<{ message: string; success: boolean } | null>(null);
  const [myReservations, setMyReservations] = useState<Reservation[]>([]);

  const timeSlots = [
    '12:30', '13:30', '14:30', '17:00',
    '18:00', '19:00', '19:30', '20:00',
    '20:30', '21:00', '21:30', '22:00'
  ];

  const branches = [
    'Jumeirah 1 Flagship (Dubai)',
    'Al Barsha 1 (Dubai)',
    'Deira Port Saeed (Dubai)',
    'Khalifa City (Abu Dhabi)',
    'Al Majaz 2 (Sharjah)',
    'Al Ain Town Centre'
  ];

  const loadReservations = () => {
    try {
      const saved = localStorage.getItem('bam_my_reservations');
      if (saved) setMyReservations(JSON.parse(saved));
    } catch {}
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormFeedback(null);

    if (!fullName.trim()) {
      setFormFeedback({ success: false, message: 'Please enter your full name.' });
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 7) {
      setFormFeedback({ success: false, message: 'Please enter a valid phone or WhatsApp number.' });
      return;
    }
    if (!date) {
      setFormFeedback({ success: false, message: 'Please select a reservation date.' });
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: fullName.trim(),
          customer_phone: phone.trim(),
          customer_email: email.trim() || null,
          branch_name: branch,
          guests_count: guests,
          reservation_date: date,
          reservation_time: time,
          seating_style: seatingStyle,
          special_requests: specialRequests.trim()
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Reservation submission failed');
      }

      const created: Reservation = await res.json();
      
      // Save locally for quick retrieval
      const updated = [created, ...myReservations].slice(0, 5);
      setMyReservations(updated);
      localStorage.setItem('bam_my_reservations', JSON.stringify(updated));

      setFormFeedback({
        success: true,
        message: `Booking ${created.booking_ref} confirmed! Table held for 15 minutes.`
      });

      onReservationConfirmed(created);

      // Reset fields
      setFullName('');
      setSpecialRequests('');
    } catch (err: any) {
      setFormFeedback({ success: false, message: err.message || 'Failed to submit reservation' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (bookingRef: string) => {
    if (!window.confirm(`Are you sure you want to cancel booking ${bookingRef}?`)) return;
    try {
      await fetch('/api/reservations', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking_ref: bookingRef })
      });
      const updated = myReservations.filter((r) => r.booking_ref !== bookingRef);
      setMyReservations(updated);
      localStorage.setItem('bam_my_reservations', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="reserve" className="py-20 lg:py-28 bg-[#0f0d0b] border-t border-[#c9a86a]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
          
          {/* Left Booking Form */}
          <div className="bg-[#171310] border border-[#c9a86a]/25 rounded-[32px] p-6 sm:p-10 shadow-2xl relative">
            
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <span className="text-[#c9a86a] text-xs font-bold tracking-[.3em] uppercase block">
                  — RESERVATION • الحجوزات
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#faf5eb] mt-1">
                  Book your <span className="italic text-[#c9a86a]">majlis table</span>
                </h3>
              </div>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Instant Confirmation
              </span>
            </div>

            {formFeedback && (
              <div
                className={`p-4 rounded-2xl text-xs mb-6 flex items-center gap-2 ${
                  formFeedback.success
                    ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
                    : 'bg-red-950/40 border border-red-500/40 text-red-300'
                }`}
              >
                {formFeedback.success ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{formFeedback.message}</span>
              </div>
            )}

            <form onSubmit={handleBooking} className="space-y-4">
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase block mb-1.5">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Fatima Al Mansoori"
                    className="w-full bg-[#0f0d0b] border border-white/10 focus:border-[#c9a86a] rounded-2xl px-4 py-3 text-xs text-[#faf5eb] placeholder:text-[#ede3d0]/35 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase block mb-1.5">
                    PHONE / WHATSAPP *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 5X XXX XXXX"
                    className="w-full bg-[#0f0d0b] border border-white/10 focus:border-[#c9a86a] rounded-2xl px-4 py-3 text-xs text-[#faf5eb] placeholder:text-[#ede3d0]/35 outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase block mb-1.5">
                    RESTAURANT BRANCH
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-[#0f0d0b] border border-white/10 focus:border-[#c9a86a] rounded-2xl px-4 py-3 text-xs text-[#faf5eb] outline-none"
                  >
                    {branches.map((b) => (
                      <option key={b} value={b} className="bg-[#171310] text-[#faf5eb]">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase block mb-1.5">
                    DATE *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#0f0d0b] border border-white/10 focus:border-[#c9a86a] rounded-2xl px-4 py-3 text-xs text-[#faf5eb] outline-none"
                  />
                </div>
              </div>

              {/* Guests Count Stepper */}
              <div>
                <label className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase block mb-1.5">
                  NUMBER OF GUESTS
                </label>
                <div className="flex items-center justify-between bg-[#0f0d0b] border border-white/10 rounded-2xl px-4 py-2.5">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#c9a86a] hover:text-[#0f0d0b] text-[#faf5eb] font-bold text-base transition cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-serif text-2xl font-bold text-[#faf5eb]">
                    {guests} <span className="text-xs font-sans text-[#ede3d0]/60 font-normal">guests</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(60, g + 1))}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#c9a86a] hover:text-[#0f0d0b] text-[#faf5eb] font-bold text-base transition cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase block mb-1.5">
                  PREFERRED SEATING TIME *
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {timeSlots.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTime(t)}
                      className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        time === t
                          ? 'border-[#c9a86a] bg-[#c9a86a] text-[#0f0d0b]'
                          : 'border-white/10 bg-[#0f0d0b] text-[#ede3d0]/75 hover:border-[#c9a86a]/40'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating Style Selection */}
              <div>
                <label className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase block mb-1.5">
                  SEATING STYLE
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSeatingStyle('Floor Majlis')}
                    className={`p-3.5 rounded-2xl border text-center transition cursor-pointer ${
                      seatingStyle === 'Floor Majlis'
                        ? 'border-[#c9a86a] bg-[#c9a86a]/15 text-[#faf5eb]'
                        : 'border-white/10 bg-[#0f0d0b] text-[#ede3d0]/70'
                    }`}
                  >
                    <Armchair className="w-5 h-5 mx-auto text-[#c9a86a] mb-1" />
                    <p className="font-bold text-xs text-[#faf5eb]">Floor Majlis</p>
                    <p className="text-[10px] text-[#ede3d0]/50">Traditional Carpet</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSeatingStyle('Family Table')}
                    className={`p-3.5 rounded-2xl border text-center transition cursor-pointer ${
                      seatingStyle === 'Family Table'
                        ? 'border-[#c9a86a] bg-[#c9a86a]/15 text-[#faf5eb]'
                        : 'border-white/10 bg-[#0f0d0b] text-[#ede3d0]/70'
                    }`}
                  >
                    <Users className="w-5 h-5 mx-auto text-[#c9a86a] mb-1" />
                    <p className="font-bold text-xs text-[#faf5eb]">Family Table</p>
                    <p className="text-[10px] text-[#ede3d0]/50">Chair & Table</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSeatingStyle('Private Room')}
                    className={`p-3.5 rounded-2xl border text-center transition cursor-pointer ${
                      seatingStyle === 'Private Room'
                        ? 'border-[#c9a86a] bg-[#c9a86a]/15 text-[#faf5eb]'
                        : 'border-white/10 bg-[#0f0d0b] text-[#ede3d0]/70'
                    }`}
                  >
                    <DoorClosed className="w-5 h-5 mx-auto text-[#c9a86a] mb-1" />
                    <p className="font-bold text-xs text-[#faf5eb]">Private Room</p>
                    <p className="text-[10px] text-[#ede3d0]/50">Partitioned Hall</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase block mb-1.5">
                  SPECIAL REQUESTS OR OCCASION
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Birthday, high chair for infant, unsealing pit view"
                  className="w-full bg-[#0f0d0b] border border-white/10 focus:border-[#c9a86a] rounded-2xl px-4 py-3 text-xs text-[#faf5eb] placeholder:text-[#ede3d0]/35 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#e8c99a] via-[#c9a86a] to-[#a6864a] text-[#0f0d0b] font-black text-sm tracking-wider shadow-xl hover:brightness-105 transition disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'CONFIRMING MAJLIS...' : 'CONFIRM RESERVATION'}
              </button>

              <p className="text-center text-[11px] text-[#ede3d0]/50 mt-2">
                🔒 No credit card required • Held for 15 minutes past booking time • Free cancellation
              </p>

            </form>

            {/* My Active Bookings in Local State */}
            {myReservations.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase mb-3">
                  MY RECENT BOOKINGS
                </p>
                <div className="space-y-2">
                  {myReservations.map((r) => (
                    <div
                      key={r.booking_ref}
                      className="flex items-center justify-between bg-[#0f0d0b] border border-[#c9a86a]/20 rounded-2xl p-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#c9a86a]">{r.booking_ref}</span>
                          <span className="text-white font-semibold">• {r.guests_count} Guests</span>
                        </div>
                        <p className="text-[11px] text-[#ede3d0]/60 mt-0.5">
                          {r.reservation_date} at {r.reservation_time} ({r.seating_style})
                        </p>
                      </div>

                      <button
                        onClick={() => handleCancel(r.booking_ref)}
                        className="text-red-400 hover:text-red-300 text-[11px] underline ml-3"
                      >
                        Cancel
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Hospitality Info & Map */}
          <div className="space-y-6">
            
            <div className="bg-[#171310] border border-white/[0.08] rounded-3xl p-7 shadow-xl">
              <h4 className="font-serif text-2xl font-bold text-[#faf5eb]">
                The Traditional Majlis Experience
              </h4>
              <p className="text-xs sm:text-sm text-[#ede3d0]/75 mt-2 leading-relaxed">
                In Yemeni and Arabian culture, sharing Mandi is an act of communal kinship. Sit comfortably on handmade wool carpets and plush armrests, or choose a private dining room for family privacy.
              </p>

              <div className="space-y-3.5 mt-6 text-xs text-[#ede3d0]/80">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#c9a86a]/15 text-[#c9a86a] flex items-center justify-center shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-[#faf5eb] block">Welcome Dallah & Dates</span>
                    <span>Complimentary freshly brewed light cardamom coffee and Medina dates upon arrival.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#c9a86a]/15 text-[#c9a86a] flex items-center justify-center shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-[#faf5eb] block">Grand Brass Tray Presentation</span>
                    <span>Your selected lamb and chicken platter is carried out piping hot straight from the clay pit.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#c9a86a]/15 text-[#c9a86a] flex items-center justify-center shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-[#faf5eb] block">Rosewater Hand Cleansing</span>
                    <span>Warm rosewater washing bowls and sweet mint tea to conclude your feast in royal style.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="bg-gradient-to-r from-emerald-950/40 via-[#171310] to-[#171310] border border-emerald-500/30 rounded-3xl p-6 shadow-xl flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase">
                  DIRECT WHATSAPP CONCIERGE
                </p>
                <p className="font-serif text-lg font-bold text-[#faf5eb] mt-0.5">
                  Have special dietary or large group requests?
                </p>
                <p className="text-xs text-[#ede3d0]/70 mt-1">Our manager responds within 5 minutes.</p>
              </div>

              <a
                href="https://wa.me/97143456789?text=Hello%20Bait%20Al%20Mandi,%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-[#25D366] text-white text-xs font-black shrink-0 hover:scale-105 transition shadow-lg flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Chat Now</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
