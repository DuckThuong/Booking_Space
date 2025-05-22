import React, { useEffect, useState } from "react";
import { HeaderNavBar } from "../../LayoutOption/HeaderNavBar";
import ScrollSpyLayout from "../../LayoutOption/ScrollSpyLayout";
import { ForgotEditPassword } from "../ForgotPassword/ForgotEditPassword";
import { ForgotEmailInput } from "../ForgotPassword/ForgotEmailInput";
import { SpaceDetail } from "./Space/SpaceDetail";
import { SpaceImage } from "./Space/SpaceImage";
import { Space } from "./Space/SpaceList";
import { SpacePrice } from "./Space/SpacePrice";
import { SpaceService } from "./Space/SpaceService";
import "./style.scss";

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState<string | null>(localStorage.getItem(key));

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        setValue(e.newValue);
      }
    };

    const checkStorage = () => {
      const newValue = localStorage.getItem(key);
      if (newValue !== value) {
        setValue(newValue);
      }
    };

    const interval = setInterval(checkStorage, 100);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, value]);

  return value;
};

const Venue: React.FC = () => {
  const spaceId = useLocalStorage("spaceId");
  const [isDetail, setIsDetail] = useState<boolean>(!!spaceId);

  useEffect(() => {
    setIsDetail(!!spaceId);
  }, [spaceId]);

  const menuItems = [
    {
      key: "1",
      icon: (
        <img src="https://img.icons8.com/windows/32/company.png" alt="space" />
      ),
      label: "Không gian",
      children: [
        ...(isDetail
          ? [
              { key: "1-2", label: "Thông tin" },
              { key: "1-3", label: "Ảnh" },
              { key: "1-4", label: "Giá" },
              { key: "1-5", label: "Dịch vụ" },
            ]
          : [{ key: "1-1", label: "Không gian" }]),
      ],
    },
    {
      key: "2",
      icon: (
        <img src="https://img.icons8.com/small/32/company.png" alt="venue" />
      ),
      label: "Địa điểm",
      children: [
        { key: "2-1", label: "Thông tin" },
        { key: "2-2", label: "Ghi chú" },
        { key: "2-3", label: "Giờ thuê" },
        { key: "2-4", label: "Thanh toán" },
      ],
    },
  ];

  const contentSections = {
    ...(isDetail
      ? {
          "1-2": <SpaceDetail />,
          "1-3": <SpaceImage />,
          "1-4": <SpacePrice />,
          "1-5": <SpaceService />,
        }
      : {
          "1-1": (
            <Space
              setSpaceId={(id: string) => localStorage.setItem("spaceId", id)}
            />
          ),
        }),
    "2-1": <ForgotEditPassword />,
    "2-2": <ForgotEmailInput />,
  };
  return (
    <div className="venue-layout">
      <HeaderNavBar isLogin={true} />
      <ScrollSpyLayout items={menuItems} contentSections={contentSections} />
    </div>
  );
};

export default Venue;
