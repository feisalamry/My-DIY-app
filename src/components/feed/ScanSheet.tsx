import { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, ChevronUp } from 'lucide-react';

interface ScanSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScanSheet({ isOpen, onOpenChange }: ScanSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);

  const DRAG_THRESHOLD = 50;
  const COLLAPSED_HEIGHT = 60;
  const EXPANDED_HEIGHT = 360;

  const handleClose = useCallback(() => {
    onOpenChange(false);
    setCurrentOffset(0);
  }, [onOpenChange]);

  const handleOpen = useCallback(() => {
    onOpenChange(true);
    setCurrentOffset(0);
  }, [onOpenChange]);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Only start dragging on the handle area
    if (!(e.target as HTMLElement).closest('[data-drag-handle]')) {
      return;
    }

    setIsDragging(true);
    setDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const current = e.touches[0].clientY;
    const diff = dragStart - current; // positive = upward, negative = downward

    if (isOpen) {
      // When open: allow downward drag to collapse
      if (diff < 0) {
        e.preventDefault();
        setCurrentOffset(Math.min(-diff, EXPANDED_HEIGHT - COLLAPSED_HEIGHT));
      }
    } else {
      // When collapsed: allow upward drag to expand
      if (diff > 0) {
        e.preventDefault();
        setCurrentOffset(Math.min(diff, EXPANDED_HEIGHT - COLLAPSED_HEIGHT));
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = (EXPANDED_HEIGHT - COLLAPSED_HEIGHT) / 3;

    if (isOpen) {
      // If dragged down more than threshold, collapse
      if (currentOffset > threshold) {
        handleClose();
      } else {
        setCurrentOffset(0);
      }
    } else {
      // If dragged up more than threshold, expand
      if (currentOffset > threshold) {
        handleOpen();
      } else {
        setCurrentOffset(0);
      }
    }
  };

  useEffect(() => {
    setCurrentOffset(0);
  }, [isOpen]);

  // Bottom-anchored positioning: negative translate moves sheet upward (expanding)
  const translateDistance = isOpen
    ? -(EXPANDED_HEIGHT - COLLAPSED_HEIGHT) + currentOffset
    : currentOffset;

  return (
    <>
      {/* Backdrop - only show when expanded */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 transition-opacity duration-300 pointer-events-auto"
          onClick={handleClose}
        />
      )}

      {/* Sheet container - bottom-anchored */}
      <div
        ref={sheetRef}
        className="fixed left-0 right-0 z-40"
        style={{
          bottom: 0,
          height: EXPANDED_HEIGHT,
          transform: `translateY(${translateDistance}px)`,
          transition: isDragging ? 'none' : 'transform 300ms cubic-bezier(0.33, 0.66, 0.66, 1)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {/* Handle bar - always visible */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-white/5 to-black/40 backdrop-blur-xl border-t border-white/10 flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
          data-drag-handle
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-1 rounded-full bg-white/20" />
            <ChevronUp size={16} className="text-white/40" />
          </div>
        </div>

        {/* Expanded content - slides up from bottom */}
        <div
          className="absolute bottom-16 left-0 right-0 flex-1 overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/10 transition-opacity duration-300"
          style={{
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'auto' : 'none',
            height: EXPANDED_HEIGHT - COLLAPSED_HEIGHT,
          }}
        >
          <div className="w-full h-full px-4 py-6 flex flex-col items-center justify-center gap-6">
            {/* Barcode frame */}
            <div className="relative w-48 h-48 flex-shrink-0">
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

            {/* Instructional text */}
            <div className="text-center space-y-2">
              <p className="text-white font-semibold text-sm tracking-tight">
                Scan a product
              </p>
              <p className="text-white/50 text-xs leading-relaxed">
                or tap to snap a photo
              </p>
            </div>

            {/* Camera button */}
            <button
              onClick={() => console.log('Camera clicked')}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/30 flex items-center justify-center active:scale-90 transition-transform duration-150 backdrop-blur-sm flex-shrink-0"
              aria-label="Camera"
            >
              <Camera size={24} className="text-white" />
            </button>

            <p className="text-white/30 text-xs font-medium tracking-widest uppercase mt-2">
              Drag to close
            </p>
          </div>
        </div>
      </div>
    </>
  );
}