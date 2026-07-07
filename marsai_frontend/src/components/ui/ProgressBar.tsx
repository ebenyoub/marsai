import { ProgressBarProps } from '@/types/form';

export default function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  return (
    <div className={`bg-muted h-2 w-full overflow-hidden rounded ${className}`}>
      <div className="bg-primary h-full transition-all duration-300" style={{ width: `${progress}%` }} />
    </div>
  );
}
