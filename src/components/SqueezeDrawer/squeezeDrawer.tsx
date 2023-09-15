import React, { FC, useEffect, useState, useRef } from "react";
import {
  LeftOutlined,
  RightOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import classNames from "classnames";

export type PlacementType = "top" | "right" | "bottom" | "left";

export interface FRCSqueezeDrawerProps {
  /** 弹出层宽度 placement设置为 right 和 left 时生效 */
  width?: number | string;
  /** 弹出层高度 placement设置为 top 和 bottom 时生效 */
  height?: number | string;
  /** 折叠抽屉的外层类名 */
  className?: string;
  /** 弹出方向 */
  placement?: PlacementType;
  /** 弹出层内容 */
  extraContent?: React.ReactNode;
  /** 主层内容 */
  mainContent?: React.ReactNode;
  /** 开启图标 */
  // openIcon?: ReactElement,
  /** 关闭图标 */
  // closeIcon?: ReactElement
  /** 弹出层内容是否显示 */
  extraContentVisible?: boolean;
  /** 点击开关回调 */
  onOpenChange?: (open: boolean) => void;
  /** SqueezeDrawer样式 */
  style?: React.CSSProperties;
  /** 弹出层样式 */
  extraContentStyle?: React.CSSProperties;
  /** 主层级样式 */
  mainContentStyle?: React.CSSProperties;
  /** 开关样式 */
  turnStyle?: React.CSSProperties;
  /** 获取 主容器 宽高 */
  getMainContentRect?: (width: number, height: number) => void;
}

const getContentContainerStyle = (currentPlacement: PlacementType) => {
  let style: React.CSSProperties = {};
  const styleOfPlacement = {
    top: "column-reverse",
    right: "row",
    bottom: "column",
    left: "row-reverse",
  };
  style.flexDirection = styleOfPlacement[currentPlacement] as any;
  return style;
};

const getExtraContentStyle = (
  currentPlacement: PlacementType,
  currentVisible: boolean,
  height: number,
  width: number,
  initProps: any,
  getMainContentRect?: (width: number, height: number) => void,
  containerRef?: any
) => {
  let style: React.CSSProperties = {};
  if (currentPlacement === "top" || currentPlacement === "bottom") {
    style.height = currentVisible ? height : 0;
  }
  if (currentPlacement === "right" || currentPlacement === "left") {
    style.width = currentVisible ? width : 0;
  }
  style = {
    ...style,
    ...initProps,
  };

  getMainContentRect &&
    getMainContentRect(
      containerRef.current.clientWidth - ((style.width as number) || 0),
      containerRef.current.clientHeight - ((style.height as number) || 0)
    );

  return style;
};

// const handleResize = (
//   height: number,
//   width: number,
//   containerRef: any,
//   getMainContentRect: (width: number, height: number) => void
// ) => {
//   // console.log(
//   //   containerRef.current.clientWidth,
//   //   containerRef.current.clientHeight
//   // );

//   let style: React.CSSProperties = {};
//   if (currentPlacement === "top" || currentPlacement === "bottom") {
//     style.height = currentVisible ? height : 0;
//   }
//   if (currentPlacement === "right" || currentPlacement === "left") {
//     style.width = currentVisible ? width : 0;
//   }
//   style = {
//     ...style,
//     ...initProps,
//   };

//   getMainContentRect &&
//     getMainContentRect(
//       containerRef.current.clientWidth - ((width as number) || 0),
//       containerRef.current.clientHeight - ((height as number) || 0)
//     );
// };

export const SqueezeDrawer: FC<FRCSqueezeDrawerProps> = (props) => {
  const {
    extraContent,
    mainContent,
    extraContentVisible = false,
    className,
    width,
    height,
    style: styleProps,
    extraContentStyle: extraContentStyleProps,
    mainContentStyle,
    turnStyle: turnStyleProps,
    placement = "left",
    onOpenChange,
    getMainContentRect,
  } = props;

  const containerRef = useRef<any>(null);
  const [visible, setVisible] = useState(extraContentVisible);
  const [containerStyle, setContainerStyle] = useState<any>({});
  const [extraStyle, setExtraStyle] = useState<any>({});

  const handleClick = (): void => {
    if (onOpenChange) {
      // 受控组件
      onOpenChange(!visible);
    } else {
      // 默认切换
      setVisible(!visible);
    }
  };

  const renderOpenIcon = (
    currentPlacement: PlacementType,
    currentVisible: boolean
  ) => {
    let openIcon = <LeftOutlined />;
    if (currentPlacement === "top") {
      openIcon = currentVisible ? <UpOutlined /> : <DownOutlined />;
    }
    if (currentPlacement === "bottom") {
      openIcon = currentVisible ? <DownOutlined /> : <UpOutlined />;
    }
    if (currentPlacement === "right") {
      openIcon = currentVisible ? <RightOutlined /> : <LeftOutlined />;
    }
    if (currentPlacement === "left") {
      openIcon = currentVisible ? <LeftOutlined /> : <RightOutlined />;
    }
    return openIcon;
  };

  const getTurnStyle = (
    currentPlacement: PlacementType,
    currentVisible: boolean
  ) => {
    let style: React.CSSProperties = {};

    if (currentPlacement === "top" || currentPlacement === "bottom") {
      style[currentPlacement] = currentVisible ? height : 0;
    }

    if (currentPlacement === "left" || currentPlacement === "right") {
      style[currentPlacement] = currentVisible ? width : 0;
    }

    style = {
      ...style,
      ...turnStyleProps,
    };
    return style;
  };

  const classes = classNames("frc-squeeze-drawer", className, {
    [`frc-squeeze-drawer-${placement}`]: placement,
    "frc-squeeze-drawer-open": visible,
  });

  useEffect(() => {
    setVisible(extraContentVisible);
  }, [extraContentVisible]);

  useEffect(() => {
    setContainerStyle(getContentContainerStyle(placement));
  }, [placement]);

  useEffect(() => {
    // setExtraStyle(
    //   getExtraContentStyle(
    //     placement,
    //     visible,
    //     height as number,
    //     width as number,
    //     extraContentStyleProps,
    //     getMainContentRect as (width: number, height: number) => void,
    //     containerRef
    //   )
    // );
    const resize = () => {
      setExtraStyle(
        getExtraContentStyle(
          placement,
          visible,
          height as number,
          width as number,
          extraContentStyleProps,
          getMainContentRect as (width: number, height: number) => void,
          containerRef
        )
      );
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [
    placement,
    visible,
    height,
    width,
    extraContentStyleProps,
    getMainContentRect,
  ]);

  // useEffect(() => {
  //   const resizeMain = () =>
  //     handleResize(
  //       height as number,
  //       width as number,
  //       containerRef,
  //       getMainContentRect as (width: number, height: number) => void
  //     );

  //   window.addEventListener("resize", resizeMain);

  //   return () => {
  //     window.removeEventListener("resize", resizeMain);
  //   };
  // }, [placement, height, width, getMainContentRect]);

  return (
    <div className={classes} style={styleProps}>
      <div
        ref={containerRef}
        className="content-container"
        style={containerStyle}
      >
        <div
          className="frc-squeeze-drawer-main-content"
          style={mainContentStyle}
        >
          {mainContent}
        </div>
        <div className="frc-squeeze-drawer-extra-content" style={extraStyle}>
          {visible && extraContent}
        </div>
      </div>
      <div
        className="open-btn"
        onClick={handleClick}
        style={getTurnStyle(placement!, visible)}
      >
        {renderOpenIcon(placement!, visible)}
      </div>
    </div>
  );
};

// normal
SqueezeDrawer.defaultProps = {
  placement: "left",
  width: 300,
  height: 200,
  mainContent: (
    <div
      style={{
        textAlign: "center",
        height: "100%",
        width: "100%",
      }}
    >
      我是主层级
    </div>
  ),
  extraContent: (
    <div
      style={{
        textAlign: "center",
      }}
    >
      我是弹出层级
    </div>
  ),
};

export default SqueezeDrawer;
