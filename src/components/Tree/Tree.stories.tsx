import React,{useEffect, useMemo, useRef, useState} from 'react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Icon from '../Icon';
import { ComponentMeta } from '@storybook/react';

import {
    Title,
    Description,
    ArgsTable,
    Stories,
    Heading,
    Subheading
} from '@storybook/addon-docs';

import Tree, { FRCTreeProps,DataNode,FRCDirectoryTreeProps,TreeRef } from './index';
import TreeNode from './treeNode';
import Switch from '../Switch';
import Input from '../Input';
import DirectoryTree from './directoryTree';
import Button from '../Button';

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
    const markdown = `
~~~js
import { Tree } from 'frc-ui-pro';
import { DataNode } from 'frc-ui-pro/dist/src/components/Tree';

// 按需引入 icon
import { QuestionCircleOutlined } from "@ant-design/icons";
~~~
`

    return <>
        <ReactMarkdown children={markdown} components={{
            code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                    <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={tomorrow}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                    />
                ) : (
                    <code className={className} {...props}>
                        {children}
                    </code>
                )
            }
        }} /></>
}

// ----------------------------------------------------------------

export default {
    title: '数据显示/Tree 树形控件',
    component: Tree,
    parameters: {
        docs: {
            // docs 页面 => 总体布局
            page: () => (
                <>
                    <Title />
                    <Description>多层次的结构列表。</Description>
                    <ImportComponent />
                    <Stories title="组件总览" includePrimary={true} />

                    <Heading>API</Heading>
                    <Subheading>属性</Subheading>

                    <Subheading>Tree</Subheading>
                    <ArgsTable of={Tree} exclude={['scrollTo']} />

                    <Subheading>TreeNode</Subheading>
                    <Description>
                      建议使用 treeData 来代替 TreeNode，免去手工构造麻烦
                    </Description>
                    <ArgsTable of={TreeNode} />

                    <Subheading>DirectoryTree</Subheading>
                    <ArgsTable of={DirectoryTree} />

                    <Subheading>Tree 方法</Subheading>
                    <ArgsTable of={Tree} include={['scrollTo']} />
                </>
            ),
        },
    },
    // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Tree>;

// ----------------------------------------------------------------

export const Default = (args: FRCTreeProps) => {
  const treeData: DataNode[] = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            {
              title: 'leaf0',
              key: '0-0-0-0',
            },
            {
              title: 'leaf1',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [
            { 
              title: 'leaf2', 
              key: '0-0-1-0' 
            }
          ],
        },
      ],
    },
  ];

  return <Tree {...args} treeData={treeData} />
}

Default.storyName = '默认 Tree';

// ----------------------------------------------------------------

export const _BaseComponent = () => {

  const treeData: DataNode[]= [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            {
              title: 'leaf0',
              key: '0-0-0-0',
              disabled: true,
            },
            {
              title: 'leaf1',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [
            { 
              title: <span style={{ color: '#1890ff' }}>sss</span>, 
              key: '0-0-1-0' }],
        },
      ],
    },
  ];

  return (
      <Tree
          treeData={treeData}
          checkable
          defaultExpandAll
        />
  );
};

_BaseComponent.storyName = '基本使用 Tree';
_BaseComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ControlComponent = () => {
 
  const treeData: DataNode[] = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0' },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2' },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1' },
            { title: '0-0-1-2', key: '0-0-1-2' },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0' },
        { title: '0-1-0-1', key: '0-1-0-1' },
        { title: '0-1-0-2', key: '0-1-0-2' },
      ],
    },
    {
      title: '0-2',
      key: '0-2',
    },
  ];

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0-0','0-0-1']);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeysVal: React.Key[]) => {
    console.log('onExpand',expandedKeysVal);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysVal);
    setAutoExpandParent(false);
  }

  const onCheck = (checkedKeysVal: any) => {
    console.log('onCheck',checkedKeysVal);
    setCheckedKeys(checkedKeysVal);
  }

  const onSelect = (selectedKeysVal: React.Key[],info: any) => {
    console.log('onSelect',selectedKeysVal,info);
    setSelectedKeys(selectedKeysVal);
  }

  const treeProps = {
    treeData,
    expandedKeys,
    checkedKeys,
    selectedKeys,
    autoExpandParent,
    onExpand,
    onCheck,
    onSelect,
    selectable: true,
    checkable: true,
  }

  return (
      <Tree {...treeProps}/>
  );
};

_ControlComponent.storyName = '受控操作示例';
_ControlComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _CustomIconComponent = () => {

  const treeData: DataNode[] = [
    {
      title: 'parent 1',
      key: '0-0',
      icon: <Icon type='smile-o' />,
      children: [
        {
          title: 'leaf',
          key: '0-0-0',
          icon: <Icon type='setting' />,
        },
        {
          title: 'leaf',
          key: '0-0-1',
          icon: ({ selected }) => (selected ? <Icon type='star' /> : <Icon type='star-o' />),
        },
      ],
    },
  ];

  return (
      <Tree
          treeData={treeData}
          selectable
          showIcon
          defaultExpandAll
          defaultSelectedKeys={['0-0-1']}
        />
  );
};

_CustomIconComponent.storyName = '自定义图标';
_CustomIconComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------
export const _CustomSwitchIconComponent = () => {

  const treeData: DataNode[] = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
            {
              title: 'leaf',
              key: '0-0-0-2',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [
            {
              title: 'leaf',
              key: '0-0-1-0',
            },
          ],
        },
        {
          title: 'parent 1-2',
          key: '0-0-2',
          children: [
            {
              title: 'leaf',
              key: '0-0-2-0',
            },
            {
              title: 'leaf',
              key: '0-0-2-1',
            },
          ],
        },
      ],
    },
  ];

  return (
      <Tree
          treeData={treeData}
          switcherIcon={<Icon type='down-circle' />}
          defaultExpandedKeys={['0-0-0']}
        />
  );
};

_CustomSwitchIconComponent.storyName = '自定义展开/折叠图标';
_CustomSwitchIconComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ShowLineComponent = () => {

  const treeData: DataNode[] = [
    {
      title: 'parent 1',
      key: '0-0',
      icon: <Icon type='schedule' />,
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          icon: <Icon type='schedule' />,
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
              icon: <Icon type='schedule' />
            },
            {
              title: (
                <>
                  <div>multiple line title</div>
                  <div>multiple line title</div>
                </>
              ),
              key: '0-0-0-1',
              icon: <Icon type='schedule' />,
            },
            { 
              title: 'leaf',
              key: '0-0-0-2',
              icon: <Icon type='schedule' />
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          icon: <Icon type='schedule' />,
          children: [
            {
              title: 'leaf',
              key: '0-0-1-0',
              icon: <Icon type='schedule' />
            }
          ],
        },
        {
          title: 'parent 1-2',
          key: '0-0-2',
          icon: <Icon type='schedule' />,
          children: [
            {
              title: 'leaf',
              key: '0-0-2-0',
              icon: <Icon type='schedule' />
            },
            {
              title: 'leaf',
              key: '0-0-2-1',
              icon: <Icon type='schedule' />,
              switcherIcon: <Icon type='unlock' />,
            },
          ],
        },
      ],
    },
    {
      title: 'parent 2',
      key: '0-1',
      icon: <Icon type='schedule' />,
      children: [
        {
          title: 'parent 2-0',
          key: '0-1-0',
          icon: <Icon type='schedule' />,
          children: [
            {
              title:'leaf',
              key: '0-1-0-0',
              icon: <Icon type='schedule' />
            },
            { 
              title: 'leaf',
              key: '0-1-0-1',
              icon: <Icon type='schedule' />
            },
          ],
        },
      ],
    },
  ];

  const [showLine, setShowLine] = useState<boolean>(true);
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [showLeafIcon, setShowLeafIcon] = useState<boolean>(false);

  return (
    <>
      showLine: <Switch checked={showLine} onChange={setShowLine} />
      <br />
      showIcon: <Switch checked={showIcon} onChange={setShowIcon} />
      <br />
      showLeafIcon: <Switch checked={showLeafIcon} onChange={setShowLeafIcon} />
      <br />
      <br />
      <Tree
        treeData={treeData}
        showLine={showLine? {showLeafIcon} : false}
        showIcon={showIcon}
        defaultExpandedKeys={['0-0-0']}
      />
    </>
  );
};

_ShowLineComponent.storyName = '连接线';
_ShowLineComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _SearchComponent = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>();
  const dataList = useRef<Array<{key: React.Key; title: string}>>([]);

  const defaultData: DataNode[] = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0' },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2' },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1' },
            { title: '0-0-1-2', key: '0-0-1-2' },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        {
          title: '0-1-0',
          key: '0-1-0',
          children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' },
          ],
        },
        {
          title: '0-1-1',
          key: '0-1-1',
          children: [
            { title: '0-1-1-0', key: '0-1-1-0' },
            { title: '0-1-1-1', key: '0-1-1-1' },
            { title: '0-1-1-2', key: '0-1-1-2' },
          ],
        },
        {
          title: '0-1-2',
          key: '0-1-2',
        },
      ],
    },
    {
      title: '0-2',
      key: '0-2',
    },
  ];

  useEffect(() => {
    const generateList = (data: DataNode[]) => {
      for(let i = 0;i < data.length; i++){
        const node = data[i];
        const {key} = node;
        dataList.current.push({key ,title:key as string});
        if(node.children){
          generateList(node.children);
        }
      }
    }
    generateList(defaultData);
  },[])


  
  const getParentKey = (key: React.Key, tree:DataNode[]): React.Key => {
    let parentKey: React.Key;
    for(let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if(node.children){
        if(node.children.some(n => n.key === key)){
          parentKey = node.key;
        }else if(getParentKey(key,node.children)){
          parentKey = getParentKey(key,node.children);
        }
      }
    }
    return parentKey!
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    const newExpandedKeys = !value? [] : dataList.current
      .map(d => {
        if(d.title.includes(value)){
          return getParentKey(d.key, defaultData);
        }
        return null;
      })
      .filter((d,i,self) => d && self.indexOf(d) === i);
    setExpandedKeys(newExpandedKeys as React.Key[]);
    setSearchText(value);
    setAutoExpandParent(true);
  }

  const onExpand = (keys: React.Key[]) => {
    setAutoExpandParent(false);
    setExpandedKeys(keys);
  }

  const treeData = useMemo<DataNode[]>(() => {
    const loop = (data: DataNode[]): DataNode[] => 
      data.map(d => {
        const strTitle = d.title as string;
        const index = strTitle.indexOf(searchText);
        const beforeStr = strTitle.substring(0,index);
        const afterStr = strTitle.substring(index + searchText.length);
        const title = 
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{color:'#f50'}}>{searchText}</span>
              {afterStr}
            </span>
          ) : (
            <span>{strTitle}</span>
          );
        if(d.children){
          return {title, key:d.key, children: loop(d.children)}
        }
        return {title, key:d.key}
      });
    return loop(defaultData);
  },[searchText]);


  return (
    <>
      <Input.Search allowClear value={searchText} onChange={handleInputChange}  />
      <Tree
        treeData={treeData}
        autoExpandParent={autoExpandParent}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
      />
    </>
);
}
_SearchComponent.storyName = '可搜索树';
_SearchComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ZAsyncDataComponent = () => {

  const updateTreeData = (data: DataNode[],key:React.Key,children:DataNode[]): DataNode[] => 
    data.map(d => {
      if(d.key === key){
        return {
          ...d,
          children
        }
      }
      if(!!d.children?.length){
        return {
          ...d,
          children: updateTreeData(d.children,key,children)
        }
      }
      return d;
    })

  const [treeData, setTreeData] = useState<DataNode[]>([
    { title: 'Expand to load', key: '0' },
    { title: 'Expand to load', key: '1' },
    { title: 'Tree Node', key: '2', isLeaf: true },
  ])

  const onLoadData:FRCTreeProps['loadData'] = ({key,children}) => {
    return new Promise<void>(resolve => {
      if(children){
        resolve();
        return;
      }
      setTimeout(() => {
        setTreeData(pre => updateTreeData(pre,key,[
          { title: 'Child Node', key: `${key}-0` },
          { title: 'Child Node', key: `${key}-1` },
        ]));
        resolve();
      },1000);
    })
  }


  return (
    <>
      点击展开节点，动态加载数据。
      <br />
      <Tree loadData={onLoadData} treeData={treeData} />
    </>
  )
}
_ZAsyncDataComponent.storyName = '异步数据加载';
_ZAsyncDataComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ZDirectoryComponent = () => {
  const defaultData: DataNode[] = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0' },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2' },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1' },
            { title: '0-0-1-2', key: '0-0-1-2' },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        {
          title: '0-1-0',
          key: '0-1-0',
          children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' },
          ],
        },
        {
          title: '0-1-1',
          key: '0-1-1',
          children: [
            { title: '0-1-1-0', key: '0-1-1-0' },
            { title: '0-1-1-1', key: '0-1-1-1' },
            { title: '0-1-1-2', key: '0-1-1-2' },
          ],
        },
        {
          title: '0-1-2',
          key: '0-1-2',
        },
      ],
    },
    {
      title: '0-2',
      key: '0-2',
    },
  ];

  const onSelect: FRCDirectoryTreeProps['onSelect'] = (keys,info) => {
    console.log('trigger Select',keys,info);
  }

  const onExpand: FRCDirectoryTreeProps['onExpand'] = (keys,info) => {
    console.log('trigger Expand',keys,info);
  }

  return ( 
    <>
      内置的目录树，multiple 模式支持 ctrl(Windows) / command(Mac) 复选。
      <br />
      <Tree.DirectoryTree
        defaultExpandedKeys={['0-0-0']}
        multiple
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={defaultData}
      />
    </>
  );
}
_ZDirectoryComponent.storyName = '目录树';
_ZDirectoryComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ZDragComponent = () => {
  const defaultData: DataNode[] = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0' },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2' },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1' },
            { title: '0-0-1-2', key: '0-0-1-2' },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        {
          title: '0-1-0',
          key: '0-1-0',
          children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' },
          ],
        },
        {
          title: '0-1-1',
          key: '0-1-1',
          children: [
            { title: '0-1-1-0', key: '0-1-1-0' },
            { title: '0-1-1-1', key: '0-1-1-1' },
            { title: '0-1-1-2', key: '0-1-1-2' },
          ],
        },
        {
          title: '0-1-2',
          key: '0-1-2',
        },
      ],
    },
    {
      title: '0-2',
      key: '0-2',
    },
  ];

  const [gData, setGData] = useState<DataNode[]>(defaultData);

  const onDragEnter: FRCTreeProps['onDragEnter'] = info => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // setExpandedKeys(info.expandedKeys)
  };

  const onDrop: FRCTreeProps['onDrop'] = info => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj: DataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar: DataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setGData(data);
  };

  return ( 
    <>
      <Tree
        defaultExpandedKeys={['0-0', '0-0-0', '0-0-0-0']}
        multiple
        draggable
        onDrop={onDrop}
        onDragEnter={onDragEnter}
        treeData={gData}
      />
    </>
  );
}
_ZDragComponent.storyName = '拖动示例';
_ZDragComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ZVirtualComponent = () => {
  const treeRef = useRef<TreeRef>(null);
  const dig = (path = '0', level = 3) => {
    const list = [];
    for (let i = 0; i < 10; i += 1) {
      const key = `${path}-${i}`;
      const treeNode: DataNode = {
        title: key,
        key,
      };
  
      if (level > 0) {
        treeNode.children = dig(key, level - 1);
      }
  
      list.push(treeNode);
    }
    return list;
  };

  const handleBtnClick = () => {
    if(treeRef.current){
      treeRef.current.scrollTo({key:'0-0-0-1'})
    }
  }

  return (
    <>
      使用 height 属性则切换为虚拟滚动。
      <br />
      <Tree ref={treeRef} treeData={dig()} height={233} defaultExpandAll />
      <Button onClick={handleBtnClick}>scroll to 0-0-0-1</Button>
    </>
  );

}
_ZVirtualComponent.storyName = '虚拟滚动';
_ZVirtualComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};