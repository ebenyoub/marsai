import { IconBadgeProps } from '@/types/home';
import { cn } from './utils';

export const iconVariants = {
  default: 'bg-muted ring-border text-muted-foreground',
  purple: 'bg-primary/10 ring-primary/30 text-primary hover:bg-primary/20',
  green:
    'bg-emerald-500/10 ring-emerald-500/30 text-emerald-500 hover:bg-accent/20',
  blue: 'bg-blue-500/10 ring-blue-500/30 text-blue-500',
  gold: 'bg-amber-400/10 ring-amber-400/30 text-amber-400 hover:bg-amber-500/20',
};

export default function IconBadge({
  icon: Icon,
  variant = 'default',
  className,
}: IconBadgeProps) {
  return (
    <div
      className={cn('p-4 rounded-full mb-2 ', className, iconVariants[variant])}
    >
      <Icon className={cn('w-8 h-8')} />
    </div>
  );
}
