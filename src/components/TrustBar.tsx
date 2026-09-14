import React from 'react';
import { Award, CheckCircle2, Truck, Users } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustPoints = [
    {
      icon: <Award className="w-6 h-6 text-[#c9a86a]" />,
      title: 'Michelin Selected',
      subtitle: '2024 • 2025 • 2026'
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-[#c9a86a]" />,
      title: '100% Fresh Halal',
      subtitle: 'Strict daily supply chain'
    },
    {
      icon: <Truck className="w-6 h-6 text-[#c9a86a]" />,
      title: '45-Min Hot Delivery',
      subtitle: 'Insulated thermal clay packaging'
    },
    {
      icon: <Users className="w-6 h-6 text-[#c9a86a]" />,
      title: 'Grand Family Majlis',
      subtitle: 'Authentic floor & private rooms'
    }
  ];

  return (
    <section className="bg-[#120f0c] border-b border-[#c9a86a]/15 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-center gap-3.5 bg-[#1a1511] border border-white/[0.06] rounded-2xl p-4 shadow-sm hover:border-[#c9a86a]/30 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-[#c9a86a]/10 border border-[#c9a86a]/20 flex items-center justify-center shrink-0">
                {point.icon}
              </div>
              <div>
                <p className="font-bold text-sm sm:text-base text-[#faf5eb] leading-tight">{point.title}</p>
                <p className="text-xs text-[#ede3d0]/60 mt-0.5">{point.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
