import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Sparkles, Upload, User, Users } from 'lucide-react';
import { FilmSubmissionData, Step, SubmissionStepData } from '@/types/form';

const initialFormData: FilmSubmissionData = {
  civility: 'M.',
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  mobile: '',
  address: '',
  postCode: '',
  city: '',
  country: '',
  job: '',
  youtube: '',
  instagram: '',
  linkedin: '',
  facebook: '',
  twitter: '',
  source: '',
  newsletter: false,
  title: '',
  titleEn: '',
  duration: '',
  language: '',
  semanticTags: [],
  synopsis: '',
  synopsisEn: '',
  deploymentType: '100',
  techStack: '',
  methodology: '',
  youtubeUrl: '',
  hasSubtitles: false,
  thumbnail: null,
  gallery: [],
};

export function useStepper() {
  const [currentStep, setCurrentStep] = useState<Step>(() => {
    const savedStep = localStorage.getItem('marsai_step');
    return savedStep ? (Number(savedStep) as Step) : 1;
  });
  const { t } = useTranslation();

  // This is the "Big Bucket" that holds everything
  const [formData, setFormData] = useState<FilmSubmissionData>(() => {
    const savedData = localStorage.getItem('marsai_data');
    if (savedData) {
      return { ...initialFormData, ...JSON.parse(savedData) as Partial<FilmSubmissionData> };
    }

    return initialFormData;
  });

  useEffect(() => {
    localStorage.setItem('marsai_step', currentStep.toString());
    localStorage.setItem('marsai_data', JSON.stringify(formData));
  }, [currentStep, formData]);

  const resetStepper = () => {
    localStorage.removeItem('marsai_step');
    localStorage.removeItem('marsai_data');
    setCurrentStep(1);
    // Optional: Set formData back to initial state if you want a total wipe
    window.location.reload(); // Quickest way to ensure a clean state for your video
  };
  const steps = [
    { number: 1, title: t('submit.step1.title'), icon: User },
    { number: 2, title: t('submit.step2.title'), icon: FileText },
    { number: 3, title: t('submit.step3.title'), icon: Sparkles },
    { number: 4, title: t('submit.step4.title'), icon: Upload },
    { number: 5, title: t('submit.step5.title'), icon: Users },
  ];

  const progress = (currentStep / steps.length) * 100;

  // This accepts the local data from the form and merges it into the Big Bucket
  const nextStep = (stepData?: SubmissionStepData) => {
    if (stepData) {
      setFormData(prev => ({ ...prev, ...stepData }));
    }

    if (currentStep < 5) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  return {
    currentStep,
    steps,
    progress,
    formData,
    setFormData,
    nextStep,
    prevStep,
    resetStepper,
  };
}
