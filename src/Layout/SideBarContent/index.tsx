import { Button, Col, Row } from "antd";
import FormWrap from "../../Components/Form/FormWrap";
import "./sideBar.scss";
export const SidebarContent = () => {
  return (
    <div className="side_bar">
      <FormWrap className="side_bar-form">
        <Row className="side_bar-form-row">
          <div className="side_bar-venue">
            <div className="side_bar-venue-item">
              <h2 className="side_bar-venue-name">Tên địa điểm</h2>
              <p className="side_bar-venue-address">Địa chỉ của địa điểm</p>
              <Row>
                <Col span={12}>
                  <Button className="side_bar-venue-btn" type="primary">
                    Xem chi tiết
                  </Button>
                </Col>
                <Col span={12}>
                  <Button className="side_bar-venue-btn" type="primary">
                    Địa điểm
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Row>
      </FormWrap>
    </div>
  );
};
