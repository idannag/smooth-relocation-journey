
import { LucideIcon } from 'lucide-react';

export interface SubMenuItem {
  icon: JSX.Element;
  label: string;
  description?: string; // Added description property
  onClick?: () => void;
  forceExternal?: boolean;
}

export interface NavItem {
  icon: JSX.Element;
  label: string;
  subItems: SubMenuItem[];
  children?: SubMenuItem[]; // Support for the children property
}
