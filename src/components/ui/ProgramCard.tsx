import { Calendar, Users } from 'lucide-react';
import { ProgramCardProps } from '@/types/home';
import { Card } from './Card';
import IconBadge from './IconBadge';
import { cn } from './utils';

export default function ProgramCard({
  title,
  description,
  date,
  capacity,
  variant = 'default',
  iconVariant,
  icon: Icon,
  className,
}: ProgramCardProps) {
  const baseVariant = variant === 'time_green' ? 'green' : variant === 'time_purple' ? 'purple' : variant;
  const activeIconVariant = iconVariant || baseVariant;

  return (
    <Card className={cn('flex h-full flex-col items-center p-4 text-center', className)} variant={variant}>
      <IconBadge icon={Icon} variant={activeIconVariant} />
      <h3 className="mt-2 font-bold">{title}</h3>
      <p className="text-muted-foreground mb-6 text-sm">{description}</p>

      <div className="text-muted-foreground flex w-full flex-col items-center justify-center gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3 w-3" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="h-3 w-3" />
          <span>{capacity}</span>
        </div>
      </div>
    </Card>
  );
}
