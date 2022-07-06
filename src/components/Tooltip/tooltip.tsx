import React, { FC } from 'react'
import classNames from 'classnames'
import RcTooltip from 'rc-tooltip/lib/Tooltip'
import { TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip'

export type ToolTipType = 'active' | 'passive'
export type ToolTipArrowContent = '' | '{<div className="rc-tooltip-arrow-inner"></div>}'
export type ToolTipPlacementType = 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'

interface BaseTooltipProps {
  /** 设置提示主动或被动触发 */
  type?: ToolTipType
  /** 设置提示框内容 */
  content?: React.ReactNode
  /** 设置提示优先显示位置*/
  placement?: ToolTipPlacementType
  /** 设置提示框是否携带箭头 */
  hasArrow?: boolean
  /** 设置提示是否可见 */
  visible?: boolean
}

export type FRCTooltipProps = BaseTooltipProps & Omit<RcTooltipProps, 'overlay' | 'placement'>

export const Tooltip: FC<FRCTooltipProps> = (props) => {
  const {
    overlayClassName,
    type,
    content,
    placement,
    hasArrow,
    children,
    ...restProps
  } = props

  const classes = classNames('frc-tooltip', overlayClassName, {
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
    align: {
      // offset: [10, 5],
      // targetOffset: [0.1, 0],
    },
    ...restProps,
  }

  // main
  return (
    <RcTooltip {...options}>
      {children}
    </RcTooltip>
  )
}

// normal
Tooltip.defaultProps = {
  type: 'active',
  placement: 'right',
  hasArrow: true,
}

export default Tooltip
