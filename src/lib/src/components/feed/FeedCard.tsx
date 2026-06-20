import { Clock, Zap } from 'lucide-react';
import type { DIYPost } from '../../types';
import { FeedActions } from './FeedActions';

interface FeedCardProps {
  post: DIYPost;
}

const difficultyConfig = {
  easy: { label: 'Easy', color: 'bg-emerald-500' },
  medium: { label: 'Medium', color: 'bg-amber-500' },
  hard: { label: 'Hard', color: 'bg-red-500' },
};

export function FeedCard({ post }: FeedCardProps) {
  const difficulty = difficultyConfig[post.difficulty];
  const category = post.categories;

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  return (
    <div className="relative snap-start w-full flex-shrink-0" style={{ height: '100dvh' }}>
      <img
        src={post.thumbnail_url}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 pb-[calc(4.5rem+env(safe-area-inset-bottom))] px-4 flex items-end justify-between gap-4">
        <div className="flex-1 min-w-0">
          {category && (
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white mb-3"
              style={{ backgroundColor: category.color + 'cc' }}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </div>
          )}

          <h2 className="text-white text-2xl font-bold leading-tight mb-2 drop-shadow-lg">
            {post.title}
          </h2>

          <p className="text-white/80 text-sm leading-relaxed mb-3 line-clamp-2">
            {post.description}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white ${difficulty.color}`}
            >
              <Zap size={11} className="fill-white" />
              {difficulty.label}
            </span>

            <span className="inline-flex items-center gap-1 text-white/80 text-xs font-medium">
              <Clock size={13} />
              {formatDuration(post.duration_minutes)}
            </span>

            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-white/60 text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 mb-4">
          <FeedActions likesCount={post.likes_count} savesCount={post.saves_count} />
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 pt-[max(1rem,env(safe-area-inset-top))] px-4">
        <div className="flex items-center justify-between">
          <span className="text-white font-black text-sm tracking-[0.15em] drop-shadow-lg">
            HOW TO DIY
          </span>
        </div>
      </div>
    </div>
  );
}
