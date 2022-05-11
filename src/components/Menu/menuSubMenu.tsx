import React, { FC, ReactNode } from "react";
import classNames from "classnames";
import { Menu } from "antd";
import { SubMenuProps } from "antd/es/menu/SubMenu";
import { MenuThemeType } from "./menu";

const { SubMenu } = Menu;

// 扩展位预留，后续有新增可以直接修改
interface BaseMenuSubMenuProps extends SubMenuProps {
  /** 子菜单的菜单项 (注意类型具体为： ItemType[])*/
  children?: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 菜单图标 */
  icon?: ReactNode;
  /** 唯一标志 */
  key?: string;
  /** 菜单项标题 */
  label?: ReactNode;
  /** 子菜单样式，mode="inline" 时无效 */
  popupClassName?: string;
  /** 子菜单偏移量，mode="inline" 时无效 */
  popupOffset?: [number, number];
  /** 点击子菜单标题 */
  onTitleClick?: (e: {
    key: string;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
  }) => void;
  /** 设置子菜单的主题，默认从 Menu 上继承 antd 4.20及以上支持 */
  theme?: MenuThemeType;
}

export type FrcMenuSubMenuProps = BaseMenuSubMenuProps;

export const FRCMenuSubMenu: FC<FrcMenuSubMenuProps> = (props) => {
  const { className, children, ...restProps } = props;

  const classes = classNames("frc-SubMenu", className, {});

  const options = {
    className: classes,
    ...restProps,
  };

  // main
  return <SubMenu {...options}>{children}</SubMenu>;
};

// default
FRCMenuSubMenu.defaultProps = {
  disabled: false,
};

export default FRCMenuSubMenu;
