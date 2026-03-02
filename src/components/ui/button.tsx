import { ButtonProps } from '@/types/home';
import { buttonVariants } from '../utils/variants';
import { cn } from './utils';

const Button = ({ children, className, variant = 'default', icon, position = 'left', ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'z-10 flex h-fit w-fit cursor-pointer items-center gap-3 rounded-md px-2.5 py-1.5 text-nowrap transition active:scale-98',
        buttonVariants[variant],
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
