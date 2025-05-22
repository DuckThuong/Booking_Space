import { Checkbox, Row } from "antd";
import FormWrap from "../../../../Components/Form/FormWrap";
import "./spacePrice.scss";
import { FormInput } from "../../../../Components/Form/FormInput";
export const SpacePrice = () => {
  return (
    <div className="space_price">
      <FormWrap className="space_price-form">
        <h1 className="space_price-header">Giá thành</h1>
        <Row className="space_price-section">
          <p className="space_price-section-title">
            Bạn muốn tính bao nhiêu cho việc sử dụng không gian này?
          </p>
          <div className="space_price-section-item">
            <FormInput
              name={"price_perHour"}
              inputProps={{
                placeholder: "Ví dụ: 50,000",
              }}
            />
            <span>vnđ / mỗi giờ.</span>
          </div>
          <div className="space_price-section-item">
            <FormInput
              name={"price_perDay"}
              inputProps={{
                placeholder: "Ví dụ: 500,000",
              }}
            />
            <span>vnđ / mỗi ngày.</span>
          </div>
          <div className="space_price-section-item">
            <FormInput
              name={"price_perMonth"}
              inputProps={{
                placeholder: "Ví dụ: 5,000,000",
              }}
            />
            <span>vnđ / mỗi tháng.</span>
          </div>
        </Row>
        <Row className="space_price-section">
          <p className="space_price-section-title">Khu vực miễn phí:</p>
          <div className="space_price-section-item">
            <Checkbox defaultChecked={false} />
            <span>
              Tôi không muốn tính phí cho không gian này. Hãy làm cho nó MIỄN
              PHÍ.
            </span>
          </div>
        </Row>
        <Row className="space_price-section">
          <p className="space_price-section-title">
            Những điều khác bạn nên biết:
          </p>
          <ul style={{ paddingLeft: 20 }}>
            <li>
              Hủy bỏ – Khách có thể hủy đặt phòng bằng cách thông báo trước ít
              nhất 24 giờ trước khi bắt đầu đặt phòng.
            </li>
            <li>
              Thanh toán – BookingSpace thu tiền từ khách khi đặt phòng, chúng
              tôi sẽ gửi thanh toán cho bạn hàng tháng bằng séc hoặc ACH.
            </li>
            <li>
              Phí – BookingSpace thu phí 20% cho các lần đặt phòng của khách.{" "}
              <a href="#">Tìm hiểu thêm</a>
            </li>
          </ul>
        </Row>
      </FormWrap>
    </div>
  );
};
