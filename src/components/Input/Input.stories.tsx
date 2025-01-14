import React from 'react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { FiSearch } from 'react-icons/fi'
import { MenuFoldOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

import { ComponentMeta } from '@storybook/react';

import {
    Title,
    Description,
    ArgsTable,
    Stories,
    Heading,
    Subheading
} from '@storybook/addon-docs';

import Input, { FRCInputProps, InputRef } from './index';

import Button from '../Button';
import Select from '../Select';

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
    const markdown = `
~~~js
import { Input } from 'frc-ui-pro';

// 按需引入 icon
import { FiSearch } from 'react-icons/fi'
import { MenuFoldOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
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
    title: '数据录入/Input 输入框',
    component: Input,
    parameters: {
        docs: {
            // docs 页面 => 总体布局
            page: () => (
                <>
                    <Title />
                    <Description>通过鼠标或键盘输入内容，是最基础的表单域的包装。</Description>
                    <ImportComponent />
                    <Stories title="组件总览" includePrimary={true} />

                    <Heading>API</Heading>
                    <Subheading>属性</Subheading>

                    <Subheading>Input</Subheading>
                    <ArgsTable of={Input}  exclude={["blur", 'focus']}/>
                    <Description>Input 的其他属性和 React 自带的 input 一致。</Description>

                    <Subheading>Input.TextArea</Subheading>
                    <ArgsTable of={Input.TextArea} />
                    <Description>Input.TextArea 的其他属性和浏览器自带的 textarea 一致。</Description>

                    <Subheading>Input.Search</Subheading>
                    <ArgsTable of={Input.Search} />
                    <Description>其余属性和 Input 一致。</Description>

                    <Subheading>Input.Group</Subheading>
                    <ArgsTable of={Input.Group} />

                    <Subheading>Input.Password</Subheading>
                    <ArgsTable of={Input.Password} />

                    <Subheading>方法</Subheading>
                    <Subheading>Input</Subheading>
                    <ArgsTable of={Input} include={["blur", 'focus']} />
                </>
            ),
        },
    },
    // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Input>;

// ----------------------------------------------------------------

export const Default = (args: FRCInputProps) => <Input {...args} />;

Default.storyName = '默认 input';

// ----------------------------------------------------------------

export const _BaseComponent = () => {
    return (<>
        <Input placeholder="Enter" />

        <Input placeholder="AllowClear" allowClear />

        <Input
            prefix={<FiSearch />}
            placeholder="No Border"
            allowClear
            bordered={false}
        />

        <Input
            prefix={<FiSearch />}
            suffix={<MenuFoldOutlined />}
            placeholder="Icon"
            allowClear
        />

        <br />
        <Input placeholder="Enter" disabled />

        <Input placeholder="AllowClear" allowClear disabled />

        <Input
            prefix={<FiSearch />}
            placeholder="No Border"
            allowClear
            bordered={false}
            disabled
        />

        <Input
            prefix={<FiSearch />}
            placeholder="Icon"
            allowClear
            disabled
        />
    </>)
};

_BaseComponent.storyName = '基本用法 input';
_BaseComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _IconOnlyComponent = () => {
    return (<>
        <Input placeholder="Enter" performance="icon-only" allowClear />
        <Input placeholder="Enter" performance="icon-only" allowClear disabled />
    </>)
};

_IconOnlyComponent.storyName = '图标输入框 icon only';
_IconOnlyComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _SearchComponent = () => {
    return (<>
        <Input.Search placeholder="Enter Search" allowClear style={{ width: 240 }} />
        <Input.Search
            placeholder="Enter"
            allowClear
            onSearch={() => {
                console.log('search')
            }}
            style={{ width: 240 }}
            enterButton="Search"
        />
        <br />
        <Input.Search placeholder="Enter Search" allowClear disabled style={{ width: 240 }} />
        <Input.Search
            placeholder="Enter"
            allowClear
            onSearch={() => {
                console.log('search')
            }}
            style={{ width: 240 }}
            enterButton="Search"
            disabled
        />
    </>)
};

_SearchComponent.storyName = '搜索输入框 search';
_SearchComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _LoadingComponent = () => {
    return (<>
        用于 onSearch 的时候展示 loading。
        <br />
        <Input.Search placeholder="Enter Search" allowClear loading style={{ width: 240 }} />
        <Input.Search
            placeholder="Enter"
            allowClear
            onSearch={() => {
                console.log('search')
            }}
            enterButton="Search"
            loading
            style={{ width: 240 }}
        />
        <br />
        <Input.Search placeholder="Enter Search" allowClear disabled loading style={{ width: 240 }} />
        <Input.Search
            placeholder="Enter"
            allowClear
            onSearch={() => {
                console.log('search')
            }}
            enterButton="Search"
            disabled
            loading
            style={{ width: 240 }}
        />
    </>)
};

_LoadingComponent.storyName = '加载中 loading';
_LoadingComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _GroupComponent = () => {
    return (<>
        输入框的组合展现。
        <br />
        <Input.Group>
            <Input style={{ width: '20%' }} defaultValue="0571" />
            <Input style={{ width: '30%' }} defaultValue="26888888" />
        </Input.Group>
        <Input.Group compact>
            <Input style={{ width: '20%' }} defaultValue="0571" />
            <Input style={{ width: '30%' }} defaultValue="26888888" />
        </Input.Group>
        <Input.Group compact>
            <Input style={{ width: 'calc(100% - 200px)' }} defaultValue="https://ant.design" />
            <Button type="primary">Submit</Button>
        </Input.Group>
        <Input.Group compact>
            <Select defaultValue="Zhejiang">
                <Select.Option value="Zhejiang">Zhejiang</Select.Option>
                <Select.Option value="Jiangsu">Jiangsu</Select.Option>
            </Select>
            <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
        </Input.Group>
    </>)
};

_GroupComponent.storyName = '输入框组 group';
_GroupComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _TextAreaComponent = () => {
    return (<>
        用于多行输入。
        <br />
        <Input.TextArea rows={4} />
    </>)
};

_TextAreaComponent.storyName = '文本域 textArea';
_TextAreaComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ShowCountComponent = () => {
    return (<>
        <Input showCount maxLength={20} />
        <br />
        <Input.TextArea showCount maxLength={100} />
        <br />
        <Input disabled showCount maxLength={20} />
        <br />
        <Input.TextArea disabled showCount maxLength={100} />
    </>)
};

_ShowCountComponent.storyName = '带字数提示 showCount';
_ShowCountComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _PasswordComponent = () => {
    return (<>
        <Input type="password" placeholder="input password" />
        <Input.Password placeholder="input password" />
        <Input.Password
            placeholder="input password"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
        <br />
        <Input.Password placeholder="input password" disabled />
        <Input.Password
            placeholder="input password"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            disabled
        />
    </>)
};

_PasswordComponent.storyName = '密码框 password';
_PasswordComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};

// ----------------------------------------------------------------

export const _ZRefComponent = () => {
    const inputRef = React.useRef<InputRef>(null);

    const hanldeClick = () => {
        inputRef.current?.focus();
    }

    return (
        <>
            <Input ref={inputRef} />
            <Button onClick={hanldeClick}>input focus</Button>
        </>
    )
}

_ZRefComponent.storyName = 'Input methods';
_ZRefComponent.parameters = {
    controls: { hideNoControlsWarning: true },
};