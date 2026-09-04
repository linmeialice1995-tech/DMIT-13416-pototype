import React, { useState } from 'react';
import { X, Lock, Landmark, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { UserProfile } from '../../types';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onWithdrawSuccess: (amount: number, bank: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  user,
  onWithdrawSuccess,
  onShowToast,
}) => {
  const [amount, setAmount] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);
  const [selectedBank, setSelectedBank] = useState(`${user.bankName || 'ABBANK'} (${user.fullBankAccount || user.bankAccount || '01398829142432'})`);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmt = parseFloat(amount);

    if (isNaN(withdrawAmt) || withdrawAmt <= 0) {
      onShowToast('請輸入有效的提款金額', 'error');
      return;
    }
    if (withdrawAmt > user.balance) {
      onShowToast('提款金額不可大於帳戶可用餘額', 'error');
      return;
    }
    if (withdrawAmt < 100) {
      onShowToast('單筆最低提款金額為 ฿100', 'error');
      return;
    }
    if (!pin || pin.length < 4) {
      onShowToast('請輸入有效的提款安全密碼', 'error');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onWithdrawSuccess(withdrawAmt, selectedBank);
      onClose();
      onShowToast(`提款申請已送出！฿${withdrawAmt.toLocaleString()} 將於 3-5 分鐘內匯入您的銀行帳戶`, 'success');
    }, 1000);
  };

  const handleWithdrawAll = () => {
    setAmount(Math.floor(user.balance).toString());
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#242845] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <h3 className="text-base font-bold">申請提款</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* User Available Balance Card */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-sky-50 rounded-xl border border-sky-100 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 font-medium">當前可提現餘額</div>
              <div className="text-xl font-bold text-sky-700 mt-0.5">
                ฿ {user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <button
              type="button"
              onClick={handleWithdrawAll}
              className="text-xs bg-white text-sky-600 border border-sky-300 font-bold px-3 py-1.5 rounded-lg hover:bg-sky-50 cursor-pointer shadow-2xs"
            >
              全部提現
            </button>
          </div>

          {/* Receiving Bank Account */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              收款銀行帳戶
            </label>
            <div className="p-3.5 border border-sky-200 bg-sky-50/50 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-sky-600 text-white rounded-lg">
                  <Landmark className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-800">{selectedBank}</div>
                  <div className="text-[11px] text-gray-500">戶名: {user.realName}</div>
                </div>
              </div>
              <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                已核身
              </span>
            </div>
          </div>

          {/* Withdrawal Amount Input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              提款金額 (฿)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-gray-400 font-bold">฿</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="最低 ฿100"
                className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold focus:border-sky-500 focus:outline-hidden"
              />
            </div>
            <div className="flex justify-between items-center mt-1 text-[11px] text-gray-400">
              <span>今日免手續費提款剩餘：5 次</span>
              <span>單筆上限：฿100,000</span>
            </div>
          </div>

          {/* Security PIN */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              提款安全密碼
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-gray-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPin ? 'text' : 'password'}
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="請輸入取款密碼"
                className="w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold focus:border-sky-500 focus:outline-hidden tracking-widest"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                title={showPin ? '隱藏密碼' : '顯示密碼'}
              >
                {showPin ? <Eye className="w-4 h-4 text-sky-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>正在審核提交...</span>
              ) : (
                <>
                  <span>確認提款</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
