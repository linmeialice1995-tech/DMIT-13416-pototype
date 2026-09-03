import React, { useState } from 'react';
import { Globe, QrCode, Building2, CreditCard, ChevronRight, CheckCircle2, Copy, AlertCircle } from 'lucide-react';
import { UserProfile } from '../../types';

interface DepositViewProps {
  user: UserProfile;
  onDepositSuccess: (amount: number, channel: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

type DepositMethodType = 'company' | 'online' | 'scan' | null;

export const DepositView: React.FC<DepositViewProps> = ({
  user,
  onDepositSuccess,
  onShowToast,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<DepositMethodType>(null);
  const [depositAmount, setDepositAmount] = useState<string>('1000');
  const [depositorName, setDepositorName] = useState<string>(user.realName || 'AAA');
  const [selectedBank, setSelectedBank] = useState<string>('台灣銀行 (004)');

  const quickAmounts = [500, 1000, 2000, 5000, 10000, 20000];

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(depositAmount);
    if (isNaN(num) || num <= 0) {
      onShowToast('請輸入有效的充值金額', 'error');
      return;
    }
    const channelName =
      selectedMethod === 'company'
        ? '公司入款-銀行轉帳'
        : selectedMethod === 'online'
        ? '線上快速支付'
        : '銀行掃描支付';

    onDepositSuccess(num, channelName);
    onShowToast(`充值訂單已提交！成功存入 ${user.currency} ${num.toLocaleString()}`, 'success');
  };

  return (
    <div className="flex-1 bg-white p-6 sm:p-8 min-h-[460px] flex flex-col justify-start rounded-br-xl space-y-6">
      {/* 3 Top Category Cards matching screenshot exactly */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
        {/* 1. 公司入款 (Company Deposit) */}
        <button
          id="btn-deposit-company"
          onClick={() => setSelectedMethod(selectedMethod === 'company' ? null : 'company')}
          className={`flex items-center space-x-3.5 px-6 py-4 rounded-lg transition-all duration-200 cursor-pointer text-left border ${
            selectedMethod === 'company'
              ? 'bg-[#1b2038] border-emerald-500 shadow-md ring-2 ring-emerald-500/50'
              : 'bg-[#242845] hover:bg-[#2c3254] border-[#31375b]'
          }`}
        >
          {/* Green Grid Globe Icon matching screenshot */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-emerald-400">
            <svg
              className="w-9 h-9 stroke-emerald-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <span className="text-white font-bold text-sm sm:text-base tracking-wide">
            公司入款
          </span>
        </button>

        {/* 2. 線上支付 (Online Payment) */}
        <button
          id="btn-deposit-online"
          onClick={() => setSelectedMethod(selectedMethod === 'online' ? null : 'online')}
          className={`flex items-center space-x-3.5 px-6 py-4 rounded-lg transition-all duration-200 cursor-pointer text-left border ${
            selectedMethod === 'online'
              ? 'bg-[#1b2038] border-emerald-500 shadow-md ring-2 ring-emerald-500/50'
              : 'bg-[#242845] hover:bg-[#2c3254] border-[#31375b]'
          }`}
        >
          {/* Green Grid Globe Icon matching screenshot */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-emerald-400">
            <svg
              className="w-9 h-9 stroke-emerald-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <span className="text-white font-bold text-sm sm:text-base tracking-wide">
            線上支付
          </span>
        </button>

        {/* 3. 銀行掃描 (Bank Scan / QR Scan) */}
        <button
          id="btn-deposit-scan"
          onClick={() => setSelectedMethod(selectedMethod === 'scan' ? null : 'scan')}
          className={`flex items-center space-x-3.5 px-6 py-4 rounded-lg transition-all duration-200 cursor-pointer text-left border ${
            selectedMethod === 'scan'
              ? 'bg-[#1b2038] border-amber-400 shadow-md ring-2 ring-amber-400/50'
              : 'bg-[#242845] hover:bg-[#2c3254] border-[#31375b]'
          }`}
        >
          {/* Gold/Yellow QR Scanner Icon matching screenshot */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-amber-400">
            <svg
              className="w-9 h-9 stroke-amber-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="3" height="3" />
              <path d="M14 20h3" />
              <path d="M20 14v6" />
            </svg>
          </div>
          <span className="text-white font-bold text-sm sm:text-base tracking-wide">
            銀行掃描
          </span>
        </button>
      </div>

      {/* Main Content Box matching screenshot */}
      <div className="w-full max-w-4xl border border-gray-300 rounded-sm bg-white overflow-hidden p-4 sm:p-5">
        {selectedMethod === null ? (
          /* Default state matching screenshot: Light blue alert banner */
          <div className="w-full bg-[#dbeafe]/80 border border-[#bfdbfe] text-[#1e40af] px-4 py-3 rounded-xs flex items-center space-x-2 text-xs sm:text-sm font-medium">
            {/* Blue Info Circle */}
            <svg
              className="w-4 h-4 text-[#2563eb] fill-current"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span>請選擇存款方式</span>
          </div>
        ) : (
          /* Detailed Payment Form when a method is selected */
          <form onSubmit={handleDepositSubmit} className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-gray-800">
                  {selectedMethod === 'company' && '公司入款通道 (銀行轉帳)'}
                  {selectedMethod === 'online' && '線上即時支付通道 (網銀/USDT)'}
                  {selectedMethod === 'scan' && '銀行二維碼掃描支付'}
                </span>
                <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  支援 24/7 秒速到帳
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMethod(null)}
                className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                重選方式
              </button>
            </div>

            {/* If Company Transfer, show bank account details */}
            {selectedMethod === 'company' && (
              <div className="bg-slate-50 border border-slate-200 p-4 rounded text-xs space-y-2">
                <div className="font-bold text-gray-700">收款公司專用帳戶資訊：</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="bg-white p-2.5 border rounded">
                    <span className="text-gray-500 block">收款銀行</span>
                    <span className="font-bold text-gray-800">國泰世華銀行 (013)</span>
                  </div>
                  <div className="bg-white p-2.5 border rounded">
                    <span className="text-gray-500 block">收款帳號</span>
                    <span className="font-bold text-gray-800 font-mono">013-8829-19920-888</span>
                  </div>
                  <div className="bg-white p-2.5 border rounded">
                    <span className="text-gray-500 block">戶名</span>
                    <span className="font-bold text-gray-800">亞洲娛樂金流管理專戶</span>
                  </div>
                </div>
              </div>
            )}

            {/* If Scan, show QR Code demo */}
            {selectedMethod === 'scan' && (
              <div className="bg-slate-50 border border-slate-200 p-4 rounded text-xs flex flex-col sm:flex-row items-center gap-4">
                <div className="w-28 h-28 bg-white border border-gray-300 p-2 rounded shadow-xs flex flex-col items-center justify-center">
                  <QrCode className="w-20 h-20 text-slate-800" />
                </div>
                <div className="space-y-1 text-gray-600">
                  <p className="font-bold text-gray-800">手機銀行 App 掃碼充值</p>
                  <p>1. 輸入充值金額後點擊生成訂單</p>
                  <p>2. 打開手機銀行或電子錢包掃描專屬 QR Code</p>
                  <p>3. 付款完成後系統 1-3 分鐘內自動增加遊戲餘額</p>
                </div>
              </div>
            )}

            {/* Amount input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                充值金額 ({user.currency})
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDepositAmount(amt.toString())}
                    className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer border transition-colors ${
                      depositAmount === amt.toString()
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    +{amt.toLocaleString()}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="請輸入充值金額 (最少 100)"
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded text-sm focus:border-sky-500 focus:outline-hidden"
              />
            </div>

            {/* Depositor name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                存款人姓名
              </label>
              <input
                type="text"
                value={depositorName}
                onChange={(e) => setDepositorName(e.target.value)}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded text-sm focus:border-sky-500 focus:outline-hidden"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                * 存款人姓名必須與銀行開戶姓名一致以確保快速入款
              </p>
            </div>

            <button
              type="submit"
              className="px-8 py-2.5 bg-[#242845] hover:bg-[#1b1f36] text-white font-bold rounded text-sm shadow-sm cursor-pointer transition-colors"
            >
              確認送出充值申請
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
