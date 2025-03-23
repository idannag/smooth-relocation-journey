
import React from 'react';

const ChatbotContent = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
          My 24/7 AI Assistant
        </h2>
        <p className="text-gray-600 mb-4">
          Our AI assistant is available 24/7 to answer your questions about relocation, visa processes, 
          accommodations, and more. Get instant information whenever you need it.
        </p>
        <div className="flex justify-center mt-8">
          <Button 
            onClick={() => window.open('https://chat.widget.autodigital.agency/', '_blank')}
            className="bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] hover:opacity-90"
          >
            Open AI Assistant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotContent;
