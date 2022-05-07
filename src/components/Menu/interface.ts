
import { MenuDividerProps, MenuItemGroupProps, MenuItemProps, SubMenuProps } from "antd/lib/menu";

// 目前是使用继承方式，文档上的api在对应的继承类中基本上都有
export interface MenuItemType extends MenuItemProps { }
export interface SubMenuType extends SubMenuProps { }
export interface MenuItemGroupType extends MenuItemGroupProps { }
export interface MenuDividerType extends MenuDividerProps { }
export type ItemType = MenuItemType | SubMenuType | MenuItemGroupType | MenuDividerType;

// export type MenuTheme = "default" | "light" | "dark";
export type MenuThemeType = "default";
export type MenuModeType = "vertical" | "horizontal" | "inline"
export type MenuTriggerActionType = "hover" | "click"
