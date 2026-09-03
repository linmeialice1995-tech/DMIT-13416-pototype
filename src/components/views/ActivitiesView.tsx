import React from 'react';
import { Trophy, Gift, Flame, Sparkles, Check } from 'lucide-react';

interface ActivitiesViewProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const ActivitiesView: React.FC<ActivitiesViewProps> = ({ onShowToast }) => {
  const activities = [
    {
      id: 1,
      title: '每日登入簽到 · 連續 7 天領 ฿888',
      desc: '每日只需登入並完成任意 ฿100 投注即可點擊簽到領取豪禮。',
      status: '可領取',
      banner: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80',
      badge: '熱門簽到',
    },
    {
      id: 2,
      title: '首存迎新 100% 豪禮返送',
      desc: '首次充值滿 ฿500 即贈 ฿500，最高可享 ฿3,888！',
      status: '進行中',
      banner: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=600&auto=format&fit=crop&q=80',
      badge: '首存特惠',
    },
    {
      id: 3,
      title: '百家樂連贏爭霸賽 · 獨享勞力士金錶',
      desc: '於真人視訊百家樂連贏達 8 局以上即可報名參賽瓜分豪華實體大獎。',
      status: '火熱報名',
      banner: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=600&auto=format&fit=crop&q=80',
      badge: '賽事挑戰',
    },
  ];

  return (
    <div className="flex-1 bg-white flex flex-col rounded-br-xl overflow-hidden min-h-[460px]">
      <div className="bg-[#242845] text-white px-5 py-3 flex items-center justify-between border-b border-[#31365b]">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold tracking-wide">精彩限時活動中心</h2>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-4 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((act) => (
            <div
              key={act.id}
              className="border border-gray-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col"
            >
              <div className="h-32 relative overflow-hidden bg-slate-900">
                <img
                  src={act.banner}
                  alt={act.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <span className="absolute top-3 left-3 bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {act.badge}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{act.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{act.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-sky-600">{act.status}</span>
                  <button
                    onClick={() => onShowToast(`您已成功申請參加「${act.title}」！`, 'success')}
                    className="px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-2xs"
                  >
                    立即參與
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
