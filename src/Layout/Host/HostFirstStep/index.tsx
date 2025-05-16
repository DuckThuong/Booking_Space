import { useQuery } from "@tanstack/react-query";
import { Image, Spin } from "antd";
import { FC } from "react";
import { venueApi } from "../../../api/api";
import { CreateVenueEnum } from "../../../api/itemApi";
import FormWrap from "../../../Components/Form/FormWrap";
import RowWrap from "../../../Components/RowWrap";

interface FirstStepProps {
  onNext: (data: Partial<CreateVenueEnum>) => void;
}

interface VenueType {
  venueTypeId: number;
  name: string;
  description: string;
  venueTypePictureUrl: string;
}

export const HostFirstStep: FC<FirstStepProps> = ({ onNext }) => {
  const {
    data: venueTypes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["venueTypes"],
    queryFn: () => venueApi.getVenueTypes(),
    retry: 3,
  });

  const handleSelectVenue = (type: number) => {
    onNext({
      venueTypeId: type,
    });
  };

  if (error) {
    console.error("Error fetching venue types:", error);
    return (
      <div className="step_first">
        <FormWrap className="step_first__content">
          <div>Đã có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.</div>
        </FormWrap>
      </div>
    );
  }

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
          {isLoading ? (
            <div
              style={{ width: "100%", textAlign: "center", padding: "20px" }}
            >
              <Spin size="large" />
            </div>
          ) : (
            venueTypes?.map((venueType: VenueType) => (
              <div
                key={venueType.venueTypeId}
                className="step_first__card"
                onClick={() => handleSelectVenue(venueType.venueTypeId)}
              >
                <Image
                  preview={false}
                  className="step_first__card-image"
                  src={venueType.venueTypePictureUrl}
                  fallback="https://via.placeholder.com/300x200?text=No+Image"
                />
                <p className="step_first__card-title">{venueType.name}</p>
              </div>
            ))
          )}
        </RowWrap>
      </FormWrap>
    </div>
  );
};
