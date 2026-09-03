import React from 'react';
import { Heart, Play, Star } from 'lucide-react';
import { GameItem } from '../../types';

interface FavoritesViewProps {
  games: GameItem[];
  onToggleFavorite: (id: string) => void;
  onLaunchGame: (game: GameItem) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  games,
  onToggleFavorite,
  onLaunchGame,
}) => {
  const favoriteGames = games.filter((g) => g.favorite);

  return (
    <div className="flex-1 bg-white flex flex-col rounded-br-xl overflow-hidden min-h-[460px]">
      <div className="bg-[#242845] text-white px-5 py-3 flex items-center justify-between border-b border-[#31365b]">
        <div className="flex items-center space-x-2">
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
          <h2 className="text-base font-bold tracking-wide">我的最愛遊戲收藏</h2>
        </div>
        <span className="text-xs text-gray-300">共收藏 {favoriteGames.length} 款遊戲</span>
      </div>

      <div className="p-6 md:p-8 space-y-4 flex-1">
        {favoriteGames.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Heart className="w-12 h-12 mx-auto text-gray-300 mb-2 stroke-1" />
            <p className="text-sm">尚無收藏的遊戲，可至各大遊戲場館點擊愛心收藏！</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {favoriteGames.map((game) => (
              <div
                key={game.id}
                className="group relative rounded-xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all bg-white flex flex-col"
              >
                <div className="h-32 bg-slate-900 relative overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => onToggleFavorite(game.id)}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/80 rounded-full text-rose-500 cursor-pointer transition-colors z-10"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => onLaunchGame(game)}
                      className="px-3 py-1.5 bg-sky-500 text-white font-bold text-xs rounded-full flex items-center space-x-1 shadow-lg cursor-pointer transform scale-90 group-hover:scale-100 transition-transform"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>進入遊戲</span>
                    </button>
                  </div>
                </div>

                <div className="p-3">
                  <div className="text-[10px] text-sky-600 font-semibold">{game.provider}</div>
                  <div className="font-bold text-gray-800 text-xs truncate mt-0.5">{game.title}</div>
                  <div className="flex items-center space-x-1 text-amber-500 text-[11px] mt-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{game.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
