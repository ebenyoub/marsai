import { buttonVariant } from '@/components/utils/viariants';
import { cva } from 'class-variance-authority';
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
  icon: LucideIcon;
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

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof buttonVariant;
  icon?: React.ReactNode;
  position?: 'left' | 'right';
}

export const iconVariants = {
  default: 'bg-muted ring-border text-muted-foreground',
  purple: 'bg-primary/10 ring-primary/30 text-primary hover:bg-primary/20',
  green:
    'bg-emerald-500/10 ring-emerald-500/30 text-emerald-500 hover:bg-accent/20',
  blue: 'bg-blue-500/10 ring-blue-500/30 text-blue-500',
  gold: 'bg-amber-400/10 ring-amber-400/30 text-amber-400 hover:bg-amber-500/20',
};

export const cartVariants = {
  default: 'bg-card/20 border-primary/20',
  purple: 'border-primary/50 bg-primary/5 hover:border-primary',
  green: 'border-emerald-500/50 bg-emerald-500/5 hover:border-emerald-500',
  blue: 'border-blue-500/50 bg-blue-500/5 hover:border-blue-500',
  gold: 'border-amber-400/50 bg-amber-400/5 hover:border-amber-400',
};

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
