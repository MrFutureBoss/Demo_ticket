import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

interface ChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatBox({ isOpen, onClose }: ChatBoxProps) {
  return (
    <div className={`chat-box ${isOpen ? 'open' : ''}`}>
      <div className="chat-box-container">
        <div className="chat-box-header">
          <h3>Messages</h3>
          <button 
            className="close-button" 
            onClick={onClose}
            aria-label="Close chat"
          >
            <CloseOutlined />
          </button>
        </div>
        <div className="chat-box-content">
          {/* Chat content will be added here */}
        </div>
      </div>
    </div>
  );
} 