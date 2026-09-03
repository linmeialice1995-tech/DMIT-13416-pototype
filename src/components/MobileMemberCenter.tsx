import React, { useState } from 'react';
import {
  Menu,
  Coins,
  HandCoins,
  Mail,
  Wallet,
  History,
  ClipboardList,
  Trophy,
  Heart,
  UserCheck,
  Megaphone,
  CircleDollarSign,
  Crown,
  Users,
  ChevronUp,
  ChevronDown,
  Home,
  Gift,
  Headphones,
  User,
  RefreshCw,
  X,
  Volume2,
  Wifi,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { SidebarMenuKey, UserProfile, MainNavTab, GameItem } from '../types';

interface MobileMemberCenterProps {
  user: UserProfile;
  activeMenu: SidebarMenuKey | null;
  onSelectMenu: (menu: SidebarMenuKey) => void;
  onBackToGrid: () => void;
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onOpenCustomerService: () => void;
  onRefreshBalance: () => void;
  isRefreshing: boolean;
  onSelectNavTab: (tab: MainNavTab) => void;
  currentNavTab: MainNavTab;
  onSwitchToHome: () => void;
  children?: React.ReactNode;
}

export const MobileMemberCenter: React.FC<MobileMemberCenterProps> = ({
  user,
  activeMenu,
  onSelectMenu,
  onBackToGrid,
  onOpenDeposit,
  onOpenWithdraw,
  onOpenCustomerService,
  onRefreshBalance,
  isRefreshing,
  onSelectNavTab,
  currentNavTab,
  onSwitchToHome,
  children,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeBottomTab, setActiveBottomTab] = useState<'home' | 'rebate' | 'promotions' | 'service' | 'mine'>('mine');

  // 13 Features Grid matching the screenshot
  const gridItems: {
    key: SidebarMenuKey;
    label: string;
    icon: React.ReactNode;
    badge?: number;
    onClick?: () => void;
  }[] = [
    {
      key: 'deposit',
      label: '线上存款',
      icon: (
        <div className="relative flex items-center justify-center">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            {/* Coins with dollar sign icon */}
            <Coins className="w-8 h-8 text-[#ff6e14] stroke-[1.7]" />
          </div>
        </div>
      ),
      onClick: () => {
        onSelectMenu('deposit');
        onOpenDeposit();
      },
    },
    {
      key: 'withdraw',
      label: '线上取款',
      icon: (
        <div className="relative flex items-center justify-center">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            {/* Hand holding money */}
            <HandCoins className="w-8 h-8 text-[#ff6e14] stroke-[1.7]" />
          </div>
        </div>
      ),
      onClick: () => {
        onSelectMenu('withdraw');
        onOpenWithdraw();
      },
    },
    {
      key: 'inbox',
      label: '站内信件',
      icon: (
        <div className="relative flex items-center justify-center">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <Mail className="w-8 h-8 text-[#ff6e14] stroke-[1.7]" />
          </div>
          {user.unreadMessages > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-[#550101]">
              {user.unreadMessages}
            </span>
          )}
        </div>
      ),
      onClick: () => onSelectMenu('inbox'),
    },
    {
      key: 'wallet',
      label: '钱包管理',
      icon: (
        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
          <Wallet className="w-8 h-8 text-[#ff6e14] stroke-[1.7]" />
        </div>
      ),
      onClick: () => onSelectMenu('wallet'),
    },
    {
      key: 'bets',
      label: '投注记录',
      icon: (
        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
          <History className="w-8 h-8 text-[#ff6e14] stroke-[1.7]" />
        </div>
      ),
      onClick: () => onSelectMenu('bets'),
    },
    {
      key: 'transactions',
      label: '交易中心',
      icon: (
        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
          <ClipboardList className="w-8 h-8 text-[#ff6e14] stroke-[1.7]" />
        </div>
      ),
      onClick: () => onSelectMenu('transactions'),
    },
    {
      key: 'activities',
      label: '活动专区',
      icon: (
        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
          <Trophy className="w-8 h-8 text-[#ff6e14] stroke-[1.7]" />
        </div>
      ),
      onClick: () => onSelectMenu('activities'),
    },
    {
      key: 'favorites',
      label: '我的最爱',
      icon: (
        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
          <Heart className="w-8 h-8 text-[#ff6e14] fill-[#ff6e14] stroke-[1.7]" />
        </div>
      ),
      onClick: () => onSelectMenu('favorites'),
    },
    {
      key: 'security',
      label: '用户安全',
      icon: (
        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
          <UserCheck className="w-8 h-8 text-[#ff6e14] stroke-[1.7]" />
        </div>
      ),
      onClick: () => onSelectMenu('security'),
    },
    {
      key: 'announcements',
      label: '最新公告',
      icon: (
        <div className="relative flex items-center justify-center">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <Megaphone className="w-8 h-8 text-[#ff6e14] stroke-[1.7]" />
          </div>
          {user.unreadAnnouncements > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-[#550101]">
              {user.unreadAnnouncements}
            </span>
          )}
        </div>
      ),
      onClick: () => onSelectMenu('announcements'),
    },
    {
      key: 'rebate',
      label: '返水',
      icon: (
        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
          <CircleDollarSign className="w-8 h-8 text-[#ff6e14] stroke-[1.7]" />
        </div>
      ),
      onClick: () => onSelectMenu('rebate'),
    },
    {
      key: 'vip',
      label: 'VIP',
      icon: (
        <div className="relative flex items-center justify-center">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <Crown className="w-8 h-8 text-[#ff6e14] stroke-[1.7]" />
          </div>
          <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-[#550101]">
            1
          </span>
        </div>
      ),
      onClick: () => onSelectMenu('vip'),
    },
    {
      key: 'referral',
      label: '好友推薦',
      icon: (
        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
          <Users className="w-8 h-8 text-[#ff6e14] stroke-[1.7]" />
        </div>
      ),
      onClick: () => onSelectMenu('referral'),
    },
  ];

  // Mascot Cartoon SVG Illustration Banner (Chiikawa & Friends)
  const MascotBanner = () => (
    <div className="w-24 h-12 relative flex items-center justify-center overflow-hidden rounded bg-[#d8f0d8] border border-amber-300 shadow-inner px-1">
      {/* Background leaves & sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#bfe8ff] via-[#d4f6d4] to-[#c2eec2] opacity-80" />
      
      {/* Mascot illustration */}
      <svg viewBox="0 0 100 50" className="w-full h-full relative z-10">
        {/* Left character: Hachiware (Blue ears) */}
        <g transform="translate(14, 12) scale(0.65)">
          <ellipse cx="20" cy="22" rx="16" ry="14" fill="#ffffff" stroke="#2c2c2c" strokeWidth="1.5" />
          {/* Blue ear caps */}
          <path d="M7 14 C7 7, 13 8, 16 11" fill="#78b9ec" stroke="#2c2c2c" strokeWidth="1.2" />
          <path d="M33 14 C33 7, 27 8, 24 11" fill="#78b9ec" stroke="#2c2c2c" strokeWidth="1.2" />
          {/* Eyes */}
          <circle cx="14" cy="20" r="2.2" fill="#2c2c2c" />
          <circle cx="26" cy="20" r="2.2" fill="#2c2c2c" />
          <circle cx="15" cy="19.2" r="0.7" fill="#fff" />
          <circle cx="27" cy="19.2" r="0.7" fill="#fff" />
          {/* Blush */}
          <ellipse cx="11" cy="23" rx="2.5" ry="1.5" fill="#ffb4b4" />
          <ellipse cx="29" cy="23" rx="2.5" ry="1.5" fill="#ffb4b4" />
          {/* Mouth */}
          <path d="M18 24 Q20 26 22 24" fill="none" stroke="#2c2c2c" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Center character: Chiikawa (White bear-like, happy smile) */}
        <g transform="translate(36, 6) scale(0.8)">
          <ellipse cx="20" cy="22" rx="17" ry="15" fill="#ffffff" stroke="#2c2c2c" strokeWidth="1.5" />
          {/* Small round ears */}
          <circle cx="7" cy="10" r="4.5" fill="#ffffff" stroke="#2c2c2c" strokeWidth="1.2" />
          <circle cx="33" cy="10" r="4.5" fill="#ffffff" stroke="#2c2c2c" strokeWidth="1.2" />
          <circle cx="7" cy="10" r="2.5" fill="#ffe3e3" />
          <circle cx="33" cy="10" r="2.5" fill="#ffe3e3" />
          {/* Happy eyes */}
          <path d="M13 19 Q16 16 19 19" fill="none" stroke="#2c2c2c" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M21 19 Q24 16 27 19" fill="none" stroke="#2c2c2c" strokeWidth="1.8" strokeLinecap="round" />
          {/* Blush */}
          <ellipse cx="12" cy="23" rx="3" ry="1.8" fill="#ff9999" />
          <ellipse cx="28" cy="23" rx="3" ry="1.8" fill="#ff9999" />
          {/* Cat mouth */}
          <path d="M17 24 Q20 22 20 24 Q20 22 23 24" fill="none" stroke="#2c2c2c" strokeWidth="1.3" strokeLinecap="round" />
        </g>

        {/* Right character: Usagi (Yellow rabbit with long ears) */}
        <g transform="translate(62, 10) scale(0.65)">
          <ellipse cx="20" cy="24" rx="16" ry="14" fill="#fff7cc" stroke="#2c2c2c" strokeWidth="1.5" />
          {/* Long ears */}
          <path d="M11 12 C10 0, 16 0, 16 12" fill="#fff7cc" stroke="#2c2c2c" strokeWidth="1.2" />
          <path d="M29 12 C30 0, 24 0, 24 12" fill="#fff7cc" stroke="#2c2c2c" strokeWidth="1.2" />
          <ellipse cx="13.5" cy="6" rx="1.5" ry="4" fill="#ffcccc" />
          <ellipse cx="26.5" cy="6" rx="1.5" ry="4" fill="#ffcccc" />
          {/* Eyes */}
          <circle cx="15" cy="22" r="2.2" fill="#2c2c2c" />
          <circle cx="25" cy="22" r="2.2" fill="#2c2c2c" />
          <circle cx="15.8" cy="21.2" r="0.7" fill="#fff" />
          <circle cx="25.8" cy="21.2" r="0.7" fill="#fff" />
          {/* Blush */}
          <ellipse cx="12" cy="25" rx="2.5" ry="1.5" fill="#ffb4b4" />
          <ellipse cx="28" cy="25" rx="2.5" ry="1.5" fill="#ffb4b4" />
          {/* Open happy mouth */}
          <ellipse cx="20" cy="26" rx="2.5" ry="2" fill="#e75c5c" />
        </g>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#4a0000] text-white flex flex-col font-sans select-none pb-16 relative">
      {/* 1. Top Header Bar */}
      <header className="w-full bg-[#200000] px-3 py-2 flex items-center justify-between border-b border-[#3d0000] sticky top-0 z-30">
        {/* Left: Hamburger menu */}
        <button
          id="btn-mobile-menu-toggle"
          onClick={() => setIsDrawerOpen(true)}
          className="p-1 text-white hover:text-amber-400 transition-colors cursor-pointer"
          title="開啟選單"
        >
          <Menu className="w-7 h-7 stroke-[2.2]" />
        </button>

        {/* Center: Cute Mascot Illustration Banner */}
        <div className="cursor-pointer" onClick={onBackToGrid}>
          <MascotBanner />
        </div>

        {/* Right: Domain name text */}
        <div className="text-right leading-tight">
          <div className="text-[12px] font-bold text-white">易记域名</div>
          <div className="text-[11px] text-gray-200 tracking-tight font-mono">qqqqa2.com域名</div>
        </div>
      </header>

      {/* 2. Marquee News Announcement Bar */}
      <div className="w-full bg-[#360000] px-3 py-2 flex items-center space-x-2 border-b border-[#4d0000] text-xs text-white overflow-hidden">
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

      {/* If a subview is currently selected on mobile, display the subview container */}
      {activeMenu && children ? (
        activeMenu === 'security' ? (
          <div className="flex-1 flex flex-col bg-[#480004] text-white animate-in fade-in duration-150 overflow-y-auto">
            {children}
          </div>
        ) : (
          <div className="flex-1 flex flex-col bg-white text-gray-800 animate-in fade-in duration-200">
            {/* Subview Header with Back button */}
            <div className="bg-[#6b0000] text-white px-4 py-3 flex items-center justify-between shadow-md">
              <button
                id="btn-mobile-back-to-menu"
                onClick={onBackToGrid}
                className="flex items-center space-x-1.5 text-xs font-bold text-white bg-black/30 hover:bg-black/40 px-3 py-1.5 rounded-lg cursor-pointer transition-all active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>返回會員中心</span>
              </button>
              <div className="font-bold text-sm tracking-wide">
                {activeMenu === 'deposit' && '線上存款'}
                {activeMenu === 'withdraw' && '線上取款'}
                {activeMenu === 'vip' && 'VIP 專區'}
                {activeMenu === 'wallet' && '錢包管理'}
                {activeMenu === 'transactions' && '交易中心'}
                {activeMenu === 'bets' && '投注記錄'}
                {activeMenu === 'rebate' && '返水專區'}
                {activeMenu === 'referral' && '好友推薦'}
                {activeMenu === 'announcements' && '最新公告'}
                {activeMenu === 'inbox' && '站內信件'}
                {activeMenu === 'activities' && '活動專區'}
                {activeMenu === 'favorites' && '我的最愛'}
              </div>
              <div className="w-16 text-right">
                <button
                  onClick={onOpenCustomerService}
                  className="text-xs text-amber-300 hover:text-amber-200 font-semibold"
                >
                  客服
                </button>
              </div>
            </div>

            {/* Subview Body Content */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </div>
        )
      ) : (
        /* 3. Main Member Center Screen */
        <div className="flex-1 flex flex-col">
          {/* Top Crimson Banner with "会员中心" Title and Balance Pill */}
          <div className="w-full bg-gradient-to-b from-[#8f0000] to-[#700000] pt-4 pb-4 px-4 flex flex-col items-center justify-center text-center shadow-md">
            <h1 className="text-xl font-bold text-white tracking-widest mb-2.5">
              会员中心
            </h1>

            {/* White Rounded Pill for Account Balance with Refresh Button */}
            <div className="bg-white rounded-full px-5 py-1.5 shadow-md flex items-center space-x-2 text-gray-800">
              <span className="text-xs font-semibold text-gray-700">账户余额</span>
              <span className="text-sm font-bold text-red-600 font-mono tracking-wide">
                {user.currency}{user.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <button
                id="btn-mobile-refresh-balance"
                onClick={onRefreshBalance}
                title="重新整理餘額"
                className="p-0.5 text-red-600 hover:text-red-700 cursor-pointer ml-1 transition-transform active:scale-90"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* 4. 4-Column Feature Grid with Deep Wine Red Background */}
          <div className="w-full bg-[#520000] flex-1 px-2.5 py-6">
            <div className="grid grid-cols-4 gap-y-7 gap-x-1 max-w-md mx-auto">
              {gridItems.map((item) => (
                <button
                  key={item.key}
                  id={`btn-mobile-grid-${item.key}`}
                  onClick={item.onClick}
                  className="flex flex-col items-center justify-center text-center group cursor-pointer active:scale-95 transition-transform"
                >
                  {/* Icon Area */}
                  <div className="w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>

                  {/* Label */}
                  <span className="mt-1.5 text-xs text-white font-medium tracking-tight">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* 5. Right Bottom "展开" (Expand / Collapse) Button */}
            <div className="flex justify-end pr-2 pt-6 pb-2">
              <button
                id="btn-mobile-expand-collapse"
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-[#380000] hover:bg-[#2d0000] text-gray-300 text-xs px-3.5 py-1 rounded-t-md flex items-center space-x-1 cursor-pointer transition-colors shadow-inner"
              >
                <ChevronUp className="w-3.5 h-3.5" />
                <span>展开</span>
              </button>
            </div>
          </div>
        </div>
      )}

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

      {/* 6. Bottom Navigation Bar (5 tabs in bright red) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#e00000] border-t border-[#b80000] shadow-2xl flex items-center justify-around py-1.5 px-1 select-none">
        {/* 1. 首页 */}
        <button
          id="btn-bottom-nav-home"
          onClick={() => {
            setActiveBottomTab('home');
            onSwitchToHome();
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all ${
            activeBottomTab === 'home' ? 'text-white scale-105' : 'text-white/80 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5 stroke-[2]" />
          <span className="text-[11px] font-bold mt-0.5">首页</span>
        </button>

        {/* 2. 返水 */}
        <button
          id="btn-bottom-nav-rebate"
          onClick={() => {
            setActiveBottomTab('rebate');
            onSelectMenu('rebate');
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all ${
            activeBottomTab === 'rebate' ? 'text-white scale-105' : 'text-white/80 hover:text-white'
          }`}
        >
          <CircleDollarSign className="w-5 h-5 stroke-[2]" />
          <span className="text-[11px] font-bold mt-0.5">返水</span>
        </button>

        {/* 3. 优惠 */}
        <button
          id="btn-bottom-nav-promotions"
          onClick={() => {
            setActiveBottomTab('promotions');
            onSelectNavTab('promotions');
            onSelectMenu('activities');
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all ${
            activeBottomTab === 'promotions' ? 'text-white scale-105' : 'text-white/80 hover:text-white'
          }`}
        >
          <Gift className="w-5 h-5 stroke-[2]" />
          <span className="text-[11px] font-bold mt-0.5">优惠</span>
        </button>

        {/* 4. 客服 */}
        <button
          id="btn-bottom-nav-service"
          onClick={() => {
            onOpenCustomerService();
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all text-white/80 hover:text-white"
        >
          <Headphones className="w-5 h-5 stroke-[2]" />
          <span className="text-[11px] font-bold mt-0.5">客服</span>
        </button>

        {/* 5. 我的 (Selected / Active) */}
        <button
          id="btn-bottom-nav-mine"
          onClick={() => {
            setActiveBottomTab('mine');
            onBackToGrid();
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all ${
            activeBottomTab === 'mine' ? 'text-white font-black scale-105' : 'text-white/80 hover:text-white'
          }`}
        >
          <div className="relative">
            <User className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[11px] font-bold mt-0.5">我的</span>
        </button>
      </nav>

      {/* Slide-out Drawer Menu for Mobile */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-xs bg-[#240000] text-white h-full shadow-2xl flex flex-col z-10 border-r border-[#400000] animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
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

            {/* Balance in Drawer */}
            <div className="p-3 bg-[#2d0000] border-b border-[#3d0000] flex items-center justify-between">
              <span className="text-xs text-gray-300">帳戶餘額</span>
              <span className="text-sm font-bold text-amber-400 font-mono">
                {user.currency} {user.balance.toFixed(2)}
              </span>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex-1 overflow-y-auto py-2 space-y-1">
              <button
                onClick={() => {
                  onSelectMenu('deposit');
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
                  onSelectMenu('withdraw');
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
                  onSelectMenu('security');
                  setIsDrawerOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-200 hover:bg-[#3d0000] flex items-center space-x-3"
              >
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>用戶安全</span>
              </button>
              <button
                onClick={() => {
                  onSelectMenu('vip');
                  setIsDrawerOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-200 hover:bg-[#3d0000] flex items-center space-x-3"
              >
                <Crown className="w-4 h-4 text-amber-400" />
                <span>VIP 專區</span>
              </button>
              <button
                onClick={() => {
                  onSelectMenu('announcements');
                  setIsDrawerOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-200 hover:bg-[#3d0000] flex items-center space-x-3"
              >
                <Megaphone className="w-4 h-4 text-amber-400" />
                <span>最新公告</span>
              </button>
              <button
                onClick={() => {
                  onSelectMenu('inbox');
                  setIsDrawerOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-200 hover:bg-[#3d0000] flex items-center space-x-3"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>站內信件</span>
              </button>
              <button
                onClick={() => {
                  onSelectMenu('wallet');
                  setIsDrawerOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-200 hover:bg-[#3d0000] flex items-center space-x-3"
              >
                <Wallet className="w-4 h-4 text-amber-400" />
                <span>錢包管理</span>
              </button>
              <button
                onClick={() => {
                  onSelectMenu('transactions');
                  setIsDrawerOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-200 hover:bg-[#3d0000] flex items-center space-x-3"
              >
                <ClipboardList className="w-4 h-4 text-amber-400" />
                <span>交易中心</span>
              </button>
              <button
                onClick={() => {
                  onSelectMenu('bets');
                  setIsDrawerOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-200 hover:bg-[#3d0000] flex items-center space-x-3"
              >
                <History className="w-4 h-4 text-amber-400" />
                <span>投注記錄</span>
              </button>
              <button
                onClick={() => {
                  onSelectMenu('rebate');
                  setIsDrawerOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-200 hover:bg-[#3d0000] flex items-center space-x-3"
              >
                <CircleDollarSign className="w-4 h-4 text-amber-400" />
                <span>返水</span>
              </button>
              <button
                onClick={() => {
                  onSelectMenu('referral');
                  setIsDrawerOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-200 hover:bg-[#3d0000] flex items-center space-x-3"
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>好友推薦</span>
              </button>
            </div>

            {/* Drawer Footer */}
            <div className="p-3 bg-[#180000] border-t border-[#360000]">
              <button
                onClick={() => {
                  onOpenCustomerService();
                  setIsDrawerOpen(false);
                }}
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
              >
                <Headphones className="w-4 h-4" />
                <span>聯絡線上客服</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
