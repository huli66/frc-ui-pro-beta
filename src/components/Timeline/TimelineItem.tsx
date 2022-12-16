import React, {FC, ReactNode} from "react";
import classNames from "classnames";
import { Timeline } from "antd";
import { TimeLineItemProps } from "antd/es/timeline/TimelineItem";

const { Item: AntItem } = Timeline;

export interface FRCTimeLineItemProps extends TimeLineItemProps {
  /** 重要时间轴点 */
  major?: boolean;
  /** 设置标签, （注：推荐与mode共同使用） */
  label?: ReactNode;
  /** 自定义节点位置 */
  position?: 'left' | 'right';
  /** 加载渐变动画 */
  showAction?: boolean
}

export const Item: FC<FRCTimeLineItemProps> = (props) => {
    const {
      className,
      major,
      showAction,
      ...restProps
    } = props;

    const classes = classNames('frc-timeline-item', className, {
      'frc-majorItem': major,
      'frc-item-animation': showAction,
    })

    const options = {
      className: classes,
      ...restProps,
    }

    // main
    return <AntItem {...options} />
}

// normal
Item.defaultProps = {
    major: false
};

export default Item;
