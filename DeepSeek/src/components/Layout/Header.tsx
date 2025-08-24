import React, { useState } from "react";
import "./Header.css";

interface HeaderProps {
  user: string;
  onLogout: () => void;
  onProfileClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onProfileClick }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      setShowProfileDropdown(!showProfileDropdown);
    }
  };

  const handleLogoutClick = () => {
    setShowProfileDropdown(false);
    onLogout();
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="header-logo">
          <h1 className="logo-text">CypherX</h1>
          <span className="logo-tagline">AI Chatbot</span>
        </div>

        {/* User Actions Section */}
        <div className="header-actions">
          {/* Profile Dropdown */}
          <div className="profile-section">
            <button
              className="profile-button"
              onClick={handleProfileClick}
              aria-label="User profile menu"
            >
              <div className="profile-avatar">
                <span className="avatar-text">
                  {user.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="profile-name">{user}</span>
              <svg
                className={`dropdown-arrow ${
                  showProfileDropdown ? "rotated" : ""
                }`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
              >
                <path d="M6 8L2 4h8z" fill="currentColor" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-item profile-info">
                  <div className="user-details">
                    <span className="user-name">{user}</span>
                    <span className="user-role">User</span>
                  </div>
                </div>
                <hr className="dropdown-divider" />
                <button
                  className="dropdown-item dropdown-button"
                  onClick={() => {
                    setShowProfileDropdown(false);
                    alert("Profile settings coming soon!");
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-1.5 1.5A4.5 4.5 0 0 0 2 14h12a4.5 4.5 0 0 0-4.5-4.5H6.5z" />
                  </svg>
                  Profile Settings
                </button>
                <button
                  className="dropdown-item dropdown-button"
                  onClick={() => {
                    setShowProfileDropdown(false);
                    alert("Preferences coming soon!");
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z" />
                  </svg>
                  Preferences
                </button>
                <hr className="dropdown-divider" />
                <button
                  className="dropdown-item dropdown-button logout-button"
                  onClick={handleLogoutClick}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                    <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Quick Logout Button */}
          <button
            className="btn btn-secondary logout-btn-quick"
            onClick={handleLogoutClick}
            title="Logout"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
              <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Click overlay to close dropdown */}
      {showProfileDropdown && (
        <div
          className="dropdown-overlay"
          onClick={() => setShowProfileDropdown(false)}
        />
      )}
    </header>
  );
};

export default Header;
