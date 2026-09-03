import React, { useState } from 'react';
import { RefreshCw, Smartphone, Headphones, ChevronDown, Check, Globe } from 'lucide-react';
import { UserProfile } from '../types';

interface TopBarProps {
  user: UserProfile;
  onRefreshBalance: () => void;
  isRefreshing: boolean;
  onOpenDeposit: () => void;
  onOpenCustomerService: () => void;
  onOpenHelpCenter: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  user,
  onRefreshBalance,
  isRefreshing,
  onOpenDeposit,
  onOpenCustomerService,
  onOpenHelpCenter,
  onNavigateToTab,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('繁體中文');
  const [currentFlag, setCurrentFlag] = useState('🇭🇰');

  const languages = [
    { code: 'zh-HK', name: '繁體中文', flag: '🇭🇰' },
    { code: 'zh-TW', name: '繁體中文 (台灣)', flag: '🇹🇼' },
    { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'th-TH', name: 'ภาษาไทย', flag: '🇹🇭' },
    { code: 'vi-VN', name: 'Tiếng Việt', flag: '🇻🇳' },
  ];

  return (
    <header className="w-full bg-[#f8f9fa] border-b border-gray-200 text-xs text-gray-600 select-none">
      <div className="max-w-[1280px] mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-y-1">
        {/* Left Navigation Links matching screenshot */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 text-[11px] sm:text-xs">
          <button
            id="nav-bets"
            onClick={() => onNavigateToTab('bets')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            投注紀錄
          </button>
          <span className="text-gray-300">|</span>
          <button
            id="nav-online-deposit"
            onClick={onOpenDeposit}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            線上存款
          </button>
          <span className="text-gray-300">|</span>
          <button
            id="nav-online-withdraw"
            onClick={() => onNavigateToTab('withdraw')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            線上取款
          </button>
          <span className="text-gray-300">|</span>
          <button
            id="nav-trans-center"
            onClick={() => onNavigateToTab('transactions')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            交易中心
          </button>
          <span className="text-gray-300">|</span>
          <button
            id="nav-withdraw-pin"
            onClick={() => onNavigateToTab('security_pin')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            修改取款密碼
          </button>
          <span className="text-gray-300">|</span>
          <button
            id="nav-member-center"
            onClick={() => onNavigateToTab('security')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            會員中心
          </button>
        </div>

        {/* Right Info Section matching screenshot */}
        <div className="flex items-center space-x-3 sm:space-x-4 text-[11px] sm:text-xs">
          {/* Account */}
          <div className="flex items-center space-x-1">
            <span className="text-gray-500">帳號 :</span>
            <span className="font-semibold text-gray-800">{user.username || 'lin840926'}</span>
            <span className="text-emerald-500 text-xs" title="在線中">💬</span>
          </div>

          {/* Balance */}
          <div className="flex items-center space-x-1">
            <span className="text-gray-500">帳戶餘額 :</span>
            <span className="font-medium text-sky-700">
              {user.currency}{user.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <button
              id="refresh-balance-top"
              onClick={onRefreshBalance}
              title="重新整理餘額"
              className="text-gray-400 hover:text-sky-600 transition-colors p-0.5 cursor-pointer ml-0.5"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-sky-600' : ''}`} />
            </button>
          </div>

          {/* Mobile betting */}
          <button
            id="btn-mobile-app"
            onClick={() => alert('請使用手機掃描二維碼下載專用 APP，享受秒速投注！')}
            className="hidden md:flex items-center space-x-1 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <span>手機投注</span>
          </button>

          {/* Online Help */}
          <button
            id="btn-help-online"
            onClick={onOpenCustomerService}
            className="flex items-center space-x-1 text-sky-600 hover:text-sky-700 transition-colors cursor-pointer"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Help online</span>
          </button>

          {/* Language / Region Selector */}
          <div className="relative">
            <button
              id="btn-lang-selector"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center space-x-1 px-1 py-0.5 rounded hover:bg-gray-100 cursor-pointer"
            >
              <span>{currentFlag}</span>
              <span className="text-rose-500 text-[10px]">🔻</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.name);
                      setCurrentFlag(lang.flag);
                      setLangMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span>
                      {lang.flag} {lang.name}
                    </span>
                    {currentFlag === lang.flag && <Check className="w-3 h-3 text-sky-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
