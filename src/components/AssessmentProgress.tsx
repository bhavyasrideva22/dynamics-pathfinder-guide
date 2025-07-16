import { Progress } from "@/components/ui/progress";

interface AssessmentProgressProps {
  currentStep: number;
  totalSteps: number;
  stepName: string;
}

export function AssessmentProgress({ currentStep, totalSteps, stepName }: AssessmentProgressProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">
          Step {currentStep} of {totalSteps}: {stepName}
        </span>
        <span className="font-medium text-foreground">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}