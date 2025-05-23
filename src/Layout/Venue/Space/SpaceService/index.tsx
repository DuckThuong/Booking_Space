import { PrinterOutlined, ShopOutlined, WifiOutlined } from "@ant-design/icons";
import { Row } from "antd";
import { useState } from "react";
import { Amenities } from "../../../../api/itemApi";
import FormWrap from "../../../../Components/Form/FormWrap";
import TableWrap from "../../../../Components/TableWrap";
import AmenitiesList from "./ServiceBadgle";
import "./spaceService.scss";

export const SpaceService = () => {
  const [amenities, setAmenities] = useState<Amenities[]>([
    { id: 1, name: "Kết nối Wi-Fi", selected: false, icon: <WifiOutlined /> },
    {
      id: 2,
      name: "Tiện nghi cho khách thuê",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/accessibility2.png"
          alt="accessibility2"
        />
      ),
    },
    {
      id: 3,
      name: "Khu vực đỗ xe",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/parking.png"
          alt="parking"
        />
      ),
    },
    {
      id: 4,
      name: "Dịch vụ ăn uống tại chỗ",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/material-outlined/50/restaurant-on-site.png"
          alt="restaurant-on-site"
        />
      ),
    },
    {
      id: 5,
      name: "Phòng trà/Cà phê",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/coffee--v1.png"
          alt="coffee--v1"
        />
      ),
    },
    {
      id: 6,
      name: "Nước uống miễn phí",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/drinking-fountain.png"
          alt="drinking-fountain"
        />
      ),
    },
    {
      id: 7,
      name: "Dịch vụ tổ chức tiệc",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/dancing-party.png"
          alt="dancing-party"
        />
      ),
    },
    {
      id: 8,
      name: "Khu vực bếp",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/kitchen-room.png"
          alt="kitchen-room"
        />
      ),
    },
    {
      id: 9,
      name: "Dịch vụ công chứng tại chỗ",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/dotty/80/self-service-kiosk.png"
          alt="self-service-kiosk"
        />
      ),
    },
    {
      id: 10,
      name: "Nhà hàng trong khuôn viên",
      selected: false,
      icon: <ShopOutlined />,
    },
    {
      id: 11,
      name: "Chấp nhận thú cưng",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/pet.png"
          alt="pet"
        />
      ),
    },
    {
      id: 12,
      name: "Dịch vụ in ấn và photocopy",
      selected: false,
      icon: <PrinterOutlined />,
    },
    {
      id: 13,
      name: "Phòng tắm riêng",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/bath.png"
          alt="bath"
        />
      ),
    },
    {
      id: 14,
      name: "Hệ thống khóa an toàn",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/lock--v1.png"
          alt="lock--v1"
        />
      ),
    },
    {
      id: 15,
      name: "Dịch vụ quay phim chuyên nghiệp",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/dotty/80/camcorder.png"
          alt="camcorder"
        />
      ),
    },
    {
      id: 16,
      name: "Điện thoại liên lạc nội bộ",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/phone--v1.png"
          alt="phone--v1"
        />
      ),
    },
    {
      id: 17,
      name: "Máy chiếu chuyên nghiệp",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/video-projector.png"
          alt="video-projector"
        />
      ),
    },
    {
      id: 18,
      name: "Hệ thống màn hình hiển thị",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/tv.png"
          alt="tv"
        />
      ),
    },
    {
      id: 19,
      name: "Phòng họp truyền hình",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/video-conference.png"
          alt="video-conference"
        />
      ),
    },
    {
      id: 20,
      name: "Bảng tương tác thông minh",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios/50/interactive-whiteboard.png"
          alt="interactive-whiteboard"
        />
      ),
    },
    {
      id: 21,
      name: "Màn hình LED lớn",
      selected: false,
      icon: (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/dotty/80/luminaria-led.png"
          alt="luminaria-led"
        />
      ),
    },
  ]);

  const tableHeader = {
    columns: [
      {
        title: "Tiện nghi",
        dataIndex: "icon",
        key: "icon",
        width: "10%",
        render: (icon: React.ReactNode) => icon,
      },
      {
        title: "",
        dataIndex: "name",
        key: "name",
        width: "20%",
      },
      {
        title: "Khả dụng",
        dataIndex: "available",
        key: "available",
        width: "10%",
        render: () => "Đã bao gồm",
      },
      {
        title: "Phí",
        dataIndex: "price",
        key: "price",
        width: "10%",
        render: () => "Miễn phí",
      },
      {
        title: "Chi tiết",
        dataIndex: "detail",
        key: "detail",
        width: "50%",
        render: () => "Chi tiết",
      },
    ],
  };

  return (
    <div className="space_service">
      <FormWrap className="space_service-form">
        <h1 className="space_service-header">
          Quản lý dịch vụ và tiện ích
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/pastel-glyph/64/information--v1.png"
            alt="information--v1"
            style={{ marginInlineStart: 8 }}
          />
        </h1>
        <Row className="space_service-section-1">
          <p className="space_service-section-title">
            Vui lòng chọn các tiện ích có sẵn cho không gian của bạn
          </p>
          <AmenitiesList amenities={amenities} onAmenityChange={setAmenities} />
        </Row>
        <Row className="space_service-section-2">
          <p className="space_service-section-title">
            Danh sách tiện ích đã được chọn cho không gian của bạn
          </p>
          <TableWrap
            setSize={() => {}}
            isScroll={true}
            isHidePagination={true}
            tableProps={{
              dataSource: amenities.filter((item) => item.selected),
              columns: tableHeader.columns,
              scroll: {
                y: 300,
              },
            }}
          />
        </Row>
      </FormWrap>
    </div>
  );
};
