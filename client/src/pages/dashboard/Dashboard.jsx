import React from 'react';
import './Dashboard.css';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import ProfileSection from './dashboard_items/ProfileSection';
import QuickActionHub from './dashboard_items/QuickActionHub';
import SettingsSection from './dashboard_items/SettingsSection';
import RecentMeetingsSection from './dashboard_items/RecentMeetingsSection';

const Dashboard = () => {
  return (
    <div className="gl-db-container">
      <Breadcrumbs />
      <main className="gl-db-shell">
        {/* Left Column: Profile & Actions */}
        <div className="gl-db-left-column">
          <ProfileSection />
          <QuickActionHub />
        </div>

        {/* Right Column: Activity and Meetings */}
        <div className="gl-db-right-column">
          <SettingsSection />
          <RecentMeetingsSection />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
