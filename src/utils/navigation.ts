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
  // External application mappings
  const externalAppMappings: Record<string, string> = {
    'My Ocean Community': 'https://chat.whatsapp.com/LODS9mJleJU9e1Y27ml2TB',
    'https://ocean-calculator.netlify.app': 'https://ocean-calculator.netlify.app',
    'https://ocean-pm.netlify.app': 'https://ocean-pm.netlify.app'
  };
  
  // For internal navigation - map to appropriate routes
  switch (url) {
    case 'news':
      navigate('/news');
      break;
    case 'destinations':
      navigate('/destinations');
      break;
    case 'services':
      navigate('/services');
      break;
    case 'chatbot':
      navigate('/chatbot');
      break;
    case 'time-currency':
      navigate('/time-currency');
      break;
    case 'Time, Currency & Weather':
      navigate('/time-currency');
      break;
    case 'Worldwide Time, Currency & Weather':
      navigate('/time-currency');
      break;
    case 'Cost-of-Living AI Calculator':
      navigate('/cost-calculator');
      break;
    case 'My Relocation Planner':
      navigate('/planner');
      break;
    case 'Relocation':
      navigate('/consult/relocation');
      break;
    case 'Education':
      navigate('/consult/education');
      break;
    case 'Real-Estate':
      navigate('/consult/real-estate');
      break;
    case 'My Ocean Community':
      navigate('/community');
      break;
    case 'community':
      navigate('/community');
      break;
    default:
      // Check if it's an external URL that needs to be opened in a new tab
      if (externalAppMappings[url] || forceExternal || url.startsWith('http')) {
        const externalUrl = externalAppMappings[url] || url;
        // For external URLs, use the lightbox approach
        navigate(`/?external=${encodeURIComponent(externalUrl)}`);
      } else {
        // Fall back to standard navigation
        navigate(url);
      }
      break;
  }
};
