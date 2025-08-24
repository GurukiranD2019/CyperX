import React, { useState } from "react";
import "./Sidebar.css";

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  isActive?: boolean;
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  onLogout: () => void;
  onSettingsClick: () => void;
  currentUser: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
  onNewChat,
  onLogout,
  onSettingsClick,
  currentUser,
}) => {
  const [conversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Getting Started with CypherX",
      lastMessage: "Hello! I'm CypherX, your AI assistant...",
      timestamp: new Date(),
      isActive: true,
    },
    {
      id: "2",
      title: "JavaScript Best Practices",
      lastMessage: "Can you explain modern JavaScript...",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: "3",
      title: "React Development Tips",
      lastMessage: "What are the best practices for...",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // Yesterday
    },
    {
      id: "4",
      title: "API Integration Help",
      lastMessage: "How do I integrate with external APIs...",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    },
    {
      id: "5",
      title: "Database Design Questions",
      lastMessage: "What's the best approach for...",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    },
    {
      id: "6",
      title: "Performance Optimization",
      lastMessage: "My application is running slowly...",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 2 weeks ago
    },
  ]);

  const groupConversationsByTime = (conversations: Conversation[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const groups = {
      today: [] as Conversation[],
      yesterday: [] as Conversation[],
      lastWeek: [] as Conversation[],
      lastMonth: [] as Conversation[],
      older: [] as Conversation[],
    };

    conversations.forEach((conv) => {
      const convDate = new Date(conv.timestamp);
      if (convDate >= today) {
        groups.today.push(conv);
      } else if (convDate >= yesterday) {
        groups.yesterday.push(conv);
      } else if (convDate >= lastWeek) {
        groups.lastWeek.push(conv);
      } else if (convDate >= lastMonth) {
        groups.lastMonth.push(conv);
      } else {
        groups.older.push(conv);
      }
    });

    return groups;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return minutes < 1 ? "Just now" : `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const conversationGroups = groupConversationsByTime(conversations);

  const renderConversationGroup = (
    title: string,
    conversations: Conversation[]
  ) => {
    if (conversations.length === 0) return null;

    return (
      <div className="conversation-group" key={title}>
        {!isCollapsed && <h3 className="group-title">{title}</h3>}
        <div className="conversation-list">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${conv.isActive ? "active" : ""}`}
              title={isCollapsed ? conv.title : ""}
            >
              <div className="conversation-content">
                <div className="conversation-title">
                  {isCollapsed ? "💬" : conv.title}
                </div>
                {!isCollapsed && (
                  <>
                    <div className="conversation-preview">
                      {conv.lastMessage}
                    </div>
                    <div className="conversation-time">
                      {formatTime(conv.timestamp)}
                    </div>
                  </>
                )}
              </div>
              {!isCollapsed && (
                <button className="conversation-menu" title="More options">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Header */}
      <div className="sidebar-header">
        <button
          className="new-chat-button"
          onClick={onNewChat}
          title="New conversation"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          {!isCollapsed && <span>New Chat</span>}
        </button>

        <button
          className="toggle-button"
          onClick={onToggle}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path
              d={
                isCollapsed
                  ? "M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
                  : "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
              }
            />
          </svg>
        </button>
      </div>

      {/* Conversations */}
      <div className="conversations-container">
        {renderConversationGroup("Today", conversationGroups.today)}
        {renderConversationGroup("Yesterday", conversationGroups.yesterday)}
        {renderConversationGroup("Last 7 days", conversationGroups.lastWeek)}
        {renderConversationGroup("Last 30 days", conversationGroups.lastMonth)}
        {renderConversationGroup("Older", conversationGroups.older)}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <button
          className="footer-button"
          onClick={onSettingsClick}
          title="Settings"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
          </svg>
          {!isCollapsed && <span>Settings</span>}
        </button>

        <button
          className="footer-button logout-button"
          onClick={onLogout}
          title="Logout"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
            <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
          </svg>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
