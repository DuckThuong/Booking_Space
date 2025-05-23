import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Col,
  Grid,
  Layout,
  Menu,
  Modal,
  Row,
  type MenuProps,
} from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { venueApi } from "../../api/api";
import { QUERY_KEY } from "../../api/apiConfig";
import "./scrollSpyLayout.scss";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { FooterWeb } from "../FooterWeb";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

interface ScrollSpyLayoutProps {
  items: MenuItem[];
  contentSections: Record<string, React.ReactNode>;
}

const ScrollSpyLayout: React.FC<ScrollSpyLayoutProps> = ({
  items,
  contentSections,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const venueId = location?.state?.venueId;
  const [modal, setModal] = useState<boolean>();
  const [collapsed, setCollapsed] = useState(false);
  const [renderedContentKeys, setRenderedContentKeys] = useState<string[]>(
    Object.keys(contentSections)
  );
  const [lastClickedKey, setLastClickedKey] = useState<string | null>(null);
  const { md } = useBreakpoint();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.keyPath.length > 1) {
      const parentKey = e.keyPath[1];
      const filteredKeys = Object.keys(contentSections).filter((key) =>
        key.startsWith(parentKey + "-")
      );
      setRenderedContentKeys(filteredKeys);
      setLastClickedKey(e.key);
    } else {
      const filteredKeys = Object.keys(contentSections).filter((key) =>
        key.startsWith(e.key + "-")
      );
      if (filteredKeys.length > 0) {
        setRenderedContentKeys(filteredKeys);
        setLastClickedKey(filteredKeys[0]);
      } else {
        setRenderedContentKeys(Object.keys(contentSections));
        setLastClickedKey(e.key);
      }
    }
    if (e.keyPath[1] === "2") {
      localStorage.removeItem("spaceId");
    }
  };

  useEffect(() => {
    if (lastClickedKey && renderedContentKeys.includes(lastClickedKey)) {
      const section = document.getElementById(lastClickedKey);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    setLastClickedKey(null);
  }, [lastClickedKey, renderedContentKeys]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {}, {
      rootMargin: "-20% 0px -20% 0px",
      threshold: [0.5, 0.75],
    });

    renderedContentKeys.forEach((key) => {
      const element = document.getElementById(key);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [renderedContentKeys, items]);

  useEffect(() => {
    setCollapsed(!md);
  }, [md]);

  const convertToMenuItems = (items: MenuItem[]): MenuItemType[] => {
    return items.map((item) => ({
      key: item.key,
      icon: item.icon,
      label: item.label,
      children: item.children?.map((child) => ({
        key: child.key,
        label: child.label,
      })),
    }));
  };

  const { data: venueData } = useQuery({
    queryKey: [QUERY_KEY.GET_VENUE, venueId],
    queryFn: () => venueApi.getVenueById(venueId),
  });

  const { data: venueItem } = useQuery({
    queryKey: [QUERY_KEY.GET_VENUE],
    queryFn: () => venueApi.getVenueByUser(),
  });

  return (
    <Layout hasSider className="scroll-spy-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={380}
        className="scroll-spy-layout__sider"
      >
        <div className="scroll-spy-layout_venue">
          <Col span={24}>
            <h2 className="scroll-spy-layout_venue-item">{venueData?.name}</h2>
            <p className="scroll-spy-layout_venue-item">
              {venueData?.description}
            </p>
            <div className="scroll-spy-layout_venue-option">
              <Col span={12}>
                <Button
                  onClick={() => {
                    navigate(CUSTOMER_ROUTER_PATH.VENUE_VIEW, {
                      state: venueData?.venueTypeId,
                    });
                  }}
                >
                  Xem chi tiết
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  Chọn địa điểm khác
                </Button>
              </Col>
            </div>
          </Col>
        </div>

        <Menu
          mode="inline"
          onClick={handleMenuClick}
          items={convertToMenuItems(items)}
          className="scroll-spy-layout__menu"
          theme="light"
          defaultOpenKeys={
            location?.state?.defaultOpen
              ? [location?.state?.defaultOpen]
              : ["1"]
          }
          selectedKeys={
            location?.state?.defaultOpen
              ? [location?.state?.defaultOpen + "-1"]
              : ["1-1"]
          }
        />
      </Sider>

      <Content
        className={`scroll-spy-layout__content ${
          collapsed
            ? "scroll-spy-layout__content--collapsed"
            : "scroll-spy-layout__content--expanded"
        }`}
      >
        {Object.entries(contentSections)
          .filter(([key]) => renderedContentKeys.includes(key))
          .map(([key, content]) => (
            <div key={key} className="scroll-spy-layout__option-container">
              <section id={key} className="scroll-spy-layout__section">
                {content}
              </section>
            </div>
          ))}
        <Modal
          onCancel={() => {
            setModal(false);
          }}
          className="modal_venue"
          open={modal}
          title={"Địa điểm của bạn"}
          footer={false}
        >
          {Array.isArray(venueItem) && venueItem.length > 0 ? (
            venueItem.map((venue: any) => (
              <Row key={venue.id} className="modal_venue-item">
                <Col className="modal_venue-image" span={4}>
                  <img
                    src={venue.logoUrl}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col span={18} className="modal_venue-info">
                  <h3 className="modal_venue-info-header">{venue.name}</h3>
                  <p className="modal_venue-info-title">{venue.description}</p>
                  <div className="modal_venue-info-button">
                    <Col className="option_button" span={12}>
                      <Button>Xem chi tiết</Button>
                    </Col>
                    <Col className="option_button" span={12}>
                      <Button disabled>Thêm mới</Button>
                    </Col>
                  </div>
                </Col>
              </Row>
            ))
          ) : (
            <div>Không có địa điểm nào</div>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default ScrollSpyLayout;
