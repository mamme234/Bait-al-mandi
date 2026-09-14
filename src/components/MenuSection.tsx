import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Flame, 
  Leaf, 
  Star, 
  Plus, 
  Clock, 
  Sparkles,
  ShoppingBag,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface MenuSectionProps {
  onOpenDishModal: (dish: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onOpenDishModal }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { isAr } = useLanguage();

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeDiet, setActiveDiet] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fridayTimer, setFridayTimer] = useState('06:14:38');

  const categories = [
    'All',
    'Mandi',
    'Madhbi',
    'Kabsa & More',
    'Grill',
    'Starters',
    'Desserts',
    'Drinks'
  ];

  // Fetch Menu from API route
  const fetchMenu = async () => {
    try {
      setLoading(true);
      const url = new URL('/api/menu', window.location.origin);
      if (activeCategory !== 'All') url.searchParams.set('category', activeCategory);
      if (activeDiet !== 'all') url.searchParams.set('diet', activeDiet);
      if (searchQuery.trim()) url.searchParams.set('search', searchQuery.trim());

      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setMenuItems(data);
      }
    } catch (err) {
      console.error('Failed to fetch menu:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [activeCategory, activeDiet]);

  // Handle live search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMenu();
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Friday family tray countdown timer
  useEffect(() => {
    let secs = 6 * 3600 + 14 * 60 + 38;
    const interval = setInterval(() => {
      secs = Math.max(0, secs - 1);
      const h = String(Math.floor(secs / 3600)).padStart(2, '0');
      const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
      const s = String(secs % 60).padStart(2, '0');
      setFridayTimer(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickAdd = (e: React.MouseEvent, dish: MenuItem) => {
    e.stopPropagation();
    addToCart(dish, 1);
  };

  const handleAddCombo = (name: string, price: number, image: string, cat: string) => {
    const comboDish: MenuItem = {
      id: Date.now(),
      name,
      price,
      description: 'Special chef combination platter with complimentary drinks.',
      image_url: image,
      category: cat,
      is_spicy: false,
      is_vegetarian: false,
      tags: ['special']
    };
    addToCart(comboDish, 1);
    setIsCartOpen(true);
  };

  return (
    <section id="menu" className="py-20 lg:py-28 bg-[#120f0c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[#c9a86a] text-xs font-bold tracking-[.3em] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE ROYAL MENU • قائمة الطعام</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#faf5eb] leading-tight">
            Eat like <span className="italic bg-gradient-to-r from-[#f5e6c8] via-[#c9a86a] to-[#e8c99a] bg-clip-text text-transparent">royalty</span>, pay like family
          </h2>
          <p className="text-sm sm:text-base text-[#ede3d0]/70 mt-3">
            All meat & poultry is slow-cooked fresh daily in our traditional pits. All single platters serve 1–2. Family trays serve 4–6.
          </p>
        </div>

        {/* Filter Controls Box */}
        <div className="bg-[#171310] border border-[#c9a86a]/25 rounded-3xl p-5 sm:p-7 shadow-2xl mb-8">
          
          {/* Top row: Categories + Search bar */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between pb-5 border-b border-white/10">
            {/* Category tabs */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-[#e8c99a] to-[#c9a86a] text-[#0f0d0b] shadow-md font-extrabold'
                      : 'border border-white/10 text-[#ede3d0]/75 hover:border-[#c9a86a]/40 hover:text-[#faf5eb]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-[280px]">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#ede3d0]/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mandi, madhbi, kunafa..."
                className="w-full bg-[#0f0d0b] border border-white/10 focus:border-[#c9a86a] rounded-full pl-11 pr-4 py-2.5 text-xs text-[#faf5eb] placeholder:text-[#ede3d0]/40 outline-none transition"
              />
            </div>
          </div>

          {/* Bottom row: Dietary pills + Count */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#ede3d0]/50 font-bold tracking-wider uppercase text-[11px] mr-1">
                FILTER:
              </span>
              <button
                onClick={() => setActiveDiet('all')}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition cursor-pointer ${
                  activeDiet === 'all'
                    ? 'bg-[#c9a86a] text-[#0f0d0b]'
                    : 'border border-white/10 text-[#ede3d0]/70 hover:border-[#c9a86a]/30'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveDiet('bestseller')}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition flex items-center gap-1 cursor-pointer ${
                  activeDiet === 'bestseller'
                    ? 'bg-[#c9a86a] text-[#0f0d0b]'
                    : 'border border-white/10 text-[#ede3d0]/70 hover:border-[#c9a86a]/30'
                }`}
              >
                <Star className="w-3 h-3 fill-current" /> Bestsellers
              </button>
              <button
                onClick={() => setActiveDiet('spicy')}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition flex items-center gap-1 cursor-pointer ${
                  activeDiet === 'spicy'
                    ? 'bg-[#c9a86a] text-[#0f0d0b]'
                    : 'border border-white/10 text-[#ede3d0]/70 hover:border-[#c9a86a]/30'
                }`}
              >
                🌶️ Spicy
              </button>
              <button
                onClick={() => setActiveDiet('veg')}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition flex items-center gap-1 cursor-pointer ${
                  activeDiet === 'veg'
                    ? 'bg-[#c9a86a] text-[#0f0d0b]'
                    : 'border border-white/10 text-[#ede3d0]/70 hover:border-[#c9a86a]/30'
                }`}
              >
                🌱 Vegetarian
              </button>
            </div>

            <span className="text-xs text-[#ede3d0]/60 font-medium">
              Showing {menuItems.length} dish{menuItems.length !== 1 ? 'es' : ''}
            </span>
          </div>

        </div>

        {/* Menu Cards Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-[#171310] border border-white/5 rounded-3xl p-4 animate-pulse">
                <div className="w-full h-52 bg-white/5 rounded-2xl mb-4" />
                <div className="h-6 bg-white/10 rounded w-2/3 mb-2" />
                <div className="h-4 bg-white/5 rounded w-full mb-4" />
                <div className="h-10 bg-white/10 rounded-full" />
              </div>
            ))}
          </div>
        ) : menuItems.length === 0 ? (
          <div className="text-center py-16 bg-[#171310] border border-white/5 rounded-3xl p-8">
            <p className="font-serif text-3xl text-[#ede3d0]/70">No dishes match your selection.</p>
            <p className="text-xs text-[#ede3d0]/50 mt-2">Try clearing your search or switching categories.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setActiveDiet('all');
                setSearchQuery('');
              }}
              className="mt-5 px-6 py-2.5 rounded-full bg-[#c9a86a] text-[#0f0d0b] text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((dish) => (
              <div
                key={dish.id}
                onClick={() => onOpenDishModal(dish)}
                className="group bg-[#171310] border border-white/[0.08] hover:border-[#c9a86a]/50 rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer"
              >
                {/* Dish Image */}
                <div className="relative h-56 overflow-hidden bg-[#0f0d0b]">
                  <img
                    src={dish.image_url}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171310] via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {Array.isArray(dish.tags) && dish.tags.includes('bestseller') && (
                      <span className="text-[10px] font-extrabold bg-[#c9a86a] text-[#0f0d0b] px-3 py-1 rounded-full uppercase tracking-wider shadow">
                        ★ BESTSELLER
                      </span>
                    )}
                    {dish.is_vegetarian && (
                      <span className="text-[10px] font-extrabold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        VEG
                      </span>
                    )}
                    {dish.is_spicy && (
                      <span className="text-[10px] font-extrabold bg-[#b5452a] text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        SPICY
                      </span>
                    )}
                  </div>

                  {/* Category badge */}
                  <span className="absolute bottom-3 right-3 text-[11px] font-semibold bg-[#0f0d0b]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[#ede3d0]">
                    {dish.category}
                  </span>
                </div>

                {/* Dish Info */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#faf5eb] group-hover:text-[#c9a86a] transition-colors leading-tight">
                        {dish.name}
                      </h3>
                      {dish.name_ar && (
                        <p className="font-serif text-xs text-[#c9a86a] mt-0.5">{dish.name_ar}</p>
                      )}
                    </div>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#c9a86a] shrink-0">
                      AED {dish.price}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#ede3d0]/70 mt-2 leading-relaxed flex-1 line-clamp-2">
                    {dish.description}
                  </p>

                  {/* Bottom Action Buttons */}
                  <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDishModal(dish);
                      }}
                      className="flex-1 py-2.5 rounded-full border border-white/15 hover:border-[#c9a86a]/40 text-xs font-bold text-[#ede3d0] transition text-center"
                    >
                      Customize
                    </button>
                    <button
                      onClick={(e) => handleQuickAdd(e, dish)}
                      className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#e8c99a] via-[#c9a86a] to-[#a6864a] hover:brightness-110 text-[#0f0d0b] text-xs font-black shadow-md transition text-center flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>ADD • AED {dish.price}</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Special Combination Offer Banners */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {/* Family Tray Banner */}
          <div className="relative overflow-hidden rounded-3xl border border-[#b5452a]/40 bg-gradient-to-br from-[#2a130f] via-[#1a0e0b] to-[#120a08] p-7 sm:p-9 shadow-2xl">
            <div className="absolute -right-8 -top-8 w-52 h-52 bg-[#b5452a]/20 blur-3xl rounded-full" />
            <div className="flex items-center gap-2 text-orange-400 text-xs font-extrabold tracking-widest uppercase">
              <Flame className="w-4 h-4" />
              <span>FRIDAY GRAND FAMILY TRAY • SAVE 25%</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#faf5eb] mt-2">
              Whole Lamb Shoulder + 2 Saffron Rice + Dakous + Drinks
            </h3>
            <p className="text-xs sm:text-sm text-[#ede3d0]/75 mt-2">
              Feeds 5 to 6 persons. Served on grand brass majlis tray with complimentary dessert.
            </p>
            <div className="flex items-baseline gap-3 mt-4">
              <span className="font-serif text-3xl font-bold text-[#c9a86a]">AED 189</span>
              <span className="text-base text-[#ede3d0]/40 line-through">AED 252</span>
              <span className="text-xs text-orange-300 font-bold ml-auto flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Ends in {fridayTimer}
              </span>
            </div>
            <button
              onClick={() =>
                handleAddCombo(
                  'Friday Grand Family Tray (Whole Lamb Shoulder)',
                  189,
                  'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
                  'Mandi'
                )
              }
              className="mt-5 w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-orange-400 to-[#b5452a] text-white font-extrabold text-xs tracking-wider shadow-lg hover:brightness-110 transition"
            >
              ORDER FRIDAY FAMILY TRAY
            </button>
          </div>

          {/* Business Lunch Deal Banner */}
          <div className="relative overflow-hidden rounded-3xl border border-[#c9a86a]/30 bg-gradient-to-br from-[#231a0e] via-[#171109] to-[#0f0d0a] p-7 sm:p-9 shadow-2xl">
            <div className="absolute -left-8 -bottom-8 w-52 h-52 bg-[#c9a86a]/15 blur-3xl rounded-full" />
            <div className="flex items-center gap-2 text-[#c9a86a] text-xs font-extrabold tracking-widest uppercase">
              <Sparkles className="w-4 h-4" />
              <span>BUSINESS MAJLIS LUNCH • 12 PM – 4 PM</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#faf5eb] mt-2">
              Chicken Mandi + Lentil Shorba + Hot Kunafa Plate
            </h3>
            <p className="text-xs sm:text-sm text-[#ede3d0]/75 mt-2">
              The favorite quick corporate meal across Dubai. Ready in 15 minutes dine-in or fast delivery.
            </p>
            <div className="flex items-baseline gap-3 mt-4">
              <span className="font-serif text-3xl font-bold text-[#c9a86a]">AED 45</span>
              <span className="text-base text-[#ede3d0]/40 line-through">AED 68</span>
              <span className="text-xs text-[#c9a86a] font-bold ml-auto">
                Sun to Thu Only
              </span>
            </div>
            <div className="flex flex-wrap gap-3 mt-5">
              <button
                onClick={() =>
                  handleAddCombo(
                    'Business Lunch (Chicken Mandi + Shorba + Kunafa)',
                    45,
                    'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=600&auto=format&fit=crop',
                    'Mandi'
                  )
                }
                className="px-7 py-3 rounded-full bg-gradient-to-r from-[#e8c99a] to-[#c9a86a] text-[#0f0d0b] font-extrabold text-xs tracking-wider shadow-lg hover:brightness-110 transition"
              >
                ORDER LUNCH COMBO
              </button>
              <a
                href="#reserve"
                className="px-6 py-3 rounded-full border border-white/15 text-[#ede3d0] font-bold text-xs hover:border-[#c9a86a] transition"
              >
                Book Lunch Table
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
