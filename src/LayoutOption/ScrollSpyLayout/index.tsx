import { Grid, Layout, Menu, theme, type MenuProps } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import React, { useEffect, useState } from "react";
import "./scrollSpyLayout.scss";

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
  const [openKeys, setOpenKeys] = useState<string[]>([]);
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
              const findParentKey = (
                items: MenuItem[],
                targetKey: string
              ): string | undefined => {
                for (const item of items) {
                  if (item.children?.some((child) => child.key === targetKey)) {
                    return item.key;
                  }
                }
                return undefined;
              };
              const parentKey = findParentKey(
                items,
                mostVisibleEntry.target.id
              );
              if (parentKey) {
                setOpenKeys([parentKey]);
              }
            }
          },
          {
            rootMargin: "-20% 0px -20% 0px",
            threshold: [0.5, 0.75],
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
          const findParentKey = (
            items: MenuItem[],
            targetKey: string
          ): string | undefined => {
            for (const item of items) {
              if (item.children?.some((child) => child.key === targetKey)) {
                return item.key;
              }
            }
            return undefined;
          };
          const parentKey = findParentKey(items, mostVisibleEntry.target.id);
          if (parentKey) {
            setOpenKeys([parentKey]);
          }
        }
      },
      {
        rootMargin: "-20% 0px -20% 0px",
        threshold: [0.5, 0.75],
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
    <Layout hasSider className="scroll-spy-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={240}
        className="scroll-spy-layout__sider"
      >
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          onClick={handleMenuClick}
          items={convertToMenuItems(items)}
          className="scroll-spy-layout__menu"
          theme="light"
        />
      </Sider>

      <Content
        className={`scroll-spy-layout__content ${
          collapsed
            ? "scroll-spy-layout__content--collapsed"
            : "scroll-spy-layout__content--expanded"
        }`}
      >
        {Object.entries(contentSections).map(([key, content]) => (
          <div key={key} className="scroll-spy-layout__option-container">
            <section id={key} className="scroll-spy-layout__section">
              {content}
            </section>
          </div>
        ))}
      </Content>
    </Layout>
  );
};

export default ScrollSpyLayout;
