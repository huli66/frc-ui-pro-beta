import React, { FC, useState } from 'react'
export interface ICollapseProps {
    /** 折叠抽屉的外层类名 */
    className?: string,
}

export const Collapse: FC<ICollapseProps> = (props) => {
    const { className } = props
    const [ topHeight, setTopHeight ]  = useState(200)
    const getTopHeight = () => {
        let style: React.CSSProperties = {}
        style = {
            ...style
        }
        style.height = topHeight + 'px'
        console.log('style.height',topHeight);
        
        return style
    }
    function changeHeightStart(el:any) {
        const hrbox = document.getElementById('frc-hrbox')   
        if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))){
            const diff = el.changedTouches[0].clientY - hrbox!.offsetTop
            document.ontouchmove = function(e) {
                let newTopHeight = e.changedTouches[0].clientY - diff
                if ( hrbox!.parentElement!.offsetHeight > newTopHeight && newTopHeight > 0) {
                    setTopHeight(newTopHeight)
                }
                document.onmouseup = function () {
                    document.onmousemove = null  
                }
            }
        } else{
            let diff = el.clientY - hrbox!.offsetTop
            document.onmousemove = function(e) {
                let newTopHeight = e.clientY - diff
                if ( hrbox!.parentElement!.offsetHeight > newTopHeight && newTopHeight > 0) {
                    setTopHeight(newTopHeight)
                }
                document.onmouseup = function () {
                    document.onmousemove = null     
                    diff = el.clientY - hrbox!.offsetTop
                }
            }
        }
    }

    return (
        <div className={`${className} frc-collapse-drawer`}>
            <div className='content-container'>
                <div id='frc-topbox' className='frc-collapse-drawer-top' style={getTopHeight()}>
                    上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子上面盒子
                </div>
                <div id='frc-hrbox' className='frc-collapse-drawer-hr' onMouseDown={changeHeightStart} onTouchStart={ changeHeightStart }>
                    <div className='frc-collapse-drawer-hr-arr'></div>
                </div>
                <div className='frc-collapse-drawer-bottom'>
                    下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子下面盒子
                </div>
            </div>
        </div>
    )
}

export default Collapse
