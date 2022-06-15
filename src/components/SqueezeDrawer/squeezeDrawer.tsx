import React, { FC, useRef, useEffect, useState, useCallback } from 'react'
import 'moment/locale/zh-cn'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './_style.scss'
import { StyleObject } from 'npmlog'

export interface IContent {
  key: string | number
  width?: number
  content: ReactElement
  show?: boolean,
  onClick?: () => {}
}

export interface IOpenFlag {
  top?: number
  bottom?: number
  right?: number
  left?: number
}

export interface ISqueezeDrawerProps {
  /** 宽度 */
  width?: number,
  /** 弹出层内容 */
  extraContent?: ReactElement,
  /** 主层内容 */
  mainContent?: ReactElement
  /** 主层内容 */
  extraContentVisible?: boolean
  /** 主层内容 */
  onChange?: (nextExtraContentVisible?: boolean, preExtraContentVisible?: boolean) => any
  /** 主层内容 */
  style?: StyleObject
  /** 主层内容 */
  extraContentStyle?: StyleObject
  /** 主层内容 */
  mainContentStyle?: StyleObject
}

const SqueezeDrawer: FC<ISqueezeDrawerProps> = (props) => {
  const { extraContent, mainContent, extraContentVisible, width, onChange } = props
  const [visible, setVisible] = useState(false)
  const defaultHandleChange = () => {
    let nextVisible = visible
    if (extraContentVisible === undefined) {
      nextVisible = !visible
    }
    setVisible(nextVisible)
  }
  useEffect(() => setVisible(!!extraContentVisible), [extraContentVisible])
  const handleChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): any => {
    const handleOnpenFlagClick = onChange || defaultHandleChange
    handleOnpenFlagClick(!extraContentVisible, extraContentVisible)
  }

  const style = {
    width: visible ? (width ? width : 'fit-content') : 0
  }
  return (
    <div className="frc-squeeze-drawer">
      <div className='frc-squeeze-drawer-main-content'>
        {mainContent}
      </div>
      <div className='frc-squeeze-drawer-extra-content' style={style}>
        <div className='open-flag' onClick={handleChange} >
          {visible ? <RightOutlined /> : <LeftOutlined />}
        </div>
        {visible && extraContent}
      </div>
    </div>
  )
}

// normal
SqueezeDrawer.defaultProps = {}

export default SqueezeDrawer
