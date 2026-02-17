import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from './utils';

export interface PopupProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export default function Popup({ open, onClose, children, className }: PopupProps) {
  // prevent background scrolling when popup is open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={cn(
          'bg-background border-border animate-in fade-in zoom-in-95 relative w-full max-w-lg overflow-hidden rounded-xl border shadow-2xl duration-200',
          className
        )}
      >
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground absolute top-4 right-4 z-10 p-2 transition-colors"
        >
          <X size={20} />
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
