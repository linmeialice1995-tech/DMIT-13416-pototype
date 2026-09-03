import React from 'react';
import { MainNavTab, GameItem } from '../../types';
import { Play, Heart, Star, Sparkles, Flame } from 'lucide-react';

interface GameLobbyViewProps {
  category: MainNavTab;
  games: GameItem[];
  onToggleFavorite: (id: string) => void;
  onLaunchGame: (game: GameItem) => void;
}

export const GameLobbyView: React.FC<GameLobbyViewProps> = ({
  category,
  games,
  onToggleFavorite,
  onLaunchGame,
}) => {
  const categoryNames: Record<MainNavTab, string> = {
    home: '首頁總覽',
    slots: '電子遊藝大廳 (PG / PP / JDB / CQ9)',
    desheng_slots: '德勝電子專區 (Desheng Slots)',
    royal_slots: '皇家電子旗艦廳 (Royal Slots)',
    cards: '熱門棋牌對戰 (開元 / 雙贏棋牌)',
    fishing: '捕魚達人爭霸 (JDB / BBIN 捕魚)',
    live: '真人視訊旗艦大廳 (EVO / 歐博 / 沙龍 / 完美)',
    sports: '體育賽事滾球投注 (沙包體育 / 皇冠體育)',
    lottery: '全球彩票與六合彩 (Win Lottery / 539)',
    tickets: '尊榮賽事門票與現場預約',
    promotions: '全館獨家優惠特惠專區',
  };

  const filteredGames = games.filter((g) => {
    if (category === 'desheng_slots' || category === 'royal_slots' || category === 'slots') {
      return g.category === 'slots';
    }
    return g.category === category || g.hot;
  });

  return (
    <div className="w-full bg-[#242845] rounded-xl overflow-hidden shadow-xl text-white">
      {/* Header bar */}
      <div className="px-6 py-4 border-b border-[#32375c] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold tracking-wide">{categoryNames[category] || '遊戲場館'}</h2>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full border border-sky-400/30">
            全部高畫質低延遲接入
          </span>
        </div>
      </div>

      {/* Game Cards Grid */}
      <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="group relative rounded-xl border border-[#373d66] bg-[#1a1e35] overflow-hidden hover:border-sky-400 hover:shadow-lg transition-all flex flex-col"
          >
            <div className="h-36 relative overflow-hidden bg-slate-950">
              <img
                src={game.image}
                alt={game.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {game.hot && (
                <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center space-x-1 shadow-md">
                  <Flame className="w-3 h-3 fill-current" />
                  <span>HOT</span>
                </span>
              )}

              <button
                onClick={() => onToggleFavorite(game.id)}
                className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/90 rounded-full text-white cursor-pointer transition-colors z-10"
              >
                <Heart className={`w-3.5 h-3.5 ${game.favorite ? 'text-rose-500 fill-rose-500' : 'text-gray-300'}`} />
              </button>

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => onLaunchGame(game)}
                  className="px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-white font-bold text-xs rounded-full flex items-center space-x-1.5 shadow-lg cursor-pointer transform scale-90 group-hover:scale-100 transition-transform"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>立即試玩</span>
                </button>
              </div>
            </div>

            <div className="p-3">
              <div className="text-[11px] text-sky-400 font-semibold">{game.provider}</div>
              <div className="font-bold text-white text-xs truncate mt-0.5">{game.title}</div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#292f52] text-[11px] text-gray-400">
                <div className="flex items-center space-x-1 text-amber-400">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{game.rating}</span>
                </div>
                <span className="text-emerald-400 font-medium">在線 2,400+ 人</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
