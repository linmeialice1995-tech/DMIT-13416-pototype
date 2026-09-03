import React from 'react';
import { Crown, Sparkles, Gift, Check, ShieldAlert, Award } from 'lucide-react';
import { UserProfile } from '../../types';

interface VipViewProps {
  user: UserProfile;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const VipView: React.FC<VipViewProps> = ({ user, onShowToast }) => {
  const vipTiers = [
    { level: 1, name: '青銅會員', deposit: '0', rebate: '0.4%', monthlyBonus: '฿188' },
    { level: 2, name: '白銀會員', deposit: '10,000', rebate: '0.5%', monthlyBonus: '฿388' },
    { level: 3, name: '黃金會員', deposit: '50,000', rebate: '0.6%', monthlyBonus: '฿888' },
    { level: 4, name: '白金尊榮', deposit: '200,000', rebate: '0.8%', monthlyBonus: '฿1,888' },
    { level: 5, name: '黑卡鑽石', deposit: '1,000,000', rebate: '1.2%', monthlyBonus: '฿8,888' },
  ];

  return (
    <div className="flex-1 bg-white flex flex-col rounded-br-xl overflow-hidden min-h-[460px]">
      <div className="bg-[#242845] text-white px-5 py-3 flex items-center justify-between border-b border-[#31365b]">
        <div className="flex items-center space-x-2">
          <Crown className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold tracking-wide">VIP 尊榮俱樂部</h2>
        </div>
        <span className="text-xs text-amber-300 font-bold bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/40">
          當前等級：VIP {user.vipLevel}
        </span>
      </div>

      <div className="p-6 md:p-8 space-y-6 flex-1">
        {/* VIP Progress Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 rounded-2xl p-5 text-slate-900 shadow-md relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-2xl tracking-wider">VIP {user.vipLevel}</span>
                <span className="bg-black/80 text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full">
                  青銅特權會員
                </span>
              </div>
              <p className="text-xs text-slate-900 font-medium mt-1">
                距離升級 VIP {user.vipLevel + 1} 還需累積有效流水 ฿8,958
              </p>
            </div>
            <button
              onClick={() => onShowToast('已成功領取 VIP 每月專屬晉級禮金 ฿188！', 'success')}
              className="bg-black text-amber-400 font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-900 cursor-pointer shadow-md transition-all self-start md:self-auto"
            >
              領取本月晉級紅利
            </button>
          </div>

          <div className="mt-4 w-full bg-black/20 rounded-full h-2 overflow-hidden">
            <div className="bg-white h-full rounded-full w-[25%]" />
          </div>
        </div>

        {/* VIP Privilege Grid */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>尊榮會員特權一覽</span>
          </h3>
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3">等級</th>
                  <th className="px-4 py-3">頭銜</th>
                  <th className="px-4 py-3">晉升流水</th>
                  <th className="px-4 py-3">每日最高返水</th>
                  <th className="px-4 py-3">每月俸祿</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {vipTiers.map((tier) => (
                  <tr
                    key={tier.level}
                    className={tier.level === user.vipLevel ? 'bg-amber-50/60 font-semibold' : 'hover:bg-gray-50'}
                  >
                    <td className="px-4 py-3 flex items-center space-x-1.5">
                      <Award className={`w-4 h-4 ${tier.level === user.vipLevel ? 'text-amber-500' : 'text-gray-400'}`} />
                      <span>VIP {tier.level}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-800">{tier.name}</td>
                    <td className="px-4 py-3 text-gray-600">฿ {tier.deposit}</td>
                    <td className="px-4 py-3 text-sky-600 font-bold">{tier.rebate}</td>
                    <td className="px-4 py-3 text-amber-600 font-bold">{tier.monthlyBonus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
