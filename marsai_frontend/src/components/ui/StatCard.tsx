import { StatCardProps } from '@/types/home';
import IconBadge from './IconBadge';
import { cn } from './utils';

export default function StatCard({ icon: Icon, value, label, color, variant = 'default', className }: StatCardProps) {
  return (
    <div className={cn('flex flex-col items-center space-y-4 text-center', className)}>
      <IconBadge icon={Icon} variant={variant} />
      <span className={cn('text-xl font-bold md:text-2xl', color)}>{value}</span>
      <span className="text-muted-foreground text-sm font-medium md:text-xl">{label}</span>
    </div>
  );
}
