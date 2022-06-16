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

import SqueezeDrawer from './index';
import { ISqueezeDrawerProps } from './squeezeDrawer'
import './_story.scss'

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
  const markdown = `
~~~js
import { SqueezeDrawer } from 'frc-ui-pro';
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
  title: '布局/SqueezeDrawer',
  component: SqueezeDrawer,
  parameters: {
    docs: {
      // docs 页面 => 总体布局
      page: () => (
        <>
          <Title />
          <Description>通过鼠标或键盘，输入范围内的数值。</Description>
          <ImportComponent />
          <Stories title="组件总览" includePrimary={true} />
          <Heading>API</Heading>
          <Subheading>属性</Subheading>
          <Subheading>SqueezeDrawer</Subheading>
          <ArgsTable of={SqueezeDrawer} />
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof SqueezeDrawer>;

// ----------------------------------------------------------------

export const SqueezeDrawerDefault = (args: ISqueezeDrawerProps) => {
  const { onOpenChange, ...rest } = args
  return (
    <div className='suqeeze-drawer-container'>
      <SqueezeDrawer
        {...rest}
      />
    </div>
  )
};

SqueezeDrawerDefault.storyName = '默认 squeezeDrawer';
SqueezeDrawerDefault.parameters = {};



export const _ControlComponent = () => {
  const [visible, setVisible] = useState(true)
  const onHandleClick = (open: boolean) => {
    console.log('onHandleClick');
    setVisible(open)
  }

  return (
    <div className='suqeeze-drawer-container'>
      <SqueezeDrawer extraContentVisible={visible} onOpenChange={onHandleClick} />
    </div>
  )
};

_ControlComponent.storyName = '受控 squeezeDrawer';
_ControlComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};