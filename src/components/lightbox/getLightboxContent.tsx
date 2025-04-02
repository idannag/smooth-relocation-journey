
import React from 'react';
import NewsContent from './NewsContent';
import ServicesContent from './ServicesContent';
import ChatbotContent from './ChatbotContent';
import TimeAndCurrencyContent from './TimeAndCurrencyContent';
import PopularDestinationsContent from './PopularDestinationsContent';
import SinglePostContent from './SinglePostContent';
import ExternalContent from './ExternalContent';

export interface LightboxContentInfo {
  title: string;
  subtitle: string;
  component: React.ReactNode;
}

export const getLightboxContent = (url: string, postId: number | null): LightboxContentInfo => {
  // News content
  if (url === 'news') {
    return {
      title: 'Relocation News',
      subtitle: 'Latest information',
      component: <NewsContent />
    };
  }
  
  // Services content
  if (url === 'services') {
    return {
      title: 'My Services',
      subtitle: 'Relocation assistance',
      component: <ServicesContent />
    };
  }
  
  // Chatbot content
  if (url === 'chatbot') {
    return {
      title: 'My 24/7 AI Assistant',
      subtitle: 'Get instant answers',
      component: <ChatbotContent />
    };
  }
  
  // Time and currency content
  if (url === 'time-currency') {
    return {
      title: 'World Time & Currency',
      subtitle: 'Global info',
      component: <TimeAndCurrencyContent />
    };
  }
  
  // Popular destinations content
  if (url === 'destinations') {
    return {
      title: 'Popular Destinations',
      subtitle: 'Explore locations',
      component: <PopularDestinationsContent />
    };
  }
  
  // Specific destination content
  if (url.startsWith('destination:')) {
    const cityName = url.split(':')[1];
    return {
      title: cityName,
      subtitle: 'Destination details',
      component: <PopularDestinationsContent initialCity={cityName} />
    };
  }
  
  // Single post content
  if (url.startsWith('post:') && postId) {
    return {
      title: 'Article',
      subtitle: 'Detailed information',
      component: <SinglePostContent postId={postId} />
    };
  }
  
  // External content (iframe) - removed the title
  if (url.startsWith('http')) {
    return {
      title: '',
      subtitle: '',
      component: <ExternalContent url={url} />
    };
  }
  
  // Default fallback
  return {
    title: 'Content',
    subtitle: '',
    component: <div className="p-4">No content available</div>
  };
};
