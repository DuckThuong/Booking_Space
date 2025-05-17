import React from "react";
import { FooterWeb } from "../../LayoutOption/FooterWeb";
import { HeaderNavBar } from "../../LayoutOption/HeaderNavBar";
import ScrollSpyLayout from "../../LayoutOption/ScrollSpyLayout";
import "./style.scss";
import { Space } from "./Space/SpaceList";

const Venue: React.FC = () => {
  const menuItems = [
    {
      key: "1",
      icon: (
        <img src="https://img.icons8.com/windows/32/company.png" alt="space" />
      ),
      label: "Không gian",
      children: [
        { key: "1-1", label: "Chi tiết" },
        { key: "1-2", label: "Khác" },
      ],
    },
    {
      key: "2",
      icon: (
        <img src="https://img.icons8.com/small/32/company.png" alt="venue" />
      ),
      label: "Địa điểm",
      children: [
        { key: "2-1", label: "Thông tin chi tiết" },
        { key: "2-2", label: "Thông tin khách" },
      ],
    },
  ];

  const contentSections = {
    "1-1": <Space />,
    "1-2": <Space />,
  };
  return (
    <div className="venue-layout">
      <HeaderNavBar isLogin={true} />
      <ScrollSpyLayout items={menuItems} contentSections={contentSections} />
      <FooterWeb />
    </div>
  );
};

export default Venue;
