import React, { ReactEventHandler, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { ComponentMeta } from '@storybook/react';

import {
  Title,
  Description,
  ArgsTable,
  Stories,
  Heading,
  Subheading
} from '@storybook/addon-docs';

import DndList from './index';
import { IDndListProps } from './DndContainer'
import './_story.scss'
import { useCallback } from '@storybook/addons';

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
  const markdown = `
~~~js
import { SqueezeDrawer } from 'frc-ui-pro';

export const _ControlComponent = () => {
  const [visible, setVisible] = useState(true)
  const onHandleClick = (open: boolean) => {
    setVisible(open)
  }

  return (
    <div className='suqeeze-drawer-container'>
      <SqueezeDrawer extraContentVisible={visible} onOpenChange={onHandleClick} />
    </div>
  )
};
~~~

~~~css
.suqeeze-drawer-container{
  width: 100%;
  height: 400px;
  background-color: gray;
}
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
  title: '数据显示/DndList 拖拽列表',
  component: DndList,
  parameters: {
    docs: {
      // docs 页面 => 总体布局
      page: () => (
        <>
          <Title />
          <Description>选择对应项，拖拽</Description>
          <ImportComponent />
          <Stories title="组件总览" includePrimary={true} />
          <Heading>API</Heading>
          <Subheading>属性</Subheading>
          <Subheading>DndList 拖拽列表</Subheading>
          <ArgsTable of={DndList} />
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof DndList>;

// ----------------------------------------------------------------

export const DndListDefault = (args: IDndListProps) => {
  const [dataList, setDataList] = useState<any[]>([{ value: 55555 }, { value: 66666 }, { value: 77777 }])
  return (
    <div className='dndlist-container'>
      <DndList
        {...args}
        dataList={dataList}
        type={'yuo'}
        itemKey={item => item.value}
        render={item => (<div style={{ height: 100 }}>{item.value}</div>)}
        drop={(dragItem, dropItem) => {
          // const newDataList = [...dragDataList]
          const newDataList = [...dataList]
          const dragItemIndex = newDataList.findIndex(item => dragItem.value === item.value)
          newDataList.splice(dragItemIndex, 1)
          const dropItemIndex = newDataList.findIndex(item => dropItem.value === item.value)
          newDataList.splice(dropItemIndex + 1, 0, dragItem)
          setDataList(newDataList)
        }}
        listItemStyle={{ background: 'blue',marginBottom: '5px' }}
      />
    </div>
  )
};

DndListDefault.storyName = '默认 DndList';
DndListDefault.parameters = {};