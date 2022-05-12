import React, { FC, useState, CSSProperties } from "react";
import classNames from "classnames";

export interface itemProps {
  key: string;
  value: string;
}

export type TabsType = "default" | "piend";
export type TabsSizeType = "default" | "large" | "middle";
export interface TabsTypeProps {
  default?: TabsType;
}

export interface itemsProps {
  items: itemProps[];
}
export interface itemProps {
  key: string;
  value: string;
}

export interface TabsBaseProps {
  className?: string;
  children?: any;
}

export interface IObj {
  [key: string]: any;
}

interface BaseTabsProps {
  /** tabs类型，可选default、piend两种类型 */
  type?: TabsType;
  /** 默认选中的key */
  defaultSelectedKey?: string;
  /** 设置是否禁用 */
  disabled?: boolean;
  /** 点击事件回调,返回当前选中的项item */
  onSelect?: (item: { key: string; value: string }) => void;
  /** tabs内容*/
  items?: { key: string; value: string }[];
  /** 样式 */
  style?: CSSProperties;
  /** 大小，提供 large default 和 middle 三种大小 */
  size?: TabsSizeType;
  /** 是否不自动填充宽度，当为true时会根据设定宽度超出...隐藏 */
  notAutoWidth?: boolean;
  /** item项的宽度*/
  width?: number;
  /** tabs是否独占一行显示*/
  block?: boolean;
}

export type FRCTabsProps = BaseTabsProps & TabsBaseProps;

export const Tabs: FC<FRCTabsProps> = (props) => {
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
  // tabs
  const classes = classNames("frc-tabs", className, {
    [`frc-tabs-${type}`]: type,
    [`frc-tabs-size-${size}`]: size,
    [`frc-tabs-disabled`]: disabled,
    [`frc-tabs-not-atuo-width`]: notAutoWidth,
    [`frc-tabs-block`]: block,
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
Tabs.defaultProps = {
  type: "default",
  size: "default",
  notAutoWidth: false,
  block: false,
};

export default Tabs;
