import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Sparkles, Upload, User, Users } from 'lucide-react';
import { CollaboratorType, Step } from '@/types/form';

export function useStepper() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const { t } = useTranslation();
  
  // This is the "Big Bucket" that holds everything
  const [formData, setFormData] = useState({
    // Step 1 
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

    // Step 2 
    title: '',
    titleEn: '',
    duration: 0,
    language: '',
    semanticTags: '',
    synopsis: '',
    synopsisEn: '',

    // Step 3 
    deploymentType: '100',
    techStack: '',
    methodology: '',

    // Step 4 
    youtubeUrl: '',
    hasSubtitles: false,
    thumbnail: null as File | null,
    gallery: [] as File[],

    // Step 5 
    collaborators: [] as CollaboratorType[],
  });

  const steps = [
    { number: 1, title: t('submit.step1.title'), icon: User },
    { number: 2, title: t('submit.step2.title'), icon: FileText },
    { number: 3, title: t('submit.step3.title'), icon: Sparkles },
    { number: 4, title: t('submit.step4.title'), icon: Upload },
    { number: 5, title: t('submit.step5.title'), icon: Users },
  ];

  const progress = (currentStep / steps.length) * 100;

  // This accepts the local data from the form and merges it into the Big Bucket
  const nextStep = (stepData?: Partial<typeof formData>) => {
    if (stepData) {
      setFormData((prev) => ({ ...prev, ...stepData }));
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
  };
}