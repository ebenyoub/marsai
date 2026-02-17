import  { ProgressBarProps } from '@/types/form'
export default function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  return (
    <div className={`w-full h-2 bg-muted rounded overflow-hidden ${className}`}>
      <div
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

