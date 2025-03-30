import { FC } from "react";
import { Button } from "antd";
import FormWrap from "../../../Components/Form/FormWrap";
import RowWrap from "../../../Components/RowWrap";

interface SecondStepProps {
  onNext: () => void;
}

export const HostSecondStep: FC<SecondStepProps> = ({ onNext }) => {
  return (
    <div className="step_second">
      <FormWrap className="step_second__content">
        <RowWrap className="step_second__content-text">
          <h1 className="step_second__content-title">
            Bước 2: Thông tin cơ bản
          </h1>
          <p className="step_second__content-desc">
            Hãy điền các thông tin cơ bản về địa điểm của bạn
          </p>
        </RowWrap>

        {/* Thêm form fields ở đây */}
        <RowWrap className="step_second__form">
          {/* Nội dung form của bạn */}
          <p>Step2</p>
        </RowWrap>

        <RowWrap className="step_second__actions">
          <Button type="primary" onClick={onNext}>
            Tiếp tục
          </Button>
        </RowWrap>
      </FormWrap>
    </div>
  );
};
