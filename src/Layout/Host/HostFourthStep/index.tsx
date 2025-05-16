import { FC, useState, useEffect } from "react";
import { CreateVenueEnum } from "../../../api/itemApi";
import FormWrap from "../../../Components/Form/FormWrap";
import RowWrap from "../../../Components/RowWrap";
import { FormInput } from "../../../Components/Form/FormInput";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button, Form, notification } from "antd";
import L from "leaflet";
import { EnvironmentOutlined } from "@ant-design/icons";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

interface FourthStepProps {
  onNext: (data: Partial<CreateVenueEnum>) => void;
  data: CreateVenueEnum | undefined;
}

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

export const HostFourthStep: FC<FourthStepProps> = ({ onNext, data }) => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 10.762622,
    lng: 106.660172,
  });
  const [form] = Form.useForm();

  const [locationData, setLocationData] = useState<LocationData>({
    address: "",
    latitude: 10.762622,
    longitude: 106.660172,
  });

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const splitAddress = (address: string) => {
    const parts = address.split(",");

    let city = "";
    let district = "";
    const streetParts: string[] = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      const part = parts[i].trim();
      if (part === "Hà Nội") {
        city = part;
        break;
      }
    }

    if (!city && parts.length >= 2) {
      city = parts[parts.length - 2]?.trim() || "";
    }

    for (let i = 0; i < parts.length - 2; i++) {
      const part = parts[i].trim();
      if (part.startsWith("Quận ")) {
        district = part;
      } else if (part.startsWith("Phường ")) {
        district = part;
      } else if (part !== "Hà Nội") {
        streetParts.push(part);
      }
    }

    const street = streetParts.join(", ");
    return { street, district, city };
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

        const addressInput = document.querySelector(
          'input[name="address"]'
        ) as HTMLInputElement;
        if (addressInput) {
          addressInput.value = data.display_name;
        }
      });
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setSelectedLocation(newPosition);
          updateLocationData(newPosition.lat, newPosition.lng);
        },
        (error) => {
          notification.open({
            message: "Thông báo!",
            description: "Không thể lấy vị trí hiện tại của bạn. Vui lòng kiểm tra lại quyền truy cập vị trí.",
            placement: "topRight",
            showProgress: true,
            pauseOnHover: true,
            style: {
              backgroundColor: "#ffffff",
              borderLeft: "4px solid rgb(255, 0, 0)",
            },
          });
        }
      );
    } else {
      notification.open({
        message: "Thông báo!",
        description: "Trình duyệt của bạn không hỗ trợ định vị.",
        placement: "topRight",
        showProgress: true,
        pauseOnHover: true,
        style: {
          backgroundColor: "#ffffff",
          borderLeft: "4px solid rgb(255, 0, 0)",
        },
      });
    }
  };

  const handleSubmit = () => {
    const { street, district, city } = splitAddress(locationData.address);
    const submitData: CreateVenueEnum = {
      Address: {
        Street: street,
        District: district,
        City: city,
        Latitude: locationData.latitude.toString(),
        Longitude: locationData.longitude.toString(),
      },
    };
    onNext(submitData);
  };
  useEffect(() => {
    if (locationData.address) {
      form.setFieldsValue({
        address: locationData.address,
      });
    }
  }, [locationData.address]);

  return (
    <FormWrap form={form} className="step_fourth">
      <RowWrap className="step_fourth__header">
        <h1 className="step_fourth__header-title">Cập nhật địa chỉ</h1>
        <p className="step_fourth__header-text">
          Mọi người sẽ tìm được bạn dễ dàng hơn với thông tin địa chỉ đầy đủ của
          bạn.
        </p>
      </RowWrap>
      <RowWrap className="step_fourth__content">
        <div>
          <FormInput
            name="address"
            formItemProps={{
              rules: [
                {
                  required: true,
                  message: "Địa chỉ không được để trống",
                },
              ],
            }}
            inputProps={{
              placeholder: "Địa chỉ",
              maxLength: 255,
            }}
          />
        </div>
        <div className="step_fourth__content-map">
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
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
                top: "10px",
                right: "10px",
                zIndex: 1000,
              }}
            >
              Vị trí hiện tại
            </Button>
          </div>
        </div>
      </RowWrap>
      <RowWrap className="step_third__actions">
        <Button onClick={handleSubmit}>Xác nhận</Button>
      </RowWrap>
    </FormWrap>
  );
};
