import React, { useState } from 'react';
import { X, Send, Headphones, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../../types';

interface CustomerServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export const CustomerServiceModal: React.FC<CustomerServiceModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [messages, setMessages] = useState<{ sender: 'cs' | 'user'; text: string; time: string }[]>([
    {
      sender: 'cs',
      text: `尊貴的 VIP ${user.username} 您好！我是您的 7x24 專屬客服經理，請問今天有什麼可以為您服務的呢？`,
      time: '10:10',
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg = { sender: 'user' as const, text: inputVal, time: '10:12' };
    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'cs',
          text: '好的，已為您登記處理中！若有充值、提現或各項優惠領取問題，專員均可立即為您審核並加急發送。',
          time: '10:12',
        },
      ]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px] animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#242845] text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center text-white">
                <Headphones className="w-5 h-5" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#242845]" />
            </div>
            <div>
              <h3 className="font-bold text-sm">7x24 尊榮在線客服</h3>
              <p className="text-[10px] text-sky-300">平均回覆時間 &lt; 30 秒</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f8f9fa] text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 shadow-2xs ${
                  m.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}
              >
                <p className="leading-relaxed">{m.text}</p>
                <span className={`block text-[10px] mt-1 ${m.sender === 'user' ? 'text-sky-200' : 'text-gray-400'} text-right`}>
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-gray-200 bg-white flex items-center space-x-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="請輸入您想諮詢的問題..."
            className="flex-1 px-3.5 py-2 border border-gray-300 rounded-full text-xs focus:border-sky-500 focus:outline-hidden"
          />
          <button
            type="submit"
            className="p-2 bg-sky-600 hover:bg-sky-700 text-white rounded-full transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
