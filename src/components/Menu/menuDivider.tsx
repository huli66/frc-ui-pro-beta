import React, { FC } from "react";
import classNames from "classnames";
import { Menu } from "antd";
import { MenuDividerProps } from "antd/es/menu/MenuDivider";

const { Divider } = Menu;

// 扩展位预留，后续有新增可以直接修改
interface BaseMenuDividerProps {
  /** 是否虚线 */
  dashed?: boolean;
}

export type FrcMenuDividerProps = BaseMenuDividerProps & MenuDividerProps;

export const FRCMenuDivider: FC<FrcMenuDividerProps> = (props) => {
  const { className, ...restProps } = props;

  const classes = classNames("frc-Divider", className, {});

  const options = {
    className: classes,
    ...restProps,
  };

  // main
  return <Divider {...options} />;
};

// default
FRCMenuDivider.defaultProps = {
  dashed: false,
};

export default FRCMenuDivider;
