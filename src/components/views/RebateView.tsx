import React from 'react';
import { Droplets, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { UserProfile } from '../../types';

interface RebateViewProps {
  user: UserProfile;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const RebateView: React.FC<RebateViewProps> = ({ user, onShowToast }) => {
  const handleClaimRebate = () => {
    onShowToast('恭喜！即時返水 ฿48.60 已自動劃轉至中心主錢包！', 'success');
  };

  return (
    <div className="flex-1 bg-white flex flex-col rounded-br-xl overflow-hidden min-h-[460px]">
      <div className="bg-[#242845] text-white px-5 py-3 flex items-center justify-between border-b border-[#31365b]">
        <div className="flex items-center space-x-2">
          <Droplets className="w-5 h-5 text-sky-400" />
          <h2 className="text-base font-bold tracking-wide">實時極速返水中心</h2>
        </div>
        <span className="text-xs text-sky-300">每日 00:00 自動結算</span>
      </div>

      <div className="p-6 md:p-8 space-y-6 flex-1">
        {/* Unclaimed Rebate Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-900 to-indigo-900 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-sky-200 font-medium">當前可領取即時返水金額</div>
            <div className="text-3xl font-extrabold text-amber-400 mt-1">฿ 48.60</div>
            <div className="text-xs text-gray-300 mt-1">今日累積有效洗碼量：฿ 12,150.00 (比例 0.4%)</div>
          </div>
          <button
            onClick={handleClaimRebate}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold rounded-xl shadow-md cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>一鍵領取返水</span>
          </button>
        </div>

        {/* Rebate Rates Table */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3">各遊戲分類返水比例標準</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { category: '電子遊藝', rate: '0.8%', desc: '全館老虎機、街機' },
              { category: '真人視訊', rate: '0.6%', desc: '百家樂、輪盤、骰寶' },
              { category: '體育賽事', rate: '0.5%', desc: '足球、籃球、電競' },
              { category: '棋牌與捕魚', rate: '0.7%', desc: '各類棋牌對戰' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-xl bg-gray-50/60">
                <div className="text-xs font-bold text-gray-800">{item.category}</div>
                <div className="text-xl font-extrabold text-sky-600 my-1">{item.rate}</div>
                <div className="text-[11px] text-gray-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
