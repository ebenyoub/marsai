import { useEffect } from 'react';
import FormAi from './components/FormAi';
import FormData from './components/FormData';
import FormIdentity from './components/FormIdentity';
import FormMedia from './components/FormMedia';
import FormMember from './components/FormMember';
import ProgressBarComponent from './components/ProgressBarComponent';
import { useStepper } from './components/StepRule';

export function FilmUpload() {
  const { currentStep, steps, progress, formData, nextStep, prevStep } = useStepper();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FormIdentity onNext={nextStep} />;
      case 2:
        return <FormData onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <FormAi onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <FormMedia onNext={nextStep} onBack={prevStep} />;

      case 5:
        return <FormMember onBack={prevStep} masterData={formData} />;

      default:
        return <FormIdentity onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <div className="m-auto mt-10 w-full max-w-4xl px-4">
        <ProgressBarComponent steps={steps} currentStep={currentStep} variant="purple" progress={progress} />
      </div>

      <div className="flex flex-col gap-10">{renderStep()}</div>
    </div>
  );
}
