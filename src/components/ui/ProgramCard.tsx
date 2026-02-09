import { ProgramCardProps } from '@/types/home';
import { cn } from './utils';
import Card from './Card';
import IconBadge from './IconBadge';
import { Calendar, Users } from 'lucide-react';

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
  const activeIconVariant = iconVariant || variant;
  return (
    <Card
      className={cn(
        'flex flex-col items-center text-center p-4 h-full ',
        className
      )}
      variant={variant}
    >
      <IconBadge icon={Icon} variant={activeIconVariant} />
      <h3 className="font-bold mt-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-6">{description}</p>

      <div className="w-full flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground ">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-3 h-3" />
          <span>{capacity}</span>
        </div>
      </div>
    </Card>
  );
}
