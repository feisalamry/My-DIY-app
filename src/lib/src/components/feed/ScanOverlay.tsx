import { Camera } from 'lucide-react';

interface ScanOverlayProps {
  onCameraClick?: () => void;
}

export function ScanOverlay({ onCameraClick }: ScanOverlayProps) {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex flex-col items-center justify-center">
      <div className="pointer-events-auto bg-black/40 backdrop-blur-sm rounded-3xl px-6 py-8 flex flex-col items-center gap-6 max-w-xs mx-4">
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 border-2 border-white/40 rounded-2xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-white/60 rounded-full blur-sm" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-1 bg-white/60 rounded-full blur-sm" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1 h-16 bg-white/60 rounded-full blur-sm" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1 h-16 bg-white/60 rounded-full blur-sm" />
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 192 192"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.3">
              <line x1="48" y1="96" x2="144" y2="96" stroke="white" strokeWidth="1" />
              <line x1="96" y1="48" x2="96" y2="144" stroke="white" strokeWidth="1" />
              {[...Array(8)].map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1={`${48 + i * 12}`}
                  y1="96"
                  x2={`${48 + i * 12}`}
                  y2="104"
                  stroke="white"
                  strokeWidth="1"
                />
              ))}
              {[...Array(8)].map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1="96"
                  y1={`${48 + i * 12}`}
                  x2="104"
                  y2={`${48 + i * 12}`}
                  stroke="white"
                  strokeWidth="1"
                />
              ))}
            </g>
          </svg>
        </div>

        <div className="text-center space-y-2">
          <p className="text-white font-semibold text-sm tracking-tight">
            Scan a product
          </p>
          <p className="text-white/50 text-xs leading-relaxed">
            or tap to snap a photo
          </p>
        </div>

        <button
          onClick={onCameraClick}
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center active:scale-90 transition-transform duration-150 backdrop-blur-sm"
          aria-label="Camera"
        >
          <Camera size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
}
