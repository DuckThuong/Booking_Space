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
  const [collapsed, setCollapsed] = useState(false);
  const [renderedContentKeys, setRenderedContentKeys] = useState<string[]>(
    Object.keys(contentSections)
  );
  const [lastClickedKey, setLastClickedKey] = useState<string | null>(null);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { md } = useBreakpoint();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.keyPath.length > 1) {
      const parentKey = e.keyPath[1];
      const filteredKeys = Object.keys(contentSections).filter((key) =>
        key.startsWith(parentKey + "-")
      );
      setRenderedContentKeys(filteredKeys);
    } else {
      setRenderedContentKeys(Object.keys(contentSections));
    }

    setLastClickedKey(e.key);
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
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisibleEntry = entries.reduce((max, entry) => {
          return entry.intersectionRatio > max.intersectionRatio ? entry : max;
        }, entries[0]);

        if (mostVisibleEntry && mostVisibleEntry.target.id) {
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
        }
      },
      {
        rootMargin: "-20% 0px -20% 0px",
        threshold: [0.5, 0.75],
      }
    );

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
        {Object.entries(contentSections)
          .filter(([key]) => renderedContentKeys.includes(key))
          .map(([key, content]) => (
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
