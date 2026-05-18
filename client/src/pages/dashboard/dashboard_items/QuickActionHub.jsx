import React from 'react';
import './DashboardItems.css';

const QuickActionHub = () => {
  const actions = [
    {
      id: 'start',
      label: 'Start Instant Meeting',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 7l-7 5 7 5V7z" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      )
    },
    {
      id: 'schedule',
      label: 'Schedule Session',
      isComingSoon: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    },
    {
      id: 'check',
      label: 'Check Sign',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      )
    },
    {
      id: 'log',
      label: 'Log Query',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="13" x2="15" y2="13" />
        </svg>
      )
    },
    {
      id: 'extract',
      label: 'Extract Transcript',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      )
    }
  ];

  return (
    <div className="gl-db-section gl-db-action-hub">
      <h3 className="gl-db-action-title">instant action you can take</h3>
      <div className="gl-db-action-grid-squares">
        {actions.map(action => (
          <button 
            key={action.id} 
            className={`gl-db-action-square-btn ${action.isComingSoon ? 'is-coming-soon' : ''}`} 
          >
            <div className="gl-db-action-content">
              <span className="gl-db-action-icon">{action.icon}</span>
              <span className="gl-db-action-square-label">{action.label}</span>
            </div>
            {action.isComingSoon && <div className="gl-db-coming-soon-mask">Coming Soon</div>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionHub;
