import React from "react";
import { Typography } from "antd";

export default function PlaceholderPage({ title }) {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: "100%",
        height: "100%",
        textTransform: "capitalize",
      }}
    >
      <Typography.Title>{title}</Typography.Title>
    </div>
  );
}
