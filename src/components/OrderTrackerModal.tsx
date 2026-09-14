import React, { useState } from 'react';
import { Search, X, CheckCircle2, Clock, AlertTriangle, Truck, Flame } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrder?: Order | null;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  initialOrder
}) => {
  const [query, setQuery] = useState(initialOrder?.order_number || '');
  const [order, setOrder] = useState<Order | null>(initialOrder || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError('');
      const cleaned = query.trim().toUpperCase();
      const res = await fetch(`/api/orders?order_number=${encodeURIComponent(cleaned)}`);
      if (!res.ok) throw new Error('Order lookup failed');
      const data = await res.json();
      if (Array.isArray(data) && data.length) {
        setOrder(data[0]);
      } else {
        // try phone lookup
        const resPhone = await fetch(`/api/orders?phone=${encodeURIComponent(query.trim())}`);
        const dataPhone = await resPhone.json();
        if (Array.isArray(dataPhone) && dataPhone.length) {
          setOrder(dataPhone[0]);
        } else {
          setError(`No order found matching "${query}". Please check your order number (e.g. BAM-1234) or phone number.`);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Error tracking order.');
    } finally {
      setLoading(false);
    }
  };

  const stages = [
    { label: 'Received', done: true },
    { label: 'In Underground Pit', done: order?.status !== 'Cancelled' },
    { label: 'Out with Driver', done: order?.status === 'Out for Delivery' || order?.status === 'Delivered' },
    { label: 'Delivered', done: order?.status === 'Delivered' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#171310] border border-[#c9a86a]/30 rounded-3xl max-w-[500px] w-full p-6 sm:p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#faf5eb]">
              Track Your Mandi
            </h3>
            <p className="text-xs text-[#ede3d0]/60 mt-0.5">Real-time status directly from our clay pit</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[#ede3d0] hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lookup Bar */}
        <form onSubmit={handleTrack} className="mt-5 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Order # (e.g. BAM-4921) or phone"
            className="flex-1 bg-[#0f0d0b] border border-white/15 focus:border-[#c9a86a] rounded-2xl px-4 py-2.5 text-xs text-[#faf5eb] placeholder:text-[#ede3d0]/40 outline-none uppercase font-mono"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#e8c99a] to-[#c9a86a] text-[#0f0d0b] font-bold text-xs shrink-0 cursor-pointer"
          >
            {loading ? 'Searching...' : 'Track'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Order Details Preview */}
        {order && (
          <div className="mt-6 space-y-4">
            <div className="bg-[#0f0d0b] border border-[#c9a86a]/20 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#c9a86a] uppercase tracking-wider">
                    ORDER NUMBER
                  </span>
                  <p className="font-mono text-xl font-bold text-[#faf5eb]">{order.order_number}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {order.status || 'Preparing in Pit'}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between text-[11px] font-bold text-[#ede3d0]/75 mb-1.5">
                  <span>Order Placed</span>
                  <span>Pit Cooking</span>
                  <span>Delivered</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#e8c99a] to-[#c9a86a] transition-all duration-1000"
                    style={{
                      width:
                        order.status === 'Delivered'
                          ? '100%'
                          : order.status === 'Out for Delivery'
                          ? '75%'
                          : '45%'
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 text-xs text-[#ede3d0]/75 space-y-1">
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <span className="text-[#faf5eb] font-semibold">{order.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Branch:</span>
                  <span className="text-[#faf5eb]">{order.branch_name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="text-[#c9a86a] font-bold">AED {order.total}</span>
                </div>
              </div>
            </div>

            <p className="text-center text-[11px] text-[#ede3d0]/50">
              Need immediate driver update? Call{' '}
              <a href="tel:+97143456789" className="text-[#c9a86a] font-bold underline">
                +971 4 345 6789
              </a>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
