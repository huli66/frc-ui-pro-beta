import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import { ComponentMeta } from "@storybook/react";

import {
  Title,
  Description,
  ArgsTable,
  Stories,
  Heading,
  Subheading,
} from "@storybook/addon-docs";

import Switch, { FRCSwitchProps } from "./index";

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
  const markdown = `
~~~js
import { Switch } from 'frc-ui-pro';

// 按需加载 icon
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
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
  title: "数据录入/Switch 开关",
  component: Switch,
  parameters: {
    docs: {
      // docs 页面 => 总体布局
      page: () => (
        <>
          <Title />
          <Description>开关选择器。</Description>
          <ImportComponent />
          <Stories title="组件总览" includePrimary={true} />

          <Heading>API</Heading>
          <Subheading>属性</Subheading>

          <Subheading>Radio/Radio.Button</Subheading>
          <ArgsTable of={Switch} />
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Switch>;

// ----------------------------------------------------------------

export const Default = (args: FRCSwitchProps) => <Switch {...args} />;

Default.storyName = "默认 switch";

// ----------------------------------------------------------------

export const _BaseComponent = () => {
  return (
    <>
      <Switch />
      <Switch checked />
      <Switch loading />
      <Switch loading checked />
      <Switch disabled />
      <Switch disabled checked />
    </>
  );
};

_BaseComponent.storyName = "基本使用 switch";
_BaseComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ChildComponent = () => {
  return (
    <>
      <Switch checkedChildren="开启" unCheckedChildren="关闭关闭" />

      <Switch
        checkedChildren="开启开启"
        unCheckedChildren="关闭"
        defaultChecked
      />

      <Switch checkedChildren="开启" unCheckedChildren="关闭" loading />

      <Switch checkedChildren="开启" unCheckedChildren="关闭" loading checked />

      <Switch checkedChildren="开启" unCheckedChildren="关闭" disabled />

      <Switch
        checkedChildren="开启"
        unCheckedChildren="关闭"
        disabled
        checked
      />
      <br />
      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
      />

      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        defaultChecked
      />

      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        loading
      />

      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        loading
        checked
      />

      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        disabled
      />

      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        disabled
        checked
      />
    </>
  );
};

_ChildComponent.storyName = "文字和图标";
_ChildComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ExtraTextComponent = () => {
  return (
    <>
      <Switch extraText="额外信息" />
      <Switch extraText="额外信息" extraTextPlacement="left" />
    </>
  );
};

_ExtraTextComponent.storyName = "switch 属性 exrtaText";
_ExtraTextComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------
