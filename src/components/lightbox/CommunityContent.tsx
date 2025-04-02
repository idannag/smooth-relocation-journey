
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/LODS9mJleJU9e1Y27ml2TB";

const CommunityContent = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent mb-6">
          Welcome to the Ocean Relocation WhatsApp Group!🌍✨
        </h1>
        
        <p className="text-gray-700 mb-6 text-lg">
          We're here to simplify your relocation journey with expert 360° guidance at every step for a tailored and better experience. 💼🏠
        </p>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
          <p className="text-gray-700 mb-2 font-medium">
            👥 Share this link with other Ocean clients:
          </p>
          <p className="text-gray-700 mb-3">
            Join the Ocean Relocation WhatsApp Group:
          </p>
          <p className="text-blue-600 font-medium break-all">
            {WHATSAPP_GROUP_URL}
          </p>
        </div>
        
        <p className="text-gray-700 mb-8 text-lg">
          Let's keep open communication, share tips, and answer questions together! 🤝✨
        </p>
        
        <Button 
          onClick={() => window.open(WHATSAPP_GROUP_URL, '_blank')}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-lg font-medium text-lg transition-colors flex items-center mx-auto"
        >
          Join WhatsApp Group <ExternalLink className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default CommunityContent;
