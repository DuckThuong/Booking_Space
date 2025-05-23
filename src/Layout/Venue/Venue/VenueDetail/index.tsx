import { EditOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Button, Col, Form, Image, notification, Row } from "antd";
import { FC, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { FormInput } from "../../../../Components/Form/FormInput";
import FormWrap from "../../../../Components/Form/FormWrap";
import "./venueDetail.scss";
import L from "leaflet";
import { FormSelect } from "../../../../Components/Form/FormSelect";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../../api/apiConfig";
import { venueApi } from "../../../../api/api";
import { useLocation } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

interface LocationData {
  address: string;
  latitude: number;
  longitude: number;
}

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

export const VenueDetail = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 10.762622,
    lng: 106.660172,
  });
  const [form] = Form.useForm();
  const location = useLocation();
  const venueId = location?.state;

  const [locationData, setLocationData] = useState<LocationData>({
    address: "",
    latitude: 10.762622,
    longitude: 106.660172,
  });

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const updateLocationData = (lat: number, lng: number) => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    )
      .then((response) => response.json())
      .then((data) => {
        const newLocationData = {
          address: data.display_name,
          latitude: lat,
          longitude: lng,
        };
        setLocationData(newLocationData);
        form.setFieldsValue({
          venue_address: data.display_name,
        });
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
        notification.open({
          message: "Lỗi!",
          description: "Không thể lấy địa chỉ. Vui lòng thử lại.",
          placement: "topRight",
          type: "error",
        });
      });
  };

  useEffect(() => {
    if (locationData.address) {
      form.setFieldsValue({
        venue_address: locationData.address,
      });
    }
  }, [locationData, form]);

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Got current position:", position.coords);
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setSelectedLocation(newPosition);
          form.setFieldsValue({
            venue_address: "Đang tải địa chỉ...",
          });
          console.log(
            "Form values after initial update:",
            form.getFieldsValue()
          );
          updateLocationData(newPosition.lat, newPosition.lng);
        },
        (error) => {
          console.error("Geolocation error:", error);
          notification.open({
            message: "Thông báo!",
            description:
              "Không thể lấy vị trí hiện tại của bạn. Vui lòng kiểm tra lại quyền truy cập vị trí.",
            placement: "topRight",
            type: "error",
          });
        }
      );
    } else {
      notification.open({
        message: "Thông báo!",
        description: "Trình duyệt của bạn không hỗ trợ định vị.",
        placement: "topRight",
        type: "error",
      });
    }
  };

  const { data: venueData } = useQuery({
    queryKey: [QUERY_KEY.GET_VENUE, venueId],
    queryFn: () => venueApi.getVenueById(venueId),
  });

  useEffect(() => {
    if (venueData) {
      form.setFieldValue("venue_name", venueData?.name);
      form.setFieldValue("venue_detail", venueData?.description);
    }
  }, [venueData]);

  return (
    <div className="venue_detail">
      <FormWrap form={form} className="venue_detail-form">
        <Row className="venue_detail-section-head">
          <Col span={16} className="venue_detail-section-col">
            <FormSelect
              name={"state"}
              selectProps={{
                value: "2",
                options: [
                  {
                    key: 1,
                    value: "Ẩn | Không hoạt động.",
                  },
                  {
                    key: 2,
                    value: "Hiện | Sẵn sàng.",
                  },
                ],
              }}
              formItemProps={{
                require: true,
              }}
            />
          </Col>
          <Col span={7} className="venue_detail-section-col">
            <span className="venue_detail-section-head-title">
              Cập nhật lần cuối vào: May 16, 2:45 PM
            </span>
            <Button className="venue_detail-section-head-save">Lưu</Button>
          </Col>
        </Row>
        <Row className="venue_detail-section-1">
          <h1 className="venue_detail-section-1-title">
            Chi tiết địa điểm
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/pastel-glyph/64/information--v1.png"
              alt="information--v1"
              style={{ marginInlineStart: 8 }}
            />
          </h1>
          <p>
            Thêm thông tin chi tiết về địa điểm của bạn. Thông tin này sẽ xuất
            hiện trên Hồ sơ địa điểm của bạn.
          </p>
        </Row>
        <Row className="venue_detail-section-2">
          <Col span={11}>
            <p className="venue_detail-section-2-title">Tên địa điểm</p>
            <FormInput
              name={"venue_name"}
              formItemProps={{
                className: "venue_detail-section-2-name",
                required: true,
              }}
            />
            <p className="venue_detail-section-2-title">Chi tiết địa điểm</p>
            <Form.Item
              name={"venue_detail"}
              className="venue_detail-section-2-detail"
            >
              <TextArea />
            </Form.Item>
            <p className="venue_detail-section-2-title">Hotline</p>
            <FormInput
              name={"venue_phone"}
              formItemProps={{
                className: "venue_detail-section-2-phone",
                required: true,
              }}
            />
            <div className="venue_detail-section-2-logo">
              <Image
                className="venue-logo"
                width={140}
                height={140}
                preview={false}
                src={
                  venueData?.venueTypePictureUrl
                    ? venueData?.venueTypePictureUrl
                    : "https://maisonoffice.vn/wp-content/uploads/2023/06/Booking.com-Offices-New-York-City-9.jpg"
                }
              />
              <p>Cá nhân hóa danh sách của bạn bằng cách thêm logo công ty.</p>
            </div>
          </Col>
          <Col span={11}>
            <div>
              <p className="venue_detail-section-2-title">Địa chỉ</p>
              <div
                className="venue_detail-section-2-address"
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <FormInput
                  name={"venue_address"}
                  formItemProps={{
                    className: "venue_detail-section-2-name",
                    required: true,
                  }}
                />
              </div>
            </div>
            <div>
              <p className="venue_detail-section-2-title">
                Đây là vị trí và chế độ xem phố của Google sẽ được hiển thị trên
                danh sách của bạn. Bạn có thể điều chỉnh ghim bản đồ hoặc chế độ
                xem phố nếu cần.
              </p>
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
                    updateLocationData(position.lat, position.lng);
                  }}
                />
              </MapContainer>
              <Button
                type="primary"
                icon={<EnvironmentOutlined />}
                onClick={getCurrentLocation}
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "10px",
                  zIndex: 1000,
                }}
              >
                Vị trí hiện tại
              </Button>
            </div>
          </Col>
        </Row>
      </FormWrap>
    </div>
  );
};
