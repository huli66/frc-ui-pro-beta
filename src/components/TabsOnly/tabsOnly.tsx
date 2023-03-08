import React, { FC, useState, CSSProperties, useEffect, ReactNode } from "react";
import classNames from "classnames";

export interface TabItem {
  key: React.Key;
  label: string | ReactNode;
  disabled?: boolean;
}

export type TabsOnlyType = "default" | "piend" | "solid";
export type TabsOnlySizeType = "small" | "large" | "middle";


export interface FRCTabsOnlyProps {
  /** tabsOnly类名 */
  className?: string;
  /** tabsOnly类型 */
  type?: TabsOnlyType;
  /** 默认选中的value */
  defaultValue?: React.Key;
  /** 选中的value */
  value?: React.Key;
  /** 选中tab某一项时的回调函数 */
  onChange?: (value: React.Key) => void;
  /** tabsOnly内容*/
  items?: TabItem[];
  /** 外层样式 */
  style?: CSSProperties;
  /** tab item size */
  size?: TabsOnlySizeType;
  /** 是否不自动填充宽度，当为true时会根据设定宽度超出...隐藏 */
  notAutoWidth?: boolean;
  /** item项的宽度*/
  width?: number;
}

export const TabsOnly: FC<FRCTabsOnlyProps> = (props) => {
  const {
    defaultValue,
    value,
    width,
    size,
    notAutoWidth,
    items,
    onChange,
    className,
    type,
    style
  } = props;
 
  const classes = classNames("frc-tabs-only", className, {
    [`frc-tabs-only-${type}`]: type,
    [`frc-tabs-only-size-${size}`]: size,
    [`frc-tabs-only-not-atuo-width`]: notAutoWidth,
  });

  const [current, setCurrent] = useState<React.Key | undefined>(defaultValue);

  const changeTabPane = (item: TabItem) => {
    if (current === item.key) {
      return ;
    }
    if (item.disabled) {
      return ;
    }
    if (onChange) {
      onChange(item.key);
    }else {
      setCurrent(item.key);
    }
  };

  useEffect(() => {
    if('value' in props) {
      setCurrent(value)
    }
  }, [value, props]);

  // main
  return (
    <div className={classes} style={style}>
      {!!items?.length &&
        items.map((item) => (
          <div
            onClick={() => {
              changeTabPane(item);
            }}
            className={`frc-tab-pane ${current === item.key ? 'frc-tab-pane-active':''} ${item.disabled ? 'frc-tab-pane-disabled' : ''}`}
            key={item.key}
          >
            <div
              className="frc-tab-pane-content"
              style={{ width }}
            >
              {item.label}
            </div>
          </div>
        ))}
    </div>
  );
};

// default
TabsOnly.defaultProps = {
  type: "default",
  size: "small",
  notAutoWidth: false,
};

export default TabsOnly;
