import { useQuery } from "@tanstack/react-query";
import { Image } from "antd";
import { venueApi } from "../../../api/api";
import { QUERY_KEY } from "../../../api/apiConfig";
import FormWrap from "../../../Components/Form/FormWrap";
import RowWrap from "../../../Components/RowWrap";
import { FC } from "react";

interface FirstStepProps {
  onNext: () => void;
}

export const HostFirstStep: FC<FirstStepProps> = ({ onNext }) => {
  const { data: venueData } = useQuery({
    queryKey: [QUERY_KEY.GET_VENUE],
    queryFn: () => venueApi.doGetListVenues(),
  });

  return (
    <div className="step_first">
      <FormWrap className="step_first__content">
        <RowWrap className="step_first__content-text">
          <h1 className="step_first__content-title">
            Chào mừng bạn đến với Host
          </h1>
          <p className="step_first__content-text">
            Chúng tôi rất vui khi bạn đã chọn trở thành một Host. Để bắt đầu,
            hãy làm theo các bước sau:
          </p>
        </RowWrap>
        <RowWrap className="step_first__content-container">
          <div className="step_first__card" onClick={onNext}>
            <Image
              preview={false}
              className="step_first__card-image"
              src="https://maisonoffice.vn/wp-content/uploads/2020/02/2-Serviced-Office-co-dia-chi-dac-dia.jpg"
            />
            <p className="step_first__card-title">Name</p>
          </div>
          <div className="step_first__card">
            <Image
              preview={false}
              className="step_first__card-image"
              src="https://maisonoffice.vn/wp-content/uploads/2020/02/2-Serviced-Office-co-dia-chi-dac-dia.jpg"
            />
            <p className="step_first__card-title">Name</p>
          </div>
          <div className="step_first__card">
            <Image
              preview={false}
              className="step_first__card-image"
              src="https://maisonoffice.vn/wp-content/uploads/2020/02/2-Serviced-Office-co-dia-chi-dac-dia.jpg"
            />
            <p className="step_first__card-title">Name</p>
          </div>
          <div className="step_first__card">
            <Image
              preview={false}
              className="step_first__card-image"
              src="https://maisonoffice.vn/wp-content/uploads/2020/02/2-Serviced-Office-co-dia-chi-dac-dia.jpg"
            />
            <p className="step_first__card-title">Name</p>
          </div>
          <div className="step_first__card">
            <Image
              preview={false}
              className="step_first__card-image"
              src="https://maisonoffice.vn/wp-content/uploads/2020/02/2-Serviced-Office-co-dia-chi-dac-dia.jpg"
            />
            <p className="step_first__card-title">Name</p>
          </div>
          <div className="step_first__card">
            <Image
              preview={false}
              className="step_first__card-image"
              src="https://maisonoffice.vn/wp-content/uploads/2020/02/2-Serviced-Office-co-dia-chi-dac-dia.jpg"
            />
            <p className="step_first__card-title">Name</p>
          </div>
        </RowWrap>
      </FormWrap>
    </div>
  );
};
