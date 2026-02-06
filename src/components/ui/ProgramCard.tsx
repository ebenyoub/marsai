import { ProgramCardProps } from '@/types/home';
import { cn } from './utils';
import Card from './Card';
import IconBadge from './IconBadge';

export default function ProgramCard({
  title,
  description,
  date,
  capasity,
  variant = "default",
  icon: Icon,
  iconVariant = "default",
  className,
}: ProgramCardProps) {
  return (
    <Card
      className={cn(
        'flex flex-col items-center text-center space-y-4',
        className
      )}
      variant={variant}
    >
      <IconBadge icon={Icon} variant={variant} />
      <span className={cn('text-m md:text-l font-semibold')}>{title}</span>
      <span className="text-muted-foreground font-medium text-lg">
        {description}
      </span>
    </Card>
  );
}
