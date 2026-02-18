import { useState } from 'react';
import { ZodType } from 'zod';

type Errors<T> = Partial<Record<keyof T, string>>;
type FormValue = string | number | boolean | null;

const useForm = <T extends Record<string, FormValue>>(initialValues: T, schema?: ZodType<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value, type, checked } = event.target as HTMLInputElement;

    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const validate = (): boolean => {
    if (!schema) return true;

    const result = schema.safeParse(values);

    if (result.success) {
      setErrors({});
      return true;
    }

    const simplifiedErrors: Errors<T> = {};

    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof T | undefined;

      // Only set the first error per field
      if (field && !simplifiedErrors[field]) {
        simplifiedErrors[field] = issue.message;
      }
    }

    setErrors(simplifiedErrors);
    return false;
  };

  const handleSubmit = (onSubmit: (values: T) => void) => (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
