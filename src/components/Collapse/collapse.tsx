import { ReactElement } from 'react-markdown/lib/react-markdown'
import React, { FC, useRef, useState } from 'react'
export interface ICollapseProps {
    /** 折叠抽屉的外层类名 */
    className?: string,
    /** 主层初始高度 */
    mainContentInit?: number,
    /** 主层内容 */
    mainContent?: ReactElement,
    /** 侧层内容 */
    extraContent?: ReactElement
    /** 排列方式 */
    arrangement?: boolean
}

export const Collapse: FC<ICollapseProps> = (props) => {
    const { className, mainContent, extraContent, arrangement, mainContentInit } = props
    const [topSize, setTopSize] = useState(mainContentInit)
    const hrBox: any = useRef(null)
    const getTopStyle = (arrangement: boolean) => {
        let style: React.CSSProperties = {}
        if (arrangement === true) {
            style.width = '0'
            style.width = topSize + 'px'
        } else {
            style.height = topSize + 'px'
        }
        return style
    }

    function changeHeightStart(el: any) {
        if (arrangement) {
            if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                const diff = el.changedTouches[0].clientX - hrBox.current.offsetLeft
                document.ontouchmove = function (e) {
                    let newTopSize = e.changedTouches[0].clientX - diff
                    if (hrBox.current.parentElement!.offsetWidth > newTopSize && newTopSize > 0) {
                        setTopSize(newTopSize)
                    }
                    document.ontouchend = function () {
                        document.ontouchmove = null
                    }
                }
            } else {
                let diff = el.clientX - hrBox.current.offsetLeft
                document.onmousemove = function (e) {
                    let newTopSize = e.clientX - diff
                    if (hrBox.current.parentElement!.offsetWidth > newTopSize && newTopSize > 0) {
                        setTopSize(newTopSize)
                    }
                    document.onmouseup = function () {
                        document.onmousemove = null
                    }
                }
            }
        } else {
            if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                const diff = el.changedTouches[0].clientY - hrBox.current.offsetTop
                document.ontouchmove = function (e: TouchEvent) {
                    let newTopSize = e.changedTouches[0].clientY - diff
                    if (hrBox.current.parentElement!.offsetHeight > newTopSize && newTopSize > 0) {
                        setTopSize(newTopSize)
                    }
                    document.ontouchend = function () {
                        document.ontouchmove = null
                    }
                }
            } else {
                let diff = el.clientY - hrBox.current.offsetTop
                document.onmousemove = function (e) {
                    let newTopSize = e.clientY - diff
                    if (hrBox.current.parentElement!.offsetHeight > newTopSize && newTopSize > 0) {
                        setTopSize(newTopSize)
                    }
                    document.onmouseup = function () {
                        document.onmousemove = null
                    }
                }
            }
        }
 
    }
    const getContainerStyle = (arrangement: boolean) => {
        let style: React.CSSProperties = {}
        if (arrangement === true) {
          style.flexDirection = 'row'
        }
        return style
    }
    const getBottomStyle = (arrangement: boolean) => {
        let style: React.CSSProperties = {}
        if (arrangement === true) {
          style.height = '100%'
        }
        return style
    }
  
    return (
        <div className={`${className} frc-collapse-drawer`}>
            <div className='content-container' style={getContainerStyle(arrangement!)}>
                <div className='frc-collapse-drawer-top' style={getTopStyle(arrangement!)}>
                    {mainContent}
                </div>
                <div className={ arrangement ? 'frc-collapse-drawer-hr-row' : 'frc-collapse-drawer-hr'} ref={hrBox} onMouseDown={changeHeightStart} onTouchStart={changeHeightStart}>
                    <div className={ arrangement ? 'frc-collapse-drawer-hr-row-arr' : 'frc-collapse-drawer-hr-arr'} ></div>
                </div>
                <div className='frc-collapse-drawer-bottom' style={getBottomStyle(arrangement!)}>
                    {extraContent}
                </div>
            </div>
        </div>
    )
}

// normal
Collapse.defaultProps = {
    mainContentInit: 200,
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
                height: '100%',
                width: '100%'
            }}>
            我是次层级
        </div>
    )
}

export default Collapse
