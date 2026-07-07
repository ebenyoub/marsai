import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FormAi from './components/FormAi';
import FormData from './components/FormData';
import FormIdentity from './components/FormIdentity';
import FormMedia from './components/FormMedia';
import FormMember from './components/FormMember';
import ProgressBarComponent from './components/ProgressBarComponent';
import { useStepper } from './components/StepRule';
import Button from '@/components/ui/button';

export function FilmUpload() {
  const {
    currentStep,
    steps,
    progress,
    resetKey,
    formData,
    collaborators,
    updateCollaborators,
    nextStep,
    prevStep,
    resetStepper,
  } = useStepper();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FormIdentity onNext={nextStep} initialData={formData} />;
      case 2:
        return <FormData onNext={nextStep} onBack={prevStep} initialData={formData} />;
      case 3:
        return <FormAi onNext={nextStep} onBack={prevStep} initialData={formData} />;
      case 4:
        return <FormMedia onNext={nextStep} onBack={prevStep} initialData={formData} />;

      case 5:
        return (
          <FormMember
            onBack={prevStep}
            masterData={formData}
            members={collaborators}
            onMembersChange={updateCollaborators}
          />
        );

      default:
        return <FormIdentity onNext={nextStep} initialData={formData} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <div className="m-auto mt-10 w-full max-w-4xl space-y-4 px-4">
        <div className="flex justify-end">
          <Button variant="active" type="button" onClick={resetStepper}>
            {t('submit.reset')}
          </Button>
        </div>
        <ProgressBarComponent steps={steps} currentStep={currentStep} variant="purple" progress={progress} />
      </div>

      <div key={resetKey} className="flex flex-col gap-10">{renderStep()}</div>
    </div>
  );
}
