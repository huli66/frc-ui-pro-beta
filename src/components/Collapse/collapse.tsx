import React, { FC, useState, CSSProperties, useEffect, ReactNode } from "react";
import classNames from "classnames";
import { Collapse as AntCollapse, CollapseProps} from "antd";


export interface FRCCollapseProps extends CollapseProps{
  /** 当前激活 tab 面板的 key (默认无，accordion 模式下默认第一个元素) */
  activeKey?: string[]|string| number[]|number;
  /** 	初始化选中面板的 key (默认无) */
  defaultActiveKey?: string[]|string| number[]|number;
  /** 带边框风格的折叠面板 */
  bordered?: boolean;
  /** 手风琴模式 */
  accordion?: boolean;
  /** 切换面板的回调 */
  onChange?: (key: string | string[]) => void;
  /** 设置图标位置： left, right */
  expandIconPosition?: 'left' | 'right';
  /** 销毁折叠隐藏的面板 */
  destroyInactivePanel?: boolean;
}

export const Collapse: FC<FRCCollapseProps> = (props) => {
  const {
    className,
    ...restProps
  } = props;

  const classes = classNames('frc-collapse', className, {})

  const options = {
    className: classes,
    ...restProps,
  }
  
  // main
  return <AntCollapse {...options} />
};

// default
Collapse.defaultProps = {
  expandIconPosition: 'right',
  bordered: false
};

export default Collapse;
