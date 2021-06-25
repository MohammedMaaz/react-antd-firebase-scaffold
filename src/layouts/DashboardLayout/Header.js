import React, { useCallback } from "react";
import { Badge, Dropdown, List, Menu, Popover, Layout } from "antd";
import {
  BellOutlined,
  CaretDownOutlined,
  LoadingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { connect } from "dva";
import { logout } from "../../models/auth";
import Avatar from "antd/lib/avatar/avatar";
import AlertPopup from "../../components/AlertPopup";
import avatar from "../../assets/images/avatar.png";
import ThemeChanger from "../../components/ThemeChanger";
import LangChanger from "../../components/LangChanger";
import { useLang } from "../../utils/i18n";
import { capitalize } from "../../utils";

const { Header: AntdHeader } = Layout;

function Notifications({ count }) {
  const [lang] = useLang();
  const title = capitalize(lang("notifications"));
  return (
    <div style={{ marginRight: 20, display: "flex" }}>
      <Popover
        title={title}
        content={
          <List
            style={{ height: "60vh", width: 300, overflow: "auto" }}
            itemLayout="horizontal"
            dataSource={Array(count).fill({ title: "New notification Title" })}
            renderItem={(item) => {
              return (
                <List.Item>
                  <List.Item.Meta
                    title={<a href="/">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              );
            }}
          />
        }
        trigger={["click"]}
      >
        <Badge count={count}>
          <BellOutlined
            title={title}
            style={{ fontSize: 20, cursor: "pointer" }}
          />
        </Badge>
      </Popover>
    </div>
  );
}

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

function Header(props) {
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
        <AvatarMenu {...props} />
      </div>
    </AntdHeader>
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
)(Header);
