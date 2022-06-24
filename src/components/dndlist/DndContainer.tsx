import { hover } from '@testing-library/user-event/dist/hover';
import React, { FC, useEffect, useState, useRef } from 'react';
import { DragSourceMonitor, DropTargetMonitor, useDrop } from 'react-dnd';
import DndItem from './dndItem';

export type obj = { [propname: string]: any }
export interface IDndListProps {
  /** 可拖拽元素列表 */
  dataList?: obj[],
  /** 元素的拖拽类型，允许放置的类型。同react-dnd中的type,accept */
  type: string,
  /** 被拖拽元素的key值,建议传递，默认值将使用对应元素的下标（index） */
  itemKey?: (item: obj, index: number) => (string | number)
  /** 参数item对应dataList的每一个元素以及对应的index下标，返回一个reactdom，控制拖拽元素内部的渲染 */
  render: (item: obj, key: string | number) => React.ReactNode,
  /** 参数item对应dataList的每一个元素以及对应的index下标 返回一个boolen */
  canDrag?: (dragItem: obj, monitor: DragSourceMonitor<obj, void | obj>) => boolean,
  /** 当被拖拽元素hover在可放置的组件上时调用 */
  hover?: (dragItem?: obj, dropItem?: obj) => any
  /** 拖拽完毕后调用 参数item对应dataList的每一个元素, 第二个参数为拖拽连接器monitor */
  dragEnd?: (item: obj, monitor: DragSourceMonitor<obj, void | obj>) => {}
  /** 判断是否可以放下，第一个参数为可拖拽元素信息，第二个参数为拖拽连接器monitor*/
  canDrop?: (dragItem?: obj, dropItem?: obj) => any,
  /** 
   * 放下操作，第一个参数为可拖拽元素信息，
   * 第二个参数为拖拽连接器monitor，
   * 第三个参数为dataList
   * 返回值为undefined或任意对象，该返回值可以在endDrg中的monitor.getDropResult()中接收,
   * 该回调中使用参数外变量有可能存在获取值为旧值，
   */
  drop?: (dragItem: obj, dropItem: obj, dataList: obj[]) => any,
  /** list的样式 */
  ListStyle?: React.CSSProperties
  /** 拖拽元素的样式 */
  listItemStyle?: React.CSSProperties
}

export const DndContainer: FC<IDndListProps> = (props) => {
  // const ref = useRef(null)
  const { dataList, type, render, itemKey, canDrag, dragEnd, hover, drop, canDrop, ListStyle = {}, listItemStyle = {} } = props
  return (
    <div
      role='Box'
      style={ListStyle}
    >
      {dataList!.map((item, index) => {
        const key = itemKey ? itemKey(item, index) : index
        const itemkey = key
        const cardProps = {
          type, item, itemkey, index, dataList, listItemStyle, canDrag, hover, dragEnd, render, drop, canDrop,
        }
        return < DndItem key={key} {...cardProps} />
      })}
    </div>
  )
}

// normal
DndContainer.defaultProps = {}

export default DndContainer
