import { useEffect, useRef, useState, useCallback } from 'react';

export type FacingMode = 'environment' | 'user';

interface CameraState {
  stream: MediaStream | null;
  facingMode: FacingMode;
  isLoading: boolean;
  error: string | null;
  hasMultipleCameras: boolean;
}

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [state, setState] = useState<CameraState>({
    stream: null,
    facingMode: 'environment',
    isLoading: true,
    error: null,
    hasMultipleCameras: false,
  });

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(
    async (facingMode: FacingMode = 'environment') => {
      stopStream();
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const constraints: MediaStreamConstraints = {
          video: {
            facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await new Promise((resolve) => {
            if (videoRef.current) {
              videoRef.current.onloadedmetadata = () => resolve(null);
            }
          });
        }

        setState((prev) => ({
          ...prev,
          stream,
          facingMode,
          isLoading: false,
        }));
      } catch (err) {
        const errorMsg =
          err instanceof DOMException
            ? err.name === 'NotAllowedError'
              ? 'Camera permission denied'
              : err.name === 'NotFoundError'
                ? 'No camera found'
                : err.message
            : 'Failed to access camera';

        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMsg,
        }));
      }
    },
    [stopStream]
  );

  const toggleCamera = useCallback(async () => {
    const newFacingMode = state.facingMode === 'environment' ? 'user' : 'environment';
    await startCamera(newFacingMode);
  }, [state.facingMode, startCamera]);

  const checkMultipleCameras = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      setState((prev) => ({
        ...prev,
        hasMultipleCameras: videoDevices.length > 1,
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        hasMultipleCameras: false,
      }));
    }
  }, []);

  useEffect(() => {
    checkMultipleCameras();
    startCamera('environment');

    return () => {
      stopStream();
    };
  }, []);

  const capturePhoto = useCallback((): string | null => {
    const video = videoRef.current;
    if (!video || video.readyState !== video.HAVE_ENOUGH_DATA) {
      return null;
    }

    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }

    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Flip horizontally if using front camera
    if (state.facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Reset transform
    if (state.facingMode === 'user') {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    return canvas.toDataURL('image/jpeg', 0.85);
  }, [state.facingMode]);

  return {
    videoRef,
    ...state,
    toggleCamera,
    capturePhoto,
  };
}
