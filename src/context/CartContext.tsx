import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, extras?: { name: string; price: number }[]) => void;
  updateQuantity: (index: number, delta: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  orderType: 'delivery' | 'pickup';
  setOrderType: (type: 'delivery' | 'pickup') => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  promoCode: string;
  discountRate: number;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bam_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedBranch, setSelectedBranch] = useState('Jumeirah 1 Flagship');
  const [promoCode, setPromoCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('bam_cart_items', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (dish: MenuItem, quantity = 1, extras: { name: string; price: number }[] = []) => {
    const extrasTotal = extras.reduce((sum, e) => sum + e.price, 0);
    const itemPrice = dish.price + extrasTotal;
    const existingIndex = cart.findIndex(
      (c) => c.id === dish.id && JSON.stringify(c.extras || []) === JSON.stringify(extras)
    );

    if (existingIndex > -1) {
      setCart((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: dish.id,
        name: dish.name + (extras.length ? ` (+${extras.map((e) => e.name).join(', ')})` : ''),
        price: itemPrice,
        image_url: dish.image_url,
        quantity,
        extras
      };
      setCart((prev) => [...prev, newItem]);
    }
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev];
      if (next[index]) {
        next[index].quantity += delta;
        if (next[index].quantity <= 0) {
          next.splice(index, 1);
        }
      }
      return next;
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setDiscountRate(0);
  };

  const applyPromo = (code: string) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'MANDI15' || cleaned === 'MANDI10' || cleaned === 'RAMADAN') {
      const rate = cleaned === 'MANDI15' ? 0.15 : cleaned === 'MANDI10' ? 0.10 : 0.20;
      setPromoCode(cleaned);
      setDiscountRate(rate);
      return { success: true, message: `Promo code ${cleaned} applied (${rate * 100}% OFF)!` };
    }
    return { success: false, message: 'Invalid promo code. Try MANDI15 for 15% discount.' };
  };

  const removePromo = () => {
    setPromoCode('');
    setDiscountRate(0);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cart.length === 0 || orderType === 'pickup' ? 0 : 10;
  const discountAmount = subtotal * discountRate;
  const total = Math.max(0, subtotal + deliveryFee - discountAmount);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        orderType,
        setOrderType,
        selectedBranch,
        setSelectedBranch,
        promoCode,
        discountRate,
        applyPromo,
        removePromo,
        subtotal,
        deliveryFee,
        discountAmount,
        total,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
