import { ButtonProps } from '@/types/home';
import { buttonVariant } from '../utils/viariants';
import { cn } from './utils';

const Button = ({ children, className, variant = 'default', icon, position = 'left', ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'z-10 flex w-full items-center gap-3 rounded-md px-2 py-1 text-nowrap transition md:w-fit',
        buttonVariant[variant],
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
