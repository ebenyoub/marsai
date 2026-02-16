import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { buttonVariant, cartVariants, iconVariants } from '@/components/utils/viariants';

// *** CARD ***

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
  icon: LucideIcon;
  variant?: keyof typeof cartVariants;
  iconVariant?: keyof typeof iconVariants;
}

export interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof cartVariants;
  icon?: LucideIcon;
  onClick?: (event: React.MouseEvent) => void;
}

export interface IconBadgeProps {
  icon: LucideIcon;
  variant?: keyof typeof iconVariants;
  className?: string;
}

// *** BUTTON ***

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof buttonVariant;
  icon?: React.ReactNode;
  position?: 'left' | 'right';
}
