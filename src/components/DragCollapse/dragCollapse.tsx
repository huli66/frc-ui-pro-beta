import React, { FC, useRef, useState, useEffect } from 'react'
export interface IDragCollapseProps {
    /** 折叠抽屉的外层类名 */
    className?: string,
    /** 排列方式 */
    mode?: 'vertical' | 'horizontal'
    /** 主层内容 */
    mainContent?: React.ReactNode,
    /** 侧层内容 */
    extraContent?: React.ReactNode
    /** 主层初始高度 */
    mainContentInit?: number,
    /** 拖拽抽屉时的回调 */
    onDragChange?: (e: number) => void,

}

export const DragCollapse: FC<IDragCollapseProps> = (props) => {
    const { className, mainContent, extraContent, mode, mainContentInit, onDragChange } = props
    const [topSize, setTopSize] = useState(mainContentInit)
    const hrBox: any = useRef(null)
    const getTopStyle = (mode: any) => {
        let style: React.CSSProperties = {}
        if (mode === 'horizontal') {
            style.width = '0'
            style.width = topSize + 'px'
        } else {
            style.height = topSize + 'px'
        }
        return style
    }

    function changeHeightStart(el: any) {
        if (mode === 'horizontal') {
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

    useEffect(() => {
        if(onDragChange && topSize){
            onDragChange(topSize)
        }
    },[topSize])

    return (
        <div className={`${className} frc-dcollapse-drawer`}>
            <div className={mode === 'horizontal' ? 'content-row-container' : 'content-container'}>
                <div className='frc-dcollapse-drawer-top' style={getTopStyle(mode)}>
                    {mainContent}
                </div>
                <div className={mode === 'horizontal' ? 'frc-dcollapse-drawer-hr-row' : 'frc-dcollapse-drawer-hr'} ref={hrBox} onMouseDown={changeHeightStart}>
                    <div className={mode === 'horizontal' ? 'frc-dcollapse-drawer-hr-row-arr' : 'frc-dcollapse-drawer-hr-arr'} ></div>
                </div>
                <div className={mode === 'horizontal' ? 'frc-dcollapse-drawer-row-bottom' : 'frc-dcollapse-drawer-bottom'}>
                    {extraContent}
                </div>
            </div>
        </div>
    )
}

// normal
DragCollapse.defaultProps = {
    mode: 'vertical',
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

export default DragCollapse
