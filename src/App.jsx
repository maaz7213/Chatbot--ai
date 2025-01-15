'use client';

import { useState } from 'react';
import Sidebar from './Component/Sidebar.jsx';
import ChatArea from './Component/chat-area.jsx';
import Settings from './Component/settings.jsx';
import PropTypes from 'prop-types';
import './index.css'; // Ensure the path is correct based on your project structure

export default function RootLayout({ children }) {
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: 'User',
    email: 'user@example.com',
    avatar:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tvtCCmP0kiUR13jv4UanQUdWf1zBKc.png',
  });

  // Handler to change the active chat
  const handleChatChange = (chatId) => {
    setActiveChatId(chatId);
    if (chatId && !chatMessages[chatId]) {
      setChatMessages((prev) => ({ ...prev, [chatId]: [] }));
    }
  };

  // Handler to update messages for the active chat
  const setMessages = (messages) => {
    if (activeChatId) {
      setChatMessages((prev) => ({ ...prev, [activeChatId]: messages }));
    }
  };

  // Handler to update the user profile
  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <div className="flex w-screen h-screen bg-[#0a1a14] overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar
        onChatChange={handleChatChange}
        setIsSettingsOpen={setIsSettingsOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* ChatArea Component */}
        <ChatArea
          messages={activeChatId ? chatMessages[activeChatId] || [] : []}
          setMessages={setMessages}
          activeChatId={activeChatId}
        />

        {/* Children Components (if any) */}
        {children}
      </main>

      {/* Settings Modal */}
      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={profile}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
}

// PropTypes for Prop Validation (Optional but Recommended)
RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
