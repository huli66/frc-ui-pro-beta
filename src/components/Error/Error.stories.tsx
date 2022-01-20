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

import Error from './index';

export default {
    title: '通用/错误弹窗 Error',
    component: Error,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description >错误弹窗。</Description>
                    <Subtitle>组件展示</Subtitle>
                    <Primary />
                    <ArgsTable story={PRIMARY_STORY} />
                    <Stories title={"错误弹窗 Error"} includePrimary={false} />
                </>
            ),
        },
    },
} as ComponentMeta<typeof Error>;

export const Default = (args: any) => (
    <div style={{ width: "100%", height: 500, overflow: "hidden" }}>
        <Error {...args} />
        <div style={{ width: "100%", height: 500, background: '#136c5e' }}>
            123
        </div>
    </div>
);

Default.storyName = '默认 Error';