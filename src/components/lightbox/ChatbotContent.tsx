
import React from 'react';
import { Button } from "@/components/ui/button";

interface ChatbotContentProps {
  onClose?: () => void;
}

const ChatbotContent = ({ onClose }: ChatbotContentProps = {}) => {
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
        <div className="flex justify-center gap-4 mt-8">
          <Button 
            onClick={() => window.open('https://chatgpt.com/g/g-67b6c40963908191b77e23c6fecc2e57-the-24-7-relocation-life-ai-assistant', '_blank')}
            className="bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] hover:opacity-90"
          >
            Open AI Assistant
          </Button>
          
          {onClose && (
            <Button 
              onClick={onClose} 
              variant="outline"
            >
              Back to Home
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotContent;
