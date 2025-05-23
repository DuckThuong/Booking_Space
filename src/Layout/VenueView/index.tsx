import FormWrap from "../../Components/Form/FormWrap";
import "./venueView.scss";
import { HeaderNavBar } from "./../../LayoutOption/HeaderNavBar/index";
import { useUser } from "../../api/useHook";
import { Row } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../api/apiConfig";
import { venueApi } from "../../api/api";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
export const VenueView = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [form] = useForm();
  const location = useLocation();
  const venueId = location?.state;

  const { data: venueData } = useQuery({
    queryKey: [QUERY_KEY.GET_VENUE, venueId],
    queryFn: () => venueApi.getVenueById(venueId),
  });
  return (
    <div className="venue_view">
      <FormWrap form={form} className="venue_view-form">
        <HeaderNavBar isLogin={user ? true : false} />
        <Row className="venue_view-row-1">
          <p>
            Xin chào {user?.userName}, đây là hồ sơ của bạn cho{" "}
            {venueData?.name} trên BookingSpace.{" "}
            <span
              onClick={() => {
                navigate(CUSTOMER_ROUTER_PATH.VENUE, {
                  state: {
                    itemPlace: "2",
                    venueId: venueData?.venueTypeId,
                    defaultOpen: "2",
                  },
                });
              }}
            >
              Vào bảng điều kiển để biết thêm chi tiết
            </span>
          </p>
        </Row>
        <p className="venue_view-address">Thái Bình-Vũ Thư-Tên Venue</p>
      </FormWrap>
    </div>
  );
};
