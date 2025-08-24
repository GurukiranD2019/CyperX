import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import Sidebar from "./Sidebar";
import "./ChatInterface.css";

interface ChatInterfaceProps {
  user: string;
  onLogout: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ user, onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleNewChat = () => {
    // TODO: Implement new chat functionality
    console.log("Starting new chat...");
    alert("New chat functionality will be implemented in the next phase!");
  };

  const handleSettingsClick = () => {
    // TODO: Implement settings functionality
    console.log("Opening settings...");
    alert("Advanced settings will be implemented in the next phase!");
  };

  const handleNewMessage = (message: string) => {
    // TODO: This will be used to update conversation history
    console.log("New message:", message);
  };

  const handleMobileSidebarToggle = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  return (
    <div className="chat-interface">
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-button"
        onClick={handleMobileSidebarToggle}
        title="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </button>

      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div
          className="mobile-sidebar-overlay"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`sidebar-container ${
          isSidebarCollapsed ? "collapsed" : ""
        } ${showMobileSidebar ? "mobile-open" : ""}`}
      >
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={handleToggleSidebar}
          onNewChat={handleNewChat}
          onLogout={onLogout}
          onSettingsClick={handleSettingsClick}
          currentUser={user}
        />
      </div>

      {/* Main Chat Area */}
      <div
        className={`chat-container ${
          isSidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        <ChatWindow onNewMessage={handleNewMessage} />
      </div>
    </div>
  );
};

export default ChatInterface;
