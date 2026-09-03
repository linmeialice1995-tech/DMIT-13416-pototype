import React, { useState } from 'react';
import { X, Play, RotateCcw, Volume2, Sparkles, Trophy } from 'lucide-react';
import { GameItem } from '../../types';

interface GamePlayModalProps {
  game: GameItem | null;
  onClose: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const GamePlayModal: React.FC<GamePlayModalProps> = ({ game, onClose, onShowToast }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winAmount, setWinAmount] = useState<number | null>(null);

  if (!game) return null;

  const handleSpin = () => {
    setIsSpinning(true);
    setWinAmount(null);
    setTimeout(() => {
      setIsSpinning(false);
      const isWin = Math.random() > 0.3;
      if (isWin) {
        const win = Math.floor(Math.random() * 800) + 120;
        setWinAmount(win);
        onShowToast(`🎉 恭喜在【${game.title}】中贏得 ฿${win}！`, 'success');
      } else {
        onShowToast('再接再厲！下把大獎即將到來！', 'info');
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1b1f38] text-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-sky-500/30 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#242845] px-5 py-3 flex items-center justify-between border-b border-[#31365b]">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="font-bold text-sm">{game.title} - 高清視訊房間</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Game Canvas / Simulated Screen */}
        <div className="relative h-80 bg-slate-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
          <img
            src={game.image}
            alt={game.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-xs"
          />

          <div className="relative z-10 flex flex-col items-center space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-500 to-amber-400 p-1 shadow-xl">
              <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                <Sparkles className={`w-10 h-10 text-amber-400 ${isSpinning ? 'animate-spin' : ''}`} />
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold">{game.title}</h4>
              <p className="text-xs text-sky-300 mt-0.5">提供商: {game.provider} · 實時 RTP 97.8%</p>
            </div>

            {winAmount !== null && (
              <div className="animate-bounce bg-amber-500 text-slate-900 px-4 py-1.5 rounded-full font-black text-sm shadow-lg">
                BIG WIN: +฿{winAmount}
              </div>
            )}

            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="px-8 py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-900 font-black rounded-full text-sm shadow-xl transform active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSpinning ? '連線旋轉中...' : 'SPIN / 開始下注'}
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#161a2e] text-[11px] text-gray-400 flex items-center justify-between border-t border-[#2d345c]">
          <span>遊戲協議已安全加密驗證</span>
          <span>按 ESC 或右上角關閉視窗</span>
        </div>
      </div>
    </div>
  );
};
