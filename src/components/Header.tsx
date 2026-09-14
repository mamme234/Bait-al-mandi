import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Calendar, 
  Phone, 
  MapPin, 
  Globe, 
  Menu as MenuIcon, 
  X, 
  Clock, 
  ChevronDown,
  Search,
  ShieldCheck,
  GitBranch
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenOrderTracker: () => void;
  onOpenConfigStatus: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenOrderTracker, onOpenConfigStatus }) => {
  const { itemCount, setIsCartOpen } = useCart();
  const { isAr, toggleLang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [branchesDropdownOpen, setBranchesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Announcements Bar */}
      <div className="bg-gradient-to-r from-[#17120c] via-[#261b11] to-[#17120c] border-b border-[#c9a86a]/20 text-[12.5px] text-[#ede3d0]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-[#c9a86a]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-emerald-400">Open Now</span>
              <span className="text-[#ede3d0]/60 hidden sm:inline">• 11:30 AM – 11:30 PM (Daily)</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-[#ede3d0]/70">
              <MapPin className="w-3.5 h-3.5 text-[#c9a86a]" />
              <span>Flagship: Jumeirah 1, Wasl Rd • Abu Dhabi • Sharjah</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto text-xs">
            <button
              onClick={onOpenConfigStatus}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-[#c9a86a]/30 text-[#e8c99a] hover:bg-amber-500/20 transition font-medium text-[11px]"
              title="View live backend & integrations status"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#c9a86a]" />
              <span className="hidden sm:inline">System Status</span>
            </button>

            <button
              onClick={onOpenOrderTracker}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#c9a86a]/40 text-[#ede3d0] hover:text-[#c9a86a] transition"
            >
              <Search className="w-3.5 h-3.5 text-[#c9a86a]" />
              <span className="font-medium">Track Order</span>
            </button>

            <a
              href="tel:+97143456789"
              className="hidden lg:flex items-center gap-1.5 text-[#ede3d0] hover:text-[#c9a86a] transition font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#c9a86a]" />
              <span>+971 4 345 6789</span>
            </a>

            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 border border-[#c9a86a]/30 rounded-full px-2.5 py-1 hover:bg-[#c9a86a]/10 text-[#ede3d0] transition font-semibold"
            >
              <Globe className="w-3.5 h-3.5 text-[#c9a86a]" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0f0d0b]/95 backdrop-blur-md shadow-2xl border-b border-[#c9a86a]/20 py-3'
            : 'bg-[#0f0d0b]/85 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a href="#top" className="flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#e8c99a] via-[#c9a86a] to-[#8c6f3a] p-[2px] shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#0f0d0b] flex items-center justify-center font-serif text-2xl text-[#c9a86a] font-bold">
                ب
              </div>
            </div>
            <div className="leading-tight">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#faf5eb] block">
                BAIT AL <span className="text-[#c9a86a] italic">MANDI</span>
              </span>
              <span className="text-[9.5px] sm:text-[10px] tracking-[.3em] text-[#c9a86a]/90 uppercase font-semibold block">
                {isAr ? 'بيت المندي الأصيل • منذ ١٩٩٨' : 'Authentic Yemeni • Since 1998'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-semibold tracking-wider text-[#faf5eb]/85">
            <button onClick={() => scrollTo('about')} className="hover:text-[#c9a86a] transition-colors py-1">
              {isAr ? 'قصتنا' : 'OUR STORY'}
            </button>
            <button onClick={() => scrollTo('menu')} className="hover:text-[#c9a86a] transition-colors py-1">
              {isAr ? 'القائمة' : 'MENU'}
            </button>
            <button onClick={() => scrollTo('gallery')} className="hover:text-[#c9a86a] transition-colors py-1">
              {isAr ? 'المعرض' : 'GALLERY'}
            </button>
            <button onClick={() => scrollTo('catering')} className="hover:text-[#c9a86a] transition-colors py-1">
              {isAr ? 'الولائم والمناسبات' : 'CATERING'}
            </button>
            <button onClick={() => scrollTo('reviews')} className="hover:text-[#c9a86a] transition-colors py-1">
              {isAr ? 'التقييمات' : 'REVIEWS'}
            </button>
            <button onClick={() => scrollTo('branches')} className="hover:text-[#c9a86a] transition-colors py-1">
              {isAr ? 'فروعنا' : 'BRANCHES'}
            </button>
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="flex items-center gap-3">
            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-11 h-11 rounded-full border border-[#c9a86a]/40 bg-[#1d1814] flex items-center justify-center hover:bg-[#c9a86a]/15 transition-all group"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#c9a86a] group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[21px] h-[21px] px-1 rounded-full bg-[#b5452a] text-white text-[11px] font-extrabold flex items-center justify-center shadow-lg animate-bounce">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Book Table / Majlis Button */}
            <button
              onClick={() => scrollTo('reserve')}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[#e8c99a] via-[#c9a86a] to-[#a6864a] text-[#0f0d0b] font-bold text-[13px] tracking-wide px-5 py-2.5 rounded-full hover:shadow-[0_8px_25px_-5px_rgba(201,168,106,.5)] hover:-translate-y-0.5 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>{isAr ? 'احجز المجلس' : 'RESERVE MAJLIS'}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-11 h-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#faf5eb] hover:bg-white/10 transition"
              aria-label="Open mobile menu"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-[360px] bg-[#171310] border-l border-[#c9a86a]/25 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#c9a86a] flex items-center justify-center text-[#0f0d0b] font-serif font-bold text-xl">
                    ب
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#faf5eb]">BAIT AL MANDI</h3>
                    <p className="text-[10px] text-[#c9a86a] tracking-widest uppercase">Since 1998</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[#ede3d0]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4 mt-6 text-base font-serif">
                <button
                  onClick={() => scrollTo('about')}
                  className="text-left py-2 border-b border-white/5 hover:text-[#c9a86a] transition flex justify-between items-center"
                >
                  <span>{isAr ? 'قصتنا' : 'Our Pit Story'}</span>
                  <span className="text-xs text-[#c9a86a]">→</span>
                </button>
                <button
                  onClick={() => scrollTo('menu')}
                  className="text-left py-2 border-b border-white/5 hover:text-[#c9a86a] transition flex justify-between items-center"
                >
                  <span>{isAr ? 'القائمة والأسعار' : 'Full Menu & Prices'}</span>
                  <span className="text-xs text-[#c9a86a]">→</span>
                </button>
                <button
                  onClick={() => scrollTo('gallery')}
                  className="text-left py-2 border-b border-white/5 hover:text-[#c9a86a] transition flex justify-between items-center"
                >
                  <span>{isAr ? 'معرض الصور' : 'Restaurant Gallery'}</span>
                  <span className="text-xs text-[#c9a86a]">→</span>
                </button>
                <button
                  onClick={() => scrollTo('catering')}
                  className="text-left py-2 border-b border-white/5 hover:text-[#c9a86a] transition flex justify-between items-center"
                >
                  <span>{isAr ? 'الولائم والمناسبات' : 'Catering & Feasts'}</span>
                  <span className="text-xs text-[#c9a86a]">→</span>
                </button>
                <button
                  onClick={() => scrollTo('reviews')}
                  className="text-left py-2 border-b border-white/5 hover:text-[#c9a86a] transition flex justify-between items-center"
                >
                  <span>{isAr ? 'تقييمات الضيوف' : 'Guest Reviews'}</span>
                  <span className="text-xs text-[#c9a86a]">→</span>
                </button>
                <button
                  onClick={() => scrollTo('branches')}
                  className="text-left py-2 border-b border-white/5 hover:text-[#c9a86a] transition flex justify-between items-center"
                >
                  <span>{isAr ? 'فروع الإمارات' : 'UAE Branches'}</span>
                  <span className="text-xs text-[#c9a86a]">→</span>
                </button>
              </div>
            </div>

            <div className="pt-6 space-y-3 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollTo('reserve');
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#e8c99a] via-[#c9a86a] to-[#a6864a] text-[#0f0d0b] font-bold text-sm tracking-wide flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{isAr ? 'احجز المجلس الآن' : 'Reserve Majlis Table'}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-3 rounded-full border border-[#c9a86a]/40 text-[#faf5eb] font-semibold text-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#c9a86a]" />
                <span>View Cart ({itemCount} items)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
