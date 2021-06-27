import { BellOutlined } from "@ant-design/icons";
import { Badge, List, Popover } from "antd";
import React from "react";
import { capitalize } from "../../utils";
import { useLang } from "../../utils/i18n";

export default function Notifications({ count }) {
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
