import { useEffect, useRef, useState, useCallback } from 'react';
import {
  BrowserMultiFormatReader,
  HybridBinarizer,
  BinaryBitmap,
  LuminanceSource,
  NotFoundException,
} from '@zxing/library';

class CanvasLuminanceSource extends LuminanceSource {
  private readonly canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas.width, canvas.height);
    this.canvas = canvas;
  }

  getRow(y: number, row?: Uint8ClampedArray): Uint8ClampedArray {
    if (!row) {
      row = new Uint8ClampedArray(this.getWidth());
    }
    const ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return row;

    const imageData = ctx.getImageData(0, y, this.getWidth(), 1);
    const data = imageData.data;
    for (let i = 0; i < this.getWidth(); i++) {
      const luminance = Math.round(
        (data[i * 4] * 0.299 + data[i * 4 + 1] * 0.587 + data[i * 4 + 2] * 0.114)
      );
      row[i] = luminance;
    }
    return row;
  }

  getMatrix(): Uint8ClampedArray {
    const width = this.getWidth();
    const height = this.getHeight();
    const matrix = new Uint8ClampedArray(width * height);
    const ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return matrix;

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const luminance = Math.round(
        (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114)
      );
      matrix[i / 4] = luminance;
    }
    return matrix;
  }
}

interface UseBarcodeScannerOptions {
  videoRef: React.RefObject<HTMLVideoElement>;
  shouldScan: boolean;
  onDetected: (barcode: string) => void;
}

export function useBarcodeScanner({ videoRef, shouldScan, onDetected }: UseBarcodeScannerOptions) {
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const scannerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stopScanning = useCallback(() => {
    if (scannerIntervalRef.current) {
      clearInterval(scannerIntervalRef.current);
      scannerIntervalRef.current = null;
    }
    setIsScanning(false);
  }, []);

  const startScanning = useCallback(() => {
    if (!videoRef.current) return;

    if (!readerRef.current) {
      readerRef.current = new BrowserMultiFormatReader();
    }

    const video = videoRef.current;

    setIsScanning(true);
    setError(null);

    scannerIntervalRef.current = setInterval(() => {
      if (!video || video.readyState !== video.HAVE_ENOUGH_DATA) return;

      try {
        if (!canvasRef.current) {
          canvasRef.current = document.createElement('canvas');
        }

        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const luminanceSource = new CanvasLuminanceSource(canvas);
        const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));

        try {
          const result = readerRef.current!.decodeBitmap(binaryBitmap);
          const barcode = result.getText();

          if (barcode) {
            stopScanning();
            onDetected(barcode);
          }
        } catch (err) {
          if (!(err instanceof NotFoundException)) {
            setError('Scanning error');
          }
        }
      } catch {
        setError('Failed to process video frame');
      }
    }, 100);
  }, [videoRef, onDetected, stopScanning]);

  useEffect(() => {
    if (shouldScan) {
      startScanning();
    } else {
      stopScanning();
    }

    return () => {
      stopScanning();
    };
  }, [shouldScan, startScanning, stopScanning]);

  return {
    isScanning,
    error,
    stopScanning,
    startScanning,
  };
}
