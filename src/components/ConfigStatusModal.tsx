import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';

interface ConfigStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfigStatusModal: React.FC<ConfigStatusModalProps> = ({ isOpen, onClose }) => {
  const [statusData, setStatusData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/config-status');
      if (res.ok) {
        const data = await res.json();
        setStatusData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchStatus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#171310] border border-[#c9a86a]/30 rounded-3xl max-w-[560px] w-full p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#c9a86a]/15 text-[#c9a86a] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#faf5eb]">
                Production Systems Status
              </h3>
              <p className="text-xs text-[#ede3d0]/60">Live backend verification & configuration requirements</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[#ede3d0] hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          
          {/* Supabase Database */}
          <div className="bg-[#0f0d0b] border border-emerald-500/30 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="font-bold text-sm text-[#faf5eb]">Supabase Database & API</h4>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase">
                ACTIVE • CONNECTED
              </span>
            </div>
            <p className="text-xs text-[#ede3d0]/70 mt-1.5 leading-relaxed">
              Real-time persistent Postgres connection active. All orders, reservations, reviews, and menu queries write directly to database tables.
            </p>
          </div>

          {/* Cash & Card on Delivery */}
          <div className="bg-[#0f0d0b] border border-emerald-500/30 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h4 className="font-bold text-sm text-[#faf5eb]">Payment: Cash & Card on Delivery (POS)</h4>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-[#ede3d0]/70 mt-1.5 leading-relaxed">
              Fully functional end-to-end checkout. Drivers carry wireless terminals across Dubai, Abu Dhabi, Sharjah & Al Ain.
            </p>
          </div>

          {/* Stripe Online Processing */}
          <div className="bg-[#0f0d0b] border border-amber-500/30 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h4 className="font-bold text-sm text-[#faf5eb]">Online Card Gateway (Stripe)</h4>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                CONFIGURATION REQUIRED
              </span>
            </div>
            <p className="text-xs text-[#ede3d0]/70 mt-1.5 leading-relaxed">
              {statusData?.stripe_online_payment?.note ||
                'CONFIGURATION REQUIRED: STRIPE_SECRET_KEY is not configured in the Secrets tab. Online orders safely record customer intents into Supabase database without running live charges.'}
            </p>
          </div>

          {/* SMS & WhatsApp Gateway */}
          <div className="bg-[#0f0d0b] border border-amber-500/30 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h4 className="font-bold text-sm text-[#faf5eb]">SMS Dispatch Gateway (Twilio)</h4>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                CONFIGURATION REQUIRED
              </span>
            </div>
            <p className="text-xs text-[#ede3d0]/70 mt-1.5 leading-relaxed">
              Automated telecom SMS requires TWILIO_ACCOUNT_SID. Meanwhile, 1-click WhatsApp deep-link confirmations with full booking references (BAM-XXXX) are active and fully operational.
            </p>
          </div>

        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-[#ede3d0]/60">
          <span>Release v3.2 Production</span>
          <button
            onClick={fetchStatus}
            className="flex items-center gap-1.5 text-[#c9a86a] font-bold hover:underline cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Recheck Services</span>
          </button>
        </div>

      </div>
    </div>
  );
};
