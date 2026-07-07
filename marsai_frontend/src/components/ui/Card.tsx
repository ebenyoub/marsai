import { CardProps, DescribeProps } from '@/types/home';
import { TitleProps } from '@/types/home';
import { cartVariants } from '../../utils/variants';
import { CardTitleVariants } from '../../utils/variants';
import { cn } from './utils';

const CardHeader = ({ className, children }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('flex flex-col p-3', className)}>{children}</div>;
};

const CardContent = ({ className, children }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('flex flex-col p-3', className)}>{children}</div>;
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

const Card: React.FC<CardProps> = ({ children, className, variant = 'default', ref, ...props }: CardProps) => {
  return (
    <div ref={ref} className={cn('rounded-2xl border', className, cartVariants[variant])} {...props}>
      {children}
    </div>
  );
};

Card.displayName = 'Card';

export { Card, CardTitle, CardDescription, CardHeader, CardContent };
