import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';
import Button from './button';
import { cn } from './utils';

const DropdownContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValue?: string;
  setSelectedValue: (val: string) => void;
} | null>(null);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('useDropdown must be used within DropdownMenu');
  return context;
};

export const DropdownMenu = ({ children, defaultValue }: { children: ReactNode; defaultValue?: string }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen, selectedValue, setSelectedValue }}>
      <div ref={containerRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownTrigger = ({ children, className }: { children: ReactNode; className?: string }) => {
  const { open, setOpen } = useDropdown();
  return (
    <Button
      onClick={() => setOpen(!open)}
      variant="dropdown"
      className={cn('justify-between gap-2', className)}
      aria-expanded={open}
    >
      {children}
      <svg
        className={cn('h-4 w-4 transition-transform', open && 'rotate-180')}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </Button>
  );
};

export const DropdownContent = ({ children, className }: { children: ReactNode; className?: string }) => {
  const { open } = useDropdown();

  if (!open) return null;

  return (
    <div
      className={cn(
        'bg-card border-border absolute right-0 z-50 w-48 overflow-hidden rounded-lg rounded-t-none border shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
};

export const DropdownItem = ({
  value,
  children,
  onClick,
}: {
  value: string;
  children: ReactNode;
  onClick?: () => void;
}) => {
  const { setSelectedValue, setOpen, selectedValue } = useDropdown();
  const isActive = selectedValue === value;

  const handleClick = () => {
    if (onClick) onClick();
    setSelectedValue(value);
    setOpen(false);
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(
        'hover:bg-secondary flex w-full rounded-none border-none px-3 py-2 text-sm transition-colors',
        isActive ? 'bg-card text-primary font-medium' : 'text-foreground'
      )}
    >
      {children}
    </Button>
  );
};
