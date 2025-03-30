import { FC } from "react";
import { HostFirstStep } from "./HostFirstStep";

interface StepProps {
  step: number | undefined;
}
export const HostRouter: FC<StepProps> = ({ step }) => {
  switch (step) {
    case 1:
      return <HostFirstStep />;
    case 2:
      return <div>Step 2</div>;
    case 3:
      return <div>Step 3</div>;
    default:
      return null;
  }
};
