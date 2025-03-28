
import { Home, Calculator, Newspaper, Building2, GraduationCap, UserRound, Route, Bot, Headphones, Globe, Play, ShoppingCart, MapPin } from "lucide-react";
import { NavItem } from "@/types/navigation";

export const getMainNavItems = (handleSubmenuItemClick: (url: string, forceExternal?: boolean) => void): NavItem[] => [
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
        onClick: () => handleSubmenuItemClick('news')
      },
      { 
        icon: <MapPin className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
        label: 'Popular Destinations',
        onClick: () => handleSubmenuItemClick('destinations')
      },
      { 
        icon: <Calculator className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, 
        label: 'Cost-of-Living AI Calculator',
        onClick: () => handleSubmenuItemClick('https://ocean-calculator.netlify.app')
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
        onClick: () => handleSubmenuItemClick('https://www.app.ocean-il.co.il/form/relocation-journey/9/')
      },
      { 
        icon: <GraduationCap className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, 
        label: 'Education',
        onClick: () => handleSubmenuItemClick('https://www.app.ocean-il.co.il/education-copy/')
      },
      { 
        icon: <Building2 className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
        label: 'Real-Estate',
        onClick: () => handleSubmenuItemClick('https://www.app.ocean-il.co.il/real-estate-copy/')
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
        onClick: () => handleSubmenuItemClick('https://ocean-pm.netlify.app')
      },
      { 
        icon: <ShoppingCart className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, 
        label: 'My Services',
        onClick: () => handleSubmenuItemClick('services')
      },
      { 
        icon: <UserRound className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, 
        label: 'My Ocean Community',
        onClick: () => handleSubmenuItemClick('My Ocean Community', true)
      },
      { 
        icon: <Bot className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
        label: 'My 24/7 AI Assistant',
        onClick: () => handleSubmenuItemClick('https://chatgpt.com/g/g-67b6c40963908191b77e23c6fecc2e57-the-24-7-relocation-life-ai-assistant', true)
      }
    ]
  }
];
