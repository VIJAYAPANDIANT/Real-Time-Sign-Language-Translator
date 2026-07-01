import { useEffect, useRef } from 'react';
import { useWebcam } from '../hooks/useWebcam';
import { VideoOff } from 'lucide-react';
import './WebcamFeed.css';

interface WebcamFeedProps {
  onVideoReady?: (videoRef: React.RefObject<HTMLVideoElement>) => void;
  isActive: boolean;
}

export function WebcamFeed({ onVideoReady, isActive }: WebcamFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null) as React.RefObject<HTMLVideoElement>;
  const { stream, startCamera, stopCamera } = useWebcam(videoRef);

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isActive, startCamera, stopCamera]);

  useEffect(() => {
    if (onVideoReady && videoRef.current) {
      onVideoReady(videoRef);
    }
  }, [onVideoReady, videoRef]);

  return (
    <div className="webcam-container">
      {!stream && isActive && (
        <div className="webcam-overlay">
          <div className="spinner"></div>
          <p>Accessing camera...</p>
        </div>
      )}
      
      {!isActive && (
        <div className="webcam-overlay">
          <VideoOff size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <p>Camera is off</p>
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`webcam-video ${(!stream || !isActive) ? 'hidden' : ''}`}
      />
    </div>
  );
}
