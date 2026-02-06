import { CardProps } from '@/types/home';
import { cn } from './utils';

export const cartVariants = {
  default: 'bg-card border-primary/50 p-3 hover:bg-card/10',
  purple: 'border-primary/50 bg-primary/5 hover:border-primary',
  green: 'border-emerald-500/50 bg-emerald-500/5 hover:border-emerald-500',
  blue: 'border-blue-500/50 bg-blue-500/5 hover:border-blue-500',
  gold: 'border-amber-400/50 bg-amber-400/5 hover:border-amber-400',
};

export default function Card({
  children,
  className,
  variant = 'default',
  ...props
}: CardProps) {
  return (
    <div
      className={cn('border rounded-2xl ', className, cartVariants[variant])}
      {...props}
    >
      {children}
    </div>
  );
}
