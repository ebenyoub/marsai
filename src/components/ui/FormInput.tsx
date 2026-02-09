import { FormInputProps } from '@/types/form';

export default function FormInput({
  label,
  error,
  className,
  required,
  ...props
}: FormInputProps) {
    return(
        <div>
            <label htmlFor="">{label}</label>
        </div>
    )
}
