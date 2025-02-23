import { Home, Calculator, Newspaper, Building2, GraduationCap, UserRound, ShoppingCart, Route, Bot, BookText, Headphones, Globe, Play } from "lucide-react";
import { NavItem } from "@/types/navigation";

export const getMainNavItems = (handleSubmenuItemClick: (url: string, type: 'news' | 'guides' | 'tools') => void): NavItem[] => [
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
        onClick: () => handleSubmenuItemClick('/useful-info/news', 'news')
      },
      { 
        icon: <BookText className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, 
        label: 'Relocation Guides',
        onClick: () => handleSubmenuItemClick('/useful-info/guides', 'guides')
      },
      { 
        icon: <Calculator className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
        label: 'Calculators & Tools',
        onClick: () => handleSubmenuItemClick('/useful-info/tools', 'tools')
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
        onClick: () => handleSubmenuItemClick('https://www.app.ocean-il.co.il/form/relocation-journey/9/', 'news')
      },
      { 
        icon: <GraduationCap className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, 
        label: 'Education',
        onClick: () => handleSubmenuItemClick('https://www.app.ocean-il.co.il/education-copy/', 'news')
      },
      { 
        icon: <Building2 className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
        label: 'Real-Estate',
        onClick: () => handleSubmenuItemClick('https://www.app.ocean-il.co.il/real-estate-copy/', 'news')
      }
    ]
  },
  { 
    icon: <UserRound className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
    label: 'Client Area',
    subItems: [
      { 
        icon: <Route className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
        label: 'My Relocation',
        onClick: () => handleSubmenuItemClick('https://preview--ocean-journey-61.lovable.app/', 'news')
      },
      { icon: <ShoppingCart className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'My Orders', onClick: () => handleSubmenuItemClick('', 'news') },
      { icon: <Globe className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Online Jobs', onClick: () => handleSubmenuItemClick('', 'news') },
      { icon: <UserRound className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Connections', onClick: () => handleSubmenuItemClick('', 'news') },
      { icon: <Bot className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'My AI Assistant 24/7', onClick: () => handleSubmenuItemClick('', 'news') },
      { icon: <Play className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Relocation VOD', onClick: () => handleSubmenuItemClick('', 'news') }
    ]
  }
];
