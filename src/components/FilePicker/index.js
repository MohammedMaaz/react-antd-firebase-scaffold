import {
  CloseCircleFilled,
  PaperClipOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, List } from "antd";
import React, { useEffect, useState } from "react";
import { openFile } from "../RootWrapper";

export default function FilePicer({
  accept,
  multiple,
  onChange,
  width = 200,
  ...props
}) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    onChange && onChange(multiple ? files : files[0]);
  }, [files]);

  return (
    <div>
      <Button
        onClick={() =>
          openFile({
            accept,
            multiple,
            onChange: (newFiles) => {
              setFiles(multiple ? [...files, ...newFiles] : [newFiles[0]]);
            },
          })
        }
        icon={<UploadOutlined />}
      >
        Select File{multiple ? "s" : ""}
      </Button>
      {files.length ? (
        <List
          style={{ marginTop: 4 }}
          dataSource={files}
          renderItem={(file, i) => (
            <List.Item
              style={{
                padding: 0,
                paddingTop: 4,
                fontSize: 12,
                width,
              }}
            >
              <div
                className="ellipsis"
                style={{
                  width: width - 20,
                  marginRight: 8,
                }}
              >
                <PaperClipOutlined
                  style={{ marginRight: 4, color: "#9a9a9a" }}
                />
                {file.name}
              </div>
              <CloseCircleFilled
                style={{ color: "#EC4949", fontSize: 13 }}
                onClick={() => {
                  setFiles(files.filter((_, ix) => ix !== i));
                }}
              />
            </List.Item>
          )}
        />
      ) : null}
    </div>
  );
}
