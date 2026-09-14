import React from 'react';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[#171310] border border-[#c9a86a]/30 rounded-3xl overflow-hidden shadow-2xl z-10">
        
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#faf5eb]">
              The Unsealing Ceremony 🔥
            </h3>
            <p className="text-xs text-[#ede3d0]/60">Filmed inside our Jumeirah 1 flagship live kitchen</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[#ede3d0] hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="aspect-video bg-black flex items-center justify-center relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
            alt="Pit ceremony"
          />
          <div className="relative text-center p-8 z-10">
            <div className="w-20 h-20 rounded-full bg-[#c9a86a] text-[#0f0d0b] flex items-center justify-center text-3xl mx-auto shadow-2xl animate-pulse">
              <Play className="w-8 h-8 ml-1 fill-current" />
            </div>
            <h4 className="mt-4 font-serif text-2xl font-bold text-[#faf5eb]">
              6 Hours Beneath Clay & Embers
            </h4>
            <p className="text-xs text-[#ede3d0]/80 mt-1 max-w-md mx-auto">
              Witness our master pit chefs cracking the dough seal and pulling golden, fall-off-the-bone lamb from the underground tannour.
            </p>
            <span className="inline-block mt-4 text-[11px] font-mono tracking-widest bg-white/10 border border-white/15 px-3 py-1 rounded-full text-[#c9a86a]">
              4K CINEMATIC • 2:14 MIN
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
