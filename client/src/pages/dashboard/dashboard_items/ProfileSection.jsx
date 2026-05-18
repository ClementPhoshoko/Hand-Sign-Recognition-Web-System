import React from 'react';
import './DashboardItems.css';

const ProfileSection = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    isVerified: true,
    avatar: null,
    bio: 'Passionate about building great software and collaborative environments. Host and participant in various strategic sessions. My focus remains on bridging the gap between technical innovation and practical, user-centric design solutions. Constantly exploring new technologies to stay ahead in the rapidly evolving landscape of web development.',
    socials: {
      linkedin: 'linkedin.com/in/johndoe',
      youtube: 'youtube.com/@johndoe',
      website: 'johndoe.dev'
    }
  };

  return (
    <div className="gl-db-section gl-db-profile-section">
      <div className="gl-db-profile-header">
        <div className="gl-db-profile-top-row">
          <div className="gl-db-profile-image-section">
            <div className="gl-db-profile-image-container">
              <div className="gl-db-profile-image">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <div className="gl-db-avatar-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span className="gl-db-avatar-placeholder-text">Not Set</span>
                  </div>
                )}
              </div>
              <div className="gl-db-image-overlay">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
            </div>
            <p className="gl-db-image-advisory">
              Click to upload • Double-click to preview
            </p>
          </div>

          <div className="gl-db-profile-bio-section">
            <p className="gl-db-profile-bio">
              {user.bio.length > 342 ? `${user.bio.substring(0, 342)}...` : user.bio}
            </p>
          </div>
        </div>

        <div className="gl-db-profile-info">
          <div className="gl-db-profile-identity">
            <h1 className="gl-db-profile-name">{user.name}</h1>
            <div className="gl-db-verification-badge">
              {user.isVerified && (
                <span className="gl-db-info-icon verified">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  Verified
                </span>
              )}
            </div>
          </div>
          
          <div className="gl-db-info-list">
            <div className="gl-db-info-item">
              <span className="gl-db-info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <span className="gl-db-info-text">{user.email}</span>
            </div>

            <div className="gl-db-social-links">
              <div className="gl-db-info-item">
                <span className="gl-db-info-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </span>
                <span className="gl-db-info-label">LinkedIn</span>
                <a href={`https://${user.socials.linkedin}`} className="gl-db-info-text social-link" target="_blank" rel="noopener noreferrer">{user.socials.linkedin}</a>
              </div>

              <div className="gl-db-info-item">
                <span className="gl-db-info-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                  </svg>
                </span>
                <span className="gl-db-info-label">YouTube</span>
                <a href={`https://${user.socials.youtube}`} className="gl-db-info-text social-link" target="_blank" rel="noopener noreferrer">{user.socials.youtube}</a>
              </div>

              <div className="gl-db-info-item">
                <span className="gl-db-info-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </span>
                <span className="gl-db-info-label">Website</span>
                <a href={`https://${user.socials.website}`} className="gl-db-info-text social-link" target="_blank" rel="noopener noreferrer">{user.socials.website}</a>
              </div>
            </div>
          </div>

          <div className="gl-db-profile-actions">
            <button className="gl-db-btn-edit">Edit Profile</button>
            <button className="gl-db-btn-password-link">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
