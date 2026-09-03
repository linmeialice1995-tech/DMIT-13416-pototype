import React from 'react';
import { Megaphone, AlertCircle, Sparkles } from 'lucide-react';

export const AnnouncementsView: React.FC = () => {
  const list = [
    {
      id: 1,
      tag: '系統維護',
      tagColor: 'bg-amber-100 text-amber-800 border-amber-300',
      title: '9月1日伺服器例行線路升級維護公告',
      date: '2026-09-01 04:00',
      content: '親愛的會員您好：為提供更極致流暢的遊戲體驗，平台將於今日上午進行核心伺服器例行升級優化，期間存提款系統與各遊戲場館保持正常服務。',
    },
    {
      id: 2,
      tag: '最新活動',
      tagColor: 'bg-rose-100 text-rose-800 border-rose-300',
      title: '【金秋豪禮】PG 電子爭霸賽，總獎池高達 ฿1,000,000！',
      date: '2026-08-30 12:00',
      content: '凡於活動期間投注指定 PG 電子遊戲，累積洗碼量前 100 名玩家即可直接瓜分百萬現金大獎，無流水倍率限制！',
    },
    {
      id: 3,
      tag: '重要安全',
      tagColor: 'bg-sky-100 text-sky-800 border-sky-300',
      title: '官方防偽網址與客服唯一認證提醒',
      date: '2026-08-25 10:00',
      content: '近期發現有不肖人士假冒本娛樂城客服要求私下轉帳。請廣大會員認準官方唯一入口，所有充值請一律於網頁或官方 APP 內完成。',
    },
  ];

  return (
    <div className="flex-1 bg-white flex flex-col rounded-br-xl overflow-hidden min-h-[460px]">
      <div className="bg-[#242845] text-white px-5 py-3 flex items-center justify-between border-b border-[#31365b]">
        <div className="flex items-center space-x-2">
          <Megaphone className="w-5 h-5 text-sky-400" />
          <h2 className="text-base font-bold tracking-wide">官方最新公告</h2>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-4 flex-1">
        {list.map((item) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-xl hover:border-sky-300 hover:shadow-xs transition-all">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center space-x-2">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${item.tagColor}`}>
                  {item.tag}
                </span>
                <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">{item.date}</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
