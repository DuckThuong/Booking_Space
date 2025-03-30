import { FC } from "react";
import { HostFirstStep } from "./HostFirstStep";
import { HostSecondStep } from "./HostSecondStep";

interface StepProps {
  step: number;
  onStepChange: (step: number) => void;
}

export const HostRouter: FC<StepProps> = ({ step, onStepChange }) => {
  const handleNext = () => {
    onStepChange(step + 1);
  };

  switch (step) {
    case 1:
      return <HostFirstStep onNext={handleNext} />;
    case 2:
      return <HostSecondStep onNext={handleNext} />;
    case 3:
      return <div>Step 3</div>;
    default:
      return null;
  }
};
