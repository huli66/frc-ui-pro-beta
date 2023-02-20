import React, { FC, useRef, useState, useEffect } from "react";
import classNames from "classnames";
import { Tooltip as AntdTooltip, TooltipProps as AntdTooltipProps } from "antd";

export type ToolTipPlacementType =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "leftTop"
  | "leftBottom"
  | "rightTop"
  | "rightBottom";
export type ToolTipBorderType = "thick" | "thin";

interface BaseTooltipProps {
  /** 判断文本是否过长(文本超出容器)，过长后无文字提示 */
  overText?: boolean;
  /** 文本超出容器的回调 */
  onOverTextChange?: (isOver: boolean) => void;
  /** 强制显示Tooltip(在overText下，文本未超出时使用forceDisplay强制显示) */
  forceDisplay?: boolean;
  /** 设置tooltip内容 */
  title?: React.ReactNode;
  /** 设置tooltip显示位置*/
  placement?: ToolTipPlacementType;
  /** 设置tooltip是否携带箭头 */
  hasArrow?: boolean;
  /** 设置边框样式 */
  borderType?: ToolTipBorderType;
  /** 用于手动控制提示是否可见 */
  visible?: boolean;
  /** 该值将合并到placement的配置中,设置内容参考dom-align*/
  align?: object;
  /** 箭头是否指向目标元素中心 */
  arrowPointAtCenter?: boolean;
  /** tooltip位置受限时是否自动调整位置	 */
  autoAdjustOverflow?: boolean;
  /** 默认显示状态 */
  defaultVisible?: boolean;
  /** tooltip隐藏后是否销毁dom中的tooltip */
  destroyTooltipOnHide?: boolean;
  /** tooltip显示迟延（s） */
  mouseEnterDelay?: number;
  /** tooltip消失迟延（s） */
  mouseLeaveDelay?: number;
  /** 提示框类名 */
  overlayClassName?: string;
  /** 提示框外层样式 */
  overlayStyle?: object;
  /** 提示框内层样式 */
  overlayInnerStyle?: object;
  /** 设置 tooltip 的 z-index */
  zIndex?: number;
  /** tooltip可见状态变化的回调 */
  onVisibleChange?: (visible: boolean) => void;
}

export type FRCTooltipProps = BaseTooltipProps &
  Omit<
    AntdTooltipProps,
    | "placement"
    | "autoAdjustOverflow"
    | "destroyTooltipOnHide"
    | "onVisibleChange"
  >;

export const Tooltip: FC<FRCTooltipProps> = (props) => {
  const {
    overText,
    onOverTextChange,
    forceDisplay,
    title,
    placement,
    hasArrow,
    borderType,
    overlayClassName,
    children,
    className,
    style,
    ...restProps
  } = props;

  const node = useRef<HTMLDivElement>(null);
  const textWrap = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState(false);
  let size: number | null = null;

  const classes = classNames("frc-tooltip", overlayClassName, {
    [`frc-tooltip-without-arrow`]: !hasArrow,
    [`frc-tooltip-placement-${placement}`]: placement,
    [`frc-tooltip-border-${borderType}`]: borderType,
  });

  const options = {
    title: title,
    overlayClassName: classes,
    placement: placement,
    ...restProps,
  };

  useEffect(() => {
    if (overText) {
      window.addEventListener("resize", handleSize);
      handleSize();
      return () => {
        window.removeEventListener("resize", handleSize);
      };
    }
  }, [children]);

  useEffect(() => {
    if (onOverTextChange) {
      onOverTextChange(show);
    }
  }, [show]);

  const getWidth = () => {
    if (textWrap.current && node.current) {
      const thisWidth = node.current!.getBoundingClientRect().width;
      const wrapWidth = textWrap.current!.getBoundingClientRect().width;
      setShow(thisWidth < wrapWidth);
    }
  };

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
        whiteSpace: "nowrap",
        cursor: "default",
        textOverflow: "ellipsis",
        overflow: "hidden",
        maxWidth: "100%",
        maxHeight: "100%",
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );

  const renderTextToolTip = () => {
    return (
      <div
        ref={node}
        style={{
          position: "relative",
          maxWidth: "100%",
          maxHeight: "100%",
          ...style,
        }}
        className={className}
      >
        <span
          ref={textWrap}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            whiteSpace: "nowrap",
            opacity: 0,
            zIndex: -1,
          }}
        >
          {children}
        </span>
        {show ? <Tooltip {...options}>{textContent}</Tooltip> : forceDisplay ? <Tooltip {...options}>{textContent}</Tooltip> : textContent}
      </div>
    );
  };

  // main
  return overText ? (
    renderTextToolTip()
  ) : (
    <AntdTooltip className={className} {...options}>
      <div style={{ ...style }}>
        {children}
      </div>
    </AntdTooltip>
  );
};

// normal
Tooltip.defaultProps = {
  overText: false,
  forceDisplay: false,
  placement: "right",
  hasArrow: true,
  borderType: "thin",
  arrowPointAtCenter: false,
  autoAdjustOverflow: true,
  defaultVisible: false,
  destroyTooltipOnHide: false,
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  title: "文字提示",
};

export default Tooltip;
