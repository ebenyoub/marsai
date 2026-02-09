import { cn } from './utils';
import { buttonVariant } from '../utils/viariants';
import { ButtonProps } from '@/types/home';

const Button = ({
  children,
  className,
  variant = 'default',
  icon,
  position = 'left',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        buttonVariant[variant],
        'w-full md:w-fit flex items-center gap-3 rounded-md px-2 py-1 z-10 transition',
        className
      )}
      {...props}
    >
      {position === 'left' && icon}
      {children}
      {position === 'right' && icon}
    </button>
  );
};

export default Button;
