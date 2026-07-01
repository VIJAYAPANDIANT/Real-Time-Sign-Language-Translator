import { useNavigate } from 'react-router-dom';
import { Camera, Zap, Globe } from 'lucide-react';
import './LandingPage.css';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="container landing-page animate-fade-in">
      <div className="hero-section">
        <h1 className="h1 hero-title">
          Break the silence with <br />
          <span className="text-gradient">Real-Time ASL</span>
        </h1>
        <p className="hero-subtitle text-secondary">
          Instantly translate American Sign Language into text and speech using just your webcam. Powered by advanced computer vision and AI.
        </p>
        <div className="hero-cta">
          <button
            onClick={() => navigate('/translate')}
            className="btn btn-primary"
          >
            Start Translating
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="btn btn-secondary"
          >
            View Settings
          </button>
        </div>
      </div>

      <div className="features-grid">
        <div className="glass-panel feature-card">
          <div className="feature-icon-wrapper">
            <Camera size={32} />
          </div>
          <h2 className="h3">No Extra Hardware</h2>
          <p className="text-secondary">
            Works directly in your browser using any standard webcam. No specialized gloves or cameras required.
          </p>
        </div>
        <div className="glass-panel feature-card">
          <div className="feature-icon-wrapper">
            <Zap size={32} />
          </div>
          <h2 className="h3">Lightning Fast</h2>
          <p className="text-secondary">
            State-of-the-art WebSockets stream video frames for near-instantaneous translation feedback.
          </p>
        </div>
        <div className="glass-panel feature-card">
          <div className="feature-icon-wrapper">
            <Globe size={32} />
          </div>
          <h2 className="h3">Accessible Design</h2>
          <p className="text-secondary">
            Built with large text, high contrast, text-to-speech, and full keyboard navigation in mind.
          </p>
        </div>
      </div>
    </div>
  );
}
