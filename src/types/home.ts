import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { CardTitleVariants, buttonVariant, cartVariants, iconVariants } from '@/components/utils/variants';

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

export interface DescribeProps {
  children: React.ReactNode;
  className?: string;
}

export interface TitleProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  variant?: keyof typeof CardTitleVariants;
}

export interface IconBadgeProps {
  icon?: LucideIcon;
  variant?: keyof typeof iconVariants;
  className?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof buttonVariant;
  icon?: React.ReactNode;
  position?: 'left' | 'right';
}

export type AITool = 'Image' | 'Sound' | 'Video' | 'Voice' | 'Script';

export interface FilmType {
  id: number;
  title: string;
  titleEn: string;
  director: string;
  country: string;
  countryName: string;
  thumbnail: string;
  aiTools: string[];
  category: string;
  officialSelection: boolean;
  youtubeUrl: string;
}
