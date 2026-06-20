import { useState, useCallback } from 'react';
import { Camera, Repeat2, AlertCircle, Check } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';
import { useBarcodeScanner } from '../hooks/useBarcodeScanner';
import { lookupProduct } from '../lib/productLookup';
import type { ProductInfo } from '../lib/productLookup';
import { analyzeImage } from '../lib/imageAnalysis';
import { ScanResultsView } from './ScanResultsView';

type ScanPhase = 'scanning' | 'detected' | 'processing' | 'results';
type ScanMode = 'barcode' | 'photo';

export function ScanView() {
  const [phase, setPhase] = useState<ScanPhase>('scanning');
  const [scanMode, setScanMode] = useState<ScanMode>('barcode');
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [detectedBarcode, setDetectedBarcode] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { videoRef, isLoading, error: cameraError, facingMode, hasMultipleCameras, toggleCamera, capturePhoto } =
    useCamera();

  const handleBarcodeDetected = useCallback((barcode: string) => {
    setDetectedBarcode(barcode);
    setScanMode('barcode');
    setPhase('detected');

    // Brief visual feedback, then process
    setTimeout(() => {
      setPhase('processing');
      const product = lookupProduct(barcode);
      setProductInfo(product);

      // Small delay then trigger transition
      setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setPhase('results');
          setIsTransitioning(false);
        }, 400);
      }, 300);
    }, 500);
  }, []);

  const handlePhotoCapture = useCallback(async () => {
    if (isLoading || cameraError) return;

    const imageData = capturePhoto();
    if (!imageData) return;

    setScanMode('photo');
    setDetectedBarcode(null);
    setPhase('detected');

    // Brief visual feedback, then analyze
    setTimeout(() => {
      setPhase('processing');

      // Analyze the image
      analyzeImage(imageData).then((result) => {
        setProductInfo(result.product);

        setTimeout(() => {
          setIsTransitioning(true);
          setTimeout(() => {
            setPhase('results');
            setIsTransitioning(false);
          }, 400);
        }, 300);
      });
    }, 500);
  }, [isLoading, cameraError, capturePhoto]);

  const { isScanning, error: scanError } = useBarcodeScanner({
    videoRef,
    shouldScan: !cameraError && !isLoading && phase === 'scanning',
    onDetected: handleBarcodeDetected,
  });

  const handleReset = () => {
    setPhase('scanning');
    setScanMode('barcode');
    setProductInfo(null);
    setDetectedBarcode(null);
    setIsTransitioning(false);
  };

  if (phase === 'results' && productInfo) {
    return (
      <ScanResultsView
        product={productInfo}
        barcode={detectedBarcode || 'photo-analysis'}
        onScanAgain={handleReset}
        onBack={handleReset}
      />
    );
  }

  if (phase === 'processing') {
    return (
      <div
        className={`w-full bg-black flex flex-col items-center justify-center relative overflow-hidden ${isTransitioning ? 'animate-fade-out' : 'animate-fade-in'}`}
        style={{ height: '100dvh' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full border-2 border-white/20 border-t-white animate-spin" />
          <p className="text-white/60 text-sm font-medium">
            {scanMode === 'photo' ? 'Analyzing image...' : 'Identifying product...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full bg-black flex flex-col items-center justify-center relative overflow-hidden"
      style={{ height: '100dvh' }}
    >
      {/* Camera feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: facingMode === 'user' ? 'scaleX(-1)' : 'scaleX(1)',
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Camera error */}
      {cameraError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-50">
          <div className="flex flex-col items-center gap-4 px-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center">
              <AlertCircle size={24} className="text-red-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-white font-semibold text-lg">Camera Access Required</h2>
              <p className="text-white/60 text-sm leading-relaxed">
                {cameraError}. Please check your browser settings and permissions.
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-3 bg-white text-black font-semibold rounded-xl text-sm active:scale-95 transition-transform duration-150"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {isLoading && !cameraError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-40">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            <p className="text-white/60 text-sm font-medium">Activating camera...</p>
          </div>
        </div>
      )}

      {/* Scan overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        {/* Barcode frame */}
        <div className="relative w-56 h-56 flex-shrink-0">
          <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${phase === 'detected' ? 'border-2 border-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.4)] bg-emerald-400/10' : 'border-2 border-white/50'}`} />
          {phase !== 'detected' && (
            <>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-white/70 rounded-full blur-sm" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-1 bg-white/70 rounded-full blur-sm" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1 h-20 bg-white/70 rounded-full blur-sm" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1 h-20 bg-white/70 rounded-full blur-sm" />
            </>
          )}

          {/* Corner guides */}
          <div className={`absolute -top-2 -left-2 w-6 h-6 rounded-tl-lg transition-all duration-300 ${phase === 'detected' ? 'border-t-2 border-l-2 border-emerald-400' : 'border-t-2 border-l-2 border-white'}`} />
          <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-tr-lg transition-all duration-300 ${phase === 'detected' ? 'border-t-2 border-r-2 border-emerald-400' : 'border-t-2 border-r-2 border-white'}`} />
          <div className={`absolute -bottom-2 -left-2 w-6 h-6 rounded-bl-lg transition-all duration-300 ${phase === 'detected' ? 'border-b-2 border-l-2 border-emerald-400' : 'border-b-2 border-l-2 border-white'}`} />
          <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-br-lg transition-all duration-300 ${phase === 'detected' ? 'border-b-2 border-r-2 border-emerald-400' : 'border-b-2 border-r-2 border-white'}`} />

          {/* Scanning line */}
          {isScanning && phase === 'scanning' && (
            <div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"
              style={{
                top: '50%',
                animation: 'scan-line 2s ease-in-out infinite',
              }}
            />
          )}

          {/* Detected confirmation */}
          {phase === 'detected' && (
            <div className="absolute inset-0 flex items-center justify-center animate-check-pop">
              <div className="w-16 h-16 rounded-full bg-emerald-500/90 flex items-center justify-center shadow-[0_0_32px_rgba(52,211,153,0.5)]">
                <Check size={28} className="text-white" strokeWidth={3} />
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="absolute bottom-32 flex flex-col items-center gap-2">
          {phase === 'detected' ? (
            <>
              <p className="text-emerald-400 font-bold text-sm tracking-tight animate-fade-in">
                {scanMode === 'photo' ? 'Photo captured!' : 'Barcode detected!'}
              </p>
              <p className="text-white/50 text-xs leading-relaxed">
                {scanMode === 'photo' ? 'Analyzing image...' : 'Looking up product...'}
              </p>
            </>
          ) : (
            <>
              <p className="text-white font-semibold text-sm tracking-tight">
                {isScanning ? 'Scanning for barcodes...' : 'Point camera at barcode'}
              </p>
              <p className="text-white/60 text-xs leading-relaxed">
                {isScanning ? 'Keep it steady or tap camera to photo scan' : 'UPC / EAN / Code formats'}
              </p>
            </>
          )}
        </div>

        {/* Scan error */}
        {scanError && (
          <div className="absolute bottom-16 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg backdrop-blur-sm">
            <p className="text-red-300 text-xs font-medium">{scanError}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-24 left-0 right-0 flex items-center justify-center gap-4 z-20 pointer-events-auto">
        {hasMultipleCameras && (
          <button
            onClick={toggleCamera}
            disabled={isLoading}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center active:scale-90 transition-all duration-150 disabled:opacity-50 flex-shrink-0 hover:bg-white/30"
            aria-label="Flip camera"
          >
            <Repeat2 size={20} className="text-white" />
          </button>
        )}

        <button
          onClick={handlePhotoCapture}
          disabled={isLoading || !!cameraError || phase !== 'scanning'}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md border-2 border-white/50 flex items-center justify-center active:scale-90 transition-all duration-150 disabled:opacity-50 flex-shrink-0 hover:from-white/40 hover:to-white/20"
          aria-label="Capture photo to identify product"
        >
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <Camera size={24} className="text-black" />
          </div>
        </button>

        {hasMultipleCameras && <div className="w-12" />}
      </div>

      {/* Mode hint */}
      <div className="absolute bottom-44 left-0 right-0 flex justify-center z-20 pointer-events-none">
        <div className="px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10">
          <p className="text-white/50 text-xs font-medium">
            Tap camera to photo scan
          </p>
        </div>
      </div>

      {/* Facing mode indicator */}
      <div className="absolute top-6 right-6 z-20 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/20 pointer-events-none">
        <p className="text-white/70 text-xs font-medium tracking-widest uppercase">
          {facingMode === 'environment' ? 'Rear' : 'Front'}
        </p>
      </div>

      <style>{`
        @keyframes scan-line {
          0%, 100% { top: 30%; }
          50% { top: 70%; }
        }
        @keyframes check-pop {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-check-pop {
          animation: check-pop 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-fade-in {
          animation: fade-in 300ms ease-out forwards;
        }
        .animate-fade-out {
          animation: fade-out 400ms ease-in forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-out {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.96); }
        }
      `}</style>
    </div>
  );
}
