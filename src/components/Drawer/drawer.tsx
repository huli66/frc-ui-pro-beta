import React from 'react';
import {Drawer as AntDrawer,DrawerProps} from 'antd';
import classNames from 'classnames';

interface BaseDrawerProps extends Omit<DrawerProps,'push'>{
  /** 抽屉展开后是否将焦点切换至其 Dom 节点 */
  autoFocus?: boolean;
  /** 可用于设置 Drawer 内容部分的样式 */
  bodyStyle?: React.CSSProperties;
  /** 对话框外层容器的类名 */
  className?: string;
  /** 是否显示左上角的关闭按钮 */
  closable?: boolean;
  /** 自定义关闭图标 */
  closeIcon?: React.ReactNode;
  /** 可用于设置 Drawer 包裹内容部分的样式 */
  contentWrapperStyle?: React.CSSProperties;
  /** 关闭时销毁 Drawer 里的子元素 */
  destroyOnClose?: boolean;
  /** 用于设置 Drawer 弹出层的样式 */
  drawerStyle?: React.CSSProperties;
  /** 抽屉右上角的操作区域 */
  extra?: React.ReactNode;
  /** 抽屉的页脚 */
  footer?: React.ReactNode;
  /** 抽屉页脚部件的样式	 */
  footerStyle?: React.CSSProperties;
  /** 预渲染 Drawer 内元素 */
  forceRender?: boolean;
  /** 指定 Drawer 挂载的节点，并在容器内展现，false 为挂载在当前位置 */
  getContainer?: HTMLElement | (() => HTMLElement) | false;
  /** 用于设置 Drawer 头部的样式 */
  headerStyle?: React.CSSProperties;
  /** 高度, 在 placement 为 top 或 bottom 时使用 */
  height?: string | number;
  /** 是否支持键盘 esc 关闭 */
  keyboard?: boolean;
  /** 是否展示遮罩 */
  mask?: boolean;
  /** 点击蒙层是否允许关闭 */
  maskClosable?: boolean;
  /** 遮罩样式 */
  maskStyle?: React.CSSProperties;
  /** 抽屉的方向 */
  placement?: 'top' | 'right' | 'bottom' | 'left' ;
  /** 用于设置多层 Drawer 的推动行为 */
  push?: boolean | {disabled: string | number};
  /** 可用于设置 Drawer 最外层容器的样式，和 drawerStyle 的区别是作用节点包括 mask */
  style?: React.CSSProperties;
  /** 标题 */
  title?: React.ReactNode;
  /** Drawer 是否可见 */
  visible?: boolean;
  /** 宽度, 在 placement 为 right 或 left 时使用 */
  width?: string | number;
  /** 设置 Drawer 的 z-index */
  zIndex?: number;
  /** 点击遮罩层或左上角叉或取消按钮的回调 */
  onClose?: (e:any) => void;
};

export type FRCDrawerProps = BaseDrawerProps;

export const Drawer: React.FC<FRCDrawerProps> = (props) => {
  const {className, ...rest} = props;

  const cls = classNames('frc-drawer',className,{});

  const options = {
    className:cls,
    ...rest,
  } as DrawerProps;

  return <AntDrawer {...options}/>;
}

Drawer.defaultProps = {
  autoFocus:true,
  closable: true,
  destroyOnClose: false,
  placement:'right',
  height: 378,
  keyboard: true,
  mask: true,
  maskClosable: true,
  width: 378,
  zIndex: 1000,
};

export default Drawer;