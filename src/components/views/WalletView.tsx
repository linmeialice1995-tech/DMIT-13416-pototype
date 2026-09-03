import React, { useState } from 'react';
import { Wallet, ArrowLeftRight, RefreshCw, Layers } from 'lucide-react';
import { UserProfile } from '../../types';

interface WalletViewProps {
  user: UserProfile;
  onRefreshBalance: () => void;
  isRefreshing: boolean;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const WalletView: React.FC<WalletViewProps> = ({
  user,
  onRefreshBalance,
  isRefreshing,
  onShowToast,
}) => {
  const [platformBalances, setPlatformBalances] = useState([
    { name: 'PG 電子錢包', balance: 350.0 },
    { name: 'PP 戰神老虎機', balance: 120.5 },
    { name: 'EVO 真人娛樂', balance: 500.0 },
    { name: '沙巴體育', balance: 0.0 },
    { name: 'JDB 捕魚達人', balance: 71.73 },
  ]);

  const handleRecycleAll = () => {
    onShowToast('正在一鍵回收各遊戲廳館餘額至主錢包...', 'info');
    setTimeout(() => {
      onShowToast('已成功一鍵歸集所有遊戲餘額至中心主錢包！', 'success');
      onRefreshBalance();
    }, 600);
  };

  return (
    <div className="flex-1 bg-white flex flex-col rounded-br-xl overflow-hidden min-h-[460px]">
      <div className="bg-[#242845] text-white px-5 py-3 flex items-center justify-between border-b border-[#31365b]">
        <div className="flex items-center space-x-2">
          <Wallet className="w-5 h-5 text-sky-400" />
          <h2 className="text-base font-bold tracking-wide">錢包與場館額度管理</h2>
        </div>
        <button
          onClick={handleRecycleAll}
          className="text-xs bg-sky-600 hover:bg-sky-500 text-white font-bold px-3 py-1 rounded-full cursor-pointer transition-colors"
        >
          一鍵額度歸集
        </button>
      </div>

      <div className="p-6 md:p-8 space-y-6 flex-1">
        {/* Main Wallet Display Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1d223d] to-[#282f56] text-white shadow-md flex items-center justify-between">
          <div>
            <div className="text-xs text-sky-300 font-medium">中心主錢包可用額度</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1">
              ฿ {user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-gray-400 mt-1">免轉錢包模式已開啟，進入遊戲自動帶入額度</div>
          </div>
          <button
            onClick={onRefreshBalance}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-5 h-5 text-white ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Sub Wallets Grid */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center space-x-1.5">
            <Layers className="w-4 h-4 text-sky-600" />
            <span>各遊戲場館額度明細</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {platformBalances.map((item, idx) => (
              <div
                key={idx}
                className="p-4 border border-gray-200 rounded-xl hover:border-sky-300 hover:shadow-xs transition-all bg-gray-50/50"
              >
                <div className="text-xs text-gray-500 font-medium">{item.name}</div>
                <div className="text-lg font-bold text-gray-900 mt-1">
                  ฿ {item.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between text-[11px]">
                  <button
                    onClick={() => onShowToast(`已將 ฿${item.balance} 轉入 ${item.name}`, 'success')}
                    className="text-sky-600 hover:text-sky-700 font-medium cursor-pointer"
                  >
                    轉入額度
                  </button>
                  <button
                    onClick={() => onShowToast(`已將 ${item.name} 餘額回收至主錢包`, 'success')}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    轉回主錢包
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
