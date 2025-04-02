
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

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
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-[#2C5AAE] mb-2">Instant Relocation Support</h3>
            <p className="text-gray-700">
              Get immediate answers to your relocation questions anytime, day or night. Our AI assistant is trained on comprehensive relocation information specific to your needs.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-[#2C5AAE] mb-2">What You Can Ask About</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Visa and immigration procedures</li>
              <li>Housing options and neighborhood information</li>
              <li>Cost of living estimates</li>
              <li>Local transportation systems</li>
              <li>Healthcare and education systems</li>
              <li>Cultural adaptation tips</li>
              <li>Essential documentation</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-[#2C5AAE] mb-2">How It Helps</h3>
            <p className="text-gray-700">
              Our AI assistant provides factual information, guides you through processes step-by-step, and can help you prepare checklists for your relocation journey.
            </p>
          </div>
        </div>
        
        <div className="flex justify-center gap-4 mt-8">
          <Button 
            onClick={() => window.open('https://chatgpt.com/g/g-67b6c40963908191b77e23c6fecc2e57-the-24-7-relocation-life-ai-assistant', '_blank')}
            className="bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] hover:opacity-90 gap-2"
          >
            Open AI Assistant <ExternalLink size={16} />
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
