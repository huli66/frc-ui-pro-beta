import React, {FC, ReactNode, useEffect, useState} from "react";
import classNames from "classnames";
import { Timeline } from "antd";
import { TimeLineItemProps } from "antd/es/timeline/TimelineItem";

const { Item: AntItem } = Timeline;

export interface FRCTimeLineItemProps extends TimeLineItemProps {
  /** 重要时间轴点 */
  major?: boolean;
  /** 指定圆圈颜色 blue、red、green、gray，或自定义的色值 */
  color?: string;
  /** 自定义时间轴点 */
  dot?: ReactNode;
  /** 设置标签, （注：推荐与mode共同使用） */
  label?: ReactNode;
  /** 自定义节点位置 */
  position?: 'left' | 'right';
}


export const Item: FC<FRCTimeLineItemProps> = (props) => {
    const {
      className,
      major,
      ...restProps
    } = props;

     const classes = classNames('frc-timeline-item', className, {
        [`frc-majorItem`]: major,
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
    major: false,
    color: 'inherit'
};

export default Item;
