import React from 'react';
import { Sparkles } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-b from-[#d9e6f3] via-[#eaf2fa] to-[#f4f7fb] border-b border-gray-200">
      {/* Background Graphic Elements & Roulette Wheel Halo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Central Roulette HUD Graphic */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-40">
          <svg viewBox="0 0 400 400" className="w-full h-full animate-[spin_60s_linear_infinite]">
            <circle cx="200" cy="200" r="180" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="6 8" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="#93c5fd" strokeWidth="1" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="12 12" />
            <circle cx="200" cy="200" r="90" fill="none" stroke="#bfdbfe" strokeWidth="1" />
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = 200 + Math.cos(angle) * 120;
              const y1 = 200 + Math.sin(angle) * 120;
              const x2 = 200 + Math.cos(angle) * 180;
              const y2 = 200 + Math.sin(angle) * 180;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#60a5fa" strokeWidth="1" opacity="0.6" />;
            })}
          </svg>
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-sky-300/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-300/25 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-6 sm:py-9 relative min-h-[220px] sm:min-h-[260px] flex items-center justify-between">
        {/* Left Side: Floating Playing Cards */}
        <div className="relative z-10 hidden sm:block w-1/4">
          <div className="relative h-44 w-full">
            {/* Ace of Clubs Card */}
            <div className="absolute left-4 top-2 w-28 h-40 bg-white rounded-lg shadow-xl border border-gray-200 transform -rotate-15 hover:rotate-0 transition-transform duration-300 p-2.5 flex flex-col justify-between select-none">
              <div className="flex justify-between items-start text-gray-900 font-bold text-lg leading-none">
                <div>
                  A<div className="text-xs">♣</div>
                </div>
                <div className="text-gray-400 text-xs">DEMO</div>
              </div>
              <div className="text-center text-3xl text-gray-800">♣</div>
              <div className="flex justify-between items-end text-gray-900 font-bold text-lg leading-none rotate-180">
                <div>
                  A<div className="text-xs">♣</div>
                </div>
              </div>
            </div>

            {/* King of Spades Card behind */}
            <div className="absolute left-16 top-6 w-28 h-40 bg-gradient-to-br from-blue-900 to-indigo-950 rounded-lg shadow-2xl border border-sky-400/40 transform rotate-12 hover:rotate-6 transition-transform duration-300 p-2.5 flex flex-col justify-between select-none text-sky-200">
              <div className="flex justify-between items-start font-bold text-lg leading-none">
                <div>
                  K<div className="text-xs">♠</div>
                </div>
                <div className="text-sky-400/60 text-[10px]">VIP</div>
              </div>
              <div className="text-center text-2xl text-amber-400 font-serif">♠ 👑</div>
              <div className="flex justify-between items-end font-bold text-lg leading-none rotate-180">
                <div>
                  K<div className="text-xs">♠</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Glowing Futuristic "WELCOME" Branding */}
        <div className="relative z-20 flex-1 text-center py-2">
          <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-xs px-3.5 py-1 rounded-full border border-sky-200 text-sky-700 text-xs font-semibold mb-2 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>頂級旗艦娛樂 · 暢享尊榮體驗</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wider bg-gradient-to-r from-sky-400 via-blue-500 to-sky-300 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(56,189,248,0.4)] uppercase">
            WELCOME
          </h1>

          <div className="flex items-center justify-center space-x-2 mt-1">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-sky-400" />
            <span className="text-xs sm:text-sm font-medium tracking-widest text-sky-800 uppercase">
              Official VIP Gaming Lounge
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-sky-400" />
          </div>
        </div>

        {/* Right Side: Glamorous Casino Live Dealers Artwork */}
        <div className="relative z-10 hidden md:flex items-center justify-end w-1/3 h-52">
          <div className="relative flex items-center justify-center">
            {/* Glowing background card element */}
            <div className="absolute right-6 -top-4 w-24 h-36 bg-white rounded-lg shadow-xl border border-sky-100 rotate-6 p-2 flex flex-col justify-between">
              <div className="font-bold text-red-600 text-sm">
                5<div className="text-[10px]">♥</div>
              </div>
              <div className="text-center text-xl text-red-600">♥</div>
              <div className="font-bold text-red-600 text-sm rotate-180">
                5<div className="text-[10px]">♥</div>
              </div>
            </div>

            {/* Stylized Avatar Model Duo */}
            <div className="relative flex items-center space-x-[-24px]">
              {/* Dealer Model 1 */}
              <div className="relative z-10 w-28 h-44 rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-gradient-to-b from-amber-100 to-amber-200">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                  alt="Live Casino Dealer Blonde"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-1.5">
                  <span className="text-[10px] text-white font-medium bg-black/40 px-1 rounded">真人視訊</span>
                </div>
              </div>

              {/* Dealer Model 2 */}
              <div className="relative z-20 w-32 h-48 rounded-2xl overflow-hidden border-2 border-white shadow-2xl bg-gradient-to-b from-rose-100 to-rose-200">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80"
                  alt="Live Casino Dealer Brunette"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2 justify-between">
                  <span className="text-[10px] text-white font-semibold">美女荷官</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
