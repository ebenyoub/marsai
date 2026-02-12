import React from 'react'
import { cn } from './utils'


const badgeVariants = {
      green: 'bg-accent border-accent hover:bg-accent/80',

}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div 
            className={cn(
                badgeVariants.green,
                'w-fit rounded-full px-6',
                className
            )}
        >
            {children}
        </div>
    )
}

export default Badge