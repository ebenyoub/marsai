export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement>{ //extends lets us to inharite EVERYTHING that a normal HTML input has, such as onChange, required, aria- and className..
    label: string;
    error?: string;
}