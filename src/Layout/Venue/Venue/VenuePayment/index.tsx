import { Col, Row } from "antd";
import FormWrap from "../../../../Components/Form/FormWrap";
import "./venuePayment.scss";
import { FormInput } from "../../../../Components/Form/FormInput";
export const VenuePayment = () => {
  return (
    <div className="venue_payment">
      <FormWrap className="venue_payment-form">
        <Row className="venue_payment-section-1">
          <h1 className="venue_payment-section-1-title">
            Thông tin thanh toán
          </h1>
          <p>
            Vui lòng cung cấp thông tin thanh toán để chúng tôi có thể xử lý các
            khoản thanh toán từ BookingSpace và gửi hóa đơn cho các đặt chỗ trực
            tiếp theo hợp đồng của bạn.
          </p>
        </Row>
        <h1 className="venue_payment-section-2-title">
          Thông tin tài khoản ngân hàng
        </h1>
        <Row className="venue_payment-section-2">
          <Col span={11}>
            <div className="venue_payment-section-2-item">
              <span>Chủ tài khoản</span>
              <FormInput
                name={"recipient_name"}
                inputProps={{
                  placeholder: "Nhập tên chủ tài khoản",
                }}
                formItemProps={{
                  className: "venue_payment-section-2-bank-name",
                  required: true,
                }}
              />
            </div>

            <div className="venue_payment-section-2-item">
              <span>Mã SWIFT/BIC</span>
              <FormInput
                name={"swift_bic"}
                inputProps={{
                  placeholder: "Nhập mã SWIFT/BIC",
                }}
                formItemProps={{
                  className: "venue_payment-section-2-bank-bic",
                  required: true,
                }}
              />
            </div>

            <div className="venue_payment-section-2-item">
              <span>Số tài khoản</span>
              <FormInput
                name={"account_number"}
                inputProps={{
                  placeholder: "Nhập số tài khoản",
                }}
                formItemProps={{
                  className: "venue_payment-section-2-bank-number",
                  required: true,
                }}
              />
            </div>
          </Col>
          <Col span={11}>
            <div className="venue_payment-section-2-item">
              <span>Tên ngân hàng</span>
              <FormInput
                name={"bank_name"}
                inputProps={{
                  placeholder: "Nhập tên ngân hàng",
                }}
                formItemProps={{
                  className: "venue_payment-section-2-bank-nameAcc",
                  required: true,
                }}
              />
            </div>

            <div className="venue_payment-section-2-item">
              <span>Chi nhánh ngân hàng</span>
              <FormInput
                name={"bank_branch"}
                inputProps={{
                  placeholder: "Nhập tên chi nhánh",
                }}
                formItemProps={{
                  className: "venue_payment-section-2-bank-code",
                  required: true,
                }}
              />
            </div>

            <div className="venue_payment-section-2-item">
              <span>Mã số thuế</span>
              <FormInput
                name={"tax_number"}
                inputProps={{
                  placeholder: "Nhập mã số thuế",
                }}
                formItemProps={{
                  className: "venue_payment-section-2-bank-tax",
                  required: true,
                }}
              />
            </div>
          </Col>
        </Row>
        <h1 className="venue_payment-section-3-title">Địa chỉ thanh toán</h1>
        <Row className="venue_payment-section-3">
          <Col span={11}>
            <div className="venue_payment-section-3-item">
              <span>Địa chỉ</span>
              <FormInput
                name={"street_name"}
                inputProps={{
                  placeholder: "Nhập địa chỉ",
                }}
                formItemProps={{
                  className: "venue_payment-section-3-bank-name",
                  required: true,
                }}
              />
            </div>

            <div className="venue_payment-section-3-item">
              <span>Thành phố</span>
              <FormInput
                name={"city"}
                inputProps={{
                  placeholder: "Nhập tên thành phố",
                }}
                formItemProps={{
                  className: "venue_payment-section-3-bank-bic",
                  required: true,
                }}
              />
            </div>

            <div className="venue_payment-section-3-item">
              <span>Mã bưu điện</span>
              <FormInput
                name={"zip_code"}
                inputProps={{
                  placeholder: "Nhập mã bưu điện",
                }}
                formItemProps={{
                  className: "venue_payment-section-3-bank-number",
                  required: true,
                }}
              />
            </div>
          </Col>
          <Col span={11}>
            <div className="venue_payment-section-3-item">
              <span>Số tòa nhà/phòng</span>
              <FormInput
                name={"suite_number"}
                inputProps={{
                  placeholder: "Nhập số tòa nhà/phòng",
                }}
                formItemProps={{
                  className: "venue_payment-section-3-bank-code",
                  required: true,
                }}
              />
            </div>

            <div className="venue_payment-section-3-item">
              <span>Tỉnh/Thành phố</span>
              <FormInput
                name={"province"}
                inputProps={{
                  placeholder: "Nhập tên tỉnh/thành phố",
                }}
                formItemProps={{
                  className: "venue_payment-section-3-bank-nameAcc",
                  required: true,
                }}
              />
            </div>

            <div className="venue_payment-section-3-item">
              <span>Quốc gia</span>
              <FormInput
                name={"country"}
                inputProps={{
                  placeholder: "Nhập tên quốc gia",
                }}
                formItemProps={{
                  className: "venue_payment-section-3-bank-tax",
                  required: true,
                }}
              />
            </div>
          </Col>
        </Row>

        <h1 className="venue_payment-section-4-title">
          Thông tin người liên hệ
        </h1>
        <Row className="venue_payment-section-4">
          <Col span={11}>
            <div className="venue_payment-section-4-item">
              <span>Họ và tên</span>
              <FormInput
                name={"contact_name"}
                inputProps={{
                  placeholder: "Nhập họ và tên",
                }}
                formItemProps={{
                  className: "venue_payment-section-4-bank-name",
                  required: true,
                }}
              />
            </div>

            <div className="venue_payment-section-4-item">
              <span>Số điện thoại</span>
              <FormInput
                name={"phone_number"}
                inputProps={{
                  placeholder: "Nhập số điện thoại",
                }}
                formItemProps={{
                  className: "venue_payment-section-4-bank-bic",
                  required: true,
                }}
              />
            </div>
          </Col>
          <Col span={11}>
            <div className="venue_payment-section-4-item">
              <span>Địa chỉ email</span>
              <FormInput
                name={"email"}
                inputProps={{
                  placeholder: "Nhập địa chỉ email",
                }}
                formItemProps={{
                  className: "venue_payment-section-4-bank-code",
                  required: true,
                }}
              />
            </div>
          </Col>
        </Row>
      </FormWrap>
    </div>
  );
};
