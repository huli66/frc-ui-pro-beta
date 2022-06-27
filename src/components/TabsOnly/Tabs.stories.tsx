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

import TabsOnly from ".";
import { FRCTabsOnlyProps, itemProps, TabsOnlySizeType, TabsOnlyType } from "./tabsOnly";
import Radio from "../Radio";
import { RadioChangeEvent } from "antd";
import InputNumber from "../InputNumber/inputNumber";

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
import { TabsOnly } from 'frc-ui-pro';

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
  title: "数据显示/TabsOnly 按钮切换",
  component: TabsOnly,
  parameters: {
    docs: {
      // docs 页面 => 总体布局
      page: () => (
        <>
          <Title />
          <Description>选项卡切换组件，(仅按钮)。</Description>
          <ImportComponent />
          <Stories title="组件总览" includePrimary={true} />

          <Heading>API</Heading>
          <Subheading>属性</Subheading>

          <Subheading>TabsOnly</Subheading>
          <ArgsTable of={TabsOnly} />
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof TabsOnly>;

// ----------------------------------------------------------------
const onclickCallback = (item: itemProps) => {
  console.log("item", item, item.key, item.value);
};
export const Default = (args: FRCTabsOnlyProps) => (
  <>
    <TabsOnly
      {...args}
      block
      defaultSelectedKey="1"
      items={[
        {
          key: "1",
          value: "Filter001",
        },
        { key: "2", value: "Filter002" },
      ]}
      onSelect={onclickCallback}
      style={{ margin: "12px 12px 12px 0" }}
    />
    <TabsOnly
      {...args}
      defaultSelectedKey="1"
      type="piend"
      items={[
        {
          key: "1",
          value: "Filter001",
        },
        { key: "2", value: "Filter002" },
      ]}
      onSelect={onclickCallback}
    />
  </>
);

Default.storyName = "默认 TabsOnly";

// ----------------------------------------------------------------

export const _BaseComponent = () => {
  return (
    <>
      <TabsOnly disabled items={items} style={{ margin: "14px 0" }} />
      <p></p>
      <TabsOnly disabled type="piend" items={items} />
    </>
  );
};

_BaseComponent.storyName = "禁用 TabsOnly";
_BaseComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};
// ----------------------------------------------------------------

export const _TypeComponent = () => {
  const [type, setType] = useState<TabsOnlyType>("default");
  const onChange = (e: RadioChangeEvent) => {
    console.log("type", e.target.value);
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
      <p></p>
      <TabsOnly type={type} items={items} />
    </>
  );
};

_TypeComponent.storyName = "类型切换 TabsOnly";
_TypeComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _DefaultSelectComponent = () => {
  return (
    <>
      <TabsOnly defaultSelectedKey="2" items={items} />
      <p></p>
      <TabsOnly style={{ margin: "24px 0" }} defaultSelectedKey="3" items={items} />
      <p></p>
      <TabsOnly type="piend" defaultSelectedKey="4" items={items} />
    </>
  );
};

_DefaultSelectComponent.storyName = "默认选中项 TabsOnly";
_DefaultSelectComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ChangeSizeComponent = () => {
  const [size, setSize] = useState<TabsOnlySizeType>("default");
  const onChange = (e: RadioChangeEvent) => {
    console.log("size", e.target.value);
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
      <p></p>
      <TabsOnly size={size} items={items} />
    </>
  );
};

_ChangeSizeComponent.storyName = "尺寸切换 TabsOnly";
_ChangeSizeComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};
// ----------------------------------------------------------------

export const _setWidth = () => {
  const [width, setWidth] = useState<number>(80);
  const onChange = (value: any) => {
    console.log("value", value);
    setWidth(value);
  };
  return (
    <>
      <InputNumber
        style={{ margin: "0 24px 24px 0" }}
        defaultValue={80}
        onChange={onChange}
      />
      <TabsOnly
        width={width}
        items={[
          {
            key: "1",
            value:
              "This is a repeated title! This is a repeated titleThis is a repeated titleThis is a repeated title",
          },
          { key: "2", value: "Filter002" },
        ]}
      />
    </>
  );
};

_setWidth.storyName = "设置item宽度";
_setWidth.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _notAutoWidth = () => {
  const [notAutoWidth, setNotAutoWidth] = useState<boolean>(false);
  const onChange = (e: RadioChangeEvent) => {
    console.log("value", e.target.value);
    setNotAutoWidth(e.target.value);
  };
  return (
    <>
      <Radio.Group
        style={{ margin: "0 0 24px 0" }}
        onChange={onChange}
        value={notAutoWidth}
      >
        <Radio value={false}>false</Radio>
        <Radio value={true}>true</Radio>
      </Radio.Group>
      <p></p>
      <TabsOnly
        notAutoWidth={notAutoWidth}
        items={[
          {
            key: "1",
            value:
              "This is a repeated title! This is a repeated titleThis is a repeated titleThis is a repeated title",
          },
          { key: "2", value: "Filter002" },
        ]}
      />
    </>
  );
};

_notAutoWidth.storyName = "是否不自动填充宽度";
_notAutoWidth.parameters = {
  controls: { hideNoControlsWarning: true },
};
