import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Store,
  Tag,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    orderType,
    setOrderType,
    promoCode,
    applyPromo,
    removePromo,
    subtotal,
    deliveryFee,
    discountAmount,
    total,
    itemCount
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ message: string; success: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoFeedback(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleCheckoutClick = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    onOpenCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Side Drawer */}
      <aside className="absolute right-0 top-0 h-full w-full max-w-[440px] bg-[#171310] border-l border-[#c9a86a]/30 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#faf5eb]">
              Your Order <span className="italic text-[#c9a86a]">سلة الطلب</span>
            </h3>
            <p className="text-xs text-[#ede3d0]/60 mt-0.5">
              Fresh from subterranean clay pits to your dining table
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[#ede3d0] hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Type Selector: Delivery vs Pickup */}
        <div className="px-6 pt-4 pb-2">
          <div className="grid grid-cols-2 gap-2 bg-[#0f0d0b] p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => setOrderType('delivery')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                orderType === 'delivery'
                  ? 'bg-gradient-to-r from-[#e8c99a] to-[#c9a86a] text-[#0f0d0b] shadow'
                  : 'text-[#ede3d0]/70 hover:text-white'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Delivery (~45m)</span>
            </button>
            <button
              onClick={() => setOrderType('pickup')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                orderType === 'pickup'
                  ? 'bg-gradient-to-r from-[#e8c99a] to-[#c9a86a] text-[#0f0d0b] shadow'
                  : 'text-[#ede3d0]/70 hover:text-white'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Pickup (~20m)</span>
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#c9a86a]/10 border border-[#c9a86a]/20 flex items-center justify-center text-3xl mb-4">
                🍲
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#faf5eb]">Your tray is empty</h4>
              <p className="text-xs text-[#ede3d0]/60 mt-1 max-w-[240px] mx-auto">
                The fire pit is roaring! Add some royal mandi or honey madhbi to begin.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-6 px-7 py-3 rounded-full bg-gradient-to-r from-[#e8c99a] to-[#c9a86a] text-[#0f0d0b] font-bold text-xs tracking-wider cursor-pointer"
              >
                BROWSE MENU
              </button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex gap-3 bg-[#0f0d0b] border border-white/[0.08] rounded-2xl p-3 shadow-sm"
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/5"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h5 className="font-bold text-xs sm:text-sm text-[#faf5eb] leading-tight truncate">
                      {item.name}
                    </h5>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-[#ede3d0]/40 hover:text-red-400 p-0.5 transition cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs font-bold text-[#c9a86a] mt-0.5">
                    AED {item.price}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 bg-white/5 rounded-full px-2 py-0.5 border border-white/10">
                      <button
                        onClick={() => updateQuantity(index, -1)}
                        className="w-5 h-5 rounded-full hover:bg-white/10 text-[#ede3d0] flex items-center justify-center font-bold text-xs transition cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center text-[#faf5eb]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(index, 1)}
                        className="w-5 h-5 rounded-full hover:bg-white/10 text-[#ede3d0] flex items-center justify-center font-bold text-xs transition cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-bold text-xs text-[#faf5eb]">
                      AED {(item.price * item.quantity).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Billing Details */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#120f0c] space-y-4">
            
            {/* Promo Code Input */}
            <div className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ede3d0]/40" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Try promo: MANDI15"
                    className="w-full bg-[#0f0d0b] border border-white/15 focus:border-[#c9a86a] rounded-full pl-10 pr-3 py-2 text-xs text-[#faf5eb] placeholder:text-[#ede3d0]/40 outline-none uppercase font-mono"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-5 py-2 rounded-full border border-[#c9a86a]/40 hover:border-[#c9a86a] text-[#c9a86a] text-xs font-bold transition cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {promoFeedback && (
                <p
                  className={`text-[11px] font-semibold flex items-center gap-1.5 ${
                    promoFeedback.success ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {promoFeedback.success ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5" />
                  )}
                  <span>{promoFeedback.message}</span>
                </p>
              )}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-1.5 text-xs text-[#ede3d0]/75">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} items)</span>
                <span className="text-[#faf5eb] font-semibold">AED {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="text-[#faf5eb] font-semibold">
                  {orderType === 'pickup' ? 'FREE' : `AED ${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Discount ({promoCode})</span>
                  <span>-AED {discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-baseline pt-2 border-t border-white/10 font-serif text-xl sm:text-2xl font-bold text-[#faf5eb]">
                <span>Total</span>
                <span className="text-[#c9a86a]">AED {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={handleCheckoutClick}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#e8c99a] via-[#c9a86a] to-[#a6864a] text-[#0f0d0b] font-black text-sm tracking-wider shadow-xl hover:brightness-105 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>PROCEED TO CHECKOUT • AED {total.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </aside>
    </div>
  );
};
