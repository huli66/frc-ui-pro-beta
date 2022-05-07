import React, { CSSProperties, FC, ReactNode } from "react";
import classNames from "classnames";
import { Menu as AntdMenu, MenuProps } from "antd";
import { SubMenuProps } from "antd/es/menu/SubMenu";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  MenuModeType,
  MenuThemeType,
  MenuTriggerActionType,
} from "./interface";

interface BaseMenuProps {
  /** 初始展开的 SubMenu 菜单项 key 数组 */
  defaultOpenKeys?: string[];
  /**初始选中的菜单项 key 数组*/
  defaultSelectedKeys?: string[];
  /**自定义展开图标*/
  expandIcon?:
    | ReactNode
    | ((props: SubMenuProps & { isSubMenu: boolean }) => ReactNode);
  /** 在子菜单展示之前就渲染进 DOM */
  forceSubMenuRender?: boolean;
  /** inline 时菜单是否收起状态 */
  inlineCollapsed?: boolean;
  /** inline 模式的菜单缩进宽度 */
  inlineIndent?: number;
  /** 菜单内容 (版本为2.20及以上才生效，注意类型具体为： ItemType[])*/
  items?: ReactNode;
  /** 菜单类型，现在支持垂直、水平、和内嵌模式三种 */
  mode?: MenuModeType;
  /** 是否允许多选 */
  multiple?: boolean;
  /** 当前展开的 SubMenu 菜单项 key 数组 */
  openKeys?: string[];
  /** 用于自定义 Menu 水平空间不足时的省略收缩的图标 */
  overflowedIndicator?: ReactNode;
  /** 是否允许选中 */
  selectable?: boolean;
  /** 当前选中的菜单项 key 数组 */
  selectedKeys?: string[];
  /** 根节点样式 */
  style?: CSSProperties;
  /** 用户鼠标离开子菜单后关闭延时，单位：秒 */
  subMenuCloseDelay?: number;
  /** 用户鼠标进入子菜单后开启延时，单位：秒 */
  subMenuOpenDelay?: number;
  /** 主题颜色 */
  theme?: MenuThemeType;
  /** SubMenu 展开/关闭的触发行为 */
  triggerSubMenuAction?: MenuTriggerActionType;
  /** 点击 MenuItem 调用此函数 */
  onClick?: (e: {
    key: string;
    keyPath: string[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
  }) => void;
  /** 取消选中时调用，仅在 multiple 生效 */
  onDeselect?: (e: {
    key: string;
    keyPath: string[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
    selectedKeys: string[];
  }) => void;
  /** SubMenu 展开/关闭的回调 */
  onOpenChange?: (openKeys: string[]) => void;
  /** 被选中时调用 */
  onSelect?: (e: {
    key: string;
    keyPath: string[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
    selectedKeys: string[];
  }) => void;
}

export type FRCMenuProps = BaseMenuProps & Omit<MenuProps, "theme">;

export const Menu: FC<FRCMenuProps> = (props) => {
  const { theme, className, children, ...restProps } = props;
  // 这个地方是为了保留antd自身的两种主题样式
  const classNamePrefix = theme === "default" ? "frc" : "ant";
  const classes = classNames(`${classNamePrefix}-menu`, className, {
    [`${classNamePrefix}-menu-${theme}`]: theme,
  });
  const options = {
    className: classes,
    ...restProps,
  };

  // main
  return (
    <AntdMenu
      inlineIndent={16}
      mode="inline"
      style={{ width: 186 }}
      {...options}
    >
      {children}
    </AntdMenu>
  );
};

// default
Menu.defaultProps = {
  theme: "default",
  forceSubMenuRender: false,
  inlineIndent: 16,
  mode: "inline",
  multiple: false,
  overflowedIndicator: <EllipsisOutlined />,
  selectable: true,
  subMenuCloseDelay: 0.1,
  subMenuOpenDelay: 0,
  triggerSubMenuAction: "hover",
};

export default Menu;
