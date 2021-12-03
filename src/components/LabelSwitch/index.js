import React from "react";
import Text from "antd/lib/typography/Text";
import { Switch } from "antd";

export default function LabelSwitch({
  label,
  labelStyle,
  containerStyle,
  ...props
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        ...(containerStyle || {}),
      }}
    >
      <Text style={{ fontSize: 13, ...(labelStyle || {}) }}>{label}</Text>
      <Switch
        size="small"
        {...props}
        style={{
          marginTop: 3,
          marginLeft: 4,
          ...(props?.style || {}),
        }}
      />
    </div>
  );
}
