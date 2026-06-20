import { useState } from 'react';
import { Heart, Bookmark, Share2, MessageCircle } from 'lucide-react';

interface FeedActionsProps {
  likesCount: number;
  savesCount: number;
}

export function FeedActions({ likesCount, savesCount }: FeedActionsProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const formatCount = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <button
        onClick={() => setLiked((p) => !p)}
        className="flex flex-col items-center gap-1 group"
        aria-label="Like"
      >
        <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${liked ? 'bg-red-500' : 'bg-black/30 group-active:scale-90'}`}>
          <Heart
            size={22}
            className={`transition-colors duration-200 ${liked ? 'fill-white text-white' : 'text-white'}`}
          />
        </div>
        <span className="text-white text-xs font-medium drop-shadow-sm">
          {formatCount(likesCount + (liked ? 1 : 0))}
        </span>
      </button>

      <button
        onClick={() => setSaved((p) => !p)}
        className="flex flex-col items-center gap-1 group"
        aria-label="Save"
      >
        <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${saved ? 'bg-amber-500' : 'bg-black/30 group-active:scale-90'}`}>
          <Bookmark
            size={22}
            className={`transition-colors duration-200 ${saved ? 'fill-white text-white' : 'text-white'}`}
          />
        </div>
        <span className="text-white text-xs font-medium drop-shadow-sm">
          {formatCount(savesCount + (saved ? 1 : 0))}
        </span>
      </button>

      <button className="flex flex-col items-center gap-1 group" aria-label="Comments">
        <div className="w-11 h-11 rounded-full bg-black/30 flex items-center justify-center backdrop-blur-sm group-active:scale-90 transition-transform duration-200">
          <MessageCircle size={22} className="text-white" />
        </div>
        <span className="text-white text-xs font-medium drop-shadow-sm">Tips</span>
      </button>

      <button className="flex flex-col items-center gap-1 group" aria-label="Share">
        <div className="w-11 h-11 rounded-full bg-black/30 flex items-center justify-center backdrop-blur-sm group-active:scale-90 transition-transform duration-200">
          <Share2 size={22} className="text-white" />
        </div>
        <span className="text-white text-xs font-medium drop-shadow-sm">Share</span>
      </button>
    </div>
  );
}
