import React from "react";
import { Tree, TreeNodeProps } from "antd";

const { TreeNode: AntTreeNode } = Tree;

export interface FRCTreeNodeProps extends TreeNodeProps {
  /** 当树为 Checkbox 时，设置独立节点是否展示Checkbox */
  checkable?: boolean;
  /** 禁掉 Checkbox */
  disableCheckbox?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 设置为叶子节点 (设置了 loadData 时有效)。为 false 时会强制将其作为父节点 */
  isLeaf?: boolean;
  /** 被树的 (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys 属性所用。注意：整个树范围内的所有节点的 key 值不能重复 */
  key?: string;
  /** 是否可选 */
  selectable?: boolean;
  /** 标题 */
  title?: React.ReactNode;
  /** 自定义图标。可接收组件，props 为当前节点 props */
  icon?: TreeNodeProps['icon'];
  value?: string;
}

export const TreeNode: React.FC<FRCTreeNodeProps> = (props) => {
  return <AntTreeNode {...(props as Required<FRCTreeNodeProps>)} />;
};

export default TreeNode;
