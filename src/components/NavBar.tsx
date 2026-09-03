import React from 'react';
import { MainNavTab } from '../types';

interface NavBarProps {
  activeTab: MainNavTab;
  onSelectTab: (tab: MainNavTab) => void;
  onLogout: () => void;
  isLoggedIn?: boolean;
  onLogin?: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({
  activeTab,
  onSelectTab,
  onLogout,
  isLoggedIn = true,
  onLogin,
}) => {
  const navItems: { key: MainNavTab; label: string }[] = [
    { key: 'home', label: '首頁' },
    { key: 'slots', label: '電子' },
    { key: 'desheng_slots', label: '德勝電子' },
    { key: 'royal_slots', label: '皇家電子' },
    { key: 'cards', label: '棋牌' },
    { key: 'fishing', label: '捕魚' },
    { key: 'live', label: '真人' },
    { key: 'sports', label: '體育' },
    { key: 'lottery', label: '彩票' },
    { key: 'tickets', label: '門票' },
    { key: 'promotions', label: '優惠' },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-xs select-none">
      <div className="max-w-[1280px] mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          id="logo-brand"
          onClick={() => onSelectTab('home')}
          className="flex items-center cursor-pointer group"
        >
          <div className="relative flex items-center">
            {/* 3D Gold Gradient DEMO Logo */}
            <span className="text-3xl sm:text-4xl font-black italic tracking-wider bg-gradient-to-b from-[#ffe066] via-[#f59e0b] to-[#b45309] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(180,83,9,0.3)] filter transform transition-transform group-hover:scale-105">
              DEMO
            </span>
            <span className="ml-1 text-[10px] uppercase font-bold tracking-widest text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
              PRO
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navItems.map((item) => {
            const isActive不易 = activeTab === item.key;
            return (
              <button
                key={item.key}
                id={`nav-item-${item.key}`}
                onClick={() => onSelectTab(item.key)}
                className={`relative px-3 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive不易
                    ? 'text-sky-500 font-bold'
                    : 'text-gray-700 hover:text-sky-500'
                }`}
              >
                {item.label}
                {isActive不易 && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-sky-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile/Tablet dropdown scroll or visible items */}
        <div className="flex lg:hidden overflow-x-auto py-1 no-scrollbar space-x-2 max-w-[50vw]">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.key}
              onClick={() => onSelectTab(item.key)}
              className={`text-xs px-2 py-1 whitespace-nowrap font-medium ${
                activeTab === item.key ? 'text-sky-600 font-bold' : 'text-gray-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Logout/Login Button */}
        <div>
          {isLoggedIn ? (
            <button
              type="button"
              id="btn-logout"
              onClick={onLogout}
              className="bg-[#41b2f4] hover:bg-[#34a2e2] active:scale-95 transition-all text-white font-medium text-xs sm:text-sm px-5 sm:px-7 py-1.5 rounded-full shadow-sm cursor-pointer"
            >
              登出
            </button>
          ) : (
            <button
              type="button"
              id="btn-login"
              onClick={onLogin}
              className="bg-[#709fc5] hover:bg-[#6090b5] active:scale-95 transition-all text-white font-medium text-xs sm:text-sm px-5 sm:px-7 py-1.5 rounded-full shadow-sm cursor-pointer"
            >
              登入
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
