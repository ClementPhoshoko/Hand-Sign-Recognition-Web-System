import React from 'react';
import './DashboardItems.css';

const RecentMeetingsSection = () => {
  const meetings = [
    { id: 1, title: 'Project Kickoff', time: '10:00 AM', date: 'Today', isLive: true },
    { id: 2, title: 'Design Review', time: '2:30 PM', date: 'Yesterday', isPast: true },
    { id: 3, title: 'Client Sync', time: '11:00 AM', date: 'May 16', isPast: true },
  ];

  // Only show three items
  const displayMeetings = meetings.slice(0, 3);

  return (
    <div className="gl-db-section gl-db-meetings-section">
      <h2 className="gl-db-section-title">Live Hub & Meetings</h2>
      <div className="gl-db-meetings-list">
        {displayMeetings.map(meeting => (
          <div key={meeting.id} className="gl-db-meeting-item">
            <div className="gl-db-meeting-info">
              {meeting.isLive && (
                <div className="gl-db-live-indicator">
                  <div className="gl-db-live-dot" />
                  Live Now
                </div>
              )}
              <span className="gl-db-meeting-name">{meeting.title}</span>
              <span className="gl-db-meeting-time">{meeting.time} — {meeting.date}</span>
            </div>
            <button className={`gl-db-btn-join ${meeting.isLive ? 'is-live' : ''}`}>
              {meeting.isLive ? 'Join Now' : 'View Recap'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMeetingsSection;
