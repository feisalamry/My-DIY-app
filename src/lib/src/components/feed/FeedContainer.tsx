import { useRef, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { useFeed } from '../../hooks/useFeed';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { FeedCard } from './FeedCard';

export function FeedContainer() {
  const { posts, loading, loadingMore, hasMore, error, loadMore } = useFeed();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loadingMore) loadMore();
  }, [hasMore, loadingMore, loadMore]);

  const sentinelRef = useIntersectionObserver(handleLoadMore, {
    root: containerRef.current,
    rootMargin: '200px',
    threshold: 0,
  });

  if (loading) {
    return (
      <div
        className="w-full bg-black flex items-center justify-center"
        style={{ height: '100dvh' }}
      >
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="text-white animate-spin" />
          <span className="text-white/60 text-sm font-medium tracking-widest">
            HOW TO DIY
          </span>
        </div>
      </div>
    );
  }

  if (error || posts.length === 0) {
    return (
      <div
        className="w-full bg-black flex items-center justify-center"
        style={{ height: '100dvh' }}
      >
        <p className="text-white/60 text-sm">
          {error ?? 'No posts found.'}
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      style={{
        height: '100dvh',
        touchAction: 'pan-y',
      }}
    >
      {posts.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}

      {hasMore && (
        <div ref={sentinelRef} className="snap-start flex-shrink-0 w-full flex items-center justify-center bg-black" style={{ height: '100dvh' }}>
          {loadingMore && (
            <Loader2 size={28} className="text-white/50 animate-spin" />
          )}
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div
          className="snap-start flex-shrink-0 w-full flex flex-col items-center justify-center bg-black gap-3"
          style={{ height: '100dvh' }}
        >
          <span className="text-white font-black text-lg tracking-[0.15em]">HOW TO DIY</span>
          <p className="text-white/40 text-sm">You've seen it all. Go build something!</p>
        </div>
      )}
    </div>
  );
}
