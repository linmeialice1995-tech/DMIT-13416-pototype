import React from 'react';
import {
  User,
  ShieldCheck,
  Users,
  Crown,
  Megaphone,
  Mail,
  Wallet,
  Trophy,
  FileText,
  History,
  CircleDollarSign,
  Heart,
  HandCoins,
  RefreshCw,
  UserCheck,
} from 'lucide-react';
import { SidebarMenuKey, UserProfile } from '../types';

interface UserSidebarProps {
  user: UserProfile;
  activeMenu: SidebarMenuKey;
  onSelectMenu: (menu: SidebarMenuKey) => void;
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onRefreshBalance: () => void;
  isRefreshing: boolean;
}

export const UserSidebar: React.FC<UserSidebarProps> = ({
  user,
  activeMenu,
  onSelectMenu,
  onOpenDeposit,
  onOpenWithdraw,
  onRefreshBalance,
  isRefreshing,
}) => {
  const menuItems: { key: SidebarMenuKey; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      key: 'security',
      label: '用戶安全',
      icon: <UserCheck className="w-4 h-4" />,
    },
    {
      key: 'referral',
      label: '好友推薦',
      icon: <Users className="w-4 h-4" />,
    },
    {
      key: 'vip',
      label: 'VIP專區',
      icon: <Crown className="w-4 h-4" />,
      badge: 1,
    },
    {
      key: 'announcements',
      label: '最新公告',
      icon: <Megaphone className="w-4 h-4" />,
    },
    {
      key: 'inbox',
      label: '站內信件',
      icon: <Mail className="w-4 h-4" />,
    },
    { key: 'activities', label: '活動專區', icon: <Trophy className="w-4 h-4" /> },
    { key: 'transactions', label: '交易中心', icon: <FileText className="w-4 h-4" /> },
    { key: 'bets', label: '投注記錄', icon: <History className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full md:w-64 bg-[#232845] rounded-bl-xl border-r border-[#32375c] flex flex-col text-white select-none">
      {/* User Info Header Block */}
      <div className="p-5 flex flex-col items-center border-b border-[#31365b]">
        {/* Large Round Avatar */}
        <div className="relative mb-3 group cursor-pointer">
          <div className="w-20 h-20 rounded-full border-2 border-white/80 bg-[#1d213a] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
            <User className="w-11 h-11 text-white stroke-[1.5]" />
          </div>
        </div>

        {/* Username */}
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-200">
            歡迎您 <span className="text-white font-bold">{user.username || 'lin840926'}</span>
          </p>
        </div>

        {/* Balance with Refresh - matching screenshot: 餘額 : 1,042.28 🔄 */}
        <div className="mt-2.5 flex items-center justify-center space-x-1.5 text-xs sm:text-sm">
          <span className="text-gray-200 font-bold">餘額 :</span>
          <span className="text-white font-bold text-base tracking-wide">
            {user.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <button
            id="btn-sidebar-refresh"
            onClick={onRefreshBalance}
            title="刷新餘額"
            className="text-amber-400 hover:text-amber-300 p-0.5 cursor-pointer transition-transform"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Quick Action Buttons: 存入 / 贖回 (Matching screenshot) */}
      <div className="grid grid-cols-2 border-b border-[#31365b]">
        <button
          id="btn-deposit-action"
          onClick={() => {
            onSelectMenu('deposit');
            onOpenDeposit();
          }}
          className={`flex flex-col items-center justify-center py-4 px-2 border-r border-[#31365b] transition-all cursor-pointer group ${
            activeMenu === 'deposit'
              ? 'bg-[#f5a623] text-white ring-2 ring-[#f5a623]'
              : 'bg-[#232845] hover:bg-[#2a3052] text-white'
          }`}
        >
          <CircleDollarSign
            className={`w-6 h-6 mb-1 group-hover:scale-105 transition-transform ${
              activeMenu === 'deposit' ? 'text-white' : 'text-white'
            }`}
          />
          <span className="text-xs font-bold tracking-wider text-white">存入</span>
        </button>

        <button
          id="btn-withdraw-action"
          onClick={() => {
            onSelectMenu('withdraw');
            onOpenWithdraw();
          }}
          className={`flex flex-col items-center justify-center py-4 px-2 transition-all cursor-pointer group ${
            activeMenu === 'withdraw'
              ? 'bg-[#f5a623] text-white ring-2 ring-[#f5a623]'
              : 'bg-[#232845] hover:bg-[#2a3052] text-white'
          }`}
        >
          <HandCoins
            className={`w-6 h-6 mb-1 group-hover:scale-105 transition-transform ${
              activeMenu === 'withdraw' ? 'text-white' : 'text-white'
            }`}
          />
          <span className="text-xs font-bold tracking-wider text-white">贖回</span>
        </button>
      </div>

      {/* Vertical Navigation Menu with Golden Yellow Active Highlight */}
      <nav className="flex-1 py-1 space-y-0.5">
        {menuItems.map((item) => {
          const isActive = activeMenu === item.key;
          return (
            <button
              key={item.key}
              id={`sidebar-menu-${item.key}`}
              onClick={() => onSelectMenu(item.key)}
              className={`w-full flex items-center justify-between px-6 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#f5a623] text-white shadow-sm font-bold pl-6'
                  : 'text-gray-200 hover:bg-[#2c3254] hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={isActive ? 'text-white' : 'text-gray-300'}>
                  {item.icon}
                </span>
                <span className="tracking-wide">{item.label}</span>
              </div>

              {item.badge && item.badge > 0 ? (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white text-[#f5a623]' : 'bg-red-500 text-white'
                  }`}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
