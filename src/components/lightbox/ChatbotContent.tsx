
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
interface ChatbotContentProps {
  onClose?: () => void;
}
const ChatbotContent = ({
  onClose
}: ChatbotContentProps = {}) => {
  return <div className="p-8 max-w-4xl mx-auto px-[14px] py-[14px]">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 py-[10px] px-[10px]">
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
          <p className="text-gray-700"><span className="font-bold text-[#2C5AAE]">Your 24/7 AI-powered assistant for expat life:</span> Get personalized, practical answers on your daily needs, local services, transportation, community, and family life—wherever you are. Live like a local from day one.</p>
        </div>
        
        <div className="flex justify-center gap-4 mb-8">
          <Button onClick={() => window.open('https://chatgpt.com/g/g-67b6c40963908191b77e23c6fecc2e57-the-24-7-relocation-life-ai-assistant', '_blank')} className="bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] hover:opacity-90 gap-2">
            Open AI Assistant <ExternalLink size={16} />
          </Button>
        </div>
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-[#2C5AAE] mb-2 text-base">Example Daily Questions You Can Ask:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span>🔧</span> 
                <span className="text-sm">Where can I find a reliable plumber or electrician in my area?</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🛒</span> 
                <span className="text-sm">What's the best way to get groceries delivered to my home?</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🧑‍🤝‍🧑</span> 
                <span className="text-sm">How can I meet other expats or locals in my area?</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🛝</span> 
                <span className="text-sm">Are there any good playgrounds or parks for kids nearby?</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🚗</span> 
                <span>What's the best way to avoid rush hour traffic in my city?</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🥬</span> 
                <span className="text-sm">Where can I find specialty grocery stores (e.g., kosher, Asian, organic)?</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🏥</span> 
                <span className="text-sm">Are there any English-speaking doctors or clinics near me?</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🌿</span> 
                <span className="text-sm">What are some hidden gems or local non-touristy spots worth visiting?</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🚌</span> 
                <span className="text-sm">How do I get a monthly public transport pass?</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🎡</span> 
                <span className="text-sm">Are there any family-friendly weekend activities happening soon?</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>;
};
export default ChatbotContent;
