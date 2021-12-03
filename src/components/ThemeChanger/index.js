import React, { useCallback } from "react";
import { List, Popover } from "antd";
import Theme from "../../utils/theme";
import { setPopoverWidth } from "../RootWrapper";
import { BgColorsOutlined } from "@ant-design/icons";
import { useTheme } from "../../hooks/useTheme";
import { useLang } from "../../hooks/useLang";
import { capitalize } from "../../utils";

export default function ThemeChanger({
  containerStyle,
  containerProps,
  itemStyle,
  itemProps,
  style,
}) {
  const [themeColor, setThemeColor] = useTheme();
  const [lang] = useLang();

  const onVisibleChange = useCallback((visible) => {
    if (visible) setPopoverWidth("120px");
    else setTimeout(() => setPopoverWidth("unset"), 200);
  }, []);

  return (
    <Popover
      onVisibleChange={onVisibleChange}
      title={capitalize(lang("select_theme"))}
      content={
        <List
          dataSource={Theme.colors}
          grid={{ column: 3 }}
          renderItem={(color) => (
            <div
              onClick={(e) => setThemeColor(color)}
              className="grid-center circular"
              {...itemProps}
              style={{
                cursor: "pointer",
                width: 26,
                height: 26,
                display: "flex !important",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 4,
                border: color === themeColor ? "2px solid #777" : "none",
                ...(itemStyle || {}),
              }}
            >
              <div
                className="circular"
                style={{
                  backgroundColor: color,
                  width: 18,
                  height: 18,
                }}
              />
            </div>
          )}
          {...containerProps}
          style={{
            width: "100%",
            marginRight: -4,
            marginBottom: -10,
            ...(containerStyle || {}),
          }}
        />
      }
      trigger={["click"]}
    >
      <BgColorsOutlined
        title={capitalize(lang("change_theme"))}
        style={{ fontSize: 24, color: themeColor, ...(style || {}) }}
      />
    </Popover>
  );
}
