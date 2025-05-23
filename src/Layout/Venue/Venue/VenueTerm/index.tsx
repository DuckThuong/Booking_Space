import { Row, Typography } from "antd";
import "./venueTerm.scss";

const { Title, Text } = Typography;

export const VenueTerm = () => {
  return (
    <div className="venue_term">
      <Row className="venue_term-section">
        <Title level={2} className="venue_term-title">
          Điều khoản
        </Title>
        <Text className="venue_term-desc">
          BookingSpace mang đến cho bạn sự linh hoạt hơn khi chia sẻ không gian.
        </Text>
        <div className="venue_term-links">
          <a href="#" className="venue_term-link">
            Điều khoản sử dụng BookingSpace
          </a>
          <span className="venue_term-link-divider">|</span>
          <a href="#" className="venue_term-link">
            Điều khoản lưu trữ
          </a>
        </div>
      </Row>
      <Row className="venue_term-section">
        <Title level={5} className="venue_term-section-title">
          Đặt chỗ theo giờ
        </Title>
        <div className="venue_term-item">
          <a href="#" className="venue_term-link-bold">
            Giấy phép DASH® cho Đặt chỗ theo giờ/ngày
          </a>
          <Text className="venue_term-item-desc">
            Thỏa thuận cấp phép tiêu chuẩn để hợp lý hóa việc đặt chỗ theo
            giờ/ngày.
          </Text>
        </div>
        <div className="venue_term-item">
          <a href="#" className="venue_term-link-bold">
            Chính sách hủy trong vòng 24 giờ
          </a>
          <Text className="venue_term-item-desc">
            Khách sẽ được hoàn lại toàn bộ tiền nếu hủy trong vòng 1 giờ sau khi
            đặt chỗ hoặc ít nhất 24 giờ trước giờ bắt đầu.
          </Text>
        </div>
      </Row>
      <Row className="venue_term-section">
        <Title level={5} className="venue_term-section-title">
          Đặt phòng hàng tháng
        </Title>
        <div className="venue_term-item">
          <a href="#" className="venue_term-link-bold">
            Giấy phép DASH® cho Đặt chỗ hàng tháng
          </a>
          <Text className="venue_term-item-desc">
            Thỏa thuận cấp phép có thể tùy chỉnh bao gồm tất cả các chi tiết
            quan trọng như thanh toán, bảo hiểm và chính sách hủy bỏ.
          </Text>
        </div>
        <div className="venue_term-item">
          <a href="#" className="venue_term-link-bold">
            Chính sách hủy bỏ linh hoạt
          </a>
          <Text className="venue_term-item-desc">
            Hoàn tiền đầy đủ nếu hủy trước 30 ngày so với ngày đặt phòng. Hoàn
            tiền một phần nếu hủy trước 30 ngày so với ngày đặt phòng.
          </Text>
        </div>
      </Row>
    </div>
  );
};
