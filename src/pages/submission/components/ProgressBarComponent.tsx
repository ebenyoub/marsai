import { Check } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import { motion } from "motion/react";
import { StepperHeaderProps } from "@/types/form"

export default function StepperHeader({
  steps,
  currentStep,
  progress,
}: StepperHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-6">
        {steps.map((step) => {
          const StepIcon = step.icon;
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
          <div
                  key={step.number}
                  className={`flex flex-col items-center transition-all duration-300 ${
                    isCurrent ? 'scale-110' : ''
                  }`}
                >
                      <motion.div
                    animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-14 h-14 rounded-full border-2 flex items-center justify-center mb-2 transition-all duration-300 ${
                      isCurrent
                        ? 'border-primary bg-primary/20 shadow-lg shadow-primary/50'
                        : isCompleted
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted bg-background'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) :  (
                      <StepIcon className="w-6 h-6" />
                    )}
                  </motion.div>
              <span className="text-xs mt-2">{step.title}</span>
            </div>
          );
        })}
      </div>

      <ProgressBar progress={progress} className="h-3" />
    </div>
  );
}
