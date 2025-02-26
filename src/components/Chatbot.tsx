
import { useState } from 'react';
import { Send, X, Bot } from 'lucide-react';

interface ChatbotProps {
  onClose: () => void;
  inLightbox?: boolean;
}

interface Message {
  type: 'user' | 'bot';
  text: string;
}

const presetQuestions = [
  "What documents do I need for my visa?",
  "How can I find housing in Israel?",
  "What are typical relocation expenses?",
  "How does healthcare work in Israel?",
  "How to find schools for my children?",
  "What are the best areas to live in Tel Aviv?"
];

const Chatbot = ({ onClose, inLightbox = false }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', text: 'Hello! I\'m your Relocation Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text }]);
    setInput('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      let response = '';
      
      if (text.toLowerCase().includes('visa') || text.includes('documents')) {
        response = 'For your visa application, you typically need: passport valid for at least 6 months, work permit/invitation letter, proof of accommodation, and health insurance. The specific requirements may vary based on your nationality and visa type.';
      } else if (text.toLowerCase().includes('housing') || text.toLowerCase().includes('accommodation') || text.toLowerCase().includes('areas') || text.toLowerCase().includes('live')) {
        response = 'Finding housing in Israel can be done through real estate agencies, online platforms like Yad2 or Facebook groups. The average rent for a 2-bedroom apartment ranges from ₪3,500-₪7,000 depending on the location. Popular areas in Tel Aviv include Florentin, Neve Tzedek, and North Tel Aviv. We can help connect you with trusted real estate partners.';
      } else if (text.toLowerCase().includes('expense') || text.toLowerCase().includes('cost')) {
        response = 'Typical relocation expenses include: visa fees (₪1,000-₪2,000), moving costs (₪10,000-₪30,000 for international shipping), housing deposits (typically 1-3 months rent), and initial setup costs (₪5,000-₪10,000 for basics). Our cost calculator can provide a personalized estimate.';
      } else if (text.toLowerCase().includes('healthcare') || text.toLowerCase().includes('medical')) {
        response = 'Israel has a universal healthcare system. As a resident, you\'ll need to join one of the health funds (Kupat Holim): Clalit, Maccabi, Meuhedet, or Leumit. They provide comprehensive medical coverage for a monthly fee based on your income. Private insurance options are also available.';
      } else if (text.toLowerCase().includes('school') || text.toLowerCase().includes('education') || text.toLowerCase().includes('children')) {
        response = 'Israel offers several schooling options including public schools (taught in Hebrew), international schools (English and other languages), and private schools. Registration typically opens in February-March for the following academic year. We can help you find suitable schools based on your location and children\'s educational needs.';
      } else {
        response = 'Thank you for your question. Our relocation experts would be happy to provide you with detailed information on this topic. Would you like to schedule a consultation call with one of our specialists?';
      }
      
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  return (
    <div className={`${inLightbox ? '' : 'fixed bottom-20 right-4 md:right-10 z-50'} w-full max-w-3xl mx-auto h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden ${!inLightbox && 'animate-fade-in'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="text-white" size={20} />
          <h3 className="text-white font-medium">Relocation Assistant</h3>
        </div>
        {!inLightbox && (
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close chatbot"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-3 rounded-lg ${
              message.type === 'user' 
                ? 'bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white' 
                : 'bg-white border border-gray-200 text-gray-800'
            }`}>
              {message.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Quick questions */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex gap-2 overflow-x-auto">
        {presetQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => handleSendMessage(question)}
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
          >
            {question}
          </button>
        ))}
      </div>
      
      {/* Input */}
      <div className="p-3 flex items-center gap-2 border-t border-gray-200">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C5AAE]"
        />
        <button
          onClick={() => handleSendMessage(input)}
          disabled={!input.trim()}
          className={`p-2 rounded-full ${
            input.trim() 
              ? 'bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white' 
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
