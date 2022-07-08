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

import Collapse from './index';
import { ICollapseProps } from './collapse'
import './_story.scss'
// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
  const markdown = `
~~~js
import { Collapse } from 'frc-ui-pro';
~~~

~~~css
.collapse-drawer-container{
  width: 100%;
  height: 400px;
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
  title: '布局/Collapse',
  component: Collapse,
  parameters: {
    docs: {
      // docs 页面 => 总体布局
      page: () => (
        <>
          <Title />
          <Description>拖动控制条,改变容器高度</Description>
          <ImportComponent />
          <Stories title="组件总览" includePrimary={true} />
          <Heading>API</Heading>
          <Subheading>属性</Subheading>
          <Subheading>Collapse</Subheading>
          <ArgsTable of={Collapse} />
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Collapse>;

// ----------------------------------------------------------------

export const CollapseDefault = (args: ICollapseProps) => {
  const { ...rest } = args
  
  return (
    <div className='collapse-drawer-container'>
      <Collapse
        {...rest}
      />
    </div>
  )
};

CollapseDefault.storyName = 'CollapseVertical';

// ----------------------------------------------------------------

export const CollapseHorizontal = (args: ICollapseProps) => {
  const { ...rest } = args
  
  return (
    <div className='collapse-drawer-container'>
    <Collapse
      {...rest}
      arrangement
    />
  </div>
  )
};

CollapseHorizontal.storyName = 'CollapseHorizontal';