import { FC } from "react";
import { Form } from "antd";
import FormWrap from "../../../Components/Form/FormWrap";
import { CreateVenueEnum } from "../../../api/constants";

interface ThirdStepProps {
  onNext: (data: Partial<CreateVenueEnum>) => void;
  data: CreateVenueEnum | undefined;
}

export const HostThirdStep: FC<ThirdStepProps> = ({ onNext, data }) => {
  const [form] = Form.useForm();

  const handleFinish = (formData: any) => {
    onNext({
      ...data,
      companyName: formData.companyName,
      companyDescription: formData.companyDescription,
      companyLocation: formData.location,
    });
  };

  return (
    <FormWrap form={form} className="step_third" onFinish={handleFinish}>
      <p>Kakaka</p>
    </FormWrap>
  );
};
