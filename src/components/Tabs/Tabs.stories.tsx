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
} from "@storybook/addon-docs";

import Tabs from "./index";
import { FRCTabsProps, itemProps, TabsSizeType, TabsType } from "./tabs";
import Radio from "../Radio";
import { RadioChangeEvent } from "antd";

const items = [
  { key: "1", value: "Filter001" },
  { key: "2", value: "Filter002" },
  { key: "3", value: "Filter003" },
  { key: "4", value: "Filter004" },
];

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
  const markdown = `
~~~js
import { Tabs } from 'frc-ui-pro';

// 按需引入 icon
import { QuestionCircleOutlined } from "@ant-design/icons";
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
  title: "数据显示/Tabs 标签页",
  component: Tabs,
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

          <Subheading>Tabs</Subheading>
          <ArgsTable of={Tabs} />
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Tabs>;

// ----------------------------------------------------------------
const onclickCallback = (item: itemProps) => {
  console.log("item", item, item.key, item.value);
};
export const Default = (args: FRCTabsProps) => (
  <>
    <Tabs
      {...args}
      defaultSelectedKey="1"
      items={[
        { key: "1", value: "Filter001" },
        { key: "2", value: "Filter002" },
      ]}
      onSelect={onclickCallback}
      style={{ margin: "24px" }}
    />
    <Tabs
      {...args}
      style={{ margin: "24px" }}
      defaultSelectedKey="2"
      items={[
        { key: "1", value: "Filter001" },
        { key: "2", value: "Filter002" },
      ]}
      type="piend"
      onSelect={onclickCallback}
    />
    <Tabs
      {...args}
      disabled
      style={{ margin: "24px" }}
      items={[
        { key: "1", value: "Filter001" },
        { key: "2", value: "Filter002" },
      ]}
      type="piend"
      onSelect={onclickCallback}
    />
    <Tabs
      {...args}
      disabled
      style={{ margin: "24px" }}
      items={[
        { key: "1", value: "Filter001" },
        { key: "2", value: "Filter002" },
      ]}
    />
    {/* <Tabs {...args}>
      <Tabs.TabPane key="21">111</Tabs.TabPane>
      <Tabs.TabPane key="22">2222</Tabs.TabPane>
      <Tabs.TabPane key="23">33333</Tabs.TabPane>
      <div>sss</div>
    </Tabs> */}
  </>
);

Default.storyName = "默认 Tabs";

// ----------------------------------------------------------------

export const _BaseComponent = () => {
  return (
    <>
      <Tabs disabled items={items} style={{ margin: "14px 0" }} />
      <Tabs disabled type="piend" items={items} />
    </>
  );
};

_BaseComponent.storyName = "禁用 Tabs";
_BaseComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};
// ----------------------------------------------------------------

export const _TypeComponent = () => {
  const [type, setType] = useState<TabsType>("default");
  const onChange = (e: RadioChangeEvent) => {
    console.log('type', e.target.value);
    setType(e.target.value);
  };
  return (
    <>
      <Radio.Group
        style={{ margin: "0 0 24px 0" }}
        onChange={onChange}
        value={type}
      >
        <Radio value="default">default</Radio>
        <Radio value="piend">piend</Radio>
      </Radio.Group>
      <Tabs type={type} items={items} />
    </>
  );
};

_TypeComponent.storyName = "类型切换 Tabs";
_TypeComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _DefaultSelectComponent = () => {
  return (
    <>
      <Tabs defaultSelectedKey="2" items={items} />
      <Tabs style={{ margin: "24px 0" }} defaultSelectedKey="3" items={items} />
      <Tabs type="piend" defaultSelectedKey="4" items={items} />
    </>
  );
};

_DefaultSelectComponent.storyName = "默认选中项 Tabs";
_DefaultSelectComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ChangeSizeComponent = () => {
  const [size, setSize] = useState<TabsSizeType>("default");
  const onChange = (e: RadioChangeEvent) => {
    console.log('size', e.target.value);
    setSize(e.target.value);
  };
  return (
    <>
      <Radio.Group
        style={{ margin: "0 0 24px 0" }}
        onChange={onChange}
        value={size}
      >
        <Radio value="default">default</Radio>
        <Radio value="middle">middle</Radio>
        <Radio value="large">large</Radio>
      </Radio.Group>
      <Tabs size={size} items={items} />
    </>
  );
};

_ChangeSizeComponent.storyName = "尺寸切换 Tabs";
_ChangeSizeComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};
