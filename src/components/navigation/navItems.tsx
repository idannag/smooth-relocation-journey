
import { Home, Calculator, Newspaper, Building2, GraduationCap, UserRound, ShoppingCart, Route, Bot, BookText, Headphones, Globe, Play } from "lucide-react";
import { NavItem } from "@/types/navigation";

export const getMainNavItems = (handleSubmenuItemClick: (url: string) => void): NavItem[] => [
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
        icon: <BookText className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, 
        label: 'Relocation Guides',
        onClick: () => handleSubmenuItemClick('guides')
      },
      { 
        icon: <Calculator className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
        label: 'Cost of Living Calculator',
        onClick: () => handleSubmenuItemClick('https://www.app.ocean-il.co.il/cost-of-living-comparison-calculator-copy/')
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
        label: 'My Relocation',
        onClick: () => handleSubmenuItemClick('https://preview--ocean-journey-61.lovable.app/')
      },
      { 
        icon: <ShoppingCart className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, 
        label: 'My Services & Orders',
        onClick: () => handleSubmenuItemClick('orders')
      },
      { 
        icon: <UserRound className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, 
        label: 'My Ocean Community',
        onClick: () => handleSubmenuItemClick('My Ocean Community')
      },
      { 
        icon: <Bot className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
        label: 'My 24/7 Assistant',
        onClick: () => {
          console.log("AI Assistant clicked from navItems");
          handleSubmenuItemClick('chatbot');
        }
      }
    ]
  }
];
