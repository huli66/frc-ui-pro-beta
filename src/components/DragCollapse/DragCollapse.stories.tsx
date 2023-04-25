import React from 'react';
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

import DragCollapse,{FRCDragCollapseProps} from './index';
// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
  const markdown = `
~~~js
import { DragCollapse } from 'frc-ui-pro';
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
  title: '布局/DragCollapse 拖拽抽屉',
  component: DragCollapse,
  parameters: {
    docs: {
      // docs 页面 => 总体布局
      page: () => (
        <>
          <Title />
          <Description>拖动控制条,改变容器大小</Description>
          <ImportComponent />
          <Stories title="组件总览" includePrimary={true} />
          <Heading>API</Heading>
          <Subheading>属性</Subheading>
          <Subheading>DragCollapse</Subheading>
          <ArgsTable of={DragCollapse} />
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof DragCollapse>;

// ----------------------------------------------------------------

export const Default = (args: FRCDragCollapseProps) => {
  const containerStyle = {
    width: '100%',
    height: '400px'
  }

  return (
    <div style={containerStyle}>
      <DragCollapse
        {...{
            ...args,
            onDragChange:undefined,
          }
        }
      />
    </div>
  )
};

Default.storyName = '默认 DragCollapse';

// ----------------------------------------------------------------

export const _Horizontal = () => {
  const containerStyle = {
    width: '100%',
    height: '400px'
  }

  return (
    <div style={containerStyle}>
    <DragCollapse
      mode="horizontal"
      mainContentInit={400}
    />
  </div>
  )
};

_Horizontal.storyName = '横向抽屉 horizontal';
_Horizontal.parameters = {
  controls: { hideNoControlsWarning: true },
};
// ----------------------------------------------------------------

export const _Z_ControlDragCollapse = () => {
  const [size, setSize] = React.useState<number>(200)
  const containerStyle = {
    width: '100%',
    height: '400px'
  }

  const handleChange = (value: number) => {
    console.log('size change', value);
    setSize(value)
  }

  return (
    <div style={containerStyle}>
    <DragCollapse
      mainContentSize={size}
      onDragChange={handleChange}
    />
  </div>
  )
};

_Z_ControlDragCollapse.storyName = '受控抽屉';
_Z_ControlDragCollapse.parameters = {
  controls: { hideNoControlsWarning: true },
};