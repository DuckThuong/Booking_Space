import { Button, Col, Menu, Row } from "antd";
import { MenuProps } from "antd/lib";
import { useState } from "react";
import FormWrap from "../../Components/Form/FormWrap";
import "./sideBar.scss";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: (
      <img
        width="32"
        height="32"
        src="https://img.icons8.com/windows/32/company.png"
        alt="company"
      />
    ),
    label: "Địa điểm",
  },
  {
    key: "2",
    icon: (
      <img
        width="32"
        height="32"
        src="https://img.icons8.com/small/32/company.png"
        alt="company"
      />
    ),
    label: "Chỉnh sửa địa điểm",
    children: [
      { key: "11", label: "Thông tin chi tiết" },
      { key: "12", label: "Thông tin khách" },
      { key: "13", label: "Chính sách" },
      { key: "14", label: "Giờ thuê" },
    ],
  },
];

interface SideBarHeaderProps {
  onTabChange?: (key: string) => void | undefined;
}

export const SidebarContent: React.FC<SideBarHeaderProps> = ({
  onTabChange,
}) => {
  const [stateOpenKeys, setStateOpenKeys] = useState(["2"]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["11"]);

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    if (currentOpenKey === "2") {
      setSelectedKeys(["11"]);
    }
    setStateOpenKeys(openKeys);
  };

  const onSelect: MenuProps["onSelect"] = ({ key }) => {
    setSelectedKeys([key]);
    if (onTabChange) {
      onTabChange(key);
    }
  };

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
        <div className="side_bar-menu">
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            onSelect={onSelect}
            style={{ width: 256 }}
            items={items}
          />
        </div>
      </FormWrap>
    </div>
  );
};
