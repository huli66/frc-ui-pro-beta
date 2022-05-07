import React, { FC, ReactNode } from "react";
import classNames from "classnames";
import { Menu } from "antd";
import { MenuItemProps } from "antd/es/menu/MenuItem";

const { Item } = Menu;

// 扩展位预留，后续有新增可以直接修改
interface BaseMenuItemProps extends MenuItemProps {
  /** 展示错误状态样式 */
  danger?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 菜单图标 */
  icon?: ReactNode;
  /** item 的唯一标志 */
  key?: string;
  /** 菜单项标题 */
  label?: ReactNode;
  /** 设置收缩时展示的悬浮标题 */
  title?: string;
}

export type FrcMenuItemProps = BaseMenuItemProps;

export const FRCMenuItem: FC<FrcMenuItemProps> = (props) => {
  const { className, children, ...restProps } = props;

  const classes = classNames("frc-Item", className, {});

  const options = {
    className: classes,
    ...restProps,
  };

  // main
  return <Item {...options}>{children}</Item>;
};

// default
FRCMenuItem.defaultProps = {
  danger: false,
  disabled: false,
};

export default FRCMenuItem;
