import React, { FC, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { TimePicker } from 'antd'
import { TimeRangePickerProps } from 'antd/es/time-picker'
import ReactDOM from 'react-dom'
import {
  BackwardOutlined,
  ForwardOutlined,
  ClockCircleOutlined,
  CaretRightOutlined,
  CaretLeftOutlined,
} from '@ant-design/icons'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'

const { RangePicker } = TimePicker

const FORMAT_COLUMNS = ['HH:mm', 'HH', 'mm', 'ss', 'mm A', 'mm a'];

interface FRCRangeTimePickerCustomProps {
  /** 前缀图标 */
  prefixIcon?: React.ReactNode
  /** 显示此刻 */
  showTime?: boolean
  /** 始末时间是否自动排序 */
  order?: number
  /** 设置激活状态 */
  work?: boolean
}

export type FRCRangeTimePickerProps = FRCRangeTimePickerCustomProps & TimeRangePickerProps

const addPrefixNode = (nodes: any, prefixIcon: React.ReactNode) => {
  const addNode = document.createElement('div')
  addNode.setAttribute('class', 'frc-date-picker-prefix')

  // dom container insert
  const currentDom = nodes.current
  const parentNode = currentDom.querySelector('.ant-picker-input')

  // -------------------------------------------------------------------

  if (parentNode) {
    parentNode.insertBefore(addNode, currentDom.querySelector('input'))
    // icon insert
    ReactDOM.render(
      prefixIcon as any,
      currentDom.querySelector('.frc-date-picker-prefix'),
    )
  }
}

const insertFrcBtn = () => {
  const currentDoms = document.querySelectorAll('.ant-picker-ok button')
  currentDoms && currentDoms.forEach(dom => {
    const btnClass = dom?.getAttribute('class') || ''
    if (btnClass.indexOf('frc-btn') === -1) {
      dom?.setAttribute('class', btnClass + ' frc-btn frc-btn-primary')
    }
  })
}

export const FRCRangeTimePicker: FC<FRCRangeTimePickerProps> = (props) => {
  const nodes = useRef(null)

  const {
    className,
    prefixIcon,
    dropdownClassName,
    showTime,
    suffixIcon,
    format,
    popupClassName,
    onOpenChange,
    work,
    ...restProps
  } = props

  // add prefix node
  useEffect(() => {
    prefixIcon && addPrefixNode(nodes, prefixIcon)
  }, [prefixIcon])

  const classes = classNames('frc-date-picker frc-time-picker', className, {
    [`frc-date-picker-work`]: work,
    [`frc-date-picker-suffix-icon`]: suffixIcon
  })

  const classesDropdown = classNames(
    'frc-date-picker-dropdown frc-time-picker-dropdown',
    popupClassName,
    {
      [`frc-time-picker-dropdown-now-float`]: FORMAT_COLUMNS.indexOf(format as string) !== -1,
    },
  )

  const options = {
    className: classes,
    prefixIcon,
    popupClassName: classesDropdown,
    suffixIcon,
    format,
    onOpenChange: (open: boolean) => {
      onOpenChange && onOpenChange(open)
      open &&
        setTimeout(() => {
          insertFrcBtn()
        }, 0)
    },
    ...restProps,
  }

  // main
  return (
    <div ref={nodes} className="frc-date-picker-container">
      <RangePicker {...options} />
    </div>
  )
}

// normal
FRCRangeTimePicker.defaultProps = {
  prefixIcon: <ClockCircleOutlined />,
  suffixIcon: false,
  // showToday: false,
  superPrevIcon: <BackwardOutlined />,
  superNextIcon: <ForwardOutlined />,
  prevIcon: <CaretLeftOutlined />,
  nextIcon: <CaretRightOutlined />,
  locale: locale,
  separator: <span style={{ fontSize: 14 }}>～</span>,
}

export default FRCRangeTimePicker
