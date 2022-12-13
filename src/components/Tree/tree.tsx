import React,{forwardRef} from 'react';
import {Tree as AntTree,TreeProps} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import type {DataNode} from 'antd/es/tree';
import type TreeRef from 'rc-tree';

export type {DataNode,TreeRef};

export interface FRCTreeProps extends TreeProps {
  /** 是否允许拖拽时放置在该节点 */
  allowDrop?: TreeProps['allowDrop']
  /** 是否自动展开父节点 */
  autoExpandParent?: boolean;
  /** 是否节点占据一行 */
  blockNode?: boolean;
  /** 节点前添加 Checkbox 复选框 */
  checkable?: boolean;
  /** （受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点 key，则子节点自动选中；相应当子节点 key 都传入，父节点也自动选中。当设置 checkable 和 checkStrictly，它是一个有checked和halfChecked属性的对象，并且父子节点的选中与否不再关联 */
  checkedKeys?: React.Key[] | {checked: React.Key[];halfChecked: React.Key[]};
  /** checkable 状态下节点选择完全受控（父子节点选中状态不再关联） */
  checkStrictly?: boolean;
  /** 默认选中复选框的树节点 */
  defaultCheckedKeys?: React.Key[];
  /** 默认展开所有树节点 */
  defaultExpandAll?: boolean;
  /** 默认展开指定的树节点 */
  defaultExpandedKeys?: React.Key[];
  /** 默认展开父节点 */
  defaultExpandParent?: boolean;
  /** 默认选中的树节点 */
  defaultSelectedKeys?: React.Key[];
  /** 将树禁用 */
  disabled?: boolean;
  /** 设置节点可拖拽，可以通过 icon: false 关闭拖拽提示图标 */
  draggable?: TreeProps['draggable'];
  /** （受控）展开指定的树节点 */
  expandedKeys?: React.Key[];
  /** 自定义节点 title、key、children 的字段 */
  fieldNames?: {title:string; key:string; children:string};
  /** 按需筛选树节点（高亮），返回 true */
  filterTreeNode?: TreeProps['filterTreeNode'];
  /** 设置虚拟滚动容器高度，设置后内部节点不再支持横向滚动 */
  height?: number;
  /** 自定义树节点图标。 */
  icon?: TreeProps['icon'];
  /** 异步加载数据 */
  loadData?: TreeProps['loadData'];
  /** （受控）已经加载的节点，需要配合 loadData 使用 */
  loadedKeys?: React.Key[];
  /** 支持点选多个节点（节点本身）*/
  multiple?: boolean;
  /** 添加在 Tree 最外层的 className */
  rootClassName?: string;
  /** 添加在 Tree 最外层的 style */
  rootStyle?: React.CSSProperties;
  /** 是否可选中 */
  selectable?: boolean;
  /** （受控）设置选中的树节点 */
  selectedKeys?: React.Key[];
  /** 是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式 */
  showIcon?: boolean;
  /** 是否展示连接线 */
  showLine?: TreeProps['showLine'];
  /** 自定义树节点的展开/折叠图标 */
  switcherIcon?: TreeProps['switcherIcon'];
  /** 自定义渲染节点 */
  titleRender?: TreeProps['titleRender'];
  /** treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一） */
  treeData?: TreeProps['treeData'];
  /** 设置 false 时关闭虚拟滚动 */
  virtual?: boolean;
  /** 点击复选框触发 */
  onCheck?: TreeProps['onCheck'];
  /** dragend 触发时调用 */
  onDragEnd?: TreeProps['onDragEnd'];
  /** dragenter 触发时调用 */
  onDragEnter?: TreeProps['onDragEnter'];
  /** dragleave 触发时调用 */
  onDragLeave?: TreeProps['onDragLeave'];
  /** dragover 触发时调用 */
  onDragOver?: TreeProps['onDragOver'];
  /** 开始拖拽时调用 */
  onDragStart?: TreeProps['onDragStart'];
  /** drop 触发时调用 */
  onDrop?: TreeProps['onDrop'];
  /** 展开/收起节点时触发 */
  onExpand?: TreeProps['onExpand'];
  /** 节点加载完毕时触发 */
  onLoad?: TreeProps['onLoad'];
  /** 响应右键点击 */
  onRightClick?: TreeProps['onRightClick'];
  /** 点击树节点触发 */
  onSelect?: TreeProps['onSelect'];
  // --------------- methods ---------------
  /** 虚拟滚动下，滚动到指定 key 条目 */
  scrollTo?: TreeRef['scrollTo'];
}

export const FRCTree = forwardRef<TreeRef,FRCTreeProps>(
  (props,ref) => {
    const {
      rootClassName,
      showLine,
      switcherIcon,
      ...others
    } = props;
  
    const cls = classNames('frc-tree',rootClassName,{})
  
    const options = {
      rootClassName: cls,
      showLine,
      switcherIcon: showLine? switcherIcon : switcherIcon || <DownOutlined style={{fontSize:8}} />,
      ...others
    } as TreeProps
    return <AntTree ref={ref} {...options} />
  }
)

FRCTree.defaultProps = {
  selectable: false,
  blockNode: true
}

export default FRCTree;