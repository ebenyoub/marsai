import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { ButtonVariant, CardTitleVariants, cartVariants, iconVariants } from '@/components/utils/variants';

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

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof cartVariants;
  icon?: LucideIcon;
  ref?: React.Ref<HTMLDivElement>;
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
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  position?: 'left' | 'right';
}

export type AITool = 'Image' | 'Sound' | 'Video' | 'Voice' | 'Script';

export interface FilmType {
  id: number;
  title: string;
  title_en: string | null; // "title_en" dans ta table SQL
  director_id: number;
  thumbnail: string;
  ia_type: '100% IA' | 'Hybride' | null;
  status: 'pending' | 'approved' | 'rejected';
  yt_url: string;
  duration: number | null;
  ai_tools: AITool[];
  countryName?: string;
  officialSelection?: boolean;
  created_at: string;
  updated_at: string;
}

export interface FilmWithDirector extends FilmType {
  director_firstname: string;
  director_lastname: string;
}
