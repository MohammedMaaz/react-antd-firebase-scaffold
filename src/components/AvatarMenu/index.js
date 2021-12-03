import { Avatar, Dropdown, Menu } from "antd";
import React, { useCallback } from "react";
import { useLang } from "../../hooks/useLang";
import AlertPopup from "../AlertPopup";
import {
  CaretDownOutlined,
  LoadingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { connect } from "dva";
import { logout } from "../../models/auth";
import avatar from "assets/images/avatar.png";

function AvatarMenu({ logoutLoading, logout, displayName }) {
  const [lang] = useLang();
  const onLogout = useCallback(() => {
    AlertPopup({
      title: lang("logout"),
      message: lang("logout_msg"),
      onOk: logout,
    });
  }, [logout, lang]);

  return (
    <Dropdown
      overlay={
        <Menu>
          <div style={{ padding: "8px 12px" }}>{displayName}</div>
          <Menu.Item
            key={"logout"}
            disabled={logoutLoading}
            onClick={onLogout}
            icon={logoutLoading ? <LoadingOutlined /> : <LogoutOutlined />}
            style={{ textTransform: "capitalize" }}
          >
            {lang("logout")}
          </Menu.Item>
        </Menu>
      }
      trigger={["click"]}
    >
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        <Avatar size="small" title={displayName} src={avatar} />
        <CaretDownOutlined style={{ marginLeft: 2 }} />
      </div>
    </Dropdown>
  );
}

export default connect(
  ({ auth }) => ({
    logoutLoading: auth.loading.logout,
    displayName: auth.user?.email,
  }),
  {
    logout,
  }
)(AvatarMenu);
