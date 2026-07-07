import { LucideIcon } from 'lucide-react';
import { iconVariants } from '@/utils/variants';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  required?: boolean;
  children: React.ReactNode;
}
export interface SelectProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}
export type Step = 1 | 2 | 3 | 4 | 5;
export type SubmissionStepData = Partial<FilmSubmissionData>;

export interface CollaboratorType {
  id: string;
  firstname: string;
  lastname: string;
  job: string;
  email: string;
  gender?: string;
  movie_id?: number;
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
  onNext: (stepData?: SubmissionStepData) => void;
}

export interface WizardStepProps {
  onNext: (stepData?: SubmissionStepData) => void;
  onBack: () => void;
}

export interface LastStepProps {
  onBack: () => void;
}

export interface FilmSubmissionData {
  // Director — clés alignées sur le state du stepper (StepRule.tsx)
  firstName: string;
  lastName: string;
  civility: string;
  birthDate: string;
  email: string;
  mobile: string;
  address: string;
  postCode: string;
  city: string;
  country: string;
  job: string;

  // Socials
  youtube: string;
  instagram: string;
  linkedin: string;
  facebook: string;
  twitter: string;

  // Misc
  source: string;
  newsletter: boolean;

  // Movie
  title: string;
  titleEn: string;
  synopsis: string;
  synopsisEn: string;
  duration: string;
  language: string;
  youtubeUrl: string;
  hasSubtitles: boolean;

  // IA
  techStack: string;
  methodology: string;
  deploymentType: string;
  aiClassification?: string; // clé réellement écrite par FormAi (deploymentType = valeur initiale du stepper)
  semanticTags: string[];

  // Files
  thumbnail: File | null;
  gallery: File[];
}
