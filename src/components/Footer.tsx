import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Instagram, 
  Send, 
  CheckCircle2, 
  ArrowUp, 
  ShieldCheck 
} from 'lucide-react';

interface FooterProps {
  onOpenConfigStatus: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConfigStatus }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#c9a86a]/20 bg-[#0a0806] pt-16 pb-10 text-[#ede3d0]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#e8c99a] to-[#8c6f3a] flex items-center justify-center font-serif text-2xl text-[#0f0d0b] font-bold">
                ب
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-[#faf5eb] tracking-wide">
                  BAIT AL MANDI
                </h4>
                <p className="text-[10px] tracking-[.35em] text-[#c9a86a] uppercase font-bold">
                  SINCE 1998
                </p>
              </div>
            </div>

            <p className="text-xs text-[#ede3d0]/70 mt-4 leading-relaxed">
              The Emirates' most loved Hadrami Yemeni house. 14 branches across Dubai, Abu Dhabi & Sharjah. One underground fire, zero shortcuts.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 hover:border-[#c9a86a] hover:bg-[#c9a86a] hover:text-[#0f0d0b] flex items-center justify-center text-xs transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/97143456789"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white flex items-center justify-center text-xs transition"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-bold tracking-[.3em] text-[#c9a86a] uppercase mb-4">
              EXPLORE
            </p>
            <ul className="space-y-2.5 text-xs text-[#ede3d0]/75">
              <li>
                <a href="#about" className="hover:text-[#c9a86a] transition">Our pit cooking story</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#c9a86a] transition">Full menu & pricing</a>
              </li>
              <li>
                <a href="#catering" className="hover:text-[#c9a86a] transition">Wedding & Eid catering</a>
              </li>
              <li>
                <a href="#reserve" className="hover:text-[#c9a86a] transition">Floor Majlis reservations</a>
              </li>
              <li>
                <a href="#branches" className="hover:text-[#c9a86a] transition">UAE branch locator</a>
              </li>
            </ul>
          </div>

          {/* UAE Branches */}
          <div>
            <p className="text-xs font-bold tracking-[.3em] text-[#c9a86a] uppercase mb-4">
              KEY BRANCHES
            </p>
            <ul className="space-y-2.5 text-xs text-[#ede3d0]/75">
              <li>Jumeirah 1 Flagship, Wasl Rd, Dubai</li>
              <li>Al Barsha 1, near Mall of the Emirates</li>
              <li>Khalifa City, Abu Dhabi</li>
              <li>Al Majaz Waterfront, Sharjah</li>
              <li className="text-[#c9a86a] font-bold">+ 10 more locations in UAE</li>
            </ul>
          </div>

          {/* Newsletter / Discount */}
          <div>
            <p className="text-xs font-bold tracking-[.3em] text-[#c9a86a] uppercase mb-4">
              GET 15% OFF FIRST ORDER
            </p>
            <p className="text-xs text-[#ede3d0]/70 leading-relaxed">
              Join 40,000+ Yemeni cuisine lovers. We will send you exclusive Ramadan & Eid banquet deals.
            </p>

            {subscribed ? (
              <div className="mt-3 p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Code MANDI15 applied to your account!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 mt-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.ae"
                  className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs text-[#faf5eb] placeholder:text-[#ede3d0]/40 outline-none focus:border-[#c9a86a]"
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full bg-[#c9a86a] text-[#0f0d0b] flex items-center justify-center shrink-0 hover:brightness-110 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            <button
              onClick={onOpenConfigStatus}
              className="mt-5 w-full flex items-center justify-center gap-2 border border-dashed border-[#c9a86a]/40 text-[#c9a86a] rounded-2xl py-2.5 text-xs font-bold hover:bg-[#c9a86a]/10 transition cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify Backend Integrations</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#ede3d0]/50">
          <p>© 2026 Bait Al Mandi Restaurants LLC • All Rights Reserved</p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenConfigStatus} className="hover:text-[#c9a86a]">
              Config Status
            </button>
            <span>•</span>
            <span className="text-[#c9a86a]">Production v3.2</span>
            <button
              onClick={scrollToTop}
              className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center hover:border-[#c9a86a] hover:text-[#c9a86a] transition ml-2"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
