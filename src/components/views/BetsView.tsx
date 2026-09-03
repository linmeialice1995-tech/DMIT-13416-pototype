import React from 'react';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { BetRecord } from '../../types';

interface BetsViewProps {
  bets: BetRecord[];
}

export const BetsView: React.FC<BetsViewProps> = ({ bets }) => {
  return (
    <div className="flex-1 bg-white flex flex-col rounded-br-xl overflow-hidden min-h-[460px]">
      <div className="bg-[#242845] text-white px-5 py-3 flex items-center justify-between border-b border-[#31365b]">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-sky-400" />
          <h2 className="text-base font-bold tracking-wide">遊戲投注歷史紀錄</h2>
        </div>
        <span className="text-xs text-gray-300">支援近 30 天數據查詢</span>
      </div>

      <div className="p-6 md:p-8 space-y-4 flex-1">
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">注單號 / 遊戲</th>
                <th className="px-4 py-3">遊戲分類</th>
                <th className="px-4 py-3 text-right">投注金額</th>
                <th className="px-4 py-3 text-right">派彩金額</th>
                <th className="px-4 py-3 text-center">結算結果</th>
                <th className="px-4 py-3">投注時間</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bets.map((bet) => (
                <tr key={bet.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    <div>{bet.gameName}</div>
                    <div className="text-[11px] text-gray-400 font-normal">{bet.id}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{bet.gameCategory}</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-800">
                    ฿ {bet.betAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-emerald-600">
                    ฿ {bet.payout.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {bet.result === 'win' ? (
                      <span className="inline-flex items-center space-x-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>中獎</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-gray-500 bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">
                        <XCircle className="w-3 h-3" />
                        <span>未中獎</span>
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{bet.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
