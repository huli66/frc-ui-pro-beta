import {ForwardRefExoticComponent, RefAttributes} from 'react';
import Tree, {FRCTreeProps, DataNode, TreeRef} from './tree';
import {Tree as AntTree} from 'antd';
import DirectoryTree, {FRCDirectoryTreeProps} from './directoryTree';

const {TreeNode} = AntTree;

export type FRCTreeComponent = ForwardRefExoticComponent<FRCTreeProps & RefAttributes<TreeRef>> & {
  TreeNode: typeof TreeNode;
  DirectoryTree: typeof DirectoryTree;
}

const TransTree  = Tree as FRCTreeComponent;

TransTree.TreeNode = TreeNode;
TransTree.DirectoryTree = DirectoryTree;

export default TransTree;
export type {FRCTreeProps, DataNode, FRCDirectoryTreeProps, TreeRef};