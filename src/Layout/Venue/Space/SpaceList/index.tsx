import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, CollapseProps, Image, Row, Steps } from "antd";
import { useState } from "react";
import { FormSelect } from "../../../../Components/Form/FormSelect";
import FormWrap from "../../../../Components/Form/FormWrap";
import "./space.scss";

export const Space = () => {
  const [current, setCurrent] = useState(0);
  const spaceByDayItem = [1, 2, 3];
  const spaceByMonthItem = [1, 2, 3];

  const onChange = (value: number) => {
    setCurrent(value);
  };

  const onClickSpaceDetail = (key: string | string[]) => {
    console.log(key);
  };

  const genExtra = () => (
    <Button
      onClick={(event) => {
        event.stopPropagation();
      }}
      icon={<PlusOutlined />}
    >
      Thêm không gian
    </Button>
  );

  const spaceStep: {
    title: string;
    description: string;
  }[] = [
    {
      title: "Hoàn thiện thông tin",
      description: "Hoàn thiện thông tin cho không gian của bạn.",
    },
    {
      title: "Đăng ký thông tin",
      description: "Đăng ký thông tin cho không gian của bạn.",
    },
    {
      title: "Đăng ký thời gian",
      description: "Đăng ký thời gian cho thuê không gian của bạn.",
    },
  ];

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: `Không gian cho thuê theo ngày ( ${spaceByDayItem.length} )`,
      children: (
        <div className="space_detail">
          {spaceByDayItem.map((item, index) => (
            <Row className="space_detail-row">
              <Col span={4} className="space_detail-col">
                <Image
                  className="space_detail-item-image"
                  src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png"
                />
              </Col>
              <Col span={8} className="space_detail-col">
                <h3 className="space_detail-item-name">Tên địa điểm</h3>
                <p className="space_detail-item-detail">
                  Thông tin tiêu biểu về địa điểm
                </p>
              </Col>
              <Col span={6} className="space_detail-col">
                <h3 className="space_detail-item-name">Giá tiền / tháng</h3>
                <p className="space_detail-item-detail">Thời lượng thuê</p>
              </Col>
              <Col span={4} className="space_detail-col">
                <FormSelect
                  name={"itemStatus"}
                  selectProps={{
                    className: "space_detail-item-status",
                    defaultValue: "Ẩn",
                    value: "Ẩn",
                    options: [
                      {
                        key: 1,
                        value: "Ẩn",
                      },
                      {
                        key: 1,
                        value: "Đang thuê",
                      },
                      {
                        key: 1,
                        value: "Sẵn sàng",
                      },
                    ],
                  }}
                />
              </Col>
              <Col span={2} className="space_detail-col">
                <Button
                  className="space_detail-item-setup"
                  icon={<EllipsisOutlined />}
                />
              </Col>
            </Row>
          ))}
        </div>
      ),
      extra: genExtra(),
    },
    {
      key: "2",
      label: `Không gian cho thuê theo tháng ( ${spaceByMonthItem.length} )`,
      children: (
        <div className="space_detail">
          {spaceByMonthItem.map((item, index) => (
            <Row className="space_detail-row">
              <Col span={4} className="space_detail-col">
                <Image
                  className="space_detail-item-image"
                  src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png"
                />
              </Col>
              <Col span={8} className="space_detail-col">
                <h3 className="space_detail-item-name">Tên địa điểm</h3>
                <p className="space_detail-item-detail">
                  Thông tin tiêu biểu về địa điểm
                </p>
              </Col>
              <Col span={6} className="space_detail-col">
                <h3 className="space_detail-item-name">Giá tiền / tháng</h3>
                <p className="space_detail-item-detail">Thời lượng thuê</p>
              </Col>
              <Col span={4} className="space_detail-col">
                <FormSelect
                  name={"itemStatus"}
                  selectProps={{
                    className: "space_detail-item-status",
                    defaultValue: "Ẩn",
                    value: "Ẩn",
                    options: [
                      {
                        key: 1,
                        value: "Ẩn",
                      },
                      {
                        key: 1,
                        value: "Đang thuê",
                      },
                      {
                        key: 1,
                        value: "Sẵn sàng",
                      },
                    ],
                  }}
                />
              </Col>
              <Col span={2} className="space_detail-col">
                <Button
                  className="space_detail-item-setup"
                  icon={<EllipsisOutlined />}
                />
              </Col>
            </Row>
          ))}
        </div>
      ),
      extra: genExtra(),
    },
  ];

  return (
    <div className="space">
      <FormWrap className="space-form">
        <Row className="space-row">
          <div className="space-step">
            <Steps
              type="navigation"
              size="small"
              current={current}
              onChange={onChange}
              className="space-step_navigation"
              items={spaceStep}
            />
            <div className="space-step_detail">
              <Col span={20} className="space-step_detail-title">
                <h3>{spaceStep[current].title}</h3>
                <span>{spaceStep[current].description}</span>
              </Col>
              <Col span={4} className="space-step_detail-action">
                <Button>Tiến hành</Button>
              </Col>
            </div>
          </div>
        </Row>

        <Row className="space-row">
          <div className="space-row_item">
            <Collapse
              defaultActiveKey={["1"]}
              onChange={onClickSpaceDetail}
              expandIconPosition={"end"}
              items={items}
            />
          </div>
        </Row>
      </FormWrap>
    </div>
  );
};
