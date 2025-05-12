
import React from 'react';

interface ChatbotContentProps {
  onClose?: () => void;
}

const ChatbotContent = ({
  onClose
}: ChatbotContentProps = {}) => {
  return (
    <div className="p-8 max-w-4xl mx-auto px-[14px] py-[14px]">
      <div className="bg-white rounded-xl shadow-lg mb-8 py-[10px] px-[10px]">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
          <p className="text-gray-700">
            <span className="font-bold text-[#2C5AAE]">Your 24/7 AI-powered assistant for expat life:</span> 
            Get personalized, practical answers on your daily needs, local services, transportation, community, and family life—wherever you are. Live like a local from day one.
          </p>
        </div>
        
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/_IP9FBCx0xbBH4Tafpfpq"
          width="100%"
          style={{ height: '100%', minHeight: '700px' }}
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default ChatbotContent;
