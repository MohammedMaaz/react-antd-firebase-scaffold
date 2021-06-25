import React from "react";
import Sidebar from "./sidebar";
import Header from "./Header";
import { Layout } from "antd";
import { connect } from "dva";
import { toggleSidebarCollapsed } from "../../models/router";

const { Content } = Layout;

function DashboardLayout({ children, collapsed, toggleCollapsed }) {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      <Layout>
        <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <Layout>
          <Content
            style={{
              position: "relative",
              paddingLeft: 32,
              paddingRight: 32,
              paddingTop: 10,
              overflow: "auto",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default connect(
  ({ router }) => ({
    collapsed: router.sidebarCollapsed,
  }),
  { toggleCollapsed: toggleSidebarCollapsed }
)(DashboardLayout);
