import { Checkbox } from "antd";
import "./style.scss";
import { Amenities } from "../../../../../api/itemApi";
interface AmenitiesListProps {
  amenities: Amenities[];
  onAmenityChange: (updatedAmenities: AmenitiesListProps["amenities"]) => void;
  isDisable?: boolean;
}

const AmenitiesList = ({
  amenities,
  onAmenityChange,
  isDisable,
}: AmenitiesListProps) => {
  const toggleAmenity = (id) => {
    onAmenityChange(
      amenities.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  return (
    <div className="amenities-container">
      <div className="amenities-list">
        {amenities.map((item) => (
          <div key={item.id} className="amenity-item">
            <Checkbox
              checked={item.selected}
              disabled={isDisable}
              onChange={() => toggleAmenity(item.id)}
            >
              {item.icon} {item.name}
            </Checkbox>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesList;
