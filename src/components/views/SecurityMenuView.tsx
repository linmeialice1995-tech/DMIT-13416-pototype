import React from 'react';
import { X, Wifi } from 'lucide-react';

export type SecurityMenuKey = 'password' | 'pin' | 'withdraw_account' | 'profile' | '2fa';

interface SecurityMenuViewProps {
  onSelectSubView: (subView: SecurityMenuKey) => void;
  twoFactorEnabled?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

export const SecurityMenuView: React.FC<SecurityMenuViewProps> = ({
  onSelectSubView,
  onClose,
  isMobile = false,
}) => {
  // Desktop Layout (Exact Replica of User's Desktop Screenshot)
  if (!isMobile) {
    return (
      <div className="w-full flex-1 bg-white p-8 sm:p-12 min-h-[600px] flex flex-col justify-start select-none animate-in fade-in duration-150">
        <div className="grid grid-cols-3 gap-6 sm:gap-8 max-w-4xl w-full">
          {/* Card 1: 修改密码 */}
          <button
            id="btn-desktop-security-password"
            type="button"
            onClick={() => onSelectSubView('password')}
            className="h-40 sm:h-48 w-full bg-[#dedede] hover:bg-[#d5d5d5] active:bg-[#cccccc] rounded-md flex flex-col items-center justify-center p-6 transition-all duration-150 cursor-pointer active:scale-[0.98] group shadow-xs"
          >
            <div className="w-16 h-16 flex items-center justify-center text-[#3d424a] group-hover:scale-105 transition-transform">
              {/* Slanted Key Icon matching user screenshot */}
              <svg className="w-14 h-14 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M15.7 3.3a4.8 4.8 0 0 0-4.4 6.7L3.6 17.7a1 1 0 0 0-.3.7V20a1 1 0 0 0 1 1h2.2a1 1 0 0 0 .7-.3l1.2-1.2 1.4 1.4a.7.7 0 0 0 1 0l1-1a.7.7 0 0 0 0-1l-1.4-1.4 1.5-1.5 1.4 1.4a.7.7 0 0 0 1 0l1-1a.7.7 0 0 0 0-1l-1.4-1.4 1.4-1.4a4.8 4.8 0 1 0-.4-7.9zm2.1 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-[#333333] text-sm sm:text-base font-normal tracking-wide mt-3.5 sm:mt-4">
              修改密码
            </span>
          </button>

          {/* Card 2: 修改取款密码 */}
          <button
            id="btn-desktop-security-pin"
            type="button"
            onClick={() => onSelectSubView('pin')}
            className="h-40 sm:h-48 w-full bg-[#dedede] hover:bg-[#d5d5d5] active:bg-[#cccccc] rounded-md flex flex-col items-center justify-center p-6 transition-all duration-150 cursor-pointer active:scale-[0.98] group shadow-xs"
          >
            <div className="w-16 h-16 flex items-center justify-center text-[#3d424a] group-hover:scale-105 transition-transform">
              {/* Solid Padlock Icon matching user screenshot */}
              <svg className="w-14 h-14 fill-current" viewBox="0 0 24 24">
                <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 8V7a3 3 0 0 1 6 0v3H9zm3 4a1.8 1.8 0 0 1 1.8 1.8c0 .65-.35 1.22-.88 1.54v1.66a.92.92 0 0 1-1.84 0v-1.66A1.79 1.79 0 0 1 10.2 16a1.8 1.8 0 0 1 1.8-1.8z" />
              </svg>
            </div>
            <span className="text-[#333333] text-sm sm:text-base font-normal tracking-wide mt-3.5 sm:mt-4">
              修改取款密码
            </span>
          </button>

          {/* Card 3: 修改取款帐号 */}
          <button
            id="btn-desktop-security-withdraw-account"
            type="button"
            onClick={() => onSelectSubView('withdraw_account')}
            className="h-40 sm:h-48 w-full bg-[#dedede] hover:bg-[#d5d5d5] active:bg-[#cccccc] rounded-md flex flex-col items-center justify-center p-6 transition-all duration-150 cursor-pointer active:scale-[0.98] group shadow-xs"
          >
            <div className="w-16 h-16 flex items-center justify-center text-[#3d424a] group-hover:scale-105 transition-transform">
              {/* Document notepad with bold pencil icon matching screenshot */}
              <svg className="w-14 h-14 text-[#3d424a]" viewBox="0 0 32 32" fill="none">
                <rect x="5" y="7" width="20" height="20" rx="3" stroke="#3d424a" strokeWidth="2.5" fill="none" />
                <line x1="10" y1="17" x2="18" y2="17" stroke="#3d424a" strokeWidth="2.5" strokeLinecap="round" />
                <path
                  d="M14 18L24 8L27 11L17 21L13 22L14 18Z"
                  fill="#dedede"
                  stroke="#3d424a"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <line x1="22" y1="10" x2="25" y2="13" stroke="#3d424a" strokeWidth="2.5" />
              </svg>
            </div>
            <span className="text-[#333333] text-sm sm:text-base font-normal tracking-wide mt-3.5 sm:mt-4">
              修改取款帐号
            </span>
          </button>

          {/* Card 4: 基本资料 */}
          <button
            id="btn-desktop-security-profile"
            type="button"
            onClick={() => onSelectSubView('profile')}
            className="h-40 sm:h-48 w-full bg-[#dedede] hover:bg-[#d5d5d5] active:bg-[#cccccc] rounded-md flex flex-col items-center justify-center p-6 transition-all duration-150 cursor-pointer active:scale-[0.98] group shadow-xs"
          >
            <div className="w-16 h-16 flex items-center justify-center text-[#3d424a] group-hover:scale-105 transition-transform">
              {/* User bust with pencil icon matching screenshot */}
              <svg className="w-14 h-14 fill-current" viewBox="0 0 24 24">
                <path d="M12 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm-7 17.5c0-3.3 2.7-6 6-6h1.2c-.1.3-.2.7-.2 1 0 .7.2 1.4.5 2h-1.5c-2.2 0-4 1.8-4 4v.5h7.2c.3.7.8 1.4 1.4 2H4.5a.5.5 0 0 1-.5-.5v-3z" />
                <path d="M19.6 12.4a1.2 1.2 0 0 0-1.7 0l-5.4 5.4-.5 2.1 2.1-.5 5.4-5.4a1.2 1.2 0 0 0 0-1.6z" />
              </svg>
            </div>
            <span className="text-[#333333] text-sm sm:text-base font-normal tracking-wide mt-3.5 sm:mt-4">
              基本资料
            </span>
          </button>

          {/* Card 5: 二阶段验证 */}
          <button
            id="btn-desktop-security-2fa"
            type="button"
            onClick={() => onSelectSubView('2fa')}
            className="h-40 sm:h-48 w-full bg-[#dedede] hover:bg-[#d5d5d5] active:bg-[#cccccc] rounded-md flex flex-col items-center justify-center p-6 transition-all duration-150 cursor-pointer active:scale-[0.98] group shadow-xs"
          >
            <div className="w-16 h-16 flex items-center justify-center text-[#3d424a] group-hover:scale-105 transition-transform">
              {/* Shield with 2FA text & check badge icon matching screenshot */}
              <svg className="w-14 h-14" viewBox="0 0 24 24">
                <path
                  d="M12 2L4 5.5v5.8c0 4.9 3.4 9.5 8 10.7 4.6-1.2 8-5.8 8-10.7V5.5L12 2z"
                  fill="#3d424a"
                />
                <text
                  x="12"
                  y="11.5"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="5"
                  fontWeight="900"
                  fontFamily="sans-serif"
                  letterSpacing="-0.2px"
                >
                  2FA
                </text>
                <circle cx="15.5" cy="15.5" r="3.2" fill="#3d424a" stroke="#dedede" strokeWidth="0.8" />
                <path
                  d="M14.3 15.5l.9.9 1.6-1.6"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
            <span className="text-[#333333] text-sm sm:text-base font-normal tracking-wide mt-3.5 sm:mt-4">
              二阶段验证
            </span>
          </button>
        </div>
      </div>
    );
  }

  // Mobile Layout (Exact Replica of User's Mobile Wine Red Screenshot)
  return (
    <div className="w-full flex-1 flex flex-col bg-[#480004] text-white animate-in fade-in duration-150 select-none relative min-h-[580px]">
      {/* 1. Header Bar matching screenshot: Solid Dark Red with Centered "用户安全" and White Circle Close Button */}
      <div className="w-full bg-[#8b0000] text-white py-3 px-4 flex items-center justify-center relative shadow-md">
        <h2 className="font-bold text-lg text-white tracking-wider">
          用户安全
        </h2>

        {/* White circle with red X button on the right */}
        <button
          id="btn-close-security-menu"
          type="button"
          onClick={onClose}
          className="absolute right-4 w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#8b0000] hover:bg-gray-100 active:scale-95 transition-transform cursor-pointer shadow-md"
          title="關閉"
        >
          <X className="w-4.5 h-4.5 text-[#8b0000] stroke-[3]" />
        </button>
      </div>

      {/* 2. Main Deep Wine Red Container with 5 Pill Buttons */}
      <div className="w-full flex-1 bg-[#480004] px-4 py-6 flex flex-col space-y-3.5 max-w-md mx-auto relative">
        {/* 1. 修改密码 */}
        <button
          id="btn-security-password"
          type="button"
          onClick={() => onSelectSubView('password')}
          className="w-full rounded-full border border-white py-2.5 px-5 flex items-center space-x-4 text-white bg-transparent hover:bg-white/10 active:bg-white/20 active:scale-[0.99] transition-all cursor-pointer shadow-xs group text-left"
        >
          <div className="w-6 h-6 flex items-center justify-center text-white shrink-0">
            {/* Slanted Key icon matching screenshot */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M15.7 3.3a4.8 4.8 0 0 0-4.4 6.7L3.6 17.7a1 1 0 0 0-.3.7V20a1 1 0 0 0 1 1h2.2a1 1 0 0 0 .7-.3l1.2-1.2 1.4 1.4a.7.7 0 0 0 1 0l1-1a.7.7 0 0 0 0-1l-1.4-1.4 1.5-1.5 1.4 1.4a.7.7 0 0 0 1 0l1-1a.7.7 0 0 0 0-1l-1.4-1.4 1.4-1.4a4.8 4.8 0 1 0-.4-7.9zm2.1 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-white text-base font-normal tracking-wide">
            修改密码
          </span>
        </button>

        {/* 2. 修改取款密码 */}
        <button
          id="btn-security-pin"
          type="button"
          onClick={() => onSelectSubView('pin')}
          className="w-full rounded-full border border-white py-2.5 px-5 flex items-center space-x-4 text-white bg-transparent hover:bg-white/10 active:bg-white/20 active:scale-[0.99] transition-all cursor-pointer shadow-xs group text-left"
        >
          <div className="w-6 h-6 flex items-center justify-center text-white shrink-0">
            {/* Solid Padlock icon matching screenshot */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 8V7a3 3 0 0 1 6 0v3H9zm3 4a1.8 1.8 0 0 1 1.8 1.8c0 .65-.35 1.22-.88 1.54v1.66a.92.92 0 0 1-1.84 0v-1.66A1.79 1.79 0 0 1 10.2 16a1.8 1.8 0 0 1 1.8-1.8z" />
            </svg>
          </div>
          <span className="text-white text-base font-normal tracking-wide">
            修改取款密码
          </span>
        </button>

        {/* 3. 修改取款帐号 */}
        <button
          id="btn-security-withdraw-account"
          type="button"
          onClick={() => onSelectSubView('withdraw_account')}
          className="w-full rounded-full border border-white py-2.5 px-5 flex items-center space-x-4 text-white bg-transparent hover:bg-white/10 active:bg-white/20 active:scale-[0.99] transition-all cursor-pointer shadow-xs group text-left"
        >
          <div className="w-6 h-6 flex items-center justify-center text-white shrink-0">
            {/* Account Passbook / Card icon matching screenshot */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <path d="M7 15h4" />
              <path d="M3 10h18" strokeWidth="2" />
              <circle cx="16.5" cy="15" r="1" fill="currentColor" />
            </svg>
          </div>
          <span className="text-white text-base font-normal tracking-wide">
            修改取款帐号
          </span>
        </button>

        {/* 4. 基本資料 */}
        <button
          id="btn-security-profile"
          type="button"
          onClick={() => onSelectSubView('profile')}
          className="w-full rounded-full border border-white py-2.5 px-5 flex items-center space-x-4 text-white bg-transparent hover:bg-white/10 active:bg-white/20 active:scale-[0.99] transition-all cursor-pointer shadow-xs group text-left"
        >
          <div className="w-6 h-6 flex items-center justify-center text-white shrink-0">
            {/* User with Pen icon matching screenshot */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm-7 17.5c0-3.3 2.7-6 6-6h1.2c-.1.3-.2.7-.2 1 0 .7.2 1.4.5 2h-1.5c-2.2 0-4 1.8-4 4v.5h7.2c.3.7.8 1.4 1.4 2H4.5a.5.5 0 0 1-.5-.5v-3z" />
              <path d="M19.6 12.4a1.2 1.2 0 0 0-1.7 0l-5.4 5.4-.5 2.1 2.1-.5 5.4-5.4a1.2 1.2 0 0 0 0-1.6z" />
            </svg>
          </div>
          <span className="text-white text-base font-normal tracking-wide">
            基本資料
          </span>
        </button>

        {/* 5. 二阶段验证 */}
        <button
          id="btn-security-2fa"
          type="button"
          onClick={() => onSelectSubView('2fa')}
          className="w-full rounded-full border border-white py-2.5 px-5 flex items-center space-x-4 text-white bg-transparent hover:bg-white/10 active:bg-white/20 active:scale-[0.99] transition-all cursor-pointer shadow-xs group text-left"
        >
          <div className="w-6 h-6 flex items-center justify-center text-white shrink-0">
            {/* Shield with 2FA text and checkmark badge matching screenshot */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M12 2L4 5.5v5.8c0 4.9 3.4 9.5 8 10.7 4.6-1.2 8-5.8 8-10.7V5.5L12 2z"
                fill="#ffffff"
              />
              <text
                x="12"
                y="11.5"
                textAnchor="middle"
                fill="#480004"
                fontSize="5"
                fontWeight="900"
                fontFamily="sans-serif"
                letterSpacing="-0.2px"
              >
                2FA
              </text>
              <circle cx="15.5" cy="15.5" r="3.2" fill="#ffffff" />
              <circle cx="15.5" cy="15.5" r="2.7" fill="#480004" />
              <path
                d="M14.3 15.5l.9.9 1.6-1.6"
                stroke="#ffffff"
                strokeWidth="0.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <span className="text-white text-base font-normal tracking-wide">
            二阶段验证
          </span>
        </button>

        {/* Right side floating WiFi widget as in screenshot */}
        <div className="fixed right-0 top-[115px] bg-[#33373d]/90 text-white pl-2 pr-1.5 py-1.5 rounded-l-full flex items-center shadow-lg border-y border-l border-white/20 pointer-events-none z-20">
          <Wifi className="w-3.5 h-3.5 text-[#30d2e8]" />
        </div>
      </div>
    </div>
  );
};


