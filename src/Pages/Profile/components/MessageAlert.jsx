import React from 'react';

const MessageAlert = ({ message }) => {
  if (!message.text) return null;

  return (
    <div className={`mb-6 p-4 rounded-2xl border backdrop-blur-sm animate-slide-in-top`} style={{
      backgroundColor: message.type === 'success' ? 'var(--color-success)' : 'var(--color-error)',
      borderColor: message.type === 'success' ? 'var(--color-success)' : 'var(--color-error)',
      color: 'white'
    }}>
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full mr-3 animate-pulse bg-white`}></div>
        {message.text}
      </div>
    </div>
  );
};

export default MessageAlert;