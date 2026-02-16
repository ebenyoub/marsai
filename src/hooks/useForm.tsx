import { useState } from 'react';

const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    const finalValue =
      type === 'checkbox' ? (event.target as HTMLInputElement).checked : type === 'number' ? Number(value) : value;
    setValues(prevalue => {
      return {
        ...prevalue,
        [name]: finalValue,
      };
    });
  };

  const handleSubmit = (callbackFunction: (values: T) => void) => {
    return (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        callbackFunction(values)
    }
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
