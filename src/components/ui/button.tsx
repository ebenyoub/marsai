import { button } from 'motion/react-client';
import React from 'react';
import { cn } from './utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof buttonVariant;
  icon?: React.ReactNode;
  position?: 'left' | 'right';
  isActive?: boolean;
}

const buttonVariant = {
  default: 'border border-white hover:bg-white/30',
  purple: 'bg-primary shadow-md shadow-primary',
  connexion:
    'bg-background border border-accent text-accent hover:text-foreground hover:bg-background/60 ',
  green: 'bg-accent border-accent hover:bg-accent/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
  link: 'text-primary underline-offset-4 hover:underline',
  active: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
};

const Button = ({
  children,
  className,
  variant = 'default',
  icon,
  position = 'left',
  isActive = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        buttonVariant[variant],
        'w-full md:w-fit flex items-center gap-3 rounded-md px-2 py-1 z-10 transition',
        className
      )}
      {...props}
    >
      {position === 'left' && icon}
      {children}
      {position === 'right' && icon}
    </button>
  );
};

export default Button;
