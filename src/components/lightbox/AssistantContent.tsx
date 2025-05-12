
import React from 'react';
import RelocationAssistant from '../chat/RelocationAssistant';

const AssistantContent = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
          Your Personal Relocation Assistant
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Get instant help with your relocation questions, 24/7
        </p>
        
        <div className="max-w-2xl mx-auto">
          <RelocationAssistant />
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p className="text-center">
            This chat interface connects to our AI-powered assistant specialized in relocation services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssistantContent;
