import React from 'react';
import { Mail, CheckCircle2, Trash2 } from 'lucide-react';

interface InboxViewProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const InboxView: React.FC<InboxViewProps> = ({ onShowToast }) => {
  const messages = [
    {
      id: 'm1',
      title: '【充值到帳通知】您於 09:15 的 ฿1,000.00 充值已成功入帳！',
      time: '2026-09-01 09:15:30',
      unread: true,
      content: '尊貴的會員您好，您透過 USDT-TRC20 存入的 ฿1,000.00 已自動入帳主錢包，祝您遊戲愉快、大獎連連！',
    },
    {
      id: 'm2',
      title: '【每日返水入帳】恭喜獲得今日自動返水 ฿42.23',
      time: '2026-08-30 00:05:00',
      unread: false,
      content: '系統已自動為您結算昨日投注洗碼返水 ฿42.23，金額已直接發放至您的帳戶。',
    },
    {
      id: 'm3',
      title: '【安全提醒】您的登入密碼已維持使用超過 90 天',
      time: '2026-08-20 14:00:00',
      unread: false,
      content: '為保障您的帳戶資金安全，建議定期前往「用戶安全」更換登入密碼。',
    },
  ];

  return (
    <div className="flex-1 bg-white flex flex-col rounded-br-xl overflow-hidden min-h-[460px]">
      <div className="bg-[#242845] text-white px-5 py-3 flex items-center justify-between border-b border-[#31365b]">
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-sky-400" />
          <h2 className="text-base font-bold tracking-wide">站內私密信箱</h2>
        </div>
        <button
          onClick={() => onShowToast('已將所有信件標記為已讀', 'success')}
          className="text-xs text-sky-300 hover:text-white cursor-pointer"
        >
          全部標為已讀
        </button>
      </div>

      <div className="p-6 md:p-8 space-y-3 flex-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-4 rounded-xl border transition-all ${
              msg.unread ? 'bg-sky-50/40 border-sky-200' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center space-x-2">
                {msg.unread && <span className="w-2 h-2 rounded-full bg-sky-500" />}
                <h4 className="text-sm font-bold text-gray-900">{msg.title}</h4>
              </div>
              <span className="text-xs text-gray-400">{msg.time}</span>
            </div>
            <p className="text-xs text-gray-600 pl-4">{msg.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
