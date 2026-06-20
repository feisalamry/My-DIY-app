import { useState, useCallback } from 'react';
import { RotateCcw, Wrench, Cpu, Bot, Home, Palette, TreePine, Package, X, ShoppingBag, ScanLine } from 'lucide-react';
import type { ProductInfo } from '../lib/productLookup';
import { getVideosForProduct } from '../lib/videoData';
import { getWhereToGetIt } from '../lib/retailerData';
import { ReelsViewer } from '../components/feed/ReelsViewer';
import { WhereToGetIt } from '../components/feed/WhereToGetIt';

interface ScanResultsViewProps {
  product: ProductInfo;
  barcode: string;
  onScanAgain: () => void;
  onBack: () => void;
}

const CATEGORY_ICONS: Record<string, typeof Wrench> = {
  tools: Wrench,
  tech: Cpu,
  software: Bot,
  home: Home,
  craft: Palette,
  garden: TreePine,
};

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  tools: { bg: 'bg-amber-500/15', border: 'border-amber-500/30', text: 'text-amber-400' },
  tech: { bg: 'bg-cyan-500/15', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  software: { bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  home: { bg: 'bg-sky-500/15', border: 'border-sky-500/30', text: 'text-sky-400' },
  craft: { bg: 'bg-rose-500/15', border: 'border-rose-500/30', text: 'text-rose-400' },
  garden: { bg: 'bg-green-500/15', border: 'border-green-500/30', text: 'text-green-400' },
};

export function ScanResultsView({ product, barcode, onScanAgain, onBack }: ScanResultsViewProps) {
  const Icon = CATEGORY_ICONS[product.categorySlug] || Package;
  const colors = CATEGORY_COLORS[product.categorySlug] || CATEGORY_COLORS.tools;
  const videos = getVideosForProduct(product.name, product.categorySlug, product.searchQuery);
  const whereToGetIt = getWhereToGetIt(product.name, product.categorySlug);
  const [showDetails, setShowDetails] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleScanAgain = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onScanAgain();
    }, 350);
  }, [onScanAgain]);

  const handleBack = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onBack();
    }, 350);
  }, [onBack]);

  return (
    <div
      className={`w-full bg-black flex flex-col relative overflow-hidden ${isExiting ? 'animate-exit-down' : 'animate-enter-up'}`}
      style={{ height: '100dvh' }}
    >
      {/* Full-screen reels viewer */}
      <div className="relative flex-1 min-h-0">
        <ReelsViewer
          videos={videos}
          productName={product.name}
          headline={product.headline}
          categoryLabel={product.category}
          accentColor={colors.text}
          onSwipeDownToExit={handleScanAgain}
        />

        {/* Scan Another button - top left */}
        <button
          onClick={handleScanAgain}
          className="absolute top-3 left-3 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-sm active:scale-95 transition-all duration-150 hover:bg-black/50"
          style={{ top: 'max(12px, env(safe-area-inset-top))' }}
          aria-label="Scan another product"
        >
          <ScanLine size={16} className="text-white/80" />
          <span className="text-white/90 text-xs font-semibold tracking-wide">Scan another</span>
        </button>

        {/* Bottom gradient overlay for actions */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/60 to-transparent pt-20 pb-4 px-4">
          <button
            onClick={() => setShowDetails(true)}
            className="w-full px-5 py-3.5 bg-white/10 border border-white/20 backdrop-blur-sm text-white font-bold rounded-2xl text-sm tracking-wide active:scale-95 transition-all duration-150 flex items-center justify-center gap-2"
          >
            <ShoppingBag size={16} />
            Where to Buy
          </button>
        </div>
      </div>

      {/* Details sheet overlay */}
      {showDetails && (
        <div className="absolute inset-0 z-50 flex flex-col">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDetails(false)}
          />

          {/* Sheet content */}
          <div className="relative mt-auto max-h-[75dvh] bg-zinc-950 border-t border-white/10 rounded-t-3xl overflow-y-auto animate-slide-up">
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-2 sticky top-0 z-10 bg-zinc-950">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-3 right-4 w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center active:scale-90 transition-transform z-20"
              aria-label="Close details"
            >
              <X size={14} className="text-white/60" />
            </button>

            {/* Product info header */}
            <div className="px-5 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${colors.bg} ${colors.border}`}>
                  <Icon size={14} className={colors.text} />
                  <span className={`text-xs font-semibold tracking-wider uppercase ${colors.text}`}>
                    {product.category}
                  </span>
                </div>
              </div>

              <h2 className="text-white text-xl font-bold tracking-tight leading-tight mb-1.5">
                {product.name}
              </h2>
              <p className="text-white/50 text-sm font-medium mb-3">
                {product.headline}
              </p>

              {/* Barcode reference */}
              <div className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl mb-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package size={14} className="text-white/40" />
                    <span className="text-white/40 text-xs font-medium tracking-widest uppercase">Barcode</span>
                  </div>
                  <span className="text-white/70 text-sm font-mono tracking-wider">{barcode}</span>
                </div>
              </div>

              {/* Where to buy section */}
              <WhereToGetIt
                retailers={whereToGetIt.retailers}
                aiTools={whereToGetIt.aiTools}
                isAIToolCategory={whereToGetIt.isAIToolCategory}
                categorySlug={product.categorySlug}
              />
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @keyframes enter-up {
          from { transform: translateY(8%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-enter-up {
          animation: enter-up 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @keyframes exit-down {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(15%); opacity: 0; }
        }
        .animate-exit-down {
          animation: exit-down 350ms cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
        }
      `}</style>
    </div>
  );
}
