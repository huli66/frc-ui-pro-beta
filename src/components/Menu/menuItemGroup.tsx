import React, { FC, ReactNode } from "react";
import classNames from "classnames";
import { Menu } from "antd";
import { MenuItemGroupProps } from "antd/lib/menu";

const { ItemGroup } = Menu;

// 扩展位预留，后续有新增可以直接修改
interface BaseMenuItemGroupProps {
  /** 分组的菜单项 (注意类型具体为： ItemType[])*/
  children?: ReactNode;
  /** 分组标题 */
  label?: ReactNode;
}

export type FrcMenuItemGroupProps = BaseMenuItemGroupProps & MenuItemGroupProps;

export const FRCMenuItemGroup: FC<FrcMenuItemGroupProps> = (props) => {
  const { className, children, ...restProps } = props;

  const classes = classNames("frc-Item-group", className, {});

  const options = {
    className: classes,
    ...restProps,
  };

  // main
  return <ItemGroup {...options}>{children}</ItemGroup>;
};

// default
FRCMenuItemGroup.defaultProps = {};

export default FRCMenuItemGroup;
