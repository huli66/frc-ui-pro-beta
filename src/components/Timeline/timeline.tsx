import React, { FC, ReactNode, useEffect, useState} from "react";
import classNames from "classnames";
import { Timeline as AntTimeline, TimelineProps} from "antd";
import { isEqual, cloneDeep } from "lodash";
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
  /** 新数据提醒 */
  newWarn?: boolean;
  /** 新数据提醒文本 */
  newWarnText?: string | ReactNode;
}

export const Timeline: FC<FRCTimelineProps> = (props) => {
  const {
    className,
    size,
    newWarn,
    newWarnText,
    children,
    ...restProps
  } = props;

  const [initList, setInitList] = useState<any>(children)
  const [nextList, setNextList] = useState<any>(initList)

  const classes = classNames('frc-timeline', className, {
    [`frc-timeline-${size}`]: size,
  })

  const options = {
    className: classes,
    ...restProps,
  }

  useEffect(() => {
    if (!isEqual(children, initList)) {
      const childrenList: any = cloneDeep(children)
      const nowList: any = cloneDeep(initList)
      const oldList: any[] = []
      let thisE = null
      for (const key of nowList) {
        oldList.push(key['props'])
      }
      childrenList.map((e: any) => {
        if (!JSON.stringify(oldList).includes(JSON.stringify(e['props']))) {
          e['timerLine'] = Date.now()
          thisE = e
        }
        return e
      })
      if (thisE) {
        setInitList([thisE, ...initList])
      }
    }
  }, [children])

  useEffect(() => {
    const preList: any = cloneDeep(initList)
    preList.map((e: any) => {
      if (e['timerLine'] && Date.now() - e['timerLine'] < 3000) {
        e['props']['showAction'] = true
      } else {
        if (e['props']['showAction']) 
        delete e['props']['showAction']
      }
    })
    setNextList(preList)
  }, [initList])

  // main
  return (
    <AntTimeline {...options}>
      {/* {newWarn && <div className='frc-timeline-newWarn' onClick={() => handleTop()}>{newWarnText}</div>} */}
      {nextList}
    </AntTimeline>
  )
};

// default
Timeline.defaultProps = {
  size: 'small',
  newWarn: true,
  newWarnText: '出现新快讯，点击刷新'
};

export default Timeline;
