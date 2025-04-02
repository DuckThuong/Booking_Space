import { FC, useState } from "react";
import { CreateVenueEnum } from "../../../api/constants";
import FormWrap from "../../../Components/Form/FormWrap";
import RowWrap from "../../../Components/RowWrap";
import { FormInput } from "../../../Components/Form/FormInput";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "antd";
import L from "leaflet";

// Fix for default marker icon
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

// Component to handle map clicks
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

      // Use Nominatim API for reverse geocoding
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newPosition.lat}&lon=${newPosition.lng}`
      )
        .then((response) => response.json())
        .then((data) => {
          const address = data.display_name;
          const addressInput = document.querySelector(
            'input[name="address"]'
          ) as HTMLInputElement;
          if (addressInput) {
            addressInput.value = address;
          }
        });
    },
  });

  return <Marker position={[position.lat, position.lng]} />;
};

export const HostFourthStep: FC<FourthStepProps> = ({ onNext, data }) => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 10.762622,
    lng: 106.660172,
  });

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <FormWrap className="step_fourth">
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
          <MapContainer
            center={[selectedLocation.lat, selectedLocation.lng]}
            zoom={15}
            style={mapContainerStyle}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker
              position={selectedLocation}
              setPosition={setSelectedLocation}
            />
          </MapContainer>
        </div>
      </RowWrap>
      <RowWrap className="step_third__actions">
        <Button htmlType="submit">Xác nhận</Button>
      </RowWrap>
    </FormWrap>
  );
};
