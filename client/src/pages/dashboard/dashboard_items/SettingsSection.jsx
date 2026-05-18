import React from 'react';
import './DashboardItems.css';

const SettingsSection = () => {
  // Generate current month activity
  const generateMonthlyData = () => {
    const data = [];
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Day of week for the 1st (0=Sun, 1=Mon, ..., 6=Sat)
    let startDay = firstDay.getDay();
    // Adjust for Monday start (0=Mon, ..., 6=Sun)
    startDay = startDay === 0 ? 6 : startDay - 1;

    // Add empty squares for leading days
    for (let i = 0; i < startDay; i++) {
      data.push({ isEmpty: true });
    }

    // Add actual days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      data.push({
        day: i,
        level: Math.floor(Math.random() * 4),
        fullDate: date.toDateString()
      });
    }

    // Add trailing empty squares to fill the grid (usually 35 or 42 squares total)
    const totalSquares = data.length > 35 ? 42 : 35;
    const trailingDays = totalSquares - data.length;
    for (let i = 0; i < trailingDays; i++) {
      data.push({ isEmpty: true });
    }
    
    return {
      days: data,
      monthName: firstDay.toLocaleString('default', { month: 'long' })
    };
  };

  const { days, monthName } = generateMonthlyData();

  return (
    <div className="gl-db-section gl-db-activity-section">
      <div className="gl-db-activity-header">
        <div className="gl-db-section-title">
          <div className="gl-db-title-content">Activity Pulse</div>
        </div>
        <span className="gl-db-activity-total">{monthName}</span>
      </div>
      
      <div className="gl-db-heatmap-container">
        <div className="gl-db-heatmap-wrapper">
          <div className="gl-db-heatmap-days">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span>S</span>
          </div>
          <div className="gl-db-calendar-grid">
            {days.map((item, i) => (
              <div 
                key={i} 
                className={`gl-db-heatmap-square ${item.isEmpty ? 'is-empty' : `level-${item.level}`}`}
                title={item.isEmpty ? '' : `${item.fullDate}: ${item.level === 0 ? 'No' : item.level * 2} sessions`}
              >
                {!item.isEmpty && <span className="gl-db-calendar-date">{item.day}</span>}
              </div>
            ))}
          </div>
        </div>
        
        <div className="gl-db-heatmap-footer">
          <div className="gl-db-heatmap-legend">
            <span>Less</span>
            <div className="gl-db-heatmap-square level-0" />
            <div className="gl-db-heatmap-square level-1" />
            <div className="gl-db-heatmap-square level-2" />
            <div className="gl-db-heatmap-square level-3" />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
