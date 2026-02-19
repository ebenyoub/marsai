import { CardProps, DescribeProps } from '@/types/home';
import { TitleProps } from '@/types/home';
import { cartVariants } from '../utils/variants';
import { CardTitleVariants } from '../utils/variants';
import { cn } from './utils';

const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col p-3">{children}</div>;
};

const CardDescription = ({ children, className }: DescribeProps) => {
  return <p className={cn('text-3 text-muted-foreground', className)}>{children}</p>;
};

const CardTitle = ({ children, className, variant = 'default', icon }: TitleProps) => {
  return (
    <h2
      className={cn(
        CardTitleVariants[variant],
        'font-inter flex items-center gap-3 font-bold tracking-tight',
        className
      )}
    >
      {icon && icon}
      {children}
    </h2>
  );
};

function Card({ children, className, variant = 'default', ...props }: CardProps) {
  return (
    <div className={cn('rounded-2xl border', className, cartVariants[variant])} {...props}>
      {children}
    </div>
  );
}

export { Card, CardTitle, CardDescription, CardHeader };
