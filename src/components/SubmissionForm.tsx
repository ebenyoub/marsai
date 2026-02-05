import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import {
  Upload,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Film,
  User,
  FileText,
  Sparkles,
  Send,
  Users,
  Plus,
  X,
  CheckCircle2,
  PartyPopper,
} from 'lucide-react';

type Step = 1 | 2 | 3 | 4 | 5;

interface Collaborator {
  civility: string;
  firstName: string;
  lastName: string;
  profession: string;
  email: string;
}

export function SubmissionForm() {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [errors, setErrors] = useState({
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
    posterFile: null as File | null,
    stillsFiles: [] as File[],

    // Step 5 - Équipe
    collaborators: [] as Collaborator[],
  });
  const [formData, setFormData] = useState({
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
    posterFile: null as File | null,
    stillsFiles: [] as File[],

    // Step 5 - Équipe
    collaborators: [] as Collaborator[],
  });

  function ValidateForm() {
    const newErrors: any = {};
    if (!formData.firstName)
      newErrors.firstName = t('submit.validation.required');
    if (!formData.lastName)
      newErrors.lastName = t('submit.validation.required');
    if (!formData.email) newErrors.email = t('submit.validation.required');
    if (!formData.mobile) newErrors.mobile = t('submit.validation.required');
    if (!formData.street) newErrors.street = t('submit.validation.required');
    if (!formData.postalCode)
      newErrors.postalCode = t('submit.validation.required');
    if (!formData.city) newErrors.city = t('submit.validation.required');
    if (!formData.country) newErrors.country = t('submit.validation.required');
    if (!formData.profession)
      newErrors.profession = t('submit.validation.required');

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const steps = [
    { number: 1, title: t('submit.step1.title'), icon: User },
    { number: 2, title: t('submit.step2.title'), icon: FileText },
    { number: 3, title: t('submit.step3.title'), icon: Sparkles },
    { number: 4, title: t('submit.step4.title'), icon: Upload },
    { number: 5, title: t('submit.step5.title'), icon: Users },
  ];

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const calculateAge = (birthDate: string): number => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const isAgeValid = (): boolean => {
    const age = calculateAge(formData.birthDate);
    return age >= 18;
  };
}
