// Button.stories.ts|tsx

import React from 'react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { ComponentMeta } from '@storybook/react';

import {
    Title,
    Subtitle,
    Description,
    Primary,
    ArgsTable,
    Stories,
    PRIMARY_STORY,
    Heading,
    Subheading
} from '@storybook/addon-docs';

import Select from './index';

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
    const markdown = `
~~~js
import { Select } from 'frc-ui-pro';
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
    title: '数据录入/Select 选择框',
    component: Select,
    parameters: {
        docs: {
            // docs 页面 => 总体布局
            page: () => (
                <>
                    <Title />
                    <Description>下拉选择器。</Description>
                    <ImportComponent />
                    <Subtitle>默认 - 组件展示</Subtitle>
                    <Primary />
                    <Stories title="组件总览" includePrimary={true} />
                    <Heading>API</Heading>
                    <Subheading>属性</Subheading>
                    <Subheading>Select</Subheading>
                    <ArgsTable of={Select} exclude={["blur", 'focus']} />
                </>
            ),
        },
    },
    // 细分属性 - 分类（用于canvas 页查阅）
    argTypes: {
        blur: {
            table: {
                category: '方法',
            },
        },
        focus: {
            table: {
                category: '方法',
            },
        },
    }
} as ComponentMeta<typeof Select>;

// ----------------------------------------------------------------

export const Default = (args: any) => <Select {...args} style={{ width: 240 }}>
    <Select.Option value="Zhejiang">Zhejiang</Select.Option>
    <Select.Option value="Jiangsu">Jiangsu</Select.Option>
</Select>;

Default.storyName = '默认 checkbox';