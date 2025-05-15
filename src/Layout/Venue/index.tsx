import { Col, Row } from "antd";
import { SidebarContent } from "../SideBarContent";
import { HeaderNavBar } from "../../LayoutOption/HeaderNavBar";
import "./style.scss";
export const Venue = () => {
  return (
    <div className="venue">
      <HeaderNavBar isLogin={true} />
      <Row style={{ height: "100vh" }}>
        <Col span={6}>
          <SidebarContent />
        </Col>
        <Col span={18}>Venue</Col>
      </Row>
    </div>
  );
};
