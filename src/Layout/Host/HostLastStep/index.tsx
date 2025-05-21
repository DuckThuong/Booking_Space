import { Button, notification } from "antd";
import { FC } from "react";
import { CreateVenueEnum } from "../../../api/itemApi";
import RowWrap from "../../../Components/RowWrap";
import { useMutation } from "@tanstack/react-query";
import { venueApi } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "../../../Routers/Routers";
interface LastStepProps {
  data: CreateVenueEnum | undefined;
}

export const HostLastStep: FC<LastStepProps> = ({ data }) => {
  const navigate = useNavigate();

  const createVenueMutate = useMutation({
    mutationFn: (data: CreateVenueEnum) => venueApi.doCreateVenue(data),
    onSuccess: (data) => {
      notification.open({
        message: "Thông báo!",
        description: "Đăng ký thành công.",
        placement: "topRight",
        showProgress: true,
        pauseOnHover: true,
        style: {
          backgroundColor: "#ffffff",
          borderLeft: "4px solid #007bff",
        },
      });
      console.log(data);
      navigate(CUSTOMER_ROUTER_PATH.HOME);
    },
    onError: (error: any) => {
      notification.open({
        message: "Thông báo!",
        description: error?.response?.data?.description || "Đăng ký thất bại.",
        placement: "topRight",
        showProgress: true,
        pauseOnHover: true,
        style: {
          backgroundColor: "#ffffff",
          borderLeft: "4px solid rgb(255, 0, 0)",
        },
      });
    },
  });
  const handleSubmit = () => {
    const payload: CreateVenueEnum = {
      VenueTypeId: data?.VenueTypeId,
      PhoneNumber: data?.PhoneNumber,
      UserAvatar: data?.UserAvatar,
      Logo: data?.Logo,
      Name: data?.Name,
      Description: data?.Description,
      Address: data?.Address,
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
        <Button loading={createVenueMutate.isPending} onClick={handleSubmit}>
          Xác nhận
        </Button>
      </RowWrap>
    </div>
  );
};
