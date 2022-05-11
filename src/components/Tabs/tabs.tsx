import React, { FC, useState, CSSProperties } from "react";
import classNames from "classnames";
// import TabPane from "./tabPane";

export interface itemProps {
  key: string;
  value: string;
}

export type TabsType = "default" | "piend";
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
  /** tabs类型，现在支持"default","piend"两种模式 */
  type?: TabsType;
  /** 默认选中的key */
  defaultSelectedKey?: string;
  /** 设置是否禁用 */
  disabled?: boolean;
  /** 点击事件回调,返回当前选中的项item */
  onSelect?: (item: itemProps) => void;
  /** tabs内容*/
  items?: { key: string; value: string }[];
  /** 样式 */
  style?: CSSProperties;
}

export type FRCTabsProps = BaseTabsProps & TabsBaseProps;

export const Tabs: FC<FRCTabsProps> = (props) => {
  const {
    defaultSelectedKey,
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
    [`frc-tabs-disabled`]: disabled,
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
            {item.value}
          </div>
        ))}
    </div>
  );
};

// default
Tabs.defaultProps = {
  type: "default",
};

export default Tabs;
