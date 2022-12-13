import React from 'react';
import classNames from 'classnames';
import {Tree} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {DirectoryTreeProps as AntDirectoryTreeProps} from 'antd/es/tree';

const {DirectoryTree: AntDirectoryTree}  = Tree;

export interface FRCDirectoryTreeProps extends AntDirectoryTreeProps {
  /** 目录展开逻辑 */
  expandAction?: false | 'click' | 'doubleClick';
}

export const DirectoryTree: React.FC<FRCDirectoryTreeProps> = ({rootClassName, switcherIcon, ...others}) => {
  
  const cls = classNames('frc-tree',rootClassName)
  const options = {
    rootClassName: cls,
    switcherIcon:  switcherIcon || <DownOutlined style={{fontSize:8}} />,
    ...others,
  }
  return <AntDirectoryTree {...options} />;
}

DirectoryTree.defaultProps = {
  expandAction: 'click'
}

export default DirectoryTree;