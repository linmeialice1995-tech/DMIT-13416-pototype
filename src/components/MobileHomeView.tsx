import React, { useState } from 'react';
import {
  Menu,
  Volume2,
  RefreshCw,
  Crown,
  Wallet,
  HandCoins,
  Coins,
  ChevronUp,
  Wifi,
  Home,
  CircleDollarSign,
  Gift,
  Headphones,
  User,
  Gamepad2,
  Fish,
  Flame,
  Trophy,
  Dices,
  Ticket,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Play,
  X
} from 'lucide-react';
import { SidebarMenuKey, UserProfile, MainNavTab, GameItem } from '../types';

interface MobileHomeViewProps {
  user: UserProfile;
  games: GameItem[];
  onSelectMenu: (menu: SidebarMenuKey) => void;
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onOpenCustomerService: () => void;
  onRefreshBalance: () => void;
  isRefreshing: boolean;
  onSelectNavTab: (tab: MainNavTab) => void;
  currentNavTab: MainNavTab;
  onLaunchGame: (game: GameItem) => void;
  onSwitchToMemberCenter: () => void;
}

export const MobileHomeView: React.FC<MobileHomeViewProps> = ({
  user,
  games,
  onSelectMenu,
  onOpenDeposit,
  onOpenWithdraw,
  onOpenCustomerService,
  onRefreshBalance,
  isRefreshing,
  onSelectNavTab,
  currentNavTab,
  onLaunchGame,
  onSwitchToMemberCenter,
}) => {
  const [selectedGameTab, setSelectedGameTab] = useState<'cards' | 'slots' | 'fishing' | 'live' | 'sports' | 'lottery'>('cards');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Mascot Cartoon SVG Illustration Banner (Chiikawa & Friends)
  const MascotBanner = () => (
    <div className="w-24 h-11 relative flex items-center justify-center overflow-hidden rounded bg-[#d8f0d8] border border-amber-300 shadow-inner px-1">
      <div className="absolute inset-0 bg-gradient-to-b from-[#bfe8ff] via-[#d4f6d4] to-[#c2eec2] opacity-80" />
      <svg viewBox="0 0 100 50" className="w-full h-full relative z-10">
        <g transform="translate(14, 12) scale(0.65)">
          <ellipse cx="20" cy="22" rx="16" ry="14" fill="#ffffff" stroke="#2c2c2c" strokeWidth="1.5" />
          <path d="M7 14 C7 7, 13 8, 16 11" fill="#78b9ec" stroke="#2c2c2c" strokeWidth="1.2" />
          <path d="M33 14 C33 7, 27 8, 24 11" fill="#78b9ec" stroke="#2c2c2c" strokeWidth="1.2" />
          <circle cx="14" cy="20" r="2.2" fill="#2c2c2c" />
          <circle cx="26" cy="20" r="2.2" fill="#2c2c2c" />
          <circle cx="15" cy="19.2" r="0.7" fill="#fff" />
          <circle cx="27" cy="19.2" r="0.7" fill="#fff" />
          <ellipse cx="11" cy="23" rx="2.5" ry="1.5" fill="#ffb4b4" />
          <ellipse cx="29" cy="23" rx="2.5" ry="1.5" fill="#ffb4b4" />
          <path d="M18 24 Q20 26 22 24" fill="none" stroke="#2c2c2c" strokeWidth="1.2" strokeLinecap="round" />
        </g>
        <g transform="translate(36, 6) scale(0.8)">
          <ellipse cx="20" cy="22" rx="17" ry="15" fill="#ffffff" stroke="#2c2c2c" strokeWidth="1.5" />
          <circle cx="7" cy="10" r="4.5" fill="#ffffff" stroke="#2c2c2c" strokeWidth="1.2" />
          <circle cx="33" cy="10" r="4.5" fill="#ffffff" stroke="#2c2c2c" strokeWidth="1.2" />
          <circle cx="7" cy="10" r="2.5" fill="#ffe3e3" />
          <circle cx="33" cy="10" r="2.5" fill="#ffe3e3" />
          <path d="M13 19 Q16 16 19 19" fill="none" stroke="#2c2c2c" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M21 19 Q24 16 27 19" fill="none" stroke="#2c2c2c" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="12" cy="23" rx="3" ry="1.8" fill="#ff9999" />
          <ellipse cx="28" cy="23" rx="3" ry="1.8" fill="#ff9999" />
          <path d="M17 24 Q20 22 20 24 Q20 22 23 24" fill="none" stroke="#2c2c2c" strokeWidth="1.3" strokeLinecap="round" />
        </g>
        <g transform="translate(62, 10) scale(0.65)">
          <ellipse cx="20" cy="24" rx="16" ry="14" fill="#fff7cc" stroke="#2c2c2c" strokeWidth="1.5" />
          <path d="M11 12 C10 0, 16 0, 16 12" fill="#fff7cc" stroke="#2c2c2c" strokeWidth="1.2" />
          <path d="M29 12 C30 0, 24 0, 24 12" fill="#fff7cc" stroke="#2c2c2c" strokeWidth="1.2" />
          <ellipse cx="13.5" cy="6" rx="1.5" ry="4" fill="#ffcccc" />
          <ellipse cx="26.5" cy="6" rx="1.5" ry="4" fill="#ffcccc" />
          <circle cx="15" cy="22" r="2.2" fill="#2c2c2c" />
          <circle cx="25" cy="22" r="2.2" fill="#2c2c2c" />
          <circle cx="15.8" cy="21.2" r="0.7" fill="#fff" />
          <circle cx="25.8" cy="21.2" r="0.7" fill="#fff" />
          <ellipse cx="12" cy="25" rx="2.5" ry="1.5" fill="#ffb4b4" />
          <ellipse cx="28" cy="25" rx="2.5" ry="1.5" fill="#ffb4b4" />
          <ellipse cx="20" cy="26" rx="2.5" ry="2" fill="#e75c5c" />
        </g>
      </svg>
    </div>
  );

  // 6 Game category tabs for the second row
  const categoryTabs = [
    {
      key: 'cards',
      label: '棋牌',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5 0 1.58-1.06 2.9-2.5 3.32v1.68h2v2h-2v2h-2v-2h-2v-2h2v-1.68C9.56 12.4 8.5 11.08 8.5 9.5 8.5 7.57 10.07 6 12 6z" />
        </svg>
      ),
    },
    {
      key: 'slots',
      label: '电子',
      icon: <Gamepad2 className="w-5 h-5" />,
    },
    {
      key: 'fishing',
      label: '捕鱼',
      icon: <Fish className="w-5 h-5" />,
    },
    {
      key: 'live',
      label: '真人',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 2C9.24 2 7 4.24 7 7c0 2.85 2.92 7.21 5 9.88 2.11-2.69 5-7.05 5-9.88 0-2.76-2.24-5-5-5zm-2 15h4v3h2v2H8v-2h2v-3z" />
        </svg>
      ),
    },
    {
      key: 'sports',
      label: '体育',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <polygon points="12,7 15,10 14,14 10,14 9,10" fill="currentColor" />
        </svg>
      ),
    },
    {
      key: 'lottery',
      label: '彩票',
      icon: <Ticket className="w-5 h-5" />,
    },
  ];

  // Specific Game Cards shown in the screenshot for 棋牌 (Card Games)
  const cardGameCards = [
    {
      id: 'ftg-card',
      title: 'FTG 棋牌',
      subText: 'Có Vua FTG',
      bgGradient: 'from-[#880a13] to-[#450207]',
      logoImg: 'FTG',
      badge: 'CARD GAMES',
      charImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      flame: false,
    },
    {
      id: 'km-card',
      title: 'KM 棋牌',
      subText: 'Điện tử KM',
      bgGradient: 'from-[#880a13] to-[#450207]',
      logoImg: 'KM',
      badge: 'SLOT MACHINE',
      charImg: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80',
      flame: true,
    },
    {
      id: 'tp-card',
      title: 'TP 棋牌',
      subText: 'Có Vua TP',
      bgGradient: 'from-[#880a13] to-[#450207]',
      logoImg: 'TP',
      badge: 'CARD GAMES',
      charImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      flame: false,
    },
    {
      id: 'r88-card',
      title: 'R88 棋牌',
      subText: '',
      bgGradient: 'from-[#880a13] to-[#450207]',
      logoImg: 'R88',
      badge: 'CARD GAMES',
      wheel: true,
      flame: true,
    },
    {
      id: 'jdb-card',
      title: 'JDB 棋牌',
      subText: 'JDB Gaming',
      bgGradient: 'from-[#880a13] to-[#450207]',
      logoImg: 'JDB',
      badge: 'CARD GAMES',
      charImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      flame: true,
    },
    {
      id: 'v8-card',
      title: 'V8 棋牌',
      subText: 'V8 Poker',
      bgGradient: 'from-[#880a13] to-[#450207]',
      logoImg: 'V8',
      badge: 'CARD GAMES',
      charImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      flame: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#350101] text-white flex flex-col font-sans select-none pb-16 relative">
      {/* 1. Top Header Bar */}
      <header className="w-full bg-[#1b0000] px-3 py-2 flex items-center justify-between border-b border-[#300000] sticky top-0 z-30">
        {/* Left: Hamburger menu */}
        <button
          id="btn-mobile-home-menu"
          onClick={() => setIsDrawerOpen(true)}
          className="p-1 text-white hover:text-amber-400 transition-colors cursor-pointer"
          title="開啟選單"
        >
          <Menu className="w-7 h-7 stroke-[2.2]" />
        </button>

        {/* Center: Mascot Banner */}
        <div className="cursor-pointer">
          <MascotBanner />
        </div>

        {/* Right: Domain name text */}
        <div className="text-right leading-tight">
          <div className="text-[12px] font-bold text-white">易记域名</div>
          <div className="text-[11px] text-gray-200 tracking-tight font-mono">qqqqa2.com域名</div>
        </div>
      </header>

      {/* 2. Tournament Hero Banner (BNG BIG HEIST 240,000) */}
      <div className="w-full relative overflow-hidden bg-gradient-to-b from-[#18001e] via-[#2d0538] to-[#12001a] border-b border-black">
        {/* Visual Graphic Banner Container */}
        <div className="relative w-full h-44 sm:h-52 flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4a0b63] via-[#240033] to-[#0d0014]">
          {/* Spotlight laser rays in the background */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_#e066ff_0%,_transparent_70%)] pointer-events-none" />
          
          {/* Top Gold Game Logo */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="flex items-center space-x-1">
              <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-[9px] tracking-wider text-amber-300 font-black">BNG PLAY</span>
            </div>
          </div>

          {/* Characters on left and right */}
          {/* Left: Robber / Masked character */}
          <div className="absolute -left-2 bottom-6 z-10 flex items-end">
            <div className="relative">
              {/* Comic Robber Mask Head */}
              <div className="w-24 h-28 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full border-2 border-black overflow-hidden relative shadow-lg transform -rotate-6">
                <div className="absolute top-6 left-0 right-0 h-8 bg-[#1e1e24] flex items-center justify-around px-2">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-black rounded-full" />
                  </div>
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-black rounded-full" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-3 bg-red-800 rounded-full" />
              </div>
              <div className="text-[10px] font-black italic bg-amber-400 text-black px-1.5 py-0.5 rounded shadow absolute -bottom-1 left-2 font-mono">
                BNG
              </div>
            </div>
          </div>

          {/* Right: Police Officer & Police Dog */}
          <div className="absolute -right-2 bottom-6 z-10 flex items-end">
            <div className="relative">
              {/* Comic Cop Head */}
              <div className="w-24 h-28 bg-gradient-to-br from-blue-200 to-amber-200 rounded-full border-2 border-black overflow-hidden relative shadow-lg transform rotate-6">
                <div className="absolute top-0 left-0 right-0 h-10 bg-[#143264] flex items-center justify-center">
                  <Crown className="w-4 h-4 text-amber-400" />
                </div>
                <div className="absolute top-10 left-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full" />
                </div>
                <div className="absolute top-10 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full" />
                </div>
                {/* Mustache */}
                <div className="absolute top-16 left-1/2 -translate-x-1/2 w-10 h-4 bg-[#3a2010] rounded-full" />
              </div>
              <div className="text-[10px] font-black italic bg-amber-400 text-black px-1.5 py-0.5 rounded shadow absolute -bottom-1 right-2 font-mono">
                BNG
              </div>
            </div>
          </div>

          {/* Center Main Tournament Title */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
            <div className="text-2xl sm:text-3xl font-black text-amber-300 italic tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center space-x-1">
              <span>BNG</span>
            </div>
            
            {/* BIG HEIST 3D Title */}
            <div className="text-3xl sm:text-4xl font-black text-yellow-300 tracking-wider -mt-1 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)] scale-y-110 font-sans uppercase">
              BIG HEIST
            </div>
            
            {/* TOURNAMENT subtitle */}
            <div className="text-base sm:text-lg font-black text-white tracking-widest uppercase drop-shadow -mt-1">
              TOURNAMENT
            </div>
            
            {/* Date Tag */}
            <div className="bg-amber-400 text-black text-[11px] font-extrabold px-3 py-0.5 rounded-full mt-0.5 shadow-md">
              09.19-09.21
            </div>

            {/* Total Prizes Pill */}
            <div className="mt-2 bg-[#2c0847]/90 border border-purple-400/50 rounded-xl px-5 py-1 flex flex-col items-center shadow-2xl backdrop-blur-xs">
              <span className="text-[9px] text-purple-200 tracking-widest uppercase">Total Prizes(THB)</span>
              <span className="text-xl sm:text-2xl font-black text-[#38ff70] font-mono tracking-tight -mt-0.5 drop-shadow-[0_0_8px_rgba(56,255,112,0.8)]">
                240,000
              </span>
            </div>
          </div>

          {/* Yellow Hazard Caution Tape across bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 flex items-center justify-around border-t-2 border-black shadow-lg overflow-hidden">
            <div className="w-full flex items-center justify-between text-black font-black text-[9px] tracking-widest">
              <span>/// BNG ///</span>
              <span>/// BIG HEIST ///</span>
              <span>/// 240,000 ///</span>
              <span>/// BNG ///</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Marquee Announcement Bar */}
      <div className="w-full bg-[#360000] px-3 py-1.5 flex items-center space-x-2 border-b border-[#4d0000] text-xs text-white overflow-hidden">
        <div className="flex items-center space-x-1 font-bold whitespace-nowrap text-white">
          <Volume2 className="w-4 h-4 text-white animate-pulse" />
          <span>公告:</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-white font-medium text-[13px]">
            手機跑馬燈 &nbsp;&nbsp;&nbsp; 歡迎光臨尊貴會員！全館電子真人天天返水無上限，提款秒速到帳！
          </div>
        </div>
      </div>

      {/* 4. User Status Bar (Red Angled Box: 您好, lin840926 + ฿1,042.28 + VIP1 + 存款 + 取款) */}
      <div className="w-full bg-[#7a0000] px-3 py-2 flex items-center justify-between border-b border-[#990000] shadow-md">
        {/* Left Side: Greeting & Balance */}
        <div className="flex flex-col">
          <div className="text-xs font-bold text-white tracking-wide">
            您好, {user.username}
          </div>
          <div className="flex items-center space-x-1 mt-0.5">
            <span className="text-sm font-black text-yellow-300 font-mono tracking-tight">
              {user.currency}{user.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <button
              id="btn-mobile-home-refresh"
              onClick={onRefreshBalance}
              title="刷新餘額"
              className="p-0.5 text-yellow-300 hover:text-yellow-200 cursor-pointer transition-transform active:scale-90"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right Side Quick Actions: VIP1, 存款, 取款 */}
        <div className="flex items-center space-x-5 pr-1">
          {/* VIP badge */}
          <button
            id="btn-mobile-home-vip"
            onClick={() => {
              onSelectMenu('vip');
              onSwitchToMemberCenter();
            }}
            className="relative flex flex-col items-center cursor-pointer group"
          >
            <div className="relative">
              <Crown className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center border border-white">
                {user.vipLevel}
              </span>
            </div>
            <span className="text-[10px] font-bold text-yellow-300 mt-0.5">VIP</span>
          </button>

          {/* 存款 (Deposit) */}
          <button
            id="btn-mobile-home-deposit"
            onClick={onOpenDeposit}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-6 h-6 flex items-center justify-center text-yellow-300 group-hover:scale-105 transition-transform">
              <Wallet className="w-5 h-5 fill-yellow-300 text-yellow-300" />
            </div>
            <span className="text-[10px] font-bold text-yellow-300 mt-0.5">存款</span>
          </button>

          {/* 取款 (Withdraw) */}
          <button
            id="btn-mobile-home-withdraw"
            onClick={onOpenWithdraw}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-6 h-6 flex items-center justify-center text-yellow-300 group-hover:scale-105 transition-transform">
              <HandCoins className="w-5 h-5 text-yellow-300" />
            </div>
            <span className="text-[10px] font-bold text-yellow-300 mt-0.5">取款</span>
          </button>
        </div>
      </div>

      {/* 5. 6 Horizontal Game Category Icons (棋牌, 电子, 捕鱼, 真人, 体育, 彩票) */}
      <div className="w-full bg-[#400000] px-2 py-3 border-b border-[#550000]">
        <div className="grid grid-cols-6 gap-1 max-w-md mx-auto">
          {categoryTabs.map((tab) => {
            const isSelected = selectedGameTab === tab.key;
            return (
              <button
                key={tab.key}
                id={`btn-game-tab-${tab.key}`}
                onClick={() => setSelectedGameTab(tab.key as any)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-lg scale-105 border border-red-400'
                    : 'bg-[#580000] text-gray-400 hover:text-gray-200 border border-transparent'
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  {tab.icon}
                </div>
                <span className={`text-[11px] mt-1 font-bold ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Thin Horizontal Red Indicator Bar */}
      <div className="w-full h-1 bg-[#250000] flex">
        <div className="w-1/6 bg-red-600 h-full rounded-r" />
      </div>

      {/* 6. Game Grid (2 Columns of Rich Visual Game Cards matching screenshot) */}
      <div className="flex-1 w-full bg-[#350101] px-3 py-4">
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {cardGameCards.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                const matchedGame = games.find((g) => g.title.includes(card.title.slice(0, 2))) || games[0];
                onLaunchGame(matchedGame);
              }}
              className="relative bg-gradient-to-b from-[#8f0914] to-[#450207] rounded-xl border border-[#ab1724] shadow-xl overflow-hidden cursor-pointer active:scale-95 transition-transform group flex flex-col justify-between h-32"
            >
              {/* Left Logo / Provider Name & Subtext */}
              <div className="p-2.5 z-10 flex flex-col">
                <div className="flex items-center space-x-1">
                  {card.flame && (
                    <span className="text-amber-400 text-sm">🔥</span>
                  )}
                  <span className="font-black text-sm text-white tracking-wide drop-shadow">
                    {card.title}
                  </span>
                </div>
                {card.subText && (
                  <span className="text-[9px] text-gray-300 font-medium">
                    {card.subText}
                  </span>
                )}
              </div>

              {/* Character Illustration / Lucky Wheel on Right */}
              {card.wheel ? (
                <div className="absolute right-1 bottom-3 w-16 h-16 rounded-full border-2 border-amber-300 bg-gradient-to-tr from-purple-700 via-pink-600 to-amber-500 shadow-md flex items-center justify-center animate-spin-slow">
                  <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shadow">
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                  </div>
                </div>
              ) : card.charImg ? (
                <div className="absolute right-0 bottom-0 w-20 h-28 overflow-hidden pointer-events-none">
                  <img
                    src={card.charImg}
                    alt={card.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#8f0914]/80" />
                </div>
              ) : null}

              {/* Bottom Bar: Star badge medal + "进入游戏" Red Pill */}
              <div className="relative z-10 flex items-center justify-between p-1.5 bg-black/40 backdrop-blur-xs">
                {/* Left Star Medal */}
                <div className="w-5 h-5 rounded-full bg-amber-400 border border-amber-200 flex items-center justify-center shadow">
                  <Star className="w-3 h-3 text-[#7a0000] fill-[#7a0000]" />
                </div>

                {/* Right "进入游戏" Button */}
                <button
                  className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow flex items-center space-x-0.5"
                >
                  <span>进入游戏</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Right Signal/WiFi indicator tool */}
      <div className="fixed right-0 top-1/3 z-20">
        <button
          onClick={onOpenCustomerService}
          className="bg-[#242938]/90 hover:bg-[#242938] text-white p-2 rounded-l-lg shadow-lg border-l border-y border-gray-600 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
          title="線上服務/測速"
        >
          <Wifi className="w-4 h-4 text-sky-400 animate-pulse" />
        </button>
      </div>

      {/* 7. Bottom Navigation Bar (5 tabs in bright red: 首页[Active], 返水, 优惠, 客服, 我的) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#e00000] border-t border-[#b80000] shadow-2xl flex items-center justify-around py-1.5 px-1 select-none">
        {/* 1. 首页 (Active) */}
        <button
          id="btn-bottom-nav-home"
          onClick={() => {
            // Already on home
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all text-white font-black scale-105"
        >
          <Home className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[11px] font-bold mt-0.5">首页</span>
        </button>

        {/* 2. 返水 */}
        <button
          id="btn-bottom-nav-rebate"
          onClick={() => {
            onSelectMenu('rebate');
            onSwitchToMemberCenter();
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all text-white/80 hover:text-white"
        >
          <CircleDollarSign className="w-5 h-5 stroke-[2]" />
          <span className="text-[11px] font-bold mt-0.5">返水</span>
        </button>

        {/* 3. 优惠 */}
        <button
          id="btn-bottom-nav-promotions"
          onClick={() => {
            onSelectMenu('activities');
            onSwitchToMemberCenter();
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all text-white/80 hover:text-white"
        >
          <Gift className="w-5 h-5 stroke-[2]" />
          <span className="text-[11px] font-bold mt-0.5">优惠</span>
        </button>

        {/* 4. 客服 */}
        <button
          id="btn-bottom-nav-service"
          onClick={onOpenCustomerService}
          className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all text-white/80 hover:text-white"
        >
          <Headphones className="w-5 h-5 stroke-[2]" />
          <span className="text-[11px] font-bold mt-0.5">客服</span>
        </button>

        {/* 5. 我的 (Member Center) */}
        <button
          id="btn-bottom-nav-mine"
          onClick={onSwitchToMemberCenter}
          className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all text-white/80 hover:text-white"
        >
          <User className="w-5 h-5 stroke-[2]" />
          <span className="text-[11px] font-bold mt-0.5">我的</span>
        </button>
      </nav>

      {/* Slide-out Drawer Menu */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-[#240000] text-white h-full shadow-2xl flex flex-col z-10 border-r border-[#400000] animate-in slide-in-from-left duration-200">
            <div className="p-4 bg-[#180000] border-b border-[#360000] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center font-bold text-white text-sm">
                  {user.username.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{user.username}</div>
                  <div className="text-[10px] text-amber-400 font-semibold">VIP{user.vipLevel} 會員</div>
                </div>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 bg-[#2d0000] border-b border-[#3d0000] flex items-center justify-between">
              <span className="text-xs text-gray-300">帳戶餘額</span>
              <span className="text-sm font-bold text-amber-400 font-mono">
                {user.currency} {user.balance.toFixed(2)}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto py-2 space-y-1">
              <button
                onClick={() => {
                  onOpenDeposit();
                  setIsDrawerOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-200 hover:bg-[#3d0000] flex items-center space-x-3"
              >
                <Coins className="w-4 h-4 text-amber-400" />
                <span>線上存款</span>
              </button>
              <button
                onClick={() => {
                  onOpenWithdraw();
                  setIsDrawerOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-200 hover:bg-[#3d0000] flex items-center space-x-3"
              >
                <HandCoins className="w-4 h-4 text-amber-400" />
                <span>線上取款</span>
              </button>
              <button
                onClick={() => {
                  onSwitchToMemberCenter();
                  onSelectMenu('security');
                  setIsDrawerOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-200 hover:bg-[#3d0000] flex items-center space-x-3"
              >
                <User className="w-4 h-4 text-amber-400" />
                <span>會員中心 / 用戶安全</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
