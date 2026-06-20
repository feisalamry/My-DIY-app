import { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, ChevronUp, ChevronDown, RotateCcw } from 'lucide-react';
import type { HowToVideo } from '../../types';

interface ReelsViewerProps {
  videos: HowToVideo[];
  productName: string;
  headline: string;
  categoryLabel: string;
  accentColor: string;
  onSwipeDownToExit?: () => void;
}

function VideoSlide({
  video,
  isActive,
  isMuted,
  onToggleMute,
  productName,
  headline,
  categoryLabel,
  accentColor,
}: {
  video: HowToVideo;
  isActive: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  productName: string;
  headline: string;
  categoryLabel: string;
  accentColor: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [video.id]);

  // Ken Burns slow zoom animation when active
  const kenBurnsStyle = isActive
    ? { animation: 'kenBurns 8s ease-in-out infinite alternate' }
    : { transform: 'scale(1)' };

  return (
    <div className="relative w-full h-full flex-shrink-0 select-none">
      {/* Background image as video placeholder */}
      <div className="absolute inset-0 bg-zinc-950 overflow-hidden">
        <img
          ref={imgRef}
          src={video.thumbnail}
          alt={video.title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={kenBurnsStyle}
          onLoad={() => setIsLoaded(true)}
          draggable={false}
        />
        {/* Loading state */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
          </div>
        )}
      </div>

      {/* Dark gradients for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />

      {/* Top info overlay */}
      <div className="absolute top-0 left-0 right-0 pt-4 px-5" style={{ paddingTop: 'max(16px, env(safe-area-inset-top))' }}>
        <div className="flex items-center gap-2 mb-2.5">
          <div className={`px-2.5 py-1 rounded-full bg-black/40 border border-white/15 backdrop-blur-sm`}>
            <span className={`text-[10px] font-semibold tracking-widest uppercase ${accentColor}`}>
              {categoryLabel}
            </span>
          </div>
        </div>
        <h1 className="text-white text-xl font-bold leading-tight drop-shadow-lg tracking-tight">
          {headline}
        </h1>
        <p className="text-white/50 text-sm font-medium mt-1.5 drop-shadow-lg">
          {productName}
        </p>
      </div>

      {/* Bottom info overlay */}
      <div className="absolute bottom-0 left-0 right-0 pb-6 px-5">
        <h2 className="text-white text-lg font-bold leading-snug drop-shadow-lg line-clamp-2">
          {video.title}
        </h2>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-white/50 text-xs font-medium">{video.source}</span>
          <span className="text-white/20 text-xs">|</span>
          <span className="text-white/50 text-xs font-medium">{video.duration}</span>
        </div>
      </div>

      {/* Mute toggle */}
      <button
        onClick={onToggleMute}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 border border-white/15 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform duration-150"
        style={{ top: 'max(16px, env(safe-area-inset-top))' }}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX size={16} className="text-white/70" />
        ) : (
          <Volume2 size={16} className="text-white/70" />
        )}
      </button>

      {/* Play indicator pulse when active */}
      {isActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
            <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[12px] border-l-white/80 ml-1" />
          </div>
        </div>
      )}
    </div>
  );
}

export function ReelsViewer({ videos, productName, headline, categoryLabel, accentColor, onSwipeDownToExit }: ReelsViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const touchDeltaY = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const isAnimating = useRef(false);
  const [exitPullProgress, setExitPullProgress] = useState(0);

  const goToSlide = useCallback(
    (direction: 'up' | 'down') => {
      if (isAnimating.current) return;
      const next = direction === 'up' ? currentIndex + 1 : currentIndex - 1;
      if (next < 0 || next >= videos.length) return;

      isAnimating.current = true;
      setCurrentIndex(next);
      setTimeout(() => {
        isAnimating.current = false;
      }, 400);
    },
    [currentIndex, videos.length]
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchDeltaY.current = 0;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchDeltaY.current = e.touches[0].clientY - touchStartY.current;
    setDragOffset(touchDeltaY.current);

    // Track pull-down-to-exit progress on first video
    if (currentIndex === 0 && touchDeltaY.current > 0) {
      const pullDistance = Math.min(touchDeltaY.current, 150);
      setExitPullProgress(pullDistance / 150);
    }
  }, [currentIndex]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    const threshold = 80;
    const exitThreshold = 120;

    // Check for exit gesture on first video
    if (currentIndex === 0 && touchDeltaY.current > exitThreshold && onSwipeDownToExit) {
      setDragOffset(0);
      setExitPullProgress(0);
      onSwipeDownToExit();
      return;
    }

    if (touchDeltaY.current < -threshold) {
      goToSlide('up');
    } else if (touchDeltaY.current > threshold && currentIndex > 0) {
      goToSlide('down');
    }
    setDragOffset(0);
    setExitPullProgress(0);
  }, [goToSlide, currentIndex, onSwipeDownToExit]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'k') {
        goToSlide('down');
      } else if (e.key === 'ArrowDown' || e.key === 'j') {
        goToSlide('up');
      } else if (e.key === 'm') {
        setIsMuted((m) => !m);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToSlide]);

  // Scroll/wheel navigation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let wheelTimeout: ReturnType<typeof setTimeout>;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (e.deltaY > 20) goToSlide('up');
        else if (e.deltaY < -20) goToSlide('down');
      }, 50);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, [goToSlide]);

  const slideHeight = 100 / 1; // each slide is 100%
  const translateBase = -currentIndex * slideHeight;
  const dragPercent = isDragging ? (dragOffset / (containerRef.current?.offsetHeight || 600)) * 100 : 0;
  const translateY = translateBase + dragPercent;
  const isPullingToExit = isDragging && currentIndex === 0 && dragOffset > 20;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides track */}
      <div
        className="w-full transition-transform duration-300 ease-out"
        style={{
          height: `${videos.length * 100}%`,
          transform: `translateY(${translateY}%)`,
          transitionTimingFunction: isDragging ? 'ease-out' : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transitionDuration: isDragging ? '0ms' : '350ms',
        }}
      >
        {videos.map((video, i) => (
          <div
            key={video.id}
            className="w-full"
            style={{ height: `${slideHeight}%` }}
          >
            <VideoSlide
              video={video}
              isActive={i === currentIndex}
              isMuted={isMuted}
              onToggleMute={() => setIsMuted(!isMuted)}
              productName={productName}
              headline={headline}
              categoryLabel={categoryLabel}
              accentColor={accentColor}
            />
          </div>
        ))}
      </div>

      {/* Navigation indicators */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-20">
        {videos.length > 1 && (
          <>
            <button
              onClick={() => goToSlide('down')}
              disabled={currentIndex === 0}
              className={`w-7 h-7 rounded-full bg-black/40 border border-white/15 backdrop-blur-sm flex items-center justify-center transition-opacity duration-200 ${currentIndex === 0 ? 'opacity-20' : 'opacity-70 active:scale-90'}`}
              aria-label="Previous video"
            >
              <ChevronUp size={14} className="text-white" />
            </button>

            {/* Dot indicators */}
            <div className="flex flex-col gap-1.5 py-2">
              {videos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!isAnimating.current) setCurrentIndex(i);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-1.5 h-4 bg-white'
                      : 'w-1.5 h-1.5 bg-white/30'
                  }`}
                  aria-label={`Go to video ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => goToSlide('up')}
              disabled={currentIndex === videos.length - 1}
              className={`w-7 h-7 rounded-full bg-black/40 border border-white/15 backdrop-blur-sm flex items-center justify-center transition-opacity duration-200 ${currentIndex === videos.length - 1 ? 'opacity-20' : 'opacity-70 active:scale-90'}`}
              aria-label="Next video"
            >
              <ChevronDown size={14} className="text-white" />
            </button>
          </>
        )}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-2 right-4 z-20">
        <span className="text-white/30 text-[10px] font-semibold tracking-wider">
          {currentIndex + 1}/{videos.length}
        </span>
      </div>

      {/* Pull-down-to-exit indicator */}
      {isPullingToExit && onSwipeDownToExit && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 transition-opacity duration-150" style={{ opacity: exitPullProgress }}>
          <div className="px-3 py-1.5 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm">
            <span className="text-white/80 text-[11px] font-semibold tracking-wide">Release to scan again</span>
          </div>
          <RotateCcw size={14} className="text-white/60" style={{ transform: `rotate(${exitPullProgress * 360}deg)` }} />
        </div>
      )}

      {/* Ken Burns keyframe */}
      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
