import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

import { ComponentMeta } from "@storybook/react";

import {
  Title,
  Description,
  ArgsTable,
  Stories,
  Heading,
  Subheading,
  Source
} from "@storybook/addon-docs";

import Collapse, {FRCCollapseProps} from "./index";
const {Panel} = Collapse;
// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
  const markdown = `
~~~js
import { Collapse } from 'frc-ui-pro';

const { Panel } = Collapse;
~~~
`;

  return (
    <>
      <ReactMarkdown
        children={markdown}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={tomorrow}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </>
  );
};

// ----------------------------------------------------------------

export default {
  title: "布局/Collapse 折叠面板",
  component: Collapse,
  parameters: {
    docs: {
      // docs 页面 => 总体布局
      page: () => (
        <>
          <Title />
          <Description>可以折叠/展开的内容区域。</Description>
          <ImportComponent />
          <Stories title="组件总览" includePrimary={true} />

          <Heading>API</Heading>
          <Subheading>属性</Subheading>

          <Subheading>Collapse</Subheading>
          <ArgsTable of={Collapse} />

          <Subheading>Collapse.Panel</Subheading>
          <ArgsTable of={Panel} />

          <Description>更多参考 https://ant.design/components/collapse-cn#collapse</Description>
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Collapse>;

// ----------------------------------------------------------------

const style = {
  height: 240
}

export const Default = (args: FRCCollapseProps) => {
  return (
    <div style={style}>
      <Collapse
        defaultActiveKey={'2'}
        {...args}
      >
        <Panel header="这是标题1" key="1">
          <span style={{color: 'red'}}>这是一段文本....</span>
        </Panel>
        <Panel header="这是标题2" key="2">
          这是一段文本....
        </Panel>
        <Panel header="这是标题3" key="3">
          这是一段文本....
        </Panel>
      </Collapse>
    </div>
  )
};

Default.storyName = "默认 Collapse";

// ----------------------------------------------------------------

export const _ABaseComponent = () => {
  const handleChange = (key: string | string[]) => {
    console.log(key);
  }
  return (
    <div style={style}>
    <Collapse 
      accordion 
      onChange={(key: string | string[]) => handleChange(key)}
      >
      <Panel header="这是标题1" key="1">
        这是一段文本....
      </Panel>
      <Panel header="这是标题2" key="2">
        这是一段文本....
      </Panel>
      <Panel header="这是标题3" key="3">
        这是一段文本....
      </Panel>
    </Collapse>
  </div>
  )
};

_ABaseComponent.storyName = '手风琴';
_ABaseComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ANestComponent = () => {
  return (
    <div style={style}>
    <Collapse accordion>
      <Panel header="这是标题1" key="1">
        <Collapse bordered>
          <Panel header="这是标题1-1" key="1">
            ....
          </Panel>
          <Panel header="这是标题1-2" key="2">
            ....
          </Panel>
        </Collapse>
      </Panel>
      <Panel header="这是标题2" key="2">
        这是一段文本....
      </Panel>
      <Panel header="这是标题3" key="3">
        这是一段文本....
      </Panel>
    </Collapse>
  </div>
  )
};

_ANestComponent.storyName = '嵌套面板';
_ANestComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ADisComponent = () => {
  return (
    <div style={style}>
    <Collapse accordion>
      <Panel header="这是标题1" key="1">
        这是一段文本....
      </Panel>
      <Panel header="这是标题2" key="2" showArrow={false}>
        这是一段文本....
      </Panel>
    </Collapse>
  </div>
  )
};

_ADisComponent.storyName = '隐藏箭头';
_ADisComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _AGHostComponent = () => {
  return (
    <div style={style}>
    <Collapse defaultActiveKey={['1']} ghost>
      <Panel header="这是标题1" key="1">
        这是一段文本....
      </Panel>
      <Panel header="这是标题2" key="2">
        这是一段文本....
      </Panel>
    </Collapse>
  </div>
  )
};

_AGHostComponent.storyName = '幽灵折叠面板';
_AGHostComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _AOnlyComponent = () => {
  return (
    <div style={style}>
    <Collapse defaultActiveKey={['1']} collapsible="header">
      <Panel header="只能点击Header内容触发" key="1">
        这是一段文本....
      </Panel>
      {/* <Panel header="只能通过ICON触发折叠" key="2" collapsible="icon">
        这是一段文本....
      </Panel> */}
      <Panel header="禁用版" key="3" collapsible="disabled">
        这是一段文本....
      </Panel>
    </Collapse>
  </div>
  )
};

_AOnlyComponent.storyName = '可折叠触发区域';
_AOnlyComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};