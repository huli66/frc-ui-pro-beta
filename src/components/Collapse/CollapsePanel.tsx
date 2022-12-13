import React, {FC, ReactNode} from "react";
import classNames from "classnames";
import { Collapse } from "antd";
import { CollapsePanelProps } from "antd/es/collapse/CollapsePanel";

const { Panel: AntCollapse } = Collapse;

export interface FRCCollapsePanelProps extends CollapsePanelProps {
  /** 是否可折叠或指定可折叠触发区域 */
  collapsible?: 'header' | 'disabled';
  /** 被隐藏时是否渲染 DOM 结构 */
  forceRender?: boolean;
  /** 面板头内容 */
  header: string|ReactNode;
  /** 对应 activeKey */
  key: string|number;
  /** 是否展示当前面板上的箭头 */
  showArrow?: boolean;
  /** 自定义渲染每个面板右上角的内容 */
  extra?: ReactNode;
}


export const Panel: FC<FRCCollapsePanelProps> = (props) => {
    const {
        className,
        ...restProps
      } = props;
    
      const classes = classNames('frc-collapse-panel', className, {})
    
      const options = {
        className: classes,
        ...restProps,
      }
    
      // main
      return <AntCollapse {...options} />
}

// normal
Panel.defaultProps = {
};

export default Panel;
