import { StatCardProps } from '@/types/home';
import { cn } from './utils';

export default function StatCard({
  icon: Icon,
  value,
  label,
  color,
  bgColor,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center text-center space-y-4',
        className
      )}
    >
      <div className={cn('p-4 rounded-full mb-2 ', bgColor)}>
        <Icon className={cn('w-8 h-8', color)} />
      </div>
      <span className={cn('text-4xl md:text-3xl font-bold', color)}>
        {value}
      </span>
      <span className="text-muted-foreground font-medium text-lg">{label}</span>
    </div>
  );
}
