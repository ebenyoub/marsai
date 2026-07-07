import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import ProgressBar from '@/components/ui/ProgressBar';
import { StepperHeaderProps } from '@/types/form';

export default function StepperHeader({ steps, currentStep, progress }: StepperHeaderProps) {
  return (
    <div className="mb-8">
      <div className="mb-6 flex justify-between">
        {steps.map(step => {
          const StepIcon = step.icon;
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div
              key={step.number}
              className={`flex flex-col items-center transition-all duration-300 ${isCurrent ? 'scale-110' : ''}`}
            >
              <motion.div
                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`mb-2 flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isCurrent
                    ? 'border-primary bg-primary/20 shadow-primary/50 shadow-lg'
                    : isCompleted
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted bg-background'
                }`}
              >
                {isCompleted ? <Check className="h-6 w-6" /> : <StepIcon className="h-6 w-6" />}
              </motion.div>
              <span className="mt-2 text-xs">{step.title}</span>
            </div>
          );
        })}
      </div>

      <ProgressBar progress={progress} className="h-3" />
    </div>
  );
}
