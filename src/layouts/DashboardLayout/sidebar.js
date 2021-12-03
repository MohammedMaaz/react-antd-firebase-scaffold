import React from "react";
import { Layout, Drawer } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import MainMenu from "./MainMenu";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Text from "antd/lib/typography/Text";

const { Sider } = Layout;

function Logo({ height, collapsed }) {
  return (
    <Link
      style={{
        height,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
      to="/"
    >
      <img
        alt="site-logo"
        src={logo}
        style={{
          width: 30,
          marginRight: 10,
          marginLeft: 25,
        }}
      />
      <Text
        style={{
          fontSize: 22,
          color: "#fff",
          opacity: collapsed ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      >
        Logotext
      </Text>
    </Link>
  );
}

function ToggleButton({ collapsed, toggleCollapsed, height }) {
  const Icon = collapsed ? RightOutlined : LeftOutlined;
  return (
    <div
      style={{
        borderTop: "1px solid rgba(255,255,255,0.2)",
        width: "100%",
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "flex-end",
      }}
    >
      <Icon
        style={{
          color: "#fff",
          fontSize: 18,
          marginRight: collapsed ? 0 : "16px",
        }}
        onClick={toggleCollapsed}
      />
    </div>
  );
}

export default function Sidebar({ collapsed, toggleCollapsed }) {
  return (
    <>
      <Sider collapsed={collapsed} width={200} className="hide-on-xs">
        <Logo height={68} collapsed={collapsed} />
        <MainMenu height="calc(100% - 108px)" />
        <ToggleButton
          height={40}
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
        />
      </Sider>
      <Drawer
        placement={"left"}
        closable={false}
        onClose={toggleCollapsed}
        visible={!collapsed}
        bodyStyle={{ padding: 0 }}
        headerStyle={{ display: "none " }}
        className={"show-on-xs"}
      >
        <MainMenu />
      </Drawer>
    </>
  );
}
