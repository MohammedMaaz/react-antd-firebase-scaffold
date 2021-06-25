import { List } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import React, { useCallback, useEffect, useState } from "react";
import { arrayExtend, placeholderImg } from "../../utils";
import { openFile } from "../PopoverWidth";
import ServerImg from "../ServerImg";
import Hover from "../Hover";

function isValid(img) {
  return img.type?.startsWith("image/");
}

export default function ImagePicker({
  count,
  width = 120,
  height = 100,
  column = 4,
  gutter = 16,
  listProps = {},
  imgProps = {},
  onChange,
  value,
  editable = true,
}) {
  const [images, setImages] = useState(
    value ? arrayExtend(value, count) : Array(count).fill({})
  );

  useEffect(() => {
    onChange && onChange(images.filter(isValid));
  }, [images]);

  useEffect(() => {
    if (
      Array.isArray(value) &&
      JSON.stringify(arrayExtend(value, count)) !== JSON.stringify(images)
    )
      setImages(arrayExtend(value, count));
  }, [value]);

  const fillImagesArr = useCallback(
    (files, start) => {
      const newImages = [...images];
      let count = 0,
        i = 0;
      while (count < newImages.length && i < files.length) {
        const ix = (start + count) % newImages.length;
        if (!isValid(newImages[ix])) {
          newImages[ix] = files[i];
          newImages[ix].src = URL.createObjectURL(files[i]);
          i++;
        }
        count++;
      }
      setImages(newImages);
    },
    [images]
  );

  const onClose = useCallback(
    (i) => {
      const newImages = images.map((img, ix) => (ix === i ? {} : img));
      setImages(newImages);
    },
    [images]
  );

  return (
    <List
      grid={{ column, gutter }}
      style={{ width: column * width + (column - 1) * gutter }}
      dataSource={images}
      renderItem={(img, i) => {
        const isImageValid = isValid(img);
        return (
          <List.Item
            style={{
              cursor: "pointer",
            }}
            onClick={() =>
              !isImageValid &&
              editable &&
              openFile({ onChange: (files) => fillImagesArr(files, i) })
            }
          >
            <ServerImg
              style={{
                border: isImageValid ? "none" : "1px solid #99999933",
                objectFit: "cover",
                width,
                height,
              }}
              src={isImageValid ? img.src : placeholderImg}
              {...imgProps}
              preview={isImageValid ? true : false}
            />
            {isImageValid && editable && (
              <Hover hoverStyle={{ transform: `scale(1.15, 1.15)` }}>
                <CloseCircleFilled
                  title={"remove"}
                  onClick={() => onClose(i)}
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: 0,
                    fontSize: 16,
                    color: "#EC4949",
                    transition: "transform 0.4s",
                  }}
                />
              </Hover>
            )}
          </List.Item>
        );
      }}
      {...listProps}
    />
  );
}
