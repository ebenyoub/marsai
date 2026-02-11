import { LabelProps } from '@/types/form';
import { cn } from './utils';

export function FormGroup({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('flex flex-col gap-2', className)}>{children}</div>;
}

export function Label({ className, required, children, ...props }: LabelProps) {
  return (
    <label htmlFor={props.htmlFor} className={cn('flex gap-2', className)} {...props}>
      {children}
      {required && <span className="text-primary">*</span>}
    </label>
  );
}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className, ...props }: InputProps) {
  return <input className={cn('border-primary/50 bg-muted rounded-md border px-3 py-1.5', className)} {...props} />;
}

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Form({ children, className, ...props }: FormProps) {
  return (
    <form
      className={cn('bg-primary/5 ring-primary/30 m-auto mt-6 flex flex-col rounded-2xl border p-4', className)}
      {...props}
    >
      {children}
    </form>
  );
}
