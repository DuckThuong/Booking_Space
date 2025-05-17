import { Menu } from "antd";
import { MenuProps } from "antd/lib";
import React from "react";
import { FooterWeb } from "../../LayoutOption/FooterWeb";
import { HeaderNavBar } from "../../LayoutOption/HeaderNavBar";
import "./style.scss";

type MenuItem = Required<MenuProps>["items"][number];
const Venue: React.FC = () => {
  const items: MenuItem[] = [
    {
      key: "1",
      icon: (
        <img src="https://img.icons8.com/windows/32/company.png" alt="space" />
      ),
      label: "Tổng quan",
    },
    {
      key: "2",
      icon: (
        <img src="https://img.icons8.com/small/32/company.png" alt="venue" />
      ),
      label: "Giới thiệu",
    },
  ];
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <div className="venue-layout">
      <HeaderNavBar isLogin={true} />
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["1"]}
        mode="inline"
        items={items}
      />
      <FooterWeb />
    </div>
  );
};

export default Venue;
