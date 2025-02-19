
import { LucideIcon } from 'lucide-react';

export interface SubMenuItem {
  icon: JSX.Element;
  label: string;
  onClick?: () => void;
}

export interface NavItem {
  icon: JSX.Element;
  label: string;
  subItems: SubMenuItem[];
}
