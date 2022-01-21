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
} from '@storybook/addon-docs';

import DatePicker from './index';

const ImportComponent = () => {
    const markdown = `
~~~js
import { DatePicker } from 'frc-ui-pro';
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


export default {
    title: '数据录入/DatePicker 日期选择框',
    component: DatePicker,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description >多选框。</Description>
                    <ImportComponent />
                    <Subtitle>组件展示</Subtitle>
                    <Primary />
                    <ArgsTable of={DatePicker} />
                    <Stories title={"DatePicker 日期选择框"} includePrimary={true} />
                </>
            ),
        },
    },
} as ComponentMeta<typeof DatePicker>;

export const Default = (args: any) => <DatePicker {...args} />;
Default.storyName = '默认 datePicker';

// ----------------------------------------------------------------