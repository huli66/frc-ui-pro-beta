import React from 'react';
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

import {Switch} from 'antd';
import Slider from './index';
import {FRCSliderProps} from './slider'

// ----------------------------------------------------------------

// 引用示例代码
const ImportComponent = () => {
    const markdown = `
~~~js
import { Slider } from 'frc-ui-pro';
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
    title: '数据录入/Slider 滑动输入条',
    component: Slider,
    parameters: {
        docs: {
            // docs 页面 => 总体布局
            page: () => (
                <>
                    <Title />
                    <Description>滑动型输入器，展示当前值和可选范围。</Description>
                    <ImportComponent />
                    <Stories title="组件总览" includePrimary={true} />

                    <Heading>API</Heading>
                    <Subheading>属性</Subheading>

                    <Subheading>Slider</Subheading>
                    <ArgsTable of={Slider} />
                </>
            ),
        },
    },
    // 细分属性 - 分类（用于canvas 页查阅）
} as ComponentMeta<typeof Slider>;

// ----------------------------------------------------------------

export const Default = (args: FRCSliderProps) => {
    const [disabled, setDisabled] = React.useState<boolean>(false);
    const handleDisabledChange = (disabled) => {
        setDisabled(disabled);
    }
    return (
        <>
            <Slider defaultValue={30} disabled={disabled} />
            <Slider range defaultValue={[20, 50]} disabled={disabled} />
            Disabled: <Switch size="small" checked={disabled} onChange={handleDisabledChange} />
        </>
    )
};

Default.storyName = '默认 slider';

// -----------------------------------------------------------------

export const SizeComponent = () => {
    return (
        <>
            <Slider defaultValue={30} />
            <Slider defaultValue={30} size='large' />
            <Slider defaultValue={30} size='small' />
            <Slider range defaultValue={[20, 50]} />
        </>
    )
}
SizeComponent.storyName = '大小 slider';