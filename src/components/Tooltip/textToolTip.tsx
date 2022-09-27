import React, { FC, useRef, useState, useEffect } from 'react'
import { Tooltip, FRCTooltipProps } from './tooltip'


interface TextTooltipProps extends FRCTooltipProps{
  className?: string;
  style?: object;
}

export const TextTooltip: FC<TextTooltipProps> = (props) => {
  const {
    children,
    className,
    style,
    ...res
  } = props

  const node = useRef<HTMLDivElement>(null)
  const textWrap = useRef<HTMLSpanElement>(null)
  const [show, setShow] = useState(false)
  let size: number | null = null;

  useEffect(() => {
    window.addEventListener('resize', handleSize);
    handleSize();
    return () => {
      window.removeEventListener('resize', handleSize);
    }
  }, [])

  const getWidth = () => {
    if (textWrap.current && node.current) {
      const thisWidth = node.current!.getBoundingClientRect().width;
      const wrapWidth = textWrap.current!.getBoundingClientRect().width;
      setShow(thisWidth < wrapWidth);
      console.log(thisWidth, wrapWidth);
      
    }
  }

  const handleSize = () => {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    if (!size || width * height !== size) {
      setTimeout(() => {
        getWidth();
      });
    }
    size = width * height;
  };

  const textContent = (
    <span
      style={{
        whiteSpace: 'nowrap',
        cursor: 'default',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: '100%',
        maxHeight: '100%',
        display: 'inline-block'
      }}
    >
      {children}
    </span>
  );

  return (
    <div
      ref={node}
      style={{
        position: 'relative',
        maxWidth: '100%',
        maxHeight: '100%',
        ...style
      }}
      className={className}
    >
      <span
        ref={textWrap}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          whiteSpace: 'nowrap',
          opacity: 0,
          zIndex: -1
        }}
      >
        {children}
      </span>
      {show ? <Tooltip title={children} {...res}>{textContent}</Tooltip> : textContent}
    </div>
  )
}

export default TextTooltip
