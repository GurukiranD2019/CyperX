import React, { useState, useRef, useEffect } from "react";
import "./ChatWindow.css";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface ChatWindowProps {
  onNewMessage?: (message: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onNewMessage }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm CypherX, your AI assistant powered by DeepSeek. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Notify parent component about new message
    if (onNewMessage) {
      onNewMessage(inputMessage.trim());
    }

    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `I received your message: "${userMessage.content}". This is a simulated response. In the next phase, I'll be connected to DeepSeek AI to provide intelligent responses!`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="chat-window">
      {/* Messages Area */}
      <div className="messages-container">
        <div className="messages-list">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="message-avatar">
                {message.type === "user" ? (
                  <div className="user-avatar">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                ) : (
                  <div className="ai-avatar">
                    <span className="ai-icon">CX</span>
                  </div>
                )}
              </div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-sender">
                    {message.type === "user" ? "You" : "CypherX"}
                  </span>
                  <span className="message-time">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <div className="message-text">{message.content}</div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="message ai loading">
              <div className="message-avatar">
                <div className="ai-avatar">
                  <span className="ai-icon">CX</span>
                </div>
              </div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-sender">CypherX</span>
                </div>
                <div className="message-text">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="input-container">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
            className="message-input"
            disabled={isLoading}
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="send-button"
            title="Send message"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
        <div className="input-footer">
          <span className="input-hint">
            CypherX can make mistakes. Consider checking important information.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
