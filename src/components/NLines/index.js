import React from "react";

export default function NLines({ lines = 3, children, style }) {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        WebkitLineClamp: lines,
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        ...(style || {}),
      }}
    >
      {children}
    </div>
  );
}
