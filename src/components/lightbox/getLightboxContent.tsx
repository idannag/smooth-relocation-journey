import React from 'react';
import NewsContent from './NewsContent';
import ServicesContent from './ServicesContent';
import PopularDestinationsContent from './PopularDestinationsContent';
import ExternalContent from './ExternalContent';
import SinglePostContent from './SinglePostContent';
import TimeAndCurrencyContent from './TimeAndCurrencyContent';
import ChatbotContent from './ChatbotContent';
import CommunityContent from './CommunityContent';
import AssistantContent from './AssistantContent';

const getLightboxContent = (url: string) => {
  // If the URL is a number, it's a post ID
  if (/^\d+$/.test(url)) {
    return <SinglePostContent postId={parseInt(url)} />;
  }

  // Otherwise, it's a path
  switch (url) {
    case 'news':
      return <NewsContent />;
    case 'services':
      return <ServicesContent />;
    case 'destinations':
      return <PopularDestinationsContent />;
    case 'time-currency':
      return <TimeAndCurrencyContent />;
    case 'chatbot':
      return <ChatbotContent />;
    case 'community':
      return <CommunityContent />;
    case 'assistant':
      return <AssistantContent />;
    default:
      // If it starts with http, it's an external URL
      if (url.startsWith('http')) {
        return <ExternalContent url={url} />;
      }
      
      // Default to news if not found
      return <NewsContent />;
  }
};

export default getLightboxContent;
