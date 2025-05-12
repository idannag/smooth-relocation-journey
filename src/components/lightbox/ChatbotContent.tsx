
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface ChatbotContentProps {
  onClose?: () => void;
}

const ChatbotContent = ({
  onClose
}: ChatbotContentProps = {}) => {
  // Example questions from the screenshot
  const exampleQuestions = [
    "Where can I find a reliable plumber or electrician in my area?",
    "What's the best way to get groceries delivered to my home?",
    "How can I meet other expats or locals in my area?",
    "Are there any good playgrounds or parks for kids nearby?",
    "What's the best way to avoid rush hour traffic in my city?",
    "Where can I find specialty grocery stores (e.g., kosher, Asian, organic)?",
    "Are there any English-speaking doctors or clinics near me?",
    "What are some hidden gems or local non-touristy spots worth visiting?",
    "How do I get a monthly public transport pass?",
    "Are there any family-friendly weekend activities happening soon?"
  ];

  return <div className="p-8 max-w-4xl mx-auto px-[14px] py-[14px]">
      <div className="bg-white rounded-xl shadow-lg mb-8 py-[10px] px-[10px]">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6 hidden">
          <p className="text-gray-700">
            <span className="font-bold text-[#2C5AAE]">Your 24/7 AI-powered assistant for expat life:</span> 
            Get personalized, practical answers on your daily needs, local services, transportation, community, and family life—wherever you are. Live like a local from day one.
          </p>
        </div>
        
        {/* Examples button with tooltip */}
        <div className="flex justify-center mb-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1 text-xs border-blue-100 text-blue-600 hover:bg-blue-50"
                >
                  <HelpCircle size={14} />
                  Examples of daily questions I can ask
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                className="w-72 p-3 bg-white shadow-lg border border-gray-100"
                sideOffset={5}
              >
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-600 mb-2">Try asking about:</p>
                  <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
                    {exampleQuestions.map((question, index) => (
                      <div 
                        key={index} 
                        className="text-xs p-2 bg-blue-50 rounded-md border border-blue-100"
                      >
                        {question}
                      </div>
                    ))}
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="chatbot-iframe-container" style={{
          height: '700px',
          overflow: 'hidden'
        }}>
          <iframe 
            src="https://www.chatbase.co/chatbot-iframe/_IP9FBCx0xbBH4Tafpfpq" 
            width="100%" 
            height="100%" 
            style={{
              minHeight: '700px',
              border: 'none'
            }} 
            title="Chatbot Assistant"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
            referrerPolicy="origin"
          />
        </div>
      </div>
    </div>;
};
export default ChatbotContent;
