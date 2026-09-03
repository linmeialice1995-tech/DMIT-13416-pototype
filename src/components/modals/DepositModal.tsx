import React, { useState } from 'react';
import { X, QrCode, CheckCircle2, ArrowRight, ShieldAlert, Copy } from 'lucide-react';
import { UserProfile } from '../../types';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onDepositSuccess: (amount: number, channel: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
  user,
  onDepositSuccess,
  onShowToast,
}) => {
  const [channel, setChannel] = useState<'usdt' | 'bank' | 'convenience' | 'fast'>('usdt');
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('1000');
  const [usdtNetwork, setUsdtNetwork] = useState<'TRC20' | 'ERC20'>('TRC20');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const presetAmounts = [100, 500, 1000, 3000, 5000, 10000];

  const handleAmountClick = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount(amt.toString());
  };

  const handleCustomAmountChange = (val: string) => {
    setCustomAmount(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed)) {
      setSelectedAmount(parsed);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(customAmount);
    if (isNaN(amt) || amt <= 0) {
      onShowToast('請輸入有效的充值金額', 'error');
      return;
    }
    if (amt < 50) {
      onShowToast('單筆最低充值金額為 ฿50', 'error');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const channelNames: Record<string, string> = {
        usdt: `USDT (${usdtNetwork}) 加密充值`,
        bank: '銀行快捷轉帳',
        convenience: '超商條碼繳費',
        fast: '即時掃碼支付',
      };
      onDepositSuccess(amt, channelNames[channel]);
      onClose();
      onShowToast(`充值成功！已為您存入 ฿${amt.toLocaleString()}`, 'success');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#242845] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            <h3 className="text-base font-bold">線上充值中心</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Payment Method Channels */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              選擇充值方式
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setChannel('usdt')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  channel === 'usdt'
                    ? 'border-sky-500 bg-sky-50 text-sky-700 font-bold shadow-2xs'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="text-sm font-bold">USDT 加密</div>
                <div className="text-[10px] text-emerald-600 font-semibold">+2% 贈金</div>
              </button>

              <button
                type="button"
                onClick={() => setChannel('bank')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  channel === 'bank'
                    ? 'border-sky-500 bg-sky-50 text-sky-700 font-bold shadow-2xs'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="text-sm font-bold">網銀轉帳</div>
                <div className="text-[10px] text-gray-500">秒速到帳</div>
              </button>

              <button
                type="button"
                onClick={() => setChannel('convenience')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  channel === 'convenience'
                    ? 'border-sky-500 bg-sky-50 text-sky-700 font-bold shadow-2xs'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="text-sm font-bold">超商代碼</div>
                <div className="text-[10px] text-gray-500">7-11/全家</div>
              </button>

              <button
                type="button"
                onClick={() => setChannel('fast')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  channel === 'fast'
                    ? 'border-sky-500 bg-sky-50 text-sky-700 font-bold shadow-2xs'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="text-sm font-bold">快捷支付</div>
                <div className="text-[10px] text-gray-500">掃碼即付</div>
              </button>
            </div>
          </div>

          {/* USDT Network selector if USDT chosen */}
          {channel === 'usdt' && (
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
              <div className="text-xs font-semibold text-gray-700">選擇公鏈協議:</div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setUsdtNetwork('TRC20')}
                  className={`px-3 py-1 rounded text-xs font-bold ${
                    usdtNetwork === 'TRC20'
                      ? 'bg-sky-600 text-white'
                      : 'bg-white border text-gray-700'
                  }`}
                >
                  TRC20 (推薦)
                </button>
                <button
                  type="button"
                  onClick={() => setUsdtNetwork('ERC20')}
                  className={`px-3 py-1 rounded text-xs font-bold ${
                    usdtNetwork === 'ERC20'
                      ? 'bg-sky-600 text-white'
                      : 'bg-white border text-gray-700'
                  }`}
                >
                  ERC20
                </button>
              </div>
            </div>
          )}

          {/* Amount presets */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              快捷金額 (฿)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleAmountClick(amt)}
                  className={`py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    selectedAmount === amt
                      ? 'bg-sky-600 text-white border-sky-600'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  ฿{amt.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Amount input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              充值金額 (฿)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-gray-400 font-bold">฿</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                placeholder="請輸入充值金額"
                className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold focus:border-sky-500 focus:outline-hidden"
              />
            </div>
            <div className="flex justify-between items-center mt-1.5 text-[11px] text-gray-500">
              <span>單筆限額: ฿50 ~ ฿500,000</span>
              <span>當前帳戶餘額: ฿{user.balance.toLocaleString()}</span>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>正在建立安全訂單...</span>
              ) : (
                <>
                  <span>確認充值 ฿{parseFloat(customAmount || '0').toLocaleString()}</span>
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
