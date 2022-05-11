import React, { FC, useState, CSSProperties } from "react";
import classNames from "classnames";
// import TabPane from "./tabPane";

export interface itemProps {
  key: string;
  value: string;
}

export type TabsType = 'default' | 'piend'
export interface TabsTypeProps {
    default?: TabsType
};

export interface itemsProps {
    items: itemProps[]
}
export interface itemProps {
    key: string,
    value: string
}

export interface TabsBaseProps {
    className?: string;
    children?: any
}

export interface IObj {
    [key: string]: any;
}

interface BaseTabsProps {
  /** 类型 */
  type?: TabsType;
  /** 设置是否禁用 */
  disabled?: boolean;
  /** 点击事件 */
  onSelect?: (item: itemProps) => void;
  /** items 此方式推荐使用，如果使用，插槽*/
  items?: { key: string; value: string }[];
  /** 样式 */
  style?: CSSProperties;
  /** 默认选中的key */
  defaultSelectedKey?: string;
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
    // <div {...options}>
    //   {items?.length
    //     ? items.map((item: itemProps) => (
    //         <div
    //           onClick={() => {
    //             changeTabPane(item.key);
    //           }}
    //           className={
    //             current === item.key ? "frc-tab-pane active" : "frc-tab-pane"
    //           }
    //           key={item.key}
    //         >
    //           {item.value}
    //         </div>
    //       ))
    //     : children.length &&
    //       children.map((item: IObj) => (
    //         <TabPane
    //           onClick={() => {
    //             changeTabPane(item.key);
    //           }}
    //           className={current === item.key ? "active" : ""}
    //           key={item.key}
    //         >
    //           {console.log(item)}
    //           {item.props.children}
    //         </TabPane>
    //       ))}
    // </div>
  );
};

// default
Tabs.defaultProps = {
  type: "default",
};

export default Tabs;
