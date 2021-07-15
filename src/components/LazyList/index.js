import { List, Skeleton } from "antd";
import throttle from "lodash.throttle";
import React, { useCallback } from "react";
import PerfectScrollBar from "react-perfect-scrollbar";

export default function LazyList({
  onEndReached,
  listHeight,
  listStyle,
  dataSource,
  renderItem,
  loading,
  skeletonProps,
  skeletonEntriesCount = 4,
  endReachedPercent = 80,
  throttling = 300,
  ...props
}) {
  const onScrollDown = useCallback(
    throttle((e) => {
      const clientHeight = e.clientHeight;
      const currentScroll = e.scrollTop;
      const maxScroll = e.scrollHeight - clientHeight;
      const currentPercent = (currentScroll / maxScroll) * 100;

      if (
        currentPercent > endReachedPercent &&
        typeof onEndReached === "function"
      )
        onEndReached(currentPercent);
    }, throttling),
    []
  );

  return (
    <PerfectScrollBar onScrollDown={onScrollDown}>
      <List
        itemLayout="horizontal"
        {...props}
        style={{
          height: listHeight,
          ...(listStyle || {}),
        }}
        dataSource={
          loading
            ? dataSource.concat(
                ...Array(skeletonEntriesCount).fill({ loading: true })
              )
            : dataSource
        }
        renderItem={(item, index) => (
          <Skeleton
            avatar
            title={false}
            active
            {...skeletonProps}
            loading={item?.loading}
          >
            {typeof renderItem === "function" ? renderItem(item, index) : null}
          </Skeleton>
        )}
      />
    </PerfectScrollBar>
  );
}
