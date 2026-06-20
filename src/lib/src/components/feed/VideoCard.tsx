import { Play, Clock, ExternalLink } from 'lucide-react';
import type { HowToVideo } from '../../types';

interface VideoCardProps {
  video: HowToVideo;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="flex gap-3 group cursor-pointer active:scale-[0.98] transition-transform duration-150">
      {/* Thumbnail */}
      <div className="relative w-32 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-800">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-200" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
            <Play size={14} className="text-black ml-0.5" fill="black" />
          </div>
        </div>
        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 rounded text-[10px] text-white font-medium tracking-wide">
          {video.duration}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 py-0.5">
        <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2 group-hover:text-white/90 transition-colors">
          {video.title}
        </h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-white/40 text-xs font-medium">{video.source}</span>
          <span className="text-white/20 text-xs">|</span>
          <div className="flex items-center gap-1">
            <Clock size={10} className="text-white/30" />
            <span className="text-white/40 text-xs">{video.duration}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <ExternalLink size={10} className="text-white/25" />
          <span className="text-white/30 text-[10px] font-medium truncate">{video.query}</span>
        </div>
      </div>
    </div>
  );
}
