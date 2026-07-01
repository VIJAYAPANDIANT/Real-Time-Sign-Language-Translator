import { useState } from 'react';
import { WebcamFeed } from '../components/WebcamFeed';
import { LandmarkOverlay } from '../components/LandmarkOverlay';
import { TranslationPanel } from '../components/TranslationPanel';
import { useTranslatorSocket } from '../hooks/useTranslatorSocket';
import { Play, Square, Trash2 } from 'lucide-react';
import './TranslatorPage.css';

export function TranslatorPage() {
  const [videoRef, setVideoRef] = useState<React.RefObject<HTMLVideoElement> | null>(null);
  
  const {
    isConnected,
    isTranslating,
    predictions,
    connect,
    disconnect,
    startTranslating,
    stopTranslating,
    clearTranslations,
  } = useTranslatorSocket();

  const handleToggleTranslation = () => {
    if (isTranslating) {
      stopTranslating();
      disconnect();
    } else {
      connect();
      startTranslating();
    }
  };

  return (
    <div className="container translator-page animate-fade-in">
      <div className="glass-panel translator-header">
        <div>
          <h1 className="h2 translator-title text-gradient">Translator Studio</h1>
          <p className="text-secondary">Position yourself in frame and start signing.</p>
        </div>
        <div className="translator-actions">
          <button
            onClick={clearTranslations}
            className="btn btn-secondary"
          >
            <Trash2 size={18} />
            Clear
          </button>
          <button
            onClick={handleToggleTranslation}
            className={`btn ${isTranslating ? 'btn-stop' : 'btn-primary'}`}
          >
            {isTranslating ? (
              <>
                <Square size={18} className="fill-current" /> Stop
              </>
            ) : (
              <>
                <Play size={18} className="fill-current" /> Start
              </>
            )}
          </button>
        </div>
      </div>

      <div className="translator-workspace">
        <div className={`video-container ${isTranslating ? 'active' : ''}`}>
          <WebcamFeed onVideoReady={setVideoRef} isActive={isTranslating} />
          <LandmarkOverlay isActive={isTranslating} videoRef={videoRef} />
        </div>
        
        <div className="h-full">
          <TranslationPanel 
            predictions={predictions} 
            isConnected={isConnected} 
            isTranslating={isTranslating}
          />
        </div>
      </div>
    </div>
  );
}
