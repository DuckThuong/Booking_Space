import { useQuery } from "@tanstack/react-query";
import { Col, Form, Image, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { FC, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useLocation, useNavigate } from "react-router-dom";
import { venueApi } from "../../api/api";
import { QUERY_KEY } from "../../api/apiConfig";
import { useUser } from "../../api/useHook";
import FormWrap from "../../Components/Form/FormWrap";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { HeaderNavBar } from "./../../LayoutOption/HeaderNavBar/index";
import "./venueView.scss";
import { FormSelect } from "../../Components/Form/FormSelect";
import { FormInput } from "../../Components/Form/FormInput";
import TextArea from "antd/es/input/TextArea";
import AmenitiesList from "../Venue/Space/SpaceService/ServiceBadgle";
import { Amenities } from "../../api/itemApi";
import { WifiOutlined } from "@ant-design/icons";

const LocationMarker: FC<{
  position: { lat: number; lng: number };
  setPosition: (position: { lat: number; lng: number }) => void;
}> = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      const newPosition = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };
      setPosition(newPosition);
    },
  });

  return <Marker position={[position.lat, position.lng]} />;
};

const ChangeView: FC<{ center: [number, number]; zoom: number }> = ({
  center,
  zoom,
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

export const VenueView = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [form] = useForm();
  const location = useLocation();
  const venueId = location?.state;

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 10.762622,
    lng: 106.660172,
  });

  const [amenities, setAmenities] = useState<Amenities[]>([
    { id: 1, name: "Kết nối Wi-Fi", selected: false, icon: <WifiOutlined /> },
    {
      id: 2,
      name: "Tiện nghi cho khách thuê",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/accessibility2.png"
          alt="accessibility2"
        />
      ),
    },
    {
      id: 3,
      name: "Khu vực đỗ xe",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/parking.png"
          alt="parking"
        />
      ),
    },
  ]);

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
        <Row className="venue_view-row-2">
          <p className="venue_view-row-2-address">Thái Bình-Vũ Thư-Tên Venue</p>
          <MapContainer
            center={[selectedLocation.lat, selectedLocation.lng]}
            zoom={15}
            style={mapContainerStyle}
          >
            <ChangeView
              center={[selectedLocation.lat, selectedLocation.lng]}
              zoom={15}
            />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker
              position={selectedLocation}
              setPosition={(position) => {
                setSelectedLocation(position);
              }}
            />
          </MapContainer>

          <Row key={venueData?.venueTypeId} className="venue_view-row-2-item">
            <Col className="venue_view-row-2-item-image" span={4}>
              <img
                src={venueData?.venueTypePictureUrl}
                alt="avatar"
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={18} className="venue_view-row-2-info">
              <h3 className="venue_view-row-2-info-header">
                {venueData?.name}
              </h3>
              <p className="venue_view-row-2-info-title">
                {venueData?.description}
              </p>
            </Col>
            <p className="venue_view-row-2-info-hotline">
              {venueData?.description}
            </p>
          </Row>

          <Row className="venue_view-row-2-service">
            <p className="venue_view-row-2-service-title">
              Các tiện ích được cung cấp
            </p>
            <AmenitiesList
              amenities={amenities}
              onAmenityChange={setAmenities}
              isDisable={true}
            />
          </Row>
        </Row>
        <Row className="venue_view-row-3">
          <div className="venue_view-row-3-header">
            <Col span={2}>
              <Image
                preview={false}
                width={35}
                height={35}
                src={
                  "https://static-cse.canva.com/blob/2008403/1600w-vkBvE1d_xYA.jpg"
                }
              />
            </Col>
            <Col span={20}>Tìm các phòng trống khác</Col>
          </div>
          <div className="venue_view-row-3-body">
            <Col span={11}>
              <FormSelect
                name={"venue_type"}
                selectProps={{
                  placeholder: "Chọn loại phòng",
                  options: [
                    {
                      key: 1,
                      value: "Văn phòng",
                    },
                    {
                      key: 2,
                      value: "Tòa nhà",
                    },
                    {
                      key: 3,
                      value: "Khách sạn",
                    },
                  ],
                }}
              />
              <FormSelect
                name={"venue_time"}
                selectProps={{
                  placeholder: "Chọn thời gian thuê",
                  options: [
                    {
                      key: 1,
                      value: "1 tháng hoặc nhiều hơn.",
                    },
                    {
                      key: 2,
                      value: "3 tháng hoặc nhiều hơn.",
                    },
                    {
                      key: 3,
                      value: "6 tháng hoặc nhiều hơn.",
                    },
                    {
                      key: 4,
                      value: "1 năm hoặc nhiều hơn.",
                    },
                  ],
                }}
              />
              <FormInput
                name={"venue_numPeople"}
                inputProps={{
                  placeholder: "Nhập số người",
                }}
              />
            </Col>
            <Col span={11}>
              <FormInput
                name={"venue_userName"}
                inputProps={{
                  value: user?.userName,
                  placeholder: "Tên của bạn",
                }}
              />
              <FormInput
                name={"venue_userPhone"}
                inputProps={{
                  value: user?.userName,
                  placeholder: "Số diện thoại của bạn",
                }}
              />
              <Form.Item>
                <TextArea placeholder="Chú thích"></TextArea>
              </Form.Item>
            </Col>
          </div>
          <div className="venue_view-row-3-map">
            <p className="venue_view-row-3-map-title">Các địa điểm gần đây.</p>
          </div>
        </Row>
      </FormWrap>
    </div>
  );
};
