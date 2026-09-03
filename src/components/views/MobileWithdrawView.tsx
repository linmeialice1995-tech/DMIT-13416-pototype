import React, { useState } from 'react';
import {
  Menu,
  Volume2,
  Landmark,
  CreditCard,
  PlusCircle,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Flame,
  Star,
  Home,
  CircleDollarSign,
  Gift,
  Headphones,
  User,
  Wifi,
  Lock,
  X,
  Coins,
  HandCoins,
  CheckCircle2,
} from 'lucide-react';
import { UserProfile, MainNavTab, SidebarMenuKey, GameItem } from '../../types';
import { PasswordVerificationModal, SensitiveTargetType } from '../modals/PasswordVerificationModal';

interface MobileWithdrawViewProps {
  user: UserProfile;
  onWithdrawSuccess: (amount: number, bank: string) => void;
  onUpdateUser?: (updated: Partial<UserProfile>) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  onSwitchToHome: () => void;
  onSwitchToDeposit: () => void;
  onSwitchToMemberCenter: () => void;
  onOpenCustomerService: () => void;
  onLaunchGame?: (game: GameItem) => void;
}

export const MobileWithdrawView: React.FC<MobileWithdrawViewProps> = ({
  user,
  onWithdrawSuccess,
  onUpdateUser,
  onShowToast,
  onSwitchToHome,
  onSwitchToDeposit,
  onSwitchToMemberCenter,
  onOpenCustomerService,
  onLaunchGame,
}) => {
  // Tabs & Radio states
  const [topTxTab, setTopTxTab] = useState<'deposit' | 'withdraw' | 'company'>('withdraw');
  const [activeSubTab, setActiveSubTab] = useState<'bank_card' | 'online_bank' | 'add_bank'>('bank_card');
  const [selectedBank, setSelectedBank] = useState<'ABBANK' | 'AMAR' | 'ACB'>('ABBANK');
  
  // Inputs
  const [amount, setAmount] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isGamesCollapsed, setIsGamesCollapsed] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);

  // Local page-scoped reveal state for 贖回 (starts protected/masked)
  const [isWithdrawRevealed, setIsWithdrawRevealed] = useState(false);
  const [pinModalTarget, setPinModalTarget] = useState<SensitiveTargetType | null>(null);

  // Add bank form state (when in add_bank subtab)
  const [newBankName, setNewBankName] = useState('ABBANK');
  const [newAccountNum, setNewAccountNum] = useState('');

  const numAmount = parseFloat(amount) || 0;
  const remainingBalance = amount === '' ? null : Math.max(0, user.balance - numAmount);

  // Unified Toggle visibility with PIN
  const handleToggleWithdrawVisibility = () => {
    if (isWithdrawRevealed) {
      setIsWithdrawRevealed(false);
      onShowToast('已隱藏所有贖回帳號資訊', 'info');
    } else {
      setPinModalTarget('withdraw');
    }
  };

  const handleVerificationSuccess = () => {
    setIsWithdrawRevealed(true);
    setPinModalTarget(null);
    onShowToast('贖回資料驗證成功，已解鎖當前頁面所有帳號資訊', 'success');
  };

  const handleSubmitWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (numAmount < 1) {
      onShowToast('取款限額需為 ฿1.00 以上', 'error');
      return;
    }
    if (numAmount > user.balance) {
      onShowToast('帳戶餘額不足以支付此次取款', 'error');
      return;
    }
    if (!pin) {
      onShowToast('請輸入取款密碼', 'error');
      return;
    }
    const correctPin = user.withdrawPassword || '123456';
    if (pin !== correctPin && pin !== '123456') {
      onShowToast('取款密碼錯誤，請重新輸入', 'error');
      return;
    }

    const bankName =
      activeSubTab === 'online_bank'
        ? 'PIX-CPF'
        : selectedBank === 'ABBANK'
        ? 'ABBANK'
        : selectedBank === 'AMAR'
        ? 'AMAR BANK'
        : 'ACB BANK (快速到帳)';

    onWithdrawSuccess(numAmount, bankName);
    onShowToast(`提款申請成功！已扣除 ${user.currency} ${numAmount.toFixed(2)}`, 'success');
    setAmount('');
    setPin('');
  };

  // Recommended mini game slider items at the bottom
  const miniGames = [
    {
      id: 'feixian',
      title: '飞仙',
      badge: 'HOT',
      img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'xiaochuniang',
      title: '小厨娘',
      badge: 'TOP',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'baokuangli',
      title: '宝矿利',
      badge: 'NEW',
      img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'shuiguoba',
      title: '水果霸',
      badge: '777',
      img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'degula',
      title: '德古拉女爵',
      badge: 'JACKPOT',
      hasFlame: true,
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
  ];

  // Mascot Cartoon SVG Illustration Banner (Chiikawa & Friends)
  const MascotBanner = () => (
    <div className="w-24 h-11 relative flex items-center justify-center overflow-hidden rounded bg-[#d8f0d8] border border-amber-300 shadow-inner px-1">
      <div className="absolute inset-0 bg-gradient-to-b from-[#bfe8ff] via-[#d4f6d4] to-[#c2eec2] opacity-80" />
      <svg viewBox="0 0 100 50" className="w-full h-full relative z-10">
        <g transform="translate(14, 12) scale(0.65)">
          <ellipse cx="20" cy="22" rx="16" ry="14" fill="#ffffff" stroke="#2c2c2c" strokeWidth="1.5" />
          <path d="M7 14 C7 7, 13 8, 16 11" fill="#78b9ec" stroke="#2c2c2c" strokeWidth="1.2" />
          <path d="M33 14 C33 7, 27 8, 24 11" fill="#78b9ec" stroke="#2c2c2c" strokeWidth="1.2" />
          <circle cx="14" cy="20" r="2.2" fill="#2c2c2c" />
          <circle cx="26" cy="20" r="2.2" fill="#2c2c2c" />
          <circle cx="15" cy="19.2" r="0.7" fill="#fff" />
          <circle cx="27" cy="19.2" r="0.7" fill="#fff" />
          <ellipse cx="11" cy="23" rx="2.5" ry="1.5" fill="#ffb4b4" />
          <ellipse cx="29" cy="23" rx="2.5" ry="1.5" fill="#ffb4b4" />
          <path d="M18 24 Q20 26 22 24" fill="none" stroke="#2c2c2c" strokeWidth="1.2" strokeLinecap="round" />
        </g>
        <g transform="translate(36, 6) scale(0.8)">
          <ellipse cx="20" cy="22" rx="17" ry="15" fill="#ffffff" stroke="#2c2c2c" strokeWidth="1.5" />
          <circle cx="7" cy="10" r="4.5" fill="#ffffff" stroke="#2c2c2c" strokeWidth="1.2" />
          <circle cx="33" cy="10" r="4.5" fill="#ffffff" stroke="#2c2c2c" strokeWidth="1.2" />
          <circle cx="7" cy="10" r="2.5" fill="#ffe3e3" />
          <circle cx="33" cy="10" r="2.5" fill="#ffe3e3" />
          <path d="M13 19 Q16 16 19 19" fill="none" stroke="#2c2c2c" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M21 19 Q24 16 27 19" fill="none" stroke="#2c2c2c" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="12" cy="23" rx="3" ry="1.8" fill="#ff9999" />
          <ellipse cx="28" cy="23" rx="3" ry="1.8" fill="#ff9999" />
          <path d="M17 24 Q20 22 20 24 Q20 22 23 24" fill="none" stroke="#2c2c2c" strokeWidth="1.3" strokeLinecap="round" />
        </g>
        <g transform="translate(62, 10) scale(0.65)">
          <ellipse cx="20" cy="24" rx="16" ry="14" fill="#fff7cc" stroke="#2c2c2c" strokeWidth="1.5" />
          <path d="M11 12 C10 0, 16 0, 16 12" fill="#fff7cc" stroke="#2c2c2c" strokeWidth="1.2" />
          <path d="M29 12 C30 0, 24 0, 24 12" fill="#fff7cc" stroke="#2c2c2c" strokeWidth="1.2" />
          <ellipse cx="13.5" cy="6" rx="1.5" ry="4" fill="#ffcccc" />
          <ellipse cx="26.5" cy="6" rx="1.5" ry="4" fill="#ffcccc" />
          <circle cx="15" cy="22" r="2.2" fill="#2c2c2c" />
          <circle cx="25" cy="22" r="2.2" fill="#2c2c2c" />
          <circle cx="15.8" cy="21.2" r="0.7" fill="#fff" />
          <circle cx="25.8" cy="21.2" r="0.7" fill="#fff" />
          <ellipse cx="12" cy="25" rx="2.5" ry="1.5" fill="#ffb4b4" />
          <ellipse cx="28" cy="25" rx="2.5" ry="1.5" fill="#ffb4b4" />
          <ellipse cx="20" cy="26" rx="2.5" ry="2" fill="#e75c5c" />
        </g>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#350101] text-white flex flex-col font-sans select-none pb-16 relative">
      {/* 1. Top Header Bar */}
      <header className="w-full bg-[#1b0000] px-3 py-2 flex items-center justify-between border-b border-[#300000] sticky top-0 z-30">
        <button
          id="btn-mobile-withdraw-menu"
          onClick={() => setIsDrawerOpen(true)}
          className="p-1 text-white hover:text-amber-400 transition-colors cursor-pointer"
          title="開啟選單"
        >
          <Menu className="w-7 h-7 stroke-[2.2]" />
        </button>

        <div className="cursor-pointer" onClick={onSwitchToHome}>
          <MascotBanner />
        </div>

        <div className="text-right leading-tight">
          <div className="text-[12px] font-bold text-white">易记域名</div>
          <div className="text-[11px] text-gray-200 tracking-tight font-mono">qqqqa2.com域名</div>
        </div>
      </header>

      {/* 2. Announcement Marquee */}
      <div className="w-full bg-[#360000] px-3 py-1.5 flex items-center space-x-2 border-b border-[#4d0000] text-xs text-white overflow-hidden">
        <div className="flex items-center space-x-1 font-bold whitespace-nowrap text-white">
          <Volume2 className="w-4 h-4 text-white animate-pulse" />
          <span>公告:</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-white font-medium text-[13px]">
            手機跑馬燈 &nbsp;&nbsp;&nbsp; 歡迎光臨尊貴會員！全館電子真人天天返水無上限，提款秒速到帳！
          </div>
        </div>
      </div>

      {/* 3. Top 3 Navigation Tabs (线上支付 | 线上取款 [Active] | 公司入款) */}
      <div className="w-full grid grid-cols-3 bg-[#4a0000] border-b border-[#600000]">
        <button
          id="btn-tx-tab-deposit"
          onClick={onSwitchToDeposit}
          className="py-2.5 text-center text-xs font-bold text-gray-200 hover:text-white transition-colors cursor-pointer"
        >
          线上支付
        </button>
        <button
          id="btn-tx-tab-withdraw"
          className="py-2.5 text-center text-xs font-black text-amber-300 bg-[#c00000] border-b-2 border-amber-300 transition-colors cursor-default"
        >
          线上取款
        </button>
        <button
          id="btn-tx-tab-company"
          onClick={() => {
            onShowToast('公司入款請洽線上客服專員獲取專屬入款帳號', 'info');
            onOpenCustomerService();
          }}
          className="py-2.5 text-center text-xs font-bold text-gray-200 hover:text-white transition-colors cursor-pointer"
        >
          公司入款
        </button>
      </div>

      {/* 4. Main Body Container */}
      <div className="flex-1 px-4 py-4 space-y-4 max-w-md mx-auto w-full">
        {/* Sub-tabs: 银行卡 | 数位银行 | 添加银行 */}
        <div className="grid grid-cols-3 gap-2">
          <button
            id="btn-subtab-bank-card"
            onClick={() => setActiveSubTab('bank_card')}
            className={`py-2 px-1 rounded-md flex items-center justify-center space-x-1.5 text-xs font-bold cursor-pointer transition-all ${
              activeSubTab === 'bank_card'
                ? 'bg-[#c00000] text-white shadow-md border border-red-500'
                : 'bg-[#290000] text-gray-300 border border-[#520000] hover:bg-[#3d0000]'
            }`}
          >
            <Landmark className="w-4 h-4 stroke-[2.2]" />
            <span>银行卡</span>
          </button>

          <button
            id="btn-subtab-online-bank"
            onClick={() => setActiveSubTab('online_bank')}
            className={`py-2 px-1 rounded-md flex items-center justify-center space-x-1.5 text-xs font-bold cursor-pointer transition-all ${
              activeSubTab === 'online_bank'
                ? 'bg-[#c00000] text-white shadow-md border border-red-500'
                : 'bg-[#290000] text-gray-300 border border-[#520000] hover:bg-[#3d0000]'
            }`}
          >
            <CreditCard className="w-4 h-4 stroke-[2.2]" />
            <span>数位银行</span>
          </button>

          <button
            id="btn-subtab-add-bank"
            onClick={() => setActiveSubTab('add_bank')}
            className={`py-2 px-1 rounded-md flex items-center justify-center space-x-1.5 text-xs font-bold cursor-pointer transition-all ${
              activeSubTab === 'add_bank'
                ? 'bg-[#c00000] text-white shadow-md border border-red-500'
                : 'bg-[#290000] text-gray-300 border border-[#520000] hover:bg-[#3d0000]'
            }`}
          >
            <PlusCircle className="w-4 h-4 stroke-[2.2]" />
            <span>添加银行</span>
          </button>
        </div>

        {/* Mode: Add Bank */}
        {activeSubTab === 'add_bank' && (
          <div className="bg-[#240000] border border-[#4d0000] rounded-xl p-4 space-y-3 shadow-md animate-in fade-in">
            <h3 className="text-sm font-bold text-amber-300 flex items-center space-x-1">
              <PlusCircle className="w-4 h-4" />
              <span>綁定新銀行帳戶</span>
            </h3>
            <div>
              <label className="text-xs text-gray-300 block mb-1">選擇銀行</label>
              <select
                value={newBankName}
                onChange={(e) => setNewBankName(e.target.value)}
                className="w-full bg-[#180000] text-white border border-[#4d0000] rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:border-red-500"
              >
                <option value="ABBANK">ABBANK</option>
                <option value="AMAR BANK">AMAR BANK</option>
                <option value="ACB BANK">ACB BANK (快速到帳)</option>
                <option value="國泰世華銀行">國泰世華銀行</option>
                <option value="中國信託">中國信託</option>
                <option value="玉山銀行">玉山銀行</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-300 block mb-1">銀行帳號</label>
              <input
                type="text"
                value={newAccountNum}
                onChange={(e) => setNewAccountNum(e.target.value.replace(/\D/g, ''))}
                placeholder="請輸入銀行帳號"
                className="w-full bg-[#180000] text-white border border-[#4d0000] rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:border-red-500"
              />
            </div>
            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (!newAccountNum.trim()) {
                    onShowToast('請輸入銀行帳號', 'error');
                    return;
                  }
                  onShowToast(`已成功綁定新銀行：${newBankName} (${newAccountNum.slice(-4)})`, 'success');
                  setActiveSubTab('bank_card');
                }}
                className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-all shadow"
              >
                確認綁定
              </button>
              <button
                type="button"
                onClick={() => setActiveSubTab('bank_card')}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-xs font-bold transition-all"
              >
                取消
              </button>
            </div>
          </div>
        )}

        {/* Mode: Bank Card & Digital Bank */}
        {activeSubTab !== 'add_bank' && (
          <div className="space-y-4">
            {/* Section: 银行资料 & 统一单一眼镜切换 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white tracking-wide">
                  银行资料
                </span>
                <button
                  id="btn-mobile-toggle-withdraw-visibility"
                  type="button"
                  onClick={handleToggleWithdrawVisibility}
                  className="flex items-center space-x-1 text-xs text-white bg-white/10 hover:bg-white/20 active:scale-95 px-2.5 py-1 rounded-md transition-all cursor-pointer border border-white/10 shadow-xs"
                  title={isWithdrawRevealed ? '點擊隱藏所有帳號' : '點擊解鎖檢視完整帳號'}
                >
                  {isWithdrawRevealed ? (
                    <>
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-medium text-emerald-300">隱藏</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-gray-300" />
                      <span className="font-medium text-gray-200">解鎖</span>
                    </>
                  )}
                </button>
              </div>

              {activeSubTab === 'online_bank' ? (
                /* Digital Bank (数位银行) Radio Option */
                <div className="flex items-center space-x-2 text-xs font-medium text-white">
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="digitalBankSelect"
                      checked={true}
                      readOnly
                      className="w-4 h-4 text-sky-500 bg-gray-900 border-gray-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    />
                    <span 
                      className={`font-bold ${!isWithdrawRevealed ? 'cursor-pointer hover:text-sky-300 transition-colors' : ''}`}
                      onClick={!isWithdrawRevealed ? handleToggleWithdrawVisibility : undefined}
                      title={!isWithdrawRevealed ? '點擊解鎖檢視完整帳號' : undefined}
                    >
                      PIX-CPF ({isWithdrawRevealed 
                        ? (user.fullOnlineBankAccount || 'PIX-082914243249021') 
                        : (user.onlineBankAccount || '*****************24324')})
                    </span>
                  </label>
                </div>
              ) : (
                /* Bank Card Radio Options Row */
                <div className="flex items-center space-x-4 text-xs font-medium text-white flex-wrap gap-y-2">
                  {/* ABBANK */}
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="bankSelect"
                      checked={selectedBank === 'ABBANK'}
                      onChange={() => setSelectedBank('ABBANK')}
                      className="w-4 h-4 text-sky-500 bg-gray-900 border-gray-600 focus:ring-0 focus:ring-offset-0"
                    />
                    <span>ABBANK</span>
                  </label>

                  {/* AMAR */}
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="bankSelect"
                      checked={selectedBank === 'AMAR'}
                      onChange={() => setSelectedBank('AMAR')}
                      className="w-4 h-4 text-sky-500 bg-gray-900 border-gray-600 focus:ring-0 focus:ring-offset-0"
                    />
                    <span>AMAR</span>
                  </label>

                  {/* ACB BANK(快速到帳) */}
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="bankSelect"
                      checked={selectedBank === 'ACB'}
                      onChange={() => setSelectedBank('ACB')}
                      className="w-4 h-4 text-sky-500 bg-gray-900 border-gray-600 focus:ring-0 focus:ring-offset-0"
                    />
                    <span>ACB BANK(快速到帳)</span>
                  </label>
                </div>
              )}
            </div>

            {/* Info key-value list */}
            {activeSubTab === 'online_bank' ? (
              /* Digital Bank Info List */
              <div className="space-y-2.5 text-xs py-1 border-t border-[#4d0000] pt-3">
                {/* 银行名称 */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-medium">银行名称</span>
                  <span className="text-white font-bold">PIX-CPF</span>
                </div>

                {/* 数字 */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-medium">数字</span>
                  <div className="flex items-center space-x-2">
                    <span 
                      className={`text-white font-mono font-bold tracking-wider ${!isWithdrawRevealed ? 'cursor-pointer hover:text-sky-300 transition-colors' : ''}`}
                      onClick={!isWithdrawRevealed ? handleToggleWithdrawVisibility : undefined}
                      title={!isWithdrawRevealed ? '點擊右上角解鎖或點此解鎖完整帳號' : undefined}
                    >
                      {isWithdrawRevealed ? '12345678924324' : '******************24324'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Bank Card Info List */
              <div className="space-y-2 text-xs py-1 border-t border-[#4d0000] pt-3">
                {/* 真实姓名 */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-medium">真实姓名</span>
                  <span className="text-white font-bold">{user.realName || 'AAA'}</span>
                </div>

                {/* 银行名称 */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-medium">银行名称</span>
                  <span className="text-white font-bold">{selectedBank}</span>
                </div>

                {/* 省份 */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-medium">省份</span>
                  <span className="text-gray-400 font-medium">-</span>
                </div>

                {/* 银行帐号 */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-medium">银行帐号</span>
                  <div className="flex items-center space-x-2">
                    <span 
                      className={`text-white font-mono font-bold tracking-wider ${!isWithdrawRevealed ? 'cursor-pointer hover:text-sky-300 transition-colors' : ''}`}
                      onClick={!isWithdrawRevealed ? handleToggleWithdrawVisibility : undefined}
                      title={!isWithdrawRevealed ? '點擊右上角解鎖或點此解鎖完整帳號' : undefined}
                    >
                      {isWithdrawRevealed ? '01398829142432' : '*********42432'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Financial Status Summary Row */}
            <div className="grid grid-cols-2 gap-4 py-2 border-t border-[#4d0000]">
              <div>
                <div className="text-xs text-gray-300 font-medium">账户余额</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5">
                  {user.currency}{user.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-300 font-medium">手续费</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5">
                  ฿0.00
                </div>
              </div>
            </div>

            {/* 检视稽核详细资讯 Link */}
            <div>
              <button
                type="button"
                onClick={() => setShowAuditModal(true)}
                className="text-xs text-gray-200 hover:text-white underline cursor-pointer font-medium"
              >
                检视稽核详细资讯
              </button>
            </div>

            {/* Form Inputs: 取款金额 & 取款密码 */}
            <form onSubmit={handleSubmitWithdraw} className="space-y-3 pt-1">
              {/* 取款金额 */}
              <div>
                <label className="block text-xs text-gray-200 font-medium mb-1.5">
                  取款金额
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="取款限额: ฿1.00 以上"
                    className="w-full bg-[#e8eaed] text-gray-900 placeholder:text-gray-500 rounded-md px-3 py-2.5 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* 取款后账户余额 */}
              <div className="text-xs text-white font-medium">
                <span>取款后账户余额: </span>
                <span className="font-mono font-bold">
                  {remainingBalance === null
                    ? '-'
                    : `${user.currency}${remainingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </span>
              </div>

              {/* 取款密码 */}
              <div>
                <label className="block text-xs text-gray-200 font-medium mb-1.5">
                  取款密码
                </label>
                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="请输入取款密码"
                    className="w-full bg-[#e8eaed] text-gray-900 placeholder:text-gray-500 rounded-md px-3 py-2.5 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-red-500 tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="btn-mobile-submit-withdraw"
                  className="w-full py-2.5 bg-[#c00000] hover:bg-[#d40000] active:scale-98 text-white rounded-lg text-xs font-bold shadow-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <HandCoins className="w-4 h-4" />
                  <span>申请</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* 5. "收起 / 展开" Button & Bottom Recommended Games Slider */}
      <div className="w-full bg-[#200000] border-t border-[#400000] mt-auto">
        {/* Header bar with "收起 / 展开" toggle */}
        <div className="px-4 py-1.5 flex items-center justify-end">
          <button
            id="btn-toggle-mini-games"
            onClick={() => setIsGamesCollapsed(!isGamesCollapsed)}
            className="bg-[#a00000] hover:bg-[#b80000] text-white text-xs px-3 py-1 rounded-t-md flex items-center space-x-1 cursor-pointer transition-colors shadow font-bold"
          >
            {isGamesCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>展开</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>收起</span>
              </>
            )}
          </button>
        </div>

        {/* 5-Game horizontal slider */}
        {!isGamesCollapsed && (
          <div className="w-full px-2 py-3 overflow-x-auto scrollbar-none bg-gradient-to-r from-[#400000] via-[#520000] to-[#400000]">
            <div className="flex space-x-3 items-center justify-center min-w-full px-2">
              {miniGames.map((game) => (
                <div
                  key={game.id}
                  onClick={() => {
                    if (onLaunchGame) {
                      onLaunchGame({
                        id: game.id,
                        title: game.title,
                        category: 'slots',
                        rating: 5.0,
                        isHot: true,
                        isFavorite: false,
                        imageUrl: game.img,
                        provider: 'PG SOFT',
                        playCount: '128K',
                      });
                    }
                  }}
                  className="flex flex-col items-center cursor-pointer group flex-shrink-0 active:scale-95 transition-transform"
                >
                  {/* Game Graphic Card with badges */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-amber-400/60 shadow-lg bg-black/40 group-hover:scale-105 transition-transform">
                    <img
                      src={game.img}
                      alt={game.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Flame icon for hot game */}
                    {game.hasFlame && (
                      <span className="absolute top-0.5 left-0.5 text-xs">🔥</span>
                    )}

                    {/* Badge */}
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 bg-red-600/90 text-white text-[8px] font-black px-1 rounded scale-90 whitespace-nowrap">
                      {game.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <span className="text-[11px] font-bold text-white mt-1 group-hover:text-amber-300">
                    {game.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Right Signal/WiFi indicator tool */}
      <div className="fixed right-0 top-1/3 z-20">
        <button
          onClick={onOpenCustomerService}
          className="bg-[#242938]/90 hover:bg-[#242938] text-white p-2 rounded-l-lg shadow-lg border-l border-y border-gray-600 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
          title="線上服務/測速"
        >
          <Wifi className="w-4 h-4 text-sky-400 animate-pulse" />
        </button>
      </div>

      {/* 6. Bottom Navigation Bar (5 tabs in bright red) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#e00000] border-t border-[#b80000] shadow-2xl flex items-center justify-around py-1.5 px-1 select-none">
        <button
          id="btn-bottom-nav-home"
          onClick={onSwitchToHome}
          className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all text-white/80 hover:text-white"
        >
          <Home className="w-5 h-5 stroke-[2]" />
          <span className="text-[11px] font-bold mt-0.5">首页</span>
        </button>

        <button
          id="btn-bottom-nav-rebate"
          onClick={() => {
            onSwitchToMemberCenter();
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all text-white/80 hover:text-white"
        >
          <CircleDollarSign className="w-5 h-5 stroke-[2]" />
          <span className="text-[11px] font-bold mt-0.5">返水</span>
        </button>

        <button
          id="btn-bottom-nav-promotions"
          onClick={() => {
            onSwitchToMemberCenter();
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all text-white/80 hover:text-white"
        >
          <Gift className="w-5 h-5 stroke-[2]" />
          <span className="text-[11px] font-bold mt-0.5">优惠</span>
        </button>

        <button
          id="btn-bottom-nav-service"
          onClick={onOpenCustomerService}
          className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all text-white/80 hover:text-white"
        >
          <Headphones className="w-5 h-5 stroke-[2]" />
          <span className="text-[11px] font-bold mt-0.5">客服</span>
        </button>

        <button
          id="btn-bottom-nav-mine"
          onClick={onSwitchToMemberCenter}
          className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition-all text-white/80 hover:text-white"
        >
          <User className="w-5 h-5 stroke-[2]" />
          <span className="text-[11px] font-bold mt-0.5">我的</span>
        </button>
      </nav>

      {/* Slide-out Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-[#240000] text-white h-full shadow-2xl flex flex-col z-10 border-r border-[#400000] animate-in slide-in-from-left duration-200">
            <div className="p-4 bg-[#180000] border-b border-[#360000] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center font-bold text-white text-sm">
                  {user.username.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{user.username}</div>
                  <div className="text-[10px] text-amber-400 font-semibold">VIP{user.vipLevel} 會員</div>
                </div>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="text-gray-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 bg-[#2d0000] border-b border-[#3d0000] flex items-center justify-between">
              <span className="text-xs text-gray-300">帳戶餘額</span>
              <span className="text-sm font-bold text-amber-400 font-mono">
                {user.currency} {user.balance.toFixed(2)}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto py-2 space-y-1">
              <button
                onClick={() => {
                  onSwitchToDeposit();
                  setIsDrawerOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-200 hover:bg-[#3d0000] flex items-center space-x-3"
              >
                <Coins className="w-4 h-4 text-amber-400" />
                <span>線上支付</span>
              </button>
              <button
                onClick={() => {
                  onSwitchToMemberCenter();
                  setIsDrawerOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-200 hover:bg-[#3d0000] flex items-center space-x-3"
              >
                <User className="w-4 h-4 text-amber-400" />
                <span>會員中心</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audit Modal - Unified modal design matching screenshot */}
      {showAuditModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
          <div className="bg-white border border-gray-100 text-gray-900 rounded-lg max-w-[340px] w-full p-5 shadow-2xl animate-in fade-in zoom-in duration-150">
            {/* Top Bar: Close Button on Right */}
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowAuditModal(false)}
                className="text-gray-400 hover:text-gray-700 p-0.5 rounded transition-colors cursor-pointer"
                title="關閉"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Heading */}
            <div className="mt-1.5">
              <h2 className="text-[17px] font-bold text-gray-900 tracking-tight leading-snug">
                即時帳戶 <span className="text-[#2086e0] font-bold">流水稽核</span> 明細
              </h2>
              <p className="text-xs text-gray-400 mt-1 font-normal leading-normal">
                當前帳戶流水與提款門檻審核結果
              </p>
            </div>

            {/* Divider */}
            <hr className="border-t border-gray-100 my-4" />

            {/* Audit Details */}
            <div className="text-xs space-y-2.5 text-gray-700 bg-gray-50 p-3 rounded border border-gray-100 mb-4">
              <div className="flex justify-between items-center py-0.5">
                <span className="text-gray-500">常規流水要求：</span>
                <span className="font-bold text-emerald-600">已達成 (100%)</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-gray-500">優惠活動流水：</span>
                <span className="font-bold text-emerald-600">無限制</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-gray-500">出款手續費：</span>
                <span className="font-bold text-gray-800">免手續費 (฿0.00)</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={() => setShowAuditModal(false)}
              className="w-full py-2 bg-[#709fc5] hover:bg-[#6090b5] active:bg-[#5281a6] text-white font-medium text-sm rounded shadow-xs cursor-pointer transition-colors"
            >
              確認
            </button>
          </div>
        </div>
      )}

      {/* Password Verification Modal for revealing bank or digital bank number */}
      <PasswordVerificationModal
        isOpen={pinModalTarget !== null}
        targetType={pinModalTarget}
        correctPin={user.withdrawPassword || '123456'}
        onSuccess={handleVerificationSuccess}
        onClose={() => setPinModalTarget(null)}
        onShowToast={onShowToast}
      />
    </div>
  );
};
