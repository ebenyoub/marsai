import { LucideIcon } from 'lucide-react';
import { iconVariants } from '@/components/utils/variants';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  //extends lets us to inharite EVERYTHING that a normal HTML input has, such as onChange, required, aria- and className..
  label: string;
  error?: string;
}
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  required?: boolean;
  children: React.ReactNode;
  //extends lets us to inharite EVERYTHING that a normal HTML input has, such as onChange, required, aria- and className..
}
export interface SelectProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}
export type Step = 1 | 2 | 3 | 4 | 5;
export interface CollaboratorType {
  id: number;
  firstname: string;
  lastname: string;
  gender: string;
  job: string;
  email: string;
  role: string;
  movie_id: number;
}
export interface ProgressBarProps {
  progress: number;
  className?: string;
}
export interface IconBadgeProps {
  icon?: LucideIcon;
  variant?: keyof typeof iconVariants;
  className?: string;
}
interface Steps {
  number: number;
  title: string;
  icon: LucideIcon;
}

export interface StepperHeaderProps {
  steps: Steps[];
  currentStep: number;
  progress: number;
  variant?: keyof typeof iconVariants;
}

export interface FirstStepProps {
  onNext: (stepData?: any) => void; 
}

export interface WizardStepProps {
  onNext: (stepData?: any) => void;
  onBack: () => void;
}

export interface LastStepProps {
  onBack: () => void;
}