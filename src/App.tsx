import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { AboutSection } from './components/AboutSection';
import { PitMethod } from './components/PitMethod';
import { MenuSection } from './components/MenuSection';
import { DishModal } from './components/DishModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ReservationSection } from './components/ReservationSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { CateringSection } from './components/CateringSection';
import { BranchesSection } from './components/BranchesSection';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { ConfigStatusModal } from './components/ConfigStatusModal';
import { VideoModal } from './components/VideoModal';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import { MenuItem, Order, Reservation } from './types';

export function App() {
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isConfigStatusOpen, setIsConfigStatusOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const handleOrderConfirmed = (order: Order) => {
    setActiveOrder(order);
    setIsOrderTrackerOpen(true);
  };

  const handleReservationConfirmed = (res: Reservation) => {
    // optional confirmation toast or tracking
  };

  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#0f0d0b] text-[#faf5eb] selection:bg-[#c9a86a] selection:text-[#0f0d0b]">
          
          {/* Main Top Header Navigation */}
          <Header
            onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
            onOpenConfigStatus={() => setIsConfigStatusOpen(true)}
          />

          <main id="top">
            {/* Hero Banner with Pit Story & Live Dish */}
            <Hero onOpenVideo={() => setIsVideoOpen(true)} />

            {/* Michelin / Halal / Delivery Trust Highlights */}
            <TrustBar />

            {/* Our Story & Hadrami Heritage */}
            <AboutSection />

            {/* The Underground Pit Clay Method */}
            <PitMethod onOpenVideo={() => setIsVideoOpen(true)} />

            {/* Real Interactive Menu with filters & add to order */}
            <MenuSection onOpenDishModal={(dish) => setSelectedDish(dish)} />

            {/* Table & Traditional Majlis Booking */}
            <ReservationSection onReservationConfirmed={handleReservationConfirmed} />

            {/* Gallery of Dishes, Interior, & Pit Flame */}
            <GallerySection />

            {/* Guest Reviews & Submission */}
            <ReviewsSection />

            {/* Catering & Feast Inquiries */}
            <CateringSection />

            {/* UAE Branches & Interactive Map */}
            <BranchesSection />
          </main>

          {/* Footer */}
          <Footer onOpenConfigStatus={() => setIsConfigStatusOpen(true)} />

          {/* Modals & Slide-out Drawers */}
          <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
          <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />
          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            onOrderSuccess={handleOrderConfirmed}
          />
          <OrderTrackerModal
            isOpen={isOrderTrackerOpen}
            onClose={() => setIsOrderTrackerOpen(false)}
            initialOrder={activeOrder}
          />
          <ConfigStatusModal
            isOpen={isConfigStatusOpen}
            onClose={() => setIsConfigStatusOpen(false)}
          />
          <VideoModal
            isOpen={isVideoOpen}
            onClose={() => setIsVideoOpen(false)}
          />

        </div>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
