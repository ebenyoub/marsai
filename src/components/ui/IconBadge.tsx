import { IconBadgeProps, iconVariants } from '@/types/home';
import { cn } from './utils';

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
