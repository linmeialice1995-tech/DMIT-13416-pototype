import React from 'react';
import { Users, Copy, Gift, Share2, Sparkles, Award } from 'lucide-react';
import { UserProfile } from '../../types';

interface ReferralViewProps {
  user: UserProfile;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const ReferralView: React.FC<ReferralViewProps> = ({ user, onShowToast }) => {
  const referralLink = `https://demo-gaming.vip/register?aff=${user.username}&code=888999`;
  const referralCode = 'VIP-888999';

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`已複製${label}至剪貼簿！`, 'success');
  };

  return (
    <div className="flex-1 bg-white flex flex-col rounded-br-xl overflow-hidden min-h-[460px]">
      <div className="bg-[#242845] text-white px-5 py-3 flex items-center justify-between border-b border-[#31365b]">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-sky-400" />
          <h2 className="text-base font-bold tracking-wide">好友推薦聯盟中心</h2>
        </div>
        <span className="text-xs text-amber-300 font-bold">享無限代佣金分紅</span>
      </div>

      <div className="p-6 md:p-8 space-y-6 flex-1">
        {/* Promotion Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-700 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1 bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-bold mb-1">
              <Gift className="w-3.5 h-3.5 text-amber-300" />
              <span>邀請好友雙向獲利</span>
            </div>
            <h3 className="text-xl font-bold">每成功推薦一位好友，現領 ฿288 獎金</h3>
            <p className="text-xs text-sky-100 mt-1">更有終身 0.15% 遊戲洗碼量階梯分紅無上限！</p>
          </div>
          <div className="text-center bg-black/20 p-3 rounded-xl border border-white/20 min-w-[140px]">
            <div className="text-xs text-sky-200">累計推薦收益</div>
            <div className="text-2xl font-black text-amber-300">฿ 1,280.00</div>
          </div>
        </div>

        {/* Exclusive Referral Links */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">專屬推薦推廣連結</label>
            <div className="flex">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="w-full px-3 py-2 border border-gray-300 rounded-l-lg text-xs bg-gray-50 text-gray-600 focus:outline-hidden"
              />
              <button
                onClick={() => copyToClipboard(referralLink, '推薦連結')}
                className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-4 rounded-r-lg flex items-center space-x-1 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>複製</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">專屬聯盟邀請碼</label>
            <div className="flex max-w-xs">
              <input
                type="text"
                readOnly
                value={referralCode}
                className="w-full px-3 py-2 border border-gray-300 rounded-l-lg text-xs font-mono font-bold bg-gray-50 text-gray-800"
              />
              <button
                onClick={() => copyToClipboard(referralCode, '邀請碼')}
                className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-4 rounded-r-lg flex items-center space-x-1 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>複製</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
