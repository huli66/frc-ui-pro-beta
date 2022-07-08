import React, { FC } from 'react'
import classNames from 'classnames'
import { Tooltip as AntdTooltip, TooltipProps as antdTooltipProps } from 'antd'

export type ToolTipType = 'active' | 'passive'
export type ToolTipPlacementType = 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'

interface BaseTooltipProps {
  /** 设置tooltip主动或被动触发 */
  type?: ToolTipType
  /** 设置tooltip内容 */
  content?: React.ReactNode
  /** 设置tooltip显示位置*/
  placement?: ToolTipPlacementType
  /** 设置tooltip是否携带箭头 */
  hasArrow?: boolean
  /** 用于手动控制提示是否可见 */
  visible?: boolean
  /** 该值将合并到placement的配置中,设置内容参考dom-align*/
  align?: object
  /** 箭头是否指向目标元素中心 */
  arrowPointAtCenter?: boolean
  /** tooltip位置受限时是否自动调整位置	 */
  autoAdjustOverflow?: boolean
  /** 默认显示状态 */
  defaultVisible?: boolean
  /** tooltip隐藏后是否销毁dom中的tooltip */
  destroyTooltipOnHide?: boolean
  /** tooltip显示迟延（s） */
  mouseEnterDelay?: number
  /** tooltip消失迟延（s） */
  mouseLeaveDelay?: number
  /** 卡片类名 */
  overlayClassName?: string
  /** 卡片样式 */
  overlayStyle?: object
  /** 卡片内容区域的样式对象 */
  overlayInnerStyle?: object
  /** 设置 tooltip 的 z-index */
  zIndex?: number
  /** tooltip可见状态变化的回调 */
  onVisibleChange?: (visible: boolean) => void
}

export type FRCTooltipProps = BaseTooltipProps & Omit<antdTooltipProps, 'placement' | 'autoAdjustOverflow' | 'destroyTooltipOnHide' | 'onVisibleChange'>

export const Tooltip: FC<FRCTooltipProps> = (props) => {
  const {
    type,
    content,
    placement,
    hasArrow,
    children,
    ...restProps
  } = props

  const classes = classNames('frc-tooltip', {
    [`frc-tooltip-${type}`]: type,
    [`frc-tooltip-without-arrow`]: !hasArrow,
    [`frc-tooltip-placement-${placement}`]: placement,
    [`frc-tooltip-passive-without-arrow`]: type === 'passive' && !hasArrow,
  })

  const options = {
    overlayClassName: classes,
    overlay: content,
    arrowContent: (!hasArrow ? null : <div className="rc-tooltip-arrow-inner"></div>),
    placement: placement,
    ...restProps,
  }

  // main
  return (
    <AntdTooltip {...options}>
      {children}
    </AntdTooltip>
  )
}

// normal
Tooltip.defaultProps = {
  type: 'active',
  placement: 'right',
  hasArrow: true,
  arrowPointAtCenter: false,
  autoAdjustOverflow: true,
  defaultVisible: false,
  destroyTooltipOnHide: false,
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
}

export default Tooltip
