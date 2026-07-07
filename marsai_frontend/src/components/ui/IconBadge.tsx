import { IconBadgeProps } from '@/types/home';
import { iconVariants } from '../../utils/variants';
import { cn } from './utils';

export default function IconBadge({ icon: Icon, variant = 'default', className }: IconBadgeProps) {
  return (
    <div className={cn('mb-2 rounded-full p-4', className, iconVariants[variant])}>
      {Icon && <Icon className={cn('h-8 w-8')} />}
    </div>
  );
}
