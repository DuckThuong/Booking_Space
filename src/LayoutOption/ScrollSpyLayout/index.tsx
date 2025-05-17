// ScrollSpyLayout.tsx
import { Grid, Layout, Menu, theme, type MenuProps } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import React, { useEffect, useState } from "react";

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
  const [activeKey, setActiveKey] = useState<string>(items[0].key);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { md } = useBreakpoint();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const section = document.getElementById(e.key);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      const observer = new IntersectionObserver(() => {});
      observer.disconnect();
      setActiveKey(e.key);
      setTimeout(() => {
        const newObserver = new IntersectionObserver(
          (entries) => {
            const mostVisibleEntry = entries.reduce((max, entry) => {
              return entry.intersectionRatio > max.intersectionRatio
                ? entry
                : max;
            }, entries[0]);

            if (mostVisibleEntry && mostVisibleEntry.target.id) {
              setActiveKey(mostVisibleEntry.target.id);
            }
          },
          {
            rootMargin: "-50px 0px -40% 0px",
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
          }
        );

        Object.keys(contentSections).forEach((key) => {
          const element = document.getElementById(key);
          if (element) newObserver.observe(element);
        });
      }, 1000);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisibleEntry = entries.reduce((max, entry) => {
          return entry.intersectionRatio > max.intersectionRatio ? entry : max;
        }, entries[0]);

        if (mostVisibleEntry && mostVisibleEntry.target.id) {
          setActiveKey(mostVisibleEntry.target.id);
        }
      },
      {
        rootMargin: "-50px 0px -40% 0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    Object.keys(contentSections).forEach((key) => {
      const element = document.getElementById(key);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [contentSections]);

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

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={240}
        style={{
          background: colorBgContainer,
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={handleMenuClick}
          items={convertToMenuItems(items)}
          style={{
            height: "100%",
            borderRight: 0,
            paddingTop: "64px",
          }}
          theme="light"
        />
      </Sider>

      <Content
        style={{
          marginLeft: collapsed ? 80 : 240,
          transition: "margin 0.2s",
          padding: "24px",
        }}
      >
        {Object.entries(contentSections).map(([key, content]) => (
          <section
            key={key}
            id={key}
            style={{
              minHeight: "100vh",
              padding: "24px",
              background: colorBgContainer,
              marginBottom: "24px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              scrollMarginTop: "80px",
            }}
          >
            {content}
          </section>
        ))}
      </Content>
    </Layout>
  );
};

export default ScrollSpyLayout;
