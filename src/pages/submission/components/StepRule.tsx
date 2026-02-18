import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Sparkles, Upload, User, Users } from 'lucide-react';
import { CollaboratorType, Step } from '@/types/form';

export function useStepper() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    // Step 1 - Informations sur le Réalisateur
    civility: 'Mr',
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    mobile: '',
    street: '',
    postalCode: '',
    city: '',
    country: '',
    profession: '',
    youtubeUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    facebookUrl: '',
    xUrl: '',
    discoverySource: '',
    newsletter: false,

    // Step 2 - Métadonnées du Film
    titleOriginal: '',
    titleEnglish: '',
    duration: '',
    mainLanguage: '',
    tags: '',
    synopsisOriginal: '',
    synopsisEnglish: '',

    // Step 3 - Déclaration d'Usage de l'IA
    aiClassification: 'full',
    techStack: '',
    methodology: '',

    // Step 4 - Livrables Multimédias
    youtubeVideoUrl: '',
    hasSubtitles: false,
    subtitlesFile: null as File | null,
    posterFile: null as File | null | undefined,
    stillsFiles: [] as File[],

    // Step 5 - Équipe
    collaborators: [] as CollaboratorType[],
  });

  const steps = [
    { number: 1, title: t('submit.step1.title'), icon: User },
    { number: 2, title: t('submit.step2.title'), icon: FileText },
    { number: 3, title: t('submit.step3.title'), icon: Sparkles },
    { number: 4, title: t('submit.step4.title'), icon: Upload },
    { number: 5, title: t('submit.step5.title'), icon: Users },
  ];

  const calculateAge = (birthDate: string): number => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const isAgeValid = (): boolean => {
    const age = calculateAge(formData.birthDate);
    return age >= 18;
  };
  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.civility &&
          formData.firstName &&
          formData.lastName &&
          formData.birthDate &&
          isAgeValid() &&
          formData.email &&
          formData.mobile &&
          formData.street &&
          formData.postalCode &&
          formData.city &&
          formData.country &&
          formData.profession &&
          formData.discoverySource
        );
      case 2:
        return !!(
          formData.titleOriginal &&
          formData.titleEnglish &&
          formData.duration &&
          parseInt(formData.duration) <= 60 &&
          formData.mainLanguage &&
          formData.tags &&
          formData.synopsisOriginal &&
          formData.synopsisOriginal.length <= 300 &&
          formData.synopsisEnglish &&
          formData.synopsisEnglish.length <= 300
        );
      case 3:
        return !!(
          formData.aiClassification &&
          formData.techStack &&
          formData.techStack.length <= 500 &&
          formData.methodology &&
          formData.methodology.length <= 500
        );
      case 4:
        return !!(
          formData.youtubeVideoUrl &&
          formData.posterFile &&
          (!formData.hasSubtitles || formData.subtitlesFile)
        );
      case 5:
        return true; // L'équipe est optionnelle
      default:
        return false;
    }
  };

  const progress = (currentStep / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < 5 && validateStep(currentStep)) {
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
    validateStep,
  };
}
