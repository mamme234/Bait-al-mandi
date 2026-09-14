import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  isAr: boolean;
  t: (key: string, fallbackEn?: string, fallbackAr?: string) => string;
}

const translations: Record<string, { en: string; ar: string }> = {
  restaurant_name: { en: 'BAIT AL MANDI', ar: 'بيت المندي' },
  subtitle: { en: 'Authentic Yemeni Cuisine Since 1998', ar: 'مطعم ومطبخ بيت المندي الأصيل منذ ١٩٩٨' },
  our_story: { en: 'OUR STORY', ar: 'قصتنا' },
  menu: { en: 'MENU', ar: 'القائمة' },
  gallery: { en: 'GALLERY', ar: 'المعرض' },
  reviews: { en: 'REVIEWS', ar: 'التقييمات' },
  catering: { en: 'CATERING', ar: 'الولائم' },
  visit: { en: 'LOCATIONS', ar: 'الفروع' },
  reserve_table: { en: 'RESERVE TABLE', ar: 'احجز طاولة' },
  cart: { en: 'Cart', ar: 'السلة' },
  delivery: { en: 'Delivery', ar: 'توصيل' },
  pickup: { en: 'Pickup', ar: 'استلام' },
  order_now: { en: 'Order Now', ar: 'اطلب الآن' },
  explore_menu: { en: 'EXPLORE MENU', ar: 'تصفح القائمة' },
  book_majlis: { en: 'BOOK MAJLIS', ar: 'احجز المجلس' },
  track_order: { en: 'Track Order', ar: 'تتبع الطلب' },
  phone: { en: '+971 4 345 6789', ar: '+971 4 345 6789' },
  open_status: { en: 'Open Now • 11:30 – 23:30', ar: 'مفتوح الآن • ١١:٣٠ ص – ١١:٣٠ م' }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    try {
      return (localStorage.getItem('bam_lang') as Language) || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bam_lang', lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    } catch (e) {
      console.error(e);
    }
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key: string, fallbackEn?: string, fallbackAr?: string): string => {
    const item = translations[key];
    if (item) {
      return lang === 'ar' ? item.ar : item.en;
    }
    return lang === 'ar' ? fallbackAr || fallbackEn || key : fallbackEn || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, isAr: lang === 'ar', t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
