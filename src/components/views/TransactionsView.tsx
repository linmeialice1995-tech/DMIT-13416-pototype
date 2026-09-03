import React, { useState } from 'react';
import { Landmark, ArrowDownLeft, ArrowUpRight, Clock, CheckCircle, Filter } from 'lucide-react';
import { TransactionRecord } from '../../types';

interface TransactionsViewProps {
  transactions: TransactionRecord[];
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({
  transactions,
  onOpenDeposit,
  onOpenWithdraw,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = transactions.filter((tx) => {
    if (filterType === 'all') return true;
    return tx.type === filterType;
  });

  return (
    <div className="flex-1 bg-white flex flex-col rounded-br-xl overflow-hidden min-h-[460px]">
      <div className="bg-[#242845] text-white px-5 py-3 flex items-center justify-between border-b border-[#31365b]">
        <div className="flex items-center space-x-2">
          <Landmark className="w-5 h-5 text-sky-400" />
          <h2 className="text-base font-bold tracking-wide">交易中心紀錄</h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onOpenDeposit}
            className="text-xs bg-sky-600 hover:bg-sky-500 text-white font-bold px-3 py-1 rounded cursor-pointer"
          >
            線上充值
          </button>
          <button
            onClick={onOpenWithdraw}
            className="text-xs bg-amber-600 hover:bg-amber-500 text-white font-bold px-3 py-1 rounded cursor-pointer"
          >
            我要提款
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-4 flex-1">
        {/* Filter Badges */}
        <div className="flex items-center space-x-2 overflow-x-auto text-xs pb-1">
          <span className="text-gray-500 font-semibold flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>類型篩選:</span>
          </span>
          {[
            { key: 'all', label: '全部交易' },
            { key: 'deposit', label: '充值' },
            { key: 'withdraw', label: '提現' },
            { key: 'rebate', label: '返水' },
            { key: 'bonus', label: '紅利彩金' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterType(tab.key)}
              className={`px-3 py-1 rounded-full font-medium cursor-pointer transition-colors ${
                filterType === tab.key
                  ? 'bg-sky-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Transactions Table */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">訂單編號 / 項目</th>
                <th className="px-4 py-3">支付管道</th>
                <th className="px-4 py-3 text-right">交易金額</th>
                <th className="px-4 py-3 text-center">狀態</th>
                <th className="px-4 py-3">日期時間</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    暫無符合條件的交易紀錄
                  </td>
                </tr>
              ) : (
                filtered.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      <div className="font-semibold">{tx.title}</div>
                      <div className="text-[11px] text-gray-400">{tx.id}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{tx.channel}</td>
                    <td
                      className={`px-4 py-3 text-right font-bold ${
                        tx.type === 'deposit' || tx.type === 'rebate' || tx.type === 'bonus'
                          ? 'text-emerald-600'
                          : 'text-amber-600'
                      }`}
                    >
                      {tx.type === 'withdraw' ? '-' : '+'} ฿ {tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center space-x-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs font-semibold">
                        <CheckCircle className="w-3 h-3" />
                        <span>已完成</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{tx.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
