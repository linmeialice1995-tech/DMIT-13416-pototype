import React, { useState } from 'react';
import { Volume2, ChevronRight } from 'lucide-react';

interface MarqueeNewsProps {
  onOpenAnnouncements: () => void;
}

export const MarqueeNews: React.FC<MarqueeNewsProps> = ({ onOpenAnnouncements }) => {
  const notices = [
    '馬燈111',
    '【充值特惠】使用 USDT (TRC20) 入款即享 2% 無上限加贈紅利！',
    '【真人娛樂】每週首存贈 50% 迎新彩金，最高送 8,888！',
    '【防詐騙提醒】本平台官方客服絕不會主動索取您的登入或提款密碼。',
  ];

  const [currentIdx] = useState(0);

  return (
    <div className="w-full bg-[#272b49] text-white px-5 py-3 rounded-t-xl flex items-center justify-between border-b border-[#32375c]">
      <div className="flex items-center space-x-3 overflow-hidden flex-1">
        {/* Left Label Tag matching screenshot exact stacked layout */}
        <div className="flex flex-col text-[11px] sm:text-xs font-bold text-white leading-tight tracking-wider select-none shrink-0">
          <span>最 新</span>
          <span>消</span>
          <span>息 :</span>
        </div>

        {/* Marquee ticker text */}
        <div
          className="flex-1 overflow-hidden cursor-pointer pl-1"
          onClick={onOpenAnnouncements}
        >
          <p className="text-xs sm:text-sm text-gray-200 truncate hover:text-amber-300 transition-colors font-medium">
            {notices[currentIdx]}
          </p>
        </div>
      </div>

      {/* Right button to view all */}
      <button
        id="btn-all-notices"
        onClick={onOpenAnnouncements}
        className="text-xs text-gray-400 hover:text-sky-300 ml-2 flex items-center space-x-0.5 whitespace-nowrap cursor-pointer"
      >
        <span>查看詳情</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
