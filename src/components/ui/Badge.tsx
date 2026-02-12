import React from 'react'
import { cn } from './utils'

interface badgeProps {
  children: React.ReactNode,
  className?: string,
  variant?: keyof typeof badgeVariants;
}

const badgeVariants = {
      green: 'bg-accent border-accent hover:bg-accent/80',
      dark: 'bg-background border border-primary/60',
      country: 'bg-background/80 text-secondary-foreground font-medium',
}

function Badge({ children, className, variant = 'dark' }: badgeProps) {
    return (
        <div 
            className={cn(
                badgeVariants[variant],
                'w-fit rounded-sm px-1.5 text-xs py-0.5 font-semibold',
                className
            )}
        >
            {children}
        </div>
    )
}

export default Badge