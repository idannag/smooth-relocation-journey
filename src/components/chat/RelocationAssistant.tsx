
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

const CONFIG = {
  BRAND_COLOR: '#2C5AAE',
  BRAND_GRADIENT: 'from-[#2C5AAE] to-[#40E0D0]'
}

const RelocationAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi 👋 I'm your personal relocation assistant. Tell me where you are, and I'll help you feel at home!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    
    // In this implementation, we're redirecting to the ChatGPT assistant
    // rather than using the API directly
    setTimeout(() => {
      const assistantResponse = { 
        role: 'assistant', 
        content: "I've received your message. For a complete assistance experience with your relocation needs, please visit our AI assistant page where I can provide more detailed help and resources." 
      };
      setMessages(prev => [...prev, assistantResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const openAIAssistant = () => {
    window.open('https://chatgpt.com/g/g-67b6c40963908191b77e23c6fecc2e57-the-24-7-relocation-life-ai-assistant', '_blank');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-[600px] flex flex-col bg-gray-50 rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] p-4 text-white">
        <h2 className="text-xl font-semibold">Relocation Assistant</h2>
        <p className="text-sm opacity-90">Your 24/7 guide to feeling at home anywhere</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap shadow-sm ${
              msg.role === 'user' 
                ? 'bg-white ml-auto border border-gray-200' 
                : 'bg-blue-50 border-l-4 border-l-[#2C5AAE]'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="bg-blue-50 border-l-4 border-l-[#2C5AAE] max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-sm">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-150"></div>
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-300"></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full p-2 border rounded-xl resize-none focus:outline-none min-h-[60px] max-h-[120px]"
            rows={2}
          />
          <Button 
            onClick={sendMessage}
            className="bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white px-3 py-2 rounded-xl hover:opacity-90 h-[60px] w-[60px] flex items-center justify-center"
            disabled={isLoading || !input.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline" 
            onClick={openAIAssistant}
            className="text-xs border border-blue-200 hover:bg-blue-50 text-blue-700"
          >
            Open Full AI Assistant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RelocationAssistant;
