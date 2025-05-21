import { Image } from "antd";
import "./style.scss";

const ImageOverlayLayout = () => {
  return (
    <div className="layout-container">
      <div className="box-chart">
        <Image
          className="main-image"
          preview={false}
          src="https://www.jaspersoft.com/content/dam/jaspersoft/images/graphics/infographics/column-chart-example.svg"
        />
      </div>
      <div className="image-tablet">
        <Image
          className="main-image"
          preview={false}
          src="https://ezcloud.vn/wp-content/uploads/2022/07/Thumbnail-Post-.png"
        />
      </div>
      <div className="box-rating">
        <Image
          className="main-image"
          preview={false}
          src="https://maisonoffice.vn/wp-content/uploads/2023/06/Booking.com-Offices-New-York-City-9.jpg"
        />
      </div>
    </div>
  );
};

export default ImageOverlayLayout;
