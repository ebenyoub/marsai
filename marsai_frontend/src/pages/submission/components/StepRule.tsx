import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Sparkles, Upload, User, Users } from 'lucide-react';
import { CollaboratorType, FilmSubmissionData, Step, SubmissionStepData } from '@/types/form';

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

const createInitialFormData = (): FilmSubmissionData => ({
  ...initialFormData,
  semanticTags: [],
  gallery: [],
});

interface SubmissionDraft {
  step: Step;
  data: FilmSubmissionData;
  collaborators: CollaboratorType[];
}

const isValidStep = (value: number): value is Step => Number.isInteger(value) && value >= 1 && value <= 5;

const hasValues = (values: Array<string | boolean | string[] | File | File[] | null | undefined>) =>
  values.some(value => {
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'boolean') return value;
    return value !== null && value !== undefined;
  });

const hasIdentityData = (data: FilmSubmissionData) =>
  hasValues([
    data.firstName,
    data.lastName,
    data.birthDate,
    data.email,
    data.mobile,
    data.address,
    data.postCode,
    data.city,
    data.country,
    data.job,
    data.source,
  ]);

const hasFilmData = (data: FilmSubmissionData) =>
  hasValues([data.title, data.titleEn, data.duration, data.language, data.semanticTags, data.synopsis, data.synopsisEn]);

const hasAiData = (data: FilmSubmissionData) =>
  hasValues([data.aiClassification, data.deploymentType, data.techStack, data.methodology]);

const hasMediaData = (data: FilmSubmissionData) => hasValues([data.youtubeUrl, data.hasSubtitles]);

const hasMeaningfulDraft = (data: FilmSubmissionData) =>
  hasIdentityData(data) || hasFilmData(data) || hasAiData(data) || hasMediaData(data);

const canRestoreStep = (step: Step, data: FilmSubmissionData) => {
  if (!hasMeaningfulDraft(data)) return false;
  if (step <= 2) return hasIdentityData(data);
  if (step === 3) return hasIdentityData(data) && hasFilmData(data);
  if (step === 4) return hasIdentityData(data) && hasFilmData(data) && hasAiData(data);
  return hasIdentityData(data) && hasFilmData(data) && hasAiData(data) && hasMediaData(data);
};

const sanitizeDraftData = (data: FilmSubmissionData): FilmSubmissionData => ({
  ...data,
  semanticTags: Array.isArray(data.semanticTags) ? data.semanticTags : [],
  thumbnail: null,
  gallery: [],
});

const clearSubmissionDraft = () => {
  localStorage.removeItem('marsai_step');
  localStorage.removeItem('marsai_data');
  localStorage.removeItem('marsai_collaborators');
};

const sanitizeCollaborators = (collaborators: CollaboratorType[]) =>
  collaborators.map(member => ({
    id: member.id,
    firstname: member.firstname,
    lastname: member.lastname,
    job: member.job,
    email: member.email,
    gender: member.gender,
    movie_id: member.movie_id,
  }));

const persistSubmissionDraft = (step: Step, data: FilmSubmissionData, collaborators: CollaboratorType[]) => {
  const draftData = sanitizeDraftData(data);
  const draftCollaborators = sanitizeCollaborators(collaborators);

  if (!hasMeaningfulDraft(draftData)) {
    clearSubmissionDraft();
    return;
  }

  localStorage.setItem('marsai_step', step.toString());
  localStorage.setItem('marsai_data', JSON.stringify(draftData));

  if (draftCollaborators.length > 0) {
    localStorage.setItem('marsai_collaborators', JSON.stringify(draftCollaborators));
    return;
  }

  localStorage.removeItem('marsai_collaborators');
};

const loadSubmissionDraft = (): SubmissionDraft => {
  const fallback: SubmissionDraft = { step: 1, data: createInitialFormData(), collaborators: [] };
  const savedStep = localStorage.getItem('marsai_step');
  const savedData = localStorage.getItem('marsai_data');
  const savedCollaborators = localStorage.getItem('marsai_collaborators');

  if (!savedStep && !savedData) return fallback;
  if (!savedStep || !savedData) {
    clearSubmissionDraft();
    return fallback;
  }

  const parsedStep = Number(savedStep);
  if (!isValidStep(parsedStep)) {
    clearSubmissionDraft();
    return fallback;
  }

  try {
    const parsedData = JSON.parse(savedData) as Partial<FilmSubmissionData>;
    const data = sanitizeDraftData({ ...createInitialFormData(), ...parsedData });
    const collaborators = savedCollaborators
      ? sanitizeCollaborators(JSON.parse(savedCollaborators) as CollaboratorType[])
      : [];

    if (!canRestoreStep(parsedStep, data)) {
      clearSubmissionDraft();
      return fallback;
    }

    return { step: parsedStep, data, collaborators };
  } catch {
    clearSubmissionDraft();
    return fallback;
  }
};

export function useStepper() {
  const [initialDraft] = useState(loadSubmissionDraft);
  const [currentStep, setCurrentStep] = useState<Step>(initialDraft.step);
  const [resetKey, setResetKey] = useState(0);
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FilmSubmissionData>(initialDraft.data);
  const [collaborators, setCollaborators] = useState<CollaboratorType[]>(initialDraft.collaborators);

  const resetStepper = () => {
    clearSubmissionDraft();
    setCurrentStep(1);
    setFormData(createInitialFormData());
    setCollaborators([]);
    setResetKey(key => key + 1);
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
    const nextData = stepData ? { ...formData, ...stepData } : formData;
    const nextStepValue = currentStep < 5 ? (currentStep + 1) as Step : currentStep;

    if (stepData) {
      setFormData(nextData);
    }

    setCurrentStep(nextStepValue);
    persistSubmissionDraft(nextStepValue, nextData, collaborators);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const previousStepValue = (currentStep - 1) as Step;
      setCurrentStep(previousStepValue);
      persistSubmissionDraft(previousStepValue, formData, collaborators);
    }
  };

  const updateCollaborators = (nextCollaborators: CollaboratorType[]) => {
    setCollaborators(nextCollaborators);
    persistSubmissionDraft(currentStep, formData, nextCollaborators);
  };

  return {
    currentStep,
    steps,
    progress,
    resetKey,
    formData,
    collaborators,
    setFormData,
    updateCollaborators,
    nextStep,
    prevStep,
    resetStepper,
  };
}
