import React, { useState } from 'react';
import { Landmark, Plus, ArrowLeftRight, Eye, EyeOff } from 'lucide-react';
import { UserProfile } from '../../types';
import { PasswordVerificationModal, SensitiveTargetType } from '../modals/PasswordVerificationModal';

interface WithdrawViewProps {
  user: UserProfile;
  onWithdrawSuccess: (amount: number, bank: string) => void;
  onUpdateUser?: (updated: Partial<UserProfile>) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

type WithdrawMethod = 'bank_card' | 'online_bank' | 'add_bank';

export const WithdrawView: React.FC<WithdrawViewProps> = ({
  user,
  onWithdrawSuccess,
  onUpdateUser,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<WithdrawMethod>('bank_card');
  const [selectedBankOption, setSelectedBankOption] = useState<'ABBANK' | 'AMAR' | 'ACB'>('ABBANK');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('0');
  const [withdrawPin, setWithdrawPin] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);

  // Local page-scoped reveal state for 贖回 (starts protected/masked)
  const [isWithdrawRevealed, setIsWithdrawRevealed] = useState(false);

  // PIN Verification Modal state
  const [pinModalTarget, setPinModalTarget] = useState<SensitiveTargetType | null>(null);

  // Add bank form state
  const [newBankName, setNewBankName] = useState('國泰世華銀行');
  const [newAccountNum, setNewAccountNum] = useState('');
  const [newBranch, setNewBranch] = useState('');

  const numAmount = parseFloat(withdrawAmount) || 0;
  const remainingBalance = Math.max(0, user.balance - numAmount);

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

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numAmount < 1) {
      onShowToast('取款金額需為 ฿1.00 以上', 'error');
      return;
    }
    if (numAmount > user.balance) {
      onShowToast('帳戶餘額不足以支付此次取款', 'error');
      return;
    }
    if (!withdrawPin) {
      onShowToast('請輸入取款密碼', 'error');
      return;
    }

    const bankName =
      selectedBankOption === 'ABBANK'
        ? 'ABBANK (尾號 42432)'
        : selectedBankOption === 'AMAR'
        ? 'AMAR BANK'
        : 'ACB BANK (快速到帳)';

    onWithdrawSuccess(numAmount, bankName);
    onShowToast(`提款申請已送出！申請贖回 ${user.currency} ${numAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 'success');
    setWithdrawAmount('0');
    setWithdrawPin('');
  };

  const handleAddBankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccountNum.trim()) {
      onShowToast('請輸入銀行卡號', 'error');
      return;
    }
    onShowToast(`已成功添加新銀行帳號：${newBankName} (${newAccountNum.slice(-4)})`, 'success');
    setActiveTab('bank_card');
  };

  return (
    <div className="flex-1 bg-[#1d2139] p-6 sm:p-8 min-h-[460px] flex flex-col justify-start space-y-6">
      {/* 3 Top Category Cards matching screenshot exactly */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
        {/* 1. 銀行卡 (Bank Card) - Selected in screenshot */}
        <button
          id="btn-withdraw-bankcard"
          onClick={() => setActiveTab('bank_card')}
          className={`flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-lg transition-all duration-200 cursor-pointer text-center border ${
            activeTab === 'bank_card'
              ? 'bg-[#242845] border-[#f5a623] ring-1 ring-[#f5a623] shadow-md'
              : 'bg-[#242845] hover:bg-[#2c3254] border-[#31375b]'
          }`}
        >
          {/* Yellow Bank Icon with Dollar */}
          <div className="flex items-center text-[#f5a623]">
            <svg className="w-7 h-7 fill-[#f5a623]" viewBox="0 0 24 24">
              <path d="M12 1L2 6v2h20V6L12 1zm-7 9v8h2v-8H5zm5 0v8h2v-8h-2zm5 0v8h2v-8h-2zm5 0v8h2v-8h-2zM2 20v2h20v-2H2z" />
            </svg>
            <span className="text-xs font-black -ml-1 text-[#f5a623]">$</span>
          </div>
          <span className="text-white font-bold text-sm sm:text-base tracking-wide">
            銀行卡
          </span>
        </button>

        {/* 2. 數位銀行 (Digital Banking) */}
        <button
          id="btn-withdraw-online"
          onClick={() => setActiveTab('online_bank')}
          className={`flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-lg transition-all duration-200 cursor-pointer text-center border ${
            activeTab === 'online_bank'
              ? 'bg-[#242845] border-[#f5a623] ring-1 ring-[#f5a623] shadow-md'
              : 'bg-[#242845] hover:bg-[#2c3254] border-[#31375b]'
          }`}
        >
          <div className="flex items-center text-[#f5a623]">
            <svg className="w-7 h-7 fill-[#f5a623]" viewBox="0 0 24 24">
              <path d="M12 1L2 6v2h20V6L12 1zm-7 9v8h2v-8H5zm5 0v8h2v-8h-2zm5 0v8h2v-8h-2zm5 0v8h2v-8h-2zM2 20v2h20v-2H2z" />
            </svg>
            <ArrowLeftRight className="w-3.5 h-3.5 -ml-1 text-[#f5a623] stroke-[3]" />
          </div>
          <span className="text-white font-bold text-sm sm:text-base tracking-wide">
            數位銀行
          </span>
        </button>

        {/* 3. 添加銀行 (Add Bank) */}
        <button
          id="btn-withdraw-addbank"
          onClick={() => setActiveTab('add_bank')}
          className={`flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-lg transition-all duration-200 cursor-pointer text-center border ${
            activeTab === 'add_bank'
              ? 'bg-[#242845] border-[#f5a623] ring-1 ring-[#f5a623] shadow-md'
              : 'bg-[#242845] hover:bg-[#2c3254] border-[#31375b]'
          }`}
        >
          <div className="flex items-center text-[#f5a623]">
            <svg className="w-7 h-7 fill-[#f5a623]" viewBox="0 0 24 24">
              <path d="M12 1L2 6v2h20V6L12 1zm-7 9v8h2v-8H5zm5 0v8h2v-8h-2zm5 0v8h2v-8h-2zm5 0v8h2v-8h-2zM2 20v2h20v-2H2z" />
            </svg>
            <Plus className="w-4 h-4 -ml-1 text-[#f5a623] stroke-[3.5]" />
          </div>
          <span className="text-white font-bold text-sm sm:text-base tracking-wide">
            添加銀行
          </span>
        </button>
      </div>

      {/* Main Dark Navy Content Form Area matching screenshot */}
      {activeTab === 'bank_card' && (
        <div className="w-full max-w-4xl bg-[#232845] rounded-lg border border-[#31375b] p-6 sm:p-8 text-white space-y-6">
          {/* Top Pill Badge & Unified Single Eye Toggle */}
          <div className="flex items-center justify-between">
            <span className="inline-block bg-[#3c446a] text-white text-xs font-semibold px-4 py-1.5 rounded-xs tracking-wider">
              銀行資料
            </span>
            <button
              id="btn-toggle-withdraw-visibility"
              type="button"
              onClick={handleToggleWithdrawVisibility}
              className="flex items-center space-x-1.5 text-xs text-white bg-white/10 hover:bg-white/20 active:scale-95 px-3 py-1.5 rounded-md transition-all cursor-pointer border border-white/10 shadow-xs"
              title={isWithdrawRevealed ? '點擊隱藏所有帳號' : '點擊解鎖檢視完整帳號'}
            >
              {isWithdrawRevealed ? (
                <>
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium text-emerald-300">隱藏</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4 text-gray-300" />
                  <span className="font-medium text-gray-200">解鎖</span>
                </>
              )}
            </button>
          </div>

          {/* Bank Info Table matching screenshot */}
          <div className="space-y-3 text-xs sm:text-sm border-b border-[#31375b] pb-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 font-medium w-32">真實姓名</span>
              <span className="text-white font-semibold text-right flex-1">{user.realName || 'AAA'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 font-medium w-32">銀行名稱</span>
              <span className="text-white font-semibold text-right flex-1">ABBANK</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 font-medium w-32">省份</span>
              <span className="text-white font-semibold text-right flex-1">-</span>
            </div>
            <div className="flex items-center justify-between py-0.5">
              <span className="text-gray-300 font-medium w-32">銀行帳號</span>
              <div className="flex items-center space-x-2.5 text-right">
                <span 
                  className={`text-white font-mono font-bold text-sm tracking-wider ${!isWithdrawRevealed ? 'cursor-pointer hover:text-sky-300 transition-colors' : ''}`}
                  onClick={!isWithdrawRevealed ? handleToggleWithdrawVisibility : undefined}
                  title={!isWithdrawRevealed ? '點擊解鎖檢視完整帳號' : undefined}
                >
                  {isWithdrawRevealed
                    ? user.fullBankAccount || '01398829142432'
                    : user.bankAccount || '*********42432'}
                </span>
              </div>
            </div>
          </div>

          {/* Audit detail link */}
          <div>
            <button
              type="button"
              onClick={() => onShowToast('稽核狀態：目前流水已達標，無需額外手續費', 'info')}
              className="text-xs text-gray-400 hover:text-sky-300 transition-colors cursor-pointer"
            >
              檢視稽核詳細資訊
            </button>
          </div>

          {/* Form Controls */}
          <form onSubmit={handleWithdrawSubmit} className="space-y-5">
            {/* 取款方式 Radio List matching screenshot */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-gray-200">
                取款方式
              </label>
              <div className="space-y-2 text-xs sm:text-sm text-gray-200">
                <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="withdrawBank"
                    checked={selectedBankOption === 'ABBANK'}
                    onChange={() => setSelectedBankOption('ABBANK')}
                    className="w-4 h-4 text-sky-500 bg-transparent border-gray-400 focus:ring-0 cursor-pointer"
                  />
                  <span className="font-semibold text-white">ABBANK</span>
                </label>

                <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="withdrawBank"
                    checked={selectedBankOption === 'AMAR'}
                    onChange={() => setSelectedBankOption('AMAR')}
                    className="w-4 h-4 text-sky-500 bg-transparent border-gray-400 focus:ring-0 cursor-pointer"
                  />
                  <span>AMAR</span>
                </label>

                <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="withdrawBank"
                    checked={selectedBankOption === 'ACB'}
                    onChange={() => setSelectedBankOption('ACB')}
                    className="w-4 h-4 text-sky-500 bg-transparent border-gray-400 focus:ring-0 cursor-pointer"
                  />
                  <span>ACB BANK(快速到帳)</span>
                </label>
              </div>
            </div>

            {/* Balance & Limits 2-Column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm pt-2">
              <div>
                <span className="block text-gray-300 font-medium mb-1">帳戶餘額</span>
                <span className="text-white font-bold tracking-wide">
                  {user.currency}{user.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="block text-gray-300 font-medium mb-1">取款限額</span>
                <span className="text-white font-bold tracking-wide">
                  {user.currency}1.00 以上
                </span>
              </div>
            </div>

            {/* 手續費 */}
            <div className="text-xs sm:text-sm">
              <span className="block text-gray-300 font-medium mb-1">手續費</span>
              <span className="text-white font-bold tracking-wide">{user.currency}0.00</span>
            </div>

            {/* 取款金額 */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">
                取款金額
              </label>
              <input
                type="number"
                min="1"
                step="any"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full max-w-lg bg-white text-gray-900 px-3.5 py-2.5 rounded-sm text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#f5a623]"
                placeholder="0"
              />
            </div>

            {/* 取款後帳戶餘額 */}
            <div className="text-xs sm:text-sm">
              <span className="block text-gray-300 font-medium mb-1">取款後帳戶餘額</span>
              <div className="flex items-center space-x-2">
                <span className="text-white font-bold tracking-wide">
                  {user.currency}{remainingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast(
                      `計算過程：目前餘額 ${user.currency}${user.balance.toFixed(2)} - 申請取款 ${user.currency}${numAmount.toFixed(2)} = 預估剩餘 ${user.currency}${remainingBalance.toFixed(2)}`,
                      'info'
                    )
                  }
                  className="text-xs text-gray-400 hover:text-sky-300 cursor-pointer"
                >
                  檢視計算過程
                </button>
              </div>
            </div>

            {/* 取款密碼 */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">
                取款密碼
              </label>
              <div className="relative w-full max-w-lg">
                <input
                  type={showPin ? 'text' : 'password'}
                  maxLength={6}
                  value={withdrawPin}
                  onChange={(e) => setWithdrawPin(e.target.value)}
                  placeholder="請輸入您的取款密碼"
                  className="w-full bg-white text-gray-900 px-3.5 py-2.5 pr-10 rounded-sm text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#f5a623]"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 申請 Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="btn-submit-withdraw"
                className="w-full max-w-lg py-3 bg-[#f5a623] hover:bg-[#e0961d] active:bg-[#cb8617] text-white font-bold text-base rounded-sm shadow-md transition-all cursor-pointer text-center"
              >
                申請
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Online Banking Tab - Matching screenshot */}
      {activeTab === 'online_bank' && (
        <div className="w-full max-w-4xl bg-[#232845] rounded-lg border border-[#31375b] p-6 sm:p-8 text-white space-y-6 animate-in fade-in duration-150">
          {/* Top Pill Badge & Unified Single Eye Toggle */}
          <div className="flex items-center justify-between">
            <span className="inline-block bg-[#3c446a] text-white text-xs font-semibold px-4 py-1.5 rounded-xs tracking-wider">
              銀行資料
            </span>
            <button
              id="btn-toggle-online-withdraw-visibility"
              type="button"
              onClick={handleToggleWithdrawVisibility}
              className="flex items-center space-x-1.5 text-xs text-white bg-white/10 hover:bg-white/20 active:scale-95 px-3 py-1.5 rounded-md transition-all cursor-pointer border border-white/10 shadow-xs"
              title={isWithdrawRevealed ? '點擊隱藏所有帳號' : '點擊解鎖檢視完整帳號'}
            >
              {isWithdrawRevealed ? (
                <>
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium text-emerald-300">隱藏</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4 text-gray-300" />
                  <span className="font-medium text-gray-200">解鎖</span>
                </>
              )}
            </button>
          </div>

          {/* Bank Info Table for Online Bank */}
          <div className="space-y-3 text-xs sm:text-sm border-b border-[#31375b] pb-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 font-medium w-32">銀行名稱</span>
              <span className="text-white font-semibold text-right flex-1">PIX-CPF</span>
            </div>
            <div className="flex items-center justify-between py-0.5">
              <span className="text-gray-300 font-medium w-32">數字</span>
              <div className="flex items-center space-x-2.5 text-right">
                <span 
                  className={`text-white font-mono font-bold text-sm tracking-wider ${!isWithdrawRevealed ? 'cursor-pointer hover:text-sky-300 transition-colors' : ''}`}
                  onClick={!isWithdrawRevealed ? handleToggleWithdrawVisibility : undefined}
                  title={!isWithdrawRevealed ? '點擊解鎖檢視完整帳號' : undefined}
                >
                  {isWithdrawRevealed
                    ? user.fullOnlineBankAccount || 'PIX-082914243249021'
                    : user.onlineBankAccount || '*****************24324'}
                </span>
              </div>
            </div>
          </div>

          {/* Audit detail link */}
          <div>
            <button
              type="button"
              onClick={() => onShowToast('稽核狀態：目前流水已達標，無需額外手續費', 'info')}
              className="text-xs text-gray-400 hover:text-sky-300 transition-colors cursor-pointer"
            >
              檢視稽核詳細資訊
            </button>
          </div>

          {/* Form Controls */}
          <form onSubmit={handleWithdrawSubmit} className="space-y-5">
            {/* 取款方式 Radio matching screenshot with synchronous unlock */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-gray-200">
                取款方式
              </label>
              <div className="text-xs sm:text-sm text-gray-200">
                <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="withdrawOnlineMethod"
                    defaultChecked
                    className="w-4 h-4 text-sky-500 bg-transparent border-gray-400 focus:ring-0 cursor-pointer"
                  />
                  <span 
                    className={`font-semibold text-white ${!isWithdrawRevealed ? 'cursor-pointer hover:text-sky-300 transition-colors' : ''}`}
                    onClick={!isWithdrawRevealed ? handleToggleWithdrawVisibility : undefined}
                    title={!isWithdrawRevealed ? '點擊解鎖檢視完整帳號' : undefined}
                  >
                    PIX-CPF ({isWithdrawRevealed 
                      ? (user.fullOnlineBankAccount || 'PIX-082914243249021') 
                      : (user.onlineBankAccount || '*****************24324')})
                  </span>
                </label>
              </div>
            </div>

            {/* Balance & Limits 2-Column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm pt-2">
              <div>
                <span className="block text-gray-300 font-medium mb-1">帳戶餘額</span>
                <span className="text-white font-bold tracking-wide">
                  {user.currency}{user.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="block text-gray-300 font-medium mb-1">取款限額</span>
                <span className="text-white font-bold tracking-wide">
                  {user.currency}1.00 以上
                </span>
              </div>
            </div>

            {/* 手續費 */}
            <div className="text-xs sm:text-sm">
              <span className="block text-gray-300 font-medium mb-1">手續費</span>
              <span className="text-white font-bold tracking-wide">{user.currency}0.00</span>
            </div>

            {/* 取款金額 */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">
                取款金額
              </label>
              <input
                type="number"
                min="1"
                step="any"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full max-w-lg bg-white text-gray-900 px-3.5 py-2.5 rounded-sm text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#f5a623]"
                placeholder="0"
              />
            </div>

            {/* 取款後帳戶餘額 */}
            <div className="text-xs sm:text-sm">
              <span className="block text-gray-300 font-medium mb-1">取款後帳戶餘額</span>
              <div className="flex items-center space-x-2">
                <span className="text-white font-bold tracking-wide">
                  {user.currency}{remainingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast(
                      `計算過程：目前餘額 ${user.currency}${user.balance.toFixed(2)} - 申請取款 ${user.currency}${numAmount.toFixed(2)} = 預估剩餘 ${user.currency}${remainingBalance.toFixed(2)}`,
                      'info'
                    )
                  }
                  className="text-xs text-gray-400 hover:text-sky-300 cursor-pointer"
                >
                  檢視計算過程
                </button>
              </div>
            </div>

            {/* 取款密碼 */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">
                取款密碼
              </label>
              <div className="relative w-full max-w-lg">
                <input
                  type={showPin ? 'text' : 'password'}
                  maxLength={6}
                  value={withdrawPin}
                  onChange={(e) => setWithdrawPin(e.target.value)}
                  placeholder="請輸入您的取款密碼"
                  className="w-full bg-white text-gray-900 px-3.5 py-2.5 pr-10 rounded-sm text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#f5a623]"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 申請 Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="btn-submit-withdraw-online"
                className="w-full max-w-lg py-3 bg-[#f5a623] hover:bg-[#e0961d] active:bg-[#cb8617] text-white font-bold text-base rounded-sm shadow-md transition-all cursor-pointer text-center"
              >
                申請
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Bank Tab */}
      {activeTab === 'add_bank' && (
        <div className="w-full max-w-4xl bg-[#232845] rounded-lg border border-[#31375b] p-6 sm:p-8 text-white space-y-5 animate-in fade-in duration-150">
          <div>
            <span className="inline-block bg-[#3c446a] text-white text-xs font-semibold px-4 py-1.5 rounded-xs tracking-wider">
              綁定提現銀行卡
            </span>
          </div>
          <form onSubmit={handleAddBankSubmit} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1">
                開戶銀行
              </label>
              <select
                value={newBankName}
                onChange={(e) => setNewBankName(e.target.value)}
                className="w-full bg-white text-gray-900 px-3 py-2 rounded text-sm focus:outline-hidden"
              >
                <option value="國泰世華銀行">國泰世華銀行 (013)</option>
                <option value="中國信託銀行">中國信託銀行 (822)</option>
                <option value="玉山銀行">玉山銀行 (808)</option>
                <option value="台北富邦銀行">台北富邦銀行 (012)</option>
                <option value="台新銀行">台新銀行 (812)</option>
                <option value="ABBANK">ABBANK</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1">
                開戶姓名 (需與認證姓名一致)
              </label>
              <input
                type="text"
                disabled
                value={user.realName || 'AAA'}
                className="w-full bg-gray-200 text-gray-600 px-3 py-2 rounded text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1">
                銀行帳號 / 卡號
              </label>
              <input
                type="text"
                value={newAccountNum}
                onChange={(e) => setNewAccountNum(e.target.value)}
                placeholder="請輸入銀行帳號"
                className="w-full bg-white text-gray-900 px-3 py-2 rounded text-sm focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1">
                開戶分行 (選填)
              </label>
              <input
                type="text"
                value={newBranch}
                onChange={(e) => setNewBranch(e.target.value)}
                placeholder="例如：台北分行"
                className="w-full bg-white text-gray-900 px-3 py-2 rounded text-sm focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#f5a623] hover:bg-[#e0961d] text-white font-bold rounded text-sm shadow-md cursor-pointer transition-colors"
            >
              確認添加銀行卡
            </button>
          </form>
        </div>
      )}

      {/* Shared Password Verification Modal */}
      <PasswordVerificationModal
        isOpen={pinModalTarget !== null}
        onClose={() => setPinModalTarget(null)}
        targetType={pinModalTarget}
        correctPin={user.withdrawPassword || '123456'}
        onSuccess={handleVerificationSuccess}
        onShowToast={onShowToast}
      />
    </div>
  );
};
