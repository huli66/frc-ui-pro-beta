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
  Source,
} from "@storybook/addon-docs";

import Menu from "./index";
import { FRCMenuProps, MenuModeType } from "./menu";
import {
  AppstoreOutlined,
  ContainerOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Button from "../Button";
import Radio from "../Radio";
import { MenuProps } from "antd/lib/menu";
import { RadioChangeEvent } from "antd";

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
  const markdown = `
~~~js
import { Menu } from 'frc-ui-pro';

// 按需引入 icon
import { ExclamationCircleOutlined } from '@ant-design/icons';
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
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
const ItemGroup = Menu.ItemGroup;
const Divider = Menu.Divider;
export default {
  title: "导航/Menu 导航菜单",
  component: Menu,
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
          <Subheading>Menu</Subheading>
          <ArgsTable of={Menu} />
          <Subheading>ItemType</Subheading>
          <Source
            dark
            language="ts"
            code="type ItemType = MenuItemType | SubMenuType | MenuItemGroupType |
            MenuDividerType;"
          />
          <Subheading>MenuItemType</Subheading>
          <ArgsTable of={Item} />
          <Subheading>SubMenuType</Subheading>
          <ArgsTable of={SubMenu} />
          <Subheading>MenuItemGroupType</Subheading>
          <ArgsTable of={ItemGroup} />
          <Subheading>MenuDividerType</Subheading>
          <ArgsTable of={Divider} />
        </>
      ),
    },
  },
  // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Menu>;

// ----------------------------------------------------------------
const items = [
  { label: "菜单项一", key: "item-1" }, // 菜单项务必填写 key
  {
    label: "菜单项二",
    key: "item-2",
    children: [
      { label: "子菜单项一", key: "submenu-item-11" },
      { label: "子菜单项二", key: "submenu-item-22" },
    ],
  },
  {
    label: "子菜单",
    key: "submenu",
    children: [
      { label: "子菜单项一", key: "submenu-item-1" },
      { label: "子菜单项二", key: "submenu-item-2" },
    ],
  },
];
export const Default = (args: FRCMenuProps) => <Menu items={items} {...args} />;

Default.storyName = "默认 menu";

// ----------------------------------------------------------------

export const _TopMenu = () => {
  return <Menu mode="horizontal" style={{ width: "250px" }} items={items} />;
};
_TopMenu.storyName = "顶部导航";
_TopMenu.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _HasGroupMenu = () => {
  return (
    <Menu
      items={[
        {
          label: "Navigation One",
          key: "mail",
        },
        {
          label: "Navigation Two",
          key: "SubMenu",
          children: [
            {
              type: "group",
              label: "Item 1",
              children: [
                {
                  label: "Option 1",
                  key: "setting:1",
                },
                {
                  label: "Option 2",
                  key: "setting:2",
                },
              ],
            },
            {
              type: "group",
              label: "Item 2",
              children: [
                {
                  label: "Option 3",
                  key: "setting:3",
                },
                {
                  label: "Option 4",
                  key: "setting:4",
                },
              ],
            },
          ],
        },
      ]}
    />
  );
};
_HasGroupMenu.storyName = "带分组的 Menu";
_HasGroupMenu.parameters = {
  controls: { hideNoControlsWarning: true },
};
// ----------------------------------------------------------------

export const _HasDivider = () => {
  return (
    <Menu
      items={[
        {
          label: "Navigation One",
          key: "mail",
        },
        {
          label: "Navigation Two",
          key: "SubMenu",
          children: [
            {
              label: "item",
              key: "mail2",
            },
            {
              type: "divider",
              key: "divider2",
            },
            {
              label: "item2",
              key: "mail23",
            },
            {
              type: "divider",
              key: "divider1",
            },
            {
              label: "item3",
              key: "mail24",
            },
          ],
        },
      ]}
    />
  );
};
_HasDivider.storyName = "带分割线的 Menu";
_HasDivider.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _HasDisabled = () => {
  return (
    <Menu
      items={[
        {
          label: "Navigation One",
          disabled: true,
          key: "mail",
        },
        {
          label: "Navigation Two",
          key: "SubMenu",
          children: [
            {
              label: "item",
              key: "mail2",
              disabled: true,
            },

            {
              label: "item2",
              key: "mail23",
            },
            {
              label: "item3",
              key: "mail24",
            },
          ],
        },
      ]}
    />
  );
};
_HasDisabled.storyName = "带禁用的 Menu";
_HasDisabled.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _HasIcon = () => {
  return (
    <Menu
      items={[
        {
          label: "Navigation One",
          key: "mail",
          icon: <MailOutlined />,
        },
        {
          label: "Navigation Two",
          key: "SubMenu",
          icon: <AppstoreOutlined />,
          children: [
            {
              label: "item",
              key: "mail2",
              icon: <AppstoreOutlined />,
            },

            {
              label: "item2",
              key: "mail23",
              icon: <SettingOutlined />,
            },
            {
              label: "item3",
              key: "mail24",
              icon: <ContainerOutlined />,
            },
          ],
        },
      ]}
    />
  );
};
_HasIcon.storyName = "带图标的 Menu";
_HasIcon.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _IsCollapsed = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedWidth, setCollapsedWidth] = useState(186);
  const toggleCollapsed = () => {
    !collapsed ? setCollapsedWidth(40) : setCollapsedWidth(186);
    setCollapsed(!collapsed);
  };
  return (
    <>
      点击按钮折叠关闭
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ margin: "0 0 16px 16px" }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        items={[
          {
            label: "Navigation One",
            key: "mail",
            icon: <MailOutlined />,
          },
          {
            label: "Navigation Two",
            key: "SubMenu",
            icon: <AppstoreOutlined />,
            children: [
              {
                label: "item",
                key: "mail2",
                icon: <AppstoreOutlined />,
              },
  
              {
                label: "item2",
                key: "mail23",
                icon: <SettingOutlined />,
              },
              {
                label: "item3",
                key: "mail24",
                icon: <ContainerOutlined />,
              },
            ],
          },
        ]}
        inlineCollapsed={collapsed}
        style={{ width: collapsedWidth + "px" }}
      />
    </>
  );
};
_IsCollapsed.storyName = "带折叠展开的 Menu";
_IsCollapsed.parameters = {
  controls: { hideNoControlsWarning: true },
};
// ----------------------------------------------------------------
export const _SubmenusIsPop = () => {
  return <Menu items={items} mode="vertical" />;
};

_SubmenusIsPop.storyName = "子菜单是弹出形式";
_SubmenusIsPop.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------
// submenu keys of first level
const rootSubmenuKeys = ["item-1", "item-2", "submenu"];
export const _ExpandOnlyOne = () => {
  const [openKeys, setOpenKeys] = React.useState(["item-1"]);
  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return <Menu items={items} openKeys={openKeys} onOpenChange={onOpenChange} />;
};

_ExpandOnlyOne.storyName = "只展开当前父级菜单";
_ExpandOnlyOne.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------
export const _ChangeMenuType = () => {
  const [mode, setMode] = React.useState<MenuModeType>("inline");
  const onChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };
  return (
    <>
      <Radio.Group
        style={{ margin: "0 0 16px 0" }}
        onChange={onChange}
        value={mode}
      >
        <Radio value="inline">inline</Radio>
        <Radio value="vertical">vertical</Radio>
        <Radio value="horizontal">horizontal</Radio>
      </Radio.Group>
      <Menu items={items} mode={mode} />
    </>
  );
};

_ChangeMenuType.storyName = "切换菜单类型";
_ChangeMenuType.parameters = {
  controls: { hideNoControlsWarning: true },
};
