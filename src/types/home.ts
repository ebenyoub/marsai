import { cartVariants } from '@/components/ui/Card';
import { iconVariants } from '@/components/ui/IconBadge';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  color: string;
  className?: string;
  variant?: keyof typeof iconVariants;
}

export interface ProgramCardProps {
  title: string;
  description: string;
  date: string;
  capacity: string;
  className?: string;
  icon:LucideIcon;
  variant?: keyof typeof cartVariants;
  iconVariant?: keyof typeof iconVariants;
}

export interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof cartVariants;
  icon?: LucideIcon;
}

export interface IconBadgeProps {
  icon: LucideIcon;
  variant?: keyof typeof iconVariants;
  className?: string;
}
