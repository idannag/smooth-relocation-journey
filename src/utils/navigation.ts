
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
    'https://preview--ocean-journey-61.lovable.app/': 'https://preview--ocean-journey-61.lovable.app/',
    'https://www.app.ocean-il.co.il/form/relocation-journey/9/': 'https://www.app.ocean-il.co.il/form/relocation-journey/9/',
    'https://www.app.ocean-il.co.il/education-copy/': 'https://www.app.ocean-il.co.il/education-copy/',
    'https://www.app.ocean-il.co.il/real-estate-copy/': 'https://www.app.ocean-il.co.il/real-estate-copy/',
    'https://chatgpt.com/g/g-67b6c40963908191b77e23c6fecc2e57-the-24-7-relocation-life-ai-assistant': 'https://chatgpt.com/g/g-67b6c40963908191b77e23c6fecc2e57-the-24-7-relocation-life-ai-assistant'
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
    default:
      // Check if it's an external URL that needs to be opened in a new tab
      if (externalAppMappings[url] || forceExternal || url.startsWith('http')) {
        const externalUrl = externalAppMappings[url] || url;
        window.open(externalUrl, '_blank');
      } else {
        // Fall back to standard navigation
        navigate(url);
      }
      break;
  }
};
