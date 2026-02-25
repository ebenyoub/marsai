import { LabelProps } from '@/types/form';
import { cn } from './utils';

export function FormGroup({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('flex w-full flex-col gap-2', className)}>{children}</div>;
}

export function Label({ className, required, children, ...props }: LabelProps) {
  return (
    <label htmlFor={props.htmlFor} className={cn('flex gap-2 text-sm font-medium md:text-base', className)} {...props}>
      {children}
      {required && <span className="text-primary">*</span>}
    </label>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'border-primary/30 bg-muted focus:ring-primary/40 w-full rounded-md border px-3 py-2 transition-all duration-200 focus:ring-2 focus:outline-none disabled:opacity-50 md:py-1.5',
        className
      )}
      {...props}
    />
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <textarea
      className={cn(
        'border-primary/30 bg-muted focus:ring-primary/40 min-h-30 w-full rounded-md border px-3 py-2 transition-all duration-200 focus:ring-2 focus:outline-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Form({ children, className, ...props }: FormProps) {
  return (
    <form
      className={cn(
        'bg-muted/20 ring-primary/30 m-auto mt-6 flex w-full flex-col rounded-2xl border p-4 md:p-6',
        className
      )}
      {...props}
    >
      {children}
    </form>
  );
}

interface ErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

export function ErrorParagraph({ children, className, ...props }: ErrorProps) {
  return (
    <p className={cn('mt-1 text-xs font-medium text-red-500', className)} {...props}>
      {children}
    </p>
  );
}
