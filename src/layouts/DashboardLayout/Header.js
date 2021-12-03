import React from "react";
import { Layout } from "antd";
import ThemeChanger from "../../components/ThemeChanger";
import LangChanger from "../../components/LangChanger";
import Notifications from "../../components/Notifications";
import AvatarMenu from "../../components/AvatarMenu";

const { Header: AntdHeader } = Layout;

function Header() {
  return (
    <AntdHeader
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        background: "unset",
        paddingRight: 32,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}></div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <LangChanger style={{ marginRight: 20 }} />
        <ThemeChanger style={{ marginRight: 20 }} />
        <Notifications count={0} />
        <AvatarMenu />
      </div>
    </AntdHeader>
  );
}

export default Header;
