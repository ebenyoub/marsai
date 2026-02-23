import { useStepper } from './components/StepRule';
import ProgressBarComponent from './components/ProgressBarComponent';
import FormIdentity from './components/FormIdentity';
import FormData from './components/FormData';
import FormAi from './components/FormAi';
import FormMedia from './components/FormMedia';
import FormMember from './components/FormMember';

export function FilmUpload() {
  const { currentStep, steps, progress, formData, nextStep, prevStep } = useStepper();

  // Define which component to show based on the currentStep
  const renderStep = () => {
    switch (currentStep) {
      case 1: return <FormIdentity onNext={nextStep} />;
      case 2: return <FormData onNext={nextStep} onBack={prevStep} />;
      case 3: return <FormAi onNext={nextStep} onBack={prevStep} />;
      case 4: return <FormMedia onNext={nextStep} onBack={prevStep} />;

      case 5: return <FormMember onBack={prevStep} masterData={formData} />;
      
      default: return <FormIdentity onNext={nextStep} />;
    }
  }

  return (
    <div className="bg-slate-950 min-h-screen pb-20">
      <div className="m-auto mt-10 w-full max-w-4xl px-4">
        {/* Progress header */}
        <ProgressBarComponent steps={steps} currentStep={currentStep} variant="purple" progress={progress} />
      </div>
      
      <div className="flex flex-col gap-10">
        {renderStep()}
      </div>
    </div>
  );
}
