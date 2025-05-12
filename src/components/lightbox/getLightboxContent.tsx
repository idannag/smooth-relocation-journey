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

// Define return type for content info
interface ContentInfo {
  title: string;
  subtitle: string;
  component: React.ReactNode;
}

export const getLightboxContent = (url: string, postId?: number | null): ContentInfo => {
  // If the URL is a number or postId is provided, it's a post ID
  if (/^\d+$/.test(url) || postId) {
    const id = postId || parseInt(url);
    return {
      title: 'Blog Post',
      subtitle: 'Reading article',
      component: <SinglePostContent postId={id} />
    };
  }

  // Otherwise, it's a path
  switch (url) {
    case 'news':
      return {
        title: 'Latest News',
        subtitle: 'Stay updated with our blog',
        component: <NewsContent />
      };
    case 'services':
      return {
        title: 'Our Services',
        subtitle: 'How we can help you',
        component: <ServicesContent />
      };
    case 'destinations':
      return {
        title: 'Popular Destinations',
        subtitle: 'Explore top relocation cities',
        component: <PopularDestinationsContent />
      };
    case 'time-currency':
      return {
        title: 'Time & Currency',
        subtitle: 'Global time zones and currency converter',
        component: <TimeAndCurrencyContent />
      };
    case 'chatbot':
      return {
        title: 'AI Assistant',
        subtitle: 'Get help from our AI assistant',
        component: <ChatbotContent />
      };
    case 'community':
      return {
        title: 'Ocean Community',
        subtitle: 'Connect with other expats',
        component: <CommunityContent />
      };
    case 'assistant':
      return {
        title: 'Relocation Assistant',
        subtitle: '24/7 personalized help',
        component: <AssistantContent />
      };
    default:
      // If it starts with http, it's an external URL
      if (url.startsWith('http')) {
        return {
          title: 'External Content',
          subtitle: '',
          component: <ExternalContent url={url} />
        };
      }
      
      // Default to news if not found
      return {
        title: 'Latest News',
        subtitle: 'Stay updated with our blog',
        component: <NewsContent />
      };
  }
};

export default getLightboxContent;
