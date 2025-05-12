import { Home, Calculator, Newspaper, Building2, GraduationCap, UserRound, Route, Bot, Headphones, Globe, Play, ShoppingCart, MapPin, Info, Briefcase, Map, MessageCircle, Clock } from "lucide-react";
import { NavItem } from "@/types/navigation";

export const getMainNavItems = (
  onItemClick: (url: string, forceExternal?: boolean) => void
): NavItem[] => {
  return [
    {
      label: "Info",
      icon: <Info size={16} />,
      children: [
        {
          label: "News & Blog",
          description: "Relocation news and insights",
          icon: <Newspaper size={16} />,
          onClick: () => onItemClick('news')
        },
        {
          label: "Services",
          description: "Our relocation services",
          icon: <Briefcase size={16} />,
          onClick: () => onItemClick('services')
        },
        {
          label: "Popular Destinations",
          description: "Explore top destination cities",
          icon: <Map size={16} />,
          onClick: () => onItemClick('destinations')
        }
      ]
    },
    {
      label: "Client Area",
      icon: <UserCircle size={16} />,
      children: [
        {
          label: "Live Chat Assistant",
          description: "Talk to our AI relocation assistant",
          icon: <MessageCircle size={16} />,
          onClick: () => onItemClick('assistant')
        },
        {
          label: "Chatbot",
          description: "Access our AI assistant in ChatGPT",
          icon: <Bot size={16} />,
          onClick: () => onItemClick('chatbot')
        },
        {
          label: "World Clock & Currency",
          description: "Time and currency converter",
          icon: <Clock size={16} />,
          onClick: () => onItemClick('time-currency')
        }
      ]
    },
    { 
      icon: <Home className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
      label: 'Home',
      subItems: [] 
    },
    { 
      icon: <Calculator className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
      label: 'Useful Info',
      subItems: [
        { 
          icon: <Newspaper className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
          label: 'Relocation News',
          onClick: () => onItemClick('/news')
        },
        { 
          icon: <MapPin className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
          label: 'Popular Destinations',
          onClick: () => onItemClick('/destinations')
        },
        { 
          icon: <Globe className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, 
          label: 'Time, Currency & Weather',
          onClick: () => onItemClick('time-currency')
        },
        { 
          icon: <Calculator className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, 
          label: 'Cost-of-Living AI Calculator',
          onClick: () => onItemClick('https://ocean-calculator.netlify.app', true)
        }
      ]
    },
    { 
      icon: <Headphones className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
      label: 'Consult',
      subItems: [
        { 
          icon: <Home className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
          label: 'Relocation',
          onClick: () => onItemClick('https://www.app.ocean-il.co.il/form/relocation-journey/9/', true)
        },
        { 
          icon: <GraduationCap className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, 
          label: 'Education',
          onClick: () => onItemClick('https://www.app.ocean-il.co.il/education-copy/', true)
        },
        { 
          icon: <Building2 className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
          label: 'Real-Estate',
          onClick: () => onItemClick('https://www.app.ocean-il.co.il/real-estate-copy/', true)
        }
      ]
    },
    { 
      icon: <UserRound className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
      label: 'Client Area',
      subItems: [
        { 
          icon: <Route className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
          label: 'My Relocation Planner',
          onClick: () => onItemClick('https://www.app.ocean-il.co.il/pm', true)
        },
        { 
          icon: <ShoppingCart className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, 
          label: 'My Services',
          onClick: () => onItemClick('/services')
        },
        { 
          icon: <UserRound className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, 
          label: 'My Ocean Community',
          onClick: () => onItemClick('/community')
        },
        { 
          icon: <Bot className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
          label: 'My 24/7 AI Assistant',
          onClick: () => onItemClick('chatbot')
        }
      ]
    }
  ];
};
