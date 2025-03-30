import { useState } from "react";
import RowWrap from "../../Components/RowWrap";
import ColWrap from "../../Components/ColWrap";
import { Button } from "antd";
import { ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons";
import { HostRouter } from "./hostRoter";
import "./host.scss";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { useNavigate } from "react-router-dom";

export const Host = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleStepChange = (newStep: number) => {
    setStep(newStep);
  };

  const handleCancel = () => {
    navigate(CUSTOMER_ROUTER_PATH.HOME);
  };

  return (
    <div className="host">
      <div className="host__modal">
        <RowWrap className="host__modal-header" gutter={[16, 16]}>
          <ColWrap colProps={{ span: 4 }} className="host__modal-header-left">
            <div className="host__modal-header-left-icon">
              {step > 1 ? (
                <ArrowLeftOutlined
                  onClick={() => handleStepChange(step - 1)}
                  style={{ cursor: "pointer" }}
                />
              ) : null}
              <span>{step} / 5</span>
            </div>
          </ColWrap>
          <ColWrap colProps={{ span: 4 }} className="host__modal-header-right">
            <Button
              className="host__modal-header-close"
              icon={<CloseOutlined />}
              onClick={handleCancel}
            ></Button>
          </ColWrap>
        </RowWrap>
        <RowWrap className="host__modal-body" gutter={[16, 16]}>
          <HostRouter step={step} onStepChange={handleStepChange} />
        </RowWrap>
      </div>
    </div>
  );
};
