import React from 'react';
import { cn } from './utils';

interface badgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof badgeVariants;
  icon?: React.ReactNode;
}

const badgeVariants = {
  green: 'bg-accent border-accent hover:bg-accent/80',
  dark: 'bg-background border border-primary/60',
  country: 'bg-background/80 text-secondary-foreground font-medium',
  text: '',
};

function Badge({ children, className, variant = 'dark', icon }: badgeProps) {
  return (
    <div
      className={cn(
        badgeVariants[variant],
        'flex w-fit items-center gap-1.5 rounded-sm px-1.5 py-0.5 text-xs font-semibold',
        className
      )}
    >
      {icon && icon}
      {children}
    </div>
  );
}

export default Badge;
