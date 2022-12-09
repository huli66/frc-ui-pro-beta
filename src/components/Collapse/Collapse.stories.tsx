import React, { ReactElement, ReactHTMLElement, useState } from "react";
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
         
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Collapse>;

// ----------------------------------------------------------------

const style = {
  height: '220px'
}

export const Default = (args: FRCCollapseProps) => (
  <div style={style}>
    <Collapse
      {...args}
    >
      <Panel header="这是标题1" key="1">
        <span style={{color: 'red'}}>这是一段文本....</span>
      </Panel>
      <Panel header="这是标题2" key="2">
        这是一段文本....
      </Panel>
      <Panel header="这是标题3" key="3" disabled>
        这是一段文本....
      </Panel>
    </Collapse>
  </div>
);

Default.storyName = "默认 Collapse";

// ----------------------------------------------------------------

export const _ABaseComponent = () => {
  return (
    <div style={style}>
    <Collapse 
      accordion 
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