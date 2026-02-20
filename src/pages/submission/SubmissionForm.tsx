import { useStepper } from '../submission/components/StepRule';
import ProgressBarComponent from './components/ProgressBarComponent';
import SubmitForm01 from './components/SubmitForm01';
import SubmitForm02 from './components/SubmitForm02';
import SubmitForm04 from './components/SubmitForm04';

export function SubmissionForm() {
  const { currentStep, steps, progress, nextStep, prevStep, validateStep } = useStepper();

  let StepComponent;
  switch (currentStep) {
    case 1:
      StepComponent = SubmitForm01;
      break;
    // case 2: StepComponent = Step2; break;
    // case 3: StepComponent = Step3; break;
    // case 4: StepComponent = Step4; break;
    // case 5: StepComponent = Step5; break;
    default:
      StepComponent = SubmitForm01;
  }
  return (
    <>
      <div className="m-auto mt-10 w-4xl">
        <ProgressBarComponent steps={steps} currentStep={currentStep} variant="purple" progress={progress} />
      </div>
      <div className="flex flex-col gap-10 p-10">
        <SubmitForm01 />
        <SubmitForm02 />
        <SubmitForm04 />
      </div>
    </>
  );
}

export default SubmissionForm;
