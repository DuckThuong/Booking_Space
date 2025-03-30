import { FC, useState } from "react";
import { HostFirstStep } from "./HostFirstStep";
import { HostSecondStep } from "./HostSecondStep";
import { CreateVenueEnum } from "../../api/constants";

interface StepProps {
  step: number;
  onStepChange: (step: number) => void;
}

export const HostRouter: FC<StepProps> = ({ step, onStepChange }) => {
  const [data, setData] = useState<CreateVenueEnum>();
  const handleNext = (newData: Partial<CreateVenueEnum>) => {
    setData({
      ...data,
      ...newData,
    });
    onStepChange(step + 1);
  };

  switch (step) {
    case 1:
      return <HostFirstStep onNext={handleNext} />;
    case 2:
      return <HostSecondStep onNext={handleNext} data={data} />;
    case 3:
      return <div>Step 3</div>;
    default:
      return null;
  }
};
