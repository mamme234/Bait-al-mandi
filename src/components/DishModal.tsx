import React, { useState } from 'react';
import { X, Plus, Minus, Check, Flame } from 'lucide-react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';

interface DishModalProps {
  dish: MenuItem | null;
  onClose: () => void;
}

export const DishModal: React.FC<DishModalProps> = ({ dish, onClose }) => {
  const { addToCart, setIsCartOpen } = useCart();
  if (!dish) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<{ name: string; price: number }[]>([]);

  const availableExtras = [
    { name: 'Extra Pit Smoked Lamb Portion', price: 22 },
    { name: 'Extra Golden Saffron Rice', price: 9 },
    { name: 'Yemeni Spicy Dakous & Shafout', price: 5 },
    { name: 'Charred Clay-Pit Vegetables', price: 8 },
    { name: 'Hot Cheese Kunafa Mini Plate', price: 12 },
    { name: 'Cardamom Arabic Karak Tea', price: 6 }
  ];

  const toggleExtra = (extra: { name: string; price: number }) => {
    setSelectedExtras((prev) => {
      const exists = prev.some((e) => e.name === extra.name);
      if (exists) {
        return prev.filter((e) => e.name !== extra.name);
      } else {
        return [...prev, extra];
      }
    });
  };

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const totalCost = (dish.price + extrasTotal) * quantity;

  const handleAdd = () => {
    addToCart(dish, quantity, selectedExtras);
    onClose();
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-[#171310] border border-[#c9a86a]/30 rounded-3xl max-w-[540px] w-full overflow-hidden shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Image */}
        <div className="relative h-64 bg-[#0f0d0b]">
          <img
            src={dish.image_url}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171310] via-transparent to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0f0d0b]/80 backdrop-blur border border-white/20 text-[#ede3d0] flex items-center justify-center hover:bg-[#c9a86a] hover:text-[#0f0d0b] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="absolute bottom-4 left-6 text-xs font-bold uppercase tracking-widest bg-[#c9a86a] text-[#0f0d0b] px-3 py-1 rounded-full shadow">
            {dish.category}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#faf5eb]">
                {dish.name}
              </h3>
              {dish.name_ar && (
                <p className="font-serif text-sm text-[#c9a86a] mt-0.5">{dish.name_ar}</p>
              )}
            </div>
            <p className="font-serif text-2xl font-bold text-[#c9a86a] shrink-0">
              AED {dish.price}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#ede3d0]/75 mt-3 leading-relaxed">
            {dish.description}
          </p>

          {/* Extras Selection */}
          <div className="mt-6">
            <p className="text-[11px] font-bold tracking-widest text-[#ede3d0]/50 uppercase mb-3">
              ADD SIDES & EXTRAS:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availableExtras.map((extra) => {
                const isSelected = selectedExtras.some((e) => e.name === extra.name);
                return (
                  <button
                    key={extra.name}
                    onClick={() => toggleExtra(extra)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold border transition text-left cursor-pointer ${
                      isSelected
                        ? 'border-[#c9a86a] bg-[#c9a86a]/15 text-[#faf5eb]'
                        : 'border-white/10 bg-[#0f0d0b] text-[#ede3d0]/70 hover:border-[#c9a86a]/30'
                    }`}
                  >
                    <span className="truncate pr-1">{extra.name}</span>
                    <span className="text-[#c9a86a] font-bold shrink-0">+AED {extra.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity and Submit Row */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 bg-[#0f0d0b] border border-white/15 rounded-full px-3 py-1.5 shrink-0">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#c9a86a] hover:text-[#0f0d0b] text-[#faf5eb] flex items-center justify-center font-bold transition cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-sm w-6 text-center text-[#faf5eb]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#c9a86a] hover:text-[#0f0d0b] text-[#faf5eb] flex items-center justify-center font-bold transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Submit Add to Order */}
            <button
              onClick={handleAdd}
              className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#e8c99a] via-[#c9a86a] to-[#a6864a] text-[#0f0d0b] font-black text-xs sm:text-sm tracking-wider shadow-lg hover:brightness-110 transition cursor-pointer"
            >
              ADD TO ORDER • AED {totalCost}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
