import { NavLink } from 'react-router-dom';
import { Camera, History, Settings, Home } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import './Navbar.css';

export function Navbar() {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/translate', icon: Camera, label: 'Translate' },
    { to: '/history', icon: History, label: 'History' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="navbar animate-fade-in">
      <div className="glass-panel navbar-inner">
        <div className="flex-center">
          <span className="navbar-logo text-gradient">
            SignLang AI
          </span>
        </div>
        
        <div className="navbar-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                aria-label={item.label}
                title={item.label}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <Icon size={18} />
                <span className="nav-link-text">{item.label}</span>
              </NavLink>
            );
          })}
          <div className="navbar-divider"></div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
