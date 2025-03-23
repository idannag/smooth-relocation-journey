
import React from 'react';

const ChatbotContent = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)]">
      <div className="max-w-2xl w-full p-4">
        <iframe
          src="https://chat.widget.autodigital.agency/"
          className="w-full h-[80vh] border rounded-lg shadow-lg"
          frameBorder="0"
          title="AI Chatbot"
        />
      </div>
    </div>
  );
};

export default ChatbotContent;
