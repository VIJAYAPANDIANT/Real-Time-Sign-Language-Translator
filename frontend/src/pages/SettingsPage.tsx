import { useEffect, useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import './SettingsPage.css';

export function SettingsPage() {
  const { settings, updateSettings } = useSettings();
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setDevices(devices.filter((device) => device.kind === 'videoinput'));
    });
  }, []);

  return (
    <div className="container settings-page animate-fade-in">
      <h1 className="h2 text-gradient mb-4">Settings</h1>
      
      <div className="glass-panel settings-section">
        <h2 className="h3 mb-4">Camera Settings</h2>
        
        <div className="settings-group">
          <label className="settings-label">
            Camera Device
          </label>
          <select
            value={settings.deviceId}
            onChange={(e) => updateSettings({ deviceId: e.target.value })}
            className="input-field"
          >
            <option value="">Default Camera</option>
            {devices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId.substring(0, 5)}`}
              </option>
            ))}
          </select>
        </div>
        
        <div className="settings-group">
          <div className="settings-label">
            <span>Model Sensitivity Threshold</span>
            <span className="text-primary">{Math.round(settings.sensitivity * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={settings.sensitivity}
            onChange={(e) => updateSettings({ sensitivity: parseFloat(e.target.value) })}
            className="range-slider"
          />
          <p className="settings-help-text">
            Higher sensitivity means the model requires more confidence to output a translation, reducing false positives.
          </p>
        </div>
      </div>

      <div className="glass-panel settings-section mt-4">
        <h2 className="h3 mb-2">ASL Reference Chart</h2>
        <div className="asl-placeholder">
          <p>Static ASL Chart Image Here</p>
        </div>
      </div>
    </div>
  );
}
