import { Col, Form, Row } from "antd";
import FormWrap from "../../../../Components/Form/FormWrap";
import { FormLinkInput } from "../../../../Components/Form/FormLinkInput";
import "./venueService.scss";
import { FormSelect } from "../../../../Components/Form/FormSelect";
import { FormInput } from "../../../../Components/Form/FormInput";

const parkOption = [
  {
    key: 1,
    value: "Bãi đậu xe miễn phí tại chỗ",
  },
  {
    key: 2,
    value: "Bãi đậu xe trả phí tại chỗ",
  },
  {
    key: 3,
    value: "Bãi đậu xe miễn phí tại khuôn viên",
  },
  {
    key: 4,
    value: "Bãi đậu xe trả phí tại khuôn viên",
  },
];
export const VenueService = () => {
  const [form] = Form.useForm();
  return (
    <div className="venue_service">
      <FormWrap form={form} className="venue_service-form">
        <Row className="venue_service-section-1">
          <h1 className="venue_service-section-1-title">Chi tiết địa điểm</h1>
          <p>
            Thêm thông tin chi tiết về địa điểm của bạn. Thông tin này sẽ xuất
            hiện trên Hồ sơ địa điểm của bạn.
          </p>
          <div className="venue_service-section-1-item">
            <Col span={11}>
              <p className="venue_service-section-1-item-title">
                Lời chào mừng
              </p>
              <FormLinkInput
                inputProps={{
                  placeholder: "Lời chào mừng tới địa điểm của bạn.",
                }}
                name={"welcome"}
              />
            </Col>
            <Col span={11}>
              <p className="venue_service-section-1-item-title">
                Thông tin đáp ứng
              </p>
              <FormLinkInput
                inputProps={{
                  placeholder: "Thông tin địa điểm của bạn",
                }}
                name={"info"}
              />
            </Col>
          </div>
        </Row>
        <Row className="venue_service-section-2">
          <h1 className="venue_service-section-2-title">Bãi đỗ xe</h1>
          <p>
            Cung cấp cho khách các lựa chọn đỗ xe tại địa điểm của bạn kèm theo
            mô tả và giá cả.
          </p>
          <span>Loại bãi đỗ xe</span>
          <FormSelect
            name={"park"}
            selectProps={{
              options: parkOption,
              className: "venue_service-section-park",
            }}
            formItemProps={{
              require: true,
            }}
          />
          <FormInput
            name={"park_detail"}
            inputProps={{
              placeholder: "Thông tin của bãi đỗ xe",
              className: "venue_service-section-parkDetail",
            }}
            formItemProps={{
              required: true,
            }}
          />
        </Row>
        <Row className="venue_service-section-3">
          <h1 className="venue_service-section-3-title">Bãi đỗ xe</h1>
          <p>
            Cung cấp cho khách các lựa chọn đỗ xe tại địa điểm của bạn kèm theo
            mô tả và giá cả.
          </p>
          <FormInput
            name={"wifi_detail"}
            inputProps={{
              placeholder: "Thông tin wifi",
              className: "venue_service-section-wifi-detail",
            }}
            formItemProps={{
              required: true,
            }}
          />
          <div className="venue_service-section-3-item">
            <Col span={11}>
              <FormInput
                name={"wifi_name"}
                inputProps={{
                  placeholder: "Tên Wifi",
                  className: "venue_service-section-wifi-name",
                }}
                formItemProps={{
                  required: true,
                }}
              />
            </Col>
            <Col span={11}>
              <FormInput
                name={"wifi_password"}
                inputProps={{
                  placeholder: "Mật khẩu Wifi",
                  className: "venue_service-section-wifi-password",
                }}
                formItemProps={{
                  required: true,
                }}
              />
            </Col>
          </div>
        </Row>
      </FormWrap>
    </div>
  );
};
