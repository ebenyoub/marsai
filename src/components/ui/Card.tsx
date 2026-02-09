import { CardProps, cartVariants } from '@/types/home';
import { cn } from './utils';

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
