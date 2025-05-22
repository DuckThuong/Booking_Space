import { Button, Col, Form, Image, Row } from "antd";
import FormWrap from "../../../../Components/Form/FormWrap";
import { FormSelect } from "../../../../Components/Form/FormSelect";
import { FormInput } from "../../../../Components/Form/FormInput";
import "./spaceDetail.scss";
import TextArea from "antd/es/input/TextArea";
export const SpaceDetail = () => {
  const id = localStorage.getItem("spaceId");
  return (
    <div className="space_detail">
      <FormWrap className="space_detail-form">
        <Row className="space_detail-section-1">
          <Col span={16} className="space_detail-section-col">
            <FormSelect
              name={"state"}
              selectProps={{
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
          <Col span={7} className="space_detail-section-col">
            <span className="space_detail-section-1-title">
              Cập nhật lần cuối vào: May 16, 2:45 PM
            </span>
            <Button className="space_detail-section-1-preview">
              Xem chi tiết
            </Button>
            <Button className="space_detail-section-1-save">Lưu</Button>
          </Col>
        </Row>
        <Row className="space_detail-section-2">
          <h1 className="space_detail-section-2-header">Thông tin cơ bản</h1>
          <Col span={12} className="space_detail-section-col">
            <p className="space_detail-section-2-text">
              Hãy cho mọi người biết về không gian đang cho thuê của bạn.
            </p>
            <div className="space_detail-section-2-wrap">
              <p className="space_detail-section-2-title">Tên không gian</p>
              <FormInput
                name={"name"}
                formItemProps={{
                  className: "space_detail-section-2-name",
                  required: true,
                }}
              />
            </div>
            <div className="space_detail-section-2-wrapRow">
              <Col span={6}>
                <p className="space_detail-section-title">Thời gian thuê</p>
                <FormSelect
                  name={"time"}
                  selectProps={{
                    options: [
                      {
                        key: 1,
                        value: "Theo ngày",
                      },
                      {
                        key: 2,
                        value: "Theo tuần",
                      },
                      {
                        key: 3,
                        value: "Theo tháng",
                      },
                    ],
                  }}
                  formItemProps={{
                    className: "space_detail-section-2-wrapRow-item",
                    require: true,
                  }}
                />
              </Col>
              <Col span={6}>
                <p className="space_detail-section-title">Loại hình thuê</p>
                <FormSelect
                  name={"type"}
                  selectProps={{
                    options: [
                      {
                        key: 1,
                        value: "Theo ngày",
                      },
                      {
                        key: 2,
                        value: "Theo tuần",
                      },
                      {
                        key: 3,
                        value: "Theo tháng",
                      },
                    ],
                  }}
                  formItemProps={{
                    className: "space_detail-section-2-wrapRow-item",
                    require: true,
                  }}
                />
              </Col>
              <Col span={6}>
                <p className="space_detail-section-title">Dung lượng thuê</p>
                <FormInput
                  name={"quantity"}
                  formItemProps={{
                    className: "space_detail-section-2-wrapRow-item",
                    required: true,
                  }}
                />
              </Col>
            </div>
            <div className="space_detail-section-2-wrap">
              <p className="space_detail-section-2-title">Mô tả không gian.</p>
              <Form.Item name={"detail"}>
                <TextArea
                  className="space_detail-section-2-detail"
                  placeholder=""
                ></TextArea>
              </Form.Item>
            </div>
          </Col>
          <Col span={12} className="space_detail-section-col">
            <Image
              preview={false}
              width={550}
              src="https://res.cloudinary.com/mobilecloud/image/upload/v1747880166/image_sxe797.png"
            />
          </Col>
        </Row>
        <Row className="space_detail-section-3"></Row>
      </FormWrap>
    </div>
  );
};
