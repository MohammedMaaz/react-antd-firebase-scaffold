import React, { useCallback } from "react";
import { Menu } from "antd";
import { routes } from "../../utils/config";
import { Link, useLocation, matchPath } from "react-router-dom";
import { connect } from "dva";
import { getRoutePath } from "../../utils";
import { useLang } from "../../hooks/useLang";
const { SubMenu } = Menu;

function getParentKeys(key, arr = []) {
  const lastDot = key.lastIndexOf(".");
  if (lastDot === -1) return arr;

  key = key.slice(0, lastDot);
  arr.push(key);
  return getParentKeys(key, arr);
}

export default connect(({ router }) => ({ cr: router.computedRoutes }))(
  function MainMenu({ cr, height }) {
    const [lang] = useLang();

    const menuRenderer = useCallback(
      (routes, prefix = "", basePath = "") => {
        return routes.map((route, i) => {
          if (!route.menuItem) return null;

          const path = getRoutePath(basePath, route.route?.path || "");
          const title =
            typeof route.title === "function" ? route.title(lang) : route.title;

          if (route.subRoutes) {
            return (
              <SubMenu key={prefix + i} icon={<route.icon />} title={title}>
                {menuRenderer(route.subRoutes, prefix + i + ".", path)}
              </SubMenu>
            );
          }

          return (
            <Menu.Item icon={<route.icon />} key={prefix + i}>
              <Link to={path}>{title}</Link>
            </Menu.Item>
          );
        });
      },
      [lang]
    );

    const pathname = useLocation().pathname;
    const selectedKey = cr.find((r) => matchPath(pathname, r.route)).key;

    return (
      <Menu
        style={{ height }}
        defaultOpenKeys={getParentKeys(selectedKey)}
        selectedKeys={[selectedKey]}
        mode="inline"
        theme="dark"
      >
        {menuRenderer(routes)}
      </Menu>
    );
  }
);
