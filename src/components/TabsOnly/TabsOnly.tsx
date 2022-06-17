import React, { FC, useState, CSSProperties } from "react";
import classNames from "classnames";

export interface itemProps {
  key: string;
  value: string;
}

export type TabsOnlyType = "default" | "piend";
export type TabsOnlySizeType = "default" | "large" | "middle";
export interface TabsOnlyTypeProps {
  default?: TabsOnlyType;
}

export interface itemsProps {
  items: itemProps[];
}
export interface itemProps {
  key: string;
  value: string;
}

export interface TabsOnlyBaseProps {
  /** tabsOnly类名 */
  className?: string;
  children?: any;
}

interface BaseTabsOnlyProps {
  /** tabsOnly类型，可选default、piend两种类型 */
  type?: TabsOnlyType;
  /** 默认选中的key */
  defaultSelectedKey?: string;
  /** 设置是否禁用 */
  disabled?: boolean;
  /** 点击事件回调,返回当前选中的项item */
  onSelect?: (item: { key: string; value: string }) => void;
  /** tabsOnly内容*/
  items?: { key: string; value: string }[];
  /** 样式 */
  style?: CSSProperties;
  /** 大小，提供 large default 和 middle 三种大小 */
  size?: TabsOnlySizeType;
  /** 是否不自动填充宽度，当为true时会根据设定宽度超出...隐藏 */
  notAutoWidth?: boolean;
  /** item项的宽度*/
  width?: number;
  /** tabsOnly是否独占一行显示*/
  block?: boolean;
}

export type FRCTabsOnlyProps = BaseTabsOnlyProps & TabsOnlyBaseProps;

export const TabsOnly: FC<FRCTabsOnlyProps> = (props) => {
  const {
    defaultSelectedKey,
    width,
    block,
    size,
    notAutoWidth,
    items,
    onSelect,
    disabled,
    children,
    className,
    type,
    ...restProps
  } = props;
  // tabsOnly frc-tabs-only-only
  // const classes = classNames("frc-tabs-only", className, {
    const classes = classNames("frc-tabs-only", className, {
    [`frc-tabs-only-${type}`]: type,
    [`frc-tabs-only-size-${size}`]: size,
    [`frc-tabs-only-disabled`]: disabled,
    [`frc-tabs-only-not-atuo-width`]: notAutoWidth,
    [`frc-tabs-only-block`]: block,
  });

  const options = {
    className: classes,
    ...restProps,
  };
  const [current, setCurrent] = useState<string>(
    defaultSelectedKey ||
      (items && items![0].key) ||
      (children && children![0].key) ||
      ""
  );
  const changeTabPane = (item: itemProps) => {
    if (current === item.key) return false; //禁止重复点击
    if (disabled) return false; //禁止禁用点击
    setCurrent(item.key);
    if (onSelect) onSelect(item);
  };
  // main
  return (
    <div {...options}>
      {items?.length &&
        items.map((item: itemProps) => (
          <div
            onClick={() => {
              changeTabPane(item);
            }}
            className={
              current === item.key ? "frc-tab-pane active" : "frc-tab-pane"
            }
            key={item.key}
          >
            <div
              className="frc-tab-pane-content"
              style={{ width: width + "px" }}
            >
              {item.value}
            </div>
          </div>
        ))}
    </div>
  );
};

// default
TabsOnly.defaultProps = {
  type: "default",
  size: "default",
  notAutoWidth: false,
  block: false,
};

export default TabsOnly;
