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

export const Default = (args: FRCMenuProps) => (
  <Menu {...args}>
    <Menu.SubMenu key="SubMenu01" title="Title 01">
      <Menu.Item key="SubMenu0101">Content 01</Menu.Item>
      <Menu.Item key="SubMenu0102">Content 02</Menu.Item>
      <Menu.Item key="SubMenu0103">Content 03</Menu.Item>
    </Menu.SubMenu>
    <Menu.SubMenu key="SubMenu02" title="Title 02">
      <Menu.Item key="SubMenu0201">Content 03</Menu.Item>
      <Menu.Item key="SubMenu0202">Content 04</Menu.Item>
    </Menu.SubMenu>
    <Menu.SubMenu key="SubMenu03" title="Title 03">
      <Menu.Item key="SubMenu0301">Content 05</Menu.Item>
      <Menu.Item key="SubMenu0302">Content 06</Menu.Item>
      <Menu.SubMenu key="SubMenu0311" title="Title 03">
        <Menu.Item key="SubMenu030111">Content 05</Menu.Item>
        <Menu.Item key="SubMenu030222">Content 06</Menu.Item>
      </Menu.SubMenu>
    </Menu.SubMenu>
  </Menu>
);

Default.storyName = "默认 menu";

// ----------------------------------------------------------------

export const _TopMenu = () => {
  return (
    <Menu mode="horizontal" style={{ width: "250px" }}>
      <Menu.SubMenu key="SubMenu01" title="Title 01">
        <Menu.Item key="SubMenu0101">Content 01</Menu.Item>
        <Menu.Item key="SubMenu0102">Content 02</Menu.Item>
        <Menu.Item key="SubMenu0103">Content 03</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="SubMenu02" title="Title 02">
        <Menu.Item key="SubMenu0201">Content 03</Menu.Item>
        <Menu.Item key="SubMenu0202">Content 04</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="SubMenu03" title="Title 03">
        <Menu.Item key="SubMenu0301">Content 05</Menu.Item>
        <Menu.Item key="SubMenu0302">Content 06</Menu.Item>
        <Menu.SubMenu key="SubMenu0311" title="Title 001">
          <Menu.Item key="SubMenu0301212">Content 01</Menu.Item>
          <Menu.Item key="SubMenu03022">Content 02</Menu.Item>
          <Menu.SubMenu key="SubMenu031123" title="Title 0001">
            <Menu.Item key="SubMenu030121243">Content 01</Menu.Item>
            <Menu.Item key="SubMenu03025452">Content 02</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu.SubMenu>
    </Menu>
  );
};
_TopMenu.storyName = "顶部导航";
_TopMenu.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _HasGroupMenu = () => {
  return (
    <Menu>
      <Menu.SubMenu key="SubMenu01" title="Title 01">
        <Menu.Item key="SubMenu0101">Content 01</Menu.Item>
        <Menu.ItemGroup key="g1" title="ItemGroup 1">
          <Menu.Item key="SubMenu0102">Content 02</Menu.Item>
          <Menu.Item key="SubMenu0103">Content 03</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="ItemGroup 2">
          <Menu.Item key="SubMenu1202">Content 02</Menu.Item>
          <Menu.Item key="SubMenu1203">Content 03</Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
      <Menu.SubMenu key="SubMenu02" title="Title 02">
        <Menu.Item key="SubMenu0201">Content 03</Menu.Item>
        <Menu.Item key="SubMenu0202">Content 04</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="SubMenu03" title="Title 03">
        <Menu.Item key="SubMenu0301">Content 05</Menu.Item>
        <Menu.Item key="SubMenu0302">Content 06</Menu.Item>
        <Menu.SubMenu key="SubMenu0311" title="Title 003">
          <Menu.Item key="SubMenu0301212">Content 01</Menu.Item>
          <Menu.Item key="SubMenu03022">Content 02</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
    </Menu>
  );
};
_HasGroupMenu.storyName = "带分组的 Menu";
_HasGroupMenu.parameters = {
  controls: { hideNoControlsWarning: true },
};
// ----------------------------------------------------------------

export const _HasDivider = () => {
  return (
    <Menu>
      <Menu.SubMenu key="SubMenu01" title="Title 01">
        <Menu.Item key="SubMenu0101">Content 01</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="SubMenu0102">Content 02</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="SubMenu0103">Content 03</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="SubMenu02" title="Title 02">
        <Menu.Item key="SubMenu0201">Content 03</Menu.Item>
        <Menu.Item key="SubMenu0202">Content 04</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="SubMenu03" title="Title 03">
        <Menu.Item key="SubMenu0301">Content 05</Menu.Item>
        <Menu.Item key="SubMenu0302">Content 06</Menu.Item>
        <Menu.SubMenu key="SubMenu0311" title="Title 003">
          <Menu.Item key="SubMenu0301212">Content 01</Menu.Item>
          <Menu.Item key="SubMenu03022">Content 02</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
    </Menu>
  );
};
_HasDivider.storyName = "带分割线的 Menu";
_HasDivider.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _HasDisabled = () => {
  return (
    <Menu>
      <Menu.SubMenu disabled key="SubMenu01" title="Title 01">
        <Menu.Item key="SubMenu0101">Content 01</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="SubMenu0102">Content 02</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="SubMenu0103">Content 03</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="SubMenu02" title="Title 02">
        <Menu.Item disabled key="SubMenu0201">
          Content 03
        </Menu.Item>
        <Menu.Item key="SubMenu0202">Content 04</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="SubMenu03" title="Title 03">
        <Menu.Item key="SubMenu0301">Content 05</Menu.Item>
        <Menu.Item disabled key="SubMenu0302">
          Content 06
        </Menu.Item>
        <Menu.SubMenu key="SubMenu0311" title="Title 003">
          <Menu.Item key="SubMenu0301212">Content 01</Menu.Item>
          <Menu.Item key="SubMenu03022">Content 02</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
    </Menu>
  );
};
_HasDisabled.storyName = "带禁用的 Menu";
_HasDisabled.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _HasIcon = () => {
  return (
    <>
      <Menu>
        <Menu.SubMenu
          icon={<AppstoreOutlined />}
          key="SubMenu01"
          title="Title 01"
        >
          <Menu.Item key="SubMenu0101" icon={<AppstoreOutlined />}>
            Content 01
          </Menu.Item>
          <Menu.Item key="SubMenu0102" icon={<AppstoreOutlined />}>
            Content 02
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          icon={<SettingOutlined />}
          key="SubMenu02"
          title="Title 02"
        >
          <Menu.Item key="SubMenu0201" icon={<SettingOutlined />}>
            Content 03
          </Menu.Item>
          <Menu.Item key="SubMenu0202" icon={<SettingOutlined />}>
            Content 04
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu icon={<MailOutlined />} key="SubMenu03" title="Title 03">
          <Menu.Item icon={<MailOutlined />} key="Su21bMenu0301">
            Content 05
          </Menu.Item>
          <Menu.Item icon={<MailOutlined />} key="S121ubMenu030122">
            Content 06
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </>
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
        inlineCollapsed={collapsed}
        style={{ width: collapsedWidth + "px" }}
      >
        <Menu.SubMenu
          icon={<AppstoreOutlined />}
          key="SubMenu01"
          title="Title 01"
        >
          <Menu.Item key="SubMenu0101">Content 01</Menu.Item>
          <Menu.Item key="SubMenu0102">Content 02</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          icon={<SettingOutlined />}
          key="SubMenu02"
          title="Title 02"
        >
          <Menu.Item key="SubMenu0201">Content 03</Menu.Item>
          <Menu.Item key="SubMenu0202">Content 04</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu icon={<MailOutlined />} key="SubMenu03" title="Title 03">
          <Menu.Item key="SubMenu0301">Content 05</Menu.Item>
          <Menu.Item key="SubMenu0302">Content 06</Menu.Item>
          <Menu.SubMenu
            icon={<ContainerOutlined />}
            key="SubMenu0311"
            title="Title 003"
          >
            <Menu.Item key="SubMenu0301212">Content 01</Menu.Item>
            <Menu.Item key="SubMenu03022">Content 02</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu>
    </>
  );
};
_IsCollapsed.storyName = "带折叠展开的 Menu";
_IsCollapsed.parameters = {
  controls: { hideNoControlsWarning: true },
};
// ----------------------------------------------------------------
export const _SubmenusIsPop = () => {
  return (
    <>
      <Menu mode="vertical">
        <Menu.SubMenu key="SubMenu01" title="Title 01">
          <Menu.Item key="SubMenu0101">Content 01</Menu.Item>
          <Menu.Item key="SubMenu0102">Content 02</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="SubMenu02" title="Title 02">
          <Menu.Item key="SubMenu0201">Content 03</Menu.Item>
          <Menu.Item key="SubMenu0202">Content 04</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="SubMenu03" title="Title 03">
          <Menu.Item key="SubMenu0301">Content 05</Menu.Item>
          <Menu.Item key="SubMenu0302">Content 06</Menu.Item>
          <Menu.SubMenu key="SubMenu0311" title="Title 003">
            <Menu.Item key="SubMenu0301212">Content 01</Menu.Item>
            <Menu.Item key="SubMenu03022">Content 02</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu>
    </>
  );
};

_SubmenusIsPop.storyName = "子菜单是弹出形式";
_SubmenusIsPop.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------
// submenu keys of first level
const rootSubmenuKeys = ["SubMenu01", "SubMenu02", "SubMenu03"];
export const _ExpandOnlyOne = () => {
  const [openKeys, setOpenKeys] = React.useState(["SubMenu01"]);
  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <>
      <Menu openKeys={openKeys} onOpenChange={onOpenChange}>
        <Menu.SubMenu key="SubMenu01" title="Title 01">
          <Menu.Item key="SubMenu0101">Content 01</Menu.Item>
          <Menu.Item key="SubMenu0102">Content 02</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="SubMenu02" title="Title 02">
          <Menu.Item key="SubMenu0201">Content 03</Menu.Item>
          <Menu.Item key="SubMenu0202">Content 04</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="SubMenu03" title="Title 03">
          <Menu.Item key="SubMenu0301">Content 05</Menu.Item>
          <Menu.Item key="SubMenu0302">Content 06</Menu.Item>
          <Menu.SubMenu key="SubMenu0311" title="Title 003">
            <Menu.Item key="SubMenu0301212">Content 01</Menu.Item>
            <Menu.Item key="SubMenu03022">Content 02</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu>
    </>
  );
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
      <Menu mode={mode}>
        <Menu.SubMenu key="SubMenu01" title="Title 01">
          <Menu.Item key="SubMenu0101">Content 01</Menu.Item>
          <Menu.Item key="SubMenu0102">Content 02</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="SubMenu02" title="Title 02">
          <Menu.Item key="SubMenu0201">Content 03</Menu.Item>
          <Menu.Item key="SubMenu0202">Content 04</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="SubMenu03" title="Title 03">
          <Menu.Item key="SubMenu0301">Content 05</Menu.Item>
          <Menu.Item key="SubMenu0302">Content 06</Menu.Item>
          <Menu.SubMenu key="SubMenu0311" title="Title 003">
            <Menu.Item key="SubMenu0301212">Content 01</Menu.Item>
            <Menu.Item key="SubMenu03022">Content 02</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu>
    </>
  );
};

_ChangeMenuType.storyName = "切换菜单类型";
_ChangeMenuType.parameters = {
  controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------
// 单独设置子菜单主题,此版本暂不支持
