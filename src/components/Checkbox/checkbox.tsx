import React, { FC } from 'react'
import classNames from 'classnames'
import { Checkbox as AntdCheckbox , CheckboxProps } from 'antd'

interface CheckboxChangeEventTarget {
  indeterminate?: boolean;
  checked: boolean;
}
export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}

export interface BaseCheckboxProps extends CheckboxProps{
  /** 自动获取焦点 */
  autoFocus?: boolean
  /** 指定当前是否选中 */
  checked?: boolean
  /** 初始是否选中 */
  defaultChecked?: boolean
  /** 失效状态 */
  disabled?: boolean
  /** 设置 indeterminate 状态，只负责样式控制 */
  indeterminate?: boolean
  /** 变化时回调函数 */
  onChange?: ((e: CheckboxChangeEvent) => void) | undefined
  /** 移除焦点 */
  blur?: () => void
  /** 获取焦点 */
  focus?: () => void
}

export type FrcCheckboxProps = BaseCheckboxProps

export const Checkbox: FC<FrcCheckboxProps> = (props) => {
  const { className, ...restProps } = props

  const classes = classNames('frc-checkbox', className, {})

  const options = {
    className: classes,
    ...restProps,
  }

  // main
  return <AntdCheckbox {...options} />
}

// normal
Checkbox.defaultProps = {
  autoFocus: false,
  defaultChecked: false,
  disabled: false,
  indeterminate: false,
}

export default Checkbox
