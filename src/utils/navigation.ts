
import { NavigateFunction } from 'react-router-dom';

/**
 * Handles navigation to either internal routes or external URLs
 * 
 * @param url The URL or path to navigate to
 * @param navigate The navigate function from react-router-dom
 * @param forceExternal Whether to force the URL to be treated as external
 */
export const handleNavigation = (
  url: string,
  navigate: NavigateFunction,
  forceExternal: boolean = false
): void => {
  // Handle special case for the community link
  if (url === 'My Ocean Community' || forceExternal) {
    window.open('https://chat.whatsapp.com/LODS9mJleJU9e1Y27ml2TB', '_blank');
    return;
  }
  
  // Check if the URL is external
  if (url.startsWith('http')) {
    window.open(url, '_blank');
    return;
  }
  
  // For internal navigation
  navigate(url);
};
