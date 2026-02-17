import { CardProps } from '@/types/home';
import { cartVariants } from '../utils/variants';
import { cn } from './utils';


export function CardTitle() {
  return (
    <div>Card</div>
  )
}


export default function Card({ children, className, variant = 'default', ...props }: CardProps) {
  return (
    <div className={cn('rounded-2xl border', className, cartVariants[variant])} {...props}>
      {children}
    </div>
  );
}
