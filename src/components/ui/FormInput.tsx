import { FormInputProps } from '@/types/form';

export default function FormInput({
  label,
  error,
  className,
  required,
  ...props
}: FormInputProps) {
    return(
        <div className='flex flex-col  gap-2 w-full'>
            <label className='text-sm text-white font-medium flex items-center'>{label}</label>
        </div>
    )
}
