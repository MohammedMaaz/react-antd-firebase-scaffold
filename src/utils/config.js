import React from "react";
import {
  BarsOutlined,
  DashboardOutlined,
  DownloadOutlined,
  RiseOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";

export const authService = "mock"; //possible values: 'firebase', 'mock'

const PlaceholderPage = require("../components/PlaceholderPage").default;
//order of the rotues matter as they are rendered within the main 'Switch'
//component as they are ordered in the array
export const routes = [
  {
    title: (lang) => lang("menu_home"), //reqd for main-menu-item and sub-menu-item
    icon: DashboardOutlined,
    route: {
      //route config for react-router-dom
      path: "/", //if starts with a "/" then indicates an absolute path otherwise indicates a path relative to it's parent's path
      exact: true,
    },
    layoutType: "dashboard", //configure your own layout types in the Router.js file (default:'empty') (inherited by sub routes)
    authType: "only-authenticated", //authentication type, configure in Router.js file (default:'none') (inherited by sub routes)
    component: require("../pages/Home").default, //component to render in the designated layout's children (if no component is given, no route is created)
    menuItem: true, //should this route be showed in the nav bar as a menu item (NOT inherited by sub routes)
  },
  {
    title: (lang) => lang("menu_parent"),
    icon: BarsOutlined,
    route: {
      path: "/parent",
    },
    layoutType: "dashboard",
    authType: "only-authenticated",
    menuItem: true,
    subRoutes: [
      {
        title: (lang) => lang("menu_child") + " 1",
        icon: RiseOutlined,
        route: {
          path: "child1",
          exact: true,
        },
        layoutType: "dashboard",
        authType: "only-authenticated",
        component: () => <PlaceholderPage title="Child 1" />,
        menuItem: true,
      },
      {
        title: (lang) => lang("menu_child") + " 2",
        icon: DownloadOutlined,
        route: {
          path: "child2",
        },
        layoutType: "dashboard",
        authType: "only-authenticated",
        component: () => <PlaceholderPage title="Child 2" />,
        menuItem: true,
        subRoutes: [
          {
            title: (lang) => lang("menu_grand_child") + " 1",
            icon: ZoomInOutlined,
            route: {
              path: "grand-child1",
              exact: true,
            },
            layoutType: "dashboard",
            authType: "only-authenticated",
            component: () => <PlaceholderPage title="Grand Child 1" />,
            menuItem: true,
          },
          {
            title: (lang) => lang("menu_grand_child") + " 2",
            icon: ZoomOutOutlined,
            route: {
              path: "grand-child2",
              exact: true,
            },
            layoutType: "dashboard",
            authType: "only-authenticated",
            component: () => <PlaceholderPage title="Grand Child 2" />,
            menuItem: true,
          },
          {
            icon: DashboardOutlined,
            route: {
              path: "/users/:username",
              exact: true,
            },
            layoutType: "dashboard",
            authType: "only-authenticated",
            component: require("../pages/Users").default,
            menuItem: false,
          },
        ],
      },
    ],
  },
  {
    route: {
      path: "/login",
    },
    layoutType: "auth",
    authType: "only-unauthenticated",
    component: require("../pages/Login").default,
  },
  {
    route: {
      path: "/signup",
    },
    layoutType: "auth",
    authType: "only-unauthenticated",
    component: require("../pages/Signup").default,
  },
  {
    route: {
      path: "/",
    },
    component: require("../pages/404").default,
  },
];
