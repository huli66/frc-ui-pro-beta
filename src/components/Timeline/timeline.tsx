import React, { FC, ReactNode} from "react";
import classNames from "classnames";
import { Timeline as AntTimeline, TimelineProps} from "antd";
export interface FRCTimelineProps extends TimelineProps{
  /** 通过设置 mode 可以改变时间轴和内容的相对位置 */
  mode?: 'left' | 'alternate' | 'right';
  /** 指定最后一个幽灵节点是否存在或内容 */
  pending?: boolean | ReactNode;
  /** 当最后一个幽灵节点存在時，指定其时间图点 */
  pendingDot?: ReactNode;
  /** 节点排序 */
  reverse?: boolean;
  /** 消息字号, (注：label不跟随size变化) */
  size?: 'small' | 'medium' | 'large';
}

export const Timeline: FC<FRCTimelineProps> = (props) => {
  const {
    className,
    size,
    ...restProps
  } = props;

  const classes = classNames('frc-timeline', className, {
    [`frc-timeline-${size}`]: size,
  })

  const options = {
    className: classes,
    ...restProps,
  }

  // main
  return (
    <AntTimeline {...options} />
  )
};

// default
Timeline.defaultProps = {
  size: 'small'
};

export default Timeline;
