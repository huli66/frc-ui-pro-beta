import React, { FC, useEffect, useState } from 'react'
import 'moment/locale/zh-cn'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { LeftOutlined, RightOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';

export const tuple = <T extends string[]>(...args: T) => args;
const PlacementTypes = tuple('top', 'right', 'bottom', 'left');
type placementType = typeof PlacementTypes[number];

export interface ISqueezeDrawerProps {
  /** 弹出层宽度 placement设置为 right 和 left 时生效 */
  width?: number | string,
  /** 弹出层高度 placement设置为 top 和 bottom 时生效 */
  height?: number | string,
  /** 折叠抽屉的外层类名 */ 
  className?: string,
  /** 弹出方向 */
  placement?: placementType,
  /** 弹出层内容 */
  extraContent?: ReactElement,
  /** 主层内容 */
  mainContent?: ReactElement
  /** 开启图标 */
  // openIcon?: ReactElement,
  /** 关闭图标 */
  // closeIcon?: ReactElement
  /** 弹出层内容是否显示 */
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
    extraContent, mainContent, extraContentVisible, className,
    width, height, style: styleProps, extraContentStyle: extraContentStyleProps,
    mainContentStyle, turnStyle: turnStyleProps, placement, onOpenChange,
  } = props

  const [visible, setVisible] = useState(false)

  useEffect(() => { setVisible(!!extraContentVisible) }, [extraContentVisible])

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

  const styleOfPlacement = {
    top: 'column-reverse' as 'column-reverse',
    right: 'row' as 'row',
    bottom: 'column' as 'column',
    left: 'row-reverse' as 'row-reverse'
  }

  const handleSetFlagIcon = (currentPlacement: placementType, currentVisible: boolean) => {
    let flagIcon = <LeftOutlined />
    if (currentPlacement === 'top') {
      flagIcon = (currentVisible ? <UpOutlined /> : <DownOutlined />)
    }
    if (currentPlacement === 'bottom') {
      flagIcon = (currentVisible ? <DownOutlined /> : <UpOutlined />)
    }
    if (currentPlacement === 'right') {
      flagIcon = (currentVisible ? <RightOutlined /> : <LeftOutlined />)
    }
    if (currentPlacement === 'left') {
      flagIcon = (currentVisible ? <LeftOutlined /> : <RightOutlined />)
    }
    return flagIcon
  }

  const getStyle = (currentPlacement: placementType, currentVisible: boolean) => {
    let style: React.CSSProperties = {}
    style = {
      ...style,
      ...styleProps
    }
    return style
  }

  const getContentContainerStyle = (currentPlacement: placementType, currentVisible: boolean) => {
    let style: React.CSSProperties = {}
    if (currentPlacement === 'top') {
      style.flexDirection = styleOfPlacement.top
    }
    if (currentPlacement === 'bottom') {
      style.flexDirection = styleOfPlacement.bottom
    }
    if (currentPlacement === 'right') {
      style.flexDirection = styleOfPlacement.right
    }
    if (currentPlacement === 'left') {
      style.flexDirection = styleOfPlacement.left
    }
    // style = {
    //   ...style,
    //   ...styleProps
    // }
    return style
  }

  const getMainContentStyle = (currentPlacement: placementType, currentVisible: boolean) => {
    let style: React.CSSProperties = {}
    style = {
      ...style,
      ...mainContentStyle
    }
    return style
  }

  const getExtraContentStyle = (currentPlacement: placementType, currentVisible: boolean) => {
    let style: React.CSSProperties = {}
    if (currentPlacement === 'top') {
      style.height = currentVisible ? height : 0
    }
    if (currentPlacement === 'bottom') {
      style.height = currentVisible ? height : 0
    }
    if (currentPlacement === 'right') {
      style.width = currentVisible ? width : 0
    }
    if (currentPlacement === 'left') {
      style.width = currentVisible ? width : 0
    }
    style = {
      ...style,
      ...extraContentStyleProps
    }
    return style
  }

  const getTurnStyle = (currentPlacement: placementType, currentVisible: boolean) => {
    let style: React.CSSProperties = {}
    if (currentPlacement === 'top') {
      style.top = currentVisible ? height : 0
      style.left = '50%'
      style.width = '40px'
      style.height = '8px'
      style.marginLeft = '-20px'
    }
    if (currentPlacement === 'bottom') {
      style.bottom = currentVisible ? height : 0
      style.left = '50%'
      style.width = '40px'
      style.height = '8px'
      style.marginLeft = '-20px'
    }
    if (currentPlacement === 'right') {
      style.right = currentVisible ? width : 0
      style.top = '50%'
      style.width = '8px'
      style.height = '40px'
      style.marginTop = '-20px'
    }
    if (currentPlacement === 'left') {
      style.left = currentVisible ? width : 0
      style.top = '50%'
      style.width = '8px'
      style.height = '40px'
      style.marginTop = '-20px'
    }
    style = {
      ...style,
      ...turnStyleProps
    }
    return style
  }

  return (
    <div className={`${className} frc-squeeze-drawer`} style={getStyle(placement!, visible)}>
      <div className='content-container' style={getContentContainerStyle(placement!, visible)}>
        <div className='frc-squeeze-drawer-main-content' style={getMainContentStyle(placement!, visible)}>
          {mainContent}
        </div>
        <div className='frc-squeeze-drawer-extra-content' style={getExtraContentStyle(placement!, visible)}>
          {visible && extraContent}
        </div>
      </div>
      <div className='open-flag' onClick={handleClick} style={getTurnStyle(placement!, visible)} >
        {handleSetFlagIcon(placement!, visible)}
      </div>
    </div>
  )
}

// normal
SqueezeDrawer.defaultProps = {
  placement: 'left',
  width: 300,
  height: 200,
  mainContent: (
    <div
      style={{
        textAlign: 'center',
        height: '100%',
        width: '100%'
      }}>
      我是主层级
    </div>
  ),
  extraContent: (
    <div
      style={{
        textAlign: 'center',
      }}>
      我是弹出层级
    </div>
  )
}

export default SqueezeDrawer
