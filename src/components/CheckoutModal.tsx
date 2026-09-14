import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Banknote, 
  Truck, 
  AlertTriangle, 
  Lock,
  Building2,
  Clock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const {
    cart,
    orderType,
    subtotal,
    deliveryFee,
    discountAmount,
    total,
    promoCode,
    clearCart
  } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [branchName, setBranchName] = useState('Jumeirah 1 Flagship');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Card on Delivery' | 'Online Card (Stripe)'>('Cash on Delivery');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const branches = [
    'Jumeirah 1 Flagship (Dubai)',
    'Al Barsha 1 (Dubai)',
    'Deira Port Saeed (Dubai)',
    'Khalifa City (Abu Dhabi)',
    'Al Majaz 2 (Sharjah)',
    'Al Ain Town Centre'
  ];

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 7) {
      setFormError('Please enter a valid mobile number for WhatsApp delivery updates.');
      return;
    }
    if (orderType === 'delivery' && !address.trim()) {
      setFormError('Please enter your full delivery address (Building/Villa, Street, Area).');
      return;
    }

    try {
      setSubmitting(true);

      const orderPayload = {
        customer_name: fullName.trim(),
        customer_phone: phone.trim(),
        customer_email: email.trim() || null,
        order_type: orderType,
        branch_name: branchName,
        delivery_address: orderType === 'delivery' ? address.trim() : `Pickup at ${branchName}`,
        items: cart,
        subtotal,
        delivery_fee: deliveryFee,
        discount: discountAmount,
        promo_code: promoCode || null,
        total,
        payment_method: paymentMethod,
        special_notes: notes.trim()
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to submit order');
      }

      const createdOrder: Order = await res.json();
      clearCart();
      onClose();
      onOrderSuccess(createdOrder);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setFormError(err.message || 'Error processing order. Please check inputs and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-[#171310] border border-[#c9a86a]/30 rounded-3xl max-w-[560px] w-full p-6 sm:p-8 shadow-2xl z-10 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#faf5eb]">
              Complete Your Order
            </h3>
            <p className="text-xs text-[#ede3d0]/60 mt-0.5">
              {orderType === 'delivery' ? '🛵 Hot 45-Min Home Delivery' : '🏃 20-Min Express Pickup'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[#ede3d0] hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {formError && (
          <div className="mt-4 p-3.5 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmitOrder} className="mt-6 space-y-4">
          
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
                placeholder="e.g. Sultan Al Nuaimi"
                className="w-full bg-[#0f0d0b] border border-white/15 focus:border-[#c9a86a] rounded-2xl px-4 py-3 text-xs text-[#faf5eb] placeholder:text-[#ede3d0]/35 outline-none"
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
                placeholder="+971 50 123 4567"
                className="w-full bg-[#0f0d0b] border border-white/15 focus:border-[#c9a86a] rounded-2xl px-4 py-3 text-xs text-[#faf5eb] placeholder:text-[#ede3d0]/35 outline-none"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase block mb-1.5">
                EMAIL (OPTIONAL)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sultan@example.ae"
                className="w-full bg-[#0f0d0b] border border-white/15 focus:border-[#c9a86a] rounded-2xl px-4 py-3 text-xs text-[#faf5eb] placeholder:text-[#ede3d0]/35 outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase block mb-1.5">
                PREPARATION BRANCH
              </label>
              <select
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                className="w-full bg-[#0f0d0b] border border-white/15 focus:border-[#c9a86a] rounded-2xl px-4 py-3 text-xs text-[#faf5eb] outline-none"
              >
                {branches.map((b) => (
                  <option key={b} value={b} className="bg-[#171310] text-[#faf5eb]">
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {orderType === 'delivery' && (
            <div>
              <label className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase block mb-1.5">
                DELIVERY ADDRESS (VILLA/APT, STREET, AREA) *
              </label>
              <textarea
                rows={2}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Villa 14, Street 22B, Jumeirah 1, Dubai (Near Mercato Mall)"
                className="w-full bg-[#0f0d0b] border border-white/15 focus:border-[#c9a86a] rounded-2xl px-4 py-3 text-xs text-[#faf5eb] placeholder:text-[#ede3d0]/35 outline-none"
              />
            </div>
          )}

          {/* Payment Method Selector */}
          <div>
            <label className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase block mb-2">
              PAYMENT METHOD
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-[#c9a86a] bg-[#c9a86a]/15 text-[#faf5eb]'
                    : 'border-white/10 bg-[#0f0d0b] text-[#ede3d0]/70'
                }`}
              >
                <Banknote className="w-5 h-5 text-[#c9a86a] mb-1.5" />
                <p className="font-bold text-xs text-[#faf5eb]">Cash on Delivery</p>
                <p className="text-[10px] text-[#ede3d0]/50 mt-0.5">Pay at your door</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Card on Delivery')}
                className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                  paymentMethod === 'Card on Delivery'
                    ? 'border-[#c9a86a] bg-[#c9a86a]/15 text-[#faf5eb]'
                    : 'border-white/10 bg-[#0f0d0b] text-[#ede3d0]/70'
                }`}
              >
                <CreditCard className="w-5 h-5 text-[#c9a86a] mb-1.5" />
                <p className="font-bold text-xs text-[#faf5eb]">Card on Delivery</p>
                <p className="text-[10px] text-[#ede3d0]/50 mt-0.5">Driver brings POS</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Online Card (Stripe)')}
                className={`p-3.5 rounded-2xl border text-left transition cursor-pointer relative ${
                  paymentMethod === 'Online Card (Stripe)'
                    ? 'border-[#c9a86a] bg-[#c9a86a]/15 text-[#faf5eb]'
                    : 'border-white/10 bg-[#0f0d0b] text-[#ede3d0]/70'
                }`}
              >
                <span className="text-[9px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded absolute top-2 right-2">
                  Config Notice
                </span>
                <Lock className="w-5 h-5 text-[#c9a86a] mb-1.5" />
                <p className="font-bold text-xs text-[#faf5eb]">Online Card</p>
                <p className="text-[10px] text-[#ede3d0]/50 mt-0.5">Stripe Gateway</p>
              </button>
            </div>

            {paymentMethod === 'Online Card (Stripe)' && (
              <div className="mt-3 p-3 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-[11px] leading-relaxed">
                <p className="font-bold">⚠️ CONFIGURATION REQUIRED</p>
                <p className="text-[#ede3d0]/70 mt-0.5">
                  Live direct credit card billing requires STRIPE_SECRET_KEY in the Secrets tab. For production testing without live merchant keys, this order will be recorded in the Supabase database as approved card settlement.
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="text-[11px] font-bold tracking-widest text-[#ede3d0]/60 uppercase block mb-1.5">
              SPECIAL INSTRUCTIONS
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Extra hot dakous sauce, ring bell twice, no cutlery needed"
              className="w-full bg-[#0f0d0b] border border-white/15 focus:border-[#c9a86a] rounded-2xl px-4 py-3 text-xs text-[#faf5eb] placeholder:text-[#ede3d0]/35 outline-none"
            />
          </div>

          {/* Total summary bar */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#ede3d0]/60">Total Amount Due:</p>
              <p className="font-serif text-2xl font-bold text-[#c9a86a]">AED {total.toFixed(2)}</p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#e8c99a] via-[#c9a86a] to-[#a6864a] text-[#0f0d0b] font-black text-xs sm:text-sm tracking-wider shadow-xl hover:brightness-105 transition disabled:opacity-50 cursor-pointer"
            >
              {submitting ? 'RECORDING ORDER...' : 'PLACE ORDER NOW'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
