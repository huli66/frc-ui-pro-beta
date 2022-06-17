import React, { FC, useEffect, useState } from 'react'
import 'moment/locale/zh-cn'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export interface ISqueezeDrawerProps {
  /** 宽度 */
  width?: number | string,
  /** 弹出层内容 */
  extraContent?: ReactElement,
  /** 主层内容 */
  mainContent?: ReactElement
  /** 主层内容是否显示 */
  extraContentVisible?: boolean
  /** 点击开关回调 */
  onOpenChange?: (open: boolean) => void
  /** SqueezeDrawer样式 */
  style?: React.CSSProperties
  /** 弹出层样式 */
  extraContentStyle?: React.CSSProperties
  /** 主层级样式 */
  mainContentStyle?: React.CSSProperties
  /** 开关样式 */
  turnStyle?: React.CSSProperties
}

export const SqueezeDrawer: FC<ISqueezeDrawerProps> = (props) => {
  const {
    extraContent,
    mainContent,
    extraContentVisible,
    width,
    onOpenChange,
    style,
    extraContentStyle: extraContentStyleProps,
    mainContentStyle,
    turnStyle
  } = props

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (extraContentVisible !== undefined) {
      setVisible(!!extraContentVisible)
    }
  }, [extraContentVisible])

  // ----------------------------------------------------------------------------------

  const handleClick = (): void => {
    if (onOpenChange) {
      // 受控组件
      onOpenChange(!visible)
    } else {
      // 默认切换
      if (extraContentVisible === undefined) {
        setVisible(!visible)
      }
    }
  }

  const extraContentStyle = {
    ...extraContentStyleProps,
    width: visible ? width : 0
  }

  // ----------------------------------------------------------------------------------

  return (
    <div className="frc-squeeze-drawer" style={style}>
      <div className='frc-squeeze-drawer-main-content' style={mainContentStyle}>
        {mainContent}
      </div>
      <div className='frc-squeeze-drawer-extra-content' style={extraContentStyle}>
        <div className='open-flag' onClick={handleClick} style={turnStyle}>
          {visible ? <RightOutlined /> : <LeftOutlined />}
        </div>
        {visible && extraContent}
      </div>
    </div>
  )
}

// normal
SqueezeDrawer.defaultProps = {
  width: '300px',
  mainContent: (
    <div
      style={{
        textAlign: 'center',
        lineHeight: '400px',
      }}>
      我是主层级
    </div>
  ),
  extraContent: (
    <div
      style={{
        textAlign: 'center',
        lineHeight: '400px',
      }}>
      我是弹出层级
    </div>
  )
}

export default SqueezeDrawer
