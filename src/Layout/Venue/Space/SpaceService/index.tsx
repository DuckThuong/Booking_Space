import { Row } from "antd";
import FormWrap from "../../../../Components/Form/FormWrap";
import "./spaceService.scss";
import AmenitiesList from "./ServiceBadgle";
import { useState } from "react";
import {
  WifiOutlined,
  TeamOutlined,
  CarOutlined,
  CoffeeOutlined,
  DropboxOutlined,
  FireOutlined,
  GiftOutlined,
  HomeOutlined,
  FileTextOutlined,
  ShopOutlined,
  HeartOutlined,
  PrinterOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { Amenities } from "../../../../api/itemApi";
import TableWrap from "../../../../Components/TableWrap";

export const SpaceService = () => {
  const [amenities, setAmenities] = useState<Amenities[]>([
    { id: 1, name: "Wi-Fi", selected: false, icon: <WifiOutlined /> },
    {
      id: 2,
      name: "Khả năng tiếp cận",
      selected: false,
      icon: <TeamOutlined />,
    },
    { id: 3, name: "Giá để xe đạp", selected: false, icon: <CarOutlined /> },
    {
      id: 4,
      name: "Dịch vụ ăn uống",
      selected: false,
      icon: <CoffeeOutlined />,
    },
    { id: 5, name: "Cà phê/Trà", selected: false, icon: <DropboxOutlined /> },
    { id: 6, name: "Nước lọc", selected: false, icon: <FireOutlined /> },
    {
      id: 7,
      name: "Tiệc chiều đài được tổ chức",
      selected: false,
      icon: <GiftOutlined />,
    },
    { id: 8, name: "Phòng bếp", selected: false, icon: <HomeOutlined /> },
    {
      id: 9,
      name: "Dịch vụ công chứng",
      selected: false,
      icon: <FileTextOutlined />,
    },
    {
      id: 10,
      name: "Nhà hàng tại chỗ",
      selected: false,
      icon: <ShopOutlined />,
    },
    {
      id: 11,
      name: "Thân thiện với vật nuôi",
      selected: false,
      icon: <HeartOutlined />,
    },
    {
      id: 12,
      name: "In/Quét/Sao chép",
      selected: false,
      icon: <PrinterOutlined />,
    },
    { id: 13, name: "Vòi sen", selected: false, icon: <ToolOutlined /> },
    { id: 14, name: "Khóa cửa", selected: false, icon: <WifiOutlined /> },
    {
      id: 15,
      name: "Quay phim",
      selected: false,
      icon: <TeamOutlined />,
    },
    { id: 16, name: "Điện thoại", selected: false, icon: <CarOutlined /> },
    {
      id: 17,
      name: "Máy chiếu",
      selected: false,
      icon: <CoffeeOutlined />,
    },
    {
      id: 18,
      name: "Tivi / Màn hình",
      selected: false,
      icon: <DropboxOutlined />,
    },
    {
      id: 19,
      name: "Hội nghị / Truyền hình",
      selected: false,
      icon: <FireOutlined />,
    },
    {
      id: 20,
      name: "Bảng / Panel",
      selected: false,
      icon: <GiftOutlined />,
    },
    { id: 21, name: "Màn hình lớn", selected: false, icon: <HomeOutlined /> },
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
        <h1 className="space_service-header">Dịch vụ và tiện ích</h1>
        <Row className="space_service-section-1">
          <p className="space_service-section-title">
            Chọn các tiện ích cho không gian của bạn.
          </p>
          <AmenitiesList amenities={amenities} onAmenityChange={setAmenities} />
        </Row>
        <Row className="space_service-section-2">
          <p className="space_service-section-title">
            Các tiện nghi được cung cấp trong không gian của bạn
          </p>
          <TableWrap
            setSize={() => {}}
            tableProps={{
              dataSource: amenities.filter((item) => item.selected),
              columns: tableHeader.columns,
            }}
          />
        </Row>
      </FormWrap>
    </div>
  );
};
