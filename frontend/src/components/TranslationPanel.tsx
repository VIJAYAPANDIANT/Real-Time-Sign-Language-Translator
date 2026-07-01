import type { Prediction } from '../types';
import { Volume2 } from 'lucide-react';
import './TranslationPanel.css';

interface TranslationPanelProps {
  predictions: Prediction[];
  isConnected: boolean;
  isTranslating: boolean;
}

export function TranslationPanel({ predictions, isConnected, isTranslating }: TranslationPanelProps) {
  const currentText = predictions.map(p => p.text).join(' ');
  const latestPrediction = predictions[predictions.length - 1];

  const handleSpeak = () => {
    if ('speechSynthesis' in window && currentText) {
      const utterance = new SpeechSynthesisUtterance(currentText);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="glass-panel translation-panel">
      <div className="panel-header">
        <h2 className="h3 panel-title">Live Translation</h2>
        <div className="panel-controls">
          {latestPrediction && (
            <div className={`confidence-badge ${
              latestPrediction.confidence > 0.9 ? 'confidence-high' :
              latestPrediction.confidence > 0.7 ? 'confidence-med' :
              'confidence-low'
            }`}>
              {Math.round(latestPrediction.confidence * 100)}% Match
            </div>
          )}
          <button
            onClick={handleSpeak}
            disabled={!currentText}
            className="btn-speak"
            title="Read aloud"
          >
            <Volume2 size={24} />
          </button>
        </div>
      </div>

      <div className="panel-content">
        {!isConnected && isTranslating ? (
          <div className="status-message">
            <span style={{ marginRight: '0.5rem' }}>Connecting to server...</span>
            <span className="cursor-blink" style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%' }}></span>
          </div>
        ) : !isTranslating ? (
          <div className="status-message">
            Press Start to begin translating...
          </div>
        ) : (
          <div className="translation-text">
            {currentText || <span className="text-placeholder">Waiting for signs...</span>}
            <span className="cursor-blink"></span>
          </div>
        )}
      </div>
    </div>
  );
}
