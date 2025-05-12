import { Button, notification } from "antd";
import { FC } from "react";
import { CreateVenueEnum } from "../../../api/itemApi";
import RowWrap from "../../../Components/RowWrap";
import { useMutation } from "@tanstack/react-query";
import { venueApi } from "../../../api/api";
interface LastStepProps {
  data: CreateVenueEnum | undefined;
}

export const HostLastStep: FC<LastStepProps> = ({ data }) => {
  const createVenueMutate = useMutation({
    mutationFn: (data: CreateVenueEnum) => venueApi.doCreateVenue(data),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      notification.open({
        message: "Thông báo!",
        description: "Đăng ký thất bại.",
        placement: "topRight",
        showProgress: true,
        pauseOnHover: true,
        style: {
          backgroundColor: "#ffffff",
          borderLeft: "4px solid #007bff",
        },
      });
    },
  });
  const handleSubmit = () => {
    const payload: CreateVenueEnum = {
      venueTypeId: data?.venueTypeId,
      phoneNumber: data?.phoneNumber,
      userAvatar: data?.userAvatar,
      venueLogo: data?.venueLogo,
      venueName: data?.venueName,
      venueDescription: data?.venueDescription,
      venueCity: data?.venueCity,
      venueDistrict: data?.venueDistrict,
      venueStreet: data?.venueStreet,
      venueLatitude: data?.venueLatitude,
      venueLongtitude: data?.venueLongtitude,
    };
    createVenueMutate.mutate(payload);
  };
  return (
    <div className="step_last">
      <RowWrap className="step_last__header">
        <h1 className="step_last__header-title">Xác nhận tạo host</h1>
        <p className="step_last__header-text">
          Bạn có chắc chắn muốn tạo host với các thông tin đã cung cấp không?
        </p>
      </RowWrap>
      <RowWrap className="step_last__actions">
        <Button onClick={handleSubmit}>Xác nhận</Button>
      </RowWrap>
    </div>
  );
};
