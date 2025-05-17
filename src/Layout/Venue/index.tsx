import { Col, Row } from "antd";
import { SidebarContent } from "../../LayoutOption/SideBarContent";
import { HeaderNavBar } from "../../LayoutOption/HeaderNavBar";
import "./style.scss";
import { VenueRouter } from "./venueRouter";
import { useState } from "react";
import { FooterWeb } from "../../LayoutOption/FooterWeb";
export const Venue = () => {
  const [currentTab, setCurrentTab] = useState<string>("1");
  const handleTabChange = (key: string) => {
    setCurrentTab(key);
  };
  return (
    <div className="venue">
      <HeaderNavBar isLogin={true} />
      <Row style={{ height: "100vh" }}>
        <Col span={6}>
          <SidebarContent onTabChange={handleTabChange} />
        </Col>
        <Col span={18}>
          <VenueRouter tabKey={currentTab} />
        </Col>
      </Row>
      <FooterWeb />
    </div>
  );
};
