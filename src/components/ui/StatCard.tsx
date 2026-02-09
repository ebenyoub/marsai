import { StatCardProps } from '@/types/home';
import { cn } from './utils';
import IconBadge from './IconBadge';

export default function StatCard({
  icon: Icon,
  value,
  label,
  color,
  variant = 'default',
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center text-center space-y-4',
        className
      )}
    >
      <IconBadge icon={Icon} variant={variant} />
      <span className={cn('text-4xl md:text-3xl font-bold', color)}>
        {value}
      </span>
      <span className="text-muted-foreground font-medium text-lg">{label}</span>
    </div>
  );
}
