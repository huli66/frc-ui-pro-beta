import { FC } from 'react'
import Menu, { FRCMenuProps } from './menu'
import FRCMenuItem, { FrcMenuItemProps } from './menuItem'
import FRCMenuSubMenu, { FrcMenuSubMenuProps } from './menuSubMenu'
import FRCMenuItemGroup, { FrcMenuItemGroupProps } from './menuItemGroup'
import FRCMenuDivider, { FrcMenuDividerProps } from './menuDivider'

export type FRCMenuComponent = FC<FRCMenuProps> & {
    Item: FC<FrcMenuItemProps>,
    SubMenu: FC<FrcMenuSubMenuProps>,
    ItemGroup: FC<FrcMenuItemGroupProps>,
    Divider: FC<FrcMenuDividerProps>,
}
const FrcMenu = Menu as FRCMenuComponent
FrcMenu.Item = FRCMenuItem
FrcMenu.SubMenu = FRCMenuSubMenu
FrcMenu.ItemGroup = FRCMenuItemGroup
FrcMenu.Divider = FRCMenuDivider
export default FrcMenu


