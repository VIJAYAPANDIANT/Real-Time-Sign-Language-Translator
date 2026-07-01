import type { SessionHistory } from '../types';
import { Clock, PlayCircle } from 'lucide-react';
import './HistoryPage.css';

export function HistoryPage() {
  // Mock history data since backend is not fully implemented
  const mockHistory: SessionHistory[] = [
    { id: '1', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), text: 'HELLO THANK YOU' },
    { id: '2', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), text: 'PLEASE HELP ME' },
    { id: '3', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), text: 'YES I AM GOOD' },
  ];

  const handleReplay = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="container history-page animate-fade-in">
      <h1 className="h2 text-gradient">Translation History</h1>
      
      <div className="history-list">
        {mockHistory.map((session) => (
          <div key={session.id} className="glass-panel history-card">
            <div className="history-content">
              <div className="history-time">
                <Clock size={16} />
                {new Date(session.timestamp).toLocaleString()}
              </div>
              <p className="history-text">
                {session.text}
              </p>
            </div>
            <button
              onClick={() => handleReplay(session.text)}
              className="btn-replay"
              title="Replay Audio"
            >
              <PlayCircle size={32} />
            </button>
          </div>
        ))}
        
        {mockHistory.length === 0 && (
          <div className="text-center text-secondary mt-4">
            No translation history yet.
          </div>
        )}
      </div>
    </div>
  );
}
