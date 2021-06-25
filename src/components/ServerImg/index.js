import { EyeOutlined } from "@ant-design/icons";
import { Image, Spin } from "antd";
import React, { useCallback, useState } from "react";
import { randHashString } from "../../services/utils/utils";
import { placeholderImg } from "../../utils";
import Hover from "../Hover";
import styles from "./index.module.scss";

export default function ServerImg({
  loaderProps,
  defaultWidth = 400,
  defaultHeight = 250,
  ...props
}) {
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState(false);
  const [id] = useState(props.id || randHashString(8));

  const onLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const onHover = useCallback((val) => setHover(val), []);

  const onClick = useCallback(() => {
    const elem = document.getElementById(id);
    elem && elem.click();
  }, [id]);

  return (
    <>
      <div
        className={"grid-center"}
        {...loaderProps}
        style={{
          width: props.style?.width || defaultWidth,
          height: props.style?.height || defaultHeight,
          display: !loading && "none",
          backgroundColor: "rgba(0,0,0,0.03)",
          ...(loaderProps?.style || {}),
        }}
      >
        <Spin size="small" />
      </div>
      <div style={{ position: "relative", display: loading && "none" }}>
        <Image
          {...props}
          id={id}
          style={props?.style || {}}
          fallback={placeholderImg}
          width={props.style?.width}
          height={props.style?.height}
          onLoad={onLoad}
          className={styles.img}
        />
        {props.preview ? (
          <Hover onHover={onHover}>
            <div
              onClick={onClick}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                opacity: hover ? 1 : 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                transition: "opacity 0.4s",
              }}
            >
              <EyeOutlined />
              <span style={{ marginLeft: 3 }}>Preview</span>
            </div>
          </Hover>
        ) : null}
      </div>
    </>
  );
}
