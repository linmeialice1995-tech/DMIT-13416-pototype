import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import { ActiveSystemTab } from '../types';

interface SystemTabBarProps {
  activeTab: ActiveSystemTab;
  onSelectTab: (tab: ActiveSystemTab) => void;
  viewMode?: 'mobile' | 'desktop';
  onToggleViewMode?: (mode: 'mobile' | 'desktop') => void;
}

export const SystemTabBar: React.FC<SystemTabBarProps> = ({
  activeTab,
  onSelectTab,
  viewMode = 'mobile',
  onToggleViewMode,
}) => {
  return (
    <div className="w-full bg-[#181c26] border-b border-[#2d3445] px-2 pt-1 flex items-center justify-between select-none text-xs z-50">
      {/* Browser-style Tab Strip */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
        {/* Tab 1: 娛樂城官網 (前台) */}
        <button
          id="btn-tab-frontend-casino"
          type="button"
          onClick={() => onSelectTab('frontend_casino')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg transition-all cursor-pointer text-xs ${
            activeTab === 'frontend_casino'
              ? 'bg-[#eaeff5] text-gray-900 font-bold shadow-md border-t-2 border-sky-500'
              : 'bg-[#252c3c] text-gray-300 hover:bg-[#2e364a] hover:text-white'
          }`}
        >
          <span className="text-sm">🎰</span>
          <span className="whitespace-nowrap">娛樂城官網 (前台)</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-normal ${
              activeTab === 'frontend_casino'
                ? 'bg-sky-100 text-sky-800'
                : 'bg-black/30 text-gray-400'
            }`}
          >
            前台
          </span>
        </button>

        {/* Tab 2: 【UAT-02】後台管理系統 - 會員端設定 */}
        <button
          id="btn-tab-backend-admin"
          type="button"
          onClick={() => onSelectTab('backend_admin')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg transition-all cursor-pointer text-xs ${
            activeTab === 'backend_admin'
              ? 'bg-[#222222] text-white font-bold shadow-md border-t-2 border-emerald-500'
              : 'bg-[#252c3c] text-gray-300 hover:bg-[#2e364a] hover:text-white'
          }`}
        >
          <span className="text-sm">⚙️</span>
          <span className="whitespace-nowrap">【UAT-02】後台管理系統 - 會員端設定</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-normal ${
              activeTab === 'backend_admin'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                : 'bg-black/30 text-gray-400'
            }`}
          >
            獨立後台分頁
          </span>
        </button>
      </div>

      {/* Right side controls: Mobile / Desktop switcher for frontend casino */}
      <div className="flex items-center space-x-2 text-[11px] text-gray-400 pr-2">
        {activeTab === 'frontend_casino' && onToggleViewMode && (
          <div className="flex items-center bg-[#0d1017] p-0.5 rounded-lg border border-[#2d3445]">
            <button
              id="btn-switch-to-mobile-layout"
              type="button"
              onClick={() => onToggleViewMode('mobile')}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-amber-500 text-black shadow-xs font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
              title="切換至標準手機版型"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>📱 手機版型</span>
            </button>
            <button
              id="btn-switch-to-desktop-layout"
              type="button"
              onClick={() => onToggleViewMode('desktop')}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                viewMode === 'desktop'
                  ? 'bg-sky-500 text-white shadow-xs font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
              title="切換至電腦寬版版型"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>💻 電腦版</span>
            </button>
          </div>
        )}

        <div className="hidden lg:flex items-center space-x-1.5 text-[11px]">
          <span className="text-gray-400 text-[10px]">獨立網址：</span>
          <span className="bg-[#0f1219] border border-[#2d3445] px-2 py-0.5 rounded text-gray-300 font-mono text-[11px]">
            {activeTab === 'frontend_casino'
              ? (viewMode === 'mobile' ? 'https://m.game-client.internal/member' : 'https://game-client.internal/member')
              : 'https://uat02-admin.internal/settings/member'}
          </span>
        </div>
      </div>
    </div>
  );
};
